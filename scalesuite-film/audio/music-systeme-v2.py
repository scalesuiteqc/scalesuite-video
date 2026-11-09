"""« Le Système Vendeurs 5 minutes » V2 (« la destination ») soundtrack, synthesised on the picture's timing
(render/cues-systeme-v2.mjs). Copied from audio/music-systeme.py (V1, untouched): same instruments, signature
(C F E A) and effect settings.

Effects (3, soft, at least 6 dB under the music, no bell, no "ding"):
   3.4 s   the name reveal       opening breath, rising, low-passed (`breath`, 'rise')
   8.9 s   the seller's text     muffled double vibration (`mutedbuzz`)
  29.9 s   the button is born    soft breath that opens (`breath`, 'swell')
Score: the destination opens warm and calm (F major, felt piano), the signature is played on the four words of the
name, « Tout commence samedi » goes back to a quieter memory colour (D minor), then the soft groove carries the story
and lifts on the reply, the appointment and the week; the four checks are four felt notes; proof and guarantee
without drums; resolution under the logo.

    python3 audio/music-systeme-v2.py --cues cues.json [--end 32.8] out.wav [--stems DIR]
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
OUT = next((a for a in ARGS if a.endswith('.wav')), 'music-systeme-v2.wav')
STEMS = ARGS[ARGS.index('--stems') + 1] if '--stems' in ARGS else None
N = int(SR * (END + 3))
rng = np.random.default_rng(40)
ST = CUES['ST']
BEAT, SWING = 0.47, 0.58  # the lead-perdu groove, +6 % tempo


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
REVEAL = at('sfx-reveal', ST['nouveau'])
TEXTO, CTA = at('sfx-texto', ST['texto']), at('sfx-cta', ST['cta'])
WORDS = [ST['w1'], ST['w2'], ST['w3'], ST['w4']]
SIG = [60, 65, 64, 69]
CH = {'Fmaj9': [53, 57, 60, 64, 67], 'Am7': [57, 60, 64, 67], 'Bbmaj9': [58, 62, 65, 69, 72], 'C69': [60, 64, 67, 69, 74],
      'Dm9': [50, 53, 57, 60, 64], 'Gm9': [55, 58, 62, 65, 69], 'C7sus': [48, 55, 58, 60, 65]}
ROOT = {'Fmaj9': 41, 'Am7': 45, 'Bbmaj9': 46, 'C69': 48, 'Dm9': 38, 'Gm9': 43, 'C7sus': 36}

# ================================================================ 1 · the destination (warm, calm)
music.add(pad([53, 60, 64, 69], REVEAL + 0.6, att=0.05, rel=0.6, bright=1.0), 0.0, 0.42, pan=-0.1)
music.add(chord(felt, [53, 60, 64, 69], 2.6, vel=0.6), 0.02, 0.22, pan=0.1)
music.add(bass(midi(41), 2.4, 0.7), 0.02, 0.28)
for t0, n in [(0.9, 72), (1.6, 69), (2.3, 67)]:
    music.add(felt(midi(n), 2.0, 0.5), t0, 0.14, pan=0.2)
# ================================================================ 2 · the name: opening breath, the signature on the four words
fx.add(breath(0.5, 250, 1800, 'rise', 1.0), REVEAL - 0.45, 0.3)
music.add(pad([53, 60, 64, 69, 72], ST['revealOut'] - REVEAL + 0.6, att=0.25, rel=0.6, bright=1.15), REVEAL, 0.42, pan=-0.1)
music.add(chord(epiano, [53, 57, 60, 64, 67], 3.0, vel=0.6), REVEAL + 0.05, 0.28)
music.add(bass(midi(41), 3.0, 0.8), REVEAL + 0.05, 0.3)
for k, (t0, n) in enumerate(zip(WORDS, SIG)):
    music.add(felt(midi(n), 2.8, 0.85), t0, 0.36, pan=-0.15 + 0.1 * k)
    music.add(felt(midi(n - 12), 2.8, 0.5), t0, 0.14, pan=0.1)
music.add(chord(epiano, [41, 53, 57, 60, 64, 69], 2.4, vel=0.55), ST['pour'], 0.22)
# ================================================================ 3 · « Tout commence samedi » (memory colour)
music.add(pad([50, 57, 60, 65], ST['toPhone'] - ST['clock'] + 0.4, att=0.3, rel=0.4, bright=0.9), ST['clock'], 0.36, pan=0.1)
music.add(bass(midi(38), 1.6, 0.7), ST['clock'], 0.26)
music.add(felt(midi(62), 1.8, 0.6), ST['swap'], 0.16, pan=-0.2)
# ================================================================ 4–6 · the story: soft groove (+6 %), lifts on the reply, the appointment, the week
G0, G1 = ST['toPhone'], ST['pile']
CYC = ['Fmaj9', 'Am7', 'Bbmaj9', 'C69']
PROG = [(G0 + i * 4 * BEAT, CYC[i % 4]) for i in range(int((G1 - G0) / (4 * BEAT)) + 1)]
PROG += [(ST['rdv'], 'Bbmaj9'), (ST['week'], 'Fmaj9'), (G1, 'C69'), (ST['proof'], 'Dm9'), (ST['risk'], 'Bbmaj9'), (ST['rare'], 'Gm9'),
         (ST['riskOut'], 'C7sus'), (ST['th'], 'Bbmaj9'), (ST['merge'], 'C69'), (ST['endLogo'], 'Fmaj9')]
PROG.sort()


def chord_at(t):
    c = PROG[0][1]
    for a_, name in PROG:
        if t >= a_:
            c = name
    return c


def swung(b0, b1, step):
    k, out = 0, []
    while b0 + k * step < b1 - 1e-6:
        out.append((b0 + k * step + (step * (2 * SWING - 1) if k % 2 else 0), k))
        k += 1
    return out


def groove(b0, b1, lift=1.0, kit=True):
    if kit:
        for b in np.arange(b0, b1 - 1e-6, BEAT):
            k = int(round((b - b0) / BEAT)) % 4
            if k == 0:
                drums.add(kick(0.55 * lift), b, 0.75)
            if k in (1, 3):
                drums.add(rim(1.0), b, 0.17 * lift, pan=0.1)
        for t, k in swung(b0, b1, BEAT / 4):
            drums.add(shaker(), t, (0.042 if k % 2 == 0 else 0.028) * lift, pan=0.35)
    for b in np.arange(b0, b1 - 1e-6, BEAT / 2):
        c = chord_at(b)
        step = int(round((b - b0) / (BEAT / 2))) % 8
        if step in (0, 3, 4, 6):
            n = ROOT[c] + 12 + {0: 0, 3: 7, 4: 12, 6: 7}[step]
            music.add(bass(midi(n), 0.3, 0.9), b + (BEAT / 2 * (SWING - 0.5) * 2 if step % 2 else 0), 0.3)
    for b in np.arange(b0, b1 - 1e-6, 4 * BEAT):
        c = CH[chord_at(b)]
        music.add(chord(epiano, c, 1.4, vel=0.68), b, 0.25, pan=-0.15)
        music.add(chord(epiano, c[1:], 0.6, vel=0.5), b + 2.5 * BEAT + BEAT / 2 * (SWING - 0.5) * 2, 0.15, pan=0.2)


SEG = [G0, ST['toTeam'], ST['toWeek'], G1]
for i in range(3):
    groove(SEG[i], SEG[i + 1], lift=0.82 + 0.1 * i)
music.add(pad([58, 62, 65, 69], G1 - G0 + 0.6, att=1.2, rel=0.8), G0, 0.14, pan=0.2)
# the text: a muffled double vibration; the build and the answer are music
fx.add(mutedbuzz(0.22, 1.0), TEXTO + 0.08, 0.13)
fx.add(mutedbuzz(0.22, 1.0), TEXTO + 0.38, 0.1)
music.add(pad([55, 62, 65, 70], TEXTO - ST['tick13'] + 0.1, att=0.3, rel=0.1, bright=1.2), ST['tick13'], 0.22)
music.add(pad([60, 64, 69, 72], 2.0, att=0.12, rel=0.8, bright=1.2), TEXTO, 0.3, pan=0.2)
for k, n in enumerate(SIG):
    music.add(felt(midi(n + 12), 2.0, 0.5), TEXTO + 0.05 + k * 0.17, 0.15, pan=-0.15 + 0.1 * k)
# the seller answers: two warm felt notes (music, not an effect)
music.add(felt(midi(72), 1.8, 0.6), ST['reply'], 0.16, pan=0.25)
music.add(felt(midi(76), 1.8, 0.6), ST['reply'] + 0.14, 0.14, pan=0.3)
# the appointment is booked, then the week fills: the music opens
music.add(pad([58, 62, 65, 69, 72], 1.6, att=0.1, rel=0.8, bright=1.2), ST['rdv'], 0.3, pan=-0.2)
music.add(chord(epiano, CH['Bbmaj9'], 1.4, vel=0.7), ST['rdv'], 0.2)
music.add(pad([53, 60, 64, 69, 72], G1 - ST['week'] + 0.4, att=0.3, rel=0.5, bright=1.25), ST['week'], 0.3, pan=0.15)
for i in range(4):
    music.add(felt(midi([65, 69, 72, 77][i]), 1.4, 0.5), ST['week'] + [0, 0.16, 0.28, 0.36][i], 0.1, pan=-0.2 + 0.12 * i)
# ================================================================ 7 · « On s'occupe de tout. »: four checks, four felt notes
groove(G1, ST['proof'], lift=1.05)
for i in range(4):
    music.add(felt(midi([60, 64, 65, 69][i]), 1.6, 0.6), ST['check0'] + i * 0.18, 0.1, pan=-0.2 + 0.12 * i)
# ================================================================ 8–9 · proof, guarantee: no drums, assured
groove(ST['proof'], ST['th'], lift=0.8, kit=False)
music.add(pad([50, 57, 60, 65], ST['th'] - ST['proof'] + 0.6, att=0.6, rel=0.8, bright=1.0), ST['proof'], 0.26, pan=0.15)
for b in np.arange(ST['proof'], ST['th'] - 1e-6, 4 * BEAT):
    music.add(felt(midi(ROOT[chord_at(b)] + 24), 1.6, 0.45), b + 0.02, 0.12, pan=-0.25)
# ================================================================ 10 · end: resolution on F major
groove(ST['th'], ST['endLogo'], lift=0.7, kit=False)
music.add(pad([50, 57, 62, 65], ST['merge'] - ST['th'] + 0.4, att=0.5, rel=0.6), ST['th'], 0.24)
music.add(chord(epiano, CH['C69'], 1.6, vel=0.6), ST['merge'], 0.26)
for k, n in enumerate(SIG):
    music.add(felt(midi(n), 2.6, 0.55), ST['endLogo'] + 0.05 + k * 0.22, 0.2, pan=-0.15 + 0.1 * k)
music.add(chord(epiano, [41, 53, 57, 60, 64, 67], 3.2, vel=0.7), ST['endLogo'] + 0.9, 0.3)
music.add(pad([53, 60, 64, 69, 72], END - ST['endLogo'] + 1, att=0.6, rel=1.2, bright=1.2), ST['endLogo'] + 0.5, 0.3)
music.add(bass(midi(41), 3.0, 0.8), ST['endLogo'] + 0.9, 0.3)
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


def rms_db(x, a, b):
    seg = x[:, int(a * SR):int(b * SR)]
    return 10 * np.log10(np.mean(seg ** 2) + 1e-12)


print('effects vs music (RMS dB over each effect):')
ok = True
for name, a, b, need in [('reveal', REVEAL - 0.45, REVEAL + 0.05, 6), ('texto', TEXTO + 0.08, TEXTO + 0.6, 6), ('cta', CTA - 0.1, CTA + 0.6, 6)]:
    d = rms_db(sfx, a, b) - rms_db(bed, a, b)
    ok = ok and d <= -need
    print(f'  {name:7s} {a:6.2f}–{b:5.2f} s   effect − music = {d:+.1f} dB   (need ≤ −{need})')
print('OK: every effect under its limit' if ok else 'FAIL: an effect is too loud')


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
