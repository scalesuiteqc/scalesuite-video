# « Gardez vos courtiers. Attirez les prochains. » : voix hors champ

Vidéo `scalesuite-equipe-9x16` · 28,2 s · français québécois, ton posé, chaleureux, sans dramatiser.
Fenêtres calées sur le plan (`storyboard-equipe.md`) ; elles seront recalées sur les repères exportés
par la timeline au moment du master. Débit maximal : 2,7 mots par seconde.

| # | Réplique | Fenêtre (s) | Durée | Mots | Mots/s | Ancrage à l'écran |
|---|---|---|---|---|---|---|
| 1 | Votre meilleur courtier vient de partir. | 0,20 – 2,50 | 2,30 s | 6 | 2,61 | image 0 : titre et place vide dans la grille |
| 2 | Tous les leads allaient dans un bassin commun. | 2,70 – 5,70 | 3,00 s | 8 | 2,67 | « Quelques mois plus tôt », le bassin « Leads Google Ads » et ses leads |
| 3 | Pour lui, les bons leads allaient toujours aux autres. | 5,90 – 9,30 | 3,40 s | 9 | 2,65 | leads posés sur les cartes, citation de Courtier 04 à 7,0 s |
| — | *(respiration)* | 9,30 – 11,20 | 1,90 s | — | — | départ de Courtier 04, « quelqu'un doit décider », bascule à 11,0 s |
| 4 | Avec ScaleSuite, vos leads Google ne se partagent plus. | 11,20 – 14,55 | 3,35 s | 9 | 2,69 | « Avec ScaleSuite, chaque courtier a sa campagne. », un secteur par pastille |
| 5 | Chaque courtier reçoit les leads de sa campagne. | 14,60 – 17,60 | 3,00 s | 8 | 2,67 | « Ses leads Google. Sa campagne. », « + 1 lead » sur chaque campagne |
| 6 | Quand vous recrutez, vous offrez du concret. | 17,70 – 20,30 | 2,60 s | 7 | 2,69 | titre, carte d'offre « Votre propre campagne Google Ads, dans votre secteur. » |
| — | *(respiration)* | 20,30 – 22,90 | 2,60 s | — | — | Courtier 09 rejoint la grille (moment chaleureux) |
| 7 | Gardez vos courtiers. Attirez les prochains. | 22,90 – 25,20 | 2,30 s | 6 | 2,61 | même phrase à l'écran, grille complète |
| 8 | ScaleSuite. Demandez une démo. | 25,50 – 28,00 | 2,50 s | 4 | 1,60 | logo, bouton « Demander une démo », scalesuiteqc.ca |

Total : 57 mots. La réplique 4 compte 9 mots (et non 8) : sa fenêtre commence 0,2 s plus tôt, pendant
la respiration, pour rester sous 2,7 mots par seconde. Aucune phrase ne commence par « Et » ou « Mais ». Aucune promesse de résultat, aucun
chiffre : la voix décrit le mécanisme (chaque courtier, sa campagne, ses leads).

## Bloc ElevenLabs (Multilingual v2)

```
Votre meilleur courtier vient de partir. <break time="1.5s" /> Tous les leads allaient dans un bassin commun. <break time="1.5s" /> Pour lui, les bons leads allaient toujours aux autres. <break time="1.5s" /> Avec ScaleSuite, vos leads Google ne se partagent plus. <break time="1.5s" /> Chaque courtier reçoit les leads de sa campagne. <break time="1.5s" /> Quand vous recrutez, vous offrez du concret. <break time="1.5s" /> Gardez vos courtiers. Attirez les prochains. <break time="1.5s" /> ScaleSuite. Demandez une démo.
```

Notes :
- Pour « Le lead perdu », ElevenLabs n'a pas généré les pauses de 1,5 s. Si c'est encore le cas, il
  suffit de me donner les points de coupe repérés à l'oreille, comme la dernière fois : chaque coupe est
  ensuite alignée sur le silence le plus proche (± 60 ms). Générer chaque réplique séparément évite le
  problème.
- Réglages suggérés : stabilité 50 à 60 %, similarité 75 %, style 0 à 10 %. Voix québécoise posée.
- Si « ScaleSuite » est mal prononcé, écrire « Scale Suite » dans le bloc.
