/* Scene 3 · 13 h, Notaire: THE LEAD, climax (≈ 5.7–13.6 s, the longest scene).
   a) The landing page opens out of the ad (zoom through): agency bar, « Maisons à vendre sur la
      Rive-Sud », the form types itself (Achat, Longueuil, D'ici 6 mois, courriel). « Un acheteur écrit. »
   b) « Envoyer » is tapped: the page squeezes onto the button, which darkens into the ink token
      « ● LEAD ACHETEUR ».
   c) The camera follows the token through the ScaleSuite node, down to a table seen from above: the
      deed (« Acte de vente », a signature drawing itself, a pen) and the broker's phone. 80 ms freeze.
   d) Climax: the token unfolds into the notification (12 % overshoot, haptic buzz).
   e) A tap opens the CRM out of the notification: the new card docks at the top of the list, the
      others step down, « Nouveau » pops. « Déjà dans votre CRM. » */
(function () {
  const SS = window.SS;
  const C = SS.C;
  const AGENCY = '#2F5D8C';
  const T = { open: 5.68, bar2: 5.7, hero: 5.76, form: 6.22, send0: 6.34, head1: 6.4, cam2: 6.75, f: [6.95, 7.22, 7.52, 7.82],
    cam3: 8.22, send: 8.4, squeeze: 8.5, label: 8.58, head1Out: 8.58, token: 8.9, node: 9.5, sign: 9.75, arrive: 10.7, freeze: 10.78,
    unfold: 10.86, chk: 11.32, tap: 11.78, crm: 11.88, head2: 12.02, shift: 12.4, row: 12.46, nouveau: 12.74, end: 13.6 };
  SS.T3 = T;
  const LP = { top: 640, h: 1020, w: 900 };
  const NODE = { x: 540, y: 2000, r: 75 };
  const PH = { left: 150, top: 2900, w: 820, h: 1700 };
  PH.cx = PH.left + PH.w / 2;
  const NOTE = { w: 760, h: 360 };
  NOTE.x = PH.cx; NOTE.y = PH.top + 590;
  const CHIP = { s: 0.9 }; // token label 34 px × 0.9 × camera ≥ 30 px on screen once pushed in
  CHIP.x = NOTE.x - NOTE.w / 2 + 30 + (460 * CHIP.s) / 2; CHIP.y = NOTE.y - NOTE.h / 2 + 96 + (100 * CHIP.s) / 2;
  const DOC = { x: 540, y: 2860, w: 900, h: 700, r: -3 };
  const SCR = { l: PH.left + 18, t: PH.top + 18, w: PH.w - 36, h: PH.h - 36 };
  SS.PH3 = PH;
  const P = { u1: 0, u2: 0, ts: 1, chk: 0, shake: 0, sign: 0 };

  function tokenEl(parent) {
    const el = SS.el('div', 'a3', parent);
    Object.assign(el.style, { width: '460px', height: '100px', borderRadius: '50px', background: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px',
      color: '#fff', fontSize: '34px', fontWeight: 800, letterSpacing: '.06em', whiteSpace: 'nowrap', boxShadow: '0 18px 40px -16px rgba(0,0,0,.45)' });
    el.innerHTML = `<span style="width:20px;height:20px;border-radius:50%;background:${C.turq};box-shadow:0 0 0 7px rgba(43,191,179,.28)"></span>LEAD ACHETEUR`;
    return el;
  }

  let R;
  function build(stage) {
    const world = SS.world;
    const ad = SS.adA;
    const ADY = SS.AD_B.y;

    // ================================================================ table (built first: under the page and the route)
    const table = SS.el('div', 'a3', world);
    const doc = SS.el('div', 'a3', table);
    Object.assign(doc.style, { width: DOC.w + 'px', height: DOC.h + 'px', borderRadius: '18px', background: '#fff', boxShadow: '0 2px 4px rgba(18,44,40,.07), 0 26px 56px -26px rgba(18,74,66,.4), 0 0 0 1px rgba(26,26,26,.05)' });
    doc.innerHTML = `<div style="position:absolute;left:56px;top:46px;font-size:48px;font-weight:800;letter-spacing:-.03em;color:${C.ink}">Acte de vente</div>
      <div class="skel" style="position:absolute;left:56px;top:128px;width:560px;height:16px"></div>
      <div class="skel" style="position:absolute;left:56px;top:162px;width:700px;height:16px"></div>
      <div class="skel" style="position:absolute;left:56px;top:196px;width:640px;height:16px"></div>
      <div style="position:absolute;left:470px;top:268px;width:360px;height:3px;background:#C9D6D4"></div>
      <div style="position:absolute;left:470px;top:280px;font-size:34px;font-weight:600;color:${C.soft}">Signature</div>`;
    const sig = SS.svg('svg', { viewBox: '0 0 360 90', width: 360, height: 90, style: 'position:absolute;left:470px;top:180px;overflow:visible' }, doc);
    const sigPath = SS.svg('path', { d: 'M8 70 C 30 20, 46 18, 52 52 S 70 86, 92 40 S 118 10, 126 56 C 132 80, 150 70, 166 44 C 178 26, 190 30, 196 50 C 204 70, 226 66, 250 40 C 262 28, 280 36, 300 48 L 340 44',
      fill: 'none', stroke: '#24466B', 'stroke-width': 4.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, sig);
    SS.place(doc, DOC.x, DOC.y, { rotation: DOC.r });
    const pen = SS.el('div', 'a3', table, SS.dayIcon.pen());
    Object.assign(pen.style, { width: '230px', height: '230px' });
    SS.place(pen, 880, 2640, { rotation: 8 });
    SS.tl.fromTo(P, { sign: 0 }, { sign: 1, duration: 0.85, ease: 'power1.inOut' }, T.sign);
    SS.cue(T.sign, 'sign');

    // the broker's phone (lock screen at 13:04)
    const shakeBox = SS.el('div', 'a3', world);
    const ph = SS.phone(shakeBox, { date: 'vendredi 16 octobre', time: '13:04' });
    SS.place(ph.el, PH.cx, PH.top + PH.h / 2);

    // ================================================================ a) landing page out of the ad
    const lp = SS.el('div', 'a3', world);
    Object.assign(lp.style, { width: LP.w + 'px', height: LP.h + 'px', borderRadius: '34px', background: '#fff', boxShadow: SS.SH.lift });
    const adTop = ADY - SS.AD_H / 2 - LP.top, adClip = SS.clipR(adTop, 0, LP.h - adTop - SS.AD_H, 0, 30);
    SS.place(lp, 540, LP.top + LP.h / 2, { autoAlpha: 0, clipPath: adClip });
    SS.tl.set(lp, { autoAlpha: 1 }, T.open);
    SS.tl.fromTo(lp, { clipPath: adClip }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.inOut }, T.open);
    SS.tl.fromTo(ad.inner, { y: 0, autoAlpha: 1 }, { y: -24, autoAlpha: 0, duration: 0.14, ease: SS.EZ.in }, T.open - 0.04);
    SS.tl.set(ad.el, { autoAlpha: 0 }, T.open + 0.1);
    SS.cue(T.open, 'open');
    const lbar = SS.el('div', 'a3', lp);
    Object.assign(lbar.style, { left: 0, top: 0, width: LP.w + 'px', height: '96px', borderRadius: '34px 34px 0 0', background: AGENCY, display: 'flex', alignItems: 'center', gap: '18px', padding: '0 36px', boxSizing: 'border-box' });
    lbar.innerHTML = `<span style="width:38px;height:38px;border-radius:10px;background:#fff;opacity:.92"></span><span style="font-size:30px;font-weight:800;letter-spacing:.12em;color:#fff">VOTRE AGENCE</span>
      <span style="margin-left:auto;width:80px;height:12px;border-radius:6px;background:rgba(255,255,255,.4)"></span><span style="width:80px;height:12px;border-radius:6px;background:rgba(255,255,255,.4)"></span>`;
    gsap.set(lbar, { yPercent: -100 });
    SS.tl.fromTo(lbar, { yPercent: -100 }, { yPercent: 0, duration: 0.42, ease: SS.EZ.out }, T.bar2);
    const hero = SS.text(lp, 'Maisons à vendre\nsur la Rive-Sud', { size: 54, weight: 800, color: C.ink, align: 'left', lh: 1.08, tracking: -0.03 });
    gsap.set(hero.el, { x: 36, y: 128, xPercent: 0, yPercent: 0 });
    SS.hideWords(hero);
    SS.wordsIn(hero, T.hero, { st: 0.04, dur: 0.55 });
    const sub = SS.text(lp, 'Votre agence · Rive-Sud', { size: 32, weight: 600, color: C.soft, align: 'left' });
    gsap.set(sub.el, { x: 36, y: 268, xPercent: 0, yPercent: 0 });
    SS.hideWords(sub);
    SS.wordsIn(sub, T.hero + 0.14, { st: 0.04, dur: 0.5 });
    // form
    const form = SS.el('div', 'a3', lp);
    Object.assign(form.style, { left: '30px', top: '336px', width: '840px', height: '530px', borderRadius: '26px', background: '#EEF4F9' });
    gsap.set(form, { autoAlpha: 0, y: 30 });
    SS.tl.fromTo(form, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: SS.EZ.out }, T.form);
    [['Projet', 'Achat'], ['Secteur', 'Longueuil'], ['Délai', 'D’ici 6 mois'], ['Courriel', 'acheteur@courriel.ca']].forEach(([lab, val], k) => {
      const top = 22 + k * 126;
      const l = SS.el('div', 'a3', form);
      Object.assign(l.style, { left: '30px', top: top + 'px', fontSize: '30px', fontWeight: 650, color: '#4A5F73' });
      l.textContent = lab;
      const box = SS.el('div', 'a3', form);
      Object.assign(box.style, { left: '30px', top: top + 42 + 'px', width: '780px', height: '74px', borderRadius: '18px', background: '#fff', boxShadow: 'inset 0 0 0 2px #D9E5F0',
        display: 'flex', alignItems: 'center', padding: '0 26px', boxSizing: 'border-box', fontSize: '40px', fontWeight: 650, color: C.ink, whiteSpace: 'pre' });
      const tx = SS.el('span', '', box), ca = SS.el('span', '', box);
      Object.assign(ca.style, { width: '4px', height: '44px', marginLeft: '3px', background: AGENCY, opacity: 0 });
      SS.typer(tx, [{ at: T.f[k], dur: 0.12 + val.length * 0.012, to: val }], ca);
    });
    // « Envoyer » → LEAD ACHETEUR
    const send = SS.el('div', 'a3', lp);
    Object.assign(send.style, { left: '30px', top: '892px', width: '840px', height: '100px', borderRadius: '50px', background: AGENCY, overflow: 'hidden' });
    send.innerHTML = `<div class="a" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:40px;font-weight:760;letter-spacing:-.01em">Envoyer</div>
      <div class="b" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:18px;color:#fff;font-size:34px;font-weight:800;letter-spacing:.06em;white-space:nowrap"><span style="width:20px;height:20px;border-radius:50%;background:${C.turq};box-shadow:0 0 0 7px rgba(43,191,179,.28)"></span>LEAD ACHETEUR</div>
      <div class="r" style="position:absolute;left:330px;top:-40px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.4)"></div>`;
    const sa = send.querySelector('.a'), sb = send.querySelector('.b'), sr = send.querySelector('.r');
    gsap.set(send, { autoAlpha: 0, scale: 0.9 }); gsap.set(sb, { yPercent: 110 }); gsap.set(sr, { scale: 0.1, autoAlpha: 0 });
    SS.tl.fromTo(send, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: SS.EZ.pop }, T.send0);
    SS.tl.fromTo(send, { scale: 1 }, { scale: 0.96, duration: 0.08, ease: 'power2.out' }, T.send);
    SS.tl.fromTo(send, { scale: 0.96 }, { scale: 1, duration: 0.24, ease: 'back.out(3)' }, T.send + 0.08);
    SS.tl.fromTo(sr, { scale: 0.1, autoAlpha: 0.9 }, { scale: 4, autoAlpha: 0, duration: 0.5, ease: SS.EZ.out }, T.send);
    SS.cue(T.send, 'send');
    const BTN = { t: 892, b: LP.h - 992 };
    SS.tl.fromTo(lp, { scaleY: 1 }, { scaleY: 0.985, duration: 0.08, ease: 'power2.out' }, T.squeeze - 0.08);
    SS.tl.fromTo(lp, { scaleY: 0.985 }, { scaleY: 1, duration: 0.12, ease: 'power2.out' }, T.squeeze);
    SS.tl.fromTo(lp, { clipPath: SS.OPEN }, { clipPath: SS.clipR(BTN.t, 30, BTN.b, 30, 50), duration: 0.24, ease: SS.EZ.in }, T.squeeze);
    SS.tl.fromTo(lp, { clipPath: SS.clipR(BTN.t, 30, BTN.b, 30, 50) }, { clipPath: SS.clipR(BTN.t, 220, BTN.b, 220, 50), duration: 0.14, ease: SS.EZ.out }, T.squeeze + 0.24);
    SS.tl.fromTo(send, { backgroundColor: AGENCY }, { backgroundColor: C.ink, duration: 0.24, ease: 'power1.inOut' }, T.label - 0.04);
    SS.tl.fromTo(sa, { yPercent: 0 }, { yPercent: -110, duration: 0.16, ease: SS.EZ.in }, T.label);
    SS.tl.fromTo(sb, { yPercent: 110 }, { yPercent: 0, duration: 0.2, ease: SS.EZ.out }, T.label + 0.08);
    SS.cue(T.squeeze, 'squeeze');

    // ================================================================ c) route through the node
    const svg = SS.svg('svg', { class: 'lines', width: 1, height: 1 }, world);
    const mk = (d, w) => SS.svg('path', { d, fill: 'none', stroke: C.turq, 'stroke-width': w, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, svg);
    const A0 = { x: 540, y: LP.top + 942 };
    const curve = (a, b) => `M${a.x},${a.y} C${a.x},${(a.y + b.y) / 2} ${b.x},${(a.y + b.y) / 2} ${b.x},${b.y}`;
    const route1 = mk(`M${A0.x},${A0.y + 50} L${NODE.x},${NODE.y - NODE.r}`, 5);
    const route2 = mk(curve({ x: NODE.x, y: NODE.y + NODE.r }, { x: CHIP.x, y: CHIP.y - 40 }), 5);
    SS.tl.fromTo(route1, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: T.node - T.token, ease: SS.EZ.inOut }, T.token);
    SS.tl.fromTo(route2, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: T.arrive - T.node - 0.07, ease: SS.EZ.inOut }, T.node + 0.07);
    SS.tl.fromTo([route1, route2], { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -1 }, duration: 0.4, ease: SS.EZ.in, stagger: 0.06 }, T.unfold + 0.02);
    const node = SS.el('div', 'a3', world);
    Object.assign(node.style, { width: NODE.r * 2 + 'px', height: NODE.r * 2 + 'px', borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', boxShadow: SS.SH.lift });
    const nl = SS.logo(node, 84, { word: false });
    nl.el.style.position = 'static'; nl.mark(1);
    SS.place(node, NODE.x, NODE.y, { scale: 0.4, autoAlpha: 0 });
    SS.tl.fromTo(node, { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: SS.EZ.pop }, T.token + 0.1);
    const nring = SS.el('div', 'a3', world);
    Object.assign(nring.style, { width: NODE.r * 2 + 'px', height: NODE.r * 2 + 'px', borderRadius: '50%', boxShadow: `0 0 0 4px ${C.turq}` });
    SS.place(nring, NODE.x, NODE.y, { scale: 1, autoAlpha: 0 });
    SS.tl.fromTo(nring, { scale: 1, autoAlpha: 0.9 }, { scale: 1.9, autoAlpha: 0, duration: 0.6, ease: SS.EZ.out }, T.node);
    const nlab = SS.text(world, 'ScaleSuite', { size: 38, weight: 760, color: C.ink2, align: 'left' });
    gsap.set(nlab.el, { x: NODE.x + NODE.r + 26, y: NODE.y, xPercent: 0, yPercent: -50 });
    SS.hideWords(nlab);
    SS.wordsIn(nlab, T.token + 0.2, { dur: 0.5 });
    SS.cue(T.node, 'node');
    // the token
    const token = tokenEl(world);
    gsap.set(token, { autoAlpha: 0 });
    SS.tl.set(token, { autoAlpha: 1 }, T.token);
    SS.tl.set(lp, { autoAlpha: 0 }, T.token);
    SS.tl.fromTo(P, { u1: 0 }, { u1: 1, duration: T.node - T.token, ease: SS.EZ.inOut }, T.token);
    SS.tl.fromTo(P, { u2: 0 }, { u2: 1, duration: T.arrive - T.node - 0.07, ease: SS.EZ.inOut }, T.node + 0.07);
    SS.tl.fromTo(P, { ts: 1 }, { ts: CHIP.s, duration: 0.45, ease: SS.EZ.inOut }, T.arrive - 0.45); // full size while it travels (label ≥ 30 px)
    SS.cue(T.token, 'token');
    SS.cue(T.arrive, 'lock');

    // ================================================================ d) the notification (climax)
    const note = SS.el('div', 'a3', shakeBox);
    Object.assign(note.style, { width: NOTE.w + 'px', height: NOTE.h + 'px', borderRadius: '40px', background: '#fff', boxShadow: SS.SH.note });
    const nc = SS.el('div', 'a3', note);
    Object.assign(nc.style, { left: 0, top: 0, width: NOTE.w + 'px', height: NOTE.h + 'px' });
    SS.noteHead(nc);
    nc.insertAdjacentHTML('beforeend', `<div style="position:absolute;left:${30 + 460 * CHIP.s + 20}px;top:${96 + 40 * CHIP.s - 26}px;font-size:38px;font-weight:780;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">Nouveau</div>
      <div style="position:absolute;left:30px;top:200px;font-size:40px;font-weight:720;letter-spacing:-.015em;color:${C.ink};white-space:nowrap">Acheteur · Longueuil</div>
      <div style="position:absolute;left:30px;top:268px;display:flex;align-items:center;gap:12px;font-size:32px;font-weight:720;color:${C.green};white-space:nowrap"><span class="ck" style="width:36px;height:36px;display:block"></span>Ajouté à votre CRM</div>`);
    const chk = SS.check(nc.querySelector('.ck'), 36, C.green);
    const chipL = 30, chipT = 96, chipW = 460 * CHIP.s, chipH = 100 * CHIP.s;
    const noteClip = SS.clipR(chipT, NOTE.w - chipL - chipW, NOTE.h - chipT - chipH, chipL, chipH / 2);
    SS.place(note, NOTE.x, NOTE.y, { autoAlpha: 0, clipPath: noteClip });
    shakeBox.appendChild(token); // the token sits above the notification it unfolds into
    SS.tl.set(note, { autoAlpha: 1 }, T.unfold);
    SS.tl.fromTo(note, { clipPath: noteClip }, { clipPath: SS.OPEN, duration: 0.55, ease: SS.EZ.pop12 }, T.unfold);
    gsap.set(nc, { autoAlpha: 0 });
    SS.tl.fromTo(nc, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power1.out' }, T.unfold + 0.12);
    SS.tl.fromTo(P, { chk: 0 }, { chk: 1, duration: 0.5, ease: 'none' }, T.chk);
    SS.tl.fromTo(P, { shake: 0 }, { shake: 1, duration: 0.42, ease: 'none' }, T.unfold + 0.08);
    const glow = SS.el('div', 'a3', shakeBox);
    Object.assign(glow.style, { width: NOTE.w + 'px', height: NOTE.h + 'px', borderRadius: '44px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 60px 10px rgba(43,191,179,.4)` });
    SS.place(glow, NOTE.x, NOTE.y, { autoAlpha: 0, scale: 0.96 });
    SS.tl.fromTo(glow, { autoAlpha: 0.9, scale: 0.96 }, { autoAlpha: 0, scale: 1.12, duration: 0.8, ease: SS.EZ.out }, T.unfold + 0.15);
    shakeBox.insertBefore(glow, note);
    SS.cue(T.unfold, 'notify'); SS.cue(T.unfold + 0.08, 'haptic'); SS.cue(T.chk, 'check');

    // ================================================================ e) the CRM opens out of the notification
    SS.tapAt(shakeBox, note, NOTE.x - 120, NOTE.y + 30, T.tap);
    const crm = SS.el('div', 'a3', ph.scr);
    Object.assign(crm.style, { left: 0, top: 0, width: SCR.w + 'px', height: SCR.h + 'px', background: '#F3F8F7' });
    const nTop = NOTE.y - NOTE.h / 2 - SCR.t, nLeft = NOTE.x - NOTE.w / 2 - SCR.l;
    const crmClip = SS.clipR(nTop, SCR.w - nLeft - NOTE.w, SCR.h - nTop - NOTE.h, nLeft, 40);
    gsap.set(crm, { autoAlpha: 0, clipPath: crmClip });
    SS.tl.set(crm, { autoAlpha: 1 }, T.crm);
    SS.tl.fromTo(crm, { clipPath: crmClip }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 0.5, ease: SS.EZ.inOut }, T.crm);
    SS.tl.fromTo(note, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12, ease: 'power1.in' }, T.crm + 0.02);
    SS.tl.fromTo(token, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12, ease: 'power1.in' }, T.crm + 0.02);
    SS.cue(T.crm, 'crm');
    crm.innerHTML = `<div class="hd" style="position:absolute;left:40px;top:96px;font-size:52px;font-weight:800;letter-spacing:-.03em;color:${C.ink}">Contacts</div>
      <div class="hd" style="position:absolute;left:40px;top:166px;font-size:30px;font-weight:600;color:${C.soft}">Votre CRM</div>`;
    const hds = crm.querySelectorAll('.hd');
    gsap.set(hds, { yPercent: 40, autoAlpha: 0 });
    SS.tl.fromTo(hds, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: SS.EZ.out, stagger: 0.05 }, T.crm + 0.2);
    const ROWS = [['Acheteur · Longueuil', 'Achat · aujourd’hui, 13 h 04', true], ['Vendeur · Brossard', 'Suivi · jeudi'], ['Acheteur · Saint-Lambert', 'Visite · mercredi'], ['Vendeur · Boucherville', 'Suivi · mardi']];
    const ROW = { top: 240, h: 132, pitch: 148, w: SCR.w - 60 };
    const rows = ROWS.map(([ti, su, isNew], i) => {
      const el = SS.el('div', 'a3', crm);
      Object.assign(el.style, { left: '30px', top: ROW.top + 'px', width: ROW.w + 'px', height: ROW.h + 'px', borderRadius: '26px', background: '#fff', boxShadow: SS.SH.card });
      el.innerHTML = `<div style="position:absolute;left:24px;top:30px;width:72px;height:72px">${SS.icon.person(isNew ? C.green : '#8FA9A5', isNew ? C.mint : '#EDF3F2')}</div>
        <div style="position:absolute;left:120px;top:24px;font-size:38px;font-weight:740;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">${ti}</div>
        <div style="position:absolute;left:120px;top:76px;font-size:30px;font-weight:560;color:${C.soft};white-space:nowrap">${su}</div>`;
      return el;
    });
    // existing contacts are there when the app opens; they step down to make room
    rows.slice(1).forEach((el, k) => {
      gsap.set(el, { y: k * ROW.pitch, yPercent: 30, autoAlpha: 0 });
      SS.tl.fromTo(el, { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.42, ease: SS.EZ.out }, T.crm + 0.26 + k * 0.05);
      SS.tl.fromTo(el, { y: k * ROW.pitch }, { y: (k + 1) * ROW.pitch, duration: 0.42, ease: SS.EZ.dock }, T.shift + k * 0.04);
    });
    gsap.set(rows[0], { y: -60, autoAlpha: 0, scale: 0.94 });
    SS.tl.fromTo(rows[0], { y: -60, autoAlpha: 0, scale: 0.94 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: SS.EZ.dock }, T.row);
    const halo = SS.el('div', 'a3', crm);
    Object.assign(halo.style, { left: '22px', top: ROW.top - 8 + 'px', width: ROW.w + 16 + 'px', height: ROW.h + 16 + 'px', borderRadius: '32px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 40px 4px rgba(43,191,179,.35)` });
    gsap.set(halo, { autoAlpha: 0, scale: 1.04 });
    SS.tl.fromTo(halo, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: SS.EZ.pop }, T.row + 0.2);
    const pill = SS.el('div', 'a3', rows[0]);
    Object.assign(pill.style, { right: '24px', left: 'auto', top: '42px', height: '48px', padding: '0 20px', borderRadius: '24px', background: C.green, color: '#fff', fontSize: '30px', fontWeight: 760,
      display: 'flex', alignItems: 'center', letterSpacing: '-.01em' });
    pill.textContent = 'Nouveau';
    gsap.set(pill, { scale: 0, autoAlpha: 0 });
    SS.tl.fromTo(pill, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.42, ease: SS.EZ.pop }, T.nouveau);
    SS.cue(T.row, 'row'); SS.cue(T.nouveau, 'nouveau');

    // ================================================================ camera
    SS.camTo(T.open, 0.55, SS.EZ.inOut, { y: 1000, s: 1 });
    SS.camTo(T.cam2, 0.7, SS.EZ.cam, { y: 1250, s: 1.12 });
    SS.camTo(T.cam3, 0.5, SS.EZ.inOut, { y: 1380, s: 0.95 });
    SS.camTo(T.token - 0.02, T.node - T.token + 0.04, SS.EZ.inOut, { y: 1960, s: 0.9 });
    SS.camFx(T.token + 0.06, 0.16, 'power2.in', { blur: 0 }, { blur: 6 });
    SS.camFx(T.token + 0.22, 0.22, 'power2.out', { blur: 6 }, { blur: 0 });
    SS.camTo(T.node + 0.02, 0.5, SS.EZ.inOut, { x: 600, y: 2520, s: 0.88 });
    SS.camTo(T.node + 0.52, 0.62, SS.EZ.cam, { x: 560, y: 3150, s: 0.9 });
    SS.camFx(T.node + 0.1, 0.16, 'power2.in', { blur: 0 }, { blur: 5 });
    SS.camFx(T.node + 0.26, 0.26, 'power2.out', { blur: 5 }, { blur: 0 });
    SS.camTo(T.unfold, 0.6, SS.EZ.cam, { y: 3440, s: 1.18 });
    SS.camTo(T.head2 - 0.05, 0.75, SS.EZ.cam, { y: 3420, s: 1.25 });

    // ================================================================ headlines
    const layer = SS.el('div', 'layer', stage);
    SS.tintScrim(layer);
    const h1 = SS.head(layer, 'Un acheteur\n*vous* *écrit.*', 452);
    SS.wordsIn(h1, T.head1, { st: 0.07 });
    SS.wordsOut(h1, T.head1Out, { st: 0.02 });
    const h2 = SS.head(layer, 'Déjà dans\n*votre* *CRM.*', 452);
    SS.wordsIn(h2, T.head2, { st: 0.07 });
    SS.cue(T.head1, 'line'); SS.cue(T.head2, 'line');
    // the scrim only while a headline sits over moving UI
    const scr = SS.scrims[SS.scrims.length - 1];
    gsap.set(scr, { autoAlpha: 0 });
    SS.tl.fromTo(scr, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, T.head1 - 0.15);
    SS.tl.fromTo(scr, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, T.head1Out + 0.1);
    SS.tl.fromTo(scr, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, T.head2 - 0.15);

    R = { layer, token, shakeBox, chk, sigPath, table, lp, node };
  }

  const bez = (a, b, u) => {
    const my = (a.y + b.y) / 2, m = 1 - u;
    return { x: m * m * m * a.x + 3 * m * m * u * a.x + 3 * m * u * u * b.x + u * u * u * b.x, y: m * m * m * a.y + 3 * m * m * u * my + 3 * m * u * u * my + u * u * u * b.y };
  };
  function render(t) {
    let pos = { x: 540, y: LP.top + 942 };
    if (P.u1 > 0) pos = { x: 540, y: pos.y + (NODE.y - pos.y) * P.u1 };
    if (P.u2 > 0) pos = bez({ x: NODE.x, y: NODE.y }, { x: CHIP.x, y: CHIP.y }, P.u2);
    R.token.style.transform = `translate(${pos.x.toFixed(2)}px,${pos.y.toFixed(2)}px) translate(-50%,-50%) scale(${P.ts.toFixed(4)})`;
    const k = P.shake;
    const dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.shakeBox.style.transform = `translate(${dx.toFixed(2)}px,0px)`;
    R.chk.set(P.chk);
    R.sigPath.setAttribute('stroke-dashoffset', (1 - P.sign).toFixed(4));
  }

  const scene = { name: 'notaire', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, 5.6, T.end + 0.4]]; };
  SS.scenes.push(scene);
})();
