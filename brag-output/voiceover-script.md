# ScaleSuite « Une journée de courtier » : script de narration minuté

Film : `scalesuite-journee-9x16.mp4` (9:16, 25,0 s). Les fenêtres viennent des repères exportés par la
timeline GSAP (`work-journee/cues-journee.json`, aperçu validable). Chaque réplique commence au
début de sa fenêtre et doit finir avant sa fin. Le texte à l'écran reste court : la voix le complète.

## Texte à coller dans ElevenLabs (une réplique par génération)

Voix : québécoise, naturelle, posée et chaleureuse, débit d'environ 2,7 à 3 mots par seconde.
Aucune phrase ne commence par « Et » ou « Mais ».

1. Dix heures. Vous êtes en visite.
2. Pendant ce temps, votre annonce s'affiche dans Google.
3. Treize heures. Vous êtes chez le notaire.
4. Pendant ce temps, un acheteur remplit votre formulaire.
5. Le lead arrive directement dans votre CRM.
6. Dix-sept heures. Vous fermez la journée.
7. Votre rapport de la semaine est prêt.
8. Google Ads? Vous ne l'avez pas ouvert de la journée.
9. ScaleSuite. Demandez une démo.

## Minutage

| # | Réplique | Début (s) | Fin au plus tard (s) | Ancrages à l'écran |
|---|---|---|---|---|
| 1 | « Dix heures. Vous êtes en visite. » | 0,2 | 1,9 | carte 10 h dès l'image 0 ; la carte remonte à 2,0 s |
| 2 | « Pendant ce temps, votre annonce s'affiche dans Google. » | 2,1 | 5,0 | « Pendant ce temps… » à 2,04 s ; l'annonce s'emboîte à 3,2 s ; halo à 3,58 s |
| 3 | « Treize heures. Vous êtes chez le notaire. » | 5,5 | 7,1 | la carte 13 h éclot à 5,25 s ; elle remonte à 7,25 s |
| 4 | « Pendant ce temps, un acheteur remplit votre formulaire. » | 7,35 | 9,3 | formulaire tapé de 7,55 à 8,2 s ; « Envoyer » à 9,35 s |
| — | *(respiration : la poussée vers le téléphone et le gel de 80 ms)* | 9,3 | 10,05 | |
| 5 | « Le lead arrive directement dans votre CRM. » | 10,1 | 12,6 | notification à 10,05 s (*lead* ≈ 10,4 s) ; CRM à 11,85 s ; fiche à 12,22 s |
| 6 | « Dix-sept heures. Vous fermez la journée. » | 14,0 | 15,7 | la carte 17 h éclot à 13,88 s ; elle remonte à 15,9 s |
| 7 | « Votre rapport de la semaine est prêt. » | 16,0 | 17,9 | titre à 16,0 s ; compteurs de 16,1 à 16,9 s |
| 8 | « Google Ads? Vous ne l'avez pas ouvert de la journée. » | 18,4 | 20,9 | « Google Ads? » à 18,45 s ; « Pas ouvert de la journée. » à 19,2 s |
| 9 | « ScaleSuite. Demandez une démo. » | 21,7 | 23,4 | la marque à 21,68 s ; le bouton à 22,25 s ; tenue jusqu'à 25,0 s |

Les fenêtres les plus serrées sont les répliques 2, 4 et 8. Si une prise dépasse, raccourcir le
silence de début plutôt que d'accélérer la voix.

## Mixer la voix

Le mixeur de la V2 fonctionne tel quel avec les pistes de ce film (produites avec le master, dans
`audio-journee/bed.flac` et `audio-journee/sfx.flac`) :

```
cd scalesuite-film
python3 audio/mix_vo.py --stems ../brag-output/audio-journee --out ../brag-output/work-journee/mix-vo-journee.wav \
  --vo l1.wav@0.2 --vo l2.wav@2.1 --vo l3.wav@5.5 --vo l4.wav@7.35 --vo l5.wav@10.1 \
  --vo l6.wav@14.0 --vo l7.wav@16.0 --vo l8.wav@18.4 --vo l9.wav@21.7
ffmpeg -i ../brag-output/scalesuite-journee-9x16.mp4 -i ../brag-output/work-journee/mix-vo-journee.wav \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart scalesuite-journee-9x16-vo.mp4
```

Sous la voix, la musique est atténuée d'environ −9 dB et les effets d'environ −4 dB, à −14 LUFS.
