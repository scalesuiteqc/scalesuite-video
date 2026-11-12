/* Scene 3 · La vitesse (8,2 – 13,0 s).
   « Rappelle en [5 minutes], » is typed small and centred, then lifts while the giant « 100× » rolls in
   like a mechanical counter (vertical motion blur, halo opening when it stops). The second line is
   typed underneath. Source at the bottom of the frame.
   Content rule: the 100× is about the odds of REACHING the lead (5 minutes against 30), never a sale. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  const T = {
    type: 0.05, cps: 26,      // first line
    lift: 0.95, liftDur: 0.45, // the line moves up, out of the way of the counter
    fig: 1.3, roll: 1.05,     // the counter
    x: 2.08,                  // « × » springs in
    halo: 2.12,
    src: 2.3,
    sub: 2.5, subCps: 36,     // second line
    out: 4.52, outDur: 0.28,
  };
  const L = Q.pick(
    { line: 64, lineY0: 540, lineY1: 262, fig: 380, figY: 520, sub: 56, subY: 792, src: 24, srcY: 922, halo: [1500, 760] },
    { line: 60, lineY0: 800, lineY1: 520, fig: 330, figY: 780, sub: 50, subY: 1040, src: 26, srcY: 1340, halo: [1100, 760] },
  );
  const SRC = Q.pick(
    ['Lead Response Management Study, MIT et InsideSales, 2007.', 'Comparaison 5 minutes contre 30 minutes. Demandes Web, tous secteurs.'],
    ['Lead Response Management Study,', 'MIT et InsideSales, 2007. Comparaison 5 minutes', 'contre 30 minutes. Demandes Web, tous secteurs.'],
  );

  let R;
  function build(layer) {
    Q.night(layer);
    const box = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 48%' });
    const halo = Q.halo(box, L.halo[0], L.halo[1]);
    const line = Q.typed(box, [{ t: 'Rappelle en ' }, { t: '5 minutes', chip: true }, { t: ',' }], { size: L.line });
    const fig = Q.figure(box, { digits: '100', size: L.fig, turns: [1, 2, 3], tail: '×',
      tailCss: { fontSize: '.74em', alignSelf: 'center', marginLeft: '.03em', fontWeight: 700 } });
    const sub = Q.typed(box, [{ t: 'plus de chances de joindre le vendeur.' }], { size: L.sub });
    const src = Q.src(box, SRC, L.src);
    R = { box, halo, line, fig, sub, src };
  }

  function render(u) {
    const out = Q.k(u, T.out, T.outDur, Q.E.in);
    R.box.style.transform = `scale(${Q.lerp(1, 0.94, out).toFixed(4)})`;
    R.box.style.opacity = (1 - out).toFixed(3);
    R.box.style.filter = out > 0.004 ? `blur(${(out * 18).toFixed(2)}px)` : 'none';

    const n = Q.typeN(u, T.type, T.cps, R.line.N);
    const y = Q.lerp(L.lineY0, L.lineY1, Q.k(u, T.lift, T.liftDur, Q.E.inOut));
    R.line.put(n, Q.CX, y, { o: u >= T.type - 0.02 ? 1 : 0, caret: Q.caretOn(u, T.type, T.cps, R.line.N, T.lift + 0.1) });

    const fin = Q.k(u, T.fig, 0.5, Q.E.out);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.86, 1, fin), o: Q.k(u, T.fig, 0.16, Q.E.sine), blur: (1 - Q.k(u, T.fig, 0.3, Q.E.out)) * 10 });
    R.fig.roll(u, T.fig, T.roll, 0.06);
    const kx = Q.k(u, T.x, 0.5, Q.E.springHi);
    R.fig.tail.style.transform = `rotate(${((1 - kx) * -90).toFixed(2)}deg) scale(${Q.lerp(0.2, 1, kx).toFixed(4)})`;
    R.fig.tail.style.opacity = Q.k(u, T.x, 0.1, Q.E.sine).toFixed(3);

    const hk = Q.k(u, T.halo, 0.8, Q.E.out);
    Q.st(R.halo, { x: Q.CX, y: L.figY, s: Q.lerp(0.55, 1, hk) * (1 + 0.03 * Math.sin((u - T.halo) * 2.4)), o: hk * 0.9 });

    const m = Q.typeN(u, T.sub, T.subCps, R.sub.N);
    R.sub.put(m, Q.CX, L.subY, { o: u >= T.sub - 0.02 ? 1 : 0, caret: Q.caretOn(u, T.sub, T.subCps, R.sub.N) });
    Q.st(R.src, { x: Q.CX, y: L.srcY, o: Q.k(u, T.src, 0.5, Q.E.sine) * 0.6 });
  }

  QR.scene({ id: 's3', build, render });
})();
