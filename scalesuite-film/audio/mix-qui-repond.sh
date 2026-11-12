#!/usr/bin/env bash
# Score + effects + voice → final mix at −14 LUFS integrated, true peak ≤ −1 dBTP (two-pass loudnorm, then measured).
#   audio/mix-qui-repond.sh      (run from scalesuite-film/)
set -euo pipefail
cd "$(dirname "$0")/.."
A=../brag-output/audio-qui-repond; W=../brag-output/work-qui-repond; mkdir -p "$W"
node render/cues-qui-repond.mjs > "$W/cues.json"
python3 audio/music-qui-repond.py "$W/cues.json" "$A/vo-track.wav" "$A"
MEAS=$(ffmpeg -hide_banner -nostats -i "$A/mix-raw.wav" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p' |
  python3 -c "import json,sys;d=json.load(sys.stdin);print(f\"measured_I={d['input_i']}:measured_TP={d['input_tp']}:measured_LRA={d['input_lra']}:measured_thresh={d['input_thresh']}:offset={d['target_offset']}\")")
ffmpeg -hide_banner -loglevel error -y -i "$A/mix-raw.wav" -af "loudnorm=I=-14:TP=-1.5:LRA=11:$MEAS:linear=true,alimiter=limit=0.84:level=false" -ar 48000 "$W/music.wav"
cp "$W/music.wav" "$A/mix.wav"
ffmpeg -hide_banner -nostats -i "$A/mix.wav" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+I:|Peak:" | tail -2
