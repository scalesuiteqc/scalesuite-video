# « Le Système Vendeurs 5 minutes » (film de lancement) : voix hors champ (v4, prise reçue)

Vidéo `scalesuite-systeme-9x16` · 31,0 s · français québécois, vouvoiement, courte et posée.
Prise : `voiceover-systeme.mp3` (ElevenLabs, voix « Adam », 27,56 s, 44,1 kHz mono), déposée à la racine.
Le texte a changé : **9 répliques** au lieu de 7 (texte fourni avec la prise). Les fenêtres sont celles que vous avez
données ; elles tombent sur les repères réels de la timeline (`SS.ST`, `render/cues-systeme.mjs`), rappelés dans la
dernière colonne. Débit compté en mots prononcés (« quatre vingt dix » compte pour 1 mot, comme dans les versions
précédentes ; « dix » = 1 mot). Aucune voix n'est accélérée.

## Répliques et fenêtres

| # | Réplique | Fenêtre (s) | Durée | Mots dits | Mots/s | Repères réels à l'écran (s) |
|---|---|---|---|---|---|---|
| 1 | Un vendeur vous écrit. Votre courtier le voit trois heures trop tard. | 0,10 – 4,55 | 4,45 | 12 | **2,70** (à la limite) | image 0 ; 17 h 04 à 1,7 ; « Trois heures… » 2,4 ; éclosion 4,0 |
| 2 | Voici le Système Vendeurs cinq minutes. | 4,70 – 6,95 | 2,25 | 6 | 2,67 | logo 4,15 ; « Système » 4,7 … « minutes. » 5,4 ; tenu jusqu'à 7,2 |
| 3 | Chaque vendeur reçoit un texto dans la minute. | 7,50 – 10,50 | 3,00 | 8 | 2,67 | téléphone 7,5 ; 14 h 13 à 7,9 ; texto 8,3 |
| 4 | Sans rappel en dix minutes, l'équipe est relancée. | 11,30 – 14,65 | 3,35 | 8 | 2,39 | Courtier 03 alerté 11,0 ; 14 h 22 à 13,0 ; Leader 13,4 |
| 5 | Pas prêt à vendre? Suivi pendant quatre vingt dix jours. | 14,75 – 17,75 | 3,00 | 8 | 2,67 | carte Suivi 14,7 ; ven. 5 févr. 15,5 ; la pile se forme 16,7 |
| 6 | Aucune demande ne reste sans réponse. | 17,90 – 20,20 | 2,30 | 6 | 2,61 | pile cochée 17,65 – 19,4 ; preuve 19,4 |
| 7 | Si on ne livre pas, vous ne payez pas. | 22,00 – 25,35 | 3,35 | 9 | 2,69 | titre 22,0 ; sceau 22,5 ; rareté 23,3 |
| 8 | Vos courtiers rencontrent des vendeurs. Nous, on vous les amène. | 25,50 – 29,20 | 3,70 | 10 | **2,70** (à la limite) | thèse 25,5 et 25,8 ; logo 27,7 ; nom 27,85 |
| 9 | Obtenez votre diagnostic gratuit. | 29,30 – 30,90 | 1,60 | 4 | 2,50 | bouton 28,0 ; URL 28,15 ; tenue jusqu'à 31,0 |

Total : 71 mots dits. **Aucune réplique ne dépasse 2,7 mots par seconde** ; les répliques 1 et 8 sont exactement à
2,70.

