"""Cut the single ElevenLabs take of « Le lead perdu » into its 7 lines.

The 1.5 s breaks were not generated (pauses between lines are only 0.2–0.46 s, like some pauses
inside a line), so the cuts are NOT found by counting silences: they start from the cut points
spotted by ear and each boundary is moved by a few hundredths to the quietest 10 ms inside ±60 ms,
so every cut falls in silence. Each segment gets 8 ms fades.

    python3 audio/split-vo-lead-perdu.py ../voiceover-lead-perdu.mp3 OUTDIR
"""
import subprocess
import sys
import wave

import numpy as np

SR = 48000
SRC, OUT = sys.argv[1], sys.argv[2]
CUTS = [(0.00, 2.26), (2.70, 4.49), (4.94, 6.62), (7.07, 9.62), (10.02, 13.19), (13.53, 15.50), (15.95, 17.95)]

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
