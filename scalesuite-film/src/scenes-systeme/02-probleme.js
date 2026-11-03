/* « Système Vendeurs 5 minutes » (launch film) · the problem world (0–6.45 s), cool grey, slow, no overshoot.
   1 · Hook (0–3.5): readable at t = 0, full frame: « Leaders d'équipe de courtiers », « Le vendeur écrit à
       14 h 12. », the clock, « Votre équipe » with Courtier 03 « En visite libre » and the alert « Non lue ».
       The clock rolls to 17 h 04 and widens into the grey ruler 14 h 12 ━━ 17 h 04; « Votre courtier le voit
       à 17 h 04. »; the alert turns « Lue à 17 h 04 ». Poster (frame 0 of the master) at 3.0 s.
   2 · Cost (3.5–6.0): « Trois heures pour appeler quelqu'un d'autre. », Courtier 03 sags, the others dim.
       Rewind to 14 h 12 (5.45), then the mint disc blooms from the clock (01-fonds). */
(function () {
  const SS = window.SS, S = SS.ST, P = SS.P;
  const G = SS.teamGeo(770);
  const INS = { C3: true };
  const SUBX = 560;
  const CAM = { p: { x: 540, y: 960, s: 1, r: 0 } };
  const B = { blur: 0 };

  let R;
  function build(stage) {
    const wrap = SS.el('div', 'world-wrap', stage);
    stage.insertBefore(wrap, SS.BGM); // the bloom covers this world
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera(CAM.p);
    cam.set({ x: 540, y: 960, s: 1, r: 0 });

    // ================================================================ the team card, full from t = 0
    const team = SS.teamCard(w, 'P', G);
    gsap.set(team.card, { height: G.h(INS) });
    [4, 5].forEach((i) => SS.place(team.rows[i], 540, G.rowY(i, INS)));
    const chip = (txt, bg, fg, icon) => `<span class="sy-chip" style="background:${bg};color:${fg}">${icon || ''}${txt}</span>`;
    const house = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${P.ink}" stroke-width="2.3" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>`;
    const stat = SS.swapSlot(team.rows[3].querySelector('.st'), chip('En visite libre', P.line, P.ink, house), chip('Disponible', '#E8ECEF', P.soft), { h: 60, w: 330, align: 'right' });
    const sub = SS.subCard(w, 'P', 'Demande vendeur · Longueuil');
    const nl = SS.swapSlot(sub.rs, chip('Non lue', P.line, P.ink), chip('Lue à 17 h 04', '#E8ECEF', P.soft), { h: 60, w: 250, align: 'right' });
    const ys = G.subY(3, INS), y3 = G.rowY(3);
    SS.place(sub.el, SUBX, ys);

    // ================================================================ 1 · 14 h 12 → 17 h 04
    SS.CLK.go(S.roll, 0.7, 2, 12, 1024, SS.EZ.inOut);
    SS.CLK.ruler(S.roll + 0.1, true, 0.7);
    stat.swap(S.lue);
    nl.swap(S.lue + 0.08);
    SS.cue(S.roll, 'm-jump');

    // ================================================================ 2 · the cost
    const dimmed = [0, 1, 2, 4, 5].map((i) => team.rows[i]);
    SS.tl.fromTo(dimmed, { opacity: 1 }, { opacity: 0.3, duration: 0.6, ease: 'power1.inOut' }, S.sag);
    SS.tl.fromTo(team.rows[3], { y: y3 }, { y: y3 + 10, duration: 0.9, ease: 'power2.inOut' }, S.sag);
    SS.tl.fromTo(sub.el, { y: ys }, { y: ys + 10, duration: 0.9, ease: 'power2.inOut' }, S.sag);
    SS.cue(S.cost, 'm-cost');
    // rewind to 14 h 12
    const RW = 0.45, RE = 'power2.inOut';
    SS.CLK.go(S.rewind, RW, 0, 0, 852, RE);
    SS.CLK.ruler(S.rewind, false, 0.42);
    stat.swap(S.rewind, 0.36);
    nl.swap(S.rewind + 0.04, 0.36);
    SS.tl.fromTo(dimmed, { opacity: 0.3 }, { opacity: 1, duration: RW, ease: RE }, S.rewind);
    SS.tl.fromTo(team.rows[3], { y: y3 + 10 }, { y: y3, duration: RW, ease: RE }, S.rewind);
    SS.tl.fromTo(sub.el, { y: ys + 10 }, { y: ys, duration: RW, ease: RE }, S.rewind);
    SS.tl.fromTo(B, { blur: 0 }, { blur: 4, duration: 0.18, ease: 'power2.in' }, S.rewind + 0.04);
    SS.tl.fromTo(B, { blur: 4 }, { blur: 0, duration: 0.2, ease: 'power2.out' }, S.rewind + 0.22);
    SS.cue(S.rewind, 'm-rewind');
    cam.to(0.2, 5.2, 'sine.inOut', { y: 980, s: 1.02 });
    cam.to(S.rewind, RW, RE, { y: 960, s: 1 });

    // ================================================================ headlines (screen space, cool scrim)
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 640, '238,241,244');
    gsap.set(scrim, { x: 0, y: 0 });
    const lab = SS.text(layer, "Leaders d'équipe de courtiers", { size: 40, weight: 720, color: P.slate, tracking: -0.01 });
    SS.place(lab.el, 540, 175);
    gsap.set(lab.words.map((x) => x.el), { yPercent: 0 });
    SS.wordsOut(lab, S.hookOut, { st: 0.015 });
    const h1a = SS.headP(layer, 'Le vendeur écrit\nà *14_h_12.*', { size: 88 });
    SS.place(h1a.el, 540, 330);
    gsap.set(h1a.words.map((x) => x.el), { yPercent: 0 });
    SS.wordsOut(h1a, S.hookOut, { st: 0.02 });
    const h1b = SS.headP(layer, 'Votre courtier\nle voit à *17_h_04.*', { size: 88 });
    SS.place(h1b.el, 540, 530);
    SS.say(h1b, S.h1b, S.hookOut + 0.03);
    const h2 = SS.headP(layer, "Trois heures\npour appeler\n*quelqu'un_d'autre.*", { size: 100 });
    SS.place(h2.el, 540, 410);
    SS.say(h2, S.cost, S.bloom - 0.05);

    R = { wrap, w, cam, layer };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, B.blur);
  }

  const scene = { name: 'probleme', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.wrap, -1, S.bloom + 0.6], [R.layer, -1, S.bloom + 0.4]]; };
  SS.scenes.push(scene);
})();
