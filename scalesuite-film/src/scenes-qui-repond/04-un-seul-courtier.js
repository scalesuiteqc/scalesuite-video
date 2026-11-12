/* Scene 4 · Un seul courtier (11 beats, 12,22 – 18,33 s). Three shots, one message at a time:
   a) giant « 81 % » + « des vendeurs ne contactent [qu’un seul courtier]. » + source (4 beats) ;
   b) « Ce courtier là, ce devrait être toi. » alone (3 beats) ;
   c) « Attends 30 minutes, et [il est passé à autre chose]. » while the Sainte Julie request card
      loses its colour, fades and disappears (4 beats).
   Content rule: the 81 % counts how many agents a seller contacts. It says nothing about speed. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR, b = QR.b;

  const T = {
    // a)
    fig: 0.02, land: b(1),            // the counter stops on beat 1, with the « % »
    sub: b(1), subChip: b(2), src: b(1),
    aOut: b(4) - 0.24, aOutDur: 0.22,
    // b)
    b: b(4), bOut: b(7) - 0.22, bOutDur: 0.2,
    // c)
    card: b(6.5),                     // the request card comes back while the previous line leaves
    c: b(7), cChip: b(8),             // the card starts fading when the chip unfolds
    fade: 0.85,
    cOut: b(11) - 0.24, cOutDur: 0.22,
  };
  const L = Q.pick(
    { fig: 380, figY: 436, sub: 56, subY: 736, src: 24, srcY: 918, halo: [1400, 760], b: 76, bY: 540, c: 56, cY: 396, cardX: 960, cardY: 628, cardS: 1.3 },
    { fig: 330, figY: 700, sub: 50, subY: 960, src: 26, srcY: 1340, halo: [1100, 760], b: 62, bY: 800, c: 50, cY: 640, cardX: 540, cardY: 900, cardS: 1.5 },
  );

  let R;
  function build(layer) {
    Q.night(layer);
    const a = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 46%' });
    const halo = Q.halo(a, L.halo[0], L.halo[1]);
    const fig = Q.figure(a, { digits: '81', size: L.fig, turns: [1, 2], tail: '%',
      tailCss: { fontSize: '.6em', alignSelf: 'flex-end', marginLeft: '.2em', marginBottom: '.135em', fontWeight: 700, lineHeight: 1 } });
    const sub = Q.phrase(a, [[{ t: 'des vendeurs ne contactent' }, { t: 'qu’un seul courtier.', chip: true }]], { size: L.sub, weight: 600 });
    const src = Q.src(a, ['NAR, 2025 Home Buyers and Sellers Generational Trends, États Unis.'], L.src);
    const pb = Q.phrase(layer, [[{ t: 'Ce courtier là, ce devrait être toi.' }]], { size: L.b, weight: 600 });
    const pc = Q.phrase(layer, [[{ t: 'Attends 30 minutes, et' }, { t: 'il est passé à autre chose.', chip: true }]], { size: L.c, weight: 600 });
    const card = Q.card(layer, { title: 'Évaluation', city: 'Sainte Julie' });
    R = { a, halo, fig, sub, src, pb, pc, card };
  }

  function render(u) {
    // ---- a) 81 %
    const ao = Q.k(u, T.aOut, T.aOutDur, Q.E.in);
    R.a.style.transform = `scale(${Q.lerp(1, 0.94, ao).toFixed(4)})`;
    R.a.style.opacity = (1 - ao).toFixed(3);
    R.a.style.visibility = ao >= 0.999 ? 'hidden' : 'visible';
    R.a.style.filter = ao > 0.004 ? `blur(${(ao * 18).toFixed(2)}px)` : 'none';
    const fin = Q.k(u, T.fig, 0.36, Q.E.out), land = Q.env(u, T.land - 0.02, 0.06, T.land + 0.04, 0.25);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.86, 1, fin) * (1 + 0.035 * land), o: Q.k(u, T.fig, 0.12, Q.E.sine), blur: (1 - Q.k(u, T.fig, 0.24, Q.E.out)) * 10 });
    R.fig.roll(u, T.fig, (T.land - T.fig) / 0.86, 0.04);
    const kp = Q.k(u, T.land, 0.4, Q.E.spring);
    R.fig.tail.style.transform = `scale(${Q.lerp(0.3, 1, kp).toFixed(4)})`;
    R.fig.tail.style.opacity = Q.k(u, T.land, 0.08, Q.E.sine).toFixed(3);
    const hk = Q.k(u, T.land, 0.7, Q.E.out);
    Q.st(R.halo, { x: Q.CX, y: L.figY, s: Q.lerp(0.55, 1, hk) * (1 + 0.03 * Math.sin((u - T.land) * 2.4)), o: hk * 0.9 });
    R.sub.put(Q.CX, L.subY, u, { at: [T.sub], chip: T.subChip });
    const ks = Q.k(u, T.src, 0.4, Q.E.out);
    Q.st(R.src, { x: Q.CX, y: L.srcY + (1 - ks) * 14, o: Q.k(u, T.src, 0.3, Q.E.sine) * 0.6 });

    // ---- b) « Ce courtier là, ce devrait être toi. »
    R.pb.put(Q.CX, L.bY, u, { at: [T.b], out: T.bOut, outDur: T.bOutDur });

    // ---- c) « Attends 30 minutes… » and the card that fades away
    R.pc.put(Q.CX, L.cY, u, { at: [T.c], chip: T.cChip, out: T.cOut, outDur: T.cOutDur });
    const kin = Q.k(u, T.card, 0.46, Q.E.spring), gone = Q.k(u, T.cChip, T.fade, Q.E.inOut);
    Q.st(R.card, { x: L.cardX, y: L.cardY + (1 - kin) * 50 + gone * 10, r: (1 - kin) * -5, s: L.cardS * Q.lerp(0.7, 1, kin) * Q.lerp(1, 0.96, gone),
      o: Q.k(u, T.card, 0.14, Q.E.sine) * (1 - Q.k(u, T.cChip + 0.18, T.fade - 0.18, Q.E.inOut)) });
    const bl = (1 - Q.k(u, T.card, 0.28, Q.E.out)) * 12 + gone * 9;
    R.card.style.filter = `grayscale(${Math.min(1, gone * 2.2).toFixed(3)})` + (bl > 0.05 ? ` blur(${bl.toFixed(2)}px)` : '');
  }

  QR.scene({ id: 's4', build, render, cuts: [0, T.land, T.b, T.c] });
})();
