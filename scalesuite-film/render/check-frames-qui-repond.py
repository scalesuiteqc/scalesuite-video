"""Automatic controls on the rendered film: frozen pictures and jumps.
  python3 check-frames-qui-repond.py <frames dir | video.mp4> <fps> [cut times, comma separated]
FROZEN   fails if more than 3 consecutive frames are strictly identical (every pixel equal).
JUMPS    fails if a frame differs sharply from both neighbours while they barely move (an isolated spike),
         outside the intended hard cuts.
FLASH    reports the largest change of mean brightness from one frame to the next, outside the hard cuts
         (a light/dark transition spread over half a second stays far below a cut)."""
import glob
import os
import subprocess
import sys

import numpy as np
from PIL import Image

src, fps = sys.argv[1], float(sys.argv[2])
cuts = [float(x) for x in sys.argv[3].split(',')] if len(sys.argv) > 3 and sys.argv[3] else []


def frames():
    if os.path.isdir(src):
        for f in sorted(glob.glob(os.path.join(src, '[0-9]*.png'))):
            yield np.asarray(Image.open(f).convert('L'))
    else:
        probe = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout.strip().split(',')
        w, h = int(probe[0]), int(probe[1])
        p = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', src, '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], stdout=subprocess.PIPE)
        while True:
            buf = p.stdout.read(w * h)
            if len(buf) < w * h:
                break
            yield np.frombuffer(buf, dtype=np.uint8).reshape(h, w)


prev, diff, same, luma = None, [], [], []
for a in frames():
    luma.append(float(a.mean()))
    if prev is not None:
        d = np.abs(a.astype(np.int16) - prev.astype(np.int16))
        diff.append(float(d.mean()))
        same.append(not d.any())
    prev = a
n = len(luma)
is_cut = lambda i: any(abs(i / fps - c) <= 1.5 / fps for c in cuts)  # diff[i-1] is the change INTO frame i

# frozen runs: k identical transitions = k + 1 identical frames
runs, start = [], None
for i, s in enumerate(same + [False]):
    if s and start is None:
        start = i
    if not s and start is not None:
        if i - start + 1 > 3:
            runs.append((start, i - start + 1))
        start = None
# isolated spikes
spikes = [i + 1 for i in range(1, len(diff) - 1) if diff[i] > 6 and diff[i] > 2.2 * max(diff[i - 1], diff[i + 1], 0.5) and not is_cut(i + 1)]
steps = [(abs(luma[i + 1] - luma[i]), i + 1) for i in range(n - 1) if not is_cut(i + 1)]
flash = max(steps)
still = sorted(diff)[:5]

name = os.path.basename(src.rstrip('/'))
print(f'CONTROLS  {name}  ·  {n} frames at {fps:g} fps ({n / fps:.2f} s)')
print(f'FROZEN    {"FAIL" if runs else "OK"}: {len(runs)} run(s) of more than 3 identical frames' + ''.join(f'\n          {s / fps:.2f} s → {(s + k) / fps:.2f} s ({k} frames)' for s, k in runs))
print(f'          identical pairs of consecutive frames: {sum(same)} / {len(same)} ; smallest mean change between two frames: {still[0]:.4f} / 255')
print(f'JUMPS     {"FAIL" if spikes else "OK"}: {len(spikes)} isolated spike(s) outside the {len(cuts)} intended cut(s)' + ''.join(f'\n          {i / fps:.3f} s (change {diff[i - 1]:.1f})' for i in spikes))
for c in cuts:
    i = round(c * fps)
    near = max(diff[max(0, i - 2):i + 1]) if diff else 0
    print(f'          intended cut at {c:.3f} s: change {near:.1f}')
print(f'FLASH     largest brightness step outside the cuts: {flash[0]:.1f} / 255 in one frame, at {flash[1] / fps:.2f} s')
sys.exit(1 if runs or spikes else 0)
