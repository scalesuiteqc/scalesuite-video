/* Scene 4 · Un seul courtier. The voice: « 79 % des vendeurs ne contactent qu'un seul courtier. Ce courtier
   là, ce devrait être toi. … Attends trente minutes, pis il est passé à autre chose. »
   Three shots, one idea at a time, every arrival on its word:
   a) « 79 % » (appears ON the figure, settles within the word) + « des vendeurs ne contactent
      [qu’un seul courtier.] » + source ;
   b) « Ce courtier là, ce devrait être toi. » alone ;
   c) « Attends 30 minutes, et [il est passé à autre chose.] » while the Sainte Julie request card loses
      its colour and disappears.
   Content rule: the 79 % counts how many agents a seller contacts. It says nothing about speed. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s4', w, QR.cue('s4', w));

  const T = {
    fig: cue('n79'), sub: cue('desVendeurs'), one: cue('unSeul'),
    b: cue('ceCourtier'), you: cue('toi'),
    c: cue('attends'), gone: cue('passe'),
    fade: 0.8,
  };
  T.land = T.fig + 0.42; T.aOut = T.b - 0.2; T.bOut = T.c - 0.22; T.card = T.c - 0.25; T.cOut = QR.DUR.s4 - 0.2;
  const L = Q.pick(
    { fig: 400, figY: 430, sub: 60, subY: 744, src: 24, srcY: 928, b: 84, bY: 540, c: 60, cY: 396, cardX: 960, cardY: 640, cardS: 1.4 },
    { fig: 330, figY: 700, sub: 46, subY: 960, src: 26, srcY: 1340, b: 60, bY: 800, c: 46, cY: 640, cardX: 540, cardY: 900, cardS: 1.5 },
  );

  let R;
  function build(layer) {
    Q.night(layer);
    const a = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 46%' });
    const fig = Q.figure(a, { digits: '79', size: L.fig, turns: [1, 2], tail: '%',
      tailCss: { fontSize: '.6em', alignSelf: 'flex-end', marginLeft: '.2em', marginBottom: '.135em', fontWeight: 700, lineHeight: 1 } });
    const sub = Q.phrase(a, [[{ t: 'des vendeurs ne contactent' }, { t: 'qu’un seul courtier.', chip: true, g: 1 }]], { size: L.sub, weight: 700 });
    const src = Q.src(a, ['NAR, Profile of Home Buyers and Sellers 2026, États Unis.'], L.src);
    const pb = Q.phrase(layer, [[{ t: 'Ce courtier là,' }, { t: 'ce devrait être' }, { t: 'toi.', g: 1 }]], { size: L.b, weight: 750 });
    const pc = Q.phrase(layer, [[{ t: 'Attends 30 minutes, et' }, { t: 'il est passé à autre chose.', chip: true, g: 1 }]], { size: L.c, weight: 700 });
    const card = Q.card(layer, { title: 'Évaluation', city: 'Sainte Julie' });
    R = { a, fig, sub, src, pb, pc, card };
  }

  function render(u) {
    const ao = Q.k(u, T.aOut, 0.2, Q.E.in);
    R.a.style.transform = `scale(${Q.lerp(1, 0.95, ao).toFixed(4)})`;
    R.a.style.opacity = (1 - ao).toFixed(3);
    R.a.style.visibility = ao >= 0.999 ? 'hidden' : 'visible';
    R.a.style.filter = ao > 0.004 ? `blur(${(ao * 16).toFixed(2)}px)` : 'none';
    const fin = Q.k(u, T.fig, 0.3, Q.E.out), land = Q.env(u, T.land - 0.02, 0.06, T.land + 0.04, 0.25);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.88, 1, fin) * (1 + 0.03 * land), o: Q.k(u, T.fig, 0.1, Q.E.sine), blur: (1 - Q.k(u, T.fig, 0.2, Q.E.out)) * 10 });
    R.fig.roll(u, T.fig, (T.land - T.fig) / 0.86, 0.04);
    const kp = Q.k(u, T.land, 0.34, Q.E.springSoft);
    R.fig.tail.style.transform = `scale(${Q.lerp(0.3, 1, kp).toFixed(4)})`;
    R.fig.tail.style.opacity = Q.k(u, T.land, 0.08, Q.E.sine).toFixed(3);
    R.sub.put(Q.CX, L.subY, u, { at: [T.sub, T.one], chip: T.one });
    const ks = Q.k(u, T.sub, 0.4, Q.E.out);
    Q.st(R.src, { x: Q.CX, y: L.srcY + (1 - ks) * 14, o: Q.k(u, T.sub, 0.3, Q.E.sine) * 0.6 });

    R.pb.put(Q.CX, L.bY, u, { at: [T.b, T.you], out: T.bOut, outDur: 0.2 });

    R.pc.put(Q.CX, L.cY, u, { at: [T.c, T.gone], chip: T.gone, out: T.cOut, outDur: 0.2 });
    const kin = Q.k(u, T.card, 0.42, Q.E.springSoft), gone = Q.k(u, T.gone, T.fade, Q.E.inOut);
    Q.st(R.card, { x: L.cardX, y: L.cardY + (1 - kin) * 50 + gone * 10, r: (1 - kin) * -4, s: L.cardS * Q.lerp(0.8, 1, kin) * Q.lerp(1, 0.96, gone),
      o: Q.k(u, T.card, 0.14, Q.E.sine) * (1 - Q.k(u, T.gone + 0.15, T.fade - 0.15, Q.E.inOut)) });
    const bl = (1 - Q.k(u, T.card, 0.26, Q.E.out)) * 12 + gone * 9;
    R.card.style.filter = `grayscale(${Math.min(1, gone * 2.2).toFixed(3)})` + (bl > 0.05 ? ` blur(${bl.toFixed(2)}px)` : '');
  }

  QR.scene({ id: 's4', build, render, cuts: [0, T.b, T.c] });
})();
