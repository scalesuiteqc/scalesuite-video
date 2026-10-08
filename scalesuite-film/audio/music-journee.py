"""« Une journée de courtier » soundtrack: the V3 music, re-timed to this film (no new score).

Same instruments, same 4-note signature (C5 F5 E5 A5), same swung neo-soul groove, same chords and
the same drop as audio/music-v3.py. The instruments and the signature are loaded from music-v3.py
itself (read-only, its first part only), so both films share one sound. Only the arrangement
follows this film's cues:
- 7 h: no drums; a soft e-piano chord, the clock roll ticks, the signature once on kalimba as the
  clock lands on 7 h; the weekly notification is a quiet two-note ping and a buzz.
- each hour change: the same odometer ticks and two marimba notes (the film's audible metronome).
- 10 h → 13 h: the V3 groove (rim, shaker, round bass, e-piano), typing, docks, the tap.
- the lead: full groove, FM glide + accelerating rim roll + riser while the token travels, an 80 ms
  freeze on arrival, then THE DROP on the notification (the signature on bell and kalimba).
- 17 h and the day's summary: the groove steps down; near-silence before « Pas ouvert ».
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
D = {'hour': [c['t'] for c in cue('hour')]}
H10 = D['hour'][0] if D['hour'] else 2.6
token, node, lock, notify = at('token', 0, 8.9), at('node', 0, 9.5), at('lock', 0, 10.7), at('notify', 0, 10.86)
H17 = D['hour'][2] if len(D['hour']) > 2 else 13.25
bilan, zero, mark2, cta = at('bilan', 0, 16.6), at('zero', 0, 18.3), at('mark2', 0, 20.3), at('cta', 0, 21.4)
music, fx, drums = Bus(), Bus(), Bus()

CH = {'Fmaj9': [53, 57, 60, 64, 67], 'Am7': [57, 60, 64, 67], 'Bbmaj9': [58, 62, 65, 69, 72], 'C69': [60, 64, 67, 69, 74],
      'Dm9': [50, 53, 57, 60, 64], 'Gm9': [55, 58, 62, 65, 69], 'C7sus': [48, 55, 58, 60, 65]}
ROOT = {'Fmaj9': 41, 'Am7': 45, 'Bbmaj9': 46, 'C69': 48, 'Dm9': 38, 'Gm9': 43, 'C7sus': 36}
PROG = [(0.0, 'Fmaj9'), (H10, 'Am7'), (H10 + 2.0, 'Bbmaj9'), (H10 + 4.0, 'C69'), (H10 + 6.0, 'Dm9'),
        (token, 'Bbmaj9'), (token + 0.75, 'Gm9'), (node + 0.5, 'C7sus'),
        (notify, 'Fmaj9'), (notify + 1.0, 'Bbmaj9'), (notify + 2.0, 'Fmaj9'),
        (H17, 'Bbmaj9'), (H17 + 2.0, 'C69'), (bilan, 'Dm9'), (mark2, 'Fmaj9')]


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


def odometer(t0, n=9, span=0.42, vel=0.05):
    for k in range(n):
        u = k / max(1, n - 1)
        fx.add(tick(0.8), t0 + span * (1 - (1 - u) ** 0.45), vel, pan=0.3 * np.sin(k))


# ================================================================ 7 h (no drums)
music.add(chord(epiano, CH['Fmaj9'], 3.0, vel=0.55), 0.0, 0.2, pan=-0.1)
music.add(choir([53, 60, 64, 69], H10 + 0.4, att=0.6, rel=0.8, bright=1.1), 0.0, 0.12, pan=0.15)
music.add(bass(midi(41 + 12), 2.4, 0.6), 0.02, 0.18)
ck = at('clock', 0, 0.36)
odometer(ck, 7, 0.4, 0.06)
signature(ck + 0.42, fx, step=0.17, vel=0.26)  # the theme, once, as the day starts
fx.add(whoosh(0.6, 2400, 500), at('fly', 0, 0.78), 0.08)
fx.add(marimba(midi(77)), at('pill', 0, 1.06), 0.12)
fx.add(whoosh(0.7, 200, 1600), at('phone', 0, 0.92), 0.08)
nt = at('note', 0, 1.5)
fx.add(ping(midi(84)), nt, 0.12)
fx.add(ping(midi(89)), nt + 0.11, 0.1)
for c in cue('haptic')[:1]:
    fx.add(buzz(0.24), c['t'], 0.22)
fx.add(kalimba(midi(84), 1.2), nt + 0.4, 0.08)

# ================================================================ hour changes: the audible metronome
for i, c in enumerate(cue('hour')):
    odometer(c['t'] + 0.06, 9, 0.45, 0.06)
    a, b = [(72, 77), (76, 81), (77, 84)][min(i, 2)]
    fx.add(marimba(midi(a)), c['t'] + 0.44, 0.13)
    fx.add(marimba(midi(b)), c['t'] + 0.52, 0.13)

# ================================================================ UI sounds (as in the V3)
for c in cue('tap'):
    fx.add(key(1.4), c['t'], 0.3)
fx.add(whoosh(0.5, 2500, 500), at('unfold', 0, 2.4), 0.12)
fx.add(whoosh(0.4, 300, 2600), at('bar', 0, 3.0), 0.08)
for c in cue('type'):
    n = max(1, c['n'])
    for k in range(n):
        tk = c['t'] + c['dur'] * (k + 0.5) / n
        fx.add(lp(key(), 3500) if k < c.get('del', 0) else key(), tk, 0.14, pan=float(rng.uniform(-0.3, 0.3)))
for c in cue('dock'):
    fx.add(marimba(midi([69, 72][c['i'] % 2])), c['t'] + 0.1, 0.14, pan=-0.2 + 0.3 * c['i'])
    fx.add(rim(0.6), c['t'] + 0.1, 0.08)
hl = at('halo', 0, 3.98)
fx.add(kalimba(midi(84), 1.6), hl, 0.16)
fx.add(kalimba(midi(89), 1.8), hl + 0.1, 0.14)
fx.add(whoosh(0.5, 300, 2600), at('open', 0, 5.68), 0.14)
fx.add(key(1.4), at('send', 0, 8.4), 0.3)
fx.add(thump(0.6, 80, 0.3), at('send', 0, 8.4) + 0.05, 0.25)
fx.add(whoosh(0.4, 4000, 500), at('squeeze', 0, 8.5), 0.12)
sg = at('sign', 0, 9.75)  # the pen on the deed: a soft scratch
nsg = int(0.85 * SR)
fx.add(bp(rng.standard_normal(nsg), 2500, 7000) * (0.5 + 0.5 * np.sin(np.arange(nsg) / SR * 2 * np.pi * 7) ** 2) * np.sin(np.pi * np.arange(nsg) / nsg), sg, 0.03, pan=-0.3)

# ================================================================ groove 10 h → the token
groove(H10, token)

# ================================================================ THE LEAD (as in the V3)
groove(token, lock + 0.1, full=True, kick_v=0.8)
tok = token
glen = lock - tok
t = t_arr(glen)
gf = midi(60) * 2 ** (12 * (t / glen) ** 1.5 / 12)
ph = 2 * np.pi * np.cumsum(gf) / SR
fx.add(lp(np.sin(ph + 1.2 * np.sin(ph)), 3000) * (t / glen) ** 0.7 * 0.5, tok, 0.12)
tr = tok
while tr < lock - 0.03:
    u = (tr - tok) / glen
    drums.add(rim(0.9), tr, 0.12 + 0.18 * u, pan=0.15)
    tr += 0.125 if u < 0.5 else 0.0625 if u < 0.85 else 0.03125
fx.add(kalimba(midi(72), 1.6), node, 0.2)
fx.add(whoosh(glen, 400, 8000, 'rise'), tok, 0.14)
fx.add(thump(0.9, 55, 0.6), lock, 0.5)
fx.add(kalimba(midi(77), 1.4), lock + 0.01, 0.18)
# THE DROP: the notification sings the signature; full groove under it
signature(notify + 0.02, fx, step=0.12, inst='bell', vel=0.22, oct=1)
signature(notify + 0.02, fx, step=0.12, vel=0.3)
fx.add(thump(1.0, 50, 0.9), notify, 0.55)
fx.add(hp(rng.standard_normal(int(0.9 * SR)), 5000) * np.exp(-t_arr(0.9) / 0.25), notify, 0.08)
groove(notify, H17, full=True, kick_v=0.95)
music.add(choir([60, 64, 69, 72], H17 - notify + 0.6, att=0.2, rel=0.5, bright=1.5), notify, 0.3, pan=0.25)
for c in cue('haptic')[1:]:
    fx.add(buzz(0.24), c['t'], 0.32)
    fx.add(buzz(0.24), c['t'] + 0.32, 0.26)
fx.add(kalimba(midi(84), 1.4), at('check', 0, 11.32), 0.14)
fx.add(kalimba(midi(89), 1.6), at('check', 0, 11.32) + 0.08, 0.14)
fx.add(whoosh(0.5, 2500, 500), at('crm', 0, 11.88), 0.12)
rw = at('row', 0, 12.46)
for k, n in enumerate([65, 69, 72, 77]):  # the new card docks: marimba up F major
    fx.add(marimba(midi(n)), rw + k * 0.06, 0.16, pan=-0.3 + 0.2 * k)
fx.add(kalimba(midi(93), 1.8), at('nouveau', 0, 12.74), 0.18)
fx.add(kalimba(midi(88), 1.6), at('nouveau', 0, 12.74) + 0.07, 0.14)

# ================================================================ 17 h and the summary (stepped down)
if END > H17:
    groove(H17, bilan, full=False, kick_v=0.55, bass_v=0.8)
    for c in cue('bar5'):  # one note per report bar
        fx.add(marimba(midi([65, 69, 72, 74, 77][c['i'] % 5])), c['t'], 0.13, pan=-0.4 + 0.2 * c['i'])
    for c in cue('count'):
        odometer(c['t'], 18, 1.0, 0.05)
    for b in np.arange(bilan, zero - 0.4, BEAT):  # the summary: e-piano and a bass pulse only
        music.add(bass(midi(ROOT[chord_at(b)] + 12), 0.3, 0.7), b, 0.24)
    music.add(chord(epiano, CH['Dm9'], 2.2, vel=0.6), bilan, 0.26)
    for c in cue('check5'):
        fx.add(kalimba(midi([72, 76, 77, 81][c['i'] % 4]), 1.2), c['t'], 0.12)
    fx.add(chord(epiano, [50, 57, 60, 65], 2.4, vel=0.7), zero, 0.3)  # suspended: « ouvert 0 fois »
    fx.add(thump(0.6, 60, 0.5), zero, 0.3)
if END > mark2:
    signature(mark2 + 0.05, fx, step=0.2, vel=0.32)
    signature(mark2 + 0.05, fx, step=0.2, inst='bell', vel=0.12, oct=1)
    music.add(chord(epiano, [41, 53, 57, 60, 64, 67], 3.2, vel=0.8), mark2 + 0.85, 0.3)
    music.add(choir([53, 60, 64, 69, 72], END - mark2 + 1, att=0.6, rel=1.2, bright=1.4), mark2 + 0.6, 0.26)
    music.add(bass(midi(29 + 12), 2.8, 0.9), mark2 + 0.85, 0.3)
    fx.add(marimba(midi(84)), cta, 0.12)
    fx.add(marimba(midi(89)), cta + 0.1, 0.1)
    for k, n in enumerate([96, 100, 103, 108]):
        fx.add(kalimba(midi(n), 1.2, 0.4), at('sheen2', 0, cta + 0.6) + k * 0.06, 0.03)

# ================================================================ MIX (as in the V3)
mus, dr, fxs = music.x, drums.x, fx.x
duck = np.ones(N)
for b in np.arange(H10, H17, BEAT):
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


cut(lock + 0.1, lock + 0.18)        # the 80 ms freeze on arrival
if END > zero:
    cut(zero - 0.4, zero)           # the breath before « Pas ouvert »
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
