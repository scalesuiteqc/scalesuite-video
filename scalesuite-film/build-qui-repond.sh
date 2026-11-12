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
# sound first: audio/mix-qui-repond.sh writes the final mix (voice + score + effects) to $WORK/music.wav and the timeline to $WORK/cues.json
[ -f "$WORK/cues.json" ] || ./audio/mix-qui-repond.sh
# the intended hard cuts: to the bedroom, to the question, to « Rappelle… », to the light on « le Système », to the call to action
CUTS=$(python3 -c "
import json;c=json.load(open('$WORK/cues.json'));S=c['start'];v=c['vo']
print(','.join(f'{x:.4f}' for x in [S['s1']+v['s1']['cues']['trois']['t']+0.95,S['s2'],S['s3'],S['s5']+v['s5']['cues']['systeme']['t'],S['s9']]))")
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
  echo "« Qui répond à 2 h du matin? » · $FORMAT · $MODE · voice-led timeline, score at 108 BPM"
  echo
  echo "== Rendered frames (before encoding) =="
  python3 render/check-frames-qui-repond.py "$F" 60 "$CUTS" || true
  echo
  echo "== Encoded file =="
  python3 render/check-frames-qui-repond.py "$DEST" 60 "$CUTS" || true
  echo
  echo "== Voice sync (key words and figures: 2 frames ; other cue words: 4 frames) =="
  node render/sync-qui-repond.mjs || true
  echo
  echo "== Scene 6 hours =="
  node render/hours-qui-repond.mjs || true
  echo
  echo "== Sound (target: -14 LUFS integrated, true peak at most -1 dBTP) =="
  ffmpeg -hide_banner -nostats -i "$DEST" -af ebur128=peak=true -f null - 2>&1 | grep -E "^ +I:|Peak:" | tail -2 || true
} | tee "$REPORT"

if [ "$MODE" = preview ]; then
  # timestamped contact sheet: one row per scene, frames taken on beats (seconds = beats × 60 / 108)
  ROWS=(
    "1 · La nuit|0.70,1.80,3.00,3.30,3.90,4.25"
    "2 · La question|4.80,5.30,5.90,6.50,7.20,7.90"
    "3 · La vitesse|8.60,9.60,10.20,10.75,11.40,12.60"
    "4 · Un seul courtier|13.50,14.30,15.90,17.20,18.90,20.60"
    "5 · Voici|21.50,22.10,22.40,22.80,23.60,24.80"
    "6 · Le système|25.60,27.33,30.60,34.60,37.40,38.80"
    "7 · Compte rendu|43.80,44.40,45.00,45.40,45.70,45.85"
    "8 · La preuve|46.40,47.80,50.20,52.40,54.20,55.00"
    "9 · Appel à l'action|55.60,56.10,56.90,57.80,58.60,59.30"
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
