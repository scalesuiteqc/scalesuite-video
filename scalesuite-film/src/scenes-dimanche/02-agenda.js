/* « Dimanche, 21 h 14 » · Julie's agenda, the hero object of scenes 1, 2 and 7.
   A hard-cover planner seen from the front: deep blue linen cover, Thursday's page, and a linen pocket
   holding the meeting cards. The cards slide out of the pocket in layers (back card first, each one
   overlapping the one behind it), on a precomputed spring; in scene 2 they go back in, played in reverse
   (front card first). Contact shadow and floor reflection (-webkit-box-reflect) under the planner.
   1 · Hook (0–2.8): frame 0 of the master = settled state (2.0 s).
   2 · Rewind (2.8–5.6): the camera pulls back to make room for the play bar; the cards retract.
   Exit (5.6): the planner drops out of frame while the bar's track becomes the search bar. */
(function () {
  const SS = window.SS, T = SS.DT, C = SS.DC;
  const P = { blur: 0 };
  const AG = { cx: 540, cy: 1010, w: 900, h: 830 };
  AG.top = AG.cy - AG.h / 2; // 595
  const POCKET = { top: 540, h: 266 }; // local to the planner (bottom = page bottom)
  const CARD = { w: 800, h: 220, x: 50, rest: 550, fan: [175, 295, 415] };
  const CARDS = [ // back → front (chronological, top → bottom)
    // each card is its own tinted card stock (the layers read apart, as the reference's cards do); `edge` colours its ribbon
    { tm: '17 h 15', nm: 'Annie, maison, Ahuntsic', r: -0.5, edge: '#2FB0DE', tint: '#EEF8FC', tint2: '#E2F2F9', ring: 'rgba(47,176,222,.34)', time: '#17739A' },
    { tm: '18 h 30', nm: 'Sophie, condo, Rosemont', r: 0.35, edge: '#1FBFA8', tint: '#EBF8F5', tint2: '#DEF3EE', ring: 'rgba(31,191,168,.36)', time: '#0F7B6F' },
    { tm: '19 h 45', nm: 'Marc, duplex, Villeray', r: -0.2, edge: '#16708F', tint: '#EBF2F5', tint2: '#DDE9EE', ring: 'rgba(22,112,143,.30)', time: '#16708F' },
  ];
  SS.AGENDA = { AG, POCKET, CARD, CARDS };
  const KEV = { x: 1500 };                       // Kevin's agenda, beside Julie's (world)
  const REVEAL = { x: 1020, y: 1170, s: 0.5 };   // the team's week: Julie at x 300, Kevin at x 780 on screen
  SS.AGENDA.REVEAL = REVEAL;
  const RB_OUT = 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 86%, 0% 100%)', RB_IN = 'polygon(0% 0%, 100% 0%, 100% 0%, 50% 0%, 0% 0%)';
  const SWING = [SS.springEase(0.16, 13), SS.springEase(0.17, 14.5), SS.springEase(0.15, 12)]; // ribbons (light damping)

  // a meeting card (also used by the scenes that make or fly cards)
  SS.D.card = (parent, d) => {
    const el = SS.el('div', 'dm-card', parent);
    Object.assign(el.style, { width: CARD.w + 'px', height: CARD.h + 'px',
      boxShadow: `${SS.DSH.card}, inset 0 0 0 1.5px ${d.ring}, inset 0 1.5px 0 rgba(255,255,255,.9)`,
      backgroundImage: `linear-gradient(180deg, ${d.tint} 0%, ${d.tint2} 100%)` });
    el.innerHTML = `<div class="row"><span class="tm" style="color:${d.time}">${d.tm}</span><span class="nm">${d.nm}</span></div>
      <div class="sk" style="top:124px;width:420px;background:${d.ring};opacity:.45"></div><div class="sk" style="top:156px;width:300px;background:${d.ring};opacity:.45"></div>`;
    return el;
  };

  let R;
  function build(stage) {
    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera({ x: 540, y: 960, s: 1, r: 0 });
    cam.set({ x: 540, y: 960, s: 1, r: 0 });

    // contact shadow on the floor (not reflected)
    const contact = SS.el('div', 'a3', w);
    Object.assign(contact.style, { width: '860px', height: '64px', borderRadius: '50%',
      background: 'radial-gradient(closest-side, rgba(8,40,52,.30), rgba(8,40,52,.12) 55%, rgba(8,40,52,0))' });
    SS.place(contact, AG.cx, AG.top + AG.h + 4);

    const root = SS.el('div', 'dm', w);
    Object.assign(root.style, { width: AG.w + 'px', height: AG.h + 'px',
      WebkitBoxReflect: 'below 6px linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 76%, rgba(0,0,0,.16) 100%)' });
    SS.place(root, AG.cx, AG.cy);
    // back cover (linen), thickness and lighting on its edges
    const cover = SS.el('div', 'dm', root);
    Object.assign(cover.style, SS.D.linen(C.linen), { width: AG.w + 'px', height: AG.h + 'px', borderRadius: '30px',
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,.18), inset 0 -5px 0 rgba(0,0,0,.24), inset 3px 0 0 rgba(255,255,255,.06), 0 2px 3px rgba(8,30,40,.20), 0 40px 70px -34px rgba(8,40,52,.60)' });
    // page block thickness (stacked page edges under the open page)
    const block = SS.el('div', 'dm', root);
    Object.assign(block.style, { left: '22px', top: '796px', width: '856px', height: '14px', borderRadius: '0 0 16px 16px',
      background: 'repeating-linear-gradient(180deg, #F4F1E9 0 2px, #DCD8CE 2px 3px)', boxShadow: '0 2px 3px rgba(0,0,0,.18)' });
    // Thursday's page
    const page = SS.el('div', 'dm', root);
    Object.assign(page.style, { left: '20px', top: '20px', width: '860px', height: '786px', borderRadius: '18px',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFCFB 100%)', boxShadow: '0 1px 0 rgba(0,0,0,.08), inset 0 0 0 1px rgba(0,0,0,.035)' });
    const HOURS = ['17 h', '18 h', '19 h', '20 h'].map((h, i) => `<div style="position:absolute;left:46px;top:${176 + i * 95}px;font-size:34px;font-weight:560;color:#7E8C89;white-space:nowrap">${h}</div>` +
      (i ? `<div style="position:absolute;left:30px;right:30px;top:${160 + i * 95}px;height:2px;background:#EEF3F3"></div>` : '')).join('');
    page.innerHTML = `<div style="position:absolute;left:46px;top:50px;display:flex;align-items:baseline;gap:18px;white-space:nowrap">
        <span class="dm-ttl" style="font-size:64px;font-weight:700;letter-spacing:-.035em;color:${C.ink}">Jeudi</span>
        <span style="font-size:36px;font-weight:540;letter-spacing:-.01em;color:${C.soft}">12 novembre</span></div>
      <div style="position:absolute;right:46px;top:66px;font-size:36px;font-weight:650;letter-spacing:-.015em;color:${C.ink2};white-space:nowrap">Julie</div>
      <div style="position:absolute;left:30px;right:30px;top:148px;height:2px;background:${C.line}"></div>${HOURS}`;
    // ring binding across the top edge: punched holes in the page, metal rings over the cover edge
    const rings = [];
    for (let i = 0; i < 13; i++) {
      const x = 96 + i * 59;
      const hole = SS.el('div', 'dm', root);
      Object.assign(hole.style, { left: x - 7 + 'px', top: '38px', width: '14px', height: '14px', borderRadius: '50%', background: '#D5DEDE',
        boxShadow: 'inset 0 2px 2px rgba(8,30,40,.28)' });
      const ring = SS.el('div', 'dm', root);
      Object.assign(ring.style, { left: x - 6 + 'px', top: '-16px', width: '12px', height: '62px', borderRadius: '6px',
        background: 'linear-gradient(90deg, #6F8488 0%, #C9D6D8 30%, #FFFFFF 46%, #AFC0C3 66%, #5F7478 100%)',
        boxShadow: '0 3px 4px -1px rgba(8,30,40,.35)' });
      rings.push(ring);
    }
    // the meeting cards (between the page and the pocket)
    const cards = CARDS.map((d) => {
      const el = SS.D.card(root, d);
      gsap.set(el, { x: CARD.x, y: CARD.rest, rotation: d.r });
      return el;
    });
    // pocket (front linen piece) with its folded hem; its lip casts a soft shadow on the cards
    const lip = SS.el('div', 'dm', root);
    Object.assign(lip.style, { left: '20px', top: POCKET.top - 26 + 'px', width: '860px', height: '26px',
      background: 'linear-gradient(0deg, rgba(8,40,52,.16), rgba(8,40,52,0))' });
    const pocket = SS.el('div', 'dm', root);
    Object.assign(pocket.style, SS.D.linen(C.linen2), { left: '20px', top: POCKET.top + 'px', width: '860px', height: POCKET.h + 'px',
      borderRadius: '6px 6px 18px 18px',
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,.22), inset 0 22px 0 rgba(255,255,255,.06), inset 0 24px 0 rgba(0,0,0,.14), inset 0 26px 3px rgba(0,0,0,.08), inset 0 -3px 0 rgba(0,0,0,.18), 0 -2px 6px rgba(8,40,52,.16)' });
    pocket.innerHTML = `<div style="position:absolute;left:0;right:0;top:0;bottom:0;border-radius:inherit;background:linear-gradient(115deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,.10) 100%)"></div>
      <div style="position:absolute;left:0;right:0;bottom:40px;text-align:center;font-size:34px;font-weight:650;letter-spacing:.02em;color:rgba(4,30,40,.40);text-shadow:0 1px 0 rgba(255,255,255,.14)">Équipe Exemple</div>`;

    // ---- 1 · the cards slide out in layers (back card first)
    cards.forEach((el, i) => {
      SS.tl.fromTo(el, { y: CARD.rest }, { y: CARD.fan[i], duration: SS.SPR.card.dur, ease: SS.SPR.card.ease }, T.cards + [0, 0.14, 0.24][i]);
    });
    SS.cue(T.cards, 'm-cards');
    // camera: slow push on the hook, then pull back to make room for the play bar
    cam.to(0, T.hookOut, 'sine.inOut', { y: 975, s: 1.03 });
    cam.to(T.pull, 0.55, SS.EZ.inOut, { y: 1060, s: 0.9 });

    // ---- 2 · rewind: the cards go back in, front card first (the hook played backwards)
    [2, 1, 0].forEach((i, k) => {
      SS.tl.fromTo(cards[i], { y: CARD.fan[i] }, { y: CARD.rest, duration: SS.SPR.card.dur, ease: SS.SPR.card.rev }, T.retract + [0, 0.12, 0.2][k]);
    });
    // exit: the camera tilts down fast (the planner leaves through the top, accelerating, speed blur),
    // ahead of the bar's track, which rises behind it into the search bar (no overlap at any frame)
    SS.tl.fromTo(wrap, { y: 0 }, { y: -1650, duration: 0.45, ease: 'power2.in' }, T.morph - 0.08);
    SS.tl.fromTo(P, { blur: 0 }, { blur: 7, duration: 0.3, ease: 'power2.in' }, T.morph - 0.02);

    // ================================================================ 7 · Thursday: the cards fly back in, the agenda closes
    // reset while the agenda is away (6–22 s): camera back to 1:1, no blur
    cam.to(12, 0.01, 'none', { y: 1000, s: 1 });
    SS.tl.fromTo(P, { blur: 7 }, { blur: 0, duration: 0.01, ease: 'none' }, 12);
    // it rises from below while the bar reaches Thursday 18 h 30 (Marc's card floats in front, 06-marc.js)
    SS.tl.fromTo(wrap, { y: 1750 }, { y: 0, duration: 0.55, ease: SS.EZ.out }, T.rise);
    SS.tl.fromTo(P, { blur: 5 }, { blur: 0, duration: 0.36, ease: 'power2.out' }, T.rise);
    // Marc's floating card is handed over (identical place, local top 315), then drops into its slot
    SS.tl.fromTo(cards[2], { y: CARD.rest }, { y: 315, duration: 0.001, ease: 'none' }, T.hand);
    SS.tl.fromTo(cards[2], { y: 315 }, { y: CARD.fan[2], duration: SS.SPR.card.dur, ease: SS.SPR.card.ease }, T.fly + 0.3);
    // Annie (from the right) and Sophie (from the left) fly in on arcs and drop into the pocket in layers
    [{ i: 0, x0: 1060, y0: -90, r0: 9, at: T.fly }, { i: 1, x0: -1020, y0: 20, r0: -10, at: T.fly + 0.1 }].forEach((f) => {
      const el = cards[f.i];
      SS.tl.fromTo(el, { x: f.x0 }, { x: CARD.x, duration: 0.6, ease: SS.EZ.out }, f.at);
      SS.tl.fromTo(el, { y: f.y0 }, { y: CARD.fan[f.i], duration: SS.SPR.card.dur * 1.3, ease: SS.SPR.card.ease }, f.at);
      SS.tl.fromTo(el, { rotation: f.r0 }, { rotation: CARDS[f.i].r, duration: 0.7, ease: SS.EZ.out }, f.at);
    });
    SS.cue(T.fly, 'm-fly');
    // the front cover swings down from the ring binding and closes over the page (accelerating)
    const fc = SS.el('div', 'dm', root);
    Object.assign(fc.style, SS.D.linen(C.linen), { width: AG.w + 'px', height: AG.h + 'px', borderRadius: '30px', transformOrigin: '50% 0%',
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,.18), inset 0 -5px 0 rgba(0,0,0,.24), inset 3px 0 0 rgba(255,255,255,.06), 0 3px 6px rgba(8,30,40,.25)' });
    fc.innerHTML = coverFace('Julie') + '<div class="sh" style="position:absolute;inset:0;border-radius:30px;background:#06222C"></div>';
    const shade = fc.querySelector('.sh');
    gsap.set(fc, { autoAlpha: 0, scaleY: 0.02 });
    gsap.set(shade, { opacity: 0.6 });
    rings.forEach((r) => root.appendChild(r)); // the rings stay over the closed cover
    SS.tl.fromTo(fc, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, ease: 'none' }, T.close);
    SS.tl.fromTo(fc, { scaleY: 0.02 }, { scaleY: 1, duration: T.press7 - T.close, ease: 'power2.in' }, T.close);
    SS.tl.fromTo(shade, { opacity: 0.6 }, { opacity: 0, duration: T.press7 - T.close, ease: 'power1.in' }, T.close);
    // the press: squash on the floor, contact shadow tightens, back on a soft spring
    gsap.set(root, { transformOrigin: '50% 100%' });
    SS.tl.fromTo(root, { scaleY: 1, scaleX: 1 }, { scaleY: 0.97, scaleX: 1.008, duration: 0.07, ease: 'power2.out' }, T.press7);
    SS.tl.fromTo(root, { scaleY: 0.97, scaleX: 1.008 }, { scaleY: 1, scaleX: 1, duration: SS.SPR.soft.dur, ease: SS.SPR.soft.ease }, T.press7 + 0.07);
    SS.tl.fromTo(contact, { scaleX: 1, scaleY: 1 }, { scaleX: 0.95, scaleY: 0.75, duration: 0.07, ease: 'power2.out' }, T.press7);
    SS.tl.fromTo(contact, { scaleX: 0.95, scaleY: 0.75 }, { scaleX: 1, scaleY: 1, duration: 0.4, ease: SS.EZ.out }, T.press7 + 0.07);
    cam.to(T.close, T.press7 - T.close + 0.1, 'sine.inOut', { s: 1.02 });
    // once closed, what lies under the cover is switched off (nothing reads through, nothing is drawn)
    SS.tl.fromTo([page, ...cards, lip, pocket], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.001, ease: 'none' }, T.press7 + 0.01);
    SS.cue(T.press7, 'sfx-close');
    // one ribbon per meeting drops out of the closed agenda and swings (precomputed light spring)
    ribbons(root, CARDS.map((d) => d.edge), [600, 640, 680]).forEach((rb, i) => {
      gsap.set(rb, { autoAlpha: 0, clipPath: RB_IN, rotation: 0 });
      SS.tl.fromTo(rb, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, ease: 'none' }, T.press7 + 0.02 + i * 0.05);
      SS.tl.fromTo(rb, { clipPath: RB_IN }, { clipPath: RB_OUT, duration: 0.26, ease: SS.EZ.out }, T.press7 + 0.02 + i * 0.05);
      const sw = SWING[i];
      SS.tl.fromTo(rb, { rotation: 12 - 3 * i }, { rotation: 0, duration: sw.dur, ease: sw.ease }, T.press7 + 0.02 + i * 0.05);
    });
    // Kevin's agenda (closed, two ribbons), hidden until the camera pulls back
    const kev = closedPlanner(w, 'Kevin', [CARDS[1].edge, CARDS[0].edge]);
    SS.place(kev.root, KEV.x, AG.cy, { autoAlpha: 0 });
    SS.place(kev.contact, KEV.x, AG.top + AG.h + 4, { autoAlpha: 0 });
    SS.tl.fromTo([kev.root, kev.contact], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, ease: 'none' }, T.back);
    // the camera pulls back: the team's week (Julie, Kevin)
    cam.to(T.back, 0.85, SS.EZ.inOut, { x: REVEAL.x, y: REVEAL.y, s: REVEAL.s });
    // exit into scene 8: whip down (the agenda leaves through the top)
    SS.tl.fromTo(wrap, { y: 0 }, { y: -1750, duration: 0.42, ease: 'power2.in' }, T.whip8);
    SS.tl.fromTo(P, { blur: 0 }, { blur: 7, duration: 0.3, ease: 'power2.in' }, T.whip8 + 0.06);

    R = { wrap, w, cam };
  }
  // ---- the outer face of a cover (debossed name and team), a closed planner, its ribbons
  function coverFace(name) {
    return `<div style="position:absolute;left:0;right:0;top:300px;text-align:center" class="dm-ttl"><span style="font-size:130px;font-weight:700;letter-spacing:-.035em;color:rgba(3,28,38,.40);text-shadow:0 2px 0 rgba(255,255,255,.12)">${name}</span></div>
      <div style="position:absolute;left:0;right:0;top:0;bottom:0;border-radius:30px;background:linear-gradient(115deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,.12) 100%)"></div>`;
  }
  function ribbons(parent, colors, xs) {
    return colors.map((c, i) => {
      const rb = SS.el('div', 'dm', parent);
      Object.assign(rb.style, { left: xs[i] - 13 + 'px', top: '812px', width: '26px', height: '150px', transformOrigin: '50% 0%',
        background: `linear-gradient(90deg, rgba(0,0,0,.14), rgba(255,255,255,.18) 45%, rgba(0,0,0,.08)), ${c}`,
        clipPath: RB_OUT, boxShadow: '0 2px 3px rgba(0,0,0,.2)' });
      return rb;
    });
  }
  function closedPlanner(parent, name, colors) {
    const contact = SS.el('div', 'a3', parent);
    Object.assign(contact.style, { width: '860px', height: '64px', borderRadius: '50%',
      background: 'radial-gradient(closest-side, rgba(8,40,52,.30), rgba(8,40,52,.12) 55%, rgba(8,40,52,0))' });
    const root = SS.el('div', 'dm', parent);
    Object.assign(root.style, { width: AG.w + 'px', height: AG.h + 'px',
      WebkitBoxReflect: 'below 6px linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 76%, rgba(0,0,0,.16) 100%)' });
    const back = SS.el('div', 'dm', root);
    Object.assign(back.style, SS.D.linen(C.linen), { width: AG.w + 'px', height: AG.h + 'px', borderRadius: '30px',
      boxShadow: '0 2px 3px rgba(8,30,40,.20), 0 40px 70px -34px rgba(8,40,52,.60)' });
    const fc = SS.el('div', 'dm', root);
    Object.assign(fc.style, SS.D.linen(C.linen), { width: AG.w + 'px', height: AG.h + 'px', borderRadius: '30px',
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,.18), inset 0 -5px 0 rgba(0,0,0,.24), inset 3px 0 0 rgba(255,255,255,.06)' });
    fc.innerHTML = coverFace(name);
    ribbons(root, colors, [620, 660]).forEach((rb, i) => gsap.set(rb, { rotation: i ? -2 : 1.5 }));
    for (let i = 0; i < 13; i++) {
      const ring = SS.el('div', 'dm', root);
      Object.assign(ring.style, { left: 96 + i * 59 - 6 + 'px', top: '-16px', width: '12px', height: '62px', borderRadius: '6px',
        background: 'linear-gradient(90deg, #6F8488 0%, #C9D6D8 30%, #FFFFFF 46%, #AFC0C3 66%, #5F7478 100%)', boxShadow: '0 3px 4px -1px rgba(8,30,40,.35)' });
    }
    return { root, contact };
  }
  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, P.blur);
  }
  const scene = { name: 'agenda', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.wrap, -1, T.morph + 0.4], [R.wrap, T.rise - 0.02, T.whip8 + 0.45]]; };
  SS.scenes.push(scene);
})();
