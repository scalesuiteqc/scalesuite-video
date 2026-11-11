#!/usr/bin/env bash
# « Système Vendeurs 5 minutes » with voiceover: no new picture render. Takes the master's video stream as is and
# replaces only its audio with music + effects + the ElevenLabs take (../voiceover-systeme.mp3).
#   1. cut the take into its 9 lines at the cut points spotted by ear, snapped into silence
#   2. place each line at the start of its window (brag-output/voiceover-systeme.md) with mix_vo.py
#      (music −9 dB and effects −4 dB under the voice, −14 LUFS)
#   3. −2.0 dBTP ceiling (4× oversampled limiter) before the AAC encode, then mux onto the master's video
set -euo pipefail
cd "$(dirname "$0")"
OUT=../brag-output
W=$OUT/work-systeme
mkdir -p "$W/vo" "$OUT/audio-systeme"
python3 audio/split-vo-systeme.py ../voiceover-systeme.mp3 "$W/vo"
# line starts (s), at the start of each window, never sped up. Line 2 (3.60 s with its pause after « Voici, »)
# starts 0.80 s before its window (4.70) and line 9 0.30 s before its window (29.30) so that no line overlaps
# the next one or the end of the film.
STARTS=(0.10 3.90 7.55 11.30 14.75 17.90 22.00 25.50 29.00)
VO=()
for i in "${!STARTS[@]}"; do VO+=(--vo "$W/vo/l$((i + 1)).wav@${STARTS[$i]}"); done
python3 audio/mix_vo.py --stems "$W/stems" --out "$W/mix-vo-pre.wav" --duck-music -9 --duck-sfx -4 --lufs -14 --tp -2.0 "${VO[@]}"
ffmpeg -v error -y -i "$W/mix-vo-pre.wav" -af "volume=0.1dB,aresample=192000,alimiter=limit=0.79:attack=1:release=60:level=false,aresample=48000" -c:a pcm_s16le "$W/mix-vo.wav"
ffmpeg -hide_banner -loglevel error -y -i "$OUT/scalesuite-systeme-9x16.mp4" -i "$W/mix-vo.wav" -map 0:v -map 1:a -c:v copy \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/scalesuite-systeme-9x16-vo.mp4"
ffmpeg -v error -y -i "$W/mix-vo.wav" -c:a flac "$OUT/audio-systeme/mix-vo.flac"
ffmpeg -hide_banner -nostats -i "$OUT/scalesuite-systeme-9x16-vo.mp4" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2
