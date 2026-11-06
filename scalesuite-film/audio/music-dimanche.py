"""« Dimanche, 21 h 14 » soundtrack: synthesised on the picture's timing (render/cues-dimanche.mjs).
Same method, instruments and effect settings as audio/music-lead-perdu.py (the validated reference).

Sound rule (skill scalesuite-video, section 10): 4 to 6 soft effects in the whole film, 8 to 12 dB under
the music, no bell, no "ding", nothing for each element that appears. This film has 5, on `sfx-*` cues:
   7.6 s  tap on the sponsored ad            felt click (feltclick)
  16.75 s Julie taps Sophie's number (call)   felt click, softer
  24.25 s the agenda closes                   low felt thud (feltthud)
  28.2 s  the seal is printed                 stamp press, shorter felt thud
  31.15 s the button is released             soft breath that opens (breath, 'swell')
Score (music bus only):
- Hook: warm F major 9 on felt piano and a soft pad; the signature (C F E A) sketched on two notes.
- Rewind: a felt-piano chord played backwards and the pad gliding down a semitone with the scrub, landing
  on D minor 9 for "dimanche soir" (warm, intimate).
- Sunday evening: posed and warm, FM electric piano, round bass, slow tempo (84 bpm, swing 58 %), no drums
  until the text message; very soft rim and shaker from 9.4 s.
- Dinner: the drums stop, one pad (the breath of the film).
- Monday to Thursday: steady rise (bass, soft kick, pad opening); the four-note signature once, felt piano,
  middle register, on the agenda closing. Risk: no kick. End: F major resolution, the signature slower.

    python3 audio/music-dimanche.py --cues cues.json [--end 33.9] out.wav [--stems DIR]
"""
import json
import os
import sys
import wave

import numpy as np
from scipy.signal import butter, fftconvolve, sosfilt

SR = 48000
ARGS = sys.argv[1:]
CUES = json.load(open(ARGS[ARGS.index('--cues') + 1]))
END = float(ARGS[ARGS.index('--end') + 1]) if '--end' in ARGS else CUES['duration']
OUT = next((a for a in ARGS if a.endswith('.wav')), 'music-dimanche.wav')
STEMS = ARGS[ARGS.index('--stems') + 1] if '--stems' in ARGS else None
N = int(SR * (END + 3))
rng = np.random.default_rng(1114)
DT = CUES['DT']
BEAT, SWING = 60 / 84, 0.58


def at(kind, default=None):
    c = [c for c in CUES['cues'] if c['type'] == kind]
    return c[0]['t'] if c else default


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def t_arr(dur):
    return np.arange(int(dur * SR)) / SR


def lp(x, fc, order=2):
    return sosfilt(butter(order, min(fc, SR * 0.45), 'low', fs=SR, output='sos'), x)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, min(hi, SR * 0.45)], 'band', fs=SR, output='sos'), x)


class Bus:
    def __init__(self):
        self.x = np.zeros((2, N))

    def add(self, sig, t0, gain=1.0, pan=0.0):
        if t0 is None or t0 >= END + 2:
            return
        i = int(round(t0 * SR))
        if i < 0:
            sig, i = sig[-i:], 0
        n = min(len(sig), N - i)
        if n <= 0:
            return
        gl, gr = np.cos((pan + 1) * np.pi / 4) * 1.414, np.sin((pan + 1) * np.pi / 4) * 1.414
        self.x[0, i:i + n] += sig[:n] * gain * gl
        self.x[1, i:i + n] += sig[:n] * gain * gr


def env(t, a, d):
    return np.clip(t / max(a, 1e-4), 0, 1) * np.exp(-t / d)


# ---------------------------------------------------------------- instruments (soft only)
def felt(f, dur=2.4, vel=1.0):
    """felt piano: hammer muted by felt, warm partials, slow decay, low-passed (no bright tine)"""
    t = t_arr(dur)
    x = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2.003 * f * t) * np.exp(-t / 0.6)
         + 0.12 * np.sin(2 * np.pi * 3.01 * f * t) * np.exp(-t / 0.25))
    thud = lp(rng.standard_normal(len(t)), 600) * env(t, 0.001, 0.012) * 0.2
    return lp((x * env(t, 0.006, 0.9 + 120 / f) + thud) * vel, 1800 + 600 * vel)


