# ScaleSuite V3 : feuille de timing pour la voix off

Master V3 : `scalesuite-social-9x16-v3.mp4`, 31,0 s, sans voix. Version avec voix :
`scalesuite-social-9x16-v3-vo.mp4` (même image, piste audio remplacée). Les fenêtres ci-dessous
viennent des repères exportés par la timeline GSAP (`work-v3/cues-v3.json`). Chaque réplique tombe
donc sur le moment à l'écran qu'elle accompagne. Le texte à l'écran reste court : la voix le complète
au lieu de le sous-titrer, sauf pour la thèse, reprise en écho.

| # | Réplique (fr-CA) | Fenêtre (s) | Moments d'ancrage à l'écran |
|---|---|---|---|
| 1 | « Vous gérez une équipe de courtiers? » | 0,2 – 2,1 | les cartes se multiplient, compteur de 1 à 10 |
| 2 | « Plus de courtiers… plus de gestion. » | 2,5 – 4,9 | plongée à 2,2 s ; changements de mot à 3,42 et 4,17 s |
| — | *(silence)* | 5,0 – 6,3 | implosion, impact à 5,53 s, le nœud respire seul (silence validé) |
| 3 | « Avec ScaleSuite, toute votre équipe passe par une seule structure. » | 6,5 – 10,4 | *ScaleSuite* ≈ 6,5–7,2 (la marque apparaît à 6,36 s) ; *une seule structure* ≈ 9,4–10,2 (lignes posées de 8,9 à 9,4 s) |
| 4 | « Chaque courtier a sa propre campagne. » | 11,1 – 13,2 | « Créées. » à 11,02 s ; lancement à 13,26 s |
| 5 | « Suivie et optimisée par notre IA et notre équipe. » | 14,1 – 17,3 | « Suivies. » à 13,98 s, +1 lead à 15,2 s, *optimisée* ≈ 15,9 s (« Optimisées. » à 15,86 s), message de confirmation à 17,33 s |
| 6 | « Un vendeur cherche, clique, remplit le formulaire… » | 18,2 – 20,6 | appui sur l'annonce à 19,15 s, page à 19,3 s, « Envoyer » à 20,42 s |
| 7 | « …et le lead va au bon courtier, directement dans son CRM. » | 20,9 – 24,3 | nœud à 21,35 s, verrouillage sur Courtier 03 à 21,85 s, notification à 22,5 s (*bon courtier* ≈ 22,3–22,8), CRM à 23,0 s |
| 8 | « Plus de campagnes. Pas plus de gestion. » | 25,1 – 27,2 | ligne de séparation à 25,05 s, « Pas » à 25,72 s |
| 9 | « ScaleSuite. Demandez une démo. » | 27,8 – 29,6 | la marque à 27,7 s, le bouton à 28,12 s ; tout est posé à ≈ 29,0 s et tenu jusqu'à 31,0 s |

Notes pour l'enregistrement (ElevenLabs ou studio) :

- **Débit** : livraison québécoise naturelle et posée, d'environ 2,7 à 3 mots par seconde. Les
  fenêtres les plus serrées sont les répliques 2 et 8.
- **Silence** : rien entre 5,0 et 6,3 s. Le silence fait partie du récit (la bascule vers le
  soulagement).
- **Le plus simple** : exporter un fichier par réplique et le placer au début de sa fenêtre.

## Prise utilisée : `voiceover-v3.mp3`

`voiceover-v3.mp3` (racine du dépôt) : 24,5 s, une seule génération ElevenLabs, vitesse 1,13, mono
44,1 kHz. Les pauses de 1,5 s prévues entre les répliques n'ont pas été générées. Entre deux
répliques, il n'y a que 0,25 à 0,5 s, soit autant que certaines pauses internes (0,24 s après
« cherche », 0,30 s entre « campagnes. » et « Pas », 0,32 s après « ScaleSuite. »). **Ne pas
découper en comptant les silences** : les points de coupe ont été repérés en croisant les silences
avec le script.

