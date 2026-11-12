/* Scene 7 · Compte rendu. The voice: « Chaque semaine, un compte rendu écrit. »
   The scene arrives on the whip that scene 6 leaves on. On the left of the idea: the sentence, the chip ON
   « un compte rendu écrit ». Below, a REAL-LOOKING report email in a generic mail layout (no brand): sender
   « Mathieu, ScaleSuite », subject « Compte rendu de la semaine, Équipe Belvédère », the funnel in the body
   (Demandes → Joints → Rencontres, arrows without percentage). The figures are an example and are
   labelled « Exemple » (no guarantee of volume).
   Exit: an iris closes on the night of scene 8 (progressive dimming, no ring, no halo). */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s7', w, QR.cue('s7', w));

  const T = { line: cue('chaque'), chip: cue('compteRendu'), arrive: 0.2, mail: 0.05, steps: [0.5, 0.68, 0.86], arrows: [0.6, 0.78], roll: 0.4, irisDur: 0.45 };
  T.iris = QR.DUR.s7 - T.irisDur;
  const STEPS = [['24', 'Demandes'], ['19', 'Joints'], ['7', 'Rencontres']]; // example figures
  const L = Q.pick(
    { size: 68, y: 196, mail: [1380, 640], mailY: 640, num: 56, gap: 20 },
    { size: 52, y: 420, mail: [1380, 640], mailS: 0.69, mailY: 700, num: 56, gap: 20 },
  );

  let R;
  function build(layer) {
    Q.day(layer);
    const box = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px' });
    const line = Q.phrase(box, [[{ t: 'Chaque semaine,' }, { t: 'un compte rendu écrit.', chip: true, g: 1 }]], { size: L.size, weight: 750, color: Q.C.ink });
    const mail = Q.div(box, 'qr-report', { width: L.mail[0] + 'px', height: L.mail[1] + 'px', overflow: 'hidden', borderRadius: '30px' });
    mail.innerHTML = `
      <div style="height:70px;display:flex;align-items:center;gap:26px;padding:0 34px;border-bottom:1.5px solid #E9EEF0;color:#5B6875">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
        <span style="flex:1"></span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7.5l8.5 6 8.5-6"/></svg>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
      </div>
      <div style="padding:26px 40px 0;display:flex;align-items:flex-start;gap:20px">
        <div style="flex:1;font-size:38px;font-weight:760;letter-spacing:-.025em;line-height:1.15;white-space:nowrap">Compte rendu de la semaine, Équipe Belvédère</div>
        <div class="ex" style="padding:9px 18px 10px;border-radius:12px;box-shadow:inset 0 0 0 2.5px #1A1A1A;font-size:30px;font-weight:760;line-height:1;white-space:nowrap">Exemple</div>
      </div>
      <div style="padding:20px 40px 0;display:flex;align-items:center;gap:18px">
        <span style="width:60px;height:60px;border-radius:50%;background:${Q.C.turq};color:${Q.C.chipInk};display:grid;place-items:center;font-size:28px;font-weight:800">M</span>
        <span style="flex:1"><div style="font-size:26px;font-weight:720;letter-spacing:-.015em">Mathieu, ScaleSuite</div><div style="font-size:21px;color:#5B6875">à moi</div></span>
        <span style="font-size:21px;color:#5B6875">lun. 9 nov., 8 h 00</span>
      </div>
      <div style="padding:26px 40px 0;font-size:27px;line-height:1.4;color:#27313A">Bonjour, voici la semaine de l’équipe.</div>
      <div class="rowbox" style="position:absolute;left:50%;top:440px;width:0;height:0"></div>
      <div style="position:absolute;left:40px;bottom:44px;width:58%;height:15px;border-radius:8px;background:#E6EEEC"></div>`;
    const row = mail.querySelector('.rowbox');
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
    const iris = Q.irisClose(layer);
    R = { box, line, mail, pills, arrows, iris };
  }

  function render(u) {
    R.box.style.transform = `translateX(${((1 - Q.k(u, 0, T.arrive, Q.E.out)) * Q.W * 0.5).toFixed(2)}px)`;
    R.line.put(Q.CX, L.y, u, { at: [T.line, T.chip], chip: T.chip });
    const ks = Q.k(u, T.mail, 0.5, Q.E.springSoft);
    Q.st(R.mail, { x: Q.pick(Q.CX, 510), y: L.mailY + (1 - ks) * 160, s: (L.mailS || 1) * Q.lerp(0.96, 1, ks), o: Q.k(u, T.mail, 0.16, Q.E.sine) });
    R.pills.forEach((p, i) => {
      const k = Q.k(u, T.steps[i], 0.38, Q.E.springSoft);
      Q.st(p.el, { x: p.x, y: (1 - k) * 22, s: Q.lerp(0.8, 1, k), o: Q.k(u, T.steps[i], 0.1, Q.E.sine) });
      p.fig.roll(u, T.steps[i] + 0.02, T.roll, 0.03);
    });
    R.arrows.forEach((a, i) => {
      const k = Q.k(u, T.arrows[i], 0.34, Q.E.springSoft);
      Q.st(a, { x: a.x - (1 - k) * 24, y: 0, s: Q.lerp(0.5, 1, k), o: Q.k(u, T.arrows[i], 0.1, Q.E.sine) });
    });
    R.iris.set(Q.clamp((u - T.iris) / T.irisDur));
  }

  QR.scene({ id: 's7', build, render, cuts: [0] });
})();
