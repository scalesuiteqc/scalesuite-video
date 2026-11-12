/* Scene 8 · La preuve : the client against the market. The voice (vo-08-v2): « Pour le Groupe Mackay : 138
   demandes depuis avril, à 51 $ de pub par demande. C'est 64 % de moins que la moyenne du marché. »
   All figures come from ONE campaign and ONE period (campagne Vendeurs du Groupe Mackay, 1er avril au
   11 novembre 2026, requests counted by Google Ads); the market figures come from one published benchmark.
     a  title, counter up to « 138 » ON the figure, « demandes de la campagne Vendeurs depuis avril 2026 »
        (never « demandes de vendeurs »)
     b  ON « 51 $ de pub par demande »: two horizontal bars, turquoise short (client 51 $), grey long (market ≈ 144 $)
     c  ON « 64 % de moins »: the chip « −64 % » lands next to the bars
     d  during the 1,2 s hold without voice: a sober grid of three lines, each with the client, the market and
        the gap in a chip
   Dark tiles, turquoise accents, no glow. Hard cut to scene 9.
   QR.OPT.clientName = false → « Une de nos agences clientes ».
   QR.OPT.quote = {text, name, title} → quote slot, OFF (null) until the real quote arrives; never invented.
   Content rules: past results of one client, no promise; 51 $ is Google Ads budget paid to Google, not a
   ScaleSuite price. François Mackay authorised the use of the name on 31 October 2026. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s8', w, QR.cue('s8', w));
  QR.OPT.quote = QR.OPT.quote || null;

  const T = { head: cue('pour'), n: cue('n138'), cost: cue('n51'), less: cue('moins64'), hold: 1.2 };
  T.land = T.n + 0.45; T.aOut = T.cost - 0.24; T.grid = QR.DUR.s8 - T.hold - 0.1; T.bOut = T.grid - 0.05; T.foot = T.cost;
  const CLIENT = () => (QR.OPT.clientName ? 'Groupe Mackay' : 'Notre cliente');
  const TITLE = () => (QR.OPT.clientName ? 'Groupe Mackay' : 'Une de nos agences clientes');
  const ROWS = [ // metric, client, market, gap
    ['Coût par demande', '51 $', '≈ 144 $', '−64 %'],
    ['Taux de conversion', '5,12 %', '3,70 %', '+38 %'],
    ['Taux de clics', '10,29 %', '7,61 %', '+35 %'],
  ];
  const FOOT = () => [(QR.OPT.clientName ? 'Groupe Mackay, campagne Vendeurs' : 'Campagne Vendeurs d’une agence cliente') + ', 1er avril au 11 novembre 2026, demandes comptées par Google Ads.',
    'Marché : LocaliQ, Real Estate Search Advertising Benchmarks 2026, près de 900 campagnes américaines, converti en $ CA à 1,40.'];
  const L = Q.pick(
    { headY: 150, fig: 320, figY: 470, line: 54, lineY: 720, barX: 250, barW: 760, barY: [450, 660], barH: 104, chipX: 1520, chipY: 555, chip: 112,
      rowW: 1440, rowH: 118, rowY: [410, 548, 686], colX: [-670, -150, 190, 470], footY: 934, foot: 22 },
    { headY: 300, fig: 260, figY: 760, line: 40, lineY: 960, barX: 90, barW: 700, barY: [760, 900], barH: 96, chipX: 800, chipY: 1080, chip: 110,
      rowW: 980, rowH: 150, rowY: [700, 880, 1060], colX: [-460, -80, 150, 370], footY: 1560, foot: 20 },
  );
  const TILE = '#131E2A';

  let R;
  function build(layer) {
    Q.night(layer);
    const head = Q.phrase(layer, [[{ t: TITLE() }]], { size: 46, weight: 750, color: '#9FB3C2' });
    // a) the counter
    const a = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 50%' });
    const fig = Q.figure(a, { digits: '138', size: L.fig, turns: [0, 1, 2] });
    const line = Q.phrase(a, [[{ t: 'demandes de la campagne Vendeurs depuis avril 2026' }]], { size: L.line, weight: 700 });
    // b) the two bars, c) the gap
    const b = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 50%' });
    const bar = (label, value, frac, turq) => {
      const row = Q.div(b, 'qr-abs', { whiteSpace: 'nowrap' });
      const lab = Q.div(row, 'qr-abs', { top: '-46px', fontSize: '30px', fontWeight: 700, letterSpacing: '-.015em', color: turq ? Q.C.white : '#9FB3C2' });
      lab.textContent = label;
      const fill = Q.div(row, 'qr-abs', { width: L.barW * frac + 'px', height: L.barH + 'px', borderRadius: '22px', background: turq ? Q.C.turq : '#3A4856', transformOrigin: '0 50%' });
      const val = Q.div(row, 'qr-abs', { left: L.barW * frac + 26 + 'px', height: L.barH + 'px', display: 'flex', alignItems: 'center', fontSize: '64px', fontWeight: 800, letterSpacing: '-.03em',
        fontFeatureSettings: "'tnum' 1", color: turq ? Q.C.turqHi : '#C9D6DC' });
      val.textContent = value;
      return { row, fill, val, lab };
    };
    const bars = [bar(CLIENT(), '51 $', 51 / 144, true), bar('Moyenne du marché', '≈ 144 $', 1, false)];
    const less = Q.chip(b, '−64 %', { position: 'absolute', left: '0', top: '0', fontSize: L.chip + 'px', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.12 });
    // d) the grid
    const g = Q.div(layer, 'qr-abs', { width: '0', height: '0' });
    const cols = ['', CLIENT(), 'Marché', 'Écart'].map((t, i) => { const c = Q.div(g, 'qr-abs', { fontSize: '26px', fontWeight: 700, color: '#8499A8', whiteSpace: 'nowrap' }); c.textContent = t; return c; });
    const rows = ROWS.map((r) => {
      const row = Q.div(g, 'qr-abs', { width: L.rowW + 'px', height: L.rowH + 'px', borderRadius: '26px', background: TILE, boxShadow: '0 18px 40px -22px rgba(0,0,0,.8), inset 0 0 0 1px rgba(255,255,255,.05)' });
      const cell = (x, html, css) => { const c = Q.div(row, 'qr-abs', Object.assign({ left: L.rowW / 2 + x + 'px', top: '0', height: L.rowH + 'px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }, css)); c.innerHTML = html; return c; };
      cell(L.colX[0], r[0], { fontSize: '38px', fontWeight: 720, letterSpacing: '-.02em', color: Q.C.white });
      cell(L.colX[1], r[1], { fontSize: '56px', fontWeight: 800, letterSpacing: '-.03em', color: Q.C.turqHi, fontFeatureSettings: "'tnum' 1" });
      cell(L.colX[2], r[2], { fontSize: '44px', fontWeight: 700, letterSpacing: '-.02em', color: '#9FB3C2', fontFeatureSettings: "'tnum' 1" });
      const chip = cell(L.colX[3], `<span class="qr-chip" style="font-size:46px;font-weight:800;letter-spacing:-.03em">${r[3]}</span>`, {});
      return { row, chip: chip.firstChild };
    });
    const foot = Q.src(layer, FOOT(), L.foot);
    let quote = null;
    if (QR.OPT.quote) {
      quote = Q.div(layer, 'qr-abs', { textAlign: 'center', whiteSpace: 'nowrap', color: Q.C.white });
      quote.innerHTML = `<div style="font-size:32px;font-weight:650;letter-spacing:-.02em">« ${QR.OPT.quote.text} »</div><div style="margin-top:6px;font-size:22px;color:#9FB3C2">${QR.OPT.quote.name}, ${QR.OPT.quote.title}</div>`;
    }
    R = { head, a, fig, line, b, bars, less, g, cols, rows, foot, quote };
  }

  const leave = (el, k) => {
    el.style.transform = `scale(${Q.lerp(1, 0.95, k).toFixed(4)})`;
    el.style.opacity = (1 - k).toFixed(3);
    el.style.visibility = k >= 0.999 ? 'hidden' : 'visible';
    el.style.filter = k > 0.004 ? `blur(${(k * 14).toFixed(2)}px)` : 'none';
  };

  function render(u) {
    R.head.put(Q.CX, L.headY, u, { at: [T.head] });
    // a) 138
    leave(R.a, Q.k(u, T.aOut, 0.2, Q.E.in));
    const fin = Q.k(u, T.n, 0.3, Q.E.out), land = Q.env(u, T.land - 0.02, 0.06, T.land + 0.04, 0.25);
    Q.st(R.fig.el, { x: Q.CX, y: L.figY, s: Q.lerp(0.88, 1, fin) * (1 + 0.03 * land), o: Q.k(u, T.n, 0.1, Q.E.sine), blur: (1 - Q.k(u, T.n, 0.2, Q.E.out)) * 10 });
    R.fig.roll(u, T.n, (T.land - T.n) / 0.86, 0.04);
    R.line.put(Q.CX, L.lineY, u, { at: [T.n + 0.3] });
    // b) bars, c) the gap
    leave(R.b, Q.k(u, T.bOut, 0.2, Q.E.in));
    R.bars.forEach((br, i) => {
      const at = T.cost + i * 0.16, k = Q.k(u, at, 0.6, Q.E.springSoft);
      Q.st(br.row, { x: L.barX, y: L.barY[i], o: Q.k(u, at, 0.1, Q.E.sine) });
      br.row.style.transform = `translate(${L.barX}px,${L.barY[i] - L.barH / 2}px)`;
      br.fill.style.transform = `scaleX(${Math.max(0.001, k).toFixed(4)})`;
      br.val.style.transform = `translateX(${(-(1 - k) * parseFloat(br.fill.style.width)).toFixed(2)}px)`;
      br.val.style.opacity = Q.k(u, at + 0.12, 0.2, Q.E.sine).toFixed(3);
    });
    const kl = Q.k(u, T.less, 0.4, Q.E.springSoft);
    Q.st(R.less, { x: L.chipX, y: L.chipY, s: Q.lerp(0.5, 1, kl), o: Q.k(u, T.less, 0.1, Q.E.sine) });
    // d) the grid, during the hold
    R.g.style.transform = `translate(${Q.CX}px,0px)`;
    R.cols.forEach((c, i) => { c.style.transform = `translate(${L.colX[i]}px,${L.rowY[0] - L.rowH / 2 - 48}px)`; c.style.opacity = Q.k(u, T.grid, 0.25, Q.E.sine).toFixed(3); });
    R.rows.forEach((r, i) => {
      const at = T.grid + i * 0.1, k = Q.k(u, at, 0.42, Q.E.springSoft);
      Q.st(r.row, { x: 0, y: L.rowY[i] + (1 - k) * 36, s: Q.lerp(0.96, 1, k), o: Q.k(u, at, 0.12, Q.E.sine) });
      const kc = Q.k(u, at + 0.16, 0.36, Q.E.springSoft);
      r.chip.style.transform = `scale(${Q.lerp(0.5, 1, kc).toFixed(4)})`;
      r.chip.style.opacity = Q.k(u, at + 0.16, 0.1, Q.E.sine).toFixed(3);
    });
    const kf = Q.k(u, T.foot, 0.4, Q.E.out);
    Q.st(R.foot, { x: Q.CX, y: L.footY + (1 - kf) * 12, o: Q.k(u, T.foot, 0.3, Q.E.sine) * 0.62 });
    if (R.quote) Q.st(R.quote, { x: Q.CX, y: L.footY - 96, o: Q.k(u, T.grid + 0.4, 0.3, Q.E.sine) });
  }

  QR.scene({ id: 's8', build, render, cuts: [0, T.n, T.cost, T.grid] });
})();
