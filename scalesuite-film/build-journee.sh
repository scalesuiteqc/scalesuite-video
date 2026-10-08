#!/usr/bin/env bash
# Build « Une journée de courtier » (9:16, 25 s). The V2 and V3 builds and outputs are left untouched.
#   ./build-journee.sh preview         → whole film: 540×960 30 fps preview with sound + contact sheet (one row per scene)
#   END=13.6 ./build-journee.sh preview → the same for 0–END only (scenes 1–3 review)
#   ./build-journee.sh final           → 1080×1920 60 fps master, H.264/yuv420p/faststart, poster frame 0, audio stems
# Same pipeline as build-v3.sh: frames rendered at 1080×1920 and downscaled for the preview.
# Output goes to ../brag-output (intermediates in ../brag-output/work-journee).
set -euo pipefail
cd "$(dirname "$0")"
MODE=${1:-preview}
OUT=../brag-output
WORK=$OUT/work-journee
mkdir -p "$WORK" "$OUT/previews"
node render/cues-journee.mjs > "$WORK/cues-journee.json"
FULL=$(python3 -c "import json;print(json.load(open('$WORK/cues-journee.json'))['duration'])")
END=${END:-$FULL}
SUF=$([ "$END" = "$FULL" ] && echo "" || echo "-s1-3")

# ---- sound: the V3 music re-timed on this film's cues, loudness-normalised (−15 LUFS)
python3 audio/music-journee.py --cues "$WORK/cues-journee.json" --end "$END" "$WORK/music$SUF-raw.wav" --stems "$WORK/stems$SUF"
MEAS=$(ffmpeg -hide_banner -nostats -i "$WORK/music$SUF-raw.wav" -af loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p' |
  python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -hide_banner -loglevel error -y -i "$WORK/music$SUF-raw.wav" -af "loudnorm=I=-15:TP=-1.5:LRA=11:$MEAS:linear=true" -ar 48000 "$WORK/music$SUF.wav"
TRACK="$WORK/music$SUF.wav"

if [ "$MODE" = preview ]; then
  rm -rf "$WORK/frames-preview"
  node render/frames-journee.mjs --fps=30 --workers=4 --end="$END" --out="$WORK/frames-preview"
  ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$WORK/frames-preview/%05d.png" -i "$TRACK" -map 0:v -map 1:a \
    -vf "scale=540:-2:flags=lanczos,format=yuv420p" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart -shortest "$OUT/previews/scalesuite-journee-preview-9x16-30fps$SUF.mp4"
  rm -rf "$WORK/frames-preview"
  # contact sheet: a few frames per scene, one row per scene
  ROWS=(
    "Scène 1 · 7 h, Café (0–2,8 s)|0.00,0.45,0.90,1.30,1.75,2.10,2.45"
    "Scène 2 · 10 h, Visite (2,8–6,4 s)|2.75,3.30,3.75,4.20,5.00,5.55"
    "Scène 3 · 13 h, Notaire : le lead (6,4–13,6 s)|5.85,6.60,7.60,8.45,8.62,9.10,9.80,10.40,10.74,11.10,11.60,12.10,12.70,13.50"
    "Scène 4 · 17 h, Rapport (13,6–16,6 s)|13.80,14.30,14.90,15.60,16.30"
    "Scène 5 · Le bilan (16,6–20 s)|16.90,17.50,18.10,18.60,19.40"
    "Scène 6 · Appel à l'action (20–25 s)|20.20,20.80,21.40,22.20,24.90"
  )
  ALL="" NAMES="" ARGS=()
  for i in "${!ROWS[@]}"; do
    s=$((i + 1)); title="${ROWS[$i]%%|*}"; times="${ROWS[$i]#*|}"; files=""
    for t in ${times//,/ }; do
      if awk "BEGIN{exit !($t <= $END)}"; then ALL="$ALL,$t"; NAMES="$NAMES,s$s-$t"; files="$files,$WORK/sheet/s$s-$t.png"; fi
    done
    [ -n "$files" ] && ARGS+=("$title|${files#,}")
  done
  rm -rf "$WORK/sheet" && mkdir -p "$WORK/sheet"
  node render/stills-journee.mjs --times="${ALL#,}" --names="${NAMES#,}" --out="$WORK/sheet"
  python3 render/sheet-v3.py "$OUT/scalesuite-journee-contact-sheet$SUF.jpg" "$([ -z "$SUF" ] && echo 200 || echo 260)" "${ARGS[@]}"
else
  # master: 60 fps, frame 0 = poster (platform thumbnail), poster JPEG, stems for a voiceover mix
  POSTER=$(node -e "console.log(2.1)")
  node render/stills-journee.mjs --times=$POSTER --names=poster-9x16-journee --out="$WORK"
  ffmpeg -hide_banner -loglevel error -y -i "$WORK/poster-9x16-journee.png" -q:v 2 "$OUT/scalesuite-journee-poster.jpg"
  rm -rf "$WORK/frames-final"
  node render/frames-journee.mjs --fps=60 --workers=4 --poster --out="$WORK/frames-final"
  ffmpeg -hide_banner -loglevel error -y -framerate 60 -i "$WORK/frames-final/%05d.png" -i "$TRACK" \
    -map 0:v -map 1:a -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/scalesuite-journee-9x16.mp4"
  rm -rf "$WORK/frames-final"
  mkdir -p "$OUT/audio-journee"
  for s in bed sfx; do ffmpeg -hide_banner -loglevel error -y -i "$WORK/stems/$s.wav" -c:a flac "$OUT/audio-journee/$s.flac"; done
  ffmpeg -hide_banner -loglevel error -y -i "$TRACK" -c:a flac "$OUT/audio-journee/music-journee.flac"
fi
echo "done: $MODE journee$SUF"
