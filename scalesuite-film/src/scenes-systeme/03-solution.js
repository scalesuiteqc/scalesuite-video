/* « Système Vendeurs 5 minutes » (launch film) · reveal and stack (5.95–25.0 s), site world.
   3 · Reveal (6.0–10.1), the hero: the mint disc has bloomed from the clock; the clock pill tightens into the
       static « Nouveau » label; the ScaleSuite logo; the product's name word by word in 150 px (« Système »,
       « Vendeurs », « 5 », « minutes. »), then « Pour les équipes de courtiers du Québec. ». Held 7.9–10.1.
   4 · Stack (10.1–25.0): a full-frame sheet carries the product card « Le Système Vendeurs 5 minutes ». For each
       of the five components the sheet rises (card view: previous line checked, next line docks), then leaves
       upward and uncovers its demo in world B, with the clock (y 640) and a step label « … · n sur 5 »:
         1 Campagne Google Vendeurs + team page (14 h 12)   2 Réponse 60 secondes (14 h 13, the text message)
         3 Le bon courtier alerté (14 h 13, Courtier 03)     4 Relance après 10 minutes (14 h 22, then the Leader only)
         5 Suivi 90 jours (ribbon, date line)
       The full card with five checks is held 23.5–25.0. Camera jumps between demos happen while the sheet covers
       the frame (world B hidden). */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M;
  const G = SS.teamGeo(720);
  const CLOCKY = 640;
  const PG = { top: 720 };
  PG.y = PG.top + SS.PAGE.h / 2;
  const AD = { y: PG.top + 125 };
  const PH = { top: 2400, w: 860, h: 1700 };
  const NOTE = { w: 780, h: 400 };
  NOTE.y = PH.top + 500; // on screen ≈ 1220
  const OX = 1300, OX2 = 2600;
  const SUBX = 560;
  const SHEET = { logoY: 330, nouveauY: 455, cardTop: 520 };
  const P2 = { shake: 0, mark: 0, sheen: 0, push: 1 };
  const snap = (el, from, to, at) => SS.tl.fromTo(el, from, Object.assign({ duration: 0.001, ease: 'none' }, to), at);

  const labSwap = (labels, i, j, at, dur = 0.42) => {
    SS.tl.fromTo(labels[i], { yPercent: 0 }, { yPercent: -110, duration: dur * 0.6, ease: SS.EZ.in }, at);
    SS.tl.fromTo(labels[j], { yPercent: 110 }, { yPercent: 0, duration: dur, ease: SS.EZ.out }, at + dur * 0.25);
  };

  let R;
  function build(stage) {
    const C = SS.CLK;
    // the clock takes the site's colours on the bloom
    SS.tl.fromTo(C.pill, { backgroundColor: SS.P.line, boxShadow: '0 0 0 0px rgba(196,214,211,0), 0 14px 30px -16px rgba(18,74,66,0)' },
      { backgroundColor: '#ffffff', boxShadow: '0 0 0 2px rgba(196,214,211,1), 0 14px 30px -16px rgba(18,74,66,.28)', duration: 0.2, ease: 'power1.inOut' }, S.bloom + 0.03);
    SS.tl.fromTo(C.pill, { color: SS.P.ink }, { color: M.ink, duration: 0.4, ease: 'power1.inOut' }, S.bloom + 0.05);
    SS.tl.fromTo(C.hS, { attr: { stroke: SS.P.slate } }, { attr: { stroke: M.turq }, duration: 0.4, ease: 'power1.inOut' }, S.bloom + 0.05);
    SS.cue(S.bloom, 'sfx-reveal');

    // ================================================================ world B (demos)
    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera({ x: 540, y: 960, s: 1, r: 0, blur: 0 });
    cam.set({ x: 540, y: 960, s: 1, r: 0 });

    // ---- 1 · campaign and page (14 h 12)
    const page = SS.teamPage(w, 'M');
    const adClip = SS.clipR(0, 0, SS.PAGE.h - 250, 0, 28);
    SS.place(page.el, 540, PG.y, { autoAlpha: 0, clipPath: adClip });
    gsap.set(page.ct, { autoAlpha: 0, y: 18 });
    const ad = SS.adCard(w, 'M');
    Object.assign(ad.el.style, { boxShadow: `0 0 0 3px ${M.turq}, ${SS.SHADOW.m}` });
    const tag = SS.el('div', '', ad.el);
    Object.assign(tag.style, { position: 'absolute', right: '26px', top: '-26px', height: '52px', padding: '0 20px', borderRadius: '14px', background: M.teal, color: '#fff', fontSize: '30px', fontWeight: 760, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' });
    tag.textContent = 'Votre équipe';
    SS.place(ad.el, 540, AD.y);
    const rip = SS.ripple(w, { fill: 'rgba(43,191,179,.22)', ring: M.turq });
    SS.tap(rip, 360, AD.y + 10, S.tap1);
    SS.tl.fromTo(ad.el, { scale: 1 }, { scale: 0.975, duration: 0.08, ease: 'power2.out' }, S.tap1);
    SS.tl.fromTo(ad.el, { scale: 0.975 }, { scale: 1, duration: 0.2, ease: 'power2.out' }, S.tap1 + 0.08);
    SS.tl.fromTo(ad.ct, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -14, duration: 0.14, ease: SS.EZ.in }, S.page1);
    SS.tl.fromTo(tag, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.14, ease: SS.EZ.in }, S.page1);
    SS.tl.set(ad.el, { autoAlpha: 0 }, S.page1 + 0.1);
    SS.tl.set(page.el, { autoAlpha: 1 }, S.page1 + 0.1);
    SS.tl.fromTo(page.el, { clipPath: adClip }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.inOut }, S.page1 + 0.1);
    SS.tl.fromTo(page.ct, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: SS.EZ.out }, S.page1 + 0.28);
    const rip2 = SS.ripple(w, { fill: 'rgba(255,255,255,.3)', ring: '#fff' });
    SS.tap(rip2, 540, PG.top + 656, S.send1);
    SS.tl.fromTo(page.send, { scale: 1 }, { scale: 0.97, duration: 0.08, ease: 'power2.out' }, S.send1);
    SS.tl.fromTo(page.send, { scale: 0.97 }, { scale: 1, duration: 0.2, ease: 'power2.out' }, S.send1 + 0.08);
    const tokClip = SS.clipR((SS.PAGE.h - SS.TOKEN.h) / 2, (SS.PAGE.w - SS.TOKEN.w) / 2, (SS.PAGE.h - SS.TOKEN.h) / 2, (SS.PAGE.w - SS.TOKEN.w) / 2, 50);
    SS.tl.fromTo(page.ct, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12, ease: SS.EZ.in }, S.send1 + 0.08);
    SS.tl.fromTo(page.el, { clipPath: SS.OPEN }, { clipPath: tokClip, duration: 0.22, ease: SS.EZ.inOut }, S.send1 + 0.08);
    SS.tl.fromTo(page.el, { backgroundColor: '#ffffff' }, { backgroundColor: '#151515', duration: 0.18, ease: 'power1.inOut' }, S.send1 + 0.12);
    SS.tl.set(page.el, { autoAlpha: 0 }, S.tok1);
    const tok = SS.token(w);
    SS.place(tok, 540, PG.y, { autoAlpha: 0 });
    SS.tl.set(tok, { autoAlpha: 1 }, S.tok1);

    // ---- 2 · the seller's phone (14 h 13)
    const shakeBox = SS.el('div', 'a3', w);
    const phone = SS.el('div', 'a3', shakeBox);
    Object.assign(phone.style, { width: PH.w + 'px', height: PH.h + 'px', borderRadius: '116px', background: '#FBFDFD',
      boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 50px 90px -40px rgba(18,74,66,.42), 0 0 0 3px #1F2423, inset 0 0 0 2px #fff' });
    phone.innerHTML = `<div style="position:absolute;inset:16px;border-radius:100px;background:linear-gradient(175deg,#F7FFFD 0%,#E6F7F3 70%,#D8F1EC 100%);overflow:hidden">
        <div style="position:absolute;left:50%;top:26px;width:200px;height:54px;margin-left:-100px;border-radius:27px;background:#151515"></div>
        <div style="position:absolute;left:0;right:0;top:110px;text-align:center;font-size:38px;font-weight:600;color:${M.soft}">samedi 7 novembre</div>
        <div style="position:absolute;left:0;right:0;top:150px;text-align:center;font-size:140px;font-weight:300;letter-spacing:-.04em;color:#232827;line-height:1.1;font-feature-settings:'tnum' 1">14:13</div></div>`;
    SS.place(phone, 540, PH.top + PH.h / 2);
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

    // ---- 3 and 4 · the team card (14 h 13, then 14 h 22)
    const box = SS.el('div', 'a3', w);
    gsap.set(box, { x: OX, y: 0 });
    const team = SS.teamCard(box, 'M', G);
    const chip = (txt, bg, fg, icon) => `<span class="sy-chip" style="background:${bg};color:${fg}">${icon || ''}${txt}</span>`;
    const house = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${M.ink}" stroke-width="2.3" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>`;
    team.rows[3].querySelector('.st').innerHTML = chip('En visite libre', M.band, M.ink, house);
    const I1 = { C3: true }, I2 = { C3: true, L: true };
    const y3 = G.rowY(3);
    const halo = SS.el('div', 'a3', box);
    Object.assign(halo.style, { width: '884px', height: G.rowH + 10 + 'px', borderRadius: '24px', boxShadow: `0 0 0 4px ${M.turq}` });
    SS.place(halo, 540, y3, { autoAlpha: 0, scale: 1.03 });
    SS.tl.fromTo(halo, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.36, ease: SS.EZ.out }, S.alert3 - 0.1);
    const others = [0, 1, 2, 4, 5].map((i) => team.rows[i]);
    SS.tl.fromTo(others, { opacity: 1 }, { opacity: 0.3, duration: 0.35, ease: 'power1.out' }, S.alert3 - 0.06);
    C.fil(S.fil3, 0.35, S.alert3 + 0.1, 0.3, () => SS.toScreen(cam.p, OX + 150, y3 - G.rowH / 2));
    SS.cue(S.fil3, 'm-fil');
    SS.tl.fromTo(team.card, { height: G.h() }, { height: G.h(I1), duration: 0.42, ease: SS.EZ.inOut }, S.alert3 - 0.1);
    [4, 5].forEach((i) => SS.tl.fromTo(team.rows[i], { y: G.rowY(i) }, { y: G.rowY(i, I1), duration: 0.42, ease: SS.EZ.inOut }, S.alert3 - 0.1));
    const sub = SS.subCard(box, 'M', 'Nouvelle demande · Vendeur · Longueuil', { alt: ['Relance · Vendeur · Longueuil'] });
    const sY1 = G.subY(3, I1);
    const subClip = SS.clipR(0, 800, 0, 0, 20);
    SS.place(sub.el, SUBX, sY1 + 24, { autoAlpha: 0, clipPath: subClip });
    SS.tl.set(sub.el, { autoAlpha: 1 }, S.alert3);
    SS.tl.fromTo(sub.el, { y: sY1 + 24 }, { y: sY1, duration: 0.42, ease: SS.EZ.dock }, S.alert3);
    SS.tl.fromTo(sub.el, { clipPath: subClip }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.out }, S.alert3);
    // 14 h 13 → 14 h 22: nine ticks, accelerating, each finished before the next
    const n = 9, span = S.relance - S.ticks - 0.05;
    const starts = Array.from({ length: n }, (_, k) => S.ticks + span * Math.pow(k / n, 0.62));
    starts.forEach((t0, k) => {
      const nxt = k < n - 1 ? starts[k + 1] : S.relance;
      C.go(t0, Math.min(0.2, (nxt - t0) * 0.88), null, 2 + k, 854 + k, SS.EZ.out);
    });
    SS.cue(S.ticks, 'm-ticks', { n, starts });
    labSwap(sub.labels, 0, 1, S.relance);
    SS.tl.fromTo(sub.bar, { backgroundColor: M.turq }, { backgroundColor: M.teal, duration: 0.3, ease: 'power1.inOut' }, S.relance);
    [1, 2, 3, 4, 5].forEach((i) => SS.tl.fromTo(team.rows[i], { y: G.rowY(i, I1) }, { y: G.rowY(i, I2), duration: 0.4, ease: SS.EZ.inOut }, S.shift));
    SS.tl.fromTo(sub.el, { y: sY1 }, { y: G.subY(3, I2), duration: 0.4, ease: SS.EZ.inOut }, S.shift);
    SS.tl.fromTo(halo, { y: y3 }, { y: G.rowY(3, I2), duration: 0.4, ease: SS.EZ.inOut }, S.shift);
    SS.tl.fromTo(team.card, { height: G.h(I1) }, { height: G.h(I2), duration: 0.4, ease: SS.EZ.inOut }, S.shift);
    const svg = SS.svg('svg', { class: 'lines', width: 1, height: 1 }, box);
    const yA = G.subY(3, I2), yL = G.rowY(0);
    const route = SS.svg('path', { d: `M160,${yA} L120,${yA} Q66,${yA} 66,${yA - 54} L66,${yL + 54} Q66,${yL} 120,${yL} L128,${yL}`,
      fill: 'none', stroke: M.turq, 'stroke-width': 5, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, svg);
    SS.tl.fromTo(route, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: S.leader - S.route, ease: SS.EZ.inOut }, S.route);
    SS.tl.fromTo(route, { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -1 }, duration: 0.4, ease: SS.EZ.in }, S.leader + 0.35);
    const haloL = SS.el('div', 'a3', box);
    Object.assign(haloL.style, { width: '884px', height: G.rowH + 10 + 'px', borderRadius: '24px', boxShadow: `0 0 0 4px ${M.turq}` });
    SS.place(haloL, 540, yL, { autoAlpha: 0, scale: 1.03 });
    SS.tl.fromTo(haloL, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.36, ease: SS.EZ.out }, S.leader);
    SS.tl.fromTo(team.rows[0], { opacity: 0.3 }, { opacity: 1, duration: 0.3, ease: 'power1.out' }, S.leader);
    const subL = SS.subCard(box, 'M', 'Relance · Vendeur · Longueuil');
    subL.bar.style.background = M.teal;
    const sL = G.subY(0, I2);
    SS.place(subL.el, SUBX, sL + 24, { autoAlpha: 0, clipPath: subClip });
    SS.tl.set(subL.el, { autoAlpha: 1 }, S.leader + 0.05);
    SS.tl.fromTo(subL.el, { y: sL + 24 }, { y: sL, duration: 0.42, ease: SS.EZ.dock }, S.leader + 0.05);
    SS.tl.fromTo(subL.el, { clipPath: subClip }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.out }, S.leader + 0.05);
    SS.cue(S.leader, 'sfx-leader');

    // ---- 5 · 90 days
    const box2 = SS.el('div', 'a3', w);
    gsap.set(box2, { x: OX2, y: 0 });
    const SV = { top: 740, h: 440 };
    const card = SS.el('div', 'sy-card', box2);
    Object.assign(card.style, { width: '900px', height: SV.h + 'px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    gsap.set(card, { x: 90, y: SV.top });
    const sv = SS.subCard(box2, 'M', 'Suivi · Vendeur · Longueuil');
    sv.bar.style.background = M.teal;
    SS.place(sv.el, 540, SV.top + 80);
    const rb = SS.el('div', '', card);
    Object.assign(rb.style, { position: 'absolute', left: '0px', top: '0px', width: '900px', height: SV.h + 'px' });
    rb.innerHTML = `<div style="position:absolute;left:60px;top:220px;width:780px;height:10px;border-radius:5px;background:#E6EFED"></div>
      <div class="fill" style="position:absolute;left:60px;top:220px;width:780px;height:10px;border-radius:5px;background:${M.turq};transform-origin:0% 50%"></div>
      <div style="position:absolute;left:44px;top:206px;width:38px;height:38px;border-radius:50%;background:${M.teal};box-shadow:0 0 0 8px ${M.band}"></div>
      <div class="n1" style="position:absolute;left:818px;top:206px;width:38px;height:38px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 5px ${M.teal}"></div>
      <div style="position:absolute;left:44px;top:280px;font-size:34px;font-weight:620;color:${M.soft};white-space:nowrap">Aujourd'hui</div>
      <div class="lab90" style="position:absolute;right:44px;top:270px;font-size:44px;font-weight:800;letter-spacing:-.02em;color:${M.teal};white-space:nowrap">90 jours</div>`;
    const fill = rb.querySelector('.fill'), n1 = rb.querySelector('.n1'), lab90 = rb.querySelector('.lab90');
    gsap.set(fill, { scaleX: 0 }); gsap.set(n1, { scale: 0 }); gsap.set(lab90, { autoAlpha: 0, y: 14 });
    SS.tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: SS.EZ.inOut }, S.ribbon);
    SS.tl.fromTo(n1, { scale: 0 }, { scale: 1, duration: 0.4, ease: SS.EZ.pop }, S.ribbon + 0.8);
    SS.tl.fromTo(lab90, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: SS.EZ.out }, S.ribbon + 0.85);
    SS.tl.fromTo(C.col, { yPercent: 0 }, { yPercent: -50, duration: 0.45, ease: SS.EZ.inOut }, S.dateMode);
    C.date.to(S.dateRoll, 1, 0.6, SS.EZ.inOut);
    SS.tl.fromTo(C.P, { min: 862 }, { min: 862 + 720 * 3, duration: 0.9, ease: SS.EZ.inOut }, S.ribbon);
    SS.cue(S.ribbon, 'm-ribbon');

    // ---- shakes and the camera (jumps happen while the sheet covers the frame)
    const CAMS = { 2: { x: 540, y: PH.top + 240 }, 3: { x: 540 + OX, y: 960 }, 4: { x: 540 + OX, y: 960 }, 5: { x: 540 + OX2, y: 960 } };
    const INS = [null, null, S.in2, S.in3, S.in4, S.in5];
    cam.to(INS[2] + 0.38, 0.05, 'none', CAMS[2]);
    cam.to(S.texto + 0.3, 1.8, 'sine.inOut', { y: CAMS[2].y + 10, s: 1.02 });
    cam.to(INS[3] + 0.38, 0.05, 'none', Object.assign({ s: 1 }, CAMS[3]));
    cam.to(INS[5] + 0.38, 0.05, 'none', CAMS[5]);

    // ================================================================ the sheet: product card view (screen space)
    const sheet = SS.el('div', 'layer', stage);
    sheet.style.background = `linear-gradient(180deg, ${M.bg} 0%, ${M.bg} 38%, ${M.bg2} 100%)`;
    const sLogo = SS.logo(sheet, 110);
    SS.place(sLogo.el, 540, SHEET.logoY);
    sLogo.mark(1);
    const mkNouveau = (parent) => {
      const el = SS.el('div', 'a3', parent);
      Object.assign(el.style, { height: '76px', padding: '0 34px', borderRadius: '38px', background: M.band, color: M.teal, fontSize: '40px', fontWeight: 760, letterSpacing: '-.015em', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' });
      el.textContent = 'Nouveau';
      return el;
    };
    const sNou = mkNouveau(sheet);
    SS.place(sNou, 540, SHEET.nouveauY);
    const pc = SS.productCard(sheet);
    gsap.set(pc.el, { x: 90, y: SHEET.cardTop });
    pc.rows.forEach((r) => { gsap.set(r.tx, { autoAlpha: 0, y: 24 }); gsap.set(r.sk, { autoAlpha: 1 }); });
    gsap.set(sheet, { y: 1920 });
    const SB = { b: 0 };
    let sy = 1920; // chained sheet moves
    const sheetTo = (at, y, dur, ease) => {
      SS.tl.fromTo(sheet, { y: sy }, { y, duration: dur, ease }, at);
      SS.tl.fromTo(SB, { b: 0 }, { b: 6, duration: dur / 2, ease: 'power2.in' }, at);
      SS.tl.fromTo(SB, { b: 6 }, { b: 0, duration: dur / 2, ease: 'power2.out' }, at + dur / 2);
      sy = y;
    };
    const dock = (i, at) => {
      SS.tl.fromTo(pc.rows[i].tx, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.36, ease: SS.EZ.dock }, at);
      SS.tl.fromTo(pc.rows[i].sk, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.16, ease: 'power1.out' }, at);
    };
    const check = (i, at) => SS.tl.fromTo(pc.rows[i].k, { k: 0 }, { k: 1, duration: 0.5, ease: 'none' }, at);
    // reveal → card view
    sheetTo(S.toCard, 0, 0.35, SS.EZ.inOut);
    dock(0, S.dock1);
    // per component: out (uncover the demo), then in (card view: check, dock the next line)
    const OUTS = [S.out1, S.out2, S.out3, S.out4, S.out5];
    const INS2 = [S.in2, S.in3, S.in4, S.in5, S.in6];
    OUTS.forEach((o, i) => {
      sheetTo(o, -1920, 0.34, SS.EZ.in);
      SS.tl.set(wrap, { visibility: 'visible' }, o);
      // back to the card: the sheet rises from below
      const inn = INS2[i];
      snap(sheet, { y: -1920 }, { y: 1920 }, inn - 0.01); sy = 1920;
      sheetTo(inn, 0, 0.35, SS.EZ.inOut);
      SS.tl.set(wrap, { visibility: 'hidden' }, inn + 0.36);
      check(i, inn + 0.22);
      if (i < 4) dock(i + 1, inn + 0.32);
    });
    SS.tl.set(wrap, { visibility: 'hidden' }, S.toCard + 0.36);
    SS.cue(S.full, 'sfx-stack');
    // exit to the proof: the full card goes down
    sheetTo(S.proof, 1920, 0.36, SS.EZ.in);

    // ---- the clock in the stack: hidden in card views, back at y 640 for each demo
    const showClock = (at) => SS.tl.fromTo(C.pill, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: SS.EZ.out }, at);
    const hideClock = (at) => SS.tl.fromTo(C.pill, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.94, duration: 0.15, ease: SS.EZ.in }, at);
    OUTS.forEach((o, i) => { showClock(o + 0.05); hideClock(INS2[i]); });

    // ================================================================ reveal (screen space, above the sheet)
    const rv = SS.el('div', 'layer', stage);
    const rvIn = SS.el('div', 'a3', rv);
    Object.assign(rvIn.style, { left: '0px', top: '0px', width: '1080px', height: '1920px', transformOrigin: '540px 760px' });
    const logo = SS.logo(rvIn, 110);
    SS.place(logo.el, 540, SHEET.logoY);
    gsap.set(logo.letters, { y: 150 });
    SS.tl.fromTo(P2, { mark: 0 }, { mark: 1, duration: 0.66, ease: 'none' }, S.logo);
    SS.tl.fromTo(logo.letters, { y: 150 }, { y: 0, duration: 0.6, stagger: 0.03, ease: SS.EZ.out }, S.logo + 0.2);
    const nou = mkNouveau(rvIn);
    SS.place(nou, 540, 520, { autoAlpha: 0 });
    // the clock tightens into the « Nouveau » label
    const nw = nou.getBoundingClientRect().width;
    const k = 76 / C.h, wv = nw / k;
    const clipN = SS.clipR(0, (900 - wv) / 2, 0, (900 - wv) / 2, C.h / 2);
    SS.tl.fromTo(C.pill, { y: 680, scale: 1, clipPath: C.clipC, backgroundColor: '#ffffff' }, { y: 520, scale: k, clipPath: clipN, backgroundColor: M.band, duration: 0.35, ease: SS.EZ.inOut }, S.nouveau);
    SS.tl.fromTo(C.group, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: SS.EZ.in }, S.nouveau);
    SS.tl.fromTo(C.pill, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.001, ease: 'none' }, S.nouveau + 0.36);
    SS.tl.fromTo(nou, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, ease: 'none' }, S.nouveau + 0.36);
    // the clock gets its stack geometry back while hidden
    snap(C.pill, { y: 520, scale: k, clipPath: clipN, backgroundColor: M.band }, { y: CLOCKY, scale: 1, clipPath: C.clipC, backgroundColor: '#ffffff' }, S.out1 - 0.1);
    snap(C.group, { autoAlpha: 0 }, { autoAlpha: 1 }, S.out1 - 0.1);
    const name = SS.head(rvIn, 'Système\nVendeurs\n5 *minutes.*', { size: 150, lh: 1.02 });
    SS.place(name.el, 540, 840);
    SS.hideWords(name);
    [S.w1, S.w2, S.w3, S.w4].forEach((t0, i) => SS.wordsIn(name, t0, { from: i, to: i + 1, dur: 0.7 }));
    [S.w1, S.w2, S.w3, S.w4].forEach((t0, i) => SS.cue(t0, 'm-sig', { i }));
    const pour = SS.text(rvIn, 'Pour les équipes de courtiers du Québec.', { size: 48, weight: 620, color: M.soft, tracking: -0.02, maxW: 960 });
    SS.place(pour.el, 540, 1180);
    SS.say(pour, S.pour, S.toCard, { st: 0.035 });
    SS.tl.fromTo(P2, { push: 1 }, { push: 1.02, duration: S.toCard - 7.9, ease: 'sine.inOut' }, 7.9);
    // → card view: the name shrinks into the card header; the label moves to its card-view place
    const ky = SHEET.cardTop + SS.PCARD.headH / 2, kx = 568;
    SS.tl.fromTo(name.el, { x: 540, y: 840, scale: 1 }, { x: kx, y: ky, scale: 0.3, duration: 0.38, ease: SS.EZ.inOut }, S.toCard);
    SS.tl.fromTo(name.el, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12, ease: 'power1.in' }, S.toCard + 0.26);
    SS.tl.fromTo(nou, { y: 520 }, { y: SHEET.nouveauY, duration: 0.35, ease: SS.EZ.inOut }, S.toCard);
    SS.tl.fromTo(P2, { push: 1.02 }, { push: 1, duration: 0.35, ease: SS.EZ.inOut }, S.toCard);

    // ================================================================ demo headlines (screen space, mint scrim)
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 600, '240,255,252');
    gsap.set(scrim, { x: 0, y: 0 });
    const titles = [
      ['Campagne\nGoogle *Vendeurs.*', 100],
      ['Réponse\n*60_secondes.*', 112],
      ['Le bon courtier\n*alerté.*', 112],
      ['Relance après\n*10_minutes.*', 108],
      ['Pas prêt à vendre?\n*Suivi* *90_jours.*', 100],
    ];
    titles.forEach(([src, size], i) => {
      const st = SS.stepLabel(layer, i + 1);
      SS.place(st, 540, 172, { autoAlpha: 0, y: 190 });
      SS.tl.fromTo(st, { autoAlpha: 0, y: 190 }, { autoAlpha: 1, y: 172, duration: 0.35, ease: SS.EZ.out }, OUTS[i] + 0.05);
      SS.tl.fromTo(st, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: SS.EZ.in }, INS2[i]);
      const h = SS.head(layer, src, { size });
      SS.place(h.el, 540, i === 0 ? 318 : 345);
      SS.say(h, OUTS[i] + 0.06, INS2[i] - 0.02);
    });
    const sub1 = SS.text(layer, 'Ajustée chaque semaine.\nUne page aux couleurs de votre équipe.', { size: 40, weight: 620, color: M.soft, tracking: -0.015, lh: 1.25, maxW: 960 });
    SS.place(sub1.el, 540, 510);
    SS.say(sub1, S.out1 + 0.3, S.in2 - 0.02, { st: 0.02 });
    const mention = SS.text(layer, 'Exemple. Noms et numéros fictifs.', { size: 32, weight: 560, color: M.soft, tracking: -0.01 });
    SS.place(mention.el, 540, 1610);
    SS.say(mention, S.texto + 0.4, S.in3 - 0.02, { st: 0.02 });

    stage.appendChild(rv); // the reveal sits above the sheet for the hand-over
    R = { wrap, w, cam, layer, shakeBox, sheet, SB, rv, rvIn, logo };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, R.cam.p.blur || 0);
    SS.blur(R.sheet, R.SB.b);
    const k = P2.shake;
    const dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.shakeBox.style.transform = `translate(${dx.toFixed(2)}px,0px)`;
    R.logo.mark(P2.mark);
    R.rvIn.style.transform = `scale(${P2.push.toFixed(4)})`;
  }

  const scene = { name: 'solution', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => {
    build(stage);
    scene.ranges = [[R.wrap, S.out1 - 0.05, S.in6 + 0.4], [R.sheet, S.toCard - 0.02, S.proof + 0.4], [R.rv, S.bloom, S.toCard + 0.37], [R.layer, S.out1, S.in6 + 0.2]];
  };
  SS.scenes.push(scene);
})();