def epiano(f, dur=1.8, vel=1.0):
    t = t_arr(dur)
    idx = (1.2 * vel) * np.exp(-t / 0.22) + 0.25
    x = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * t))
    trem = 1 + 0.06 * np.sin(2 * np.pi * 5.2 * t)
    return lp(x * env(t, 0.004, 1.3) * trem, 3200)


def chord(fn, notes, dur, **kw):
    return sum(fn(midi(n), dur, **kw) for n in notes) / len(notes)


def pad(notes, dur, att=0.8, rel=1.0, bright=1.0):
    """soft 'aah' pad: detuned saws through vowel formants"""
    t = t_arr(dur)
    out = np.zeros(len(t))
    for n in notes:
        for dt in (-0.005, 0.0, 0.005):
            f = midi(n) * (1 + dt) * (1 + 0.003 * np.sin(2 * np.pi * (4.4 + dt * 100) * t))
            ph = 2 * np.pi * np.cumsum(f) / SR
            out += sum(np.sin(k * ph) / k for k in range(1, 8))
    out = bp(out, 400, 850) + bp(out, 950, max(1100, 1400 * bright)) * 0.5
    e = np.clip(t / att, 0, 1) * np.clip((dur - t) / rel, 0, 1)
    return out * e / (len(notes) * 3)


def bass(f, dur=0.45, vel=1.0):
    t = t_arr(dur)
    ph = 2 * np.pi * np.cumsum(f * (1 - 0.05 * np.exp(-t / 0.03))) / SR
    x = np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.06 * np.sin(3 * ph)
    return np.tanh(1.3 * x * env(t, 0.005, dur * 0.55)) * vel


def kick(vel=1.0):
    t = t_arr(0.3)
    f = 46 + 50 * np.exp(-t / 0.03)
    return np.tanh(1.3 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.12)) * vel


def rim(vel=1.0):  # rounded, low-passed rim
    t = t_arr(0.06)
    return lp(bp(rng.standard_normal(len(t)), 1200, 4000) * 0.5 + np.sin(2 * np.pi * 1100 * t) * 0.4, 3000) * env(t, 0.0005, 0.012) * vel


def shaker(vel=1.0):
    t = t_arr(0.07)
    return lp(hp(rng.standard_normal(len(t)), 5000), 9000) * np.clip(t / 0.008, 0, 1) * np.exp(-t / 0.026) * vel


def softtick(vel=1.0):  # the clock inside the music: a muted wooden tock, low-passed
    t = t_arr(0.06)
    return lp(np.sin(2 * np.pi * 900 * t) + 0.3 * np.sin(2 * np.pi * 1350 * t), 1400) * env(t, 0.001, 0.014) * vel


def breath(dur, lo, hi, shape='swell', vel=1.0):
    """filtered noise breath; band sweeps lo → hi; low-passed so it never gets airy-bright"""
    n = int(dur * SR)
    x = rng.standard_normal(n)
    out = np.zeros(n)
    for b in range(24):
        a, z = b * n // 24, (b + 1) * n // 24
        fc = lo * (hi / lo) ** ((b + 0.5) / 24)
        out[a:z] = bp(x[a:z], fc * 0.6, fc * 1.6)
    u = np.arange(n) / n
    e = {'swell': np.sin(np.pi * u) ** 1.6, 'rise': u ** 2.2 * (1 - np.clip((u - 0.94) / 0.06, 0, 1)), 'fall': (1 - u) ** 1.6 * np.clip(u / 0.05, 0, 1)}[shape]
    return lp(out * e, 2500) * vel


