#!/usr/bin/env bash
# Build « Qui répond à 2 h du matin? ». Earlier build scripts and outputs are left untouched.
#   ./build-qui-repond.sh preview [16x9|9x16]  → half-size 30 fps preview (silent until the score exists) + contact sheet
#   ./build-qui-repond.sh final   [16x9|9x16]  → full-size 30 fps master (1920×1080 or 1080×1920)
set -euo pipefail
cd "$(dirname "$0")"
MODE=${1:-preview}
FORMAT=${2:-16x9}
OUT=../brag-output
WORK=$OUT/work-qui-repond
NAME=scalesuite-qui-repond-$FORMAT
mkdir -p "$WORK" "$OUT/previews"
AUDIO=()
[ -f "$WORK/music.wav" ] && AUDIO=(-i "$WORK/music.wav" -map 0:v -map 1:a -c:a aac -b:a 160k -shortest)

if [ "$MODE" = preview ]; then
  F="$WORK/frames-preview-$FORMAT"
  rm -rf "${F:?}" && mkdir -p "$F"
  node render/frames-qui-repond.mjs --fps=30 --workers=4 --format="$FORMAT" --shot=0.5 --out="$F"
  ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$F/%05d.png" "${AUDIO[@]}" \
    -vf "format=yuv420p" -c:v libx264 -preset medium -crf 21 -pix_fmt yuv420p -movflags +faststart "$OUT/previews/$NAME-preview.mp4"
  rm -rf "${F:?}"
  # timestamped contact sheet: a few frames per scene, one row per scene
  ROWS=(
    "1 · La nuit (0–3,9 s)|0.50,1.20,2.00,2.60,3.00,3.70"
    "2 · La question (3,9–8,2 s)|4.30,5.00,5.90,6.60,7.15,7.60"
    "3 · La vitesse (8,2–13,0 s)|9.00,9.85,10.60,11.20,11.90,12.90"
    "4 · Un seul courtier (13,0–20,2 s)|13.60,15.30,16.50,17.20,18.50,19.70"
    "5 · Révélation (20,2–23,4 s)|20.60,20.90,21.25,21.80,22.90,23.20"
    "6 · Le système (23,4–36,6 s)|24.00,25.80,28.40,31.20,33.90,36.10"
    "7 · Compte rendu (36,6–40,4 s)|37.20,38.00,39.60,40.05,40.20,40.33"
    "8 · La preuve (40,4–44,6 s)|40.80,41.20,42.00,43.00,43.90,44.40"
    "9 · Appel à l'action (44,6–49,6 s)|45.00,45.50,46.00,46.90,47.60,49.50"
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
else
  F="$WORK/frames-final-$FORMAT"
  rm -rf "${F:?}" && mkdir -p "$F"
  node render/frames-qui-repond.mjs --fps=30 --workers=4 --format="$FORMAT" --out="$F"
  ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$F/%05d.png" "${AUDIO[@]}" \
    -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 16 -profile:v high -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv -movflags +faststart "$OUT/$NAME.mp4"
  rm -rf "${F:?}"
fi
echo "done: $MODE $FORMAT"
