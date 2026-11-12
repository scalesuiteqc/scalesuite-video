"""« Qui répond à 2 h du matin? » : the voice-over is the master track.
  python3 audio/vo-qui-repond.py <voice file (one take, all scenes)> [out dir]
Cuts the single ElevenLabs take into scenes, tightens the pauses (0,3 s at most between two sentences,
0,2 s inside a sentence), speeds the voice up by 4 % without changing its pitch, and writes:
  <out>/vo-01.wav … vo-09.wav   one file per scene (48 kHz)
  <out>/vo-track.wav            the whole voice laid on the film timeline
  src/scenes-qui-repond/vo-timing.js   scene durations and the time of every cue word (film seconds)
No sentence ever crosses a scene boundary: a scene starts PRE seconds before its sentence and ends POST
seconds after it. Word times come from a syllable alignment (no speech model is reachable from this environment): the
pronounced syllables of each word are counted, the syllable nuclei are the peaks of the energy envelope of the
voice band (300 to 3 000 Hz), and syllables are matched to peaks chunk by chunk, between the detected silences."""
import json
import os
import subprocess
import sys
import wave

import numpy as np

SRC = sys.argv[1]
OUT = sys.argv[2] if len(sys.argv) > 2 else '../brag-output/audio-qui-repond'
HERE = os.path.dirname(os.path.abspath(__file__))
SPEED, SR, EDGE = 1.04, 48000, 0.03
GAP = {'S': 0.3, 'W': 0.2}   # longest pause kept: between two sentences / inside a sentence (film seconds)

