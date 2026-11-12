"""« Qui répond à 2 h du matin? » : discreet score on the 108 BPM grid, soft effects, ducking, final mix.
  python3 audio/music-qui-repond.py <cues.json> <vo-track.wav> <out dir>
Writes music.wav, sfx.wav and mix.wav (voice + music ducked under the voice + effects). The loudness of the
mix is set afterwards by ffmpeg (−14 LUFS integrated, true peak ≤ −1 dBTP).
Score: night (scenes 1–4) = low pad in D minor and a muted pulse; a light rise before « Voici », then 0,6 s
of COMPLETE silence; the light (scenes 5–7, 9) = F major, brighter pulse; the proof (scene 8) = darker again.
Effects, rare and felt, always under the voice: dull impact where 100×, 79 % and 138 stop and on the cut to
the light; very soft whoosh on the camera moves of scene 6. No bell, no ding, no typing sound."""
import json
import sys
import wave

import numpy as np

cues = json.load(open(sys.argv[1])); VO = sys.argv[2]; OUT = sys.argv[3]
SR = 48000; BEAT = 60 / cues['bpm']; TOTAL = cues['total']; N = int(TOTAL * SR) + SR // 2
S, D = cues['start'], cues['dur']
cue = lambda s, w: S[s] + cues['vo'][s]['cues'][w]['t']
t_all = np.arange(N) / SR
rng = np.random.default_rng(7)


def lp(x, fc):  # one-pole low-pass
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); z = 0.0
    for i in range(len(x)):
        z = (1 - a) * x[i] + a * z; y[i] = z
    return y


def lpf(x, fc):  # fast FFT brick-ish low-pass (zero phase)
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X / (1 + (f / fc) ** 4), len(x))


def add(buf, y, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N or i < 0: return
    y = y[:N - i]
    buf[0, i:i + len(y)] += y * gain * (1 - max(0, pan)); buf[1, i:i + len(y)] += y * gain * (1 + min(0, pan))


def note(f, dur, attack, release, bright=0.25):
    n = int(dur * SR); t = np.arange(n) / SR
    y = np.sin(2 * np.pi * f * t) + bright * np.sin(2 * np.pi * 2 * f * t + 0.3) + 0.5 * np.sin(2 * np.pi * f * 1.004 * t)
    env = np.minimum(1, t / attack) * np.minimum(1, (dur - t) / release)
    return y * env


def pluck(f, dur=0.5, bright=0.3):
    n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + bright * np.sin(2 * np.pi * 2 * f * t)) * np.exp(-t * 9) * np.minimum(1, t / 0.006)


midi = lambda m: 440 * 2 ** ((m - 69) / 12)
music = np.zeros((2, N)); sfx = np.zeros((2, N))
voici = cue('s5', 'voici'); silence0 = S['s5']           # the music stops at the start of scene 5, back on « Voici »
light0 = cue('s5', 'systeme')                           # hard cut to the light
# sections: (start, end, chord progression per bar, pulse gain, brightness)
DM = [[38, 50, 57, 62, 65], [34, 46, 53, 58, 65], [36, 48, 55, 60, 64], [33, 45, 52, 57, 61]]       # Dm  Bb  C  A
FM = [[41, 53, 60, 65, 69], [36, 48, 55, 60, 64], [38, 50, 57, 62, 65], [34, 46, 53, 58, 62]]       # F  C  Dm  Bb
sections = [(0.0, silence0, DM, 0.5, 0.15), (light0, S['s8'], FM, 0.8, 0.3), (S['s8'], S['s9'], DM, 0.55, 0.18), (S['s9'], TOTAL, FM, 0.8, 0.3)]
for a, b, prog, pg, br in sections:
    bars = int(np.ceil((b - a) / (4 * BEAT)))
    for k in range(bars):
        t0 = a + k * 4 * BEAT; ch = prog[k % len(prog)]
        if t0 >= b: break
        dur = min(4 * BEAT + 0.6, b - t0 + 0.25)
        for j, m in enumerate(ch):
            add(music, note(midi(m), dur, 0.5, 0.5, br), t0, 0.05 if j else 0.09, pan=(j - 2) * 0.12)
        for e in range(8):  # muted pulse on the eighth notes
            te = t0 + e * BEAT / 2
            if te >= b - 0.05: break
            add(music, pluck(midi(ch[2 + (e % 3)] + 12), 0.4, br), te, 0.035 * pg * (1.25 if e % 2 == 0 else 0.8), pan=0.25 if e % 2 else -0.25)