| # | Coupe dans la prise (s) | Parole détectée (−55 dBFS) | Pauses internes (seuil −35 dB sous la crête) | Noyaux syllabiques / syllabes du script |
|---|---|---|---|---|
| 1 | 0,00 – 1,29 | 0,05 – 1,32 | aucune | 7 / ≈ 9 |
| 2 | 1,75 – 3,73 | 1,74 – 3,77 | 2,56–2,92 (« courtiers… ») | 8 / 8 (4 + 4, de part et d'autre de la pause) |
| 3 | 4,26 – 7,55 | 4,25 – 7,57 | 5,13–5,34 (« ScaleSuite, »), puis trois occlusives de moins de 80 ms | 15 / ≈ 17 |
| 4 | 7,88 – 9,80 | 7,87 – 9,84 | deux occlusives de moins de 80 ms | 9 / ≈ 10 |
| 5 | 10,05 – 12,81 | 10,04 – 12,92 | deux occlusives de moins de 100 ms | 14 / ≈ 15 |
| 6 | 13,24 – 16,04 | 13,24 – 16,06 | 14,24–14,48 (« cherche, »), 14,85–15,04 (« clique, ») | 10 / ≈ 12 (4 avant la première pause, 1 entre les deux, 5 après) |
| 7 | 16,30 – 19,44 | 16,30 – 19,47 | 17,71–17,88 (« courtier, ») | 15 / ≈ 16 |
| 8 | 19,80 – 21,98 | 19,80 – 22,01 | 20,71–21,01 (« campagnes. ») | 9 / 9 (4 + 5) |
| 9 | 22,46 – 24,53 | 22,46 – 24,33 | 23,18–23,50 (« ScaleSuite. ») | 7 / 8 (2 + 6) |

Aucune transcription automatique n'était disponible dans l'environnement de montage (les hôtes de
modèles étaient bloqués). La vérification s'est donc faite par analyse d'énergie : chaque coupe
tombe dans un silence, et les pauses internes ainsi que le nombre de syllabes (noyaux d'énergie
300–2 500 Hz) correspondent à la ponctuation et au texte de chaque réplique. Les points de coupe
ont seulement été recalés de quelques centièmes sur les bords de la parole (par `split_vo_v3.py`).

## Placement final (`scalesuite-social-9x16-v3-vo.mp4`)

Chaque fichier `audio-v3/vo/lN.wav` garde une marge naturelle (60 ms avant la première syllabe et
120 ms après la dernière, avec un fondu de 5 ms en entrée et de 30 ms en sortie). La première
syllabe tombe au début de la fenêtre.

| # | Début de la parole (s) | Fin de la parole (s) | Ajustement |
|---|---|---|---|
| 1 | 0,20 | 1,48 | aucun |
| 2 | 2,50 | 4,53 | aucun ; « Plus de courtiers… » 2,50–3,32, « plus de gestion. » 3,68–4,48 |
| — | — | — | silence 5,0–6,3 : aucune voix (la piste de voix est nulle sur cet intervalle) |
| 3 | 6,50 | 9,82 | aucun ; « Avec ScaleSuite, » se termine à 7,38 |
| 4 | 11,10 | 13,07 | aucun |
| 5 | 14,10 | 16,98 | aucun |
| 6 | 18,00 | 20,66 (20,62 audible) | pause après « cherche » réduite de 0,24 à 0,07 s (0,17 s retirée dans le silence, fondu enchaîné de 10 ms) ; début avancé de 0,2 s ; pas d'accélération. « clique » à 19,07 (appui à 19,15) |
| 7 | 20,90 | 24,07 | aucun ; « …au bon courtier, » se termine à 22,31, « directement dans son CRM » 22,48–24,05 |
| 8 | 25,10 | 27,32 | aucun ; dépasse la fenêtre de 0,1 s, sans chevaucher la réplique 9 (0,48 s d'écart) |
| 9 | 27,80 | 29,68 | aucun ; « ScaleSuite. » 27,80–28,52, « Demandez une démo. » 28,84–29,65 |

Écart minimal entre deux répliques : 0,24 s (entre la 6 et la 7, mesuré sur les queues à
−55 dBFS). Aucune réplique n'en chevauche une autre.

Points à surveiller à l'écoute :
- **Réplique 6** : sa fin audible déborde de 20 ms sur la fenêtre (20,62 s pour 20,6 s). Une
  accélération n'a pas paru justifiée pour si peu.
- **Réplique 8** : « Pas » arrive à 26,31 s, alors que le mot « Pas » apparaît à l'écran à 25,72 s.
  La prise marque une pause de 0,30 s après « campagnes. ».
- **Réplique 3** : « une seule structure » tombe vers 8,7–9,8 s, un peu avant l'ancrage prévu
  (9,4–10,2 s), parce que la prise est plus rapide que ce que la fenêtre prévoyait.

## Mixer la voix

```
cd scalesuite-film
python3 audio/split_vo_v3.py --vo ../voiceover-v3.mp3 --out ../brag-output/audio-v3/vo
python3 audio/mix_vo.py --stems ../brag-output/audio-v3 --out ../brag-output/work-v3/mix-vo-v3.wav --tp -2.0 \
  --vo ../brag-output/audio-v3/vo/l1.wav@0.152 --vo ../brag-output/audio-v3/vo/l2.wav@2.440 \
  --vo ../brag-output/audio-v3/vo/l3.wav@6.440 --vo ../brag-output/audio-v3/vo/l4.wav@11.040 \
  --vo ../brag-output/audio-v3/vo/l5.wav@14.040 --vo ../brag-output/audio-v3/vo/l6.wav@17.940 \
  --vo ../brag-output/audio-v3/vo/l7.wav@20.840 --vo ../brag-output/audio-v3/vo/l8.wav@25.040 \
  --vo ../brag-output/audio-v3/vo/l9.wav@27.740
ffmpeg -i ../brag-output/scalesuite-social-9x16-v3.mp4 -i ../brag-output/work-v3/mix-vo-v3.wav \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest \
  ../brag-output/scalesuite-social-9x16-v3-vo.mp4
```

`split_vo_v3.py` affiche les arguments `--vo` ci-dessus. Chaque position correspond au début de la
fenêtre moins la marge d'entrée du fichier.

Sous la voix, la musique est atténuée d'environ −9 dB et les effets d'environ −4 dB. Le mix est
normalisé à −14 LUFS, avec un plafond de −1,5 dBTP sur le fichier livré. L'encodage AAC ajoute
environ 0,4 dB de crête : le WAV est donc normalisé avec `--tp -2.0`. Mesure du MP4 livré :
−14,1 LUFS intégrés et −1,9 dBTP. La vidéo est copiée sans réencodage : le flux image est identique
à celui de la V3, et la V3 sans voix n'est pas modifiée.
