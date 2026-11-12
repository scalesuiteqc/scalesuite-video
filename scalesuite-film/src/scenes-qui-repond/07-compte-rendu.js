/* Scene 7 · Compte rendu (36,6 – 40,4 s). Still in the light.
   « Chaque semaine, [un compte rendu écrit]. » typed at the top. Below, the report as a sheet with a
   horizontal funnel of dark tiles: Demandes → Joints → Rencontres. Arrows carry NO percentage.
   The figures are an example and are labelled « Exemple » (no guarantee of volume).
   Exit: an iris closes on the night of scene 8. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  const T = {
    type: 0.08, cps: 40,
    sheet: 0.55,                         // the report sheet rises
    steps: [0.95, 1.4, 1.85],            // the three tiles
    arrows: [1.25, 1.7],
    roll: 0.7,
    iris: 3.36,                          // closes until the end of the scene
  };
  const STEPS = [['24', 'Demandes'], ['19', 'Joints'], ['7', 'Rencontres']]; // example figures
  const L = Q.pick(
    { size: 68, y: 250, sheet: [1480, 520], sheetY: 650, num: 64, gap: 24, tag: 34 },
    { size: 54, y: 420, sheet: [980, 900], sheetY: 1040, num: 58, gap: 22, tag: 30 },
  );

  let R;
  function build(layer) {
    Q.day(layer);
    const line = Q.typed(layer, [{ t: 'Chaque semaine, ' }, { t: 'un compte rendu écrit', chip: true }, { t: '.' }], { size: L.size, weight: 650, color: Q.C.ink, caretColor: Q.C.ink });
    const sheet = Q.div(layer, 'qr-report', { width: L.sheet[0] + 'px', height: L.sheet[1] + 'px' });
    sheet.innerHTML = `<div style="position:absolute;left:56px;top:44px;font-size:36px;font-weight:790;letter-spacing:-.025em;white-space:nowrap">Compte rendu de la semaine</div>
      <div class="ex" style="position:absolute;right:56px;top:40px;padding:9px 18px 10px;border-radius:12px;box-shadow:inset 0 0 0 2.5px #1A1A1A;font-size:${L.tag}px;font-weight:760;letter-spacing:.01em;line-height:1;white-space:nowrap">Exemple</div>
      <div style="position:absolute;left:56px;right:56px;top:112px;height:2px;background:#E6EEEC"></div>
      <div class="sk" style="position:absolute;left:56px;bottom:92px;width:62%;height:16px;border-radius:8px;background:#E6EEEC"></div>
      <div class="sk" style="position:absolute;left:56px;bottom:56px;width:44%;height:16px;border-radius:8px;background:#E6EEEC"></div>`;
    // funnel: tiles and arrows laid out in a row, centred in the sheet
    const row = Q.div(sheet, 'qr-abs', { width: '0', height: '0', left: '50%', top: '53%' });
    const pills = STEPS.map(([n, lb]) => {
      const p = Q.div(row, 'qr-pill');
      const fig = Q.figure(p, { digits: n, size: L.num, turns: n.length === 2 ? [0, 1] : [1] });
      Object.assign(fig.el.style, { position: 'relative', display: 'inline-flex' });
      SS.el('span', 'lb', p).textContent = lb;
      return { el: p, fig, w: p.getBoundingClientRect().width };
    });
    const arrows = [0, 1].map(() => { const a = Q.div(row, 'qr-arrow'); a.innerHTML = SS.icon.arrow('#04211E'); return a; });
    const total = pills.reduce((s, p) => s + p.w, 0) + 2 * 92 + 4 * L.gap;
    let x = -total / 2;
    pills.forEach((p, i) => { p.x = x + p.w / 2; x += p.w + L.gap; if (i < 2) { arrows[i].x = x + 46; x += 92 + L.gap; } });
    const iris = Q.div(layer, 'layer');
    R = { line, sheet, pills, arrows, iris, ex: sheet.querySelector('.ex') };
  }

  function render(u) {
    const end = QR.DUR.s7;
    const n = Q.typeN(u, T.type, T.cps, R.line.N);
    R.line.put(n, Q.CX, L.y, { o: u >= T.type - 0.02 ? 1 : 0, caret: Q.caretOn(u, T.type, T.cps, R.line.N) });
    const ks = Q.k(u, T.sheet, 0.7, Q.E.springSoft);
    Q.st(R.sheet, { x: Q.CX, y: L.sheetY + (1 - ks) * 240, s: Q.lerp(0.94, 1, ks), o: Q.k(u, T.sheet, 0.2, Q.E.sine), blur: (1 - Q.k(u, T.sheet, 0.4, Q.E.out)) * 10 });
    const ke = Q.k(u, T.sheet + 0.3, 0.4, Q.E.spring);
    R.ex.style.transform = `scale(${Q.lerp(0.6, 1, ke).toFixed(4)})`;
    R.ex.style.opacity = Q.k(u, T.sheet + 0.3, 0.12, Q.E.sine).toFixed(3);
    R.pills.forEach((p, i) => {
      const k = Q.k(u, T.steps[i], 0.46, Q.E.spring);
      Q.st(p.el, { x: p.x, y: (1 - k) * 26, s: Q.lerp(0.7, 1, k), o: Q.k(u, T.steps[i], 0.14, Q.E.sine) });
      p.fig.roll(u, T.steps[i] + 0.05, T.roll, 0.04);
    });
    R.arrows.forEach((a, i) => {
      const k = Q.k(u, T.arrows[i], 0.42, Q.E.springHi);
      Q.st(a, { x: a.x - (1 - k) * 30, y: 0, s: Q.lerp(0.3, 1, k), o: Q.k(u, T.arrows[i], 0.1, Q.E.sine) });
    });
    // iris closing on the night
    const ki = Q.k(u, T.iris, end - T.iris, Q.E.inOut), rad = (1 - ki) * (Math.hypot(Q.W, Q.H) / 2 + 40);
    R.iris.style.visibility = ki <= 0.0005 ? 'hidden' : 'visible';
    R.iris.style.background = `radial-gradient(circle at 50% 50%, rgba(7,13,20,0) ${Math.max(0, rad - 60).toFixed(1)}px, ${Q.C.night} ${rad.toFixed(1)}px)`;
  }

  QR.scene({ id: 's7', build, render });
})();
