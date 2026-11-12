/* « Qui répond à 2 h du matin? » : canvas, easing and components, on top of core.js / core-v3.js (read-only).
   Two canvases: ?format=16x9 (1920 × 1080, default, the cut that gets filmed off a laptop) and
   ?format=9x16 (1080 × 1920, direct social cut).
   Every scene is a pure function of its local time: build(layer) creates the DOM once, render(u) sets
   every animated property from u alone (no tween state), so any frame can be rendered in any order. */
(function () {
  const SS = window.SS;
  const q = new URLSearchParams(location.search);
  const Q = (SS.Q = {});

  // ---- Canvas -----------------------------------------------------------------------------------
  Q.F = q.get('format') === '9x16' ? '9x16' : '16x9';
  Q.wide = Q.F === '16x9';
  SS.W = Q.W = Q.wide ? 1920 : 1080;
  SS.H = Q.H = Q.wide ? 1080 : 1920;
  SS.CX = Q.CX = Q.W / 2;
  Q.CY = Q.H / 2;
  Q.pick = (wide, tall) => (Q.wide ? wide : tall);

  // ---- Brand colours (logo gradient and tokens measured from assets/logo and styles.css) ----------
  Q.C = {
    night: '#070D14', night2: '#0B1622', white: '#F2F7F9',
    turq: '#2BBFB3', turqHi: '#3FD3C6', blue: '#2FB0DE', logoA: '#1FBFA4', logoB: '#27B6C8',
    chipInk: '#06211F', mint: '#E8F9F7', off: '#F7FBFA', ink: '#1A1A1A',
  };

  // ---- Easing (never linear for a move in space) ---------------------------------------------------
  const clamp = SS.clamp, lerp = SS.lerp, E = SS.E;
  Q.E = {
    out: E.out, soft: E.outSoft, quart: E.outQuart, inOut: E.inOut, in: E.in, inSoft: E.inSoft, sine: E.sine,
    spring: gsap.parseEase('back.out(1.7)'), springSoft: gsap.parseEase('back.out(1.2)'), springHi: gsap.parseEase('back.out(2.4)'),
    p3: gsap.parseEase('power3.out'), p4: gsap.parseEase('power4.out'), expo: gsap.parseEase('expo.out'),
    p4io: gsap.parseEase('power4.inOut'), expoIn: gsap.parseEase('expo.in'),
  };
  // eased progress of t across [at, at + dur]
  Q.k = (t, at, dur, ease) => (ease || E.out)(clamp((t - at) / dur));
  // 0 → 1 over [a, a + din], back to 0 over [b, b + dout]
  Q.env = (t, a, din, b, dout, ein, eout) => Math.min(Q.k(t, a, din, ein || E.out), 1 - Q.k(t, b, dout, eout || E.in));
  Q.lerp = lerp;
  Q.clamp = clamp;
  // damped oscillation in [-1, 1], starting at `at` (phone buzz, settle)
  Q.buzz = (t, at, dur = 0.34, freq = 17) => {
    const x = t - at;
    return x < 0 || x > dur ? 0 : Math.sin(x * freq * 2 * Math.PI) * Math.pow(1 - x / dur, 2);
  };

  // ---- Placement: element centred on (x, y), 2D transform only (text is re-rasterised at each scale)
  Q.st = (el, o) => {
    let tr = `translate(${(o.x || 0).toFixed(2)}px,${(o.y || 0).toFixed(2)}px) translate(-50%,-50%)`;
    if (o.r) tr += ` rotate(${o.r.toFixed(3)}deg)`;
    const sx = (o.s == null ? 1 : o.s) * (o.sx == null ? 1 : o.sx), sy = (o.s == null ? 1 : o.s) * (o.sy == null ? 1 : o.sy);
    if (sx !== 1 || sy !== 1) tr += ` scale(${sx.toFixed(4)},${sy.toFixed(4)})`;
    el.style.transform = tr;
    const op = o.o == null ? 1 : clamp(o.o);
    el.style.opacity = op.toFixed(3);
    el.style.visibility = op <= 0.001 ? 'hidden' : 'visible';
    el.style.filter = o.blur > 0.05 ? `blur(${o.blur.toFixed(2)}px)` : 'none';
  };
  Q.div = (parent, cls, css) => { const e = SS.el('div', cls || 'qr-abs', parent); if (css) Object.assign(e.style, css); return e; };

  // ---- Night backdrop: near-black blue with a soft vignette -----------------------------------------
  // Ambient layer: two very soft lights drift slowly behind everything (a function of the film time
  // only, so two layers showing the same backdrop are identical at a cut).
  Q.ambients = [];
  const ambient = (bg, a, b) => {
    const mk = (c) => Q.div(bg, 'qr-abs', { width: Q.W * 0.62 + 'px', height: Q.W * 0.62 + 'px', background: `radial-gradient(closest-side, ${c} 0%, rgba(0,0,0,0) 100%)` });
    Q.ambients.push([mk(a), mk(b)]);
  };
  Q.ambient = (t) => Q.ambients.forEach(([a, b]) => {
    a.style.transform = `translate(${(Q.W * 0.26 + Math.sin(t * 0.23 + 0.4) * Q.W * 0.045).toFixed(1)}px,${(Q.H * 0.3 + Math.cos(t * 0.19) * Q.H * 0.06).toFixed(1)}px) translate(-50%,-50%)`;
    b.style.transform = `translate(${(Q.W * 0.76 + Math.cos(t * 0.21 + 1.3) * Q.W * 0.045).toFixed(1)}px,${(Q.H * 0.72 + Math.sin(t * 0.17 + 0.8) * Q.H * 0.06).toFixed(1)}px) translate(-50%,-50%)`;
  });
  Q.night = (layer) => {
    layer.style.background = Q.C.night;
    // light falling from the top, gentle vignette (brief v2: no halo, no blurred ellipse)
    return Q.div(layer, 'layer', { background: `radial-gradient(130% 100% at 50% -8%, #132233 0%, ${Q.C.night2} 30%, ${Q.C.night} 62%, #04070B 100%)` });
  };

  // ---- Light backdrop (solution scenes): pale turquoise, lighter in the centre -----------------------
  Q.day = (layer) => {
    layer.style.background = Q.C.mint;
    const bg = Q.div(layer, 'layer', { background: `radial-gradient(130% 100% at 50% -8%, #FFFFFF 0%, ${Q.C.off} 26%, ${Q.C.mint} 64%, #DDF4F0 100%)` });
    return bg;
  };

  // ---- Phrase: words come into focus one by one (fast), the chip unfolds on its own cue ------------------
  // lines: [[{t: 'Rappelle en'}, {t: '5 minutes', chip: true}, {t: ',', glue: true}], [...]]
  //   seg.g = group index (default 0): each group of words arrives on its own cue (a beat).
  //   seg.chip: the key words sit in a chip that unfolds from left to right on ITS cue, after the words.
  //   seg.glue: no space before (punctuation after a chip).
  // put(x, y, u, {at: [seconds per group], chip: [seconds per chip], out, align})
  //   Every group arrival gives the phrase a small impact: scale 1,03 → 1 in 0,25 s.
  Q.phrase = (parent, lines, opt) => {
    const o = Object.assign({ size: 62, weight: 650, color: Q.C.white, lh: 1.3, st: 0.045, align: 'center', impact: 0.03 }, opt);
    const root = Q.div(parent, 'qr-abs qr-block', { fontSize: o.size + 'px', fontWeight: o.weight, color: o.color, lineHeight: o.lh, textAlign: o.align,
      transformOrigin: o.align === 'center' ? '50% 50%' : '0 50%' });
    const groups = [], chips = [];
    lines.forEach((segs) => {
      const ln = SS.el('div', 'ln', root);
      segs.forEach((seg, si) => {
        if (si > 0 && !seg.glue) ln.appendChild(document.createTextNode(' '));
        let box = ln, ov = null;
        if (seg.chip) { box = SS.el('span', 'qr-chipw', ln); ov = document.createElement('span'); ov.className = 'ov'; chips.push({ ov, g: seg.g || 0 }); }
        seg.t.split(' ').forEach((w, wi) => {
          if (wi > 0) { box.appendChild(document.createTextNode(' ')); if (ov) ov.appendChild(document.createTextNode(' ')); }
          const el = SS.el('span', 'w', box);
          el.textContent = w;
          if (seg.glue && wi === 0) el.style.marginLeft = '-.07em'; // punctuation hugs the chip it follows
          if (ov) { const c = SS.el('span', '', ov); c.textContent = w; }
          (groups[seg.g || 0] = groups[seg.g || 0] || []).push(el);
        });
        if (ov) box.appendChild(ov);
      });
    });
    const r = root.getBoundingClientRect();
    return {
      el: root, w: r.width, h: r.height, groups, chips,
      put(x, y, u, a) {
        const at = a.at, out = a.out == null ? 0 : Q.k(u, a.out, a.outDur || 0.2, Q.E.in);
        let imp = 0;
        at.forEach((t0) => { if (u >= t0) imp = Math.max(imp, 1 - Q.E.out(Q.clamp((u - t0) / 0.25))); });
        const sc = (1 + o.impact * imp) * Q.lerp(1, 0.95, out);
        const left = o.align === 'center' ? x - r.width / 2 : x;
        root.style.transform = `translate(${left.toFixed(2)}px,${(y - r.height / 2).toFixed(2)}px) scale(${sc.toFixed(5)})`;
        const vis = u >= at[0] - 0.02 && out < 0.999;
        root.style.opacity = vis ? (1 - out).toFixed(3) : '0';
        root.style.visibility = vis ? 'visible' : 'hidden';
        root.style.filter = out > 0.004 ? `blur(${(out * 14).toFixed(2)}px)` : 'none';
        groups.forEach((ws, g) => ws.forEach((el, i) => {
          const t0 = at[g] + i * o.st, kin = Q.k(u, t0, 0.3, Q.E.out);
          el.style.transform = `translateY(${((1 - kin) * 0.12).toFixed(4)}em) scale(${Q.lerp(1.14, 1, kin).toFixed(4)})`;
          el.style.opacity = Q.k(u, t0, 0.14, Q.E.sine).toFixed(3);
          el.style.filter = kin < 0.995 ? `blur(${((1 - kin) * 10).toFixed(2)}px)` : 'none';
        }));
        chips.forEach((c, j) => {
          const t0 = a.chip ? (Array.isArray(a.chip) ? a.chip[j] : a.chip) : at[c.g], k = Q.k(u, t0, 0.3, Q.E.expo);
          c.ov.style.clipPath = `inset(0 ${((1 - k) * 100).toFixed(2)}% 0 0 round .14em)`;
          c.ov.style.visibility = k <= 0.0005 ? 'hidden' : 'visible';
        });
      },
    };
  };

  // ---- Light and dark transitions (0,5 s and 0,6 s): no flash ------------------------------------------
  // The ring grows on an expo curve with a feathered edge while the brightness rises progressively:
  // what the disc reveals starts dimmed and reaches its full brightness only at the end.
  // lightDisc: the day backdrop opens from the centre. irisClose: the night closes in from the edges.
  const ringEl = (layer) => Q.div(layer, 'qr-abs', { width: '200px', height: '200px', borderRadius: '50%', boxSizing: 'border-box', border: `9px solid ${Q.C.turqHi}` });
  // the feather is 30 % of the radius: the ring must travel far enough for its SOLID part to reach the corners
  // (otherwise the corners are still half covered on the last frame and the next scene pops in)
  const RMAX = () => (Math.hypot(Q.W, Q.H) / 2) * 1.5;
  Q.lightDisc = (layer) => {
    const disc = Q.div(layer, 'layer');
    Q.day(disc);
    const dim = Q.div(disc, 'layer', { background: '#0A2A30' });
    const ring = ringEl(layer);
    const rad = (k) => RMAX() * Q.E.expo(Q.clamp(k));
    return {
      set(k) {
        const on = k > 0.0005, r = rad(k), v = r - rad(k - 1 / 30), feather = Math.max(24, r * 0.3);
        disc.style.visibility = on ? 'visible' : 'hidden';
        const m = `radial-gradient(circle at 50% 50%, #000 ${Math.max(0, r - feather).toFixed(1)}px, rgba(0,0,0,0) ${r.toFixed(1)}px)`;
        disc.style.webkitMaskImage = m; disc.style.maskImage = m;
        dim.style.opacity = (0.9 * (1 - Q.E.sine(Q.clamp(k)))).toFixed(3);
        Q.st(ring, { x: Q.CX, y: Q.CY, s: Math.max(0.001, r / 100), o: on && k < 0.999 ? 0.85 * (1 - Q.E.sine(Q.clamp(k))) : 0, blur: Math.min(16, Math.abs(v) * 0.05) });
      },
    };
  };
  Q.irisClose = (layer) => {
    const veil = Q.div(layer, 'layer'), dark = Q.div(layer, 'layer');
    Q.night(veil); Q.night(dark);
    const ring = ringEl(layer);
    // the opening played backwards: the picture dims progressively while the hole is still wide, then the ring
    // collapses fast on what is already dark (no flash to black)
    const rad = (k) => RMAX() * Q.E.expo(Q.clamp(1 - k));
    return {
      set(k) {
        const on = k > 0.0005, r = rad(k), v = r - rad(k - 1 / 30), feather = Math.max(24, r * 0.3);
        dark.style.visibility = veil.style.visibility = on ? 'visible' : 'hidden';
        const m = `radial-gradient(circle at 50% 50%, rgba(0,0,0,0) ${Math.max(0, r - feather).toFixed(1)}px, #000 ${r.toFixed(1)}px)`;
        dark.style.webkitMaskImage = m; dark.style.maskImage = m;
        veil.style.opacity = (0.92 * Q.E.sine(Q.clamp(k))).toFixed(3);
        Q.st(ring, { x: Q.CX, y: Q.CY, s: Math.max(0.001, r / 100), o: 0 }); // brief v2: no ring on the iris
      },
    };
  };

  // ---- Highlight chip ---------------------------------------------------------------------------------
  Q.chip = (parent, text, css) => { const c = SS.el('span', 'qr-chip', parent); c.textContent = text; if (css) Object.assign(c.style, css); return c; };

  // ---- Typed line with caret -----------------------------------------------------------------------
  // segs: [{t: 'Rappelle en '}, {t: '5 minutes', chip: true}, {t: ','}]. The key word is typed INSIDE the
  // chip, which widens with the text. Prefix widths are measured once, so the line can stay centred
  // while it grows (the centre glides, the characters step).
  Q.typed = (parent, segs, opt) => {
    const o = Object.assign({ size: 64, weight: 600, color: Q.C.white, caret: true }, opt);
    const root = SS.el('div', 'qr-line', parent);
    Object.assign(root.style, { fontSize: o.size + 'px', fontWeight: o.weight, color: o.color });
    let off = 0;
    const parts = segs.map((s) => {
      const wrap = s.chip ? SS.el('span', 'qr-chip', root) : null;
      const span = SS.el('span', '', wrap || root);
      const p = { wrap, span, t: s.t, off, len: s.t.length };
      off += s.t.length;
      return p;
    });
    const N = off;
    let cur = -1;
    const setN = (n) => {
      if (n === cur) return;
      cur = n;
      parts.forEach((p) => {
        const c = Math.max(0, Math.min(p.len, n - p.off));
        p.span.textContent = p.t.slice(0, c);
        if (p.wrap) p.wrap.style.display = c > 0 ? '' : 'none';
      });
    };
    const widths = [];
    for (let n = 0; n <= N; n++) { setN(n); widths.push(root.getBoundingClientRect().width); }
    const caret = o.caret ? SS.el('span', 'qr-caret', root) : null;
    if (caret && o.caretColor) caret.style.background = o.caretColor;
    const wAt = (n) => { const i = Math.min(N, Math.floor(n + 1e-6)), j = Math.min(N, i + 1); return lerp(widths[i], widths[j], clamp(n - i)); };
    return {
      el: root, N, widths, w: widths[N], wAt,
      // n: characters shown (fractional → smooth centring). a: {s, o, blur, caret, align}
      put(n, x, y, a = {}) {
        n = clamp(n, 0, N);
        const i = Math.min(N, Math.floor(n + 1e-6)), s = a.s == null ? 1 : a.s, w = wAt(n);
        setN(i);
        const left = a.align === 'left' ? x : x - (w * s) / 2;
        root.style.transform = `translate(${left.toFixed(2)}px,${y.toFixed(2)}px) translate(0,-50%) scale(${s.toFixed(4)})`;
        const op = a.o == null ? 1 : clamp(a.o);
        root.style.opacity = op.toFixed(3);
        root.style.visibility = op <= 0.001 ? 'hidden' : 'visible';
        root.style.filter = a.blur > 0.05 ? `blur(${a.blur.toFixed(2)}px)` : 'none';
        if (caret) {
          caret.style.left = (widths[i] + o.size * 0.07).toFixed(2) + 'px';
          caret.style.opacity = a.caret ? 1 : 0;
        }
      },
    };
  };
  // characters typed at time t (fractional), and the caret state: solid while typing, blinking after
  Q.typeN = (t, at, cps, N) => clamp((t - at) * cps, 0, N);
  Q.caretOn = (t, at, cps, N, until) => {
    if (t < at - 0.12 || (until != null && t > until)) return false;
    if ((t - at) * cps < N) return true;
    return ((t - at - N / cps) * 1.9) % 1 < 0.58;
  };

  // ---- Giant rolling figure (mechanical counter) -----------------------------------------------------
  // digits '100', turns per column; every column rolls up from 0 to its digit after `turns` full turns,
  // with a vertical motion blur proportional to its speed. tail: '×' or '%'.
  let figId = 0;
  const NS = 'http://www.w3.org/2000/svg';
  Q.defs = () => {
    if (!Q._defs) {
      const s = document.createElementNS(NS, 'svg');
      s.setAttribute('width', 0); s.setAttribute('height', 0);
      s.style.position = 'absolute';
      document.getElementById('stage').appendChild(s);
      Q._defs = SS.svg('defs', {}, s);
    }
    return Q._defs;
  };
  Q.figure = (parent, opt) => {
    const o = Object.assign({ digits: '100', size: 380, turns: null, color: '#fff' }, opt);
    const root = SS.el('div', 'qr-fig', parent);
    Object.assign(root.style, { fontSize: o.size + 'px', color: o.color });
    const cols = [...o.digits].map((ch, i) => {
      const d = +ch, turns = o.turns ? o.turns[i] : i + 1, n = turns * 10 + d;
      const win = SS.el('span', 'win', root), strip = SS.el('span', 'strip', win);
      for (let j = 0; j <= n; j++) SS.el('span', '', strip, String(j % 10));
      const id = 'qrmb' + figId++;
      const f = SS.svg('filter', { id, x: '-5%', y: '-2%', width: '110%', height: '104%', 'color-interpolation-filters': 'sRGB' }, Q.defs());
      const gb = SS.svg('feGaussianBlur', { stdDeviation: '0 0' }, f);
      return { win, strip, n, id, gb };
    });
    let tail = null;
    if (o.tail) {
      tail = SS.el('span', 'tail', root);
      tail.textContent = o.tail;
      Object.assign(tail.style, Object.assign({ display: 'inline-block', color: Q.C.turq }, o.tailCss || {}));
    }
    const r = root.getBoundingClientRect();
    const val = (c, i, t, at, dur, stg) => c.n * Q.E.p4(clamp((t - at - i * stg) / (dur * (0.72 + 0.28 * (i / Math.max(1, cols.length - 1))))));
    return {
      el: root, tail, w: r.width, h: r.height, cols,
      // roll every column from `at` over `dur` (left column stops first)
      roll(t, at, dur, stg = 0.05) {
        cols.forEach((c, i) => {
          const v = val(c, i, t, at, dur, stg), v0 = val(c, i, t - 1 / 60, at, dur, stg);
          c.strip.style.transform = `translateY(${(-v).toFixed(4)}em)`;
          const sd = Math.min(o.size * 0.16, Math.abs(v - v0) * o.size * 0.42);
          if (sd > 0.4) { c.gb.setAttribute('stdDeviation', `0 ${sd.toFixed(2)}`); c.strip.style.filter = `url(#${c.id})`; }
          else c.strip.style.filter = 'none';
        });
      },
    };
  };

  // ---- Halo behind a giant figure ------------------------------------------------------------------
  // (brief v2) no halo behind the figures any more: Q.halo is kept as an invisible placeholder so that
  // the scenes that still position one keep working until they are reworked
  Q.halo = (parent) => Q.div(parent, 'qr-abs', { display: 'none' });

  // ---- Notification card (no platform logo, no median dots) --------------------------------------------
  const HOUSE = (c) => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3.6 11.2 12 4l8.4 7.2"/><path d="M5.8 9.6V19.5h12.4V9.6"/><path d="M10 19.5v-5.2h4v5.2"/></svg>`;
  Q.card = (parent, o) => {
    const c = SS.el('div', 'qr-card' + (o.turq ? ' turq' : ''), parent);
    c.innerHTML = `<div class="ic">${HOUSE(o.turq ? '#3FD3C6' : '#fff')}</div><div><div class="lb">${o.label || 'Nouvelle demande'}</div><div class="ti">${o.title}</div><div class="ct">${o.city}</div></div>`;
    return c;
  };

  // ---- Source line (small, bottom of the frame) ---------------------------------------------------------
  Q.src = (parent, lines, size) => {
    const s = SS.el('div', 'qr-src', parent);
    s.style.fontSize = size + 'px';
    s.innerHTML = lines.join('<br>');
    return s;
  };
})();