def feltclick(vel=1.0):
    t = t_arr(0.08)
    return lp(rng.standard_normal(len(t)), 1500) * env(t, 0.0008, 0.01) * vel + np.sin(2 * np.pi * 180 * t) * env(t, 0.001, 0.015) * 0.5 * vel


def mutedbuzz(dur=0.22, vel=1.0):
    t = t_arr(dur)
    x = np.tanh(2 * np.sin(2 * np.pi * 150 * t)) * (0.65 + 0.35 * np.sin(2 * np.pi * 26 * t))
    return lp(x, 380, 4) * np.clip(t / 0.02, 0, 1) * np.clip((dur - t) / 0.05, 0, 1) * vel


def feltthud(dur=0.32, vel=1.0, fc=900, f0=110):
    """a low felt thud (a closed book, a stamp): low-passed noise and a short damped low sine, no ring"""
    t = t_arr(dur)
    body = np.sin(2 * np.pi * f0 * t * (1 - 0.12 * t / dur)) * env(t, 0.002, 0.05)
    knock = lp(rng.standard_normal(len(t)), fc) * env(t, 0.0008, 0.018)
    return lp(body * 0.8 + knock * 0.6, 1400) * vel


def glidepad(notes, dur, semis, g0, g1, att=0.4, rel=0.8, bright=1.0):
    """the pad of pad(), its pitch bent by `semis` semitones between g0 and g1 (seconds into the note)"""
    t = t_arr(dur)
    k = np.clip((t - g0) / max(g1 - g0, 1e-3), 0, 1)
    k = k * k * (3 - 2 * k)
    bend = 2 ** (semis * k / 12)
    out = np.zeros(len(t))
    for n in notes:
        for dt in (-0.005, 0.0, 0.005):
            f = midi(n) * (1 + dt) * bend * (1 + 0.003 * np.sin(2 * np.pi * (4.4 + dt * 100) * t))
            ph = 2 * np.pi * np.cumsum(f) / SR
            out += sum(np.sin(k2 * ph) / k2 for k2 in range(1, 8))
    out = bp(out, 400, 850) + bp(out, 950, max(1100, 1400 * bright)) * 0.5
    e = np.clip(t / att, 0, 1) * np.clip((dur - t) / rel, 0, 1)
    return out * e / (len(notes) * 3)


# ---------------------------------------------------------------- picture times
music, drums, fx = Bus(), Bus(), Bus()
SIG = [60, 65, 64, 69]  # C4 F4 E4 A4: the signature, middle register
TAP, CALL, CLOSE = at('sfx-tap', DT['tapAd']), at('sfx-call', DT['tapNum']), at('sfx-close', DT['press7'])
SEAL, REL = at('sfx-seal', DT['seal']), at('sfx-release', DT['release'])
CH = {'Fmaj9': [53, 57, 60, 64, 67], 'Dm9': [50, 53, 57, 60, 64], 'Bbmaj9': [58, 62, 65, 69, 72], 'Gm9': [55, 58, 62, 65, 69],
      'C7sus': [48, 55, 58, 60, 65], 'Am7': [57, 60, 64, 67], 'C69': [60, 64, 67, 69, 74], 'Bbmaj7': [58, 62, 65, 69]}
ROOT = {'Fmaj9': 41, 'Dm9': 38, 'Bbmaj9': 46, 'Gm9': 43, 'C7sus': 36, 'Am7': 45, 'C69': 48, 'Bbmaj7': 46}

# ================================================================ 1 · hook: warm, open (F major 9)
music.add(chord(felt, [41, 53, 57, 60, 64, 67], 3.2, vel=0.55), 0.02, 0.26)
music.add(pad(CH['Fmaj9'], DT['scrub'] + 0.4, att=0.05, rel=0.5, bright=1.0), 0.0, 0.4, pan=-0.1)
music.add(bass(midi(41), 2.6, 0.7), 0.02, 0.26)
for k, n in enumerate(SIG[:2]):  # the signature, sketched on two notes as the cards settle
    music.add(felt(midi(n + 12), 2.4, 0.5), DT['cards'] + 0.55 + k * 0.32, 0.16, pan=0.15 + 0.1 * k)

