#!/usr/bin/env bash
# Control sheet built from frames extracted from the MP4 itself (not from the timeline):
#   ./render/qc-sheet-systeme.sh ../brag-output/scalesuite-systeme-9x16.mp4 ../brag-output/scalesuite-systeme-9x16-controle.jpg
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=$1; OUT=$2
W=../brag-output/work-systeme/qc
rm -rf "$W" && mkdir -p "$W"
TIMES=(0 1.6 3.6 6.8 9.6 12.2 14.4 16.2 18.8 21.2 24.8 27.0 30.6)
LABELS=("Image 0 (affiche, état à 3,2 s)" "1,6 s · l'horloge à 17 h 04" "3,6 s · le coût" "6,8 s · dévoilement" "9,6 s · texto" "12,2 s · Courtier 03 alerté" "14,4 s · relance au Leader" "16,2 s · suivi 90 jours" "18,8 s · pile cochée" "21,2 s · preuve" "24,8 s · garantie et rareté" "27,0 s · thèse" "30,6 s · fin")
ARGS=()
for i in "${!TIMES[@]}"; do
  n=$(python3 -c "print(round(${TIMES[$i]}*60))")
  ffmpeg -v error -y -i "$SRC" -vf "select=eq(n\,$n)" -vframes 1 "$W/f$i.png"
  ARGS+=("${LABELS[$i]}|$W/f$i.png")
done
python3 render/keyframes-systeme.py "$OUT" 5 "${ARGS[@]}"
