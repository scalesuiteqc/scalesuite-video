"""Cut the single ElevenLabs take of « Le Système Vendeurs 5 minutes » into its 9 lines (copy of
audio/split-vo-lead-perdu.py, same method).

The 1.5 s breaks were not generated (pauses between lines are only 0.2–0.46 s, like some pauses
inside a line), so the cuts are NOT found by counting silences: they start from the cut points
spotted by ear and each boundary is moved by a few hundredths to the quietest 10 ms inside ±60 ms,
so every cut falls in silence. Each segment gets 8 ms fades.

    python3 audio/split-vo-systeme.py ../voiceover-systeme.mp3 OUTDIR
"""
import subprocess
import sys
import wave

import numpy as np

SR = 48000
SRC, OUT = sys.argv[1], sys.argv[2]
# cut points between the lines (the take has 16 spoken blocks; pauses inside lines are kept):
#  1 « Un vendeur vous écrit. | Votre courtier le voit trois heures trop tard. »
#  2 « Voici, | le Système Vendeurs cinq minutes. »   3 « Chaque vendeur reçoit un texto dans la minute. »
#  4 « Sans rappel en dix minutes, | l'équipe est relancée. »   5 « Pas prêt à vendre? | Suivi pendant quatre vingt dix jours. »
#  6 « Aucune demande ne reste sans réponse. »   7 « Si on ne livre pas, | vous ne payez pas. »
#  8 « Vos courtiers rencontrent des vendeurs. | Nous, | on vous les amène. »   9 « Obtenez votre diagnostic gratuit. »
CUTS = [(0.00, 3.75), (4.10, 7.70), (8.06, 10.50), (10.75, 13.38), (13.72, 16.51), (16.86, 18.90), (19.11, 21.39), (21.72, 25.19), (25.50, 27.56)]

raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', SRC, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], check=True, capture_output=True).stdout
x = np.frombuffer(raw, '<i2').astype(np.float64) / 32768
w = int(0.010 * SR)
rms = np.sqrt(np.convolve(x ** 2, np.ones(w) / w, 'same'))
db = 20 * np.log10(rms + 1e-9)


def snap(t, lo_bound, hi_bound):
    a, b = max(lo_bound, t - 0.06), min(hi_bound, t + 0.06)
    i0, i1 = int(a * SR), max(int(a * SR) + 1, int(b * SR))
    return (i0 + int(np.argmin(rms[i0:i1]))) / SR


dur = len(x) / SR
print(f'take: {dur:.3f} s')
print(' #   cut by ear        snapped           level at cuts (dBFS)   length')
for k, (a, b) in enumerate(CUTS):
    sa = 0.0 if a == 0 else snap(a, 0, dur)
    sb = min(dur, snap(b, 0, dur)) if b < dur - 0.02 else dur
    seg = x[int(sa * SR):int(sb * SR)].copy()
    f = int(0.008 * SR)
    seg[:f] *= np.linspace(0, 1, f)
    seg[-f:] *= np.linspace(1, 0, f)
    with wave.open(f'{OUT}/l{k + 1}.wav', 'wb') as o:
        o.setnchannels(1); o.setsampwidth(2); o.setframerate(SR)
        o.writeframes((np.clip(seg, -1, 1) * 32767).astype('<i2').tobytes())
    la = db[min(len(db) - 1, int(sa * SR))]
    lb = db[min(len(db) - 1, int(sb * SR) - 1)]
    print(f' {k + 1}   {a:5.2f} – {b:5.2f}     {sa:6.3f} – {sb:6.3f}    {la:6.1f} / {lb:6.1f}          {sb - sa:.2f} s')
