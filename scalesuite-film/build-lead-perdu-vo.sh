#!/usr/bin/env bash
# « Le lead perdu » with voiceover: no new picture render. Takes the master's video stream as is and
# replaces only its audio with music + effects + the ElevenLabs take (../voiceover-lead-perdu.mp3).
#   1. cut the take into its 7 lines at the cut points spotted by ear, snapped into silence
#   2. place each line at the start of its window (brag-output/voiceover-lead-perdu.md) with mix_vo.py
#      (music −9 dB and effects −4 dB under the voice, −14 LUFS)
#   3. 4× oversampled limiter so the AAC file stays under −1.5 dBTP, then mux onto the master's video
set -euo pipefail
cd "$(dirname "$0")"
OUT=../brag-output
W=$OUT/work-lead-perdu
mkdir -p "$W/vo" "$OUT/audio-lead-perdu"
python3 audio/split-vo-lead-perdu.py ../voiceover-lead-perdu.mp3 "$W/vo"
# line starts (s); line 4 starts 0.30 s before its window (11.30) so it is not sped up
STARTS=(0.20 3.60 7.60 11.00 13.80 19.45 22.10)
VO=()
for i in "${!STARTS[@]}"; do VO+=(--vo "$W/vo/l$((i + 1)).wav@${STARTS[$i]}"); done
python3 audio/mix_vo.py --stems "$W/stems" --out "$W/mix-vo-pre.wav" "${VO[@]}"
ffmpeg -v error -y -i "$W/mix-vo-pre.wav" -af "volume=0.1dB,aresample=192000,alimiter=limit=0.80:attack=1:release=60:level=false,aresample=48000" -c:a pcm_s16le "$W/mix-vo.wav"
ffmpeg -hide_banner -loglevel error -y -i "$OUT/scalesuite-lead-perdu-9x16.mp4" -i "$W/mix-vo.wav" -map 0:v -map 1:a -c:v copy \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/scalesuite-lead-perdu-9x16-vo.mp4"
ffmpeg -v error -y -i "$W/mix-vo.wav" -c:a flac "$OUT/audio-lead-perdu/mix-vo.flac"
ffmpeg -hide_banner -nostats -i "$OUT/scalesuite-lead-perdu-9x16-vo.mp4" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
