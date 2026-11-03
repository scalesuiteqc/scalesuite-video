/* « Système Vendeurs 5 minutes » (launch film, v3) · the hook (0–4.0 s), cool grey world, no overshoot.
   One evolving frame, readable at t = 0: « Leaders d'équipe de courtiers », « Le vendeur écrit à 14 h 12. »,
   the clock, « Votre équipe » with Courtier 03 « En visite libre » and the alert « Non lue ». The clock rolls to
   17 h 04 and widens into the grey ruler 14 h 12 ━━ 17 h 04; « Votre courtier le voit à 17 h 04. »; the alert
   turns « Lue à 17 h 04 »; « Trois heures pour appeler quelqu'un d'autre. » appears under the card. Poster
   (frame 0 of the master) at 3.2 s. At 3.95 the clock contracts into the centre of the mint disc (01-fonds). */
(function () {
  const SS = window.SS, S = SS.ST, P = SS.P;
  const G = SS.teamGeo(700, 76);
  const INS = { C3: true };
  const SUBX = 560;
  const CAM = { p: { x: 540, y: 960, s: 1, r: 0 } };

  let R;
  function build(stage) {
    const wrap = SS.el('div', 'world-wrap', stage);
    stage.insertBefore(wrap, SS.BGM); // the bloom covers this world
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera(CAM.p);
    cam.set({ x: 540, y: 960, s: 1, r: 0 });

    const team = SS.teamCard(w, 'P', G);
    gsap.set(team.card, { height: G.h(INS) });
    [4, 5].forEach((i) => SS.place(team.rows[i], 540, G.rowY(i, INS)));
    const chip = (txt, bg, fg, icon) => `<span class="sy-chip" style="background:${bg};color:${fg}">${icon || ''}${txt}</span>`;
    const house = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${P.ink}" stroke-width="2.3" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>`;
    const stat = SS.swapSlot(team.rows[3].querySelector('.st'), chip('En visite libre', P.line, P.ink, house), chip('Disponible', '#E8ECEF', P.soft), { h: 60, w: 330, align: 'right' });
    const sub = SS.subCard(w, 'P', 'Demande vendeur · Longueuil');
    const nl = SS.swapSlot(sub.rs, chip('Non lue', P.line, P.ink), chip('Lue à 17 h 04', '#E8ECEF', P.soft), { h: 60, w: 250, align: 'right' });
    SS.place(sub.el, SUBX, G.subY(3, INS));

    // 14 h 12 → 17 h 04
    SS.CLK.go(S.roll, 0.7, 2, 12, 1024, SS.EZ.inOut);
    SS.CLK.ruler(S.roll + 0.1, true, 0.7);
    stat.swap(S.lue);
    nl.swap(S.lue + 0.08);
    SS.cue(S.roll, 'm-jump');
    const dimmed = [0, 1, 2, 4, 5].map((i) => team.rows[i]);
    SS.tl.fromTo(dimmed, { opacity: 1 }, { opacity: 0.3, duration: 0.6, ease: 'power1.inOut' }, S.cost);
    SS.cue(S.cost, 'm-cost');
    // the clock contracts into the centre of the disc; while hidden it goes back to 14 h 12 for the action
    SS.tl.fromTo(SS.CLK.pill, { scale: 1, autoAlpha: 1 }, { scale: 0.2, autoAlpha: 0, duration: 0.2, ease: 'power2.in' }, S.clockOut);
    SS.CLK.ruler(S.bloom + 0.3, false, 0.05);
    SS.CLK.go(S.bloom + 0.3, 0.05, 0, 0, 852, 'none');
    cam.to(0.1, 3.8, 'sine.inOut', { y: 975, s: 1.02 });

    // headlines (screen space, cool scrim)
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 590, '238,241,244');
    gsap.set(scrim, { x: 0, y: 0 });
    const lab = SS.text(layer, "Leaders d'équipe de courtiers", { size: 40, weight: 720, color: P.slate, tracking: -0.01 });
    SS.place(lab.el, 540, 175);
    const h1a = SS.headP(layer, 'Le vendeur écrit\nà *14_h_12.*', { size: 80 });
    SS.place(h1a.el, 540, 302);
    const h1b = SS.headP(layer, 'Votre courtier\nle voit à *17_h_04.*', { size: 80 });
    SS.place(h1b.el, 540, 482);
    SS.rise(h1b, S.h1b, null);
    gsap.set([...lab.words, ...h1a.words].map((x) => x.m), { autoAlpha: 1, y: 0 });
    const cost = SS.text(layer, "Trois heures pour appeler\nquelqu'un d'autre.", { size: 54, weight: 780, color: P.slate, tracking: -0.03, lh: 1.08 });
    SS.place(cost.el, 540, 1450);
    SS.rise(cost, S.cost, null, { st: 0.04 });

    // the whole headline block leaves just before the bloom (no overlap with the reveal)
    const outAt = S.clockOut - 0.07;
    [lab, h1a, h1b, cost].forEach((T, k) => SS.tl.fromTo(T.words.map((x) => x.m), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -16, duration: 0.22, stagger: 0.01, ease: 'power2.in' }, outAt + k * 0.02));
    R = { wrap, w, cam, layer };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
  }

  const scene = { name: 'probleme', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.wrap, -1, S.bloom + 0.5], [R.layer, -1, S.bloom + 0.45]]; };
  SS.scenes.push(scene);
})();