# ================================================================ 2 · rewind (inside the music, not an effect)
RW, RWD = DT['scrub'], DT['scrubDur']
LAND = RW + RWD
rev = chord(felt, CH['Bbmaj9'], RWD + 0.15, vel=0.6)[::-1]  # a felt chord played backwards, swelling into the landing
music.add(rev, LAND - len(rev) / SR + 0.02, 0.24, pan=0.1)
music.add(glidepad([53, 57, 60, 64], RWD + 0.5, -1, 0.0, RWD, att=0.15, rel=0.45, bright=0.9), RW - 0.05, 0.32, pan=-0.1)
# "dimanche soir": D minor 9, warm and intimate
music.add(pad(CH['Dm9'], DT['morph'] - LAND + 0.8, att=0.25, rel=0.7, bright=0.9), LAND, 0.4, pan=-0.05)
music.add(chord(epiano, CH['Dm9'], 2.4, vel=0.55), LAND + 0.02, 0.26)
music.add(bass(midi(38), 2.0, 0.7), LAND + 0.02, 0.26)
for t0, n in [(LAND + 0.45, 69), (LAND + 0.85, 72)]:
    music.add(felt(midi(n), 2.0, 0.5), t0, 0.14, pan=0.2)

# ================================================================ 3 · Sunday 21 h 14: posed, warm groove without drums
G0 = DT['morph']
PROG = [(G0, 'Bbmaj9'), (G0 + 2 * BEAT, 'Gm9'), (G0 + 4 * BEAT, 'C7sus'), (DT['open'], 'Fmaj9'),
        (DT['open'] + 2 * BEAT, 'Am7'), (DT['squeeze'], 'Bbmaj9'), (DT['land'], 'Fmaj9'), (DT['land'] + 4 * BEAT, 'Dm9'),
        (DT['pan1'], 'Bbmaj7'), (DT['mon'], 'Gm9'), (DT['tapNum'], 'C7sus'), (DT['sept'], 'Dm9'), (DT['six'], 'Gm9'),
        (DT['reply'], 'C7sus'), (DT['thu'], 'Fmaj9'), (DT['fly'] + 0.5, 'Bbmaj9'), (DT['close'], 'C7sus'), (CLOSE, 'Fmaj9'),
        (DT['back'] + 1.2, 'Bbmaj9'), (DT['whip8'], 'Gm9'), (DT['seal'], 'C69'), (DT['pill'], 'Fmaj9')]


def chord_at(t):
    c = PROG[0][1]
    for a, name in PROG:
        if t >= a:
            c = name
    return c


def swung(b0, b1, step):
    k, out = 0, []
    while b0 + k * step < b1 - 1e-6:
        out.append((b0 + k * step + (step * (2 * SWING - 1) if k % 2 else 0), k))
        k += 1
    return out


def comp(b0, b1, vel=0.6, gain=0.24):
    for b in np.arange(b0, b1 - 1e-6, 2 * BEAT):
        c = CH[chord_at(b + 0.01)]
        music.add(chord(epiano, c, 1.5, vel=vel), b, gain, pan=-0.15)
        music.add(chord(epiano, c[1:], 0.6, vel=vel * 0.75), b + 1.5 * BEAT * (1 + (SWING - 0.5)), gain * 0.6, pan=0.2)


def walk(b0, b1, gain=0.3):
    for b in np.arange(b0, b1 - 1e-6, BEAT / 2):
        step = int(round((b - b0) / (BEAT / 2))) % 8
        if step in (0, 3, 4, 6):
            c = chord_at(b + 0.01)
            n = ROOT[c] + 12 + {0: 0, 3: 7, 4: 12, 6: 7}[step]
            music.add(bass(midi(n), 0.34, 0.9), b + (BEAT / 2 * (SWING - 0.5) * 2 if step % 2 else 0), gain)


