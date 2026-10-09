/* « Le lead perdu » · acts 1 and 2, the problem world (0–11.75 s), cool and desaturated.
   1 · Hook (0–3.0): readable at frame 0. A Google result "Commandité" for Longueuil, the team
       (8 brokers). A finger taps the ad, which squeezes into the lead card. "Qui le prend?"
   2 · Shared inbox (3.0–5.6): the team inbox opens around the lead card (shared element); the lead
       docks on top, "Non lu".
   3 · Time passes (5.6–8.4): the clock rolls from Tuesday evening to Wednesday afternoon; new leads
       land on top and push ours down. It stays unread.
   4 · Too late (8.4–10.8): someone finally opens it; the card turns grey and sags.
       "Trop tard." / "Le vendeur a signé ailleurs."
   Exit (10.8): rewind to Tuesday 21 h 04 (rows unwind, colour returns), the card contracts into the
   node that blooms into the ScaleSuite world (03-solution). Slow, heavy motion; no overshoot here. */
(function () {
  const SS = window.SS, L = SS.LT, P = SS.P;
  const AD = { y: 850 }, BAR = { y: 655 }, TEAM = { y: 1112, h: 220 };
  const IN = { top: 600, h: 1400, list: 776, gap: 14, rowH: 120 };
  const ROWS = [
    { id: 'A', t: 'Lead acheteur · Brossard', s: 'Google Ads · mar. 20 h 12', u: true },
    { id: 'B', t: 'Lead vendeur · Saint-Lambert', s: 'Google Ads · mar. 19 h 47', u: false },
    { id: 'C', t: "Demande d'info · Boucherville", s: 'Google Ads · mar. 18 h 30', u: true },
    { id: 'D', t: 'Lead acheteur · Montréal', s: 'Google Ads · mar. 17 h 05', u: false },
  ];
  const NEW = [ // inserted on top as time passes
    { id: 'I1', t: "Demande d'info · Montréal", s: 'Google Ads · mar. 23 h 41', u: true, at: L.c1 },
    { id: 'I2', t: 'Lead acheteur · Boucherville', s: 'Google Ads · mer. 7 h 58', u: true, at: L.c2 },
    { id: 'I3', t: 'Lead acheteur · Longueuil', s: 'Google Ads · mer. 13 h 55', u: true, at: L.c3 },
  ];
  // list order after k insertions → top (world y) of each item; the lead is 230 tall, rows 120
  const layout = (k) => {
    const order = [...NEW.slice(0, k).reverse().map((r) => r.id), 'LEAD', ...ROWS.map((r) => r.id)];
    const top = {};
    let y = IN.list;
    order.forEach((id) => { top[id] = y; y += (id === 'LEAD' ? SS.LEAD.h : IN.rowH) + IN.gap; });
    return top;
  };
  const LAY = [0, 1, 2, 3].map(layout);
  const leadY = (k) => LAY[k].LEAD + SS.LEAD.h / 2;
  SS.LEADY0 = leadY(0); // where the lead card contracts into the ScaleSuite node
  const CAM = { p: { x: 540, y: 960, s: 1, r: 0, blur: 0 } };

  function rowEl(parent, d) {
    const el = SS.el('div', 'lp-row', parent);
    Object.assign(el.style, { width: '864px', height: IN.rowH + 'px', borderRadius: '20px', background: '#fff', padding: '0 26px',
      boxShadow: '0 0 0 1px rgba(30,40,52,.06)' });
    el.innerHTML = `<span style="width:14px;height:14px;border-radius:50%;flex:none;background:${d.u ? P.slate : 'transparent'}"></span>
      <span style="display:flex;flex-direction:column;gap:6px"><span style="font-size:36px;font-weight:${d.u ? 740 : 600};letter-spacing:-.02em;color:${d.u ? P.ink : P.soft}">${d.t}</span>
      <span style="font-size:30px;font-weight:550;color:${P.soft}">${d.s}</span></span>
      ${d.u ? `<span class="lp-chip" style="margin-left:auto;background:${P.line};color:${P.ink}">Non lu</span>` : ''}`;
    return el;
  }

  let R;
  function build(stage) {
    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera(CAM.p);
    cam.set({ x: 540, y: 960, s: 1, r: 0 });

    // ================================================================ 1 · hook
    const bar = SS.el('div', 'lp-card', w);
    Object.assign(bar.style, { width: '900px', height: '100px', borderRadius: '50px', background: '#fff', display: 'flex', alignItems: 'center', gap: '20px', padding: '0 38px' });
    bar.innerHTML = `<span style="width:40px;height:40px;display:block;flex:none">${SS.icon.search(P.soft)}</span><span style="font-size:38px;font-weight:560;letter-spacing:-.015em;color:${P.ink};white-space:nowrap">vendre maison Longueuil</span>`;
    SS.place(bar, 540, BAR.y);
    const ad = SS.adCardLP(w);
    SS.place(ad.el, 540, AD.y, { clipPath: SS.clipR(0, 0, 0, 0, 26) });
    const team = SS.el('div', 'lp-card', w);
    Object.assign(team.style, { width: '900px', height: TEAM.h + 'px', borderRadius: '30px' });
    team.innerHTML = `<div style="position:absolute;left:36px;top:26px;font-size:32px;font-weight:650;letter-spacing:-.01em;color:${P.soft};white-space:nowrap">Votre équipe · 8 courtiers</div>`;
    const avs = Array.from({ length: 8 }, (_, i) => {
      const a = SS.el('div', 'a3', team);
      Object.assign(a.style, { width: '84px', height: '84px' });
      a.innerHTML = `<div style="width:100%;height:100%">${SS.icon.person(P.avFg, P.avBg)}</div>`;
      gsap.set(a, { x: 30 + i * 108, y: 96 });
      return a;
    });
    SS.place(team, 540, TEAM.y);
    // the tap, the ad squeezes into the lead card (anticipation, then swap at identical size)
    const rip = SS.ripple(w, { fill: 'rgba(110,128,146,.22)', ring: P.slate });
    SS.tap(rip, 330, AD.y + 20, L.tap0);
    SS.tl.fromTo(ad.el, { scale: 1 }, { scale: 0.975, duration: 0.08, ease: 'power2.out' }, L.tap0);
    SS.tl.fromTo(ad.el, { scale: 0.975 }, { scale: 1, duration: 0.24, ease: 'power2.out' }, L.tap0 + 0.08);
    SS.tl.fromTo(ad.ct, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -18, duration: 0.18, ease: SS.EZ.in }, L.squeeze0);
    SS.tl.fromTo(ad.el, { clipPath: SS.clipR(0, 0, 0, 0, 26) }, { clipPath: SS.clipR(10, 30, 10, 30, 30), duration: 0.22, ease: SS.EZ.inOut }, L.squeeze0);
    SS.tl.set(ad.el, { autoAlpha: 0 }, L.lead0);
    SS.cue(L.tap0, 'm-tap0');

    const lead = SS.leadCard(w, { chips: [
      ['nonlu', `<span style="width:12px;height:12px;border-radius:50%;background:${P.ink}"></span>Non lu`, P.line, P.ink],
      ['ouvert', 'Ouvert · mer. 14 h 32', '#E6E9EC', P.soft],
    ] });
    const dot = lead.pill.querySelector('.dt');
    gsap.set(dot, { backgroundColor: '#AFC0CF', boxShadow: '0 0 0 6px rgba(175,192,207,.3)' });
    SS.place(lead.el, 540, AD.y, { autoAlpha: 0 });
    gsap.set(lead.in, { autoAlpha: 0, y: 16 });
    Object.values(lead.chips).forEach((c) => gsap.set(c, { yPercent: 130 }));
    SS.tl.set(lead.el, { autoAlpha: 1 }, L.lead0);
    SS.tl.fromTo(lead.in, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: SS.EZ.out }, L.lead0);
    // the team looks up: each avatar rises a little, one after the other (no overshoot in this world)
    avs.forEach((a, i) => {
      SS.tl.fromTo(a, { y: 96 }, { y: 84, duration: 0.22, ease: 'sine.out' }, L.look + i * 0.05);
      SS.tl.fromTo(a, { y: 84 }, { y: 96, duration: 0.32, ease: 'sine.inOut' }, L.look + i * 0.05 + 0.22);
    });
    // hook exits: the bar leaves upward, the team downward
    SS.tl.fromTo(bar, { autoAlpha: 1, y: BAR.y }, { autoAlpha: 0, y: BAR.y - 140, duration: 0.3, ease: SS.EZ.in }, L.hookOut);
    SS.tl.fromTo(team, { autoAlpha: 1, y: TEAM.y }, { autoAlpha: 0, y: TEAM.y + 320, duration: 0.34, ease: SS.EZ.in }, L.hookOut);

    // ================================================================ 2 · the shared inbox opens around the lead
    const box = SS.el('div', 'lp-card', w);
    Object.assign(box.style, { width: '900px', height: IN.h + 'px', borderRadius: '34px', background: P.card, boxShadow: SS.SHADOW.pHi });
    const fromLead = SS.clipR(AD.y - SS.LEAD.h / 2 - IN.top, 30, IN.h - (AD.y - SS.LEAD.h / 2 - IN.top) - SS.LEAD.h, 30, 30);
    SS.place(box, 540, IN.top + IN.h / 2, { autoAlpha: 0, clipPath: fromLead });
    w.appendChild(lead.el); // the lead card stays above the inbox
    const content = SS.el('div', 'a3', box);
    Object.assign(content.style, { width: '900px', height: IN.h + 'px' });
    content.innerHTML = `<div style="position:absolute;left:36px;top:30px;font-size:40px;font-weight:760;letter-spacing:-.02em;color:${P.ink};white-space:nowrap">Boîte de l'équipe</div>
      <div style="position:absolute;left:36px;top:94px;font-size:30px;font-weight:600;color:${P.soft};white-space:nowrap">1 campagne Google Ads · 8 courtiers</div>
      <div style="position:absolute;left:22px;right:22px;top:158px;height:2px;background:${P.line}"></div>`;
    const clock = SS.el('div', 'lp-chip', content);
    Object.assign(clock.style, { position: 'absolute', right: '60px', top: '26px', height: '56px', background: P.line, color: P.ink, fontSize: '34px', fontWeight: 700, fontFeatureSettings: "'tnum' 1", gap: '12px' });
    clock.innerHTML = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${P.ink}" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
    const roll = SS.roller(clock, ['mar. 21 h 04', 'mar. 23 h 47', 'mer. 8 h 15', 'mer. 14 h 32'], { h: 56, align: 'left' });
    roll.win.style.width = '214px';
    SS.tl.set(box, { autoAlpha: 1 }, L.inbox);
    SS.tl.fromTo(box, { clipPath: fromLead }, { clipPath: SS.OPEN, duration: 0.62, ease: SS.EZ.out }, L.inbox);
    SS.tl.fromTo(lead.el, { y: AD.y }, { y: leadY(0), duration: 0.5, ease: SS.EZ.inOut }, L.inbox + 0.05);
    SS.cue(L.inbox, 'm-inbox');
    const rows = {};
    ROWS.forEach((d, i) => {
      const el = rowEl(content, d);
      const top = LAY[0][d.id] - IN.top;
      gsap.set(el, { x: 18, y: top + 26, autoAlpha: 0 });
      SS.tl.fromTo(el, { y: top + 26, autoAlpha: 0 }, { y: top, autoAlpha: 1, duration: 0.45, ease: SS.EZ.out }, L.rows + i * 0.06);
      rows[d.id] = el;
    });
    // the lead is marked unread
    SS.tl.fromTo(lead.chips.nonlu, { yPercent: 130 }, { yPercent: 0, duration: 0.4, ease: SS.EZ.out }, L.unread);

    // ================================================================ 3 · time passes, new leads land on top
    NEW.forEach((d, k) => {
      const el = rowEl(content, d);
      const top = LAY[k + 1][d.id] - IN.top;
      gsap.set(el, { x: 18, y: top, scale: 0.96, autoAlpha: 0 });
      SS.tl.fromTo(el, { scale: 0.96, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.36, ease: SS.EZ.out }, d.at + 0.26);
      rows[d.id] = el;
      // everything below shifts down by one row
      Object.keys(rows).filter((id) => id !== d.id && LAY[k][id] != null).forEach((id) => {
        SS.tl.fromTo(rows[id], { y: LAY[k][id] - IN.top }, { y: LAY[k + 1][id] - IN.top, duration: 0.45, ease: SS.EZ.inOut }, d.at);
      });
      SS.tl.fromTo(lead.el, { y: leadY(k) }, { y: leadY(k + 1), duration: 0.45, ease: SS.EZ.inOut }, d.at);
      roll.to(d.at - 0.05, k + 1, 0.42);
      SS.cue(d.at, 'm-clock', { k: k + 1 });
    });

    // ================================================================ 4 · opened too late
    const rip2 = SS.ripple(w, { fill: 'rgba(110,128,146,.22)', ring: P.slate });
    SS.tap(rip2, 330, leadY(3) + 10, L.tapLate);
    SS.tl.fromTo(lead.chips.nonlu, { yPercent: 0 }, { yPercent: -130, duration: 0.24, ease: SS.EZ.in }, L.opened);
    SS.tl.fromTo(lead.chips.ouvert, { yPercent: 130 }, { yPercent: 0, duration: 0.4, ease: SS.EZ.out }, L.opened + 0.12);
    const G = 0.8, GE = 'power2.inOut';
    SS.tl.fromTo(lead.el, { backgroundColor: '#ffffff' }, { backgroundColor: P.gray, duration: G, ease: GE }, L.gray);
    SS.tl.fromTo(lead.pill, { backgroundColor: '#1A1A1A' }, { backgroundColor: P.grayPill, duration: G, ease: GE }, L.gray);
    SS.tl.fromTo(dot, { backgroundColor: '#AFC0CF' }, { backgroundColor: '#D3D8DD', duration: G, ease: GE }, L.gray);
    SS.tl.fromTo(lead.ti, { color: P.ink }, { color: P.grayText, duration: G, ease: GE }, L.gray);
    SS.tl.fromTo(lead.tm, { color: P.soft }, { color: '#A3AAB2', duration: G, ease: GE }, L.gray);
    SS.tl.fromTo(lead.el, { boxShadow: SS.SHADOW.pHi }, { boxShadow: SS.SHADOW.p, duration: G, ease: GE }, L.gray);
    SS.tl.fromTo(lead.el, { y: leadY(3) }, { y: leadY(3) + 10, duration: 0.9, ease: GE }, L.gray);
    SS.tl.fromTo(content, { opacity: 1 }, { opacity: 0.35, duration: 0.5, ease: 'power1.inOut' }, L.gray + 0.08);
    // camera: slow push on the card, which keeps its place on screen
    const s1 = 1.06, ly = leadY(3);
    cam.to(L.tapLate + 0.05, 0.9, SS.EZ.inOut, { y: ly - (ly - 960) / s1, s: s1 });
    SS.cue(L.gray, 'm-gray'); SS.cue(L.late, 'm-late');

    // ================================================================ rewind to Tuesday 21 h 04, contract into the node
    const RW = 0.34, RE = 'power2.inOut';
    cam.to(L.rewind, RW, RE, { y: 960, s: 1 });
    roll.to(L.rewind, 0, RW, RE);
    NEW.slice().reverse().forEach((d, j) => {
      const top = LAY[3][d.id] - IN.top;
      SS.tl.fromTo(rows[d.id], { scale: 1, autoAlpha: 1 }, { scale: 0.96, autoAlpha: 0, duration: 0.2, ease: SS.EZ.in }, L.rewind + j * 0.03);
    });
    ROWS.forEach((d) => SS.tl.fromTo(rows[d.id], { y: LAY[3][d.id] - IN.top }, { y: LAY[0][d.id] - IN.top, duration: RW, ease: RE }, L.rewind));
    SS.tl.fromTo(lead.el, { y: leadY(3) + 10 }, { y: leadY(0), duration: RW, ease: RE }, L.rewind);
    SS.tl.fromTo(content, { opacity: 0.35 }, { opacity: 1, duration: RW, ease: RE }, L.rewind);
    SS.tl.fromTo(lead.el, { backgroundColor: P.gray }, { backgroundColor: '#ffffff', duration: RW, ease: RE }, L.rewind);
    SS.tl.fromTo(lead.pill, { backgroundColor: P.grayPill }, { backgroundColor: '#1A1A1A', duration: RW, ease: RE }, L.rewind);
    SS.tl.fromTo(dot, { backgroundColor: '#D3D8DD' }, { backgroundColor: '#AFC0CF', duration: RW, ease: RE }, L.rewind);
    SS.tl.fromTo(lead.ti, { color: P.grayText }, { color: P.ink, duration: RW, ease: RE }, L.rewind);
    SS.tl.fromTo(lead.tm, { color: '#A3AAB2' }, { color: P.soft, duration: RW, ease: RE }, L.rewind);
    SS.tl.fromTo(lead.el, { boxShadow: SS.SHADOW.p }, { boxShadow: SS.SHADOW.pHi, duration: RW, ease: RE }, L.rewind);
    SS.tl.fromTo(lead.chips.ouvert, { yPercent: 0 }, { yPercent: 130, duration: 0.22, ease: SS.EZ.in }, L.rewind);
    SS.cue(L.rewind, 'sfx-rewind');
    SS.tl.fromTo(lead.el, { scale: 1 }, { scale: 0.03, duration: 0.24, ease: SS.EZ.in }, L.contract);
    SS.tl.fromTo(lead.el, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.05, ease: 'none' }, L.contract + 0.2);
    const B = { blur: 0 };
    SS.tl.fromTo(B, { blur: 0 }, { blur: 5, duration: 0.16, ease: 'power2.in' }, L.rewind + 0.02);
    SS.tl.fromTo(B, { blur: 5 }, { blur: 0, duration: 0.16, ease: 'power2.out' }, L.rewind + 0.18);

    // ================================================================ headlines (screen space, cool scrim)
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 600, '238,241,244');
    gsap.set(scrim, { x: 0, y: 0 });
    const opt = { size: 104, maxW: 940, accent: P.slate, color: P.ink };
    const h1 = SS.text(layer, 'Un lead vendeur\narrive à *21_h.*', opt);
    SS.place(h1.el, 540, 330);
    gsap.set(h1.words.map((x) => x.el), { yPercent: 0 });
    SS.wordsOut(h1, L.hookOut, { st: 0.02 });
    const h1b = SS.text(layer, 'Qui le *prend?*', opt);
    SS.place(h1b.el, 540, 492);
    SS.hideWords(h1b);
    SS.wordsIn(h1b, L.ask, { st: 0.07 });
    SS.wordsOut(h1b, L.hookOut + 0.04, { st: 0.02 });
    const h2 = SS.text(layer, "Une boîte pour\ntoute *l'équipe.*", opt);
    SS.place(h2.el, 540, 330);
    SS.hideWords(h2);
    SS.wordsIn(h2, L.inboxHead, { st: 0.06 });
    SS.wordsOut(h2, L.inboxOut, { st: 0.02 });
    const h3 = SS.text(layer, 'Toujours\n*non_lu.*', Object.assign({}, opt, { size: 116 }));
    SS.place(h3.el, 540, 330);
    SS.hideWords(h3);
    SS.wordsIn(h3, L.stillHead, { st: 0.07 });
    SS.wordsOut(h3, L.stillOut, { st: 0.02 });
    const h4 = SS.text(layer, 'Trop tard.', Object.assign({}, opt, { size: 150 }));
    SS.place(h4.el, 540, 322);
    SS.hideWords(h4);
    SS.wordsIn(h4, L.late, { st: 0.08, dur: 0.8 });
    SS.wordsOut(h4, L.rewind, { st: 0.02 });
    const h5 = SS.text(layer, 'Le vendeur a signé ailleurs.', { size: 56, weight: 600, color: P.soft, tracking: -0.02, maxW: 940 });
    SS.place(h5.el, 540, 452);
    SS.hideWords(h5);
    SS.wordsIn(h5, L.signed, { st: 0.04, dur: 0.6 });
    SS.wordsOut(h5, L.rewind + 0.02, { st: 0.015 });
    SS.cue(L.ask, 'm-ask'); SS.cue(L.signed, 'm-signed');

    R = { wrap, w, cam, layer, B };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, R.B.blur);
  }

  const scene = { name: 'probleme', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.wrap, -1, L.bloom + 0.6], [R.layer, -1, L.rewind + 0.4]]; };
  SS.scenes.push(scene);
})();
