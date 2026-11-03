# « Le Système Vendeurs 5 minutes » (film de lancement) : voix hors champ (v2, validée)

Vidéo `scalesuite-systeme-9x16` · 40,0 s · français québécois, vouvoiement, ton posé et assuré.
Fenêtres calées sur les repères du plan v2 (`storyboard-systeme.md`). Elles seront **recalées sur les
repères réels de la timeline** (`SS.ST`, exportés par `render/cues-systeme.mjs`) à l'étape 3, sans changer le
texte. Débit maximal : 2,7 mots par seconde, compté en **mots prononcés** (« 14 h 12 » = quatorze heures douze
= 3 mots ; « 90 » et « 10 » = 1 mot). Quand une réplique ne tenait pas, j'ai coupé des mots au lieu
d'accélérer (voir les notes). Aucune phrase ne commence par « Et » ou « Mais ». Aucun trait d'union à l'écran.

## Répliques et fenêtres

| # | Réplique | Fenêtre (s) | Durée | Mots dits | Mots/s | Ce qu'on voit |
|---|---|---|---|---|---|---|
| 1 | 14 h 12 : le vendeur écrit. 17 h : votre courtier le voit. | 0,15 – 4,65 | 4,50 | 12 | 2,67 | accroche ; saut de l'horloge 1,9 s ; « Votre courtier le voit à 17 h 04. » 2,3 s |
| 2 | Trois heures pour appeler quelqu'un d'autre. | 4,70 – 6,95 | 2,25 | 6 | 2,67 | titre du coût tenu jusqu'à 5,4 ; retour en arrière 5,45 ; éclosion 5,95 |
| 3 | Voici le Système Vendeurs 5 minutes. | 7,00 – 9,30 | 2,30 | 6 | 2,61 | « Système » 6,6, « Vendeurs » 6,9, « 5 minutes. » 7,2 – 7,4 ; tenu jusqu'à 10,1 |
| — | *(musique seule)* | 9,30 – 13,00 | 3,70 | — | — | carte produit, composante 1 (campagne et page) |
| 4 | En moins d'une minute, le vendeur reçoit un texto. | 13,00 – 16,35 | 3,35 | 9 | 2,69 | ligne « Réponse 60 secondes » 12,9 ; texto 13,9 ; tenu jusqu'à 16,2 |
| — | *(musique seule)* | 16,35 – 18,30 | 1,95 | — | — | composante 3 (le bon courtier alerté) |
| 5 | Pas de rappel en 10 minutes? L'équipe est relancée. | 18,30 – 21,65 | 3,35 | 9 | 2,69 | ligne « Relance après 10 minutes » 18,3 ; 14 h 22 vers 19,5 ; Leader 19,95 |
| 6 | Pas prêt à vendre? On le suit pendant 90 jours. | 21,75 – 25,10 | 3,35 | 9 | 2,69 | composante 5 21,8 ; pile complète 23,45 – 25,0 |
| — | *(musique seule)* | 25,10 – 27,85 | 2,75 | — | — | preuve : 124, Groupe Mackay (se lit à l'écran) |
| 7 | Si on ne livre pas, vous ne payez pas. Aucun contrat. | 27,80 – 31,90 | 4,10 | 11 | 2,68 | titre 27,9 ; sceau 28,3 ; « Aucun contrat. » 28,8 |
| 8 | Trois nouvelles équipes par mois. | 32,00 – 33,90 | 1,90 | 5 | 2,63 | « 3 nouvelles équipes par mois. » 31,45 ; « Il reste 3 places fondatrices. » 32,0 |
| — | *(musique seule)* | 33,75 – 36,60 | 2,85 | — | — | thèse et rencontre ; logo 34,7 – 36,0 ; nom du système 36,2 |
| 9 | Obtenez votre diagnostic gratuit. | 36,60 – 38,40 | 1,80 | 4 | 2,22 | bouton 36,5 ; URL 36,8 ; tenue jusqu'à 40,0 |

Total : 71 mots dits.

**Coupes et retouches par rapport à votre texte de départ :**
- **Réplique 1** (choix 9 du plan) : « Le vendeur écrit à 14 h 12. Votre courtier le voit à 17 h. » fait 14 mots
  dits, soit 5,2 s, et déborderait sur le coût et le dévoilement. Je l'ai réordonnée en « 14 h 12 : le vendeur
  écrit. 17 h : votre courtier le voit. » (12 mots, 4,5 s), sans rien ajouter. Le texte à l'écran garde votre
  formulation. Variante : votre texte exact, avec le monde gris allongé de 0,8 s (film de 40,8 s).
- **Réplique 4** (choix 10) : « de votre équipe » est retiré. La phrase complète (12 mots, 4,45 s) aurait
  commencé pendant la composante 1 (la campagne).
- **Réplique 2** : elle finit pendant l'éclosion (5,95 – 6,45 s), voulu : la voix termine « quelqu'un d'autre »
  au moment où le monde bascule. Le souffle d'ouverture reste 14 dB sous la voix.
- **Réplique 8** : si `SS.OFFRE.equipesParMois` change, cette réplique doit être réenregistrée.
- **Réplique 7** (choix 3) : la phrase du site mot pour mot, « Si on ne livre pas, vous ne payez pas. Aucun contrat. » (11 mots, 4,1 s) ; la réplique 8 est décalée à 32,0 s.
- Les autres répliques sont mot pour mot les vôtres.

## Bloc ElevenLabs (Multilingual v2)

```
Quatorze heures douze : le vendeur écrit. Dix-sept heures : votre courtier le voit. <break time="1.0s" /> Trois heures pour appeler quelqu'un d'autre. <break time="1.0s" /> Voici le Système Vendeurs cinq minutes. <break time="1.5s" /> En moins d'une minute, le vendeur reçoit un texto. <break time="1.5s" /> Pas de rappel en dix minutes? L'équipe est relancée. <break time="1.0s" /> Pas prêt à vendre? On le suit pendant quatre-vingt-dix jours. <break time="1.5s" /> Si on ne livre pas, vous ne payez pas. Aucun contrat. <break time="1.0s" /> Trois nouvelles équipes par mois. <break time="1.5s" /> Obtenez votre diagnostic gratuit.
```

Notes :
- Les nombres sont écrits en lettres pour qu'ElevenLabs les dise à la québécoise. Les traits d'union de
  « dix-sept » et « quatre-vingt-dix » ne servent qu'à la prononciation et n'apparaissent nulle part à l'écran.
- Une légère insistance sur « Système Vendeurs cinq minutes » (réplique 3) : c'est le nom du produit. Si la
  voix l'avale, ajouter une virgule : « Voici, le Système Vendeurs cinq minutes. »
- Réglages suggérés (ceux de « Le lead perdu ») : stabilité 50 à 60 %, similarité 75 %, style 0 à 10 %. Voix
  québécoise posée.
- ElevenLabs ignore souvent les pauses (0,2 à 0,46 s réelles) : découpage comme pour « Le lead perdu », à partir
  de points de coupe repérés à l'oreille, alignés sur le point le plus silencieux à ± 60 ms
  (`audio/split-vo-systeme.py`, copie de `split-vo-lead-perdu.py`). Chaque réplique est posée au début de sa
  fenêtre avec `audio/mix_vo.py` (musique −9 dB, effets −4 dB sous la voix, −14 LUFS). Seule la piste audio
  du master est remplacée (`-c:v copy`).
- Déposer la prise à la racine : `voiceover-systeme.mp3`.
