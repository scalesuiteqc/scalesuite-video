/* Scene 3 · La vitesse (7 beats, 8,33 – 12,22 s).
   « Rappelle en [5 minutes], » arrives word by word, then lifts while the giant « 100× » rolls in like
   a mechanical counter and stops ON the beat (vertical motion blur, halo opening). The second line
   arrives underneath. Source at the bottom of the frame.
   Content rule: the 100× is about the odds of REACHING the lead (5 minutes against 30), never a sale. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR, b = QR.b;

  const T = {
    line: b(0), chip: b(1),          // first line, its chip
    lift: b(1) - 0.16, liftDur: 0.4, // the line moves up, out of the way of the counter
    fig: b(1), land: b(3),           // the counter starts, and stops on beat 3 with the « × »
    sub: b(4), src: b(4),            // second line, source
    out: b(7) - 0.26, outDur: 0.26,
  };
  const L = Q.pick(
    { line: 64, lineY0: 540, lineY1: 262, fig: 380, figY: 520, sub: 56, subY: 792, src: 24, srcY: 918, halo: [1500, 760] },
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
    const line = Q.phrase(box, [[{ t: 'Rappelle en' }, { t: '5 minutes', chip: true }, { t: ',', glue: true }]], { size: L.line, weight: 600 });
    const fig = Q.figure(box, { digits: '100', size: L.fig, turns: [1, 2, 3], tail: '×',
      tailCss: { fontSize: '.74em', alignSelf: 'center', marginLeft: '.06em', fontWeight: 700 } });
    const sub = Q.phrase(box, [[{ t: 'plus de chances de joindre le vendeur.' }]], { size: L.sub, weight: 600 });
    const src = Q.src(box, SRC, L.src);
    R = { box, halo, line, fig, sub, src };
  }

  function render(u) {
    const out = Q.k(u, T.out, T.outDur, Q.E.in);
    R.box.style.transform = `scale(${Q.lerp(1, 0.94, out).toFixed(4)})`;
    R.box.style.opacity = (1 - out).toFixed(3);
    R.box.style.filter = out > 0.004 ? `blur(${(out * 18).toFixed(2)}px)` : 'none';

    const y = Q.lerp(L.lineY0, L.lineY1, Q.k(u, T.lift, T.liftDur, Q.E.inOut));
    R.line.put(Q.CX, y, u, { at: [T.line], chip: T.chip });

    const fin = Q.k(u, T.fig, 0.4, Q.E.out), land = Q.env(u, T.land - 0.02, 0.06, T.land + 0.04, 0.25);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.86, 1, fin) * (1 + 0.035 * land), o: Q.k(u, T.fig, 0.14, Q.E.sine), blur: (1 - Q.k(u, T.fig, 0.26, Q.E.out)) * 10 });
    R.fig.roll(u, T.fig, (T.land - T.fig) / 0.86, 0.05);
    const kx = Q.k(u, T.land, 0.42, Q.E.springHi);
    R.fig.tail.style.transform = `rotate(${((1 - kx) * -90).toFixed(2)}deg) scale(${Q.lerp(0.2, 1, kx).toFixed(4)})`;
    R.fig.tail.style.opacity = Q.k(u, T.land, 0.08, Q.E.sine).toFixed(3);
    const hk = Q.k(u, T.land, 0.7, Q.E.out);
    Q.st(R.halo, { x: Q.CX, y: L.figY, s: Q.lerp(0.55, 1, hk) * (1 + 0.03 * Math.sin((u - T.land) * 2.4)), o: hk * 0.9 });

    R.sub.put(Q.CX, L.subY, u, { at: [T.sub] });
    const ks = Q.k(u, T.src, 0.4, Q.E.out);
    Q.st(R.src, { x: Q.CX, y: L.srcY + (1 - ks) * 14, o: Q.k(u, T.src, 0.3, Q.E.sine) * 0.6 });
  }

  QR.scene({ id: 's3', build, render, cuts: [0, T.land] });
})();
