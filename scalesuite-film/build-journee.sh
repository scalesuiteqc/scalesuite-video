#!/usr/bin/env bash
# Build « Une journée de courtier » (9:16, 25 s). The V2 and V3 builds and outputs are left untouched.
#   ./build-journee.sh preview         → whole film: 540×960 30 fps preview with sound + contact sheet (one row per scene)
#   END=7.3 ./build-journee.sh preview  → the same for 0–END only (a partial review)
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
    "Scène 1 · Carte 10 h (0–2 s)|0.00,0.50,1.20,2.15"
    "Scène 2 · Pendant ce temps : l'annonce (2–5,4 s)|2.45,3.00,3.60,4.60,5.15"
    "Scène 3 · Carte 13 h (5,4–7,3 s)|5.40,5.60,6.30,7.40"
    "Scène 4 · Pendant ce temps : le formulaire (7,3–9,4 s)|7.60,8.00,8.70,9.40,9.60"
    "Scène 5 · Le lead arrive, climax (9,4–11,8 s)|9.90,10.15,10.60,11.40"
    "Scène 6 · Déjà dans votre CRM (11,8–13,9 s)|11.95,12.30,12.70,13.60"
    "Scène 7 · Carte 17 h (13,9–15,9 s)|13.85,14.10,14.80,16.05"
    "Scène 8 · Pendant ce temps : le rapport (15,9–18,2 s)|16.30,16.70,17.40,18.25"
    "Scène 9 · Le bilan (18,2–21,3 s)|18.55,19.00,19.50,20.60"
    "Scène 10 · Fin (21,3–25 s)|21.40,21.70,22.20,22.80,24.90"
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
  POSTER=1.2 # SS.POSTER_T: the settled 10 h card
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