# speech chunks in SOURCE seconds: (start, end, pause before: F first of the scene, S new sentence, W same sentence)
CHUNKS = {
    1: [(0.06, 0.91, 'F'), (1.44, 2.16, 'S'), (2.29, 3.36, 'W')],
    2: [(4.53, 5.17, 'F'), (5.47, 5.81, 'W'), (6.70, 6.91, 'S'), (7.61, 8.27, 'S')],
    3: [(9.38, 10.44, 'F'), (10.53, 11.28, 'W'), (11.51, 13.69, 'W')],
    4: [(14.74, 16.87, 'F'), (17.11, 17.93, 'W'), (18.46, 19.13, 'S'), (19.48, 20.18, 'W'), (20.98, 22.00, 'S'), (22.19, 23.21, 'W')],
    5: [(24.15, 26.31, 'F')],
    6: [(27.19, 29.76, 'F'), (30.24, 32.04, 'S'), (32.33, 32.97, 'W'), (33.16, 34.39, 'W'), (35.03, 36.54, 'S'), (36.69, 37.06, 'W'),
        (37.42, 38.51, 'W'), (39.03, 40.52, 'S'), (41.00, 42.26, 'S'), (42.71, 44.65, 'S'), (45.08, 46.96, 'S')],
    7: [(47.57, 48.27, 'F'), (48.44, 49.56, 'W')],
    # scene 8 comes from the second take (vo-08-v2: the client against the market), times in THAT file
    8: [(47.70, 48.61, 'F'), (48.80, 50.62, 'W'), (50.75, 51.94, 'W'), (52.03, 52.85, 'W'), (53.22, 54.05, 'S'), (54.14, 55.66, 'W')],
    9: [(55.84, 56.76, 'F'), (57.04, 58.92, 'W')],
}
# cue words: (chunk index, word index inside the chunk[, key]). key=True: highlighted key words and figures
# (tolerance 2 frames), else 4 frames. The time of a cue is the start of that word, found by the syllable alignment.
CUES = {
    1: {'deuxHeures': (0, 0), 'tuViens': (1, 0), 'trois': (2, 0, True)},
    2: {'qui': (0, 0), 'pourVrai': (1, 0, True), 'toi': (2, 0), 'equipe': (3, 0)},
    3: {'rappelle': (0, 0), 'cinqMinutes': (0, 2, True), 'plutot': (1, 0), 'trente': (1, 2, True), 'cent': (2, 2, True), 'plusDeChances': (2, 4)},
    4: {'n79': (0, 0, True), 'desVendeurs': (0, 1), 'unSeul': (1, 0, True), 'ceCourtier': (2, 0), 'toi': (3, 3), 'attends': (4, 0), 'trenteMinutes': (4, 1, True), 'passe': (5, 1, True)},
    5: {'voici': (0, 0, True), 'systeme': (0, 2), 'cinqMinutes': (0, 4, True)},
    6: {'google': (0, 0), 'surLaPage': (0, 5, True), 'chaque': (1, 0), 'parTexto': (2, 0, True), 'soixante': (3, 3, True), 'leVendeur': (4, 0),
        'toutDeSuite': (5, 0, True), 'leJour': (6, 0), 'tonCourtier': (7, 0), 'unChiffre': (7, 4, True), 'tuSais': (8, 0, True), 'rappele': (8, 5, True),
        'desDemandes': (9, 0), 'jamais': (10, 0, True), 'revendues': (10, 3, True)},
    7: {'chaque': (0, 0), 'compteRendu': (1, 0, True)},
    8: {'pour': (0, 0), 'n138': (1, 0, True), 'n51': (2, 1, True), 'moins64': (4, 1, True)},
    9: {'commente': (0, 0), 'cinqMinutes': (0, 1, True), 'pis': (1, 0)},
}
# What each chunk says, as written in the subtitles (one string per chunk, same order as CHUNKS). Figures are always
# written in digits; a non-breaking space keeps « 79 % », « 51 $ », « Mackay : » as ONE subtitle word. « | » starts a
# new subtitle group inside a chunk (so that a group already written on screen can be hidden on its own).
N = ' '
TEXTS = {
    1: ['2 h du matin.', 'Tu viens de recevoir', '3 demandes de vendeurs.'],
    2: ['Qui leur répond,', 'pour vrai?', 'Toi?', 'Ou ton équipe?'],
    3: ['Rappelle en 5 minutes', 'plutôt qu’en 30,', 'pis t’as 100 fois | plus de chances de joindre le vendeur.'],
    4: [f'79{N}% | des vendeurs ne contactent', 'qu’un seul courtier.', 'Ce courtier là,', 'ce devrait être toi.', 'Attends 30 minutes,', 'pis il est passé à autre chose.'],
    5: ['Voici le Système Vendeurs 5 minutes.'],
    6: ['Google Ads amène les vendeurs sur la page de ton équipe.', 'Chaque demande arrive au bon courtier,', 'par texto,', 'en moins de 60 secondes.',
        'Le vendeur reçoit une confirmation', 'tout de suite,', 'le jour comme la nuit.', 'Ton courtier répond avec un chiffre.', 'Tu sais qui a été rappelé.',
        'Des demandes qui appartiennent à ton équipe.', 'Jamais partagées ni revendues.'],
    7: ['Chaque semaine,', 'un compte rendu écrit.'],
    8: [f'Pour le Groupe Mackay{N}:', '138 demandes | depuis avril,', f'à 51{N}$ de pub', 'par demande.', f'C’est 64{N}%', 'de moins que la moyenne du marché.'],
    9: [f'Commente «{N}5 minutes{N}»,', 'pis je te prépare le diagnostic de ton secteur.'],
}
# Syllables PRONOUNCED by each word (same shape as TEXTS, « | » left out): figures read in full (79 % = soi xante dix
# neuf pour cent, 51 $ = cin quante et un do llars, 138 = cent trente huit), mute e dropped where the voice drops it
# (« chaque demande », « trente minutes »), kept where it is heard (« joindre le », « être toi », « autre chose »).
SYL = {
    1: ['1 1 1 2', '1 1 1 3', '1 2 1 2'],
    2: ['1 1 2', '1 1', '1', '1 1 2'],
    3: ['2 1 1 2', '2 1 1', '1 1 1 1 1 1 1 1 2 1 2'],
    4: ['6 1 2 1 2', '1 1 2', '1 2 1', '1 2 2 1', '2 1 2', '1 1 1 2 1 2 1'],
    5: ['2 1 2 2 1 2'],
    6: ['2 1 2 1 2 1 1 1 1 1 2', '1 2 2 1 1 2', '1 2', '1 1 1 2 2', '1 2 2 1 4', '1 1 1', '1 1 1 1 1', '1 2 2 2 1 1', '1 1 1 1 2 3',
        '1 2 1 3 1 1 2', '2 3 1 3'],
    7: ['1 2', '1 1 2 2'],
    8: ['1 1 1 2', '3 2 2 2', '1 6 1 1', '1 2', '1 6', '1 1 1 1 2 1 2'],
    9: ['2 1 2', '1 1 1 2 1 3 1 1 2'],
}
# Corrections by ear: (scene, chunk index, word index) → seconds added to the start of that word (film time).
FIX = {}
# The key words listed for the listening check: label → (scene, chunk index, word index)
KEYWORDS = [('cinq minutes', 3, 0, 2), ('trente', 3, 1, 2), ('cent', 3, 2, 2), ('79 %', 4, 0, 0), ('un seul', 4, 1, 0), ('trente minutes', 4, 4, 1),
            ('Voici', 5, 0, 0), ('soixante secondes', 6, 3, 3), ('tout de suite', 6, 5, 0), ('un chiffre', 6, 7, 4), ('rappelé', 6, 8, 5),
            ('revendues', 6, 10, 3), ('138', 8, 1, 0), ('51 $', 8, 2, 1), ('64 %', 8, 4, 1), ('cinq minutes (fin)', 9, 0, 1)]
