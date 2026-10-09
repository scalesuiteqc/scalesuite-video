#!/usr/bin/env bash
# Build « Le lead perdu » (9:16). V2/V3 build scripts and outputs are left untouched.
#   ./build-lead-perdu.sh preview   → 540×960 30 fps preview with sound + timestamped contact sheet (one row per scene)
#   ./build-lead-perdu.sh final     → 1080×1920 60 fps master (frame 0 = poster), poster JPEG, audio stems
# Frames are rendered at 1080×1920 and downscaled (Chrome ignores a fractional deviceScaleFactor).
set -euo pipefail
cd "$(dirname "$0")"
MODE=${1:-preview}
OUT=../brag-output
WORK=$OUT/work-lead-perdu
NAME=scalesuite-lead-perdu-9x16
mkdir -p "$WORK" "$OUT/previews"
node render/cues-lead-perdu.mjs > "$WORK/cues.json"
END=$(python3 -c "import json;print(json.load(open('$WORK/cues.json'))['duration'])")

# ---- sound: cues exported from the GSAP timeline, synthesised, loudness-normalised (−15 LUFS / −1.5 dBTP)
python3 audio/music-lead-perdu.py --cues "$WORK/cues.json" --end "$END" "$WORK/music-raw.wav" --stems "$WORK/stems"
MEAS=$(ffmpeg -hide_banner -nostats -i "$WORK/music-raw.wav" -af loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p' |
  python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -hide_banner -loglevel error -y -i "$WORK/music-raw.wav" -af "loudnorm=I=-15:TP=-1.5:LRA=11:$MEAS:linear=true" -ar 48000 "$WORK/music.wav"
TRACK="$WORK/music.wav"

if [ "$MODE" = preview ]; then
  rm -rf "$WORK/frames-preview"
  node render/frames-lead-perdu.mjs --fps=30 --workers=4 --out="$WORK/frames-preview"
  ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$WORK/frames-preview/%05d.png" -i "$TRACK" -map 0:v -map 1:a \
    -vf "scale=540:-2:flags=lanczos,format=yuv420p" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart -shortest "$OUT/previews/$NAME-preview.mp4"
  rm -rf "$WORK/frames-preview"
  # timestamped contact sheet: a few frames per scene, one row per scene
  ROWS=(
    "1 · Accroche (0–3,0 s)|0.00,0.55,0.75,1.50,2.40"
    "2 · Une boîte pour toute l'équipe (3,0–5,6 s)|3.10,3.40,4.20,5.20"
    "3 · Toujours non lu (5,6–8,4 s)|5.80,6.00,6.60,7.20,8.10"
    "4 · Trop tard (8,4–10,8 s)|8.50,8.90,9.40,9.80,10.60"
    "5 · Avec ScaleSuite (10,8–12,95 s)|10.90,11.10,11.30,11.50,12.40"
    "6 · Chaque courtier a sa campagne (12,95–16,55 s)|13.10,13.40,14.40,14.95,15.40,16.20"
    "7 · Chez Courtier 03 (16,55–21,0 s)|16.65,16.90,17.30,17.70,18.60,19.15,19.50,20.60"
    "8 · Fin (21,0–25,2 s)|21.20,21.60,21.90,22.30,22.70,23.20,25.10"
  )
  ALL="" NAMES="" ARGS=()
  for i in "${!ROWS[@]}"; do
    s=$((i + 1)); title="${ROWS[$i]%%|*}"; times="${ROWS[$i]#*|}"; files=""
    for t in ${times//,/ }; do ALL="$ALL,$t"; NAMES="$NAMES,s$s-$t"; files="$files,$WORK/sheet/s$s-$t.png"; done
    ARGS+=("$title|${files#,}")
  done
  rm -rf "$WORK/sheet" && mkdir -p "$WORK/sheet"
  node render/stills-lead-perdu.mjs --times="${ALL#,}" --names="${NAMES#,}" --out="$WORK/sheet"
  python3 render/sheet-v3.py "$OUT/$NAME-contact-sheet.jpg" 200 "${ARGS[@]}"
else
  node render/stills-lead-perdu.mjs --times=2.4 --names=poster --out="$WORK"
  ffmpeg -hide_banner -loglevel error -y -i "$WORK/poster.png" -q:v 2 "$OUT/$NAME-poster.jpg"
  rm -rf "$WORK/frames-final"
  node render/frames-lead-perdu.mjs --fps=60 --workers=4 --poster --out="$WORK/frames-final"
  ffmpeg -hide_banner -loglevel error -y -framerate 60 -i "$WORK/frames-final/%05d.png" -i "$TRACK" \
    -map 0:v -map 1:a -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/$NAME.mp4"
  rm -rf "$WORK/frames-final"
  mkdir -p "$OUT/audio-lead-perdu"
  for s in bed sfx; do ffmpeg -hide_banner -loglevel error -y -i "$WORK/stems/$s.wav" -c:a flac "$OUT/audio-lead-perdu/$s.flac"; done
  ffmpeg -hide_banner -loglevel error -y -i "$TRACK" -c:a flac "$OUT/audio-lead-perdu/music.flac"
fi
echo "done: $MODE"
