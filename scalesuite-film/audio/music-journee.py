"""« Une journée de courtier » soundtrack (plan v2): the V3 music, re-timed to this film (no new score).

Same instruments, same 4-note signature (C5 F5 E5 A5), same swung neo-soul groove, same chords and
the same drop as audio/music-v3.py. The instruments and the signature are loaded from music-v3.py
itself (read-only, its first part only), so both films share one sound. Only the arrangement follows this film's cues:
- moment cards (10 h, 13 h, 17 h): no drums; a pad, a node ping, the bloom, two kalimba notes of the
  signature as the icon draws (the whole signature on the first card, as the film opens).
- proofs: the V3 groove (rim, shaker, round bass, e-piano), typing, docks, taps.
- 13 h: the groove fills up on the form, rim roll + FM glide + riser into an 80 ms freeze, then
  THE DROP on the lead notification (the signature on bell and kalimba), full groove to the CRM.
- 17 h: the groove steps down for the report; the summary keeps e-piano and bass only, with a
  breath before « Pas ouvert de la journée » and a suspended chord on it.
- end: the signature resolves on F major under the logo (as in the V3).

    python3 audio/music-journee.py --cues cues.json [--end 25] out.wav [--stems DIR]
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
_src = open(os.path.join(HERE, 'music-v3.py'), encoding='utf-8').read()
_cut = _src.index('# ---------------------------------------------------------------- cue times')
exec(compile(_src[:_cut], 'music-v3.py (instruments)', 'exec'))  # SR, CUES, END, OUT, STEMS, N, rng, BEAT, SWING, Bus, instruments, SIG, signature()

if OUT == 'music-v3.wav':
    OUT = 'music-journee.wav'
CARD = cue('card')                    # 0: 10 h, 1: 13 h, 2: 17 h
SLIDE = [c['t'] for c in cue('slide')]
c10, c13, c17 = (CARD[i]['t'] if len(CARD) > i else None for i in range(3))
B13, B17 = (at('bloom', i) for i in range(2))
x10, x13, up4, x17 = (SLIDE + [None] * 4)[:4]
freeze, notify = at('freeze', 0, 9.97), at('notify', 0, 10.05)
merge, mark2, cta, zero = at('merge', 0, 21.3), at('mark2', 0, 21.5), at('cta', 0, 22.1), at('zero', 0, 19.3)
summary = at('check5', 0, 18.4)
music, fx, drums = Bus(), Bus(), Bus()

CH = {'Fmaj9': [53, 57, 60, 64, 67], 'Am7': [57, 60, 64, 67], 'Bbmaj9': [58, 62, 65, 69, 72], 'C69': [60, 64, 67, 69, 74],
      'Dm9': [50, 53, 57, 60, 64], 'Gm9': [55, 58, 62, 65, 69], 'C7sus': [48, 55, 58, 60, 65]}
ROOT = {'Fmaj9': 41, 'Am7': 45, 'Bbmaj9': 46, 'C69': 48, 'Dm9': 38, 'Gm9': 43, 'C7sus': 36}
PROG = [(0.0, 'Fmaj9'), (x10, 'Am7'), (x10 + 2.0, 'Bbmaj9'), (B13, 'C69'), (x13, 'Dm9'), (x13 + 1.0, 'Bbmaj9'),
        (up4 - 1.0, 'Gm9'), (up4, 'C7sus'), (notify, 'Fmaj9'), (notify + 1.0, 'Bbmaj9'), (notify + 2.0, 'Fmaj9'),
        (B17, 'Bbmaj9'), (x17, 'Am7'), (x17 + 1.0, 'Bbmaj9'), (summary, 'Dm9'), (zero, 'C7sus'), (mark2, 'Fmaj9')]


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


def groove(b0, b1, full=False, kick_v=0.7, bass_v=1.0):
    """the V3 groove, unchanged"""
    for b in np.arange(b0, b1 - 1e-6, BEAT):
        k = int(round((b - b0) / BEAT)) % 4
        if k == 0:
            drums.add(kick(kick_v), b, 0.95)
        if k in (1, 3):
            drums.add(clap(1.0) if full else rim(1.0), b, 0.3 if full else 0.32, pan=0.1)
        if k == 1:
            drums.add(kick(kick_v * 0.8), b + 0.25 + BEAT * (SWING - 0.5), 0.6)
        if full and k == 2:
            drums.add(kick(kick_v), b, 0.7)
    for t, k in swung(b0, b1):
        drums.add(shaker(), t, (0.07 if k % 2 == 0 else 0.045) * (1.3 if full else 1.0), pan=0.35)
    for b in np.arange(b0, b1 - 1e-6, 0.25):
        c = chord_at(b)
        step = int(round((b - b0) / 0.25)) % 8
        if step in (0, 3, 4, 6):
            n = ROOT[c] + 12 + {0: 0, 3: 7, 4: 12, 6: 7}[step]
            music.add(bass(midi(n), 0.3, 1.0), b + (0.25 * (SWING - 0.5) * 2 if step % 2 else 0), 0.36 * bass_v)
    for b in np.arange(b0, b1 - 1e-6, 2.0):
        c = CH[chord_at(b)]
        music.add(chord(epiano, c, 1.4, vel=0.8), b, 0.3, pan=-0.15)
        music.add(chord(epiano, c[1:], 0.6, vel=0.6), b + 1.25 + 0.25 * (SWING - 0.5) * 2, 0.2, pan=0.2)


def pad(t0, t1, name, vel=0.2):
    """a moment card: e-piano chord, soft choir, a long bass note (no drums)"""
    music.add(chord(epiano, CH[name], min(3.0, t1 - t0 + 0.6), vel=0.6), t0, vel)
    music.add(choir(CH[name][:4], t1 - t0 + 0.4, att=0.35, rel=0.4, bright=1.1), t0, vel * 0.6, pan=0.15)
    music.add(bass(midi(ROOT[name] + 12), min(2.6, t1 - t0), 0.6), t0 + 0.02, 0.2)


def odometer(t0, n=9, span=0.42, vel=0.05):
    for k in range(n):
        u = k / max(1, n - 1)
        fx.add(tick(0.8), t0 + span * (1 - (1 - u) ** 0.45), vel, pan=0.3 * np.sin(k))


# ================================================================ moment cards
pad(0.0, x10, 'Fmaj9')
signature(c10 + 0.1, fx, step=0.17, vel=0.26)  # the theme, once, as the film opens
pad(B13, x13, 'C69')
pad(B17, x17, 'Bbmaj9')
for i, c in enumerate(cue('node')):
    fx.add(ping(midi([84, 89][i % 2])), c['t'], 0.1)
for c in cue('bloom'):
    fx.add(whoosh(0.6, 200, 2400), c['t'], 0.12)
    fx.add(thump(0.5, 70, 0.4), c['t'] + 0.05, 0.18)
for c in CARD[1:]:  # two notes of the signature per later card, like the V3 words
    a, b = [(76, 81), (77, 84)][min(c['k'], 2) - 1]
    fx.add(kalimba(midi(a), 1.4), c['t'] + 0.05, 0.16)
    fx.add(kalimba(midi(b), 1.6), c['t'] + 0.17, 0.16)
for t0 in SLIDE:
    fx.add(whoosh(0.45, 2600, 450), t0, 0.12)

# ================================================================ UI sounds (as in the V3)
for c in cue('tap'):
    fx.add(key(1.4), c['t'], 0.3)
for c in cue('type'):
    n = max(1, c['n'])
    for k in range(n):
        tk = c['t'] + c['dur'] * (k + 0.5) / n
        fx.add(lp(key(), 3500) if k < c.get('del', 0) else key(), tk, 0.14, pan=float(rng.uniform(-0.3, 0.3)))
for c in cue('dock'):
    fx.add(marimba(midi(72)), c['t'] + 0.1, 0.16)
    fx.add(rim(0.6), c['t'] + 0.1, 0.08)
hl = at('halo', 0, 3.58)
fx.add(kalimba(midi(84), 1.6), hl, 0.16)
fx.add(kalimba(midi(89), 1.8), hl + 0.1, 0.14)
fx.add(thump(0.6, 80, 0.3), at('send', 0, 9.35) + 0.05, 0.25)

# ================================================================ 10 h, then the form: the V3 groove
groove(x10, B13 - 0.2)
groove(x13, up4 - 1.2)

# ================================================================ THE LEAD (as in the V3)
tok = up4 - 1.2
groove(tok, freeze, full=True, kick_v=0.8)
glen = freeze - tok
t = t_arr(glen)
gf = midi(60) * 2 ** (12 * (t / glen) ** 1.5 / 12)
ph = 2 * np.pi * np.cumsum(gf) / SR
fx.add(lp(np.sin(ph + 1.2 * np.sin(ph)), 3000) * (t / glen) ** 0.7 * 0.5, tok, 0.1)
tr = tok
while tr < freeze - 0.03:
    u = (tr - tok) / glen
    drums.add(rim(0.9), tr, 0.12 + 0.18 * u, pan=0.15)
    tr += 0.125 if u < 0.5 else 0.0625 if u < 0.85 else 0.03125
fx.add(whoosh(glen, 400, 8000, 'rise'), tok, 0.14)
fx.add(whoosh(0.55, 300, 2600), at('phone', 0, 9.42), 0.12)
# THE DROP: the notification sings the signature; full groove under it
signature(notify + 0.02, fx, step=0.12, inst='bell', vel=0.22, oct=1)
signature(notify + 0.02, fx, step=0.12, vel=0.3)
fx.add(thump(1.0, 50, 0.9), notify, 0.55)
fx.add(hp(rng.standard_normal(int(0.9 * SR)), 5000) * np.exp(-t_arr(0.9) / 0.25), notify, 0.08)
groove(notify, B17 - 0.2, full=True, kick_v=0.95)
music.add(choir([60, 64, 69, 72], B17 - notify, att=0.2, rel=0.5, bright=1.5), notify, 0.3, pan=0.25)
for c in cue('haptic'):
    fx.add(buzz(0.24), c['t'], 0.32)
    fx.add(buzz(0.24), c['t'] + 0.32, 0.26)
for c in cue('check'):
    fx.add(kalimba(midi(84), 1.4), c['t'], 0.12)
    fx.add(kalimba(midi(89), 1.6), c['t'] + 0.08, 0.12)
fx.add(whoosh(0.5, 2500, 500), at('crm', 0, 11.85), 0.12)
rw = at('row', 0, 12.22)
for k, n in enumerate([65, 69, 72, 77]):  # the new card docks: marimba up F major
    fx.add(marimba(midi(n)), rw + k * 0.06, 0.16, pan=-0.3 + 0.2 * k)
fx.add(kalimba(midi(93), 1.8), at('nouveau', 0, 12.52), 0.18)
fx.add(kalimba(midi(88), 1.6), at('nouveau', 0, 12.52) + 0.07, 0.14)

# ================================================================ 17 h: the report (stepped down), then the summary
if END > x17:
    groove(x17, summary, full=False, kick_v=0.55, bass_v=0.8)
    for c in cue('bar5'):
        fx.add(marimba(midi([65, 69, 72, 74, 77][c['i'] % 5])), c['t'], 0.13, pan=-0.4 + 0.2 * c['i'])
    for c in cue('count'):
        odometer(c['t'], 18, 0.8, 0.05)
if END > summary:
    for b in np.arange(summary, zero - 0.35, BEAT):  # e-piano and a bass pulse only
        music.add(bass(midi(ROOT[chord_at(b)] + 12), 0.3, 0.7), b, 0.24)
    music.add(chord(epiano, CH['Dm9'], 2.2, vel=0.6), summary, 0.26)
    for c in cue('check5'):
        fx.add(kalimba(midi([72, 76, 77][c['i'] % 3]), 1.2), c['t'] + 0.1, 0.12)
    fx.add(chord(epiano, [50, 57, 60, 65], 2.6, vel=0.7), zero, 0.3)  # suspended: « Pas ouvert de la journée »
    fx.add(thump(0.6, 60, 0.5), zero, 0.3)
    fx.add(whoosh(mark2 - merge + 0.1, 400, 6000, 'rise'), merge, 0.12)
if END > mark2:
    signature(mark2 + 0.05, fx, step=0.2, vel=0.32)
    signature(mark2 + 0.05, fx, step=0.2, inst='bell', vel=0.12, oct=1)
    music.add(chord(epiano, [41, 53, 57, 60, 64, 67], 3.2, vel=0.8), mark2 + 0.85, 0.3)
    music.add(choir([53, 60, 64, 69, 72], END - mark2 + 1, att=0.6, rel=1.2, bright=1.4), mark2 + 0.6, 0.26)
    music.add(bass(midi(29 + 12), 2.8, 0.9), mark2 + 0.85, 0.3)
    fx.add(marimba(midi(84)), cta, 0.12)
    fx.add(marimba(midi(89)), cta + 0.1, 0.1)
    for k, n in enumerate([96, 100, 103, 108]):
        fx.add(kalimba(midi(n), 1.2, 0.4), at('sheen2', 0, cta + 1.2) + k * 0.06, 0.03)

# ================================================================ MIX (as in the V3)
mus, dr, fxs = music.x, drums.x, fx.x
duck = np.ones(N)
for b in np.arange(x10, x17, BEAT):
    a = int(b * SR)
    seg = np.arange(int(0.25 * SR)) / SR
    duck[a:a + len(seg)] = np.minimum(duck[a:a + len(seg)], 1 - 0.18 * np.exp(-seg / 0.07))
mus = mus * duck
gate = np.ones(N)


def cut(a, b, fade=0.012):
    i0, i1, f = int(a * SR), int(b * SR), int(fade * SR)
    gate[i0:i0 + f] = np.minimum(gate[i0:i0 + f], np.linspace(1, 0, f))
    gate[i0 + f:i1] = 0
    gate[i1:i1 + f] = np.minimum(gate[i1:i1 + f], np.linspace(0, 1, f))


cut(freeze, freeze + 0.08)          # the 80 ms freeze before the lead notification
if END > zero:
    cut(zero - 0.35, zero)          # the breath before « Pas ouvert de la journée »
mus, dr = mus * gate, dr * gate
ir_n = int(2.2 * SR)
irt = np.arange(ir_n) / SR
ir = np.stack([lp(rng.standard_normal(ir_n), 5200) * np.exp(-irt / 0.42) for _ in range(2)])
ir[:, :int(0.016 * SR)] = 0
ir /= np.sqrt((ir ** 2).sum(axis=1, keepdims=True))
send = mus * 0.28 + fxs * 0.5 + dr * 0.06
wet = np.stack([fftconvolve(send[c], ir[c])[:N] for c in range(2)]) * 0.5
bed = hp(mus + dr * 0.8 + wet, 30)
sfx = hp(fxs * 0.9, 30)
mix = bed + sfx
end = int(END * SR)
mix = mix[:, :end]
fade = np.ones(end)
f0 = int((END - 0.9) * SR)
fade[f0:] = np.linspace(1, 0, end - f0) ** 1.5
fade[:int(0.004 * SR)] = np.linspace(0, 1, int(0.004 * SR))
mix *= fade
norm = np.max(np.abs(mix)) + 1e-9
mix /= norm
mix = np.tanh(mix * 1.15) / np.tanh(1.15) * 0.9


def write(path, x):
    pcm = (np.clip(x.T, -1, 1) * 32767).astype('<i2')
    with wave.open(path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


write(OUT, mix)
if STEMS:
    os.makedirs(STEMS, exist_ok=True)
    g = 0.9 / norm
    write(os.path.join(STEMS, 'bed.wav'), bed[:, :end] * fade * g)
    write(os.path.join(STEMS, 'sfx.wav'), sfx[:, :end] * fade * g)
print('wrote', OUT, f'{END:.2f}s')
