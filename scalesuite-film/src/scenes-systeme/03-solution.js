/* « Système Vendeurs 5 minutes » (launch film, v3) · reveal and the system at work (4.0–19.4 s), site world.
   2 · Reveal (4.0–7.5): the whole logo rises in (never half swept on screen), « Nouveau », the product's name
       word by word (150 px), « Pour les équipes de courtiers du Québec. ». Held 6.0–7.5 (the poster).
   3 · The system at work (7.5–19.4), ONE camera that only travels down through one world:
       a  14 h 13: the clock ticks, a thread runs to the seller's phone, the text message unfolds.
       b  14 h 13: the thread reaches Courtier 03 (alert); 14 h 22: Courtier 03's alert becomes the relance,
          then ONE route up to the Leader, who gets the same relance. Nobody else lights up.
       c  90 days: Courtier 03's relance becomes the header of « Suivi »; ribbon; the clock's date line.
       d  The « Suivi » card contracts into line 5 of the product card, which forms around it; the five lines
          are checked in one gesture (one check every 0.2 s), held 1.5 s.
   Every transition ≤ 0.4 s through a shared object; one slow camera push per scene; no masked words. */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M;
  const CLOCKY = 640;
  // world B, stacked top to bottom
  const PH = { top: 720, w: 860, h: 1700 };
  const NOTE = { w: 780, h: 400 };
  NOTE.y = PH.top + 500;
  const G = SS.teamGeo(2720, 80);
  const SV = { top: 4720, h: 600 };
  const CAM = { a: 960, b: G.top - 720 + 960, c: SV.top - 760 + 960 };
  const toW = (screenY) => CAM.c - 960 + screenY; // screen → world while the camera rests on scene c
  const PCTOP = 580; // product card top (screen)
  const SUBX = 560;
  const P2 = { shake: 0, push: 1 };
  const snap = (el, from, to, at) => SS.tl.fromTo(el, from, Object.assign({ duration: 0.001, ease: 'none' }, to), at);
  const labSwap = (labels, i, j, at, dur = 0.42) => {
    SS.tl.fromTo(labels[i], { yPercent: 0, autoAlpha: 1 }, { yPercent: -60, autoAlpha: 0, duration: dur * 0.6, ease: SS.EZ.in }, at);
    SS.tl.fromTo(labels[j], { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: dur, ease: SS.EZ.out }, at + dur * 0.6); // one readable label at a time
  };

  let R;
  function build(stage) {
    const C = SS.CLK;
    SS.cue(S.bloom, 'sfx-reveal');
    // while hidden (after the bloom), the clock takes the site's colours and its action geometry
    snap(C.pill, { backgroundColor: SS.P.line, color: SS.P.ink, boxShadow: '0 0 0 0px rgba(196,214,211,0), 0 14px 30px -16px rgba(18,74,66,0)', y: 630 },
      { backgroundColor: '#ffffff', color: M.ink, boxShadow: '0 0 0 2px rgba(196,214,211,1), 0 14px 30px -16px rgba(18,74,66,.28)', y: CLOCKY }, S.bloom + 0.35);
    snap(C.hS, { attr: { stroke: SS.P.slate } }, { attr: { stroke: M.turq } }, S.bloom + 0.35);

    // ================================================================ 2 · reveal (screen space)
    const rv = SS.el('div', 'layer', stage);
    const rvIn = SS.el('div', 'a3', rv);
    Object.assign(rvIn.style, { left: '0px', top: '0px', width: '1080px', height: '1920px', transformOrigin: '540px 960px' });
    const logo = SS.logo(rvIn, 130);
    logo.mark(1); logo.sheen(0);
    SS.place(logo.el, 540, 530);
    SS.logoCover(rvIn, 540, 530, (130 * SS.LOGO.w) / SS.LOGO.h, 130, S.logo, S.revealOut);
    const mkNouveau = (parent) => {
      const el = SS.el('div', 'a3', parent);
      Object.assign(el.style, { height: '76px', padding: '0 34px', borderRadius: '38px', background: M.band, color: M.teal, fontSize: '40px', fontWeight: 760, letterSpacing: '-.015em', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' });
      el.textContent = 'Nouveau';
      return el;
    };
    const nou = mkNouveau(rvIn);
    SS.place(nou, 540, 660, { scale: 1.1 });
    SS.riseEl(nou, S.nouveau, null, { y: 660 });
    const name = SS.head(rvIn, 'Système\nVendeurs\n5 *minutes.*', { size: 150, lh: 1.02 });
    SS.place(name.el, 540, 1015);
    gsap.set(name.words.map((x) => x.el), { yPercent: 0 });
    gsap.set(name.words.map((x) => x.m), { autoAlpha: 0, y: 30 });
    [S.w1, S.w2, S.w3, S.w4].forEach((t0, i) => { SS.riseOne(name, i, t0); SS.cue(t0, 'm-sig', { i }); });
    SS.tl.fromTo(name.words.map((x) => x.m), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -16, duration: 0.24, stagger: 0.012, ease: 'power2.in' }, S.nameOut);
    const pour = SS.text(rvIn, 'Pour les équipes de courtiers du Québec.', { size: 54, weight: 620, color: M.soft, tracking: -0.02, maxW: 960 });
    SS.place(pour.el, 540, 1370);
    SS.rise(pour, S.pour, S.nameOut, { st: 0.02 });
    // no scale animation on this frame: a scaled logo is rasterised differently depending on the frames rendered before it
    // « Nouveau » → the clock (same pill, same place)
    SS.tl.fromTo(nou, { y: 660, scale: 1.1 }, { y: CLOCKY, scale: 1.2, duration: 0.3, ease: SS.EZ.inOut }, S.revealOut - 0.05);
    SS.tl.fromTo(nou, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: 'power1.in' }, S.revealOut + 0.15);
    SS.tl.fromTo(C.pill, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: SS.EZ.out }, S.revealOut + 0.1);

    // ================================================================ 3 · world B, one camera
    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera({ x: 540, y: CAM.a, s: 1, r: 0, blur: 0 });
    cam.set({ x: 540, y: CAM.a, s: 1, r: 0 });

    // ---- a · the phone (rises from below at the hand-over)
    const shakeBox = SS.el('div', 'a3', w);
    const phone = SS.el('div', 'a3', shakeBox);
    Object.assign(phone.style, { width: PH.w + 'px', height: PH.h + 'px', borderRadius: '116px', background: '#FBFDFD',
      boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 50px 90px -40px rgba(18,74,66,.42), 0 0 0 3px #1F2423, inset 0 0 0 2px #fff' });
    phone.innerHTML = `<div style="position:absolute;inset:16px;border-radius:100px;background:linear-gradient(175deg,#F7FFFD 0%,#E6F7F3 70%,#D8F1EC 100%);overflow:hidden">
        <div style="position:absolute;left:50%;top:26px;width:200px;height:54px;margin-left:-100px;border-radius:27px;background:#151515"></div>
        <div style="position:absolute;left:0;right:0;top:110px;text-align:center;font-size:38px;font-weight:600;color:${M.soft}">samedi 7 novembre</div>
        <div style="position:absolute;left:0;right:0;top:150px;text-align:center;font-size:140px;font-weight:300;letter-spacing:-.04em;color:#232827;line-height:1.1;font-feature-settings:'tnum' 1">14:13</div></div>`;
    const PY = PH.top + PH.h / 2;
    SS.place(phone, 540, PY + 1000);
    SS.tl.fromTo(phone, { y: PY + 1000 }, { y: PY, duration: 0.45, ease: SS.EZ.out }, S.phone);
    const note = SS.el('div', 'a3', shakeBox);
    Object.assign(note.style, { width: NOTE.w + 'px', height: NOTE.h + 'px', borderRadius: '44px', background: '#fff',
      boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 30px 60px -24px rgba(18,74,66,.4), 0 0 0 1px rgba(21,21,21,.05)' });
    const bubble = `<svg viewBox="0 0 24 24" style="width:44px;height:44px"><rect width="24" height="24" rx="6" fill="${M.ink}"/><path d="M6 8.6c0-1.4 1.1-2.4 2.5-2.4h7c1.4 0 2.5 1 2.5 2.4v4.6c0 1.4-1.1 2.4-2.5 2.4H11l-3.2 2.6v-2.6h.7C7.1 15.6 6 14.6 6 13.2z" fill="#fff"/></svg>`;
    note.innerHTML = `<div class="nc" style="position:absolute;inset:0">
        <div style="position:absolute;left:34px;top:30px;display:flex;align-items:center;gap:16px;font-size:30px;font-weight:650;color:${M.soft}">${bubble}Texto</div>
        <div style="position:absolute;right:34px;top:34px;font-size:30px;font-weight:550;color:${M.soft}">maintenant</div>
        <div style="position:absolute;left:34px;top:100px;font-size:42px;font-weight:800;letter-spacing:-.01em;color:${M.ink};white-space:nowrap;font-feature-settings:'tnum' 1">514 555 0142</div>
        <div style="position:absolute;left:34px;right:40px;top:162px;font-size:36px;font-weight:520;line-height:1.3;letter-spacing:-.01em;color:#232827">Bonjour, ici Julie de l'Équipe Gagnon. J'ai bien reçu votre demande. Je vous appelle dans quelques minutes.</div></div>`;
    const nc = note.querySelector('.nc');
    const noteFromPill = SS.clipR((NOTE.h - SS.TOKEN.h) / 2, (NOTE.w - SS.TOKEN.w) / 2, (NOTE.h - SS.TOKEN.h) / 2, (NOTE.w - SS.TOKEN.w) / 2, 50);
    SS.place(note, 540, NOTE.y, { autoAlpha: 0, clipPath: noteFromPill, backgroundColor: '#151515' });
    gsap.set(nc, { autoAlpha: 0 });
    C.go(S.tick13, 0.3, null, 1, 853, SS.EZ.out);
    SS.cue(S.tick13, 'm-tick');
    C.fil(S.tick13 + 0.02, 0.3, S.texto + 0.15, 0.3, () => SS.toScreen(cam.p, 540, NOTE.y - SS.TOKEN.h / 2));
    SS.tl.set(note, { autoAlpha: 1 }, S.texto);
    SS.tl.fromTo(note, { clipPath: noteFromPill }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.pop12 }, S.texto);
    SS.tl.fromTo(note, { backgroundColor: '#151515' }, { backgroundColor: '#ffffff', duration: 0.22, ease: 'power1.inOut' }, S.texto + 0.02);
    SS.tl.fromTo(nc, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: SS.EZ.out }, S.texto + 0.16);
    SS.tl.fromTo(note, { scale: 0.96 }, { scale: 1, duration: 0.55, ease: SS.EZ.pop12 }, S.texto);
    SS.tl.fromTo(P2, { shake: 0 }, { shake: 1, duration: 0.5, ease: 'none' }, S.texto + 0.1);
    SS.cue(S.texto, 'sfx-texto');

    // ---- b · the team card, under the phone
    const team = SS.teamCard(w, 'M', G);
    const chip = (txt, bg, fg, icon) => `<span class="sy-chip" style="background:${bg};color:${fg}">${icon || ''}${txt}</span>`;
    const house = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${M.ink}" stroke-width="2.3" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>`;
    team.rows[3].querySelector('.st').innerHTML = chip('En visite libre', M.band, M.ink, house);
    const I1 = { C3: true }, I2 = { C3: true, L: true };
    const y3 = G.rowY(3);
    const halo = SS.el('div', 'a3', w);
    Object.assign(halo.style, { width: '884px', height: G.rowH + 10 + 'px', borderRadius: '24px', boxShadow: `0 0 0 4px ${M.turq}` });
    SS.place(halo, 540, y3, { autoAlpha: 0, scale: 1.03 });
    SS.tl.fromTo(halo, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.36, ease: SS.EZ.out }, S.alert3 - 0.1);
    const others = [0, 1, 2, 4, 5].map((i) => team.rows[i]);
    SS.tl.fromTo(others, { opacity: 1 }, { opacity: 0.3, duration: 0.35, ease: 'power1.out' }, S.alert3 - 0.06);
    C.fil(S.fil3, 0.25, S.alert3 + 0.1, 0.3, () => SS.toScreen(cam.p, 150, y3 - G.rowH / 2));
    SS.cue(S.fil3, 'm-fil');
    SS.tl.fromTo(team.card, { height: G.h() }, { height: G.h(I1), duration: 0.4, ease: SS.EZ.inOut }, S.alert3 - 0.1);
    [4, 5].forEach((i) => SS.tl.fromTo(team.rows[i], { y: G.rowY(i) }, { y: G.rowY(i, I1), duration: 0.4, ease: SS.EZ.inOut }, S.alert3 - 0.1));
    const sub = SS.subCard(w, 'M', 'Nouvelle demande · Vendeur · Longueuil', { alt: ['Relance · Vendeur · Longueuil', 'Suivi · Vendeur · Longueuil'] });
    sub.labels.slice(1).forEach((l) => gsap.set(l, { yPercent: 60, autoAlpha: 0 }));
    const sY1 = G.subY(3, I1), sY2 = G.subY(3, I2);
    const subClip = SS.clipR(0, 800, 0, 0, 20);
    SS.place(sub.el, SUBX, sY1 + 24, { autoAlpha: 0, clipPath: subClip });
    SS.tl.set(sub.el, { autoAlpha: 1 }, S.alert3);
    SS.tl.fromTo(sub.el, { y: sY1 + 24 }, { y: sY1, duration: 0.4, ease: SS.EZ.dock }, S.alert3);
    SS.tl.fromTo(sub.el, { clipPath: subClip }, { clipPath: SS.OPEN, duration: 0.45, ease: SS.EZ.out }, S.alert3);
    // 14 h 13 → 14 h 22: nine ticks, accelerating, each finished before the next
    const n = 9, span = S.relance - S.ticks - 0.05;
    const starts = Array.from({ length: n }, (_, k) => S.ticks + span * Math.pow(k / n, 0.62));
    starts.forEach((t0, k) => {
      const nxt = k < n - 1 ? starts[k + 1] : S.relance;
      C.go(t0, Math.min(0.18, (nxt - t0) * 0.88), null, 2 + k, 854 + k, SS.EZ.out);
    });
    SS.cue(S.ticks, 'm-ticks', { n, starts });
    labSwap(sub.labels, 0, 1, S.relance);
    SS.tl.fromTo(sub.bar, { backgroundColor: M.turq }, { backgroundColor: M.teal, duration: 0.3, ease: 'power1.inOut' }, S.relance);
    [1, 2, 3, 4, 5].forEach((i) => SS.tl.fromTo(team.rows[i], { y: G.rowY(i, I1) }, { y: G.rowY(i, I2), duration: 0.3, ease: SS.EZ.inOut }, S.shift));
    SS.tl.fromTo(sub.el, { y: sY1 }, { y: sY2, duration: 0.3, ease: SS.EZ.inOut }, S.shift);
    SS.tl.fromTo(halo, { y: y3 }, { y: G.rowY(3, I2), duration: 0.3, ease: SS.EZ.inOut }, S.shift);
    SS.tl.fromTo(team.card, { height: G.h(I1) }, { height: G.h(I2), duration: 0.3, ease: SS.EZ.inOut }, S.shift);
    const svg = SS.svg('svg', { class: 'lines', width: 1, height: 1 }, w);
    const yL = G.rowY(0);
    const route = SS.svg('path', { d: `M160,${sY2} L120,${sY2} Q66,${sY2} 66,${sY2 - 54} L66,${yL + 54} Q66,${yL} 120,${yL} L128,${yL}`,
      fill: 'none', stroke: M.turq, 'stroke-width': 5, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, svg);
    SS.tl.fromTo(route, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: S.leader - S.route, ease: SS.EZ.inOut }, S.route);
    SS.tl.fromTo(route, { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -1 }, duration: 0.35, ease: SS.EZ.in }, S.leader + 0.3);
    const haloL = SS.el('div', 'a3', w);
    Object.assign(haloL.style, { width: '884px', height: G.rowH + 10 + 'px', borderRadius: '24px', boxShadow: `0 0 0 4px ${M.turq}` });
    SS.place(haloL, 540, yL, { autoAlpha: 0, scale: 1.03 });
    SS.tl.fromTo(haloL, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.36, ease: SS.EZ.out }, S.leader);
    SS.tl.fromTo(team.rows[0], { opacity: 0.3 }, { opacity: 1, duration: 0.3, ease: 'power1.out' }, S.leader);
    const subL = SS.subCard(w, 'M', 'Relance · Vendeur · Longueuil');
    subL.bar.style.background = M.teal;
    const sL = G.subY(0, I2);
    SS.place(subL.el, SUBX, sL + 24, { autoAlpha: 0, clipPath: subClip });
    SS.tl.set(subL.el, { autoAlpha: 1 }, S.leader + 0.05);
    SS.tl.fromTo(subL.el, { y: sL + 24 }, { y: sL, duration: 0.4, ease: SS.EZ.dock }, S.leader + 0.05);
    SS.tl.fromTo(subL.el, { clipPath: subClip }, { clipPath: SS.OPEN, duration: 0.45, ease: SS.EZ.out }, S.leader + 0.05);
    SS.cue(S.leader, 'm-leader');

    // ---- c · 90 days: Courtier 03's relance travels down with the camera and becomes the « Suivi » header
    const card = SS.el('div', 'sy-card', w);
    Object.assign(card.style, { width: '900px', height: SV.h + 'px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    gsap.set(card, { x: 90, y: SV.top + 60, autoAlpha: 0 });
    SS.tl.fromTo(card, { y: SV.top + 60, autoAlpha: 0 }, { y: SV.top, autoAlpha: 1, duration: 0.4, ease: SS.EZ.out }, S.toSuivi + 0.15);
    w.appendChild(sub.el); // above the « Suivi » card
    SS.tl.fromTo(sub.el, { x: SUBX, y: sY2 }, { x: 540, y: SV.top + 90, duration: 0.4, ease: SS.EZ.inOut }, S.toSuivi);
    labSwap(sub.labels, 1, 2, S.toSuivi + 0.15);
    const rb = SS.el('div', '', card);
    Object.assign(rb.style, { position: 'absolute', left: '0px', top: '0px', width: '900px', height: SV.h + 'px' });
    rb.innerHTML = `<div style="position:absolute;left:66px;top:293px;width:768px;height:14px;border-radius:7px;background:#E6EFED"></div>
      <div class="fill" style="position:absolute;left:66px;top:293px;width:768px;height:14px;border-radius:7px;background:${M.turq};transform-origin:0% 50%"></div>
      <div style="position:absolute;left:44px;top:277px;width:46px;height:46px;border-radius:50%;background:${M.teal};box-shadow:0 0 0 10px ${M.band}"></div>
      <div class="n1" style="position:absolute;left:810px;top:277px;width:46px;height:46px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 6px ${M.teal}"></div>
      <div style="position:absolute;left:44px;top:368px;font-size:42px;font-weight:700;letter-spacing:-.02em;color:${M.ink};white-space:nowrap">Aujourd'hui</div>
      <div style="position:absolute;left:44px;top:426px;font-size:36px;font-weight:580;color:${M.soft};white-space:nowrap">sam. 7 nov.</div>
      <div class="lab90" style="position:absolute;right:44px;top:358px;text-align:right;white-space:nowrap"><div style="font-size:56px;font-weight:800;letter-spacing:-.03em;color:${M.teal}">90 jours</div>
        <div style="margin-top:4px;font-size:36px;font-weight:580;color:${M.soft}">ven. 5 févr.</div></div>`;
    const fill = rb.querySelector('.fill'), n1 = rb.querySelector('.n1'), lab90 = rb.querySelector('.lab90');
    gsap.set(fill, { scaleX: 0 }); gsap.set(n1, { scale: 0 }); gsap.set(lab90, { autoAlpha: 0, y: 14 });
    SS.tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: SS.EZ.inOut }, S.ribbon);
    SS.tl.fromTo(n1, { scale: 0 }, { scale: 1, duration: 0.35, ease: SS.EZ.pop }, S.ribbon + 0.7);
    SS.tl.fromTo(lab90, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: SS.EZ.out }, S.ribbon + 0.75);
    // time line → date line → later date: a fade swap, never two lines readable at once
    const [timeRow, dateRow] = [...C.col.children];
    const [d0, d1] = [...C.date.col.children];
    gsap.set(d1, { autoAlpha: 0 });
    SS.tl.fromTo(timeRow, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.14, ease: 'power1.in' }, S.dateMode);
    snap(C.col, { yPercent: 0 }, { yPercent: -50 }, S.dateMode + 0.15);
    SS.tl.fromTo(dateRow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power1.out' }, S.dateMode + 0.16);
    SS.tl.fromTo(d0, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.14, ease: 'power1.in' }, S.dateRoll + 0.2);
    snap(C.date.col, { yPercent: 0 }, { yPercent: -50 }, S.dateRoll + 0.35);
    SS.tl.fromTo(d1, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power1.out' }, S.dateRoll + 0.36);
    SS.tl.fromTo(C.P, { min: 862 }, { min: 862 + 720 * 3, duration: 0.8, ease: SS.EZ.inOut }, S.ribbon);
    SS.cue(S.ribbon, 'm-ribbon');

    // ---- d · the product card forms around the « Suivi » card (line 5) and is checked in one gesture
    const pc = SS.productCard(w);
    const PCH = SS.PCARD.h;
    gsap.set(pc.el, { x: 90, y: toW(PCTOP) });
    pc.rows.forEach((r) => { gsap.set(r.sk, { autoAlpha: 0 }); });
    const row5Top = SS.PCARD.headH + 8 + 4 * SS.PCARD.rowH;
    const pcFrom = SS.clipR(row5Top, 0, PCH - row5Top - SS.PCARD.rowH, 0, 24);
    gsap.set(pc.el, { autoAlpha: 0, clipPath: pcFrom });
    const r5y = toW(PCTOP + row5Top + SS.PCARD.rowH / 2);
    SS.tl.fromTo(card, { y: SV.top }, { y: r5y - SV.h / 2, duration: 0.35, ease: SS.EZ.inOut }, S.pile);
    SS.tl.fromTo(sub.el, { y: SV.top + 90 }, { y: r5y, duration: 0.35, ease: SS.EZ.inOut }, S.pile);
    SS.tl.fromTo([card, sub.el], { autoAlpha: 1, scaleY: 1 }, { autoAlpha: 0, scaleY: 0.25, duration: 0.3, ease: SS.EZ.in }, S.pile + 0.08);
    SS.tl.set(pc.el, { autoAlpha: 1 }, S.pile + 0.2);
    SS.tl.fromTo(pc.el, { clipPath: pcFrom }, { clipPath: SS.OPEN, duration: 0.4, ease: SS.EZ.out }, S.pile + 0.2);
    pc.rows.forEach((r, i) => SS.tl.fromTo(r.k, { k: 0 }, { k: 1, duration: 0.3, ease: 'none' }, S.check0 + i * 0.2));
    SS.cue(S.full, 'm-stack');

    // ---- the camera: one push per scene, two travels of 0.4 s (never two moves at once)
    cam.to(S.tick13, S.toTeam - S.tick13 - 0.05, 'sine.inOut', { s: 1.02 });
    cam.to(S.toTeam, 0.4, SS.EZ.inOut, { y: CAM.b, s: 1 });
    cam.fx(S.toTeam + 0.05, 0.15, 'power2.in', { blur: 0 }, { blur: 6 });
    cam.fx(S.toTeam + 0.2, 0.18, 'power2.out', { blur: 6 }, { blur: 0 });
    cam.to(S.toTeam + 0.45, S.toSuivi - S.toTeam - 0.5, 'sine.inOut', { s: 1.02 });
    cam.to(S.toSuivi, 0.4, SS.EZ.inOut, { y: CAM.c, s: 1 });
    cam.fx(S.toSuivi + 0.05, 0.15, 'power2.in', { blur: 0 }, { blur: 6 });
    cam.fx(S.toSuivi + 0.2, 0.18, 'power2.out', { blur: 6 }, { blur: 0 });
    cam.to(S.toSuivi + 0.45, S.pile - S.toSuivi - 0.5, 'sine.inOut', { s: 1.01 });
    cam.to(S.pile, 0.3, SS.EZ.inOut, { s: 1 });

    // ================================================================ screen-space headlines of the action
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 600, '240,255,252');
    gsap.set(scrim, { x: 0, y: 0 });
    const label = SS.stepLabel(layer);
    SS.place(label, 540, 175);
    SS.riseEl(label, S.revealOut + 0.1, S.pile, { y: 175 });
    const T = [
      ['Réponse\n*60_secondes.*', S.revealOut + 0.15, S.h3b - 0.3],
      ['Le bon courtier\n*alerté.*', S.h3b, S.h3c - 0.3],
      ['Relance après\n*10_minutes.*', S.h3c, S.h3d - 0.3],
      ['Pas prêt à vendre?\n*Suivi* *90_jours.*', S.h3d, S.pile],
    ];
    T.forEach(([src, a, b]) => {
      const h = SS.head(layer, src, { size: 104 });
      SS.place(h.el, 540, 350);
      SS.rise(h, a, b);
    });
    const mention = SS.text(layer, 'Exemple. Noms et numéros fictifs.', { size: 32, weight: 560, color: M.soft, tracking: -0.01 });
    SS.place(mention.el, 540, 1610);
    SS.rise(mention, S.texto + 0.4, S.toTeam - 0.05, { st: 0.02 });
    // the clock leaves when the product card forms
    SS.tl.fromTo(C.pill, { autoAlpha: 1, y: CLOCKY }, { autoAlpha: 0, y: CLOCKY - 16, duration: 0.25, ease: SS.EZ.in }, S.pile);
    // the product card's logo and « Nouveau » (screen space)
    const pl = SS.el('div', 'layer', stage);
    const plogo = SS.logo(pl, 110);
    plogo.mark(1);
    SS.place(plogo.el, 540, 380);
    SS.logoCover(pl, 540, 380, (110 * SS.LOGO.w) / SS.LOGO.h, 110, S.pile + 0.28, S.proof);
    const pnou = mkNouveau(pl);
    SS.place(pnou, 540, 500);
    SS.riseEl(pnou, S.pile + 0.33, S.proof, { y: 500 });

    R = { wrap, w, cam, layer, shakeBox, rv, rvIn, pl };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, R.cam.p.blur || 0);
    const k = P2.shake;
    const dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.shakeBox.style.transform = `translate(${dx.toFixed(2)}px,0px)`;
    R.rvIn.style.transform = `scale(${P2.push.toFixed(4)})`;
  }

  const scene = { name: 'solution', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => {
    build(stage);
    scene.ranges = [[R.rv, S.logo - 0.05, S.revealOut + 0.4], [R.wrap, S.phone - 0.02, S.proof + 0.01], [R.layer, S.revealOut, S.pile + 0.3], [R.pl, S.pile, S.proof + 0.3]];
  };
  SS.PCTOP = PCTOP;
  SS.scenes.push(scene);
})();
