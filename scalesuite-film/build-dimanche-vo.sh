#!/usr/bin/env bash
# « Dimanche, 21 h 14 » with voiceover: no new picture render. Takes the master's video stream as is and
# replaces only its audio with music + effects + the ElevenLabs take (../voiceover-dimanche.mp3).
#   1. cut the take into its 11 lines (audio/split-vo-dimanche.py: 10 long pauses, or the best fit of the
#      short ones, or cut points spotted by ear with CUTS="a1,b1,a2,b2,…")
#   2. place each line at the start of its window (brag-output/voiceover-dimanche.md) with mix_vo.py
#      (music −9 dB and effects −4 dB under the voice, −14 LUFS)
#   3. 4× oversampled limiter so the AAC file stays under −1.5 dBTP, then mux onto the master's video
set -euo pipefail
cd "$(dirname "$0")"
OUT=../brag-output
W=$OUT/work-dimanche
TAKE=../voiceover-dimanche.mp3
[ -f "$TAKE" ] || { echo "missing $TAKE (ElevenLabs take, block in brag-output/voiceover-dimanche-elevenlabs.txt)"; exit 1; }
mkdir -p "$W/vo" "$OUT/audio-dimanche"
python3 audio/split-vo-dimanche.py "$TAKE" "$W/vo" ${CUTS:+--cuts "$CUTS"}
# line starts (s) = window starts in voiceover-dimanche.md
STARTS=(${STARTS:-0.20 2.95 5.85 9.55 13.35 15.05 17.95 22.10 24.50 27.10 29.95})
VO=()
for i in "${!STARTS[@]}"; do VO+=(--vo "$W/vo/l$((i + 1)).wav@${STARTS[$i]}"); done
python3 audio/mix_vo.py --stems "$W/stems" --out "$W/mix-vo-pre.wav" "${VO[@]}"
ffmpeg -v error -y -i "$W/mix-vo-pre.wav" -af "volume=0.1dB,aresample=192000,alimiter=limit=0.80:attack=1:release=60:level=false,aresample=48000" -c:a pcm_s16le "$W/mix-vo.wav"
ffmpeg -hide_banner -loglevel error -y -i "$OUT/scalesuite-dimanche-9x16.mp4" -i "$W/mix-vo.wav" -map 0:v -map 1:a -c:v copy \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/scalesuite-dimanche-9x16-vo.mp4"
ffmpeg -v error -y -i "$W/mix-vo.wav" -c:a flac "$OUT/audio-dimanche/mix-vo.flac"
ffmpeg -hide_banner -nostats -i "$OUT/scalesuite-dimanche-9x16-vo.mp4" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
