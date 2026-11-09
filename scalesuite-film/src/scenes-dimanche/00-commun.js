/* « Dimanche, 21 h 14 » : shared timing, palette, precomputed springs, the story clock and the touch point.
   The whole film's timing lives in SS.DT (one table), so scenes stay in sync and the storyboard can be
   checked against it. Every spring is integrated ONCE at build time into a table (fixed 0.25 ms step)
   and read back as a GSAP ease or inside a render(t): the picture stays a pure function of t. */
(function () {
  const SS = window.SS;

  SS.DT = {
    // 1 · hook, the result first (0–2.8): frame 0 of the master = settled state at 2.0 s
    cards: 0.35, cardsSt: 0.12, hookOut: 2.8, poster: 2.0,
    // 2 · rewind (2.8–5.6): the play bar rises, the finger drags it back to Sunday 21 h 14
    pull: 2.82, barIn: 2.84, fingIn: 2.9, press: 2.98, scrub: 3.02, scrubDur: 1.3, retract: 3.06, retractSt: 0.14,
    s2Head: 3.35, fingOut: 4.42, s2Out: 5.4,
    // 3 · Sunday 21 h 14 (5.6–9.4): track → search bar, typed query, sponsored ad, ad → page, form
    morph: 5.6, morphDur: 0.45, s3Head: 5.8, typeAt: 6.12, typeDur: 0.8, ad: 6.95, tapAd: 7.6, open: 7.72,
    form: 8.02, f1: 8.25, f2: 8.5, f3: 8.83, tapCta: 9.05, s3Out: 9.35,
    // 4 · within the minute (9.4–13.2): page → token → Sophie's phone, the text unfolds
    squeeze: 9.4, token: 9.62, land: 10.25, sent: 10.7, s4Head: 10.6, s4Out: 13.15,
    // 5 · your Sunday (leader's phone, still), then Monday on Julie's phone (13.2–17.8)
    pan1: 13.2, s5Head: 13.4, s5Out1: 14.8, bar2In: 14.7, mon: 14.85, monDur: 0.55, s5bHead: 15.3,
    tapNote: 16.1, thread: 16.15, under: 16.5, tapNum: 16.8, call: 16.9, s5Out: 17.75,
    // 6 · not ready yet: Marc (17.8–22.0)
    sept: 17.8, septDur: 0.6, marc: 17.95, spring: 18.4, s6Head: 18.1, s6Out1: 19.35, six: 19.2, sixDur: 0.6,
    s6bHead: 19.62, follow: 19.85, reply: 20.4, born: 21.4, dExit: 21.6, s6Out: 21.95,
    // 7 · Thursday, the climax (22.0–26.8): the cards fly into the agenda, it closes, the camera pulls back
    thu: 22.0, thuDur: 0.5, rise: 22.0, hand: 22.55, fly: 22.6, s7Head: 22.6, close: 23.9, press7: 24.25,
    back: 24.45, s7Out1: 24.4, s7bHead: 24.78, s7Out: 26.75,
    // 8 · the risk (26.8–29.8)
    whip8: 26.8, checks: 27.25, s8Head: 28.22, seal: 28.25, nocontract: 28.5, s8Out: 29.75,
    // 9 · call to action (29.8–33.9): the seal becomes the button, cables, pull, release, settle
    pill: 29.8, logo: 30.05, cables: 30.1, catch: 30.35, txt: 30.42, url: 30.5, grab: 30.6, pull9: 30.66,
    release: 31.02, sheen: 32.3, end: 33.9,
  };

  SS.D_SEARCH = { x: 540, y: 700, w: 900, h: 112 }; // the search bar the play bar's track becomes

  // ---- palette (design DNA of this film: light studio, logo turquoise and blue, black text) ----------
  SS.DC = {
    bgTop: '#F6FAFA', bgBot: '#EAF1F1', ink: '#151515', ink2: '#2C2C2A', soft: '#5E6B69', faint: '#9AA7A4',
    turq: '#1FBFA8', teal: '#0F7B6F', blue: '#2FB0DE', deep: '#16708F', linen: '#175F77', linen2: '#1B6C86',
    team: '#2F5D8C', link: '#1F5FAD', line: '#E3EBEB', skel: '#E6EEEE', track: '#D7E2E2', paper: '#FFFFFF',
  };
  SS.DSH = {
    card: '0 1px 2px rgba(10,40,48,.10), 0 -10px 22px -10px rgba(10,40,48,.16), 0 14px 26px -14px rgba(10,40,48,.28)',
    ui: '0 1px 2px rgba(18,44,40,.06), 0 14px 34px -14px rgba(18,74,66,.26), 0 0 0 1px rgba(26,26,26,.045)',
    uiHi: '0 2px 4px rgba(18,44,40,.08), 0 34px 70px -28px rgba(18,74,66,.38), 0 0 0 1px rgba(26,26,26,.05)',
  };

  // ---- springs, precomputed -------------------------------------------------------------------------
  // Step response of a damped spring x'' = ω²(1 − x) − 2ζω x', x(0)=0, x'(0)=v0, integrated once
  // (semi-implicit Euler, 0.25 ms) and stored every millisecond. Returned as an ease on [0, 1] over
  // `dur` seconds (the time it takes to settle within 0.2 %), so GSAP reads a table, never a live sim.
  SS.springTable = (zeta, omega, v0 = 0, tol = 0.002, maxDur = 3) => {
    const h = 0.00025, per = 4, out = [0];
    let x = 0, v = v0, last = 0;
    for (let i = 1; i <= maxDur / h; i++) {
      v += (omega * omega * (1 - x) - 2 * zeta * omega * v) * h;
      x += v * h;
      if (i % per === 0) { out.push(x); if (Math.abs(1 - x) > tol || Math.abs(v) > tol * omega) last = out.length - 1; }
    }
    const n = Math.min(out.length - 1, last + 1);
    const tab = out.slice(0, n + 1);
    tab[n] = 1; // exact landing on the target
    return { tab, dur: n / 1000 };
  };
  const lookup = (tab, k) => {
    if (k <= 0) return 0;
    if (k >= 1) return 1;
    const f = k * (tab.length - 1), i = Math.floor(f);
    return tab[i] + (tab[i + 1] - tab[i]) * (f - i);
  };
  SS.springEase = (zeta, omega, v0) => {
    const s = SS.springTable(zeta, omega, v0);
    const ease = (p) => lookup(s.tab, p);
    return { ease, dur: s.dur, rev: (p) => 1 - lookup(s.tab, 1 - p) };
  };
  // the springs of this film (overshoot ≈ e^(−ζπ/√(1−ζ²)))
  SS.SPR = {
    card: SS.springEase(0.66, 15),   // ≈ 6 %: meeting cards out of the pocket
    soft: SS.springEase(0.8, 13),    // ≈ 1.5 %: UI that settles
    pop: SS.springEase(0.55, 17),    // ≈ 12 %: hero pop (text message, notification)
  };

  // ---- the story clock (what the play bar scrubs) ---------------------------------------------------
  // Story time in hours since Sunday 20 September 2026, 00:00 (wall clock, computed in UTC so no DST
  // offset ever changes a displayed hour). The bar position is a smooth monotone function of story time
  // (Fritsch–Carlson cubic through the film's anchors): left is always earlier.
  const EPOCH = Date.UTC(2026, 8, 20);
  SS.D = {};
  SS.D.H = (mo, d, hh = 0, mm = 0) => (Date.UTC(2026, mo - 1, d, hh, mm) - EPOCH) / 3600e3;
  const A = [
    [0, 0], [SS.D.H(9, 24, 19, 2), 0.08], [SS.D.H(11, 5, 10, 0), 0.3], [SS.D.H(11, 8, 21, 14), 0.42],
    [SS.D.H(11, 9, 9, 0), 0.55], [SS.D.H(11, 12, 18, 30), 0.86], [SS.D.H(11, 14), 1],
  ];
  const n = A.length, dk = [], m = [];
  for (let i = 0; i < n - 1; i++) dk.push((A[i + 1][1] - A[i][1]) / (A[i + 1][0] - A[i][0]));
  m[0] = dk[0]; m[n - 1] = dk[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = dk[i - 1] * dk[i] <= 0 ? 0 : (2 * dk[i - 1] * dk[i]) / (dk[i - 1] + dk[i]);
  SS.D.frac = (h) => {
    if (h <= A[0][0]) return 0;
    if (h >= A[n - 1][0]) return 1;
    let i = 0;
    while (h > A[i + 1][0]) i++;
    const x0 = A[i][0], dx = A[i + 1][0] - x0, s = (h - x0) / dx, s2 = s * s, s3 = s2 * s;
    return (2 * s3 - 3 * s2 + 1) * A[i][1] + (s3 - 2 * s2 + s) * dx * m[i] + (-2 * s3 + 3 * s2) * A[i + 1][1] + (s3 - s2) * dx * m[i + 1];
  };
  const DAY = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  const DAYL = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const MON = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  SS.D.when = (h) => {
    const d = new Date(EPOCH + Math.round(h * 60) * 60e3);
    const mm = String(d.getUTCMinutes()).padStart(2, '0');
    return { day: DAY[d.getUTCDay()], dayL: DAYL[d.getUTCDay()], hm: `${d.getUTCHours()} h ${mm}`, date: `${d.getUTCDate()} ${MON[d.getUTCMonth()]}` };
  };
  // scrub segments of the whole film (story time keyframes); l1 overrides the bubble's first line
  const T = SS.DT;
  SS.D.T0 = SS.D.H(11, 12, 18, 30);
  SS.D.SEG = [
    { at: T.scrub, dur: T.scrubDur, to: SS.D.H(11, 8, 21, 14) },
    { at: 10.0, dur: 0, to: SS.D.H(11, 8, 21, 15) }, // hidden: the minute has passed while the bar was away
    { at: T.mon, dur: T.monDur, to: SS.D.H(11, 9, 9, 0) },
    { at: T.sept, dur: T.septDur, to: SS.D.H(9, 24, 19, 2) },
    { at: T.six, dur: T.sixDur, to: SS.D.H(11, 5, 10, 0), l1: '6 semaines plus tard', l2: (w) => `${w.dayL} ${w.date}` },
    { at: T.thu, dur: T.thuDur, to: SS.D.H(11, 12, 18, 30) },
  ];
  const scrubEase = (p) => gsap.parseEase('power2.inOut')(p);
  SS.D.story = (t) => {
    let h = SS.D.T0, seg = null;
    for (const s of SS.D.SEG) {
      if (t < s.at) break;
      const from = h;
      h = s.dur > 0 ? from + (s.to - from) * scrubEase(SS.clamp01((t - s.at) / s.dur)) : s.to;
      seg = s;
    }
    return { h, seg };
  };

  // ---- textures ---------------------------------------------------------------------------------------
  // fibre noise for the linen (static, deterministic)
  SS.D.noise = (alpha, seed = 11, size = 160) => {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const x = c.getContext('2d'), im = x.createImageData(size, size), r = SS.rng(seed);
    for (let i = 0; i < im.data.length; i += 4) {
      const v = r() < 0.5 ? 0 : 255;
      im.data[i] = im.data[i + 1] = im.data[i + 2] = v;
      im.data[i + 3] = Math.round(alpha * r());
    }
    x.putImageData(im, 0, 0);
    return c.toDataURL();
  };
  SS.D.linen = (base) => ({
    backgroundColor: base,
    backgroundImage: [
      `url(${SS.D.LINEN || (SS.D.LINEN = SS.D.noise(26, 5))})`,
      'repeating-linear-gradient(0deg, rgba(255,255,255,.045) 0 1px, rgba(255,255,255,0) 1px 3px)',
      'repeating-linear-gradient(90deg, rgba(0,20,30,.07) 0 1px, rgba(0,20,30,0) 1px 3px)',
      'linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,0) 40%, rgba(0,0,0,.06))',
    ].join(','),
  });

  // ---- the touch point (a finger, without drawing a hand) -------------------------------------------
  // A translucent grey disc with a white rim. tapAt(): appears, presses (ring expands), lifts.
  SS.D.touch = (parent, size = 96) => {
    const el = SS.el('div', 'a3', parent);
    Object.assign(el.style, { width: size + 'px', height: size + 'px', borderRadius: '50%' });
    const disc = SS.el('div', 'a3', el);
    Object.assign(disc.style, { width: size + 'px', height: size + 'px', borderRadius: '50%', background: 'rgba(40,58,62,.20)',
      boxShadow: 'inset 0 0 0 3px rgba(255,255,255,.95), 0 6px 16px -6px rgba(10,40,48,.35)' });
    const ring = SS.el('div', 'a3', el);
    Object.assign(ring.style, { width: size + 'px', height: size + 'px', borderRadius: '50%', boxShadow: 'inset 0 0 0 3px rgba(31,191,168,.85)' });
    gsap.set(el, { autoAlpha: 0, scale: 1.3, xPercent: -50, yPercent: -50 });
    gsap.set(ring, { autoAlpha: 0, scale: 1 });
    return { el, disc, ring };
  };
  SS.D.tapAt = (tp, x, y, at, o = {}) => {
    const pre = o.pre || 0.16;
    gsap.set(tp.el, { x, y });
    SS.tl.fromTo(tp.el, { autoAlpha: 0, scale: 1.3 }, { autoAlpha: 1, scale: 1, duration: pre, ease: SS.EZ.out }, at - pre);
    SS.tl.fromTo(tp.el, { scale: 1 }, { scale: 0.86, duration: 0.08, ease: 'power2.out' }, at);
    SS.tl.fromTo(tp.ring, { autoAlpha: 0.9, scale: 1 }, { autoAlpha: 0, scale: 1.9, duration: 0.5, ease: SS.EZ.out }, at);
    SS.tl.fromTo(tp.el, { autoAlpha: 1, scale: 0.86 }, { autoAlpha: 0, scale: 1.08, duration: 0.24, ease: 'power1.out' }, at + (o.hold || 0.14));
  };

  // ---- a light phone (frame, screen, island) -------------------------------------------------------
  SS.D.phone = (parent, o = {}) => {
    const W = 820, H = 1700;
    const el = SS.el('div', 'dm', parent);
    Object.assign(el.style, { width: W + 'px', height: H + 'px', borderRadius: '112px', background: 'linear-gradient(160deg,#FDFEFE,#EEF4F4)',
      boxShadow: '0 2px 4px rgba(18,44,40,.10), 0 60px 100px -46px rgba(18,74,66,.50), 0 0 0 2px #D5E0DF, inset 0 0 0 2px #fff, inset 0 0 0 9px #E7EEEE' });
    const scr = SS.el('div', 'dm', el);
    Object.assign(scr.style, { left: '18px', top: '18px', width: W - 36 + 'px', height: H - 36 + 'px', borderRadius: '96px', overflow: 'hidden',
      background: o.wall || 'linear-gradient(170deg,#F4FCFB 0%,#E2F4F1 60%,#D3EEEA 100%)' });
    const island = SS.el('div', 'dm', el);
    Object.assign(island.style, { left: W / 2 - 80 + 'px', top: '40px', width: '160px', height: '44px', borderRadius: '22px', background: '#151515' });
    return { el, scr, island, W, H };
  };
  // a text-message bubble (left = received, right = sent)
  SS.D.bubble = (parent, txt, o = {}) => {
    const el = SS.el('div', 'dm', parent);
    Object.assign(el.style, { maxWidth: (o.max || 660) + 'px', width: 'max-content', padding: '24px 32px', borderRadius: '38px',
      fontSize: (o.size || 38) + 'px', fontWeight: 500, lineHeight: 1.28, letterSpacing: '-.01em', whiteSpace: 'normal',
      background: o.bg || '#E9EFEF', color: o.fg || SS.DC.ink, boxSizing: 'border-box' });
    el.innerHTML = txt;
    return el;
  };

  // ---- headlines in Instrument Sans ------------------------------------------------------------------
  SS.D.title = (layer, src, y, inAt, outAt, opt = {}) => {
    const T = SS.text(layer, src, Object.assign({ size: 104, weight: 700, color: SS.DC.ink, accent: SS.DC.teal, maxW: 940,
      tracking: -0.035, lh: 1.02, cls: 'dm-ttl' }, opt));
    SS.place(T.el, 540, y);
    if (inAt == null) gsap.set(T.words.map((w) => w.el), { yPercent: 0 });
    else {
      // choreography (skill choreograph): no metronome stagger. Word starts follow an ease-out spread, so the
      // gaps shrink along the line (a wave, not a queue); the accent word is the lead: it lands last, slower.
      SS.hideWords(T);
      const n = T.words.length, spread = opt.punch ? 0.1 : Math.min(0.42, 0.065 * (n - 1));
      T.words.forEach((w, i) => {
        const u = n > 1 ? i / (n - 1) : 0, lead = !!w.el.style.color;
        const at = inAt + spread * (1 - (1 - u) * (1 - u)) + (lead && !opt.punch ? 0.04 : 0);
        const dur = opt.punch ? 0.45 : (opt.dur || 0.7) + (lead ? 0.12 : 0);
        SS.tl.fromTo(w.el, { yPercent: SS.HIDE }, { yPercent: 0, duration: dur, ease: SS.EZ.out }, +at.toFixed(4));
      });
    }
    if (outAt != null) SS.wordsOut(T, outAt, { st: 0.02 });
    return T;
  };
})();
