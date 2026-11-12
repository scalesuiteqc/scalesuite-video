#!/usr/bin/env bash
# Build « Qui répond à 2 h du matin? ». Earlier build scripts and outputs are left untouched.
#   ./build-qui-repond.sh preview [16x9|9x16]  → half-size 60 fps preview + contact sheet + control report
#   ./build-qui-repond.sh final   [16x9|9x16]  → full-size 60 fps master (1920×1080 or 1080×1920) + control report
# Frames are rendered with real motion blur (render/frames-qui-repond.mjs: 8 samples, 180° shutter, on the
# frames where something moves fast). The controls (render/check-frames-qui-repond.py) run on the rendered
# frames AND on the encoded file: no frozen picture (more than 3 identical frames), no isolated jump.
# STAGE=2 reuses the stage 1 frames already in the work folder.
set -euo pipefail
cd "$(dirname "$0")"
MODE=${1:-preview}
FORMAT=${2:-16x9}
OUT=../brag-output
WORK=$OUT/work-qui-repond
NAME=scalesuite-qui-repond-$FORMAT
CUTS=$(node -e "const b=60/108;console.log([4,7,15].map(n=>(n*b).toFixed(4)).join(','))")   # the three intended hard cuts (beats 4, 7 and 15)
mkdir -p "$WORK" "$OUT/previews"
AUDIO=()
[ -f "$WORK/music.wav" ] && AUDIO=(-i "$WORK/music.wav" -map 0:v -map 1:a -c:a aac -b:a 192k -shortest)

if [ "$MODE" = preview ]; then SHOT=0.5; F="$WORK/pv60-$FORMAT"; DEST="$OUT/previews/$NAME-preview-60fps.mp4"; ENC=(-c:v libx264 -preset medium -crf 18)
else SHOT=1; F="$WORK/final-$FORMAT"; DEST="$OUT/$NAME.mp4"; ENC=(-c:v libx264 -preset slow -crf 15 -profile:v high); fi
REPORT="$OUT/$NAME-controles-$MODE.txt"

if [ "${STAGE:-all}" != 2 ]; then rm -rf "${F:?}"; fi
mkdir -p "$F"
node render/frames-qui-repond.mjs --fps=60 --workers=4 --format="$FORMAT" --shot="$SHOT" --mb=8 --stage="${STAGE:-all}" --out="$F"
ffmpeg -hide_banner -loglevel error -y -framerate 60 -i "$F/%05d.png" "${AUDIO[@]}" \
  -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" "${ENC[@]}" -pix_fmt yuv420p \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv -movflags +faststart "$DEST"
{
  echo "« Qui répond à 2 h du matin? » · $FORMAT · $MODE · 108 BPM, 81 temps"
  echo
  echo "== Rendered frames (before encoding) =="
  python3 render/check-frames-qui-repond.py "$F" 60 "$CUTS" || true
  echo
  echo "== Encoded file =="
  python3 render/check-frames-qui-repond.py "$DEST" 60 "$CUTS" || true
} | tee "$REPORT"

if [ "$MODE" = preview ]; then
  # timestamped contact sheet: one row per scene, frames taken on beats (seconds = beats × 60 / 108)
  ROWS=(
    "1 · La nuit (temps 0–7)|0.60,1.20,2.10,2.50,3.10,3.80"
    "2 · La question (temps 7–15)|4.30,5.00,5.90,6.50,7.30,7.90"
    "3 · La vitesse (temps 15–22)|8.90,9.50,10.05,10.40,11.20,12.10"
    "4 · Un seul courtier (temps 22–33)|12.60,13.60,15.00,16.30,17.00,17.90"
    "5 · Révélation (temps 33–39)|18.60,19.00,19.30,20.30,21.00,21.45"
    "6 · Le système (temps 39–59)|23.00,23.80,25.60,27.90,30.00,32.20"
    "7 · Compte rendu (temps 59–65)|33.00,33.60,34.60,35.40,35.80,36.00"
    "8 · La preuve (temps 65–72)|36.40,37.00,37.90,38.60,39.30,39.75"
    "9 · Appel à l'action (temps 72–81)|40.40,41.00,41.90,42.90,43.60,44.90"
  )
  ALL="" NAMES="" ARGS=()
  for i in "${!ROWS[@]}"; do
    s=$((i + 1)); title="${ROWS[$i]%%|*}"; times="${ROWS[$i]#*|}"; files=""
    for t in ${times//,/ }; do ALL="$ALL,$t"; NAMES="$NAMES,s$s-$t"; files="$files,$WORK/sheet-$FORMAT/s$s-$t.png"; done
    ARGS+=("$title|${files#,}")
  done
  rm -rf "${WORK:?}/sheet-$FORMAT" && mkdir -p "$WORK/sheet-$FORMAT"
  node render/stills-qui-repond.mjs --format="$FORMAT" --times="${ALL#,}" --names="${NAMES#,}" --out="$WORK/sheet-$FORMAT"
  python3 render/sheet-v3.py "$OUT/$NAME-contact-sheet.jpg" 420 "${ARGS[@]}"
fi
echo "done: $MODE $FORMAT → $DEST"
