# « Le lead perdu » : voix hors champ

Vidéo `scalesuite-lead-perdu-9x16` · 25,2 s · français québécois, ton posé et naturel.
Fenêtres **recalées sur les repères réels de la timeline** (`SS.LT` dans
`scalesuite-film/src/scenes-lead-perdu/00-commun.js`, exportés par `render/cues-lead-perdu.mjs`).
Le texte des répliques n'a pas changé. Débit maximal : 2,7 mots par seconde.

| # | Réplique | Fenêtre (s) | Durée | Mots | Mots/s | Repères à l'écran (s) |
|---|---|---|---|---|---|---|
| 1 | Un lead vendeur arrive ce soir. Qui le prend? | 0,20 – 3,60 | 3,40 s | 9 | 2,65 | image 0 (affiche), « Qui le prend? » 1,25, boîte de l'équipe 3,05 |
| 2 | Toute l'équipe partage une seule boîte. | 3,60 – 6,00 | 2,40 s | 6 | 2,50 | titre 3,20, « Non lu » 3,62, titre sorti 5,42 |
| 3 | Le lendemain… trop tard. | 7,60 – 9,40 | 1,80 s | 4 | 2,22 | horloge « mer. » 6,45 et 7,05, « Trop tard. » 9,05 |
| — | *(respiration)* | 9,40 – 11,30 | 1,90 s | — | — | « Il a déjà choisi un autre courtier. » 9,35, bascule 10,80, éclosion menthe 11,20 |
| 4 | Avec ScaleSuite, même lead, même soir. | 11,30 – 13,60 | 2,30 s | 6 | 2,61 | marque 11,30, « Avec ScaleSuite. » 11,32, « Même lead. Même soir. » 11,50 |
| 5 | Chaque courtier a sa propre campagne, optimisée chaque semaine. | 13,80 – 17,20 | 3,40 s | 9 | 2,65 | titre 13,15, « Optimisées chaque semaine » 13,55, annonce de Courtier 03 14,90, appui 16,55 |
| — | *(respiration)* | 17,20 – 19,45 | 2,25 s | — | — | lead dans le CRM 17,62, téléphone 19,00, notification 19,40 |
| 6 | Le lead arrive directement chez son courtier. | 19,45 – 22,05 | 2,60 s | 7 | 2,69 | notification 19,40, « Le soir même. Pas le lendemain. » jusqu'à 20,97, marque 21,82 |
| 7 | ScaleSuite. Demandez une démo. | 22,10 – 24,60 | 2,50 s | 4 | 1,60 | lettres du logo 22,00, bouton 22,22, URL 22,42, tenue jusqu'à 25,20 |

Total : 45 mots. Aucune phrase ne commence par « Et » ou « Mais ».

## Bloc ElevenLabs (Multilingual v2)

```
Un lead vendeur arrive ce soir. Qui le prend? <break time="1.5s" /> Toute l'équipe partage une seule boîte. <break time="1.5s" /> Le lendemain… trop tard. <break time="1.5s" /> Avec ScaleSuite, même lead, même soir. <break time="1.5s" /> Chaque courtier a sa propre campagne, optimisée chaque semaine. <break time="1.5s" /> Le lead arrive directement chez son courtier. <break time="1.5s" /> ScaleSuite. Demandez une démo.
```

Notes :
- Les pauses de 1,5 s devaient servir de points de coupe. Couper le fichier aux silences et placer chaque
  réplique au début de sa fenêtre (avec `audio/mix_vo.py`, une option `--vo` par réplique).
- Réglages suggérés : stabilité 50 à 60 %, similarité 75 %, style 0 à 10 %. Voix québécoise posée.
- Si « ScaleSuite » est mal prononcé, écrire « Scale Suite » dans le bloc.

## Placement final (master avec voix)

La prise unique `voiceover-lead-perdu.mp3` (17,95 s, ElevenLabs) n'a pas les pauses de 1,5 s : entre
les répliques, il n'y a que 0,2 à 0,46 s. Le découpage part donc des points de coupe repérés à
l'oreille, et chaque coupe est déplacée de quelques centièmes vers le point le plus silencieux à
± 60 ms (`audio/split-vo-lead-perdu.py`). Chaque réplique est posée au début de sa fenêtre avec
`audio/mix_vo.py` (`build-lead-perdu-vo.sh`), sans accélération.

| # | Coupe à l'oreille (s) | Coupe dans le silence (s) | Durée | Posée à (s) | Voix audible (s) | Fin du segment (s) |
|---|---|---|---|---|---|---|
| 1 | 0,00 – 2,26 | 0,000 – 2,313 | 2,31 s | 0,20 | 0,26 – 2,44 | 2,51 |
| 2 | 2,70 – 4,49 | 2,650 – 4,549 | 1,90 s | 3,60 | 3,64 – 5,43 | 5,50 |
| 3 | 4,94 – 6,62 | 4,895 – 6,677 | 1,78 s | 7,60 | 7,64 – 9,27 | 9,38 |
| 4 | 7,07 – 9,62 | 7,010 – 9,680 | 2,67 s | **11,00** (fenêtre 11,30, −0,30 s) | 11,05 – 13,55 | 13,67 |
| 5 | 10,02 – 13,19 | 9,979 – 13,246 | 3,27 s | 13,80 | 13,85 – 16,99 | 17,07 |
| 6 | 13,53 – 15,50 | 13,495 – 15,552 | 2,06 s | 19,45 | 19,48 – 21,42 | 21,51 |
| 7 | 15,95 – 17,95 | 15,897 – 17,946 | 2,05 s | 22,10 | 22,16 – 23,97 | 24,15 |

- Aucun chevauchement : l'écart le plus court entre deux voix est de 0,30 s (répliques 4 et 5).
- Niveau de la voix aux coupes : −57 à −90 dBFS, donc dans le silence.
- **Vérification du contenu** : la reconnaissance vocale automatique n'était pas disponible (les
  serveurs de modèles sont bloqués par le proxy). Chaque segment a été vérifié acoustiquement :
  nombre de syllabes (9/11, 8/8, 5/6, 9/8, 14/15, 12/12, 7/8 noyaux détectés pour attendus) et
  pauses internes aux bons endroits (« soir. | Qui », « lendemain… | trop tard », les deux virgules
  de la réplique 4, la virgule de la réplique 5, « ScaleSuite. | Demandez »). Les répliques 2 et 6
  montrent aussi un creux d'environ 0,1 s au milieu, compatible avec une consonne occlusive
  (« partage », « directement ») plutôt qu'avec une coupe. Aucune incohérence ; l'ordre des 7
  répliques est respecté. Une écoute humaine reste la vérification finale.
- Mix : musique −9 dB et effets −4 dB sous la voix. Pendant la parole, la voix est à −18,9 dB RMS,
  la musique à −27,1 dB et les effets à −37,6 dB. Sur chaque effet : bascule 14 dB, appui 13 dB,
  notification 7 dB et bouton 15 dB sous la voix.
- Sortie : `scalesuite-lead-perdu-9x16-vo.mp4`, −14,0 LUFS intégrés, −1,8 dBTP mesuré sur le
  fichier AAC (limiteur suréchantillonné ×4 avant l'encodage). La vidéo est la même que celle du
  master, copiée sans réencodage.
