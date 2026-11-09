# « Dimanche, 21 h 14 » : voix hors champ, feuille de timing

Vidéo `scalesuite-dimanche-9x16` · 33,9 s · français québécois, voix posée, chaleureuse, sans dramatiser.
Fenêtres **calées sur les repères réels de la timeline** (`SS.DT` dans
`scalesuite-film/src/scenes-dimanche/00-commun.js`, exportés par `render/cues-dimanche.mjs`). Débit visé :
5,4 syllabes par seconde au plus (rythme naturel en français), chaque réplique finie avant le changement de
plan qui suit.

| # | Réplique | Fenêtre (s) | Durée | Syllabes | Syll./s | Repères à l'écran (s) |
|---|---|---|---|---|---|---|
| 1 | Jeudi, trois rencontres avec des vendeurs. | 0,20 – 2,75 | 2,55 | 11 | 4,3 | image 0 (affiche) ; cartes 0,35 – 1,3 ; même titre à l'écran |
| 2 | Tout a commencé dimanche, à vingt et une heures quatorze. | 2,95 – 5,75 | 2,80 | 15 | 5,4 | rembobinage 3,02 – 4,32 ; « dim. 21 h 14 » posé 4,32 ; titre 3,35 |
| 3 | Sophie cherche à vendre son condo. Elle tombe sur votre équipe. | 5,85 – 9,30 | 3,45 | 18 | 5,2 | titre 5,8 ; frappe 6,12 ; annonce 6,95 ; appui 7,6 ; page 7,72 |
| 4 | Moins d'une minute plus tard, elle a sa réponse. | 9,55 – 13,10 | 3,55 | 14 | 3,9 | jeton 9,62 ; texto 10,25 ; « Envoyé en moins d'une minute » 10,7 |
| 5 | Vous, vous étiez au souper. | 13,35 – 14,85 | 1,50 | 7 | 4,7 | cell du leader, 21:15, titre 13,4 |
| 6 | Lundi matin, Julie l'appelle. | 15,05 – 17,70 | 2,65 | 9 | 3,4 | « lun. 9 h 00 » 15,4 ; avis 15,4 ; appui sur le numéro 16,8 ; « Appel à Sophie » 16,9 |
| 7 | Marc n'était pas prêt. On est restés en contact. | 17,95 – 21,90 | 3,95 | 12 | 3,0 | carte de Marc 17,95 ; « Pas avant le printemps » 18,4 ; « 6 semaines plus tard » 19,2 ; réponse 20,4 |
| 8 | Jeudi, ils sont tous à l'agenda. | 22,10 – 24,20 | 2,10 | 9 | 4,3 | « jeu. 18 h 30 » 22,5 ; les cartes volent 22,6 – 23,3 ; l'agenda se ferme 24,25 (respiration) |
| 9 | Vous savez d'où viennent vos prochains mandats. | 24,50 – 26,70 | 2,20 | 11 | 5,0 | recul de caméra 24,45 ; titre 24,78 ; semaine de l'équipe |
| 10 | On livre, ou le mois est gratuit. Pas de contrat. | 27,10 – 29,70 | 2,60 | 13 | 5,0 | « Nos engagements. » 27,0 ; crochets 27,25 ; sceau 28,25 ; « Pas de contrat. » 28,5 |
| 11 | Votre diagnostic gratuit, sur scalesuiteqc.ca. | 29,95 – 33,40 | 3,45 | 16 | 4,6 | bouton 29,8 ; logo 30,05 ; relâché 31,02 ; tout posé ≈ 31,9 |

Total : 11 répliques. Aucune ne parle d'une démo : le seul appel à l'action est « Votre diagnostic gratuit,
sur scalesuiteqc.ca. ». Aucune phrase ne commence par « Et » ou « Mais ». La voix reprend mot pour mot les
titres à l'écran (répliques 1, 6, 7, 8, 9 et 10), pour que le film se lise aussi sans le son.

## Bloc ElevenLabs (Multilingual v2), une seule prise

Même texte dans `brag-output/voiceover-dimanche-elevenlabs.txt`. Réglages suggérés : stabilité 50 à 60 %,
similarité 75 %, style 0 à 10 %. Voix québécoise posée.

```
Jeudi, trois rencontres avec des vendeurs. <break time="1.0s" /> Tout a commencé dimanche, à vingt et une heures quatorze. <break time="1.0s" /> Sophie cherche à vendre son condo. Elle tombe sur votre équipe. <break time="1.0s" /> Moins d'une minute plus tard, elle a sa réponse. <break time="1.5s" /> Vous, vous étiez au souper. <break time="1.0s" /> Lundi matin, Julie l'appelle. <break time="1.0s" /> Marc n'était pas prêt. On est restés en contact. <break time="1.0s" /> Jeudi, ils sont tous à l'agenda. <break time="1.0s" /> Vous savez d'où viennent vos prochains mandats. <break time="1.0s" /> On livre, ou le mois est gratuit. Pas de contrat. <break time="1.0s" /> Votre diagnostic gratuit, sur Scale Suite Q C point C A.
```

## Version avec voix : procédure (la prise n'est pas encore dans le dépôt)

1. Déposer la prise à la racine du dépôt : `voiceover-dimanche.mp3`.
2. `scalesuite-film/build-dimanche-vo.sh` : aucune nouvelle image. Le flux vidéo du master est copié tel quel
   et seule la piste audio est remplacée.
   - Découpage en 11 répliques (`audio/split-vo-dimanche.py`) : si la prise contient 10 pauses d'au moins
     0,7 s, coupe là ; sinon, meilleur ajustement de 10 pauses parmi les pauses d'au moins 0,2 s (débit le
     plus régulier en syllabes par seconde ; les répliques 3, 7 et 10 gardent leur pause interne). Des
     points de coupe repérés à l'oreille peuvent remplacer ce choix : `CUTS="a1,b1,a2,b2,…"`, alignés sur le
     point le plus silencieux à ± 60 ms, comme pour « Le lead perdu ».
   - Placement de chaque réplique au début de sa fenêtre (`STARTS`, modifiable), **sans accélération**.
   - Mixage `audio/mix_vo.py` : musique −9 dB et effets −4 dB sous la voix, −14 LUFS ; limiteur
     suréchantillonné ×4 avant l'encodage AAC ; crête mesurée sur le MP4 lui-même.
3. Sortie : `brag-output/scalesuite-dimanche-9x16-vo.mp4` et `audio-dimanche/mix-vo.flac`. Le tableau
   « Placement final » (début réel, fin réelle, marge avant la réplique suivante) sera ajouté ici à partir de
   la sortie du découpage.

Effets sonores et voix : l'effet 3 (l'agenda se ferme, 24,25 s) tombe dans la respiration entre les
répliques 8 et 9 ; l'effet 2 (appui sur le numéro, 16,8 s) et l'effet 4 (sceau, 28,25 s) tombent pendant la
parole et restent sous la voix (effets atténués de 4 dB en plus de leur niveau de 9 à 10 dB sous la musique).