def drumsat(b0, b1, kickv=0.0, rimv=0.0, shk=0.0):
    for b in np.arange(b0, b1 - 1e-6, BEAT):
        k = int(round((b - b0) / BEAT)) % 4
        if kickv and k == 0:
            drums.add(kick(0.6), b, 0.8 * kickv)
        if kickv and k == 2:
            drums.add(kick(0.45), b + BEAT * 0.5 * (SWING - 0.5) * 2, 0.5 * kickv)
        if rimv and k in (1, 3):
            drums.add(rim(1.0), b, 0.2 * rimv, pan=0.1)
    if shk:
        for t, k in swung(b0, b1, BEAT / 2):
            drums.add(shaker(), t, (0.05 if k % 2 == 0 else 0.032) * shk, pan=0.35)


comp(G0, DT['squeeze'], vel=0.55, gain=0.22)
walk(G0 + 2 * BEAT, DT['squeeze'], gain=0.26)
music.add(pad(CH['Fmaj9'], DT['squeeze'] - DT['open'] + 0.6, att=0.6, rel=0.5, bright=1.0), DT['open'], 0.2, pan=0.2)
# SFX 1: the tap on the ad
fx.add(feltclick(1.0), TAP, 0.12)

# ================================================================ 4 · within the minute
comp(DT['squeeze'], DT['pan1'], vel=0.6, gain=0.24)
walk(DT['squeeze'], DT['pan1'], gain=0.28)
drumsat(DT['squeeze'], DT['pan1'], rimv=0.7, shk=0.7)
music.add(pad([58, 62, 65, 69], DT['land'] - DT['squeeze'], att=0.5, rel=0.15, bright=1.1), DT['squeeze'], 0.2)
music.add(felt(midi(72), 2.4, 0.55), DT['land'] + 0.02, 0.16, pan=0.2)

# ================================================================ 5 · dinner (breath), then Monday
music.add(pad(CH['Bbmaj7'], DT['mon'] - DT['pan1'] + 0.8, att=0.4, rel=0.8, bright=0.85), DT['pan1'], 0.42)
music.add(felt(midi(46), 3.0, 0.6), DT['pan1'] + 0.1, 0.2)
comp(DT['mon'], DT['sept'], vel=0.6, gain=0.24)
walk(DT['mon'], DT['sept'], gain=0.3)
drumsat(DT['mon'], DT['sept'], rimv=0.8, shk=0.8)
fx.add(feltclick(0.8), CALL, 0.18)  # SFX 2: Julie taps Sophie's number

# ================================================================ 6 · Marc, then 7 · Thursday (steady rise to the climax)
comp(DT['sept'], CLOSE, vel=0.65, gain=0.25)
walk(DT['sept'], CLOSE, gain=0.32)
drumsat(DT['sept'], DT['thu'], kickv=0.7, rimv=0.9, shk=0.9)
drumsat(DT['thu'], CLOSE - 0.05, kickv=1.0, rimv=1.0, shk=1.0)
music.add(pad([55, 62, 65, 70], CLOSE - DT['thu'], att=1.6, rel=0.2, bright=1.2), DT['thu'], 0.24)
fx.add(feltthud(0.32, 1.0), CLOSE, 0.36)  # SFX 3: the agenda closes
for k, n in enumerate(SIG):  # the signature, once, felt piano, middle register, inside the music
    music.add(felt(midi(n), 2.4, 0.75), CLOSE + 0.04 + k * 0.17, 0.3, pan=-0.15 + 0.1 * k)
music.add(pad([60, 64, 69, 72], DT['whip8'] - CLOSE + 0.6, att=0.25, rel=0.5, bright=1.2), CLOSE, 0.3, pan=0.2)
comp(CLOSE, DT['whip8'], vel=0.7, gain=0.26)
walk(CLOSE, DT['whip8'], gain=0.32)
drumsat(CLOSE, DT['whip8'], kickv=1.0, rimv=1.0, shk=1.0)

