#!/usr/bin/env bash
# Build « Système Vendeurs 5 minutes » (9:16). V2/V3 build scripts and outputs are left untouched.
#   ./build-systeme-v2.sh preview   → 540×960 30 fps preview with sound + timestamped contact sheet (one row per scene)
#   ./build-systeme-v2.sh final     → 1080×1920 60 fps master (frame 0 = poster), poster JPEG, audio stems
# Frames are rendered at 1080×1920 and downscaled (Chrome ignores a fractional deviceScaleFactor).
set -euo pipefail
cd "$(dirname "$0")"
MODE=${1:-preview}
OUT=../brag-output
WORK=$OUT/work-systeme-v2
NAME=scalesuite-systeme-v2-9x16
mkdir -p "$WORK" "$OUT/previews"
node render/cues-systeme-v2.mjs > "$WORK/cues.json"
END=$(python3 -c "import json;print(json.load(open('$WORK/cues.json'))['duration'])")

# ---- sound: cues exported from the GSAP timeline, synthesised, loudness-normalised (−15 LUFS / −1.5 dBTP)
python3 audio/music-systeme-v2.py --cues "$WORK/cues.json" --end "$END" "$WORK/music-raw.wav" --stems "$WORK/stems"
MEAS=$(ffmpeg -hide_banner -nostats -i "$WORK/music-raw.wav" -af loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p' |
  python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -hide_banner -loglevel error -y -i "$WORK/music-raw.wav" -af "loudnorm=I=-15:TP=-1.5:LRA=11:$MEAS:linear=true" -ar 48000 "$WORK/music.wav"
TRACK="$WORK/music.wav"

if [ "$MODE" = preview ]; then
  rm -rf "$WORK/frames-preview"
  node render/frames-systeme-v2.mjs --fps=30 --workers=4 --out="$WORK/frames-preview"
  ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$WORK/frames-preview/%05d.png" -i "$TRACK" -map 0:v -map 1:a \
    -vf "scale=540:-2:flags=lanczos,format=yuv420p" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart -shortest "$OUT/previews/$NAME-preview.mp4"
  rm -rf "$WORK/frames-preview"
  # timestamped contact sheet: a few frames per scene, one row per scene
  ROWS=(
    "1 · La destination (0–3,4 s)|0.00,1.50,3.00,3.45"
    "2 · Le nom (3,4–6,6 s)|3.60,3.90,4.40,5.20,6.40"
    "3 · Samedi, 14 h 12 (6,6–8,4 s)|6.70,6.95,7.40,7.80,8.30"
    "4 · Le vendeur (8,4–11,8 s)|8.55,8.95,9.50,10.20,11.40"
    "5 · L'équipe (11,8–15,6 s)|11.95,12.40,13.20,13.80,14.40,15.20"
    "6 · La semaine (15,6–19,6 s)|15.80,16.10,16.60,17.20,19.20"
    "7 · On s'occupe de tout (19,6–22,4 s)|19.70,19.95,20.40,21.20,22.20"
    "8–9 · Preuve, garantie, rareté (22,4–27,6 s)|22.60,23.60,24.60,25.20,26.40,27.40"
    "10 · Fin (27,6–33,2 s)|27.80,28.20,28.90,29.85,30.20,30.70,33.10"
  )



  ALL="" NAMES="" ARGS=()
  for i in "${!ROWS[@]}"; do
    s=$((i + 1)); title="${ROWS[$i]%%|*}"; times="${ROWS[$i]#*|}"; files=""
    for t in ${times//,/ }; do ALL="$ALL,$t"; NAMES="$NAMES,s$s-$t"; files="$files,$WORK/sheet/s$s-$t.png"; done
    ARGS+=("$title|${files#,}")
  done
  rm -rf "$WORK/sheet" && mkdir -p "$WORK/sheet"
  node render/stills-systeme-v2.mjs --times="${ALL#,}" --names="${NAMES#,}" --out="$WORK/sheet"
  python3 render/sheet-v3.py "$OUT/$NAME-contact-sheet.jpg" 200 "${ARGS[@]}"
else
  node render/stills-systeme-v2.mjs --times=2.6 --names=poster --out="$WORK"
  ffmpeg -hide_banner -loglevel error -y -i "$WORK/poster.png" -q:v 2 "$OUT/$NAME-poster.jpg"
  rm -rf "$WORK/frames-final"
  node render/frames-systeme-v2.mjs --fps=60 --workers=4 --poster --out="$WORK/frames-final"
  ffmpeg -hide_banner -loglevel error -y -framerate 60 -i "$WORK/frames-final/%05d.png" -i "$TRACK" \
    -map 0:v -map 1:a -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/$NAME.mp4"
  rm -rf "$WORK/frames-final"
  mkdir -p "$OUT/audio-systeme-v2"
  for s in bed sfx; do ffmpeg -hide_banner -loglevel error -y -i "$WORK/stems/$s.wav" -c:a flac "$OUT/audio-systeme-v2/$s.flac"; done
  ffmpeg -hide_banner -loglevel error -y -i "$TRACK" -c:a flac "$OUT/audio-systeme-v2/music.flac"
fi
echo "done: $MODE"
