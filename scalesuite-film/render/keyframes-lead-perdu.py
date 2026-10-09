"""Key-frame contact sheet (stills, no animation): python3 render/keyframes-lead-perdu.py out.jpg cols "caption|file.png" ...
Each still is shown at 540 × 960 with its caption above it."""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

out, cols = sys.argv[1], int(sys.argv[2])
items = [(a.split('|')[0], a.split('|')[1]) for a in sys.argv[3:]]
TW, TH, pad, cap = 540, 960, 18, 64
rows = (len(items) + cols - 1) // cols
W, H = pad + cols * (TW + pad), pad + rows * (cap + TH + pad)
sheet = Image.new('RGB', (W, H), (38, 42, 41))
d = ImageDraw.Draw(sheet)
def font(sz, bold=True):
    p = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if bold else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
    return ImageFont.truetype(p, sz) if os.path.exists(p) else ImageFont.load_default()
f1 = font(24)
for i, (caption, f) in enumerate(items):
    x, y = pad + (i % cols) * (TW + pad), pad + (i // cols) * (cap + TH + pad)
    d.text((x + 2, y + 18), caption, fill=(120, 230, 214), font=f1)
    sheet.paste(Image.open(f).convert('RGB').resize((TW, TH), Image.LANCZOS), (x, y + cap))
sheet.save(out, quality=90)
print(out, sheet.size)