**À vérifier côté contenu** : la réplique 6, « Aucune demande ne reste sans réponse. », n'est pas une phrase du site
(le site dit « Pour qu'aucun vendeur ne vous échappe »). Elle est cohérente avec la Réponse 60 secondes et la
relance, mais c'est une affirmation plus forte que le texte publié. Je l'ai gardée telle que fournie ; dites-moi si
vous préférez la phrase du site.

## Bloc ElevenLabs (texte de la prise reçue)

```
Un vendeur vous écrit. Votre courtier le voit trois heures trop tard. <break time="1.0s" /> Voici le Système Vendeurs cinq minutes. <break time="1.0s" /> Chaque vendeur reçoit un texto dans la minute. <break time="1.0s" /> Sans rappel en dix minutes, l'équipe est relancée. <break time="1.0s" /> Pas prêt à vendre? Suivi pendant quatre-vingt-dix jours. <break time="1.0s" /> Aucune demande ne reste sans réponse. <break time="1.5s" /> Si on ne livre pas, vous ne payez pas. <break time="1.5s" /> Vos courtiers rencontrent des vendeurs. Nous, on vous les amène. <break time="1.0s" /> Obtenez votre diagnostic gratuit.
```

(« quatre-vingt-dix » avec traits d'union seulement pour la prononciation ; rien n'est écrit à l'écran.)

## Découpage de la prise (`audio/split-vo-systeme.py`)

La prise n'a pas les pauses demandées : 0,23 à 0,49 s entre les répliques, comme certaines pauses internes. Elle
compte 16 blocs de parole, rattachés aux 9 répliques (« Voici, | le Système… », « Sans rappel en dix minutes, |
l'équipe… », « Pas prêt à vendre? | Suivi… », « Si on ne livre pas, | vous… », « …des vendeurs. | Nous, | on vous les
amène. »). Les coupes partent des points repérés entre les répliques et sont déplacées vers le point le plus
silencieux à ± 60 ms ; chaque segment a des fondus de 8 ms.

| # | Coupe repérée (s) | Coupe dans le silence (s) | Niveau aux coupes (dBFS) | Segment |
|---|---|---|---|---|
| 1 | 0,00 – 3,75 | 0,000 – 3,797 | début / −68,8 | 3,80 s |
| 2 | 4,10 – 7,70 | 4,072 – 7,740 | −73,8 / −93,9 | 3,67 s |
| 3 | 8,06 – 10,50 | 8,055 – 10,540 | −90,2 / −71,4 | 2,49 s |
| 4 | 10,75 – 13,38 | 10,729 – 13,382 | −75,8 / −88,8 | 2,65 s |
| 5 | 13,72 – 16,51 | 13,698 – 16,570 | −88,6 / −86,1 | 2,87 s |
| 6 | 16,86 – 18,90 | 16,871 – 18,919 | −88,1 / −88,9 | 2,05 s |
| 7 | 19,11 – 21,39 | 19,090 – 21,446 | −90,0 / −86,6 | 2,36 s |
| 8 | 21,72 – 25,19 | 21,722 – 25,221 | −89,1 / −89,0 | 3,50 s |
| 9 | 25,50 – 27,56 | 25,516 – 27,559 | −92,1 / fin | 2,04 s |

## Placement (`build-systeme-vo.sh`, voix jamais accélérée)

| # | Posée à (s) | Voix audible (s) | Durée parlée | Fenêtre | Résultat |
|---|---|---|---|---|---|
| 1 | 0,10 | 0,17 – 3,77 | 3,60 s | 0,10 – 4,55 | dans la fenêtre |
| 2 | **3,90** | 3,98 – 7,45 | 3,47 s | 4,70 – 6,95 | **déborde** : la prise dure 3,47 s (pause de 0,43 s après « Voici, ») pour une fenêtre de 2,25 s. Avancée de 0,80 s : « Voici, » tombe sur l'éclosion (4,0 s), le nom est dit pendant qu'il s'affiche, et la voix finit 0,15 s avant la réplique 3 |
| 3 | 7,55 | 7,60 – 9,91 | 2,31 s | 7,50 – 10,50 | dans la fenêtre |
| 4 | 11,30 | 11,37 – 13,87 | 2,50 s | 11,30 – 14,65 | dans la fenêtre |
| 5 | 14,75 | 14,82 – 17,48 | 2,66 s | 14,75 – 17,75 | dans la fenêtre |
| 6 | 17,90 | 17,94 – 19,85 | 1,92 s | 17,90 – 20,20 | dans la fenêtre |
| 7 | 22,00 | 22,07 – 24,22 | 2,15 s | 22,00 – 25,35 | dans la fenêtre |
| 8 | 25,50 | 25,55 – 28,89 | 3,35 s | 25,50 – 29,20 | dans la fenêtre |
| 9 | **29,00** | 29,03 – 30,79 | 1,75 s | 29,30 – 30,90 | **déborde** : 1,75 s pour une fenêtre de 1,60 s. Avancée de 0,30 s pour finir à 30,79 s, avant la fin du film (31,0 s) ; écart de 0,14 s avec la réplique 8 |

Aucune réplique ne chevauche la suivante (écart minimal : 0,14 s, entre 8 et 9).

Mix (`audio/mix_vo.py`) : musique −9 dB et effets −4 dB sous la voix, −14 LUFS intégrés, plafond −2,0 dBTP, puis
limiteur suréchantillonné ×4 (limite 0,79) avant l'encodage AAC ; la vidéo du master est copiée sans réencodage
(`-c:v copy`).
