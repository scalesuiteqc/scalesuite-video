/* « Gardez vos courtiers » · the team world (0–25 s), one camera. The team grid is the film's single
   thread: 8 broker cards (2 × 4), present from the first frame to the logo.
   1 · Hook: Courtier 04's seat is empty (dashed "Poste à combler"); « Quelques mois plus tôt », his
       card slides back in (the departure, played backwards).
   2 · The camera tilts up to the shared pool "Leads Google Ads": leads drop in.
   3 · Leads leave the pool one by one and land on cards. Who decides is never shown, only the result
       seen from Courtier 04: the sellers go to others, he gets "Demande d'info" (×2).
   4 · His card lifts, greys and slides out of the grid, slowly. The empty seat is back.
   5 · The pool contracts into the node that blooms (01-fond). The grid takes the ScaleSuite colours and
       every card gets its own campaign, one distinct sector each; La Prairie stays free on the seat.
   6 · Each campaign produces its lead in place ("+1" on its own chip): no lead travels between cards.
   7 · The offer card rises over the dimmed grid, then tightens into the empty seat and becomes
       Courtier 09 (La Prairie). The warm moment.
   8 · The grid gathers into the node of the end card (04-fin). */
(function () {
  const SS = window.SS, L = SS.ET, P = SS.P, C = SS.C, G = SS.GRID;
  const POOL = { cx: 540, cy: 730, w: 900, h: 260, top: 600 };
  const SLOT = (k) => POOL.top + 74 + k * 60;
  const PILLX = 126;
  const LEADS = [
    { t: 'Lead vendeur · Brossard', to: 1, chip: 'Lead vendeur' },
    { t: 'Lead vendeur · Saint-Lambert', to: 5, chip: 'Lead vendeur' },
    { t: "Demande d'info · Montréal", to: 3, chip: "Demande d'info" },
    { t: 'Lead acheteur · Longueuil', to: 6, chip: 'Lead acheteur' },
    { t: "Demande d'info · Laval", to: 3, chip: null }, // second one for Courtier 04: badge "2"
  ];
  const EVENTS = [[3.25, 'add', 0], [3.4, 'add', 1], [3.55, 'add', 2], [5.2, 'go', 0], [5.65, 'go', 1], [5.85, 'add', 3],
    [6.1, 'go', 2], [6.3, 'add', 4], [6.55, 'go', 3], [7.0, 'go', 4]];
  const FLY = 0.55;
  const SPROUT = [1, 0, 6, 2]; // Laval, Montréal, Boucherville, Longueuil
  const OFFER = { cx: 540, cy: 1198, w: 900, h: 330 };
  const SEAT = { x: G.cx(SS.LEAVER), y: G.cy(SS.LEAVER) };

  function campChip(parent, sector, dashed) {
    const c = SS.el('div', 'lp-chip', parent);
    Object.assign(c.style, { position: 'absolute', left: '0px', top: '0px', height: '46px', padding: '0 16px', gap: '8px',
      background: dashed ? 'transparent' : C.mint, color: '#0F6F66', boxShadow: dashed ? 'none' : 'inset 0 0 0 2px rgba(43,191,179,.45)',
      border: dashed ? '2px dashed #7FCFC6' : 'none' });
    c.innerHTML = `<span style="width:28px;height:28px;display:block">${SS.icon.pin(dashed ? '#7FCFC6' : C.green)}</span>${sector}`;
    return c;
  }
  function brokerCard(parent, i, name, sector) {
    const el = SS.el('div', 'eq-card', parent);
    Object.assign(el.style, { width: G.w + 'px', height: G.h + 'px', background: P.card, boxShadow: SS.SHADOW.p });
    const avG = SS.el('div', 'a3', el, SS.icon.person(P.avFg, P.avBg));
    const avM = SS.el('div', 'a3', el, SS.icon.person());
    [avG, avM].forEach((a) => { Object.assign(a.style, { left: '22px', top: '32px', width: '76px', height: '76px' }); a.firstChild.style.display = 'block'; });
    gsap.set(avM, { autoAlpha: 0 });
    const nm = SS.el('div', 'a3', el, `Courtier ${name}`);
    Object.assign(nm.style, { left: '116px', top: '18px', fontSize: '40px', fontWeight: 720, letterSpacing: '-.02em', color: P.ink, whiteSpace: 'nowrap' });
    const line = SS.el('div', 'a3', el);
    Object.assign(line.style, { left: '116px', top: '80px', width: '300px', height: '46px' });
    const skel = SS.el('div', 'a3 skel', line);
    Object.assign(skel.style, { top: '16px', width: '150px', height: '14px', background: '#E3E8ED' });
    const camp = campChip(line, sector, false);
    gsap.set(camp, { autoAlpha: 0, scale: 0.8, transformOrigin: 'left center' });
    return { el, avG, avM, nm, line, skel, camp };
  }
  function badge(parent, txt, bg, x) {
    const b = SS.el('div', 'eq-badge', parent, txt);
    Object.assign(b.style, { left: x + 'px', top: '-14px', background: bg, color: '#fff' }); // corner of the chip, clear of its text
    gsap.set(b, { scale: 0, autoAlpha: 0 });
    return b;
  }

  let R;
  function build(stage) {
    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera({ x: 540, y: SS.CAMY.hook, s: 1, r: 0, blur: 0 });
    cam.set({ x: 540, y: SS.CAMY.hook, s: 1, r: 0 });

    // ================================================================ the empty seat (under Courtier 04's card)
    const seat = SS.el('div', 'eq-card', w);
    Object.assign(seat.style, { width: G.w + 'px', height: G.h + 'px', border: '3px dashed #AEB9C4', background: 'rgba(255,255,255,.35)' });
    const seatTx = SS.el('div', 'a3', seat, 'Poste à combler');
    Object.assign(seatTx.style, { left: '30px', top: '20px', fontSize: '36px', fontWeight: 650, letterSpacing: '-.015em', color: P.soft, whiteSpace: 'nowrap' });
    const seatLine = SS.el('div', 'a3', seat);
    Object.assign(seatLine.style, { left: '30px', top: '78px', width: '300px', height: '46px' });
    const seatChip = campChip(seatLine, SS.TEAM[SS.LEAVER].s, true);
    gsap.set(seatChip, { autoAlpha: 0, scale: 0.8, transformOrigin: 'left center' });
    SS.place(seat, SEAT.x, SEAT.y);

    // ================================================================ the team grid
    const cards = SS.TEAM.map((m, i) => {
      const c = brokerCard(w, i, m.n, m.s);
      SS.place(c.el, G.cx(i), G.cy(i));
      return c;
    });
    const c04 = cards[SS.LEAVER];
    gsap.set(c04.el, { x: SEAT.x + 760 });
    // focus ring on Courtier 04 (his point of view)
    const ring = SS.el('div', 'a3', c04.el);
    Object.assign(ring.style, { left: '-6px', top: '-6px', width: G.w + 12 + 'px', height: G.h + 12 + 'px', borderRadius: '30px', boxShadow: `0 0 0 3px ${P.slate}` });
    gsap.set(ring, { autoAlpha: 0 });
    // received-lead chips (problem world)
    const probChips = {};
    LEADS.forEach((d) => {
      if (!d.chip || probChips[d.to]) return;
      const ch = SS.el('div', 'lp-chip', cards[d.to].line);
      Object.assign(ch.style, { position: 'absolute', left: '0px', top: '0px', height: '46px', padding: '0 16px',
        background: d.to === SS.LEAVER ? '#E9ECEF' : '#DCE3EA', color: d.to === SS.LEAVER ? P.soft : P.ink });
      ch.textContent = d.chip;
      gsap.set(ch, { autoAlpha: 0, scale: 0.9, transformOrigin: 'left center' });
      probChips[d.to] = ch;
    });
    const b04 = badge(c04.line, '2', P.slate, probChips[SS.LEAVER].offsetWidth - 8);

    // 1 · hook: « Quelques mois plus tôt », Courtier 04 comes back to his seat
    SS.tl.fromTo(c04.el, { x: SEAT.x + 760 }, { x: SEAT.x, duration: 0.6, ease: SS.EZ.out }, L.back);
    SS.cue(L.back, 'm-back');

    // ================================================================ 2 · the shared pool
    const pool = SS.el('div', 'lp-card', w);
    Object.assign(pool.style, { width: POOL.w + 'px', height: POOL.h + 'px', borderRadius: '30px', boxShadow: SS.SHADOW.pHi });
    pool.innerHTML = `<div style="position:absolute;left:36px;top:20px;font-size:32px;font-weight:680;letter-spacing:-.01em;color:${P.ink};white-space:nowrap">Bassin commun<span style="font-weight:560;color:${P.soft}"> · Leads Google Ads</span></div>`;
    SS.place(pool, POOL.cx, POOL.cy - 40, { autoAlpha: 0 });
    SS.tl.fromTo(pool, { autoAlpha: 0, y: POOL.cy - 40 }, { autoAlpha: 1, y: POOL.cy, duration: 0.5, ease: SS.EZ.out }, L.pool);
    const pills = LEADS.map((d) => {
      const p = SS.el('div', 'lp-chip', w);
      Object.assign(p.style, { position: 'absolute', left: '0px', top: '0px', background: '#E3E8ED', color: P.ink, fontWeight: 650, boxShadow: '0 0 0 1px rgba(30,40,52,.05)' });
      p.textContent = d.t;
      gsap.set(p, { x: PILLX, y: SLOT(0), autoAlpha: 0 });
      return p;
    });
    // queue: drop in at the end, leave from the front, the rest moves up one slot
    const q = [];
    EVENTS.forEach(([t, kind, k]) => {
      if (kind === 'add') {
        const s = q.length;
        q.push(k);
        gsap.set(pills[k], { y: SLOT(s) - 24 });
        SS.tl.fromTo(pills[k], { y: SLOT(s) - 24, autoAlpha: 0 }, { y: SLOT(s), autoAlpha: 1, duration: 0.3, ease: SS.EZ.out }, t);
        return;
      }
      const from = q.indexOf(k);
      q.splice(from, 1);
      q.forEach((j, s) => { if (s >= from) SS.tl.fromTo(pills[j], { y: SLOT(s + 1) }, { y: SLOT(s), duration: 0.3, ease: SS.EZ.inOut }, t + 0.08); });
      // the flight: an arc (x eased in-out, y eased in) from the pool to the card's second line
      const d = LEADS[k], i = d.to;
      const tx = G.cx(i) - G.w / 2 + 116, ty = G.cy(i) - G.h / 2 + 80 - 3;
      SS.tl.fromTo(pills[k], { x: PILLX }, { x: tx, duration: FLY, ease: 'power2.inOut' }, t);
      SS.tl.fromTo(pills[k], { y: SLOT(from) }, { y: ty, duration: FLY, ease: 'power2.in' }, t);
      SS.tl.fromTo(pills[k], { scale: 1 }, { scale: 0.92, duration: FLY, ease: 'power2.inOut' }, t);
      SS.tl.fromTo(pills[k], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12, ease: 'power1.in' }, t + FLY - 0.06);
      if (d.chip) {
        SS.tl.fromTo(probChips[i], { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.25, ease: SS.EZ.out }, t + FLY - 0.08);
        SS.tl.fromTo(cards[i].skel, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: 'power1.in' }, t + FLY - 0.1);
      } else {
        SS.tl.fromTo(b04, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: SS.EZ.out }, t + FLY - 0.05);
      }
      SS.cue(t, 'm-assign', { to: i });
    });
    SS.tl.fromTo(ring, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power1.out' }, L.focus);

    // ================================================================ 4 · the departure (sober, slow)
    SS.tl.fromTo(ring, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, L.lift - 0.05);
    SS.tl.fromTo(c04.el, { y: SEAT.y }, { y: SEAT.y - 10, duration: 0.25, ease: SS.EZ.out }, L.lift);
    SS.tl.fromTo(c04.el, { boxShadow: SS.SHADOW.p }, { boxShadow: SS.SHADOW.pHi, duration: 0.25, ease: SS.EZ.out }, L.lift);
    const GD = 0.6, GE = 'power2.inOut';
    SS.tl.fromTo(c04.el, { backgroundColor: P.card }, { backgroundColor: '#E6E9ED', duration: GD, ease: GE }, L.gray);
    SS.tl.fromTo(c04.nm, { color: P.ink }, { color: P.grayText, duration: GD, ease: GE }, L.gray);
    SS.tl.fromTo([c04.avG, c04.line], { opacity: 1 }, { opacity: 0.5, duration: GD, ease: GE }, L.gray);
    SS.tl.fromTo(c04.el, { x: SEAT.x }, { x: SEAT.x + 760, duration: 1.0, ease: 'power2.in' }, L.leave);
    SS.tl.fromTo(c04.el, { y: SEAT.y - 10 }, { y: SEAT.y + 30, duration: 1.0, ease: 'sine.inOut' }, L.leave);
    SS.cue(L.leave, 'sfx-leave');

    // ================================================================ 5 · bascule: the pool contracts, the grid takes the brand colours
    SS.tl.fromTo(pool, { scale: 1 }, { scale: 0.03, duration: 0.24, ease: SS.EZ.in }, L.bascule);
    SS.tl.fromTo(pool, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.05, ease: 'none' }, L.bascule + 0.2);
    SS.cue(L.bascule, 'sfx-bascule');
    const RC = 0.5, RE = 'power2.inOut';
    const stay = cards.filter((c, i) => i !== SS.LEAVER);
    stay.forEach((c) => {
      SS.tl.fromTo(c.el, { backgroundColor: P.card }, { backgroundColor: '#ffffff', duration: RC, ease: RE }, L.recolor);
      SS.tl.fromTo(c.el, { boxShadow: SS.SHADOW.p }, { boxShadow: SS.SHADOW.m, duration: RC, ease: RE }, L.recolor);
      SS.tl.fromTo(c.nm, { color: P.ink }, { color: C.ink, duration: RC, ease: RE }, L.recolor);
      SS.tl.fromTo(c.avG, { autoAlpha: 1 }, { autoAlpha: 0, duration: RC, ease: RE }, L.recolor);
      SS.tl.fromTo(c.avM, { autoAlpha: 0 }, { autoAlpha: 1, duration: RC, ease: RE }, L.recolor);
    });
    SS.tl.fromTo(Object.keys(probChips).filter((i) => +i !== SS.LEAVER).map((i) => probChips[i]), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25, ease: SS.EZ.in }, L.recolor);
    const bareSkels = cards.filter((c, i) => i !== SS.LEAVER && !probChips[i]).map((c) => c.skel);
    SS.tl.fromTo(bareSkels, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25, ease: SS.EZ.in }, L.recolor);
    SS.tl.fromTo(seat, { borderColor: '#AEB9C4' }, { borderColor: '#8FD3CA', duration: RC, ease: RE }, L.recolor);
    SS.tl.fromTo(seatTx, { color: P.soft }, { color: C.soft, duration: RC, ease: RE }, L.recolor);
    // one campaign per broker, one distinct sector each (La Prairie stays free on the seat)
    cards.forEach((c, i) => {
      const target = i === SS.LEAVER ? seatChip : c.camp;
      SS.tl.fromTo(target, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.42, ease: SS.EZ.dock }, L.chips + i * 0.06);
    });
    SS.cue(L.chips, 'm-chips');

    // ================================================================ 6 · each campaign produces its own lead, in place
    SPROUT.forEach((i, k) => {
      const at = L.sprouts[k], c = cards[i];
      const dot = SS.el('div', 'a3', c.line);
      Object.assign(dot.style, { left: c.camp.offsetWidth / 2 - 8 + 'px', top: '15px', width: '16px', height: '16px', borderRadius: '50%', background: C.green });
      gsap.set(dot, { autoAlpha: 0, x: 0, y: 0, scale: 0.5 });
      const bx = c.camp.offsetWidth - 8;
      const b = badge(c.line, '+1', C.green, bx);
      SS.tl.fromTo(dot, { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, duration: 0.15, ease: SS.EZ.out }, at);
      SS.tl.fromTo(dot, { x: 0, y: 0 }, { x: bx + 23 - (c.camp.offsetWidth / 2), y: -14, duration: 0.3, ease: 'power2.inOut' }, at + 0.05);
      SS.tl.fromTo(dot, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.08, ease: 'none' }, at + 0.32);
      SS.tl.fromTo(b, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.42, ease: 'back.out(1.4)' }, at + 0.3);
      SS.cue(at, 'm-sprout', { i });
    });

    // ================================================================ 7 · the offer, then Courtier 09 takes the seat
    const offer = SS.el('div', 'lp-card', w);
    Object.assign(offer.style, { width: OFFER.w + 'px', height: OFFER.h + 'px', borderRadius: '34px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    offer.innerHTML = `<div class="oc" style="position:absolute;inset:0">
        <div class="lp-chip" style="position:absolute;left:36px;top:30px;background:${C.mint};color:#0F6F66;box-shadow:inset 0 0 0 2px rgba(43,191,179,.45)">Offre · Nouveau courtier</div>
        <div style="position:absolute;left:36px;top:104px;font-size:46px;font-weight:780;letter-spacing:-.025em;line-height:1.16;color:${C.ink};white-space:nowrap">Votre propre campagne<br>Google Ads, dans votre secteur.</div>
        <div class="lp-chip" style="position:absolute;left:36px;top:246px;background:#F2F7F6;color:${C.soft};gap:10px"><span style="width:30px;height:30px;display:block">${SS.icon.target(C.green)}</span>Optimisée chaque semaine</div></div>`;
    const oc = offer.querySelector('.oc');
    SS.place(offer, OFFER.cx, OFFER.cy + 70, { autoAlpha: 0 });
    SS.tl.fromTo(offer, { autoAlpha: 0, y: OFFER.cy + 70 }, { autoAlpha: 1, y: OFFER.cy, duration: 0.55, ease: SS.EZ.out }, L.offer);
    const dimmable = [...stay.map((c) => c.el), seat];
    SS.tl.fromTo(dimmable, { opacity: 1 }, { opacity: 0.3, duration: 0.4, ease: 'power1.inOut' }, L.offer);
    SS.tl.fromTo(dimmable, { opacity: 0.3 }, { opacity: 1, duration: 0.4, ease: 'power1.inOut' }, L.contract + 0.3);
    SS.cue(L.offer, 'm-offer');
    // the offer tightens into the empty seat (shared element)
    SS.tl.fromTo(oc, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: 'power1.in' }, L.contract);
    SS.tl.fromTo(offer, { x: OFFER.cx, y: OFFER.cy, scaleX: 1, scaleY: 1 },
      { x: SEAT.x, y: SEAT.y, scaleX: G.w / OFFER.w, scaleY: G.h / OFFER.h, duration: 0.5, ease: SS.EZ.inOut }, L.contract);
    SS.tl.set(offer, { autoAlpha: 0 }, L.arrive);
    SS.tl.set(seat, { autoAlpha: 0 }, L.arrive);
    const c09 = brokerCard(w, 8, '09', SS.TEAM[SS.LEAVER].s);
    Object.assign(c09.el.style, { background: '#fff', boxShadow: SS.SHADOW.m });
    c09.nm.style.color = C.ink;
    gsap.set(c09.avG, { autoAlpha: 0 });
    gsap.set(c09.skel, { autoAlpha: 0 });
    SS.place(c09.el, SEAT.x, SEAT.y, { autoAlpha: 0 });
    gsap.set(c09.avM, { autoAlpha: 1, scale: 0, transformOrigin: '50% 50%' });
    gsap.set(c09.nm, { autoAlpha: 0, y: 10 });
    SS.tl.set(c09.el, { autoAlpha: 1 }, L.arrive);
    SS.tl.fromTo(c09.avM, { scale: 0 }, { scale: 1, duration: 0.5, ease: SS.EZ.pop }, L.arrive);
    SS.tl.fromTo(c09.nm, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: SS.EZ.out }, L.arrive + 0.08);
    SS.tl.fromTo(c09.camp, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: SS.EZ.pop }, L.solid);
    const halo = SS.el('div', 'a3', c09.el);
    Object.assign(halo.style, { left: '22px', top: '32px', width: '76px', height: '76px', borderRadius: '50%', boxShadow: `0 0 0 4px ${C.green}, 0 0 30px 6px rgba(43,191,179,.45)` });
    gsap.set(halo, { autoAlpha: 0, scale: 1 });
    SS.tl.fromTo(halo, { autoAlpha: 0.9, scale: 1 }, { autoAlpha: 0, scale: 1.9, duration: 0.9, ease: SS.EZ.out }, L.arrive + 0.1);
    const glow = SS.el('div', 'a3', c09.el);
    Object.assign(glow.style, { left: '-6px', top: '-6px', width: G.w + 12 + 'px', height: G.h + 12 + 'px', borderRadius: '30px', boxShadow: `0 0 0 3px ${C.turq}, 0 0 40px 6px rgba(43,191,179,.35)` });
    gsap.set(glow, { autoAlpha: 0 });
    SS.tl.fromTo(glow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power1.out' }, L.arrive + 0.05);
    SS.tl.fromTo(glow, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.6, ease: 'power1.inOut' }, L.back9);
    SS.cue(L.arrive, 'sfx-arrive');

    // ================================================================ 8 · the grid gathers into the end-card node
    const all = [...stay.map((c) => c.el), c09.el];
    all.forEach((el, k) => {
      const i = k < 7 ? cards.indexOf(stay[k]) : SS.LEAVER;
      const d = Math.hypot(G.cx(i) - 540, G.cy(i) - G.mid);
      const at = L.gather + (1 - d / 400) * 0.08;
      SS.tl.fromTo(el, { x: G.cx(i), y: G.cy(i), scale: 1, autoAlpha: 1 }, { x: 540, y: G.mid, scale: 0.2, autoAlpha: 0, duration: 0.42, ease: SS.EZ.in }, at);
    });
    SS.cue(L.gather, 'm-gather');

    // ================================================================ camera
    cam.to(L.pan, 0.9, 'sine.inOut', { y: SS.CAMY.pool });
    const ps = 1.05;
    cam.to(L.push, 0.8, SS.EZ.inOut, { x: SEAT.x - (SEAT.x - 540) / ps, y: SEAT.y - (SEAT.y - 960) / ps, s: ps });
    cam.to(L.lift + 0.05, 0.9, SS.EZ.inOut, { x: 540, y: 960, s: 1 });
    cam.to(L.recenter, 0.8, SS.EZ.inOut, { y: SS.CAMY.team });
    cam.to(L.contract, 0.6, SS.EZ.inOut, { x: SEAT.x - (SEAT.x - 540) / ps, y: SEAT.y - (SEAT.y - SS.CAMY.team) / ps, s: ps });
    cam.to(L.back9, 0.7, SS.EZ.inOut, { x: 540, y: SS.CAMY.team, s: 1 });

    R = { wrap, w, cam };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, R.cam.p.blur || 0);
  }
  const scene = { name: 'equipe', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.wrap, -1, L.gather + 0.6]]; };
  SS.scenes.push(scene);
})();
