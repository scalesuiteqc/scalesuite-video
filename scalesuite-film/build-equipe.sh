#!/usr/bin/env bash
# Build « Gardez vos courtiers » (9:16). Earlier build scripts and outputs are left untouched.
#   ./build-equipe.sh preview   → 540×960 30 fps preview with sound + timestamped contact sheet (one row per scene)
#   ./build-equipe.sh final     → 1080×1920 60 fps master (frame 0 = poster), poster JPEG, audio stems
# Frames are rendered at 1080×1920 and downscaled (Chrome ignores a fractional deviceScaleFactor).
set -euo pipefail
cd "$(dirname "$0")"
MODE=${1:-preview}
OUT=../brag-output
WORK=$OUT/work-equipe
NAME=scalesuite-equipe-9x16
mkdir -p "$WORK" "$OUT/previews"
node render/cues-equipe.mjs > "$WORK/cues.json"
END=$(python3 -c "import json;print(json.load(open('$WORK/cues.json'))['duration'])")

# ---- sound: cues exported from the GSAP timeline, synthesised, loudness-normalised (−15 LUFS / −1.5 dBTP)
python3 audio/music-equipe.py --cues "$WORK/cues.json" --end "$END" "$WORK/music-raw.wav" --stems "$WORK/stems"
MEAS=$(ffmpeg -hide_banner -nostats -i "$WORK/music-raw.wav" -af loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p' |
  python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -hide_banner -loglevel error -y -i "$WORK/music-raw.wav" -af "loudnorm=I=-15:TP=-1.5:LRA=11:$MEAS:linear=true" -ar 48000 "$WORK/music.wav"
TRACK="$WORK/music.wav"

if [ "$MODE" = preview ]; then
  rm -rf "$WORK/frames-preview"
  node render/frames-equipe.mjs --fps=30 --workers=4 --out="$WORK/frames-preview"
  ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$WORK/frames-preview/%05d.png" -i "$TRACK" -map 0:v -map 1:a \
    -vf "scale=540:-2:flags=lanczos,format=yuv420p" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart -shortest "$OUT/previews/$NAME-preview.mp4"
  rm -rf "$WORK/frames-preview"
  # timestamped contact sheet: a few frames per scene, one row per scene
  ROWS=(
    "1 · Accroche (0–2,4 s)|0.00,1.20,1.90,2.30"
    "2 · Le bassin commun (2,4–5,2 s)|2.60,3.10,3.50,4.50"
    "3 · Les bons leads (5,2–8,7 s)|5.40,5.80,6.30,6.90,7.60,8.40"
    "4 · Le départ (8,7–11,0 s)|8.85,9.25,9.65,10.40"
    "5 · Avec ScaleSuite (11,0–14,0 s)|11.10,11.30,11.60,12.20,13.20"
    "6 · Ses leads Google (14,0–17,0 s)|14.40,14.70,15.50,16.50"
    "7 · Le recrutement (17,0–22,8 s)|17.40,18.40,20.10,20.30,20.60,21.80"
    "8 · Fin (22,8–28,2 s)|23.80,24.70,25.00,25.40,25.90,28.00"
  )
  ALL="" NAMES="" ARGS=()
  for i in "${!ROWS[@]}"; do
    s=$((i + 1)); title="${ROWS[$i]%%|*}"; times="${ROWS[$i]#*|}"; files=""
    for t in ${times//,/ }; do ALL="$ALL,$t"; NAMES="$NAMES,s$s-$t"; files="$files,$WORK/sheet/s$s-$t.png"; done
    ARGS+=("$title|${files#,}")
  done
  rm -rf "$WORK/sheet" && mkdir -p "$WORK/sheet"
  node render/stills-equipe.mjs --times="${ALL#,}" --names="${NAMES#,}" --out="$WORK/sheet"
  python3 render/sheet-v3.py "$OUT/$NAME-contact-sheet.jpg" 200 "${ARGS[@]}"
else
  node render/stills-equipe.mjs --times=0.8 --names=poster --out="$WORK"
  ffmpeg -hide_banner -loglevel error -y -i "$WORK/poster.png" -q:v 2 "$OUT/$NAME-poster.jpg"
  rm -rf "$WORK/frames-final"
  node render/frames-equipe.mjs --fps=60 --workers=4 --poster --out="$WORK/frames-final"
  ffmpeg -hide_banner -loglevel error -y -framerate 60 -i "$WORK/frames-final/%05d.png" -i "$TRACK" \
    -map 0:v -map 1:a -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/$NAME.mp4"
  rm -rf "$WORK/frames-final"
  mkdir -p "$OUT/audio-equipe"
  for s in bed sfx; do ffmpeg -hide_banner -loglevel error -y -i "$WORK/stems/$s.wav" -c:a flac "$OUT/audio-equipe/$s.flac"; done
  ffmpeg -hide_banner -loglevel error -y -i "$TRACK" -c:a flac "$OUT/audio-equipe/music.flac"
fi
echo "done: $MODE"
