# « Gardez vos courtiers. Attirez les prochains. » : voix hors champ

Vidéo `scalesuite-equipe-9x16` · 28,0 s · français québécois, ton posé, chaleureux, sans dramatiser.
Fenêtres calées sur le plan (`storyboard-equipe.md`) ; elles seront recalées sur les repères exportés
par la timeline au moment du master. Débit maximal : 2,7 mots par seconde.

| # | Réplique | Fenêtre (s) | Durée | Mots | Mots/s | Ancrage à l'écran |
|---|---|---|---|---|---|---|
| 1 | Votre meilleur courtier vient de partir. | 0,20 – 2,50 | 2,30 s | 6 | 2,61 | image 0 : titre et place vide dans la grille |
| 2 | Tous les leads allaient dans un bassin commun. | 2,70 – 5,70 | 3,00 s | 8 | 2,67 | « Quelques mois plus tôt », le bassin commun et ses leads |
| 3 | Pour lui, les bons leads allaient toujours aux autres. | 5,90 – 9,30 | 3,40 s | 9 | 2,65 | leads posés sur les cartes, citation de Courtier 04 à 6,6 s |
| — | *(respiration)* | 9,30 – 11,30 | 2,00 s | — | — | départ de Courtier 04, « quelqu'un doit décider », bascule à 10,8 s |
| 4 | Avec ScaleSuite, il n'y a rien à décider. | 11,30 – 14,30 | 3,00 s | 8 | 2,67 | « Avec ScaleSuite, chaque courtier a sa campagne. », pastilles de campagne |
| 5 | Chaque courtier reçoit les leads de sa campagne. | 14,40 – 17,40 | 3,00 s | 8 | 2,67 | « Ses leads. Sa campagne. », leads qui sortent de chaque campagne |
| 6 | Quand vous recrutez, vous offrez du concret. | 17,50 – 20,10 | 2,60 s | 7 | 2,69 | titre, carte d'offre « Votre propre campagne Google Ads, dès votre arrivée. » |
| — | *(respiration)* | 20,10 – 22,70 | 2,60 s | — | — | Courtier 09 rejoint la grille (moment chaleureux) |
| 7 | Gardez vos courtiers. Attirez les prochains. | 22,70 – 25,00 | 2,30 s | 6 | 2,61 | même phrase à l'écran, grille complète |
| 8 | ScaleSuite. Demandez une démo. | 25,30 – 27,80 | 2,50 s | 4 | 1,60 | logo, bouton « Demander une démo », scalesuiteqc.ca |

Total : 56 mots. Aucune phrase ne commence par « Et » ou « Mais ». Aucune promesse de résultat, aucun
chiffre : la voix décrit le mécanisme (chaque courtier, sa campagne, ses leads).

## Bloc ElevenLabs (Multilingual v2)

```
Votre meilleur courtier vient de partir. <break time="1.5s" /> Tous les leads allaient dans un bassin commun. <break time="1.5s" /> Pour lui, les bons leads allaient toujours aux autres. <break time="1.5s" /> Avec ScaleSuite, il n'y a rien à décider. <break time="1.5s" /> Chaque courtier reçoit les leads de sa campagne. <break time="1.5s" /> Quand vous recrutez, vous offrez du concret. <break time="1.5s" /> Gardez vos courtiers. Attirez les prochains. <break time="1.5s" /> ScaleSuite. Demandez une démo.
```

Notes :
- Pour « Le lead perdu », ElevenLabs n'a pas généré les pauses de 1,5 s. Si c'est encore le cas, il
  suffit de me donner les points de coupe repérés à l'oreille, comme la dernière fois : chaque coupe est
  ensuite alignée sur le silence le plus proche (± 60 ms). Générer chaque réplique séparément évite le
  problème.
- Réglages suggérés : stabilité 50 à 60 %, similarité 75 %, style 0 à 10 %. Voix québécoise posée.
- Si « ScaleSuite » est mal prononcé, écrire « Scale Suite » dans le bloc.
