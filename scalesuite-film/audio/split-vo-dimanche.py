"""Cut the single ElevenLabs take of « Dimanche, 21 h 14 » into its 11 lines.

1. If silencedetect finds exactly 10 pauses of at least 0.7 s (the breaks of the block), cut there.
2. Otherwise (the breaks were not generated), detect every pause of at least 0.2 s and try every choice of
   10 of them: keep the one whose 11 segments speak at the most even rate (syllables per second of speech,
   internal pauses excluded). Lines 3, 7 and 10 must keep an internal pause (two sentences); lines without
   inner punctuation may not have one.
3. Cut points spotted by ear (--cuts a1,b1,a2,b2,…: speech start and end of each line, in seconds) replace the
   automatic choice, as for « Le lead perdu »: each one is snapped to the quietest 10 ms inside ±60 ms.
Each segment keeps 40 ms of silence on both sides, with 8 ms fades.

    python3 audio/split-vo-dimanche.py ../voiceover-dimanche.mp3 OUTDIR [--cuts …]
"""
import itertools
import re
import subprocess
import sys
import wave

import numpy as np

SR = 48000
SRC, OUT = sys.argv[1], sys.argv[2]
EAR = [float(v) for v in sys.argv[sys.argv.index('--cuts') + 1].split(',')] if '--cuts' in sys.argv else None
LINES = ["Jeudi, trois rencontres avec des vendeurs.", "Tout a commencé dimanche, à vingt et une heures quatorze.",
         "Sophie cherche à vendre son condo. Elle tombe sur votre équipe.", "Moins d'une minute plus tard, elle a sa réponse.",
         "Vous, vous étiez au souper.", "Lundi matin, Julie l'appelle.", "Marc n'était pas prêt. On est restés en contact.",
         "Jeudi, ils sont tous à l'agenda.", "Vous savez d'où viennent vos prochains mandats.",
         "On livre, ou le mois est gratuit. Pas de contrat.", "Votre diagnostic gratuit, sur scalesuiteqc.ca."]
NL = len(LINES)
SYLL = [11, 15, 18, 14, 7, 9, 12, 9, 11, 13, 16]
INNER_OK = [True, True, True, True, True, True, True, True, False, True, True]
INNER_MUST = [False, False, True, False, False, False, True, False, False, True, False]


def pauses(d):
    err = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', SRC, '-af', f'silencedetect=noise=-40dB:d={d}', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    return list(zip(map(float, re.findall(r'silence_start: ([\d.]+)', err)), map(float, re.findall(r'silence_end: ([\d.]+)', err))))


raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', SRC, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], check=True, capture_output=True).stdout
x = np.frombuffer(raw, '<i2').astype(np.float64) / 32768
h = int(0.01 * SR)
db = 20 * np.log10(np.sqrt(np.convolve(x ** 2, np.ones(h) / h, 'same')) + 1e-9)[::h]
act = np.where(db > -40)[0]
s0, s1 = act[0] * 0.01, act[-1] * 0.01 + 0.01

long_p = pauses(0.7)
P = pauses(0.2)
if EAR:
    method = 'cut points spotted by ear, snapped into silence'
elif len(long_p) == NL - 1:
    cuts, P, method = list(range(NL - 1)), long_p, f'{NL - 1} pauses of at least 0.7 s'
else:
    best = None
    for cuts in itertools.combinations(range(len(P)), NL - 1):
        b = [s0] + [v for c in cuts for v in P[c]] + [s1]
        rates, pen = [], 0
        for k in range(NL):
            a, z = b[2 * k], b[2 * k + 1]
            inner = [p for i, p in enumerate(P) if i not in cuts and p[0] > a and p[1] < z]
            rates.append(SYLL[k] / ((z - a) - sum(q - p for p, q in inner)))
            pen += (bool(inner) and not INNER_OK[k]) + (INNER_MUST[k] and not inner)
        score = np.std(np.log(rates)) + pen
        if best is None or score < best[0]:
            best = (score, cuts)
    cuts, method = best[1], f'best fit of {NL - 1} among {len(P)} pauses of at least 0.2 s (rate spread {best[0]:.3f})'
print(f'take {len(x) / SR:.2f} s, speech {s0:.2f}–{s1:.2f} s, {len(long_p)} pauses ≥ 0.7 s → {method}')
if EAR:
    rms = np.sqrt(np.convolve(x ** 2, np.ones(h) / h, 'same'))

    def snap(t):
        i0, i1 = int(max(0, t - 0.06) * SR), int(min(len(x) / SR, t + 0.06) * SR)
        return (i0 + int(np.argmin(rms[i0:max(i1, i0 + 1)]))) / SR
    bounds, cuts = [snap(v) for v in EAR], []
else:
    bounds = [s0] + [v for c in cuts for v in P[c]] + [s1]
print(' #   speech start – end     length  inner pauses           syll/s  line')
for k in range(NL):
    a, z = bounds[2 * k], bounds[2 * k + 1]
    inner = [p for i, p in enumerate(P) if i not in cuts and p[0] > a and p[1] < z]
    net = (z - a) - sum(q - p for p, q in inner)
    lo, hi = max(0.0, a - 0.04), min(len(x) / SR, z + 0.04)
    seg = x[int(lo * SR):int(hi * SR)].copy()
    f = int(0.008 * SR)
    seg[:f] *= np.linspace(0, 1, f)
    seg[-f:] *= np.linspace(1, 0, f)
    with wave.open(f'{OUT}/l{k + 1}.wav', 'wb') as o:
        o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR)
        o.writeframes((np.clip(seg, -1, 1) * 32767).astype('<i2').tobytes())
    ins = ', '.join(f'{p - a:.2f} s in' for p, q in inner) or '—'
    print(f' {k + 1}   {a:6.2f} – {z:6.2f}   {z - a:5.2f} s  {ins:22s} {SYLL[k] / net:5.2f}  {LINES[k]}')