music[0] = lpf(music[0], 3200); music[1] = lpf(music[1], 3200)
# light rise before « Voici » (last 0,9 s of scene 4), then complete silence until « Voici »
n = int(0.9 * SR); tt = np.arange(n) / SR
rise = lpf(rng.standard_normal(n), 900) * (tt / 0.9) ** 2 * 6 + np.sin(2 * np.pi * (110 + 110 * (tt / 0.9) ** 2) * tt) * (tt / 0.9) ** 2 * 0.5
add(music, rise, silence0 - 0.9, 0.16)
gate = np.ones(N); i0, i1, i2 = int((silence0 - 0.02) * SR), int(silence0 * SR), int(light0 * SR)
gate[i0:i1] = np.linspace(1, 0, i1 - i0); gate[i1:i2] = 0
music *= gate


def impact(g=1.0):  # dull, felt: a low sine drop and a thud of filtered noise
    n = int(0.7 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * (46 + 34 * np.exp(-t * 14)) * t) * np.exp(-t * 6) + lpf(rng.standard_normal(n), 220) * np.exp(-t * 22) * 3) * g


def whoosh(dur=0.42):
    n = int(dur * SR); t = np.arange(n) / SR
    return lpf(rng.standard_normal(n), 1400) * np.sin(np.pi * t / dur) ** 2 * 2.2


add(sfx, impact(), cue('s3', 'cent'), 0.5)
add(sfx, impact(), cue('s4', 'n79') + 0.42, 0.42)
add(sfx, impact(), voici, 0.55)
add(sfx, impact(), light0, 0.5)
k138 = 'n138' if 'n138' in cues['vo']['s8']['cues'] else 'n124'
add(sfx, impact(), cue('s8', k138) + 0.45, 0.45)
for w in ['chaque', 'leVendeur', 'tonCourtier', 'tuSais', 'desDemandes']:
    add(sfx, whoosh(), cue('s6', w) - 0.3, 0.07, pan=0.2)
add(sfx, whoosh(0.3), S['s7'] - 0.2, 0.06)

# voice, ducking (music −9 dB and effects −4 dB under the voice; 60 ms attack, 350 ms release)
w = wave.open(VO); v = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; w.close()
voice = np.zeros(N); voice[:min(N, len(v))] = v[:N]
voice *= 0.5 / max(1e-9, np.sqrt(np.mean(voice[np.abs(voice) > 0.02] ** 2))) * 0.25
hop = 480; env = np.sqrt(np.mean(voice[:N // hop * hop].reshape(-1, hop) ** 2, axis=1)); act = (env > 0.006).astype(float)
g = np.empty_like(act); z = 0.0
for i, a in enumerate(act):
    z += (a - z) * (1 - np.exp(-0.01 / (0.06 if a > z else 0.35))); g[i] = z
duck = np.interp(np.arange(N), np.arange(len(g)) * hop, g)
music_d = music * (10 ** (-9 * duck / 20)); sfx_d = sfx * (10 ** (-4 * duck / 20))
mix = np.vstack([voice, voice]) + music_d + sfx_d
fade = np.minimum(1, (TOTAL - t_all) / 0.5).clip(0, 1); mix *= fade


def save(name, y):
    y = np.clip(y, -1, 1); wv = wave.open(f'{OUT}/{name}', 'wb'); wv.setnchannels(2); wv.setsampwidth(2); wv.setframerate(SR)
    wv.writeframes((y.T * 32767).astype(np.int16).tobytes()); wv.close()


save('music.wav', music * fade); save('sfx.wav', sfx * fade); save('mix-raw.wav', mix[:, :int(TOTAL * SR)])
rms = lambda x: 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)
sp = duck > 0.9
print(f'under the voice: music {rms(music_d[:, sp]) - rms(voice[sp]):.1f} dB, effects {rms(sfx_d[:, sp]) - rms(voice[sp]):.1f} dB (relative to the voice)')
print(f'silence before Voici: {silence0:.2f} → {voici:.2f} s, music peak {np.abs(music[:, int(silence0 * SR):int(voici * SR)]).max():.4f}')
