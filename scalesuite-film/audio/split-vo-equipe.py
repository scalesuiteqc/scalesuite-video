"""Cut the single ElevenLabs take of « Gardez vos courtiers » into its 8 lines.

1. If silencedetect finds exactly 7 pauses of at least 1 s, cut there.
2. Otherwise (the 1.5 s breaks were not generated), detect every pause of at least 0.2 s and try every
   choice of 7 of them: keep the one whose 8 segments speak at the most even rate (syllables per
   second of speech, internal pauses excluded). Lines 7 and 8 must keep an internal pause ("Gardez vos
   courtiers. | Attirez…", "ScaleSuite. | Demandez…"); lines without inner punctuation may not have one.
Each segment keeps 40 ms of silence on both sides, with 8 ms fades.

    python3 audio/split-vo-equipe.py ../voiceover-equipe.mp3 OUTDIR
"""
import itertools
import re
import subprocess
import sys
import wave

import numpy as np

SR = 48000
SRC, OUT = sys.argv[1], sys.argv[2]
LINES = ["Votre meilleur courtier vient de partir.", "Les leads Google allaient dans un bassin commun.",
         "Pour lui, les bons leads allaient toujours aux autres.", "Avec ScaleSuite, vos leads Google ne se partagent plus.",
         "Chaque courtier reçoit les leads de sa campagne.", "Quand vous recrutez, vous offrez du concret.",
         "Gardez vos courtiers. Attirez les prochains.", "ScaleSuite. Demandez une démo."]
WORDS = [6, 8, 9, 9, 8, 7, 6, 4]
SYLL = [10, 12, 12, 14, 11, 11, 11, 8]
INNER_OK = [False, False, True, True, False, True, True, True]   # inner punctuation (comma or full stop)
INNER_MUST = [False] * 6 + [True, True]


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

long_p = pauses(1.0)
P = pauses(0.2)
if len(long_p) == 7:
    cuts, P, method = list(range(7)), long_p, '7 pauses of at least 1 s'
else:
    best = None
    for cuts in itertools.combinations(range(len(P)), 7):
        b = [s0] + [v for c in cuts for v in P[c]] + [s1]
        rates, pen = [], 0
        for k in range(8):
            a, z = b[2 * k], b[2 * k + 1]
            inner = [p for i, p in enumerate(P) if i not in cuts and p[0] > a and p[1] < z]
            rates.append(SYLL[k] / ((z - a) - sum(q - p for p, q in inner)))
            pen += (bool(inner) and not INNER_OK[k]) + (INNER_MUST[k] and not inner)
        score = np.std(np.log(rates)) + pen
        if best is None or score < best[0]:
            best = (score, cuts)
    cuts, method = best[1], f'best fit of 7 among {len(P)} pauses of at least 0.2 s (rate spread {best[0]:.3f})'
print(f'take {len(x) / SR:.2f} s, speech {s0:.2f}–{s1:.2f} s, {len(long_p)} pauses ≥ 1 s → {method}')
bounds = [s0] + [v for c in cuts for v in P[c]] + [s1]
print(' #   speech start – end     length  inner pauses           syll/s  line')
for k in range(8):
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
