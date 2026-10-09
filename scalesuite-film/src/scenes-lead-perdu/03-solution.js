/* « Le lead perdu » · act 3, the ScaleSuite world (11.05–21.5 s).
   5 · Avec ScaleSuite (10.8–12.95): the lead card has contracted into a green node; the node blooms
       into the mint disc (V3 motif), the mark sweeps in, the wordmark rises.
       "Avec ScaleSuite." / "Même lead. Même soir."
   6 · One campaign per broker (12.95–16.55): the logo docks into the header of the "Campagnes" card,
       five broker rows click in (Montréal and the South Shore), "Optimisées chaque semaine".
       Row 03 (Longueuil) opens into its own sponsored ad: same ad as the hook, now Courtier 03's.
   7 · Climax (16.55–21.0): the ad is tapped and squeezes into the same lead card; the camera follows
       it down a short line straight into Courtier 03's CRM ("Nouveau"), then whips down to Courtier
       03's phone: the ScaleSuite notification drops in (12 % overshoot, haptic).
   Exit: the notification thins into the line that 04-fin contracts into the logo. No routing rule is
   shown anywhere: the lead reaches Courtier 03 because the ad is Courtier 03's own campaign. */
(function () {
  const SS = window.SS, L = SS.LT, C = SS.C;
  const NODE = { x: 540, y: SS.LEADY0 };
  const LOGO = { h: 150, y: 900 };
  LOGO.w = (LOGO.h * SS.LOGO.w) / SS.LOGO.h;
  const markX = (h, cx) => cx - (h * SS.LOGO.w) / SS.LOGO.h / 2 + 58 * (h / SS.LOGO.h);
  const CAMP = { top: 600, w: 900, headH: 152, rowH: 112, pitch: 126, logoH: 56 };
  CAMP.rowsTop = CAMP.top + CAMP.headH + 16;
  CAMP.rowY = (i) => CAMP.rowsTop + CAMP.rowH / 2 + i * CAMP.pitch;
  CAMP.h = CAMP.headH + 16 + 3 * CAMP.pitch + CAMP.rowH + 20;
  CAMP.logoW = (CAMP.logoH * SS.LOGO.w) / SS.LOGO.h;
  const BROKERS = [['01', 'Montréal'], ['02', 'Brossard'], ['03', 'Longueuil'], ['04', 'Saint-Lambert']]; // 4 rows: names 42 px, sectors 34 px, status 32 px
  const HOT = 2;
  const ADY = CAMP.rowY(HOT);
  const CRM = { top: 1500, w: 900, headH: 150, rowH: 120, gap: 14 };
  CRM.slot0 = CRM.top + CRM.headH + 16;
  CRM.h = CRM.headH + 16 + SS.LEAD.h + CRM.gap + 2 * (CRM.rowH + CRM.gap) + 6;
  const LEADB = CRM.slot0 + SS.LEAD.h / 2;
  const CAM1 = CRM.top + 320; // CRM header at y 640 on screen
  const PH = { top: 2400, w: 820, h: 1700 };
  const CAM2 = PH.top + 320; // phone top at y 640 on screen
  const NOTE = { w: 760, h: 300, y: PH.top + 600 };
  SS.ENDLINE = { y: 730, w: 780, worldY: CAM2 + (730 - 960) };
  const P = { mark: 0, sheen: 0, chk: 0, shake: 0, blur: 0 };

  let R;
  function build(stage) {
    // ================================================================ mint world: bloom, lights
    const bg = SS.el('div', 'layer', stage);
    const D = Math.ceil(2 * Math.hypot(540, 1920 - NODE.y) * 1.04);
    const disc = SS.el('div', 'a3', bg);
    Object.assign(disc.style, { width: D + 'px', height: D + 'px', borderRadius: '50%', background: 'radial-gradient(closest-side, #F2FCFA 0%, #EAFAF7 55%, #E2F7F3 100%)' });
    SS.place(disc, NODE.x, NODE.y, { scale: 0.004, autoAlpha: 0 });
    const blobs = [0, 1].map((i) => {
      const b = SS.el('div', 'a3', bg);
      Object.assign(b.style, { width: '1300px', height: '1300px', borderRadius: '50%',
        background: `radial-gradient(closest-side, ${i ? 'rgba(43,191,179,.12)' : 'rgba(29,158,117,.09)'}, rgba(232,249,247,0))` });
      gsap.set(b, { autoAlpha: 0 });
      return b;
    });
    const glow = SS.el('div', 'a3', bg);
    Object.assign(glow.style, { width: '1100px', height: '1100px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(255,255,255,.9), rgba(255,255,255,0))' });
    SS.place(glow, 540, LOGO.y, { scale: 0.7, autoAlpha: 0 });
    const node = SS.el('div', 'a3', bg);
    Object.assign(node.style, { width: '26px', height: '26px', borderRadius: '50%', background: C.green, boxShadow: '0 0 0 9px rgba(43,191,179,.2)' });
    SS.place(node, NODE.x, NODE.y, { scale: 0 });
    SS.tl.fromTo(node, { scale: 0 }, { scale: 1.3, duration: 0.18, ease: SS.EZ.out }, L.contract + 0.16);
    SS.tl.set(disc, { autoAlpha: 1 }, L.bloom);
    SS.tl.fromTo(disc, { scale: 0.004 }, { scale: 1, duration: 0.5, ease: 'power2.inOut' }, L.bloom);
    SS.tl.fromTo(blobs, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: 'power1.out' }, L.bloom + 0.3);
    SS.tl.fromTo(glow, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 0.85, scale: 1, duration: 0.9, ease: SS.EZ.soft }, L.bloom + 0.15);
    SS.tl.fromTo(glow, { autoAlpha: 0.85 }, { autoAlpha: 0, duration: 0.5, ease: 'power1.inOut' }, L.dock);
    // the node travels into the mark of the logo and hands over to it
    const mx = markX(LOGO.h, 540);
    SS.tl.fromTo(node, { x: NODE.x, y: NODE.y }, { x: mx, y: LOGO.y, duration: 0.32, ease: SS.EZ.inOut }, L.bloom + 0.02);
    SS.tl.fromTo(node, { scale: 1.3 }, { scale: 0, duration: 0.24, ease: SS.EZ.in }, L.contract + 0.37);
    SS.cue(L.bloom, 'm-bloom');

    // ================================================================ 5 · logo + "Avec ScaleSuite."
    const stageL = SS.el('div', 'layer', stage);
    const logo = SS.logo(stageL, LOGO.h);
    SS.place(logo.el, 540, LOGO.y);
    gsap.set(logo.letters, { y: 150 });
    SS.tl.fromTo(P, { mark: 0 }, { mark: 1, duration: 0.66, ease: 'none' }, L.mark);
    SS.tl.fromTo(logo.letters, { y: 150 }, { y: 0, duration: 0.6, stagger: 0.03, ease: SS.EZ.out }, L.letters);
    SS.tl.fromTo(P, { sheen: 0 }, { sheen: 1, duration: 0.7, ease: 'sine.inOut' }, L.letters + 0.6);
    SS.cue(L.mark, 'm-mark');
    // dock: the lockup shrinks into the header of the campaigns card
    const dk = CAMP.logoH / LOGO.h;
    const hx = 90 + 36 + CAMP.logoW / 2, hy = CAMP.top + 48;
    SS.tl.fromTo(logo.el, { x: 540, y: LOGO.y, scale: 1 }, { x: hx, y: hy, scale: dk, duration: 0.55, ease: SS.EZ.inOut }, L.dock);

    // ================================================================ world B (its own camera)
    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera({ x: 540, y: 960, s: 1, r: 0, blur: 0 });
    cam.set({ x: 540, y: 960, s: 1, r: 0 });
    stage.appendChild(stageL); // the docking logo flies above the campaigns card

    // ---- 6 · campaigns card
    const camp = SS.el('div', 'lp-card', w);
    Object.assign(camp.style, { width: CAMP.w + 'px', height: CAMP.h + 'px', borderRadius: '34px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    const headClip = SS.clipR(0, 0, CAMP.h - 100, 0, 34);
    SS.place(camp, 540, CAMP.top + CAMP.h / 2, { autoAlpha: 0, clipPath: headClip });
    SS.tl.set(camp, { autoAlpha: 1 }, L.dock + 0.3);
    SS.tl.fromTo(camp, { clipPath: headClip }, { clipPath: SS.OPEN, duration: 0.6, ease: SS.EZ.out }, L.dock + 0.3);
    const head = SS.el('div', 'a3', camp);
    head.innerHTML = `<div style="position:absolute;left:36px;top:100px;font-size:32px;font-weight:620;letter-spacing:-.01em;color:${C.soft};white-space:nowrap">Campagnes Google Ads · Votre agence</div>
      <div style="position:absolute;left:22px;width:856px;top:${CAMP.headH}px;height:2px;background:#EDF3F2"></div>`;
    const weekly = SS.el('div', 'lp-chip', camp);
    Object.assign(weekly.style, { position: 'absolute', right: '50px', top: '22px', background: C.mint, color: '#0F6F66', boxShadow: 'inset 0 0 0 2px rgba(43,191,179,.45)' });
    weekly.innerHTML = `<span style="width:30px;height:30px;display:block">${SS.icon.target(C.green)}</span>Optimisées chaque semaine`;
    gsap.set(weekly, { scale: 0.6, autoAlpha: 0 });
    SS.tl.fromTo(weekly, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: SS.EZ.pop }, L.weekly);
    const hlogo = SS.logo(w, CAMP.logoH);
    hlogo.mark(1);
    SS.place(hlogo.el, hx, hy, { autoAlpha: 0 });
    SS.tl.set(hlogo.el, { autoAlpha: 1 }, L.dock + 0.56);
    SS.tl.set(logo.el, { autoAlpha: 0 }, L.dock + 0.56);
    const rows = BROKERS.map(([n, area], i) => {
      const el = SS.el('div', 'lp-row', w);
      Object.assign(el.style, { width: '864px', height: CAMP.rowH + 'px', borderRadius: '18px', background: i % 2 ? '#F6FBFA' : '#fff', padding: '0 24px 0 16px', gap: '18px' });
      el.innerHTML = `<span style="width:64px;height:64px;flex:none">${SS.icon.person()}</span>
        <span style="font-size:42px;font-weight:730;letter-spacing:-.02em;color:${C.ink};flex:none">Courtier ${n}</span>
        <span class="chip3" style="position:static;font-size:34px;height:56px;padding:0 18px;box-sizing:border-box;box-shadow:none"><span style="width:32px;height:32px;display:block">${SS.icon.pin(C.green)}</span>${area}</span>
        <span style="margin-left:auto;display:flex;align-items:center;gap:10px;font-size:32px;font-weight:680;color:${C.green}"><span style="width:16px;height:16px;border-radius:50%;background:${C.green}"></span>Active</span>`;
      SS.place(el, 540, CAMP.rowY(i) + 30, { autoAlpha: 0 });
      SS.tl.fromTo(el, { y: CAMP.rowY(i) + 30, autoAlpha: 0 }, { y: CAMP.rowY(i), autoAlpha: 1, duration: 0.42, ease: SS.EZ.dock }, L.campRows + 0.3 + i * 0.06);
      return el;
    });
    SS.cue(L.campRows + 0.3, 'm-rows');
    // row 03: halo, the others dim
    const halo = SS.el('div', 'a3', w);
    Object.assign(halo.style, { width: '880px', height: CAMP.rowH + 16 + 'px', borderRadius: '24px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 44px 6px rgba(43,191,179,.4)` });
    SS.place(halo, 540, ADY, { autoAlpha: 0, scale: 1.04 });
    SS.tl.fromTo(halo, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.14, ease: 'power1.out' }, L.halo);
    SS.tl.fromTo(halo, { scale: 1.04 }, { scale: 1, duration: 0.36, ease: SS.EZ.out }, L.halo);
    SS.tl.fromTo(rows.filter((r, i) => i !== HOT), { opacity: 1 }, { opacity: 0.3, duration: 0.3, ease: 'power1.out' }, L.halo + 0.04);
    SS.tl.fromTo(halo, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, ease: 'power1.in' }, L.adMorph);
    // the row opens into Courtier 03's ad
    const ad = SS.adCardLP(w, { ink: C.ink, soft: C.soft, link: '#1F5FAD', sub: 'Courtier 03 · Votre agence', shadow: SS.SHADOW.mHi });
    const rowClip = SS.clipR((250 - CAMP.rowH) / 2, 18, (250 - CAMP.rowH) / 2, 18, 18);
    SS.place(ad.el, 540, ADY, { autoAlpha: 0, clipPath: rowClip });
    gsap.set(ad.ct, { autoAlpha: 0, y: 14 });
    SS.tl.set(ad.el, { autoAlpha: 1 }, L.adMorph);
    SS.tl.fromTo(ad.el, { clipPath: rowClip }, { clipPath: SS.OPEN, duration: 0.45, ease: SS.EZ.inOut }, L.adMorph);
    SS.tl.fromTo(ad.ct, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: SS.EZ.out }, L.adText);
    SS.cue(L.adMorph, 'm-ad');

    // ---- 7 · tap → the same lead card → Courtier 03's CRM
    const rip = SS.ripple(w, { fill: 'rgba(43,191,179,.22)', ring: C.turq });
    SS.tap(rip, 330, ADY + 20, L.tapAd);
    SS.tl.fromTo(ad.el, { scale: 1 }, { scale: 0.975, duration: 0.08, ease: 'power2.out' }, L.tapAd);
    SS.tl.fromTo(ad.el, { scale: 0.975 }, { scale: 1, duration: 0.24, ease: 'power2.out' }, L.tapAd + 0.08);
    SS.tl.fromTo(ad.ct, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -18, duration: 0.18, ease: SS.EZ.in }, L.squeeze1);
    SS.tl.fromTo(ad.el, { clipPath: SS.OPEN }, { clipPath: SS.clipR(10, 30, 10, 30, 30), duration: 0.22, ease: SS.EZ.inOut }, L.squeeze1);
    SS.tl.set(ad.el, { autoAlpha: 0 }, L.lead1);
    SS.cue(L.tapAd, 'sfx-tap');
    // the CRM card waits below, out of frame
    const crm = SS.el('div', 'lp-card', w);
    Object.assign(crm.style, { width: CRM.w + 'px', height: CRM.h + 'px', borderRadius: '34px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    crm.innerHTML = `<span style="position:absolute;left:36px;top:30px;width:72px;height:72px">${SS.icon.person()}</span>
      <div style="position:absolute;left:128px;top:28px;font-size:40px;font-weight:760;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">CRM · Courtier 03</div>
      <div style="position:absolute;left:128px;top:82px;font-size:30px;font-weight:600;color:${C.soft};white-space:nowrap">Leads de sa campagne · Longueuil</div>
      <div style="position:absolute;left:22px;width:856px;top:${CRM.headH}px;height:2px;background:#EDF3F2"></div>`;
    SS.place(crm, 540, CRM.top + CRM.h / 2, { autoAlpha: 0, y: CRM.top + CRM.h / 2 + 80 });
    SS.tl.fromTo(crm, { autoAlpha: 0, y: CRM.top + CRM.h / 2 + 80 }, { autoAlpha: 1, y: CRM.top + CRM.h / 2, duration: 0.6, ease: SS.EZ.out }, L.travel - 0.1);
    const old = [['Lead acheteur · Longueuil', 'Google Ads · lun. 12 oct.'], ['Lead vendeur · Longueuil', 'Google Ads · ven. 9 oct.']].map(([t, s], i) => {
      const el = SS.el('div', 'lp-row', crm);
      Object.assign(el.style, { width: '864px', height: CRM.rowH + 'px', borderRadius: '20px', background: i % 2 ? '#fff' : '#F6FBFA', padding: '0 26px' });
      el.innerHTML = `<span style="width:14px;height:14px;border-radius:50%;flex:none;background:${C.green};opacity:.0"></span>
        <span style="display:flex;flex-direction:column;gap:6px"><span style="font-size:36px;font-weight:640;letter-spacing:-.02em;color:${C.ink2}">${t}</span>
        <span style="font-size:30px;font-weight:550;color:${C.soft}">${s}</span></span>`;
      const y0 = CRM.headH + 16 + i * (CRM.rowH + CRM.gap), y1 = y0 + SS.LEAD.h + CRM.gap;
      gsap.set(el, { x: 18, y: y0 });
      SS.tl.fromTo(el, { y: y0 }, { y: y1, duration: 0.45, ease: SS.EZ.inOut }, L.land - 0.28);
      return el;
    });
    // the route: a short turquoise line from the ad to the CRM (drawn, then retracted into the CRM)
    const svg = SS.svg('svg', { class: 'lines', width: 1, height: 1 }, w);
    const route = SS.svg('path', { d: `M540,${ADY + 125} L540,${CRM.top}`, fill: 'none', stroke: C.turq, 'stroke-width': 5, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, svg);
    SS.tl.fromTo(route, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.5, ease: SS.EZ.inOut }, L.travel - 0.04);
    SS.tl.fromTo(route, { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -1 }, duration: 0.4, ease: SS.EZ.in }, L.land + 0.05);
    const lead = SS.leadCard(w, { shadow: SS.SHADOW.mHi, chips: [
      ['nouveau', `<span style="width:12px;height:12px;border-radius:50%;background:${C.green}"></span>Nouveau`, C.mint, '#0F6F66'],
    ] });
    lead.ti.style.color = C.ink; lead.tm.style.color = C.soft;
    lead.chips.nouveau.style.boxShadow = 'inset 0 0 0 2px rgba(43,191,179,.45)';
    SS.place(lead.el, 540, ADY, { autoAlpha: 0 });
    gsap.set(lead.in, { autoAlpha: 0, y: 16 });
    gsap.set(lead.chips.nouveau, { yPercent: 130, scale: 1 });
    SS.tl.set(lead.el, { autoAlpha: 1 }, L.lead1);
    SS.tl.fromTo(lead.in, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: SS.EZ.out }, L.lead1);
    SS.tl.fromTo(lead.el, { y: ADY }, { y: LEADB, duration: L.land - L.travel, ease: SS.EZ.inOut }, L.travel);
    SS.tl.fromTo(lead.chips.nouveau, { yPercent: 130 }, { yPercent: 0, duration: 0.45, ease: SS.EZ.pop }, L.nouveau);
    w.appendChild(lead.el);
    SS.cue(L.land, 'm-land');
    // camera follows the card down to the CRM
    cam.to(L.travel - 0.02, L.land - L.travel + 0.1, SS.EZ.inOut, { y: CAM1 });

    // ---- the phone and the ScaleSuite notification
    const shakeBox = SS.el('div', 'a3', w);
    const phone = SS.el('div', 'a3', shakeBox);
    Object.assign(phone.style, { width: PH.w + 'px', height: PH.h + 'px', borderRadius: '112px', background: '#FBFDFD',
      boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 50px 90px -40px rgba(18,74,66,.45), 0 0 0 2px #DCE6E4, inset 0 0 0 2px #fff' });
    phone.innerHTML = `<div style="position:absolute;inset:18px;border-radius:96px;background:linear-gradient(170deg,#F1FCFA 0%,#DDF5F1 60%,#CBEFEA 100%);overflow:hidden">
        <div style="position:absolute;left:50%;top:26px;width:150px;height:40px;margin-left:-75px;border-radius:20px;background:#D3DEDC"></div>
        <div style="position:absolute;left:0;right:0;top:110px;text-align:center;font-size:36px;font-weight:600;color:${C.soft}">mardi 13 octobre</div>
        <div style="position:absolute;left:0;right:0;top:150px;text-align:center;font-size:170px;font-weight:300;letter-spacing:-.04em;color:${C.ink2};line-height:1.1">21:04</div></div>`;
    SS.place(phone, 540, PH.top + PH.h / 2, { autoAlpha: 0 });
    SS.tl.set(phone, { autoAlpha: 1 }, L.whip - 0.05);
    const note = SS.el('div', 'a3', shakeBox);
    Object.assign(note.style, { width: NOTE.w + 'px', height: NOTE.h + 'px', borderRadius: '40px', background: '#fff',
      boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 30px 60px -24px rgba(18,74,66,.45), 0 0 0 1px rgba(26,26,26,.05)' });
    note.innerHTML = `<div class="nc" style="position:absolute;inset:0">
        <div style="position:absolute;left:30px;top:24px;display:flex;align-items:center;gap:14px;font-size:30px;font-weight:750;color:${C.ink}"><span class="mk" style="width:40px;height:40px;display:block"></span>ScaleSuite</div>
        <div style="position:absolute;right:30px;top:28px;font-size:30px;font-weight:550;color:${C.soft}">maintenant</div>
        <div style="position:absolute;left:30px;top:94px;font-size:42px;font-weight:780;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">Nouveau lead vendeur</div>
        <div style="position:absolute;left:30px;top:156px;font-size:32px;font-weight:600;color:${C.soft};white-space:nowrap">Maison à vendre · Longueuil</div>
        <div style="position:absolute;left:30px;top:220px;display:flex;align-items:center;gap:12px;font-size:32px;font-weight:720;color:${C.green};white-space:nowrap"><span class="ck" style="width:36px;height:36px;display:block"></span>Ajouté à votre CRM</div></div>`;
    const nm = SS.logo(note.querySelector('.mk'), 40, { word: false });
    nm.el.style.position = 'static'; nm.mark(1);
    const chk = SS.check(note.querySelector('.ck'), 36, C.green);
    const nc = note.querySelector('.nc');
    SS.place(note, 540, NOTE.y - 150, { autoAlpha: 0, scale: 0.94 });
    SS.tl.fromTo(note, { autoAlpha: 0, y: NOTE.y - 150, scale: 0.94 }, { autoAlpha: 1, y: NOTE.y, scale: 1, duration: 0.55, ease: SS.EZ.pop12 }, L.notif);
    SS.tl.fromTo(P, { shake: 0 }, { shake: 1, duration: 0.42, ease: 'none' }, L.notif + 0.08);
    SS.tl.fromTo(P, { chk: 0 }, { chk: 1, duration: 0.5, ease: 'none' }, L.crmChk);
    const nglow = SS.el('div', 'a3', shakeBox);
    Object.assign(nglow.style, { width: NOTE.w + 'px', height: NOTE.h + 'px', borderRadius: '44px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 60px 10px rgba(43,191,179,.4)` });
    SS.place(nglow, 540, NOTE.y, { autoAlpha: 0, scale: 0.96 });
    SS.tl.fromTo(nglow, { autoAlpha: 0.9, scale: 0.96 }, { autoAlpha: 0, scale: 1.12, duration: 0.8, ease: SS.EZ.out }, L.notif + 0.2);
    shakeBox.insertBefore(nglow, note);
    SS.cue(L.notif, 'sfx-notif'); SS.cue(L.crmChk, 'm-crm');
    // cards that have scrolled up behind the headline scrim are switched off (no ghost through its fade)
    SS.tl.set([camp, hlogo.el, halo, ...rows], { visibility: 'hidden' }, L.land + 0.05);
    SS.tl.set([crm, lead.el], { visibility: 'hidden' }, L.notif + 0.1);
    // whip down to the phone (speed blur on the arc)
    cam.to(L.whip, L.notif - L.whip + 0.02, SS.EZ.inOut, { y: CAM2 });
    cam.fx(L.whip + 0.06, 0.15, 'power2.in', { blur: 0 }, { blur: 7 });
    cam.fx(L.whip + 0.21, 0.18, 'power2.out', { blur: 7 }, { blur: 0 });
    // exit: the phone drops away, the notification thins into the end-card line
    SS.tl.fromTo(phone, { y: PH.top + PH.h / 2 }, { y: PH.top + PH.h / 2 + 1700, duration: 0.45, ease: SS.EZ.in }, L.line - 0.05);
    SS.tl.fromTo(nc, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.16, ease: 'power1.in' }, L.line);
    SS.tl.fromTo(note, { y: NOTE.y, scaleX: 1, scaleY: 1, backgroundColor: '#ffffff' },
      { y: SS.ENDLINE.worldY, scaleX: SS.ENDLINE.w / NOTE.w, scaleY: 6 / NOTE.h, backgroundColor: C.turq, duration: 0.48, ease: SS.EZ.inOut }, L.line);
    SS.tl.fromTo(note, { boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 30px 60px -24px rgba(18,74,66,.45), 0 0 0 1px rgba(26,26,26,.05)' },
      { boxShadow: '0 2px 4px rgba(18,44,40,0), 0 30px 60px -24px rgba(18,74,66,0), 0 0 0 1px rgba(26,26,26,0)', duration: 0.3, ease: 'power1.in' }, L.line);
    SS.cue(L.line, 'm-line');

    // ================================================================ headlines (screen space)
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 600, '234,247,244');
    gsap.set(scrim, { autoAlpha: 0 });
    SS.tl.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.inOut' }, L.travel);
    const avec = SS.text(layer, 'Avec *ScaleSuite.*', { size: 124, maxW: 940 });
    SS.place(avec.el, 540, 318);
    SS.hideWords(avec);
    SS.wordsIn(avec, L.avec, { st: 0.07 });
    SS.wordsOut(avec, L.avecOut, { st: 0.02 });
    const meme = SS.text(layer, 'Même lead. Même soir.', { size: 52, weight: 600, color: C.soft, tracking: -0.02 });
    SS.place(meme.el, 540, 452);
    SS.hideWords(meme);
    SS.wordsIn(meme, L.meme, { st: 0.05, dur: 0.6 });
    SS.wordsOut(meme, L.avecOut + 0.02, { st: 0.015 });
    const h6 = SS.text(layer, 'Chaque courtier\na sa *campagne.*', { size: 104, maxW: 940 });
    SS.place(h6.el, 540, 330);
    SS.hideWords(h6);
    SS.wordsIn(h6, L.campHead, { st: 0.06 });
    SS.wordsOut(h6, L.tapAd, { st: 0.02 });
    const h7 = SS.text(layer, 'Chaque lead\nchez son *courtier.*', { size: 104, maxW: 940 });
    SS.place(h7.el, 540, 330);
    SS.hideWords(h7);
    SS.wordsIn(h7, L.chezHead, { st: 0.06 });
    SS.wordsOut(h7, L.chezOut, { st: 0.02 });
    const h7b = SS.text(layer, 'Le soir même. Pas le lendemain.', { size: 56, weight: 600, color: C.soft, tracking: -0.02, maxW: 940 });
    SS.place(h7b.el, 540, 490);
    SS.hideWords(h7b);
    SS.wordsIn(h7b, L.chezHead + 0.3, { st: 0.04, dur: 0.6 });
    SS.wordsOut(h7b, L.chezOut + 0.02, { st: 0.015 });
    SS.cue(L.avec, 'm-avec'); SS.cue(L.chezHead, 'm-chez');

    R = { bg, blobs, logo, wrap, w, cam, layer, stageL, chk, shakeBox };
  }

  function render(t) {
    gsap.set(R.blobs[0], { x: 320 + Math.sin(t * 0.31) * 160, y: 560 + Math.cos(t * 0.27) * 120, xPercent: -50, yPercent: -50 });
    gsap.set(R.blobs[1], { x: 800 + Math.cos(t * 0.23) * 180, y: 1420 + Math.sin(t * 0.29) * 140, xPercent: -50, yPercent: -50 });
    R.logo.mark(P.mark);
    R.logo.sheen(P.sheen);
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, R.cam.p.blur || 0);
    const k = P.shake;
    const dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.shakeBox.style.transform = `translate(${dx.toFixed(2)}px,0px)`;
    R.chk.set(P.chk);
  }

  const scene = { name: 'solution', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => {
    build(stage);
    scene.ranges = [[R.bg, L.contract, 99], [R.stageL, L.contract, L.dock + 0.6], [R.wrap, L.dock, L.line + 0.6], [R.layer, L.avec - 0.1, L.chezOut + 0.4]];
  };
  SS.scenes.push(scene);
})();