# ================================================================ 8 · risk (no kick, posed chords), 9 · end (F major)
comp(DT['whip8'], DT['pill'], vel=0.6, gain=0.24)
walk(DT['whip8'], DT['pill'], gain=0.28)
drumsat(DT['whip8'], DT['pill'], rimv=0.6, shk=0.6)
fx.add(feltthud(0.22, 1.0, fc=1200, f0=140), SEAL, 0.19)  # SFX 4: the seal
music.add(chord(epiano, [41, 53, 57, 60, 64, 67], 3.2, vel=0.7), DT['pill'] + 0.05, 0.3)
music.add(pad([53, 60, 64, 69, 72], max(0.5, END - DT['pill'] + 1), att=0.6, rel=1.2, bright=1.2), DT['pill'] + 0.2, 0.3)
music.add(bass(midi(41), 2.8, 0.8), DT['pill'] + 0.05, 0.3)
for k, n in enumerate(SIG):  # the signature resolves, slower
    music.add(felt(midi(n + 12), 2.6, 0.55), DT['logo'] + 0.05 + k * 0.22, 0.2, pan=-0.15 + 0.1 * k)
fx.add(breath(0.7, 300, 1500, 'swell', 1.0), REL - 0.1, 0.36)  # SFX 5: the button is released

# ================================================================ MIX
mus, dr, fxs = music.x, drums.x, fx.x
ir_n = int(2.0 * SR)  # one shared room
irt = np.arange(ir_n) / SR
ir = np.stack([lp(rng.standard_normal(ir_n), 4800) * np.exp(-irt / 0.4) for _ in range(2)])
ir[:, :int(0.016 * SR)] = 0
ir /= np.sqrt((ir ** 2).sum(axis=1, keepdims=True))
send = mus * 0.3 + fxs * 0.25 + dr * 0.06
wet = np.stack([fftconvolve(send[c], ir[c])[:N] for c in range(2)]) * 0.5
bed = hp(mus + dr * 0.8 + wet, 30)
sfx = hp(fxs, 30)
end = int(END * SR)
fade = np.ones(end)
f0 = int((END - 0.9) * SR)
fade[f0:] = np.linspace(1, 0, end - f0) ** 1.5
fade[:int(0.004 * SR)] = np.linspace(0, 1, int(0.004 * SR))
bed, sfx = bed[:, :end] * fade, sfx[:, :end] * fade
mix = bed + sfx
norm = np.max(np.abs(mix)) + 1e-9
g = 0.9 / norm
mix = np.tanh(mix * g * 1.1 / 0.9) / np.tanh(1.1) * 0.9


# the rule: each effect 8 to 12 dB under the music around it (RMS over the effect's span), never less than 6
def rms_db(x, a, b):
    seg = x[:, int(a * SR):int(b * SR)]
    return 10 * np.log10(np.mean(seg ** 2) + 1e-12)


print('effects vs music (RMS dB over each effect):')
worst = -99
for name, a, b in [('tap', TAP, TAP + 0.1), ('call', CALL, CALL + 0.1), ('close', CLOSE, CLOSE + 0.2), ('seal', SEAL, SEAL + 0.15),
                   ('release', REL - 0.1, REL + 0.6)]:
    if b > END:
        continue
    d = rms_db(sfx, a, b) - rms_db(bed, a, b)
    worst = max(worst, d)
    print(f'  {name:8s} {a:6.2f}–{b:5.2f} s   effect − music = {d:+.1f} dB')
print('OK: every effect ≥ 6 dB under the music' if worst <= -6 else f'FAIL: an effect is only {-worst:.1f} dB under the music')


def write(path, x):
    pcm = (np.clip(x.T, -1, 1) * 32767).astype('<i2')
    with wave.open(path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


write(OUT, mix)
if STEMS:  # linear stems for the voiceover mix (audio/mix_vo.py)
    os.makedirs(STEMS, exist_ok=True)
    write(os.path.join(STEMS, 'bed.wav'), bed * g)
    write(os.path.join(STEMS, 'sfx.wav'), sfx * g)
print('wrote', OUT, f'{END:.2f}s')
