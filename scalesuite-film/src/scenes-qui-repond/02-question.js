/* Scene 2 · La question (8 beats, 3,89 – 8,33 s).
   a) Back to black. « Qui leur répond, [pour vrai]? » is typed letter by letter with a big rounded
      caret. « Qui » starts huge, then the line shrinks continuously while it is typed so that it
      always spans about 60 % of the frame width. The key word is typed inside the chip.
   b) A portrait panel opens in the centre: tight close-up of the phone on the nightstand, whose lock
      screen lights up with a « Nouvelle demande » notification, « Toi? ».
   c) A turquoise flash fills the panel, which widens into a large rounded frame: an empty team
      office at night, « Ou ton équipe? », and a thin progress line at the bottom of the frame. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  const b = QR.b; // beats → seconds (108 BPM)
  const T = {
    type: 0.04, cps: 17 / (b(1.5) - 0.04), // typing speed set so that the chip (17th character) starts on beat 1,5
    textOut: b(4) - 0.22, textOutDur: 0.2,
    panel: b(4) - 0.03, panelDur: 0.42, // portrait panel opens on beat 4
    wake: b(4) + 0.03, note: b(4) + 0.09, // the phone screen wakes, the notification drops in
    you: b(4.5),              // « Toi? »
    flash: b(6),              // turquoise flash, the panel widens
    widen: 0.5,
    team: b(6.5),             // « Ou ton équipe? »
    line: b(6) + 0.04,        // progress line start (ends with the scene)
  };
  const L = Q.pick(
    { y: 540, base: 100, maxScale: 2.6, span: 0.6, pw: 540, PW: 1632, ph: 760, rad: 40, tag: 46, youDy: 84 },
    { y: 800, base: 100, maxScale: 2.0, span: 0.82, pw: 520, PW: 960, ph: 980, rad: 40, tag: 44, youDy: 120 },
  );

  let R;
  function build(layer) {
    Q.night(layer);
    const line = Q.typed(layer, [{ t: 'Qui leur répond, ' }, { t: 'pour vrai', chip: true }, { t: '?' }], { size: L.base, weight: 600 });

    const panel = Q.div(layer, 'qr-panel', { borderRadius: L.rad + 'px' });
    const inner = Q.div(panel, 'qr-abs', { left: '50%', top: '50%', width: '0', height: '0' });
    // tight close-up of the phone: the lock screen lights up with a readable notification
    const closeBox = Q.div(inner, 'qr-abs', { width: L.pw + 'px', height: L.ph + 'px', left: -L.pw / 2 + 'px', top: -L.ph / 2 + 'px', transformOrigin: '50% 53%' });
    const shot = Q.phoneShot(closeBox, L.pw, L.ph);
    const closeVign = Q.div(inner, 'qr-abs', { width: L.pw + 'px', height: L.ph + 'px', left: -L.pw / 2 + 'px', top: -L.ph / 2 + 'px',
      background: 'radial-gradient(85% 75% at 50% 56%, rgba(3,6,10,0) 45%, rgba(3,6,10,.7) 100%)' });
    // the office
    const offBox = Q.div(inner, 'qr-abs', { width: L.PW + 'px', height: L.ph + 'px', left: -L.PW / 2 + 'px', top: -L.ph / 2 + 'px', overflow: 'hidden' });
    const offWorld = Q.div(offBox, 'qr-abs', { width: L.PW + 'px', height: L.ph + 'px', transformOrigin: '50% 38%' });
    const office = Q.office(offWorld, L.PW, L.ph);
    Q.div(offBox, 'qr-abs', { inset: '0', background: 'radial-gradient(85% 95% at 50% 46%, rgba(3,6,10,0) 45%, rgba(3,6,10,.7) 100%)' });
    const flash = Q.div(panel, 'qr-abs', { inset: '0', background: `linear-gradient(160deg, ${Q.C.turqHi}, ${Q.C.turq} 55%, ${Q.C.blue})` });
    const bar = Q.div(panel, 'qr-abs', { left: '34px', top: 'auto', bottom: '26px', height: '5px', borderRadius: '3px', background: Q.C.turq, boxShadow: '0 0 18px rgba(63,211,198,.7)' });
    const tagCss = { fontSize: L.tag + 'px', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.16, position: 'absolute', left: '0', top: '0',
      boxShadow: '0 18px 44px -12px rgba(0,0,0,.7)' };
    const you = Q.chip(layer, 'Toi?', tagCss), team = Q.chip(layer, 'Ou ton équipe?', tagCss);
    R = { line, panel, closeBox, closeVign, shot, offBox, offWorld, office, flash, bar, you, team };
  }

  function render(u) {
    // ---- a) the typed question, zooming out as it grows
    const N = R.line.N, n = Q.typeN(u, T.type, T.cps, N);
    const w = Math.max(R.line.wAt(Math.max(n, 1)), 1);
    const s = Math.min(L.maxScale, (Q.W * L.span) / w);
    const out = Q.k(u, T.textOut, T.textOutDur, Q.E.in);
    R.line.put(n, Q.CX, L.y, { s: s * Q.lerp(1, 0.9, out), o: (u >= T.type - 0.02 ? 1 : 0) * (1 - out), blur: out * 16, caret: Q.caretOn(u, T.type, T.cps, N) });

    // ---- b) c) the framed shots
    const open = Q.k(u, T.panel, T.panelDur, Q.E.springSoft), wide = Q.k(u, T.flash, T.widen, Q.E.expo);
    const pw = Q.lerp(L.pw, L.PW, wide);
    const on = u >= T.panel;
    R.panel.style.display = on ? '' : 'none';
    R.you.style.display = on ? '' : 'none';
    R.team.style.display = on ? '' : 'none';
    if (!on) return;
    R.panel.style.width = pw.toFixed(2) + 'px';
    R.panel.style.height = L.ph + 'px';
    Q.st(R.panel, { x: Q.CX, y: L.y, s: Q.lerp(0.8, 1, open), o: Q.k(u, T.panel, 0.16, Q.E.sine), blur: (1 - Q.k(u, T.panel, 0.3, Q.E.out)) * 12 });

    const office = u >= T.flash + 0.06;
    R.closeBox.style.display = office ? 'none' : '';
    R.closeVign.style.display = office ? 'none' : '';
    R.offBox.style.display = office ? '' : 'none';
    if (!office) {
      // slow push-in; the screen wakes, then the notification drops in
      const z = 1 + 0.06 * Q.k(u, T.panel, 1.3, Q.E.sine);
      R.closeBox.style.transform = `scale(${z.toFixed(4)})`;
      R.shot.set(Q.lerp(0.18, 1, Q.k(u, T.wake, 0.3, Q.E.p3)), Q.k(u, T.note, 0.5, Q.E.springSoft));
    } else {
      const z = 1.07 - 0.07 * Q.k(u, T.flash, QR.DUR.s2 - T.flash + 0.4, Q.E.out);
      R.offWorld.style.transform = `scale(${z.toFixed(4)})`;
      R.office.set(0.82 + 0.18 * Math.sin((u - T.flash) * 3.1));
    }
    // flash: fast in, slower out
    const fl = Math.min(Q.k(u, T.flash - 0.07, 0.09, Q.E.sine), 1 - Q.k(u, T.flash + 0.08, 0.42, Q.E.out));
    R.flash.style.opacity = Q.clamp(fl).toFixed(3);
    R.flash.style.visibility = fl <= 0.001 ? 'hidden' : 'visible';
    // progress line
    const pk = Q.clamp((u - T.line) / (QR.DUR.s2 - T.line));
    R.bar.style.width = ((pw - 68) * (0.04 + 0.96 * pk)).toFixed(2) + 'px';
    R.bar.style.opacity = office ? 1 : 0;

    const ky = Q.k(u, T.you, 0.4, Q.E.spring), yo = Q.k(u, T.you, 0.14, Q.E.sine) * (1 - Q.k(u, T.flash - 0.1, 0.1, Q.E.sine));
    Q.st(R.you, { x: Q.CX, y: L.y + L.youDy, s: Q.lerp(0.6, 1, ky), o: yo });
    const kt = Q.k(u, T.team, 0.42, Q.E.spring);
    Q.st(R.team, { x: Q.CX, y: L.y + 8, s: Q.lerp(0.6, 1, kt), o: Q.k(u, T.team, 0.14, Q.E.sine) });
  }

  QR.scene({ id: 's2', build, render, cuts: [0, T.panel, T.flash] });
})();