PRE = {n: 0.08 for n in CHUNKS}
POST = {1: 1.1, 2: 0.6, 3: 0.5, 4: 0.2, 5: 1.0, 6: 0.2, 7: 0.24, 8: 1.3, 9: 1.0}  # scene 8: 1,2 s held on the final grid
# The five breaths (everything else stays tight):
#   scene 1: 1,1 s after the voice for the bedroom shot (clock, three cards)
#   scene 2: 0,45 s after « pour vrai? », 0,45 s after « Toi? », 0,6 s after « Ou ton équipe? » (POST)
#   scene 3: 0,5 s after « …joindre le vendeur. » so that the 100× settles (POST)
#   scene 4: 0,5 s after « Ce courtier là, ce devrait être toi. »
#   scene 5: 0,6 s of complete silence on black before « Voici » (PRE), and 0,8 s held on the logo after the voice (POST)
PRE[5] = 0.6
BREATH = {(2, 2): 0.45, (2, 3): 0.45, (4, 4): 0.5}   # (scene, chunk index) → pause before that chunk, film seconds  # scene 9 keeps time for the final logo

def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768


x = load(SRC)
# scenes taken from another take: {scene: file next to the main take}. Levels are matched to the main take.
ALT = {8: os.path.join(os.path.dirname(os.path.abspath(SRC)), 'vo-08-v2.mp3')}
ALTX = {}
for sc_, path_ in ALT.items():
    if os.path.exists(path_):
        y_ = load(path_); r0 = np.sqrt(np.mean(x[np.abs(x) > 0.02] ** 2)); r1 = np.sqrt(np.mean(y_[np.abs(y_) > 0.02] ** 2))
        ALTX[sc_] = y_ * (r0 / r1)
os.makedirs(OUT, exist_ok=True)


