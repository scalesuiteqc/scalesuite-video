/* Scene 2 · La question. The voice: « Qui leur répond, pour vrai? … Toi? … Ou ton équipe? »
   a) Black. The question is typed letter by letter with a big rounded caret; « Qui » starts huge and the
      line shrinks while it is typed. « pour vrai » is typed inside the chip, ON those words.
   b) « Toi? »: no panel. The camera dives onto the phone lying on the nightstand until it almost fills
      the frame; the notification is readable on its screen, the chip « Toi? » sits under it.
   c) « Ou ton équipe? »: a pull of focus (the phone blurs in the foreground) reveals the empty team
      office, full frame: silhouettes, a few screens in standby, city lights in bokeh. No border. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s2', w, QR.cue('s2', w));

  const T = {
    type: cue('qui'), chip: cue('pourVrai'), chipDur: 0.3,   // typing: up to the chip, then the key words
    toi: cue('toi'), dive: 0.2,     // the dive starts 0,2 s before « Toi? » and lands on it
    team: cue('equipe'), focus: 0.24, // the pull of focus starts 0,24 s before « Ou ton équipe? »
  };
  const SEG = [{ t: 'Qui leur répond, ' }, { t: 'pour vrai', chip: true }, { t: '?' }];
  const N1 = SEG[0].t.length, N2 = N1 + SEG[1].t.length + 1;
  const L = Q.pick(
    { y: 540, base: 100, maxScale: 2.6, span: 0.6, tag: 60, toiY: 700, teamY: 600 },
    { y: 800, base: 100, maxScale: 2.0, span: 0.82, tag: 54, toiY: 1250, teamY: 1000 },
  );

  let R;
  function build(layer) {
    Q.night(layer);
    const line = Q.typed(layer, SEG, { size: L.base, weight: 700 });
    // b) the phone, full frame
    const shotBox = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 52%' });
    const shot = Q.phoneShot(shotBox, Q.W, Q.H, Q.pick(1.42, 1.25)); // the phone almost fills the frame
    Q.div(shotBox, 'layer', { background: 'radial-gradient(75% 85% at 50% 52%, rgba(3,6,10,0) 40%, rgba(3,6,10,.8) 100%)' });
    // c) the office, full frame
    const offBox = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 40%' });
    const office = Q.office(offBox, Q.W, Q.H);
    Q.div(offBox, 'layer', { background: 'radial-gradient(90% 95% at 50% 44%, rgba(3,6,10,0) 40%, rgba(3,6,10,.78) 100%)' });
    const tagCss = { fontSize: L.tag + 'px', fontWeight: 750, letterSpacing: '-.02em', lineHeight: 1.16, position: 'absolute', left: '0', top: '0', boxShadow: '0 18px 44px -12px rgba(0,0,0,.7)' };
    const you = Q.chip(layer, 'Toi?', tagCss), team = Q.chip(layer, 'Ou ton équipe?', tagCss);
    R = { line, shotBox, shot, offBox, office, you, team };
  }

  function render(u) {
    const end = QR.DUR.s2;
    // ---- a) typed question
    const n = u < T.chip ? Math.min(N1, Q.typeN(u, T.type, N1 / (T.chip - T.type - 0.08), N1)) : N1 + Q.typeN(u, T.chip, (N2 - N1) / T.chipDur, N2 - N1);
    const w = Math.max(R.line.wAt(Math.max(n, 1)), 1), s = Math.min(L.maxScale, (Q.W * L.span) / w);
    const dive = Q.k(u, T.toi - T.dive, T.dive + 0.1, Q.E.inOut);
    R.line.put(n, Q.CX, L.y, { s: s * Q.lerp(1, 1.5, dive), o: (u >= T.type - 0.02 ? 1 : 0) * (1 - Q.clamp(dive * 1.6)), blur: dive * 20, caret: u < T.toi - T.dive && (n < N2 || ((u - T.chip) * 2) % 1 < 0.6) });

    // ---- b) dive onto the phone, then c) pull of focus to the office
    const fk = Q.k(u, T.team - T.focus, T.focus + 0.16, Q.E.inOut);
    const shotOn = u >= T.toi - T.dive && fk < 0.999;
    R.shotBox.style.display = shotOn ? '' : 'none';
    if (shotOn) {
      const z = Q.lerp(0.55, 1, Q.k(u, T.toi - T.dive, T.dive + 0.16, Q.E.out)) * (1 + 0.05 * Q.k(u, T.toi, T.team - T.toi, Q.E.sine)) * Q.lerp(1, 1.18, fk);
      R.shotBox.style.transform = `scale(${z.toFixed(4)})`;
      R.shotBox.style.opacity = (Q.clamp(dive * 1.5) * (1 - Q.clamp((fk - 0.35) / 0.5))).toFixed(3);
      const bl = (1 - Q.k(u, T.toi - T.dive, T.dive + 0.1, Q.E.out)) * 16 + fk * 26;
      R.shotBox.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
      R.shot.set(Q.lerp(0.3, 1, Q.k(u, T.toi - T.dive, 0.2, Q.E.p3)), Q.k(u, T.toi - 0.12, 0.4, Q.E.springSoft));
    }
    const offOn = fk > 0.001;
    R.offBox.style.display = offOn ? '' : 'none';
    if (offOn) {
      R.offBox.style.transform = `scale(${(1.1 - 0.06 * Q.k(u, T.team - T.focus, end - T.team + T.focus, Q.E.out)).toFixed(4)})`;
      R.offBox.style.opacity = Q.clamp(fk / 0.6).toFixed(3);
      const bl = (1 - fk) * 24;
      R.offBox.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
      R.office.set(0.82 + 0.18 * Math.sin((u - T.team) * 3.1));
    }
    const ky = Q.k(u, T.toi, 0.34, Q.E.springSoft);
    Q.st(R.you, { x: Q.CX, y: L.toiY + (1 - ky) * 24, s: Q.lerp(0.8, 1, ky), o: Q.k(u, T.toi, 0.1, Q.E.sine) * (1 - Q.clamp(fk * 2.5)), blur: fk * 12 });
    const kt = Q.k(u, T.team, 0.34, Q.E.springSoft);
    Q.st(R.team, { x: Q.CX, y: L.teamY + (1 - kt) * 24, s: Q.lerp(0.8, 1, kt), o: Q.k(u, T.team, 0.1, Q.E.sine) });
  }

  QR.scene({ id: 's2', build, render, cuts: [0, T.toi, T.team] });
})();
