# « Gardez vos courtiers. Attirez les prochains. » : voix hors champ

Vidéo `scalesuite-equipe-9x16` · 28,2 s · français québécois, ton posé, chaleureux, sans dramatiser.
Fenêtres **recalées sur les repères réels de la timeline** (`SS.ET` dans
`scalesuite-film/src/scenes-equipe/00-commun.js`, exportés par `render/cues-equipe.mjs`). Le texte des
répliques n'a pas changé. Débit maximal : 2,7 mots par seconde.

| # | Réplique | Fenêtre (s) | Durée | Mots | Mots/s | Repères à l'écran (s) |
|---|---|---|---|---|---|---|
| 1 | Votre meilleur courtier vient de partir. | 0,20 – 2,50 | 2,30 s | 6 | 2,61 | image 0 (titre, place vide), « Quelques mois plus tôt » 1,40, titre sorti 2,40 |
| 2 | Les leads Google allaient dans un bassin commun. | 3,10 – 6,10 | 3,00 s | 8 | 2,67 | bassin « Leads Google Ads » et titre 3,10, leads 3,25 – 3,55, premier départ 5,20 |
| 3 | Pour lui, les bons leads allaient toujours aux autres. | 6,20 – 9,60 | 3,40 s | 9 | 2,65 | leads posés jusqu'à 7,55, citation de Courtier 04 7,00 – 8,70 |
| — | *(respiration)* | 9,60 – 11,30 | 1,70 s | — | — | départ de Courtier 04 9,05 – 10,05, « quelqu'un doit décider » 9,00, bascule 11,00 |
| 4 | Avec ScaleSuite, vos leads Google ne se partagent plus. | 11,30 – 14,65 | 3,35 s | 9 | 2,69 | éclosion 11,20, titre 11,60, pastilles de secteur 12,00 – 12,42 |
| 5 | Chaque courtier reçoit les leads de sa campagne. | 14,70 – 17,70 | 3,00 s | 8 | 2,67 | « Ses leads Google. Sa campagne. » 14,05, « +1 » 14,30 – 15,50 |
| 6 | Quand vous recrutez, vous offrez du concret. | 17,80 – 20,40 | 2,60 s | 7 | 2,69 | titre 17,10, carte d'offre 17,30 – 20,00 |
| — | *(respiration)* | 20,40 – 22,90 | 2,50 s | — | — | Courtier 09 rejoint la grille 20,50 (moment chaleureux) |
| 7 | Gardez vos courtiers. Attirez les prochains. | 22,90 – 25,20 | 2,30 s | 6 | 2,61 | même phrase à l'écran 22,85 – 24,55 |
| 8 | ScaleSuite. Demandez une démo. | 25,40 – 27,90 | 2,50 s | 4 | 1,60 | marque 25,10, bouton 25,45, URL 25,65, tenue jusqu'à 28,20 |

Total : 57 mots. La réplique 4 compte 9 mots : sa fenêtre commence 0,2 s plus tôt, pendant la
respiration, pour rester sous 2,7 mots par seconde. Les répliques 2 et 4 précisent « Google » : seuls
les leads Google sont concernés (ni Centris ni les références). Aucune phrase ne commence par « Et » ou
« Mais ». Aucune promesse de résultat, aucun chiffre : la voix décrit le mécanisme (chaque courtier, sa
campagne, ses leads).

## Bloc ElevenLabs (Multilingual v2)

```
Votre meilleur courtier vient de partir. <break time="1.5s" /> Les leads Google allaient dans un bassin commun. <break time="1.5s" /> Pour lui, les bons leads allaient toujours aux autres. <break time="1.5s" /> Avec ScaleSuite, vos leads Google ne se partagent plus. <break time="1.5s" /> Chaque courtier reçoit les leads de sa campagne. <break time="1.5s" /> Quand vous recrutez, vous offrez du concret. <break time="1.5s" /> Gardez vos courtiers. Attirez les prochains. <break time="1.5s" /> ScaleSuite. Demandez une démo.
```

Notes :
- Pour « Le lead perdu », ElevenLabs n'a pas généré les pauses de 1,5 s. Deux façons de faire :
  - **une seule prise** avec le bloc ci-dessus (`voiceover-equipe-elevenlabs.txt`) : donnez-moi ensuite
    les points de coupe repérés à l'oreille, chaque coupe sera alignée sur le silence le plus proche ;
  - **une prise par réplique** (`voiceover-equipe-repliques.txt`, fichiers `l1` à `l8`) : aucun
    découpage à faire, c'est la méthode la plus sûre.
- Réglages suggérés : stabilité 50 à 60 %, similarité 75 %, style 0 à 10 %. Voix québécoise posée.
- Si « ScaleSuite » est mal prononcé, écrire « Scale Suite » dans le bloc.

## Découpage de la prise (`voiceover-equipe.mp3`, 21,32 s)

`ffmpeg silencedetect` ne trouve **aucune pause d'au moins 1 s** : les pauses de 1,5 s n'ont pas été
générées. Il trouve 11 pauses d'au moins 0,2 s (de 0,24 à 0,48 s), pour 7 coupes à faire. Toutes les
combinaisons de 7 pauses parmi 11 ont été essayées (`audio/split-vo-equipe.py`) ; la retenue est celle
dont les 8 segments parlent au débit le plus régulier, en syllabes par seconde de parole, avec deux
contraintes : les répliques 7 et 8 gardent leur pause interne, et les répliques sans ponctuation
interne (1, 2, 5) n'en ont pas.

