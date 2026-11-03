# « Le Système Vendeurs 5 minutes » (film de lancement) : voix hors champ (v3, à valider)

Vidéo `scalesuite-systeme-9x16` · 31,0 s · français québécois, vouvoiement, courte et sèche.
Fenêtres calées sur les repères du plan v3 (`storyboard-systeme.md`) ; elles seront recalées sur les repères réels
de la timeline (`SS.ST`, exportés par `render/cues-systeme.mjs`) après l'aperçu, sans changer le texte.
Débit maximal : 2,7 mots par seconde, compté en **mots prononcés** (« 14 h 12 » = quatorze heures douze = 3 mots ;
« 10 » et « 90 » = 1 mot). Quand une réplique ne tient pas, des mots sont coupés, jamais accélérés.
Aucune phrase ne commence par « Et » ou « Mais ». Aucun trait d'union à l'écran.

## Répliques et fenêtres

| # | Réplique | Fenêtre (s) | Durée | Mots dits | Mots/s | Ce qu'on voit |
|---|---|---|---|---|---|---|
| 1 | 14 h 12 : le vendeur écrit. 17 h : votre courtier le voit. | 0,10 – 4,55 | 4,45 | 12 | 2,70 | accroche ; horloge à 17 h 04 vers 1,7 s ; « Trois heures… » 2,4 s ; éclosion 3,95 s |
| 2 | Voici le Système Vendeurs 5 minutes. | 4,70 – 6,95 | 2,25 | 6 | 2,67 | le nom, mot par mot, 4,7 – 5,4 s ; tenu jusqu'à 7,5 s |
| 3 | Le vendeur reçoit un texto dans la minute. | 7,50 – 10,50 | 3,00 | 8 | 2,67 | 14 h 13 à 7,9 s ; texto 8,3 s |
| 4 | Pas de rappel en 10 minutes? L'équipe est relancée. | 11,30 – 14,65 | 3,35 | 9 | 2,69 | Courtier 03 alerté 10,85 s ; 14 h 22 vers 13,0 s ; Leader 13,4 s |
| 5 | Pas prêt à vendre? Suivi pendant 90 jours. | 14,75 – 17,75 | 3,00 | 8 | 2,67 | carte Suivi 14,7 s ; ven. 5 févr. 15,1 s ; la pile se forme 16,7 s |
| — | *(musique seule)* | 17,75 – 22,00 | 4,25 | — | — | pile cochée, preuve (124, Groupe Mackay : se lit à l'écran) |
| 6 | Si on ne livre pas, vous ne payez pas. | 22,00 – 25,35 | 3,35 | 9 | 2,69 | titre 22,0 s ; sceau 22,5 s ; rareté 23,3 s |
| — | *(musique seule)* | 25,35 – 28,00 | 2,65 | — | — | thèse 25,5 – 27,5 s ; logo 27,7 s |
| 7 | Obtenez votre diagnostic gratuit. | 28,00 – 29,60 | 1,60 | 4 | 2,50 | bouton 28,0 s ; URL 28,15 s ; tenue jusqu'à 31,0 s |

Total : 56 mots dits.

**Notes (choix 2 et 4 du plan) :**
- **Réplique 1** : votre texte, « Le vendeur écrit à 14 h 12. Votre courtier le voit à 17 h. », fait 14 mots dits
  (5,2 s) pour une accroche de 4 s. Je reprends la version réordonnée déjà validée en v2 (12 mots, 4,45 s) : elle
  finit 0,55 s après le début de l'éclosion. Variante : votre texte exact, qui déborderait de 1,4 s sur le nom.
- **Réplique 3** : « Le vendeur reçoit un texto en moins d'une minute. » fait 9 mots (3,35 s) pour une scène de 3 s.
  Je propose « Le vendeur reçoit un texto dans la minute. » (8 mots, mot du site « dans la minute »). Fenêtre
  élargie à 3,0 s (7,50 – 10,50) pour rester à 2,67 mots/s.
- **Réplique 5** : votre texte « Suivi pendant 90 jours » (au lieu de « On le suit pendant 90 jours ») ; elle finit
  pendant la formation de la pile, voulu.
- La preuve (124) et la thèse se lisent à l'écran, sous la musique, sans voix.

## Bloc ElevenLabs (Multilingual v2)

```
Quatorze heures douze : le vendeur écrit. Dix-sept heures : votre courtier le voit. <break time="1.0s" /> Voici le Système Vendeurs cinq minutes. <break time="1.0s" /> Le vendeur reçoit un texto dans la minute. <break time="1.0s" /> Pas de rappel en dix minutes? L'équipe est relancée. <break time="1.0s" /> Pas prêt à vendre? Suivi pendant quatre-vingt-dix jours. <break time="1.5s" /> Si on ne livre pas, vous ne payez pas. <break time="1.5s" /> Obtenez votre diagnostic gratuit.
```

Notes :
- Nombres écrits en lettres pour la prononciation québécoise ; les traits d'union de « dix-sept » et
  « quatre-vingt-dix » ne servent qu'à la prononciation et n'apparaissent nulle part à l'écran.
- Une légère insistance sur « Système Vendeurs cinq minutes » (réplique 2) ; si la voix l'avale, écrire « Voici,
  le Système Vendeurs cinq minutes. »
- Réglages suggérés (ceux de « Le lead perdu ») : stabilité 50 à 60 %, similarité 75 %, style 0 à 10 %.
- Découpage comme pour « Le lead perdu » : points de coupe repérés à l'oreille, alignés sur le point le plus
  silencieux à ± 60 ms (`audio/split-vo-systeme.py`) ; chaque réplique posée au début de sa fenêtre avec
  `audio/mix_vo.py` (musique −9 dB, effets −4 dB sous la voix, −14 LUFS) ; seule la piste audio du master est
  remplacée (`-c:v copy`).
- Déposer la prise à la racine : `voiceover-systeme.mp3`.
