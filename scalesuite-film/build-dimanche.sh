#!/usr/bin/env bash
# Build « Dimanche, 21 h 14 » (9:16). Earlier build scripts and outputs are left untouched.
#   ./build-dimanche.sh preview          → whole film: 540×960 30 fps preview with sound + timestamped contact sheet (one row per scene)
#   END=9.4 ./build-dimanche.sh preview  → the same for 0–END only (scenes 1–3 review, files suffixed -s1-3)
#   ./build-dimanche.sh final            → 1080×1920 60 fps master (frame 0 = poster), poster JPEG, audio stems
# Frames are rendered at 1080×1920 and downscaled (Chrome ignores a fractional deviceScaleFactor).
set -euo pipefail
cd "$(dirname "$0")"
MODE=${1:-preview}
OUT=../brag-output
WORK=$OUT/work-dimanche
NAME=scalesuite-dimanche-9x16
mkdir -p "$WORK" "$OUT/previews"
node render/cues-dimanche.mjs > "$WORK/cues.json"
FULL=$(python3 -c "import json;print(json.load(open('$WORK/cues.json'))['duration'])")
END=${END:-$FULL}
SUF=$(python3 -c "print('' if abs($END-$FULL)<1e-6 else '-s1-3')")

# ---- sound: cues exported from the GSAP timeline, synthesised, loudness-normalised (−15 LUFS / −1.5 dBTP)
python3 audio/music-dimanche.py --cues "$WORK/cues.json" --end "$END" "$WORK/music-raw$SUF.wav" --stems "$WORK/stems$SUF"
MEAS=$(ffmpeg -hide_banner -nostats -i "$WORK/music-raw$SUF.wav" -af loudnorm=I=-15:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p' |
  python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -hide_banner -loglevel error -y -i "$WORK/music-raw$SUF.wav" -af "loudnorm=I=-15:TP=-1.5:LRA=11:$MEAS:linear=true" -ar 48000 "$WORK/music$SUF.wav"
TRACK="$WORK/music$SUF.wav"

if [ "$MODE" = preview ]; then
  rm -rf "$WORK/frames-preview"
  node render/frames-dimanche.mjs --fps=30 --workers=4 --end="$END" --out="$WORK/frames-preview"
  ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$WORK/frames-preview/%05d.png" -i "$TRACK" -map 0:v -map 1:a \
    -vf "scale=540:-2:flags=lanczos,format=yuv420p" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 160k -movflags +faststart -shortest "$OUT/previews/$NAME-preview$SUF.mp4"
  rm -rf "$WORK/frames-preview"
  # timestamped contact sheet: a few frames per scene, one row per scene (rows past END are skipped)
  ROWS=(
    "1 · Accroche, le résultat (0–2,8 s)|0.00,0.45,0.75,1.10,2.00,2.70"
    "2 · Le retour en arrière (2,8–5,6 s)|2.95,3.30,3.70,4.10,4.60,5.40"
    "3 · Dimanche, 21 h 14 (5,6–9,4 s)|5.75,5.95,6.50,7.10,7.65,7.85,8.10,8.60,9.10,9.35"
    "4 · Dans la minute (9,4–13,2 s)|9.55,9.85,10.30,10.80,12.50"
    "5 · Votre dimanche, puis lundi (13,2–17,8 s)|13.45,14.30,15.10,15.60,16.30,16.80,17.40"
    "6 · Ceux qui ne sont pas prêts (17,8–22,0 s)|18.10,18.70,19.40,20.10,20.80,21.60"
    "7 · Jeudi (22,0–26,8 s)|22.30,22.80,23.50,24.10,24.30,24.80,26.50"
    "8 · Le risque (26,8–29,8 s)|27.20,27.70,28.25,28.70,29.60"
    "9 · Appel à l'action (29,8–33,9 s)|29.95,30.40,30.90,31.30,31.70,33.80"
  )
  ALL="" NAMES="" ARGS=()
  for i in "${!ROWS[@]}"; do
    s=$((i + 1)); title="${ROWS[$i]%%|*}"; times="${ROWS[$i]#*|}"; files=""
    last=${times##*,}
    if python3 -c "import sys; sys.exit(0 if $last <= $END + 1e-6 else 1)"; then
      for t in ${times//,/ }; do ALL="$ALL,$t"; NAMES="$NAMES,s$s-$t"; files="$files,$WORK/sheet/s$s-$t.png"; done
      ARGS+=("$title|${files#,}")
    fi
  done
  rm -rf "$WORK/sheet" && mkdir -p "$WORK/sheet"
  node render/stills-dimanche.mjs --times="${ALL#,}" --names="${NAMES#,}" --out="$WORK/sheet"
  python3 render/sheet-v3.py "$OUT/$NAME-contact-sheet$SUF.jpg" 200 "${ARGS[@]}"
else
  node render/stills-dimanche.mjs --times="$(node -e "console.log(2.0)")" --names=poster --out="$WORK"
  ffmpeg -hide_banner -loglevel error -y -i "$WORK/poster.png" -q:v 2 "$OUT/$NAME-poster.jpg"
  rm -rf "$WORK/frames-final"
  node render/frames-dimanche.mjs --fps=60 --workers=4 --poster --out="$WORK/frames-final"
  ffmpeg -hide_banner -loglevel error -y -framerate 60 -i "$WORK/frames-final/%05d.png" -i "$TRACK" \
    -map 0:v -map 1:a -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -pix_fmt yuv420p \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/$NAME.mp4"
  rm -rf "$WORK/frames-final"
  mkdir -p "$OUT/audio-dimanche"
  for s in bed sfx; do ffmpeg -hide_banner -loglevel error -y -i "$WORK/stems/$s.wav" -c:a flac "$OUT/audio-dimanche/$s.flac"; done
  ffmpeg -hide_banner -loglevel error -y -i "$TRACK" -c:a flac "$OUT/audio-dimanche/music.flac"
fi
echo "done: $MODE (0–$END s)"
