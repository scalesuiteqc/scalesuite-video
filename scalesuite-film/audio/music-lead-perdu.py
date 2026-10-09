"""« Le lead perdu » soundtrack: synthesised on the picture's timing (render/cues-lead-perdu.mjs).

Sound rule (skill scalesuite-video, section 10): 4 to 6 sound effects in the whole film, soft and
muffled only (light click, discreet breath), no bell or bright "ding", at least 6 dB under the
music and under the voice. No effect for each element that appears: the motion is enough.
This film has exactly 4 effects, on the `sfx-*` cues:
  10.8 s  rewind / bascule    reversed breath, low-passed
  16.55 s tap on Courtier 03's ad   felt click
  19.4 s  ScaleSuite notification   muffled double vibration (no chime)
  22.2 s  the button is born        soft breath that opens
Score (all on the music bus, no per-element sounds):
- Problem (0–10.8): cool and sparse, D minor. Felt piano, low pad, a soft clock pulse inside the
  music that slows down as time passes; on "Trop tard." it thins to one held low note.
- Bascule: the held note is breathed in, then the score opens in F major on the mint bloom.
- ScaleSuite (12.95–21.0): the V3 neo-soul groove, softer (no claps, no pings). At the notification
  the 4-note signature (C F E A) is played once, felt piano, middle register, inside the music.
- End: resolution on F major under the logo.

    python3 audio/music-lead-perdu.py --cues cues.json [--end 25.2] out.wav [--stems DIR]
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
OUT = next((a for a in ARGS if a.endswith('.wav')), 'music-lead-perdu.wav')
STEMS = ARGS[ARGS.index('--stems') + 1] if '--stems' in ARGS else None
N = int(SR * (END + 3))
rng = np.random.default_rng(25)
LT = CUES['LT']
BEAT, SWING = 0.5, 0.58


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


# ---------------------------------------------------------------- picture times
music, drums, fx = Bus(), Bus(), Bus()
REW, BLOOM, DOCK = at('sfx-rewind', LT['rewind']), LT['bloom'], LT['dock']
TAP, NOTIF, CTA = at('sfx-tap', LT['tapAd']), at('sfx-notif', LT['notif']), at('sfx-cta', LT['cta'])
LATE, GRAY = LT['late'], LT['gray']
SIG = [60, 65, 64, 69]  # C4 F4 E4 A4: the signature, middle register

# ================================================================ ACT 1–2 · problem (D minor, cool, sparse)
PROB = [(0.0, [50, 57, 60, 64], 38), (3.0, [50, 53, 57, 64], 38), (5.6, [46, 53, 57, 62], 34), (7.05, [43, 50, 53, 58], 31)]
for k, (t0, notes, root) in enumerate(PROB):
    t1 = PROB[k + 1][0] if k + 1 < len(PROB) else GRAY
    music.add(pad(notes, t1 - t0 + 1.2, att=0.5 if k else 0.05, rel=1.0, bright=0.8), t0, 0.5, pan=-0.15)
    music.add(bass(midi(root), min(2.4, t1 - t0 + 0.2), 0.7), t0, 0.32)
    music.add(chord(felt, notes, 2.6, vel=0.6), t0 + 0.02, 0.22, pan=0.1)
# hook: a two-note question on "Qui le prend?" (the signature's first interval, minor, unresolved)
music.add(felt(midi(69), 1.6, 0.7), LT['ask'], 0.2, pan=0.2)
music.add(felt(midi(74), 2.2, 0.7), LT['ask'] + 0.3, 0.18, pan=0.25)
# the clock inside the music: steady 8ths in the inbox, slowing as the evening becomes the next day
t, step = 3.0, 0.5
while t < GRAY:
    u = (t - 3.0) / (GRAY - 3.0)
    drums.add(softtick(1.0), t, 0.16 * (1 - 0.4 * u), pan=0.3)
    t += step
    step = 0.5 + 0.35 * u
# sparse felt-piano line over the passing time (low, descending)
for t0, n in [(4.1, 62), (5.0, 60), (6.0, 58), (6.6, 57), (7.4, 55), (8.0, 53)]:
    music.add(felt(midi(n), 2.0, 0.55), t0, 0.16, pan=-0.2)
# "Trop tard.": everything thins to one held low note
music.add(pad([38, 45], REW - GRAY + 0.3, att=0.6, rel=0.25, bright=0.6), GRAY, 0.55)
music.add(felt(midi(38), 3.0, 0.8), LATE, 0.25)

# ================================================================ BASCULE → ScaleSuite (F major)
# SFX 1: reversed breath on the rewind (the held note is breathed in)
fx.add(breath(BLOOM - REW + 0.05, 250, 1800, 'rise', 1.0), REW, 0.34)  # a breath played backwards: swells up, cut at the bloom
music.add(pad([53, 60, 64, 69], DOCK - BLOOM + 1.2, att=0.5, rel=1.0, bright=1.1), BLOOM, 0.45, pan=-0.1)
music.add(chord(epiano, [53, 57, 60, 64, 67], 2.6, vel=0.6), BLOOM + 0.05, 0.3)
music.add(bass(midi(41), 2.4, 0.8), BLOOM + 0.05, 0.3)
music.add(felt(midi(72), 2.4, 0.6), LT['avec'] + 0.2, 0.14, pan=0.25)

# ================================================================ GROOVE (campaigns → CRM → phone)
CH = {'Fmaj9': [53, 57, 60, 64, 67], 'Am7': [57, 60, 64, 67], 'Bbmaj9': [58, 62, 65, 69, 72], 'C69': [60, 64, 67, 69, 74],
      'Dm9': [50, 53, 57, 60, 64], 'Gm9': [55, 58, 62, 65, 69], 'C7sus': [48, 55, 58, 60, 65]}
ROOT = {'Fmaj9': 41, 'Am7': 45, 'Bbmaj9': 46, 'C69': 48, 'Dm9': 38, 'Gm9': 43, 'C7sus': 36}
G0 = DOCK
PROG = [(G0, 'Fmaj9'), (G0 + 2, 'Am7'), (G0 + 4, 'Bbmaj9'), (LT['travel'], 'Gm9'), (LT['land'] + 0.4, 'C7sus'),
        (NOTIF, 'Fmaj9'), (NOTIF + 1.0, 'Bbmaj9'), (LT['line'], 'C69'), (LT['endMark'], 'Fmaj9')]


def chord_at(t):
    c = PROG[0][1]
    for a, name in PROG:
        if t >= a:
            c = name
    return c


def swung(b0, b1, step=0.125):
    k, out = 0, []
    while b0 + k * step < b1 - 1e-6:
        out.append((b0 + k * step + (step * (2 * SWING - 1) if k % 2 else 0), k))
        k += 1
    return out


def groove(b0, b1, lift=1.0):
    for b in np.arange(b0, b1 - 1e-6, BEAT):
        k = int(round((b - b0) / BEAT)) % 4
        if k == 0:
            drums.add(kick(0.6 * lift), b, 0.8)
        if k in (1, 3):
            drums.add(rim(1.0), b, 0.2 * lift, pan=0.1)
        if k == 1:
            drums.add(kick(0.45 * lift), b + 0.25 + BEAT * (SWING - 0.5), 0.5)
    for t, k in swung(b0, b1):
        drums.add(shaker(), t, (0.05 if k % 2 == 0 else 0.032) * lift, pan=0.35)
    for b in np.arange(b0, b1 - 1e-6, 0.25):
        c = chord_at(b)
        step = int(round((b - b0) / 0.25)) % 8
        if step in (0, 3, 4, 6):
            n = ROOT[c] + 12 + {0: 0, 3: 7, 4: 12, 6: 7}[step]
            music.add(bass(midi(n), 0.3, 0.9), b + (0.25 * (SWING - 0.5) * 2 if step % 2 else 0), 0.32)
    for b in np.arange(b0, b1 - 1e-6, 2.0):
        c = CH[chord_at(b)]
        music.add(chord(epiano, c, 1.4, vel=0.7), b, 0.26, pan=-0.15)
        music.add(chord(epiano, c[1:], 0.6, vel=0.5), b + 1.25 + 0.25 * (SWING - 0.5) * 2, 0.16, pan=0.2)


groove(G0, LT['whip'])
music.add(pad([58, 62, 65, 69], LT['whip'] - G0 + 0.8, att=1.2, rel=0.8), G0, 0.18, pan=0.2)
# SFX 2: the tap on Courtier 03's ad
fx.add(feltclick(1.0), TAP, 0.22)
# the build to the phone: a soft rising pad (music), no riser effect
music.add(pad([55, 62, 65, 70], NOTIF - LT['travel'], att=1.6, rel=0.2, bright=1.2), LT['travel'], 0.22)
# SFX 3: the ScaleSuite notification = a muffled double vibration
fx.add(mutedbuzz(0.22, 1.0), NOTIF + 0.08, 0.3)
fx.add(mutedbuzz(0.22, 1.0), NOTIF + 0.38, 0.24)
# the signature, once, felt piano, middle register, inside the music
for k, n in enumerate(SIG):
    music.add(felt(midi(n), 2.4, 0.75), NOTIF + 0.05 + k * 0.17, 0.3, pan=-0.15 + 0.1 * k)
groove(NOTIF, LT['line'], lift=1.15)
music.add(pad([60, 64, 69, 72], LT['line'] - NOTIF + 0.6, att=0.25, rel=0.5, bright=1.2), NOTIF, 0.3, pan=0.2)

# ================================================================ END (resolution on F major)
for b in np.arange(LT['line'], LT['endMark'] - 0.2, BEAT):
    music.add(bass(midi(ROOT[chord_at(b)] + 12), 0.3, 0.7), b, 0.26)
music.add(chord(epiano, CH['C69'], 1.6, vel=0.6), LT['line'], 0.26)
for k, n in enumerate(SIG):  # the signature resolves, slower
    music.add(felt(midi(n + 12), 2.6, 0.55), LT['endMark'] + 0.05 + k * 0.22, 0.2, pan=-0.15 + 0.1 * k)
music.add(chord(epiano, [41, 53, 57, 60, 64, 67], 3.2, vel=0.7), LT['endMark'] + 0.9, 0.3)
music.add(pad([53, 60, 64, 69, 72], END - LT['endMark'] + 1, att=0.6, rel=1.2, bright=1.2), LT['endMark'] + 0.5, 0.3)
music.add(bass(midi(41), 2.8, 0.8), LT['endMark'] + 0.9, 0.3)
# SFX 4: the button is born, a soft breath that opens
fx.add(breath(0.7, 300, 1500, 'swell', 1.0), CTA - 0.1, 0.36)

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


# the rule: each effect at least 6 dB under the music around it (RMS over the effect's span)
def rms_db(x, a, b):
    seg = x[:, int(a * SR):int(b * SR)]
    return 10 * np.log10(np.mean(seg ** 2) + 1e-12)


print('effects vs music (RMS dB over each effect):')
worst = -99
for name, a, b in [('rewind', REW, BLOOM + 0.05), ('tap', TAP, TAP + 0.1), ('notif', NOTIF + 0.08, NOTIF + 0.6), ('cta', CTA - 0.1, CTA + 0.6)]:
    d = rms_db(sfx, a, b) - rms_db(bed, a, b)
    worst = max(worst, d)
    print(f'  {name:7s} {a:6.2f}–{b:5.2f} s   effect − music = {d:+.1f} dB')
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
