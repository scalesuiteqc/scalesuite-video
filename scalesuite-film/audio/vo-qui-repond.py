"""« Qui répond à 2 h du matin? » : the voice-over is the master track.
  python3 audio/vo-qui-repond.py <voice file (one take, all scenes)> [out dir]
Cuts the single ElevenLabs take into scenes, tightens the pauses (0,3 s at most between two sentences,
0,2 s inside a sentence), speeds the voice up by 4 % without changing its pitch, and writes:
  <out>/vo-01.wav … vo-09.wav   one file per scene (48 kHz)
  <out>/vo-track.wav            the whole voice laid on the film timeline
  src/scenes-qui-repond/vo-timing.js   scene durations and the time of every cue word (film seconds)
No sentence ever crosses a scene boundary: a scene starts PRE seconds before its sentence and ends POST
seconds after it. Word times come from the pauses and the loudness envelope of the take (no speech model
is reachable from this environment): key words are marked on syllable onsets by hand, in SOURCE seconds."""
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
    8: [(50.19, 51.05, 'F'), (51.29, 53.12, 'W'), (53.23, 55.19, 'W')],
    9: [(55.84, 56.76, 'F'), (57.04, 58.92, 'W')],
}
# cue words in SOURCE seconds. key=True: highlighted key words and figures (tolerance 2 frames), else 4 frames.
CUES = {
    1: {'deuxHeures': 0.06, 'tuViens': 1.44, 'trois': (2.29, True)},
    2: {'qui': 4.53, 'pourVrai': (5.47, True), 'toi': 6.70, 'equipe': 7.61},
    3: {'rappelle': 9.38, 'cinqMinutes': (9.69, True), 'plutot': 10.53, 'cent': (11.85, True), 'plusDeChances': 12.22},
    4: {'n79': (14.74, True), 'desVendeurs': 15.85, 'unSeul': (17.11, True), 'ceCourtier': 18.46, 'toi': 19.98, 'attends': 20.98, 'passe': (22.35, True)},
    5: {'voici': (24.15, True), 'systeme': 24.60, 'cinqMinutes': (25.40, True)},
    6: {'google': 27.19, 'surLaPage': (28.45, True), 'chaque': 30.24, 'parTexto': (32.33, True), 'soixante': (33.62, True), 'leVendeur': 35.03,
        'toutDeSuite': (36.69, True), 'leJour': 37.42, 'tonCourtier': 39.03, 'tuSais': (41.00, True), 'desDemandes': 42.71, 'jamais': (45.08, True)},
    7: {'chaque': 47.57, 'compteRendu': (48.44, True)},
    8: {'pour': 50.19, 'n124': (51.29, True), 'n54': (53.35, True)},
    9: {'commente': 55.84, 'cinqMinutes': (56.25, True), 'pis': 57.04},
}
PRE = {n: 0.08 for n in CHUNKS}
POST = {1: 1.1, 2: 0.6, 3: 0.5, 4: 0.2, 5: 1.0, 6: 0.2, 7: 0.24, 8: 0.24, 9: 1.0}
# The five breaths (everything else stays tight):
#   scene 1: 1,1 s after the voice for the bedroom shot (clock, three cards)
#   scene 2: 0,45 s after « pour vrai? », 0,45 s after « Toi? », 0,6 s after « Ou ton équipe? » (POST)
#   scene 3: 0,5 s after « …joindre le vendeur. » so that the 100× settles (POST)
#   scene 4: 0,5 s after « Ce courtier là, ce devrait être toi. »
#   scene 5: 0,6 s of complete silence on black before « Voici » (PRE), and 0,8 s held on the logo after the voice (POST)
PRE[5] = 0.6
BREATH = {(2, 2): 0.45, (2, 3): 0.45, (4, 4): 0.5}   # (scene, chunk index) → pause before that chunk, film seconds  # scene 9 keeps time for the final logo

raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', SRC, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768
os.makedirs(OUT, exist_ok=True)


def save(path, y):
    w = wave.open(path, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()


def faded(a, b):
    y = x[int((a - EDGE) * SR):int((b + EDGE) * SR)].copy()
    n = int(0.012 * SR)
    y[:n] *= np.linspace(0, 1, n); y[-n:] *= np.linspace(1, 0, n)
    return y


timing, track, t0 = {}, [], 0.0
for sc, chunks in CHUNKS.items():
    parts, src2loc, pos, prev = [], [], 0.0, None   # pos: seconds in the compacted scene BEFORE the speed-up
    for ci, (a, b, g) in enumerate(chunks):
        if prev is not None:
            gap = BREATH.get((sc, ci), min(a - prev, GAP[g])) * SPEED    # so that the pause is at most GAP in film time
            parts.append(np.zeros(int(gap * SR), dtype=np.float32)); pos += gap
        src2loc.append((a - EDGE, b + EDGE, pos))
        y = faded(a, b); parts.append(y); pos += len(y) / SR; prev = b
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
    cues = {}
    for k, v in CUES[sc].items():
        ts, key = (v if isinstance(v, tuple) else (v, False))
        cues[k] = {'t': loc(ts), 'key': key}
    timing[f's{sc}'] = {'dur': dur, 'voice': [PRE[sc], round(PRE[sc] + voice, 3)], 'cues': cues}
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
