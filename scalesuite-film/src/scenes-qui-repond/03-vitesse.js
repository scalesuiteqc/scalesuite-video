/* Scene 3 · La vitesse. The voice: « Rappelle en cinq minutes plutôt qu'en trente, pis t'as cent fois plus
   de chances de joindre le vendeur. »
   On screen: « Rappelle en [5 minutes] plutôt qu’en 30, » · « 100× » · « plus de chances de joindre le
   vendeur. » The counter starts on « plutôt » and STOPS on « cent ». No halo: the figure sits on the dark.
   Content rule: the comparison « plutôt qu’en 30 » is ON SCREEN (without it the claim misleads), and the
   100× is about the odds of REACHING the lead, never a sale. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s3', w, QR.cue('s3', w));

  const T = {
    line: cue('rappelle'), five: cue('cinqMinutes'), rather: cue('plutot'),
    land: cue('cent'),                  // the counter stops, the « × » lands
    sub: cue('plusDeChances'),
    out: QR.DUR.s3 - 0.2, outDur: 0.2,
  };
  T.fig = T.rather + 0.25; T.lift = T.rather + 0.1; T.liftDur = 0.4; T.src = T.sub;
  const L = Q.pick(
    { line: 66, lineY0: 540, lineY1: 250, fig: 400, figY: 520, sub: 60, subY: 806, src: 24, srcY: 928 },
    { line: 52, lineY0: 800, lineY1: 520, fig: 280, figY: 700, sub: 50, subY: 1040, src: 22, srcY: 1000 },
  );
  const SRC = Q.pick(
    ['Oldroyd et InsideSales.com, Lead Response Management Study, 2007.', 'Plus de 15 000 demandes Web, tous secteurs.'],
    ['Oldroyd et InsideSales.com,', 'Lead Response Management Study, 2007.', 'Plus de 15 000 demandes Web, tous secteurs.'],
  );

  let R;
  function build(layer) {
    Q.night(layer);
    const box = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 48%' });
    const line = Q.phrase(box, [[{ t: 'Rappelle en' }, { t: '5 minutes', chip: true, g: 1 }, { t: 'plutôt qu’en 30,', g: 2 }]], { size: L.line, weight: 700 });
    const fig = Q.figure(box, { digits: '100', size: L.fig, turns: [1, 2, 3], tail: '×',
      tailCss: { fontSize: '.74em', alignSelf: 'center', marginLeft: '.06em', fontWeight: 700 } });
    const sub = Q.phrase(box, [[{ t: 'plus de chances de joindre le vendeur.' }]], { size: L.sub, weight: 700 });
    const src = Q.src(box, SRC, L.src);
    R = { box, line, fig, sub, src };
  }

  function render(u) {
    const out = Q.k(u, T.out, T.outDur, Q.E.in);
    R.box.style.transform = `scale(${Q.lerp(1, 0.95, out).toFixed(4)})`;
    R.box.style.opacity = (1 - out).toFixed(3);
    R.box.style.filter = out > 0.004 ? `blur(${(out * 16).toFixed(2)}px)` : 'none';
    const y = Q.lerp(L.lineY0, L.lineY1, Q.k(u, T.lift, T.liftDur, Q.E.inOut));
    R.line.put(Q.CX, y, u, { at: [T.line, T.five, T.rather], chip: T.five });
    const fin = Q.k(u, T.fig, 0.36, Q.E.out), land = Q.env(u, T.land - 0.02, 0.06, T.land + 0.04, 0.25);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.88, 1, fin) * (1 + 0.03 * land), o: Q.k(u, T.fig, 0.12, Q.E.sine), blur: (1 - Q.k(u, T.fig, 0.24, Q.E.out)) * 10 });
    R.fig.roll(u, T.fig, (T.land - T.fig) / 0.86, 0.05);
    const kx = Q.k(u, T.land, 0.36, Q.E.springSoft);
    R.fig.tail.style.transform = `rotate(${((1 - kx) * -90).toFixed(2)}deg) scale(${Q.lerp(0.2, 1, kx).toFixed(4)})`;
    R.fig.tail.style.opacity = Q.k(u, T.land, 0.08, Q.E.sine).toFixed(3);
    R.sub.put(Q.CX, L.subY, u, { at: [T.sub] });
    const ks = Q.k(u, T.src, 0.4, Q.E.out);
    Q.st(R.src, { x: Q.CX, y: L.srcY + (1 - ks) * 14, o: Q.k(u, T.src, 0.3, Q.E.sine) * 0.6 });
  }

  QR.scene({ id: 's3', build, render, cuts: [0, T.land] });
})();