def save(path, y):
    w = wave.open(path, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()


def faded(a, b, src):
    y = src[int((a - EDGE) * SR):int((b + EDGE) * SR)].copy()
    n = int(0.012 * SR)
    y[:n] *= np.linspace(0, 1, n); y[-n:] *= np.linspace(1, 0, n)
    return y


ER = 1000  # envelope rate (Hz)


def envelope(y):
    """Energy envelope of the voice band (300 to 3 000 Hz), smoothed (Gaussian, sigma 16 ms), at 1 kHz."""
    n = len(y); f = np.fft.rfft(y); fr = np.fft.rfftfreq(n, 1 / SR)
    f[(fr < 300) | (fr > 3000)] = 0
    e = np.abs(np.fft.irfft(f, n)) ** 2
    e = e[:len(e) // (SR // ER) * (SR // ER)].reshape(-1, SR // ER).mean(axis=1)
    g = np.exp(-0.5 * (np.arange(-48, 49) / 16.0) ** 2); g /= g.sum()
    return np.sqrt(np.convolve(e, g, mode='same'))


LAMBDA = 0.35   # weight of the regular-rhythm prior against the height of the peaks


def nuclei(e, n):
    """n syllable nuclei for n syllables. Candidates: every peak of the envelope (weight = its prominence), plus
    a 20 ms grid of weightless candidates for nuclei that the envelope does not separate (two vowels in a row).
    A dynamic programme picks the n candidates, in order, that are the most prominent while keeping the
    intervals close to the mean syllable length of the chunk. Returns (indices, peaks found naturally)."""
    idx = [i for i in range(1, len(e) - 1) if e[i] > e[i - 1] and e[i] >= e[i + 1] and e[i] > 0.04 * e.max()]

    def prom(i):
        l = i
        while l > 0 and e[l - 1] <= e[i]: l -= 1
        r = i
        while r < len(e) - 1 and e[r + 1] <= e[i]: r += 1
        base = max(e[l:i + 1].min() if l > 0 else 0.0, e[i:r + 1].min() if r < len(e) - 1 else 0.0)
        return e[i] - base
    pr = {i: prom(i) for i in idx}
    natural = [i for i in idx if pr[i] > 0.07 * e.max()]
    top = max(pr.values()) if pr else 1.0
    cand = sorted(set(idx) | set(range(10, len(e) - 10, 20)))
    ref = float(np.median([e[i] for i in natural])) if natural else float(e.max())
    # a weightless candidate may stand on a shoulder of the envelope, not in a dip between two syllables
    w = np.array([min(1.0, (pr[c] / top) ** 0.5) if c in pr else -0.6 * (1 - min(1.0, e[c] / (0.6 * ref))) for c in cand]); pos = np.array(cand, dtype=float)
    d = len(e) / n
    best = w - LAMBDA * ((pos - d / 2) / d) ** 2; back = []
    for k in range(1, n):
        gap = (pos[None, :] - pos[:, None])                      # gap[i, j] = pos[j] - pos[i]
        sc_ = best[:, None] - LAMBDA * ((gap - d) / d) ** 2
        sc_[gap < 60] = -1e9                                     # two nuclei are at least 60 ms apart
        back.append(sc_.argmax(axis=0)); best = sc_.max(axis=0) + w
    best = best - LAMBDA * ((len(e) - pos - d / 2) / d) ** 2
    j = int(best.argmax()); pk = [j]
    for b in reversed(back): j = int(b[j]); pk.append(j)
    return [cand[j] for j in reversed(pk)], len(natural)


def align(y, c0, c1, syl):
    """Word starts (s, scene-local, before PRE) of a chunk [c0, c1]: each word starts at the end of the dip of the
    envelope before its first syllable nucleus; the first word starts with the chunk."""
    e = envelope(y[int(c0 * SR):int(c1 * SR)])
    pk, natural = nuclei(e, sum(syl))
    starts, si = [], 0
    for wi, k in enumerate(syl):
        if wi == 0: starts.append(c0)
        else:
            a, b = pk[si - 1], pk[si]
            m = min(15, (b - a) // 3)   # the dip is looked for strictly between the two nuclei
            seg = e[a + m:b - m + 1]; lo = float(seg.min())
            # the word starts where the envelope leaves the dip and rises to its first nucleus (end of the dip)
            below = np.nonzero(seg <= lo + 0.1 * (e[b] - lo))[0]
            starts.append(c0 + (a + m + int(below[-1] if len(below) else np.argmin(seg))) / ER)
        si += k
    return starts, natural


report, PER = [], {}
timing, track, t0 = {}, [], 0.0
for sc, chunks in CHUNKS.items():
    parts, src2loc, pos, prev = [], [], 0.0, None   # pos: seconds in the compacted scene BEFORE the speed-up
    for ci, (a, b, g) in enumerate(chunks):
        if prev is not None:
            gap = BREATH.get((sc, ci), min(a - prev, GAP[g])) * SPEED    # so that the pause is at most GAP in film time
            parts.append(np.zeros(int(gap * SR), dtype=np.float32)); pos += gap
        src2loc.append((a - EDGE, b + EDGE, pos))
        y = faded(a, b, ALTX.get(sc, x)); parts.append(y); pos += len(y) / SR; prev = b
    tmp = os.path.join(OUT, f'_s{sc}.wav'); dst = os.path.join(OUT, f'vo-{sc:02d}.wav')
    save(tmp, np.concatenate(parts))
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-af', f'atempo={SPEED}', '-ar', str(SR), dst], check=True)
    os.remove(tmp)
    w = wave.open(dst); y = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768; w.close()
    voice = len(y) / SR
    dur = round(PRE[sc] + voice + POST[sc], 3)

    def loc(ts):
        for a, b, p in src2loc:
            if a <= ts <= b:
                return round(PRE[sc] + (p + ts - a) / SPEED, 3)
        raise ValueError(f'cue at {ts} is outside the speech chunks of scene {sc}')
    words, per, grp = [], [], 0   # subtitles: [text, start, end, group index], seconds from the scene start
    for ci, ((a, b, g), text, syl) in enumerate(zip(chunks, TEXTS[sc], SYL[sc])):
        toks = text.split(' '); syl = [int(k) for k in syl.split(' ')]
        assert len([k for k in toks if k != '|']) == len(syl), (sc, ci, text)
        c0, c1 = loc(a) - PRE[sc], loc(b) - PRE[sc]
        st, natural = align(y, c0, c1, syl)
        st = [round(PRE[sc] + v + FIX.get((sc, ci, wi), 0), 3) for wi, v in enumerate(st)]
        report.append((sc, ci, sum(syl), natural, text))
        row, wi = [], 0
        for k in toks:
            if k == '|': grp += 1; continue
            row.append([k.replace(N, ' '), st[wi], st[wi + 1] if wi + 1 < len(st) else round(PRE[sc] + c1, 3), grp]); wi += 1
        per.append(row); words += row; grp += 1
    cues = {}
    for k, v in CUES[sc].items():
        cues[k] = {'t': per[v[0]][v[1]][1], 'key': len(v) > 2 and v[2]}
    PER[sc] = per
    timing[f's{sc}'] = {'dur': dur, 'voice': [PRE[sc], round(PRE[sc] + voice, 3)], 'cues': cues, 'words': words}
    track.append(np.zeros(int(round((t0 + PRE[sc]) * SR)) - sum(len(p) for p in track), dtype=np.float32)); track.append(y)
    t0 += dur
track.append(np.zeros(max(0, int(round(t0 * SR)) - sum(len(p) for p in track)), dtype=np.float32))
save(os.path.join(OUT, 'vo-track.wav'), np.concatenate(track))
js = ('/* GENERATED by audio/vo-qui-repond.py from the voice-over take. Do not edit by hand.\n'
      '   dur: scene duration (s). voice: [start, end] of the voice inside the scene. cues: time of each cue word,\n'
      '   in seconds from the scene start; key = highlighted key word or figure (sync tolerance 2 frames, else 4). */\n'
      'window.SS = window.SS || {};\nSS.VO = ' + json.dumps(timing, indent=1, ensure_ascii=False) + ';\n')
open(os.path.join(HERE, '..', 'src', 'scenes-qui-repond', 'vo-timing.js'), 'w').write(js)
t = 0.0
print('scene  start    dur   voice')
for k, v in timing.items():
    print(f'{k:>5} {t:6.2f} {v["dur"]:6.2f} {v["voice"][1] - v["voice"][0]:6.2f}'); t += v['dur']
print(f'total {t:.2f} s (voice speed ×{SPEED})')
print('\nsyllables per chunk (expected / peaks found naturally):')
for sc, ci, n, nat, text in report:
    print(f'  s{sc}:{ci:<2} {n:>2} / {nat:<2} {"" if n == nat else "≠ "}{text}')
starts = {}; t = 0.0
for k, v in timing.items(): starts[int(k[1:])] = t; t += v['dur']
lines = ['Mots clés : temps dans le film (début du mot)', '']
for label, sc, ci, wi in KEYWORDS:
    tt = starts[sc] + PER[sc][ci][wi][1]
    lines.append(f'{label:<20} {tt:6.2f} s   image {round(tt * 60):>4} à 60 i/s   « {" ".join(w[0] for w in PER[sc][ci])} »')
open(os.path.join(OUT, 'mots-cles.txt'), 'w').write('\n'.join(lines) + '\n')
print('\n' + '\n'.join(lines))
