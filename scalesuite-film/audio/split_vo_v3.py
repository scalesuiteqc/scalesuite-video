"""Split the single-take V3 voiceover into one file per line, ready for mix_vo.py.

    python3 audio/split_vo_v3.py --vo ../voiceover-v3.mp3 --out ../brag-output/audio-v3/vo

The take (ElevenLabs, speed 1.13) has 0.25-0.5 s between lines, as short as some pauses inside a
line, so lines are cut at fixed points found by matching the silences against the script
(see brag-output/voiceover-timing-v3.md), not by counting silences.
- Each cut is snapped to the speech edges (-55 dBFS, 10 ms RMS) and given a small natural margin
  (60 ms before, 120 ms after), never past the middle of the gap to the next line.
- Line 6 is too long for its window: its pause after « cherche » is shortened inside the silence.
- Prints the --vo arguments that put each line's first syllable at its target time.
"""
import argparse, os, subprocess, wave
import numpy as np

SR = 48000
# rough cut points (s) from the timing sheet, and where each line's speech should start in the film
CUTS = [(0.00, 1.29), (1.75, 3.73), (4.26, 7.55), (7.88, 9.80), (10.05, 12.81),
        (13.24, 16.04), (16.30, 19.44), (19.80, 21.98), (22.46, 24.53)]
AT = [0.2, 2.5, 6.5, 11.1, 14.1, 18.0, 20.9, 25.1, 27.8]  # line 6 starts 0.2 s before its window
L6_CUT = (14.29, 14.46)  # removed from the 14.24-14.48 pause after « cherche » (0.24 s -> 0.07 s)
LEAD, TAIL, FADE_IN, FADE_OUT, XF = 0.06, 0.12, 0.005, 0.03, 0.01

ap = argparse.ArgumentParser()
ap.add_argument('--vo', required=True)
ap.add_argument('--out', required=True)
a = ap.parse_args()

raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', a.vo, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'],
                     check=True, capture_output=True).stdout
x = np.frombuffer(raw, '<f4').astype(np.float64)
w = int(0.01 * SR)
db = 20 * np.log10(np.sqrt(np.convolve(x ** 2, np.ones(w) / w, 'same')) + 1e-9)
loud = db > -55


def edges(lo, hi):
    """first and last loud sample within 0.12 s of a rough cut"""
    i0, i1 = int(max(0, lo - 0.12) * SR), int(min(len(x) / SR, hi + 0.12) * SR)
    idx = np.flatnonzero(loud[i0:i1]) + i0
    return idx[0], idx[-1]


spans = [edges(lo, hi) for lo, hi in CUTS]
os.makedirs(a.out, exist_ok=True)
args = []
for k, (on, off) in enumerate(spans):
    prev_off = spans[k - 1][1] if k else 0
    next_on = spans[k + 1][0] if k + 1 < len(spans) else len(x)
    s = max(on - int(LEAD * SR), (prev_off + on) // 2 if k else 0)
    e = min(off + int(TAIL * SR), (off + next_on) // 2 if k + 1 < len(spans) else len(x))
    seg = x[s:e].copy()
    lead = (on - s) / SR
    if k == 5:  # shorten the pause after « cherche », with a short crossfade in silence
        c0, c1 = int(L6_CUT[0] * SR) - s, int(L6_CUT[1] * SR) - s
        n = int(XF * SR)
        ramp = np.linspace(0, 1, n)
        seg = np.concatenate([seg[:c0], seg[c0:c0 + n] * (1 - ramp) + seg[c1:c1 + n] * ramp, seg[c1 + n:]])
    seg[:int(FADE_IN * SR)] *= np.linspace(0, 1, int(FADE_IN * SR))
    seg[-int(FADE_OUT * SR):] *= np.linspace(1, 0, int(FADE_OUT * SR))
    path = os.path.join(a.out, f'l{k + 1}.wav')
    with wave.open(path, 'wb') as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
        f.writeframes((np.clip(seg, -1, 1) * 32767).astype('<i2').tobytes())
    speech = (off - on) / SR - (L6_CUT[1] - L6_CUT[0] if k == 5 else 0)
    print(f'l{k + 1}.wav  speech {AT[k]:6.2f} - {AT[k] + speech:6.2f} s ({speech:.2f} s), file starts {lead:.3f} s early')
    args.append(f'--vo {path}@{AT[k] - lead:.3f}')
print(' '.join(args))
