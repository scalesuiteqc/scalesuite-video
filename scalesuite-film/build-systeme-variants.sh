#!/usr/bin/env bash
# « Système Vendeurs 5 minutes » · delivery variants from the validated master with voice (no new picture render):
#   4:5 LinkedIn (1080 × 1350): the content band of the 9:16 film (y 130–1640) scaled to 1350 px high (× 0.894),
#     centred; the 57 px side margins continue the film's own background (edge pixels smeared), texts unchanged.
#   web (720 × 1280, 30 fps, H.264, faststart, 3–6 MB) and its poster JPEG (720 × 1280, < 150 KB).
set -euo pipefail
cd "$(dirname "$0")"
OUT=../brag-output
SRC=$OUT/scalesuite-systeme-9x16-vo.mp4
ffmpeg -hide_banner -loglevel error -y -i "$SRC" \
  -vf "crop=1080:1510:0:130,scale=966:1350:flags=lanczos,pad=1080:1350:57:0,fillborders=left=57:right=57:mode=smear,format=yuv420p" \
  -c:v libx264 -preset slow -crf 17 -profile:v high -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:a copy -movflags +faststart "$OUT/scalesuite-systeme-4x5-vo.mp4"
# web: two-pass, ≈ 1.15 Mb/s video + 96 kb/s audio (≈ 4.8 MB for 31 s)
W=$OUT/work-systeme
ffmpeg -hide_banner -loglevel error -y -i "$SRC" -vf "fps=30,scale=720:1280:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -b:v 1150k -pass 1 -passlogfile "$W/x264web" -an -f mp4 /dev/null
ffmpeg -hide_banner -loglevel error -y -i "$SRC" -vf "fps=30,scale=720:1280:flags=lanczos,format=yuv420p" -c:v libx264 -preset slow -b:v 1150k -pass 2 -passlogfile "$W/x264web" \
  -profile:v high -pix_fmt yuv420p -colorspace bt709 -color_primaries bt709 -color_trc bt709 -c:a aac -b:a 96k -ar 48000 -movflags +faststart "$OUT/scalesuite-systeme-web-720x1280.mp4"
# web poster: the launch poster (reveal frame), 720 × 1280, quality lowered until it is under 150 KB
for q in 4 5 6 7 8 10 12; do
  ffmpeg -hide_banner -loglevel error -y -i "$OUT/scalesuite-systeme-9x16-affiche-lancement.jpg" -vf "scale=720:1280:flags=lanczos" -q:v $q "$OUT/scalesuite-systeme-web-affiche-720x1280.jpg"
  [ "$(stat -c %s "$OUT/scalesuite-systeme-web-affiche-720x1280.jpg")" -lt 150000 ] && break
done
ls -l "$OUT"/scalesuite-systeme-4x5-vo.mp4 "$OUT"/scalesuite-systeme-web-720x1280.mp4 "$OUT"/scalesuite-systeme-web-affiche-720x1280.jpg
