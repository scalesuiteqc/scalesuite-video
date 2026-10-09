# « Le lead perdu » : voix hors champ

Vidéo `scalesuite-lead-perdu-9x16` · 25,0 s · français québécois, ton posé et naturel.
Fenêtres calées sur le plan (`storyboard-lead-perdu.md`) ; elles seront recalées sur les repères
exportés par la timeline au moment du master. Débit maximal : 2,7 mots par seconde.

| # | Réplique | Fenêtre (s) | Durée | Mots | Mots/s | Ancrage à l'écran |
|---|---|---|---|---|---|---|
| 1 | Un lead vendeur arrive ce soir. Qui le prend? | 0,2 – 3,6 | 3,4 s | 9 | 2,65 | annonce « Commandité », carte du lead, « Qui le prend? » à 1,3 s |
| 2 | Toute l'équipe partage une seule boîte. | 4,2 – 6,6 | 2,4 s | 6 | 2,50 | boîte de réception de l'équipe, lead « Non lu » |
| 3 | Le lendemain… trop tard. | 7,6 – 9,4 | 1,8 s | 4 | 2,22 | horloge « mer. » à 7,6 s, « Trop tard. » à 9,2 s |
| — | *(respiration)* | 9,4 – 11,0 | 1,6 s | — | — | lead gris, retour en arrière, éclosion menthe |
| 4 | Avec ScaleSuite, même lead, même soir. | 11,0 – 13,3 | 2,3 s | 6 | 2,61 | marque à 11,0 s, « Même lead. Même soir. » |
| 5 | Chaque courtier a sa propre campagne, optimisée chaque semaine. | 14,0 – 17,4 | 3,4 s | 9 | 2,65 | campagnes par courtier, ligne 03, annonce de Courtier 03 |
| — | *(respiration)* | 17,4 – 19,2 | 1,8 s | — | — | lead dans le CRM, notification à 18,7 s |
| 6 | Le lead arrive directement chez son courtier. | 19,2 – 21,8 | 2,6 s | 7 | 2,69 | « Chaque lead chez son courtier. » |
| 7 | ScaleSuite. Demandez une démo. | 22,6 – 24,6 | 2,0 s | 4 | 2,00 | bouton « Demander une démo », scalesuiteqc.ca |

Total : 45 mots. Aucune phrase ne commence par « Et » ou « Mais ».

## Bloc ElevenLabs (Multilingual v2)

```
Un lead vendeur arrive ce soir. Qui le prend? <break time="1.5s" /> Toute l'équipe partage une seule boîte. <break time="1.5s" /> Le lendemain… trop tard. <break time="1.5s" /> Avec ScaleSuite, même lead, même soir. <break time="1.5s" /> Chaque courtier a sa propre campagne, optimisée chaque semaine. <break time="1.5s" /> Le lead arrive directement chez son courtier. <break time="1.5s" /> ScaleSuite. Demandez une démo.
```

Notes :
- Les pauses de 1,5 s servent de points de coupe. Couper le fichier aux silences et placer chaque
  réplique au début de sa fenêtre (avec `audio/mix_vo.py`, une option `--vo` par réplique).
- Réglages suggérés : stabilité 50 à 60 %, similarité 75 %, style 0 à 10 %. Voix québécoise posée.
- Si « ScaleSuite » est mal prononcé, écrire « Scale Suite » dans le bloc.
