/* Scene 8 · La preuve (40,4 – 44,6 s). Back in the dark.
   A mechanical counter rolls up to « 124 », then « demandes générées pour Groupe Mackay / en moins de
   7 mois. », then « [54 $] de budget Google Ads par demande en moyenne. ». Blurred request cards
   drift in the background.
   QR.OPT.clientName (00-timing.js): false replaces the client's name by « une de nos équipes clientes »
   (to use until Groupe Mackay has confirmed).
   Content rules: 54 $ is the Google Ads budget per request (paid to Google), not a ScaleSuite price.
   A past result for one client, no promise of volume.
   Exit: the light opens from the centre onto scene 9 (same transition as scene 5). */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  const T = {
    fig: 0.05, roll: 0.85, halo: 0.75,
    l1: 0.72, l2: 1.4, cps: 54,
    cost: 1.9, costCps: 54,
    open: 3.72,               // the light opens until the end of the scene
  };
  const L = Q.pick(
    { fig: 340, figY: 320, line: 56, l1Y: 566, l2Y: 640, cost: 50, costY: 782, halo: [1300, 700] },
    { fig: 300, figY: 640, line: 48, l1Y: 880, l2Y: 946, cost: 42, costY: 1080, halo: [1000, 700] },
  );
  const NAME = () => (QR.OPT.clientName ? 'pour Groupe Mackay' : 'pour une de nos équipes clientes');
  const BG = [ // background cards: x, y (fractions of the frame), scale, blur, rotation, drift phase
    [0.1, 0.2, 1.3, 13, -6, 0.2], [0.87, 0.16, 0.95, 9, 5, 1.4], [0.06, 0.74, 0.9, 9, 4, 2.3],
    [0.93, 0.7, 1.4, 14, -5, 3.1], [0.3, 0.93, 0.8, 8, -3, 4.2], [0.7, 0.95, 0.85, 8, 6, 5.0],
  ];
  const CITIES = [['Évaluation', 'Sainte Julie'], ['Vendre mon condo', 'Laval'], ['Maison à vendre', 'Lévis']];

  let R;
  function build(layer) {
    Q.night(layer);
    const cards = BG.map((b, i) => ({ el: Q.card(layer, { title: CITIES[i % 3][0], city: CITIES[i % 3][1], turq: i % 3 === 1 }), b }));
    Q.div(layer, 'layer', { background: 'radial-gradient(70% 70% at 50% 48%, rgba(7,13,20,.86) 0%, rgba(7,13,20,.5) 60%, rgba(7,13,20,.2) 100%)' });
    const box = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px' });
    const halo = Q.halo(box, L.halo[0], L.halo[1]);
    const fig = Q.figure(box, { digits: '124', size: L.fig, turns: [0, 1, 2] });
    const l1 = Q.typed(box, [{ t: 'demandes générées ' + NAME() }], { size: L.line });
    const l2 = Q.typed(box, [{ t: 'en moins de 7 mois.' }], { size: L.line });
    const cost = Q.typed(box, [{ t: '54 $', chip: true }, { t: ' de budget Google Ads par demande en moyenne.' }], { size: L.cost, weight: 560 });
    const light = Q.lightDisc(layer);
    R = { cards, halo, fig, l1, l2, cost, light };
  }

  function render(u) {
    R.cards.forEach((c, i) => {
      const [fx, fy, s, bl, r, ph] = c.b, k = Q.k(u, 0.05 + i * 0.05, 0.9, Q.E.out);
      Q.st(c.el, { x: fx * Q.W + Math.sin(u * 0.5 + ph) * 16, y: fy * Q.H + (1 - k) * 60 + Math.cos(u * 0.42 + ph) * 12 - u * 5 * s, r: r + Math.sin(u * 0.3 + ph) * 1.2, s, o: k * 0.42, blur: bl });
    });
    const fin = Q.k(u, T.fig, 0.5, Q.E.out);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.86, 1, fin), o: Q.k(u, T.fig, 0.16, Q.E.sine), blur: (1 - Q.k(u, T.fig, 0.3, Q.E.out)) * 10 });
    R.fig.roll(u, T.fig, T.roll, 0.07);
    const hk = Q.k(u, T.halo, 0.8, Q.E.out);
    Q.st(R.halo, { x: Q.CX, y: L.figY, s: Q.lerp(0.55, 1, hk) * (1 + 0.03 * Math.sin((u - T.halo) * 2.4)), o: hk * 0.9 });
    const n1 = Q.typeN(u, T.l1, T.cps, R.l1.N), n2 = Q.typeN(u, T.l2, T.cps, R.l2.N);
    R.l1.put(n1, Q.CX, L.l1Y, { o: u >= T.l1 - 0.02 ? 1 : 0, caret: u < T.l2 && Q.caretOn(u, T.l1, T.cps, R.l1.N) });
    R.l2.put(n2, Q.CX, L.l2Y, { o: u >= T.l2 - 0.02 ? 1 : 0, caret: u >= T.l2 && u < T.cost && Q.caretOn(u, T.l2, T.cps, R.l2.N) });
    R.cost.put(Q.typeN(u, T.cost, T.costCps, R.cost.N), Q.CX, L.costY, { o: u >= T.cost - 0.02 ? 1 : 0, caret: Q.caretOn(u, T.cost, T.costCps, R.cost.N, T.open) });
    R.light.set(Q.k(u, T.open, QR.DUR.s8 - T.open, Q.E.inOut));
  }

  QR.scene({ id: 's8', build, render });
})();
