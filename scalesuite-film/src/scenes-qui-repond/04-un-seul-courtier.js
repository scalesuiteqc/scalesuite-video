/* Scene 4 · Un seul courtier (13,0 – 20,2 s). Three beats, one message on screen at a time:
   a) giant « 81 % » + « des vendeurs ne contactent [qu’un seul courtier]. » + source ;
   b) « Ce courtier là, ce devrait être toi. » alone ;
   c) « Attends 30 minutes, et [il est passé à autre chose]. » while the Sainte Julie request card
      loses its colour, fades and disappears.
   Content rule: the 81 % counts how many agents a seller contacts. It says nothing about speed. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  const T = {
    // a)
    fig: 0.05, roll: 0.85, pct: 0.66, halo: 0.72, src: 0.9,
    sub: 0.9, subCps: 50,
    aOut: 2.76, aOutDur: 0.26,
    // b)
    b: 3.05, bCps: 46, bOut: 4.6, bOutDur: 0.22,
    // c)
    c: 4.85, cCps: 46,
    card: 4.7,               // the request card comes back while the previous line leaves
    fadeAfterChip: 0.25,     // it starts fading shortly after the chip starts
    fade: 0.95,
    cOut: 6.92, cOutDur: 0.26,
  };
  const L = Q.pick(
    { fig: 380, figY: 436, sub: 56, subY: 736, src: 24, srcY: 928, halo: [1400, 760], b: 76, bY: 540, c: 56, cY: 396, cardX: 960, cardY: 628, cardS: 1.3 },
    { fig: 330, figY: 700, sub: 50, subY: 960, src: 26, srcY: 1340, halo: [1100, 760], b: 62, bY: 800, c: 50, cY: 640, cardX: 540, cardY: 900, cardS: 1.5 },
  );

  let R;
  function build(layer) {
    Q.night(layer);
    // a)
    const a = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 46%' });
    const halo = Q.halo(a, L.halo[0], L.halo[1]);
    const fig = Q.figure(a, { digits: '81', size: L.fig, turns: [1, 2], tail: '%',
      tailCss: { fontSize: '.6em', alignSelf: 'flex-end', marginLeft: '.16em', marginBottom: '.135em', fontWeight: 700, lineHeight: 1 } });
    const sub = Q.typed(a, [{ t: 'des vendeurs ne contactent ' }, { t: 'qu’un seul courtier', chip: true }, { t: '.' }], { size: L.sub });
    const src = Q.src(a, ['NAR, 2025 Home Buyers and Sellers Generational Trends, États Unis.'], L.src);
    // b)
    const b = Q.typed(layer, [{ t: 'Ce courtier là, ce devrait être toi.' }], { size: L.b });
    // c)
    const c = Q.typed(layer, [{ t: 'Attends 30 minutes, et ' }, { t: 'il est passé à autre chose', chip: true }, { t: '.' }], { size: L.c });
    const card = Q.card(layer, { title: 'Évaluation', city: 'Sainte Julie' });
    R = { a, halo, fig, sub, src, b, c, card, chipAt: 'Attends 30 minutes, et '.length };
  }

  function render(u) {
    // ---- a) 81 %
    const ao = Q.k(u, T.aOut, T.aOutDur, Q.E.in);
    R.a.style.transform = `scale(${Q.lerp(1, 0.94, ao).toFixed(4)})`;
    R.a.style.opacity = (1 - ao).toFixed(3);
    R.a.style.visibility = ao >= 0.999 ? 'hidden' : 'visible';
    R.a.style.filter = ao > 0.004 ? `blur(${(ao * 18).toFixed(2)}px)` : 'none';
    const fin = Q.k(u, T.fig, 0.5, Q.E.out);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.86, 1, fin), o: Q.k(u, T.fig, 0.16, Q.E.sine), blur: (1 - Q.k(u, T.fig, 0.3, Q.E.out)) * 10 });
    R.fig.roll(u, T.fig, T.roll, 0.07);
    const kp = Q.k(u, T.pct, 0.46, Q.E.spring);
    R.fig.tail.style.transform = `scale(${Q.lerp(0.3, 1, kp).toFixed(4)})`;
    R.fig.tail.style.opacity = Q.k(u, T.pct, 0.1, Q.E.sine).toFixed(3);
    const hk = Q.k(u, T.halo, 0.8, Q.E.out);
    Q.st(R.halo, { x: Q.CX, y: L.figY, s: Q.lerp(0.55, 1, hk) * (1 + 0.03 * Math.sin((u - T.halo) * 2.4)), o: hk * 0.9 });
    const n = Q.typeN(u, T.sub, T.subCps, R.sub.N);
    R.sub.put(n, Q.CX, L.subY, { o: u >= T.sub - 0.02 ? 1 : 0, caret: Q.caretOn(u, T.sub, T.subCps, R.sub.N) });
    Q.st(R.src, { x: Q.CX, y: L.srcY, o: Q.k(u, T.src, 0.5, Q.E.sine) * 0.6 });

    // ---- b) « Ce courtier là, ce devrait être toi. »
    const bo = Q.k(u, T.bOut, T.bOutDur, Q.E.in);
    R.b.put(Q.typeN(u, T.b, T.bCps, R.b.N), Q.CX, L.bY, { s: Q.lerp(1, 0.94, bo), o: (u >= T.b - 0.02 ? 1 : 0) * (1 - bo), blur: bo * 16, caret: Q.caretOn(u, T.b, T.bCps, R.b.N) });

    // ---- c) « Attends 30 minutes… » and the card that fades away
    const co = Q.k(u, T.cOut, T.cOutDur, Q.E.in);
    const m = Q.typeN(u, T.c, T.cCps, R.c.N);
    R.c.put(m, Q.CX, L.cY, { s: Q.lerp(1, 0.94, co), o: (u >= T.c - 0.02 ? 1 : 0) * (1 - co), blur: co * 16, caret: Q.caretOn(u, T.c, T.cCps, R.c.N) });
    const fadeAt = T.c + R.chipAt / T.cCps + T.fadeAfterChip;
    const kin = Q.k(u, T.card, 0.5, Q.E.spring), gone = Q.k(u, fadeAt, T.fade, Q.E.inOut);
    Q.st(R.card, { x: L.cardX, y: L.cardY + (1 - kin) * 50 + gone * 10, r: (1 - kin) * -5, s: L.cardS * Q.lerp(0.7, 1, kin) * Q.lerp(1, 0.96, gone),
      o: Q.k(u, T.card, 0.16, Q.E.sine) * (1 - Q.k(u, fadeAt + 0.2, T.fade - 0.2, Q.E.inOut)) });
    const bl = (1 - Q.k(u, T.card, 0.3, Q.E.out)) * 12 + gone * 9;
    R.card.style.filter = `grayscale(${Math.min(1, gone * 2.2).toFixed(3)})` + (bl > 0.05 ? ` blur(${bl.toFixed(2)}px)` : '');
  }

  QR.scene({ id: 's4', build, render });
})();
