"""Motion blur helper for frames-qui-repond.mjs.
  python3 mb-qui-repond.py plan  <dir> <n> [threshold]   → JSON list of the frames where something moves fast
  python3 mb-qui-repond.py merge <dir> <samples>          → averages each fast frame with its extra samples
A frame is « fast » (8 samples) when, in at least one cell of a 12 × 16 grid, the picture changes by more than the
threshold (mean absolute difference, 0–255) from the previous or to the next frame. The average is done
in linear light (gamma 2,2), as a camera shutter would."""
import glob
import json
import os
import sys
from multiprocessing import Pool

import numpy as np
from PIL import Image

GRID = (12, 16)


def small(path):
    return np.asarray(Image.open(path).convert('L').resize((GRID[1] * 12, GRID[0] * 12), Image.BILINEAR), dtype=np.float32)


def cells(a, b):
    d = np.abs(a - b)
    return d.reshape(GRID[0], 12, GRID[1], 12).mean(axis=(1, 3)).max()


def merge_one(job):
    png, subs = job
    acc = (np.asarray(Image.open(png).convert('RGB'), dtype=np.float32) / 255.0) ** 2.2
    for s in subs:
        acc += (np.asarray(Image.open(s).convert('RGB'), dtype=np.float32) / 255.0) ** 2.2
    out = np.clip((acc / (len(subs) + 1)) ** (1 / 2.2) * 255.0 + 0.5, 0, 255).astype(np.uint8)
    Image.fromarray(out).save(png, compress_level=1)
    return 1


if __name__ == '__main__':
    mode, d = sys.argv[1], sys.argv[2]
    if mode == 'plan':
        n = int(sys.argv[3])
        thr = float(sys.argv[4]) if len(sys.argv) > 4 else 6.0
        files = [os.path.join(d, f'{i:05d}.png') for i in range(n)]
        with Pool(4) as p:
            im = p.map(small, files, chunksize=32)
        diff = [0.0] + [float(cells(im[i], im[i - 1])) for i in range(1, n)]
        # [frame, samples]: 8 samples when something moves fast, 24 on the whip pans (so the shutter leaves a streak, not a comb)
        m = lambda i: max(diff[i], diff[i + 1] if i + 1 < n else 0.0)
        fast = [[i, 24 if m(i) > 40 else 8] for i in range(n) if m(i) > thr]
        json.dump({'threshold': thr, 'diff': [round(x, 3) for x in diff]}, open(os.path.join(d, 'motion.json'), 'w'))
        print(json.dumps(fast))
    else:
        jobs = {}
        for s in sorted(glob.glob(os.path.join(d, 'sub', '*.jpg'))):
            i = os.path.basename(s).split('-')[0]
            jobs.setdefault(i, []).append(s)
        todo = [(os.path.join(d, i + '.png'), subs) for i, subs in jobs.items()]
        with Pool(4) as p:
            done = sum(p.imap_unordered(merge_one, todo, chunksize=8))
        print(f'merged {done} frames ({sum(len(s) + 1 for _, s in todo)} samples in all)')
