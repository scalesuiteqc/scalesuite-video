/* « Système Vendeurs 5 minutes » · the problem world (0–10.05 s), cool and desaturated, slow, no overshoot.
   1 · Hook (0–3.0): readable at frame 0: « Samedi, 14 h 12. » / « Un vendeur remplit votre formulaire. »
       over a « Commandité » ad. Tap → the ad opens into the team's page, the phone number is typed,
       « Envoyer » → the page squeezes into the ink token. « 14 h 12 » leaves the headline and becomes
       the clock (shared element).
   2 · (3.0–5.6) The token drops under Courtier 03 in « Votre équipe » (Leader + Courtier 01–05):
       « Demande vendeur · Longueuil », « Non lue ». Courtier 03 is « En visite libre ». The clock jumps
       15 h 30, 17 h 04; nothing else moves.
   3 · (5.6–9.4) « Lue à 17 h 04 », the clock widens into a ruler 14 h 12 ━━ 17 h 04.
       « Il voit l'alerte à 17 h. » then « Trois heures pour appeler quelqu'un d'autre. »
   Exit (9.5): rewind to 14 h 12 (ruler, chips, sag undone), then the mint disc blooms from the clock. */
(function () {
  const SS = window.SS, S = SS.ST, P = SS.P, T = SS.TEAM;
  const AD = { y: 805 }, PG = { top: 680 };
  PG.y = PG.top + SS.PAGE.h / 2;
  const INS = { C3: true };
  const SUBX = 560;
  const CAM = { p: { x: 540, y: 960, s: 1, r: 0 } };
  const B = { blur: 0 };

  let R;
  function build(stage) {
    const wrap = SS.el('div', 'world-wrap', stage);
    stage.insertBefore(wrap, SS.BGM);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera(CAM.p);
    cam.set({ x: 540, y: 960, s: 1, r: 0 });

    // ================================================================ 1 · hook: ad → page → token
    const page = SS.teamPage(w, 'P', { typed: true });
    const adClip = SS.clipR(0, 0, SS.PAGE.h - 250, 0, 28);
    SS.place(page.el, 540, PG.y, { autoAlpha: 0, clipPath: adClip });
    gsap.set(page.ct, { autoAlpha: 0, y: 18 });
    const ad = SS.adCard(w, 'P');
    SS.place(ad.el, 540, AD.y);
    const rip = SS.ripple(w, { fill: 'rgba(110,128,146,.22)', ring: P.slate });
    SS.tap(rip, 360, AD.y + 10, S.tap0);
    SS.tl.fromTo(ad.el, { scale: 1 }, { scale: 0.975, duration: 0.08, ease: 'power2.out' }, S.tap0);
    SS.tl.fromTo(ad.el, { scale: 0.975 }, { scale: 1, duration: 0.22, ease: 'power2.out' }, S.tap0 + 0.08);
    // zoom through: the ad's frame opens into the page
    SS.tl.fromTo(ad.ct, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -14, duration: 0.16, ease: SS.EZ.in }, S.open0);
    SS.tl.set(ad.el, { autoAlpha: 0 }, S.open0 + 0.1);
    SS.tl.set(page.el, { autoAlpha: 1 }, S.open0 + 0.1);
    SS.tl.fromTo(page.el, { clipPath: adClip }, { clipPath: SS.OPEN, duration: 0.55, ease: SS.EZ.inOut }, S.open0 + 0.1);
    SS.tl.fromTo(page.ct, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: SS.EZ.out }, S.open0 + 0.3);
    SS.typer(page.ty, [{ at: S.type0, dur: 0.55, to: '514 555 0187' }], page.caret);
    SS.cue(S.tap0, 'm-tap0');
    // « Envoyer »: tap, then the page squeezes into the token (anticipation, no overshoot here)
    const rip2 = SS.ripple(w, { fill: 'rgba(255,255,255,.28)', ring: '#fff' });
    SS.tap(rip2, 540, PG.top + 656, S.send0);
    SS.tl.fromTo(page.send, { scale: 1 }, { scale: 0.97, duration: 0.08, ease: 'power2.out' }, S.send0);
    SS.tl.fromTo(page.send, { scale: 0.97 }, { scale: 1, duration: 0.2, ease: 'power2.out' }, S.send0 + 0.08);
    const tokClip = SS.clipR((SS.PAGE.h - SS.TOKEN.h) / 2, (SS.PAGE.w - SS.TOKEN.w) / 2, (SS.PAGE.h - SS.TOKEN.h) / 2, (SS.PAGE.w - SS.TOKEN.w) / 2, 50);
    SS.tl.fromTo(page.ct, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.14, ease: SS.EZ.in }, S.squeeze0);
    SS.tl.fromTo(page.el, { clipPath: SS.OPEN }, { clipPath: tokClip, duration: 0.24, ease: SS.EZ.inOut }, S.squeeze0);
    SS.tl.fromTo(page.el, { backgroundColor: '#ffffff' }, { backgroundColor: '#151515', duration: 0.2, ease: 'power1.inOut' }, S.squeeze0 + 0.04);
    SS.tl.set(page.el, { autoAlpha: 0 }, S.token0);
    const tok = SS.token(w);
    SS.place(tok, 540, PG.y, { autoAlpha: 0 });
    const tokTx = [...tok.children];
    gsap.set(tokTx, { autoAlpha: 0 });
    SS.tl.set(tok, { autoAlpha: 1 }, S.token0);
    SS.tl.fromTo(tokTx, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' }, S.token0);

    // ================================================================ 2 · the team card rises; the token docks under Courtier 03
    const box = SS.el('div', 'a3', w);
    gsap.set(box, { x: 0, y: 0 });
    const team = SS.teamCard(box, 'P');
    gsap.set(box, { y: 900, autoAlpha: 0 });
    SS.tl.fromTo(box, { y: 900, autoAlpha: 1 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: SS.EZ.out }, S.team);
    w.appendChild(tok); // above the card
    const subY0 = T.subY(3, INS);
    SS.tl.fromTo(tok, { x: 540, y: PG.y }, { x: SUBX, y: subY0, duration: 0.5, ease: SS.EZ.inOut }, S.drop);
    // Courtier 03: « En visite libre » ↔ « Disponible »
    const chip = (txt, bg, fg, icon) => `<span class="sy-chip" style="background:${bg};color:${fg}">${icon || ''}${txt}</span>`;
    const house = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${P.ink}" stroke-width="2.3" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>`;
    const stat = SS.swapSlot(team.rows[3].querySelector('.st'), chip('En visite libre', P.line, P.ink, house), chip('Disponible', '#E8ECEF', P.soft), { h: 60, w: 330, align: 'right' });
    // the card grows to make room for the alert under Courtier 03
    SS.tl.fromTo(team.card, { height: T.h() }, { height: T.h(INS), duration: 0.45, ease: SS.EZ.inOut }, S.sub - 0.12);
    [4, 5].forEach((i) => SS.tl.fromTo(team.rows[i], { y: T.rowY(i) }, { y: T.rowY(i, INS), duration: 0.45, ease: SS.EZ.inOut }, S.sub - 0.12));
    const sub = SS.subCard(box, 'P', 'Demande vendeur · Longueuil');
    const nl = SS.swapSlot(sub.rs, chip('Non lue', P.line, P.ink), chip('Lue à 17 h 04', '#E8ECEF', P.soft), { h: 60, w: 250, align: 'right' });
    gsap.set(nl.a, { yPercent: 110 });
    const subFromTok = SS.clipR(-12, 150, -12, 150, 38);
    SS.place(sub.el, SUBX, subY0, { autoAlpha: 0, clipPath: subFromTok });
    SS.tl.set(sub.el, { autoAlpha: 1 }, S.sub);
    SS.tl.fromTo(sub.el, { clipPath: subFromTok }, { clipPath: SS.OPEN, duration: 0.45, ease: SS.EZ.out }, S.sub);
    SS.tl.set(tok, { autoAlpha: 0 }, S.sub + 0.06);
    SS.tl.fromTo(nl.a, { yPercent: 110 }, { yPercent: 0, duration: 0.4, ease: SS.EZ.out }, S.nonlue);
    SS.cue(S.sub, 'm-dock');

    // clock jumps: hours pass, nothing else changes
    SS.CLK.go(S.jump1, 0.45, 1, 11, 930);
    SS.CLK.go(S.jump2, 0.45, 2, 12, 1024);
    SS.cue(S.jump1, 'm-jump'); SS.cue(S.jump2, 'm-jump');

    // ================================================================ 3 · read at 17 h 04
    stat.swap(S.lue);
    nl.swap(S.lue + 0.08);
    SS.CLK.ruler(S.ruler, true, 0.7);
    const dimmed = [0, 1, 2, 4, 5].map((i) => team.rows[i]);
    SS.tl.fromTo(dimmed, { opacity: 1 }, { opacity: 0.3, duration: 0.6, ease: 'power1.inOut' }, S.sag);
    const y3 = T.rowY(3), ys = subY0;
    SS.tl.fromTo(team.rows[3], { y: y3 }, { y: y3 + 10, duration: 0.9, ease: 'power2.inOut' }, S.sag);
    SS.tl.fromTo(sub.el, { y: ys }, { y: ys + 10, duration: 0.9, ease: 'power2.inOut' }, S.sag);
    SS.cue(S.lue, 'm-lue'); SS.cue(S.trois, 'm-trois');

    // ================================================================ rewind to 14 h 12
    const RW = 0.5, RE = 'power2.inOut';
    SS.CLK.go(S.rewind, RW, 0, 0, 852, RE);
    SS.CLK.ruler(S.rewind, false, 0.45);
    stat.swap(S.rewind, 0.4);
    nl.swap(S.rewind + 0.04, 0.4);
    SS.tl.fromTo(dimmed, { opacity: 0.3 }, { opacity: 1, duration: RW, ease: RE }, S.rewind);
    SS.tl.fromTo(team.rows[3], { y: y3 + 10 }, { y: y3, duration: RW, ease: RE }, S.rewind);
    SS.tl.fromTo(sub.el, { y: ys + 10 }, { y: ys, duration: RW, ease: RE }, S.rewind);
    SS.tl.fromTo(B, { blur: 0 }, { blur: 4, duration: 0.2, ease: 'power2.in' }, S.rewind + 0.04);
    SS.tl.fromTo(B, { blur: 4 }, { blur: 0, duration: 0.22, ease: 'power2.out' }, S.rewind + 0.24);
    SS.cue(S.rewind, 'sfx-rewind');
    // slow push while time passes, released by the rewind
    cam.to(S.visite + 0.3, 5.6, 'sine.inOut', { y: 952, s: 1.03 });
    cam.to(S.rewind, RW, RE, { y: 960, s: 1 });

    // ================================================================ headlines (screen space, cool scrim)
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 560, '238,241,244');
    gsap.set(scrim, { x: 0, y: 0 });
    const h1 = SS.headP(layer, 'Samedi, *14_h_12.*', { size: 124 });
    SS.place(h1.el, 540, 300);
    gsap.set(h1.words.map((x) => x.el), { yPercent: 0 });
    const sub1 = SS.text(layer, 'Un vendeur remplit votre formulaire.', { size: 52, weight: 600, color: P.soft, tracking: -0.02, maxW: 960 });
    SS.place(sub1.el, 540, 446);
    gsap.set(sub1.words.map((x) => x.el), { yPercent: 0 });
    SS.wordsOut(h1, S.hookOut, { st: 0.02, to: 1 });
    SS.wordsOut(sub1, S.hookOut + 0.03, { st: 0.015 });
    // « 14 h 12 » leaves the headline and becomes the clock's digits (shared element)
    const word = h1.words[1].el;
    const wr = word.getBoundingClientRect();
    const fly = SS.el('div', 'a3', layer);
    Object.assign(fly.style, { fontSize: h1.size + 'px', fontWeight: 800, letterSpacing: SS.TRACK + 'em', color: P.slate, whiteSpace: 'nowrap', lineHeight: 1.04 });
    fly.textContent = '14 h 12';
    const fw = fly.getBoundingClientRect();
    const fx0 = wr.left + fw.width / 2, fy0 = wr.top + wr.height / 2;
    const hr = SS.CLK.hh.win.getBoundingClientRect(), mr = SS.CLK.mm.win.getBoundingClientRect();
    const fx1 = (hr.right + mr.left) / 2, fy1 = SS.CLK.y, fk = 54 / h1.size;
    SS.place(fly, fx0, fy0, { autoAlpha: 0 });
    SS.tl.set(word, { autoAlpha: 0 }, S.born);
    SS.tl.set(fly, { autoAlpha: 1 }, S.born);
    SS.tl.fromTo(fly, { x: fx0, y: fy0, scale: 1 }, { x: fx1, y: fy1, scale: fk, duration: 0.5, ease: SS.EZ.inOut }, S.born);
    SS.tl.fromTo(fly, { color: P.slate }, { color: P.ink, duration: 0.4, ease: 'power1.inOut' }, S.born + 0.05);
    SS.tl.set(fly, { autoAlpha: 0 }, S.born + 0.5);
    SS.tl.set(SS.CLK.pill, { autoAlpha: 1 }, S.born + 0.5);
    SS.tl.fromTo(SS.CLK.pill, { scale: 0.96 }, { scale: 1, duration: 0.35, ease: SS.EZ.out }, S.born + 0.5);
    SS.cue(S.born, 'm-born');

    const h2 = SS.headP(layer, 'Votre courtier\nest *en_visite.*');
    SS.place(h2.el, 540, 330);
    SS.say(h2, S.visite + 0.12, S.lue - 0.1);
    const h3 = SS.headP(layer, "Il voit l'alerte\nà *17_h.*");
    SS.place(h3.el, 540, 330);
    SS.say(h3, S.voit, S.voitOut);
    const h4 = SS.headP(layer, "Trois heures\npour appeler\n*quelqu'un_d'autre.*", { size: 100 });
    SS.place(h4.el, 540, 330);
    SS.say(h4, S.trois, S.troisOut);

    R = { wrap, w, cam, layer };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, B.blur);
  }

  const scene = { name: 'probleme', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.wrap, -1, S.bloom + 0.6], [R.layer, -1, S.troisOut + 0.4]]; };
  SS.scenes.push(scene);
})();
