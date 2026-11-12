/* Scene 5 · Révélation (20,2 – 23,4 s).
   Giant « Voici » in the logo gradient (turquoise to blue), a radial pulse of concentric rings, the
   ScaleSuite logo, then « Système Vendeurs 5 minutes » typed underneath.
   Exit: a pale turquoise disc opens from the centre until it covers the frame. It is the exact
   backdrop of scene 6, so the cut to the light scenes is seamless. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  const T = {
    dot: 0.0,                 // a turquoise point is born in the dark
    word: 0.08, wordDur: 0.45, // « Voici » comes into focus
    burst: 0.82,              // it bursts into rings
    rings: [0.82, 0.94, 1.06], ringDur: 0.9,
    mark: 1.0, markDur: 0.7,  // logo mark wipe
    letters: 1.16,            // wordmark letters rise
    sheen: 1.75,
    name: 1.62, nameCps: 38,  // « Système Vendeurs 5 minutes »
    open: 2.72, openDur: 0.48, // the light opens
  };
  const L = Q.pick(
    { word: 440, y: 520, logoH: 190, logoY: 470, name: 60, nameY: 670, ring: 420 },
    { word: 300, y: 860, logoH: 110, logoY: 840, name: 46, nameY: 980, ring: 380 },
  );

  // Shared with scene 9: light opening from the centre (the disc carries the day backdrop)
  Q.lightDisc = (layer) => {
    const disc = Q.div(layer, 'layer');
    Q.day(disc);
    const ring = Q.div(layer, 'qr-abs', { width: '200px', height: '200px', borderRadius: '50%', boxSizing: 'border-box', border: `10px solid ${Q.C.turq}` });
    const R = Math.hypot(Q.W, Q.H) / 2 + 30;
    return {
      set(k) {
        const rad = k * R;
        disc.style.clipPath = `circle(${rad.toFixed(2)}px at 50% 50%)`;
        disc.style.visibility = k <= 0.0005 ? 'hidden' : 'visible';
        Q.st(ring, { x: Q.CX, y: Q.CY, s: Math.max(0.001, rad / 100), o: k <= 0.0005 || k >= 0.999 ? 0 : 0.9 * (1 - k) });
      },
    };
  };

  let R;
  function build(layer) {
    Q.night(layer);
    const glow = Q.div(layer, 'qr-abs', { width: L.word * 3.2 + 'px', height: L.word * 0.9 + 'px', filter: 'blur(60px)',
      background: 'radial-gradient(closest-side, rgba(63,211,198,.85) 0%, rgba(47,176,222,.38) 55%, rgba(47,176,222,0) 100%)' });
    const word = Q.div(layer, 'qr-abs', { fontSize: L.word + 'px', fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1.1, whiteSpace: 'nowrap', padding: '0 .08em',
      backgroundImage: `linear-gradient(96deg, #3FE0CD 0%, ${Q.C.logoA} 28%, ${Q.C.logoB} 60%, ${Q.C.blue} 100%)`, webkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' });
    word.textContent = 'Voici';
    const dot = Q.div(layer, 'qr-abs', { width: '44px', height: '44px', borderRadius: '50%', background: Q.C.turq, boxShadow: '0 0 60px rgba(63,211,198,.8)' });
    const rings = T.rings.map(() => Q.div(layer, 'qr-abs', { width: L.ring + 'px', height: L.ring + 'px', borderRadius: '50%', boxSizing: 'border-box',
      border: `${Math.round(L.ring * 0.11)}px solid ${Q.C.turq}` }));
    const lbox = Q.div(layer, 'qr-abs');
    const logo = SS.logo(lbox, L.logoH, { dark: true });
    Object.assign(lbox.style, { width: logo.w + 'px', height: logo.h + 'px' });
    const name = Q.typed(layer, [{ t: 'Système Vendeurs ' }, { t: '5 minutes', chip: true }], { size: L.name, weight: 620 });
    const light = Q.lightDisc(layer);
    R = { glow, word, dot, rings, lbox, logo, name, light };
  }

  function render(u) {
    // « Voici »
    const kin = Q.k(u, T.word, T.wordDur, Q.E.out), grow = Q.k(u, T.word, T.burst - T.word + 0.2, Q.E.sine), burst = Q.k(u, T.burst, 0.26, Q.E.in);
    Q.st(R.word, { x: Q.CX, y: L.y, s: Q.lerp(0.72, 1, kin) * (1 + 0.07 * grow) * Q.lerp(1, 1.7, burst), o: Q.k(u, T.word, 0.16, Q.E.sine) * (1 - burst), blur: (1 - kin) * 26 + burst * 30 });
    Q.st(R.glow, { x: Q.CX, y: L.y + L.word * 0.32, s: Q.lerp(0.6, 1, kin) * Q.lerp(1, 1.5, burst), o: kin * 0.85 * (1 - burst) });
    const kd = Q.k(u, T.dot, 0.2, Q.E.spring);
    Q.st(R.dot, { x: Q.CX, y: L.y, s: kd * Q.lerp(1, 4, Q.k(u, T.word, 0.2, Q.E.out)), o: kd * (1 - Q.k(u, T.word, 0.2, Q.E.sine)) });
    // radial pulse
    R.rings.forEach((r, i) => {
      const k = Q.k(u, T.rings[i], T.ringDur, Q.E.out), v = Q.k(u, T.rings[i], T.ringDur, Q.E.out) - Q.k(u - 1 / 60, T.rings[i], T.ringDur, Q.E.out);
      Q.st(r, { x: Q.CX, y: L.y, s: Q.lerp(0.08, 5.6 - i * 0.5, k), o: u < T.rings[i] ? 0 : (1 - Q.k(u, T.rings[i] + 0.1, T.ringDur - 0.1, Q.E.sine)) * 0.85, blur: Math.min(14, v * 220) });
    });
    // logo, name
    const out = Q.k(u, T.open + 0.1, 0.3, Q.E.sine);
    Q.st(R.lbox, { x: Q.CX, y: L.logoY, s: Q.lerp(0.9, 1, Q.k(u, T.mark, 0.7, Q.E.out)), o: u >= T.mark ? 1 : 0 });
    R.logo.mark(Q.clamp((u - T.mark) / T.markDur));
    R.logo.word(u, T.letters, 0.035, 0.55);
    R.logo.sheen(Q.clamp((u - T.sheen) / 0.6));
    R.name.put(Q.typeN(u, T.name, T.nameCps, R.name.N), Q.CX, L.nameY, { o: u >= T.name - 0.02 ? 1 : 0, caret: Q.caretOn(u, T.name, T.nameCps, R.name.N, T.open) });
    // the light opens
    R.light.set(Q.k(u, T.open, T.openDur, Q.E.inOut) * (out >= 0 ? 1 : 1));
  }

  QR.scene({ id: 's5', build, render });
})();