| # | Début (s) | Fin (s) | Durée | Pause interne | Débit | Réplique attribuée |
|---|---|---|---|---|---|---|
| 1 | 0,07 | 1,99 | 1,92 s | — | 5,22 syll/s | Votre meilleur courtier vient de partir. |
| 2 | 2,40 | 4,47 | 2,07 s | — | 5,80 syll/s | Les leads Google allaient dans un bassin commun. |
| 3 | 4,92 | 7,50 | 2,58 s | à 0,42 s (« Pour lui, ») | 5,14 syll/s | Pour lui, les bons leads allaient toujours aux autres. |
| 4 | 7,98 | 10,80 | 2,82 s | — | 4,96 syll/s | Avec ScaleSuite, vos leads Google ne se partagent plus. |
| 5 | 11,21 | 13,47 | 2,26 s | — | 4,87 syll/s | Chaque courtier reçoit les leads de sa campagne. |
| 6 | 13,93 | 16,21 | 2,28 s | à 0,81 s (« recrutez, ») | 5,51 syll/s | Quand vous recrutez, vous offrez du concret. |
| 7 | 16,57 | 18,90 | 2,33 s | à 0,99 s (« courtiers. ») | 5,72 syll/s | Gardez vos courtiers. Attirez les prochains. |
| 8 | 19,30 | 21,12 | 1,82 s | à 0,71 s (« ScaleSuite. ») | 5,31 syll/s | ScaleSuite. Demandez une démo. |

**Validation de chaque attribution** :
- **Débit** : 4,9 à 5,8 syllabes par seconde sur les 8 segments (écart 0,060 en log). La deuxième
  meilleure combinaison est loin derrière (0,363) : elle donne un segment à 13,6 syll/s, impossible.
- **Syllabes détectées** (noyaux d'énergie 300 – 2 500 Hz) contre attendues : 9/10, 11/12, 11/12,
  12/14, 11/11, 10/11, 10/11, 7/8. Le détecteur en manque une ou deux partout, de façon uniforme.
- **Pauses internes** : les 4 pauses non coupées tombent là où la ponctuation l'annonce (la virgule de
  « Pour lui, », celle de « recrutez, », le point de « courtiers. », celui de « ScaleSuite. »), à une
  position cohérente avec le nombre de syllabes qui les précèdent.
- **Aucune attribution incertaine.** La reconnaissance vocale automatique n'est pas disponible dans
  l'environnement (serveurs de modèles bloqués) ; une écoute humaine reste la vérification finale.

## Placement final (master avec voix)

Chaque segment garde 40 ms de silence avant et après. Chaque réplique est posée au début de sa
fenêtre avec `audio/mix_vo.py` (`build-equipe-vo.sh`), **sans accélération**.

| # | Réplique | Fenêtre (s) | Posée à (s) | Voix audible (s) | Marge en fin de fenêtre |
|---|---|---|---|---|---|
| 1 | Votre meilleur courtier vient de partir. | 0,20 – 2,50 | 0,20 | 0,23 – 2,03 | 0,47 s |
| 2 | Les leads Google allaient dans un bassin commun. | 3,10 – 6,10 | 3,10 | 3,14 – 5,20 | 0,90 s |
| 3 | Pour lui, les bons leads allaient toujours aux autres. | 6,20 – 9,60 | 6,20 | 6,24 – 8,77 | 0,83 s |
| 4 | Avec ScaleSuite, vos leads Google ne se partagent plus. | 11,30 – 14,65 | 11,30 | 11,34 – 14,15 | 0,50 s |
| 5 | Chaque courtier reçoit les leads de sa campagne. | 14,70 – 17,70 | 14,70 | 14,75 – 16,97 | 0,73 s |
| 6 | Quand vous recrutez, vous offrez du concret. | 17,80 – 20,40 | 17,80 | 17,84 – 20,08 | 0,32 s |
| 7 | Gardez vos courtiers. Attirez les prochains. | 22,90 – 25,20 | **22,82** (−0,08 s) | 22,86 – 25,18 | 0,02 s |
| 8 | ScaleSuite. Demandez une démo. | 25,40 – 27,90 | 25,40 | 25,45 – 27,25 | 0,65 s |

- La réplique 7 (2,33 s) dépassait sa fenêtre de 2,30 s : elle commence 0,08 s plus tôt, dans la
  respiration qui suit l'arrivée de Courtier 09. Aucune réplique n'est accélérée.
- Aucun chevauchement : au moins 0,26 s entre deux répliques.
- Les effets du départ (9,05 s), de la bascule (11,0 s) et de l'arrivée (20,5 s) tombent dans les
  respirations ; celui du bouton (25,45 s) est 15,6 dB sous la voix. Pendant la parole : voix
  −19,0 dB RMS, musique −28,3 dB (atténuée de 9 dB), effets −47,8 dB.
- Sortie : `scalesuite-equipe-9x16-vo.mp4`, **−14,0 LUFS**, **−1,9 dBTP** mesuré sur le MP4 (limiteur
  suréchantillonné ×4 avant l'encodage AAC). Flux vidéo identique au master, copié sans réencodage.
