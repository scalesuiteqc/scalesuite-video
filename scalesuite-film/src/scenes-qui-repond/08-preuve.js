/* Scene 8 · La preuve (7 beats, 36,11 – 40,0 s). Back in the dark.
   A mechanical counter rolls up to « 124 » and stops on beat 1, with « demandes générées pour Groupe
   Mackay / en moins de 7 mois. ». On beat 3: « [54 $] de budget Google Ads par demande en moyenne. »,
   chip on beat 4. Blurred request cards drift in the background.
   QR.OPT.clientName (00-timing.js): false replaces the client's name by « une de nos équipes clientes »
   (to use until Groupe Mackay has confirmed).
   Content rules: 54 $ is the Google Ads budget per request (paid to Google), not a ScaleSuite price.
   A past result for one client, no promise of volume.
   Exit: the light opens from the centre onto scene 9 in 0,5 s (same transition as scene 5). */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR, b = QR.b;

  const T = {
    fig: 0.02, land: b(1),
    line: b(1),
    cost: b(3), costChip: b(4),
    open: b(7) - 0.5, openDur: 0.5,
  };
  const L = Q.pick(
    { fig: 340, figY: 320, line: 56, lineY: 602, cost: 50, costY: 782, halo: [1300, 700] },
    { fig: 300, figY: 640, line: 48, lineY: 912, cost: 42, costY: 1080, halo: [1000, 700] },
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
    const cards = BG.map((c, i) => ({ el: Q.card(layer, { title: CITIES[i % 3][0], city: CITIES[i % 3][1], turq: i % 3 === 1 }), c }));
    Q.div(layer, 'layer', { background: 'radial-gradient(70% 70% at 50% 48%, rgba(7,13,20,.86) 0%, rgba(7,13,20,.5) 60%, rgba(7,13,20,.2) 100%)' });
    const box = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px' });
    const halo = Q.halo(box, L.halo[0], L.halo[1]);
    const fig = Q.figure(box, { digits: '124', size: L.fig, turns: [0, 1, 2] });
    const line = Q.phrase(box, [[{ t: 'demandes générées ' + NAME() }], [{ t: 'en moins de 7 mois.' }]], { size: L.line, weight: 600, lh: 1.32 });
    const cost = Q.phrase(box, [[{ t: '54 $', chip: true }, { t: 'de budget Google Ads par demande en moyenne.' }]], { size: L.cost, weight: 560 });
    const light = Q.lightDisc(layer);
    R = { cards, halo, fig, line, cost, light };
  }

  function render(u) {
    R.cards.forEach((c, i) => {
      const [fx, fy, s, bl, r, ph] = c.c, k = Q.k(u, 0.04 + i * 0.04, 0.8, Q.E.out);
      Q.st(c.el, { x: fx * Q.W + Math.sin(u * 0.5 + ph) * 16, y: fy * Q.H + (1 - k) * 60 + Math.cos(u * 0.42 + ph) * 12 - u * 7 * s, r: r + Math.sin(u * 0.3 + ph) * 1.2, s, o: k * 0.42, blur: bl });
    });
    const fin = Q.k(u, T.fig, 0.36, Q.E.out), land = Q.env(u, T.land - 0.02, 0.06, T.land + 0.04, 0.25);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.86, 1, fin) * (1 + 0.035 * land), o: Q.k(u, T.fig, 0.12, Q.E.sine), blur: (1 - Q.k(u, T.fig, 0.24, Q.E.out)) * 10 });
    R.fig.roll(u, T.fig, (T.land - T.fig) / 0.86, 0.04);
    const hk = Q.k(u, T.land, 0.7, Q.E.out);
    Q.st(R.halo, { x: Q.CX, y: L.figY, s: Q.lerp(0.55, 1, hk) * (1 + 0.03 * Math.sin((u - T.land) * 2.4)), o: hk * 0.9 });
    R.line.put(Q.CX, L.lineY, u, { at: [T.line] });
    R.cost.put(Q.CX, L.costY, u, { at: [T.cost], chip: T.costChip });
    R.light.set(Q.clamp((u - T.open) / T.openDur));
  }

  QR.scene({ id: 's8', build, render, cuts: [0, T.land, T.cost] });
})();
