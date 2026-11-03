#!/usr/bin/env bash
# Build « Système Vendeurs 5 minutes » (9:16). V2/V3 build scripts and outputs are left untouched.
#   ./build-systeme.sh preview   → 540×960 30 fps preview with sound + timestamped contact sheet (one row per scene)
#   ./build-systeme.sh final     → 1080×1920 60 fps master (frame 0 = poster), poster JPEG, audio stems
# Frames are rendered at 1080×1920 and downscaled (Chrome ignores a fractional deviceScaleFactor).
set -euo pipefail
cd "$(dirname "$0")"
MODE=${1:-preview}
OUT=../brag-output
WORK=$OUT/work-systeme
NAME=scalesuite-systeme-9x16
mkdir -p "$WORK" "$OUT/previews"
node render/cues-systeme.mjs > "$WORK/cues.json"
END=$(python3 -c "import json;print(json.load(open('$WORK/cues.json'))['duration'])")

# ---- sound: cues exported from the GSAP timeline, synthesised, loudness-normalised (−15 LUFS / −1.5 dBTP)
python3 audio/music-systeme.py --cues "$WORK/cues.json" --end "$END" "$WORK/music-raw.wav" --stems "$WORK/stems"
MEAS=$(ffmpeg -hide_banner -nostats -i "$WORK/music-raw.wav" -af loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p' |
  python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -hide_banner -loglevel error -y -i "$WORK/music-raw.wav" -af "loudnorm=I=-15:TP=-1.5:LRA=11:$MEAS:linear=true" -ar 48000 "$WORK/music.wav"
TRACK="$WORK/music.wav"

if [ "$MODE" = preview ]; then
  rm -rf "$WORK/frames-preview"
  node render/frames-systeme.mjs --fps=30 --workers=4 --out="$WORK/frames-preview"
  ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$WORK/frames-preview/%05d.png" -i "$TRACK" -map 0:v -map 1:a \
    -vf "scale=540:-2:flags=lanczos,format=yuv420p" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart -shortest "$OUT/previews/$NAME-preview.mp4"
  rm -rf "$WORK/frames-preview"
  # timestamped contact sheet: a few frames per scene, one row per scene
  ROWS=(
    "1 · Accroche (0–3,5 s)|0.00,1.00,2.00,2.60,3.20"
    "2 · Le coût (3,5–6,0 s)|3.70,4.50,5.50,5.85"
    "3 · Dévoilement (6,0–10,1 s)|6.05,6.20,6.50,6.90,7.40,9.00"
    "4a · La pile : campagne, réponse 60 secondes (10,1–16,0 s)|10.30,10.65,11.30,12.20,13.00,13.60,14.20,15.50"
    "4b · La pile : courtier, relance, suivi, pile complète (16,0–25,0 s)|16.30,17.20,18.30,19.00,19.80,20.80,21.40,22.50,23.40,24.50"
    "5 · Preuve (25,0–27,8 s)|25.20,25.60,26.50,27.60"
    "6 · Garantie (27,8–31,4 s)|28.00,28.50,29.20,30.80"
    "7 · Rareté (31,4–33,8 s)|31.60,32.00,32.50,33.60"
    "8 · Fin (33,8–40,0 s)|34.00,35.00,36.00,36.40,36.80,37.50,39.90"
  )

  ALL="" NAMES="" ARGS=()
  for i in "${!ROWS[@]}"; do
    s=$((i + 1)); title="${ROWS[$i]%%|*}"; times="${ROWS[$i]#*|}"; files=""
    for t in ${times//,/ }; do ALL="$ALL,$t"; NAMES="$NAMES,s$s-$t"; files="$files,$WORK/sheet/s$s-$t.png"; done
    ARGS+=("$title|${files#,}")
  done
  rm -rf "$WORK/sheet" && mkdir -p "$WORK/sheet"
  node render/stills-systeme.mjs --times="${ALL#,}" --names="${NAMES#,}" --out="$WORK/sheet"
  python3 render/sheet-v3.py "$OUT/$NAME-contact-sheet.jpg" 200 "${ARGS[@]}"
else
  node render/stills-systeme.mjs --times=3.0 --names=poster --out="$WORK"
  ffmpeg -hide_banner -loglevel error -y -i "$WORK/poster.png" -q:v 2 "$OUT/$NAME-poster.jpg"
  rm -rf "$WORK/frames-final"
  node render/frames-systeme.mjs --fps=60 --workers=4 --poster --out="$WORK/frames-final"
  ffmpeg -hide_banner -loglevel error -y -framerate 60 -i "$WORK/frames-final/%05d.png" -i "$TRACK" \
    -map 0:v -map 1:a -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/$NAME.mp4"
  rm -rf "$WORK/frames-final"
  mkdir -p "$OUT/audio-systeme"
  for s in bed sfx; do ffmpeg -hide_banner -loglevel error -y -i "$WORK/stems/$s.wav" -c:a flac "$OUT/audio-systeme/$s.flac"; done
  ffmpeg -hide_banner -loglevel error -y -i "$TRACK" -c:a flac "$OUT/audio-systeme/music.flac"
fi
echo "done: $MODE"
