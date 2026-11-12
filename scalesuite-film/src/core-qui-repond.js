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
  Q.night = (layer) => {
    layer.style.background = Q.C.night;
    return Q.div(layer, 'layer', { background: `radial-gradient(120% 120% at 50% 46%, ${Q.C.night2} 0%, ${Q.C.night} 46%, #03060A 100%)` });
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
  Q.halo = (parent, w, h) => {
    const box = Q.div(parent, 'qr-abs', { width: w + 'px', height: h + 'px' });
    Q.div(box, 'qr-abs', { inset: '0', filter: 'blur(46px)',
      background: 'radial-gradient(closest-side, rgba(63,211,198,.9) 0%, rgba(43,191,179,.58) 30%, rgba(47,176,222,.28) 60%, rgba(47,176,222,0) 100%)' });
    return box;
  };

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
