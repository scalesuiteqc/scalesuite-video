/* « Système Vendeurs 5 minutes » · the site world (10.05–25.0 s): the clock advances minute by minute and
   each minute triggers one action.
   4 · Bascule (10.05–12.1): the mint disc has bloomed from the clock. « Reprenons. » / « Avec le Système
       Vendeurs 5 minutes. »
   5 · 14 h 12 (12.1–13.8): the same team page, « Envoyer », the page squeezes into the token.
   6 · 14 h 13 (13.8–17.6), the hero: the clock ticks, a thread runs to the token, the camera whips down to
       the seller's phone (lock screen « samedi 7 novembre », 14:13); the token unfolds into the text
       message from 514 555 0142, signed Julie (12 % overshoot, damped haptic).
   7 · 14 h 13 (17.6–20.2): lateral whip to « Votre équipe »; a thread from the clock reaches Courtier 03,
       who gets « Nouvelle demande · Vendeur · Longueuil ». The others (Leader included) dim.
   8 · 14 h 22 (20.2–22.8): nine minute ticks; no call back: Courtier 03's alert becomes « Relance · … »,
       then ONE route goes up to the Leader row, which gets the same alert. Nobody else lights up.
   9 · 90 days (22.8–25.0): the alert leaves the list and becomes the header of « Suivi »; a ribbon draws
       from « Aujourd'hui » to « 90 jours »; the clock switches to its date line (sam. 7 nov. → ven. 5 févr.). */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M, T = SS.TEAM;
  const PG = { top: 680 };
  PG.y = PG.top + SS.PAGE.h / 2;
  const PH = { top: 1900, w: 860, h: 1700 };
  const CAMPH = PH.top + 260; // phone top at y 700 on screen
  const NOTE = { w: 780, h: 400 };
  NOTE.y = PH.top + 560; // on screen ≈ 1220
  const OX = 1300; // the team card sits to the right: « au même moment », another place
  const CAMT = { x: 540 + OX, y: 960 };
  const SUBX = 560;
  const P2 = { shake: 0 };

  const labSwap = (labels, i, j, at, dur = 0.42) => {
    SS.tl.fromTo(labels[i], { yPercent: 0 }, { yPercent: -110, duration: dur * 0.6, ease: SS.EZ.in }, at);
    SS.tl.fromTo(labels[j], { yPercent: 110 }, { yPercent: 0, duration: dur, ease: SS.EZ.out }, at + dur * 0.25);
  };

  let R;
  function build(stage) {
    const C = SS.CLK;
    // the clock takes the site's colours on the bloom
    SS.tl.fromTo(C.pill, { backgroundColor: SS.P.line, boxShadow: '0 0 0 0px rgba(21,21,21,0), 0 0px 0px rgba(18,74,66,0)' },
      { backgroundColor: '#ffffff', boxShadow: '0 0 0 2px rgba(196,214,211,1), 0 14px 30px -16px rgba(18,74,66,.28)', duration: 0.45, ease: 'power1.inOut' }, S.bloom + 0.1);
    SS.tl.fromTo(C.pill, { color: SS.P.ink }, { color: M.ink, duration: 0.45, ease: 'power1.inOut' }, S.bloom + 0.1);
    SS.tl.fromTo(C.hS, { attr: { stroke: SS.P.slate } }, { attr: { stroke: M.turq }, duration: 0.45, ease: 'power1.inOut' }, S.bloom + 0.1);
    SS.cue(S.bloom, 'm-bloom');

    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera({ x: 540, y: 960, s: 1, r: 0, blur: 0 });
    cam.set({ x: 540, y: 960, s: 1, r: 0 });

    // ================================================================ 5 · 14 h 12: the page, « Envoyer », the token
    const page = SS.teamPage(w, 'M');
    SS.place(page.el, 540, PG.y + 900, { autoAlpha: 1 });
    SS.tl.fromTo(page.el, { y: PG.y + 900 }, { y: PG.y, duration: 0.6, ease: SS.EZ.out }, S.page1);
    const rip = SS.ripple(w, { fill: 'rgba(255,255,255,.3)', ring: '#fff' });
    SS.tap(rip, 540, PG.top + 656, S.send1);
    SS.tl.fromTo(page.send, { scale: 1 }, { scale: 0.97, duration: 0.08, ease: 'power2.out' }, S.send1);
    SS.tl.fromTo(page.send, { scale: 0.97 }, { scale: 1, duration: 0.2, ease: 'power2.out' }, S.send1 + 0.08);
    const tokClip = SS.clipR((SS.PAGE.h - SS.TOKEN.h) / 2, (SS.PAGE.w - SS.TOKEN.w) / 2, (SS.PAGE.h - SS.TOKEN.h) / 2, (SS.PAGE.w - SS.TOKEN.w) / 2, 50);
    gsap.set(page.el, { clipPath: SS.OPEN });
    SS.tl.fromTo(page.ct, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12, ease: SS.EZ.in }, S.squeeze1);
    SS.tl.fromTo(page.el, { clipPath: SS.OPEN }, { clipPath: tokClip, duration: 0.22, ease: SS.EZ.inOut }, S.squeeze1);
    SS.tl.fromTo(page.el, { backgroundColor: '#ffffff' }, { backgroundColor: '#151515', duration: 0.18, ease: 'power1.inOut' }, S.squeeze1 + 0.04);
    SS.tl.set(page.el, { autoAlpha: 0 }, S.token1);
    SS.cue(S.send1, 'sfx-send');

    // ================================================================ 6 · 14 h 13: the seller's phone
    const shakeBox = SS.el('div', 'a3', w);
    const phone = SS.el('div', 'a3', shakeBox);
    Object.assign(phone.style, { width: PH.w + 'px', height: PH.h + 'px', borderRadius: '116px', background: '#FBFDFD',
      boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 50px 90px -40px rgba(18,74,66,.42), 0 0 0 3px #1F2423, inset 0 0 0 2px #fff' });
    phone.innerHTML = `<div style="position:absolute;inset:16px;border-radius:100px;background:linear-gradient(175deg,#F7FFFD 0%,#E6F7F3 70%,#D8F1EC 100%);overflow:hidden">
        <div style="position:absolute;left:50%;top:26px;width:200px;height:54px;margin-left:-100px;border-radius:27px;background:#151515"></div>
        <div style="position:absolute;left:0;right:0;top:118px;text-align:center;font-size:38px;font-weight:600;color:${M.soft}">samedi 7 novembre</div>
        <div style="position:absolute;left:0;right:0;top:160px;text-align:center;font-size:150px;font-weight:300;letter-spacing:-.04em;color:#232827;line-height:1.1;font-feature-settings:'tnum' 1">14:13</div></div>`;
    SS.place(phone, 540, PH.top + PH.h / 2, { autoAlpha: 0 });
    SS.tl.set(phone, { autoAlpha: 1 }, S.whip);
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
    const noteFromTok = SS.clipR((NOTE.h - SS.TOKEN.h) / 2, (NOTE.w - SS.TOKEN.w) / 2, (NOTE.h - SS.TOKEN.h) / 2, (NOTE.w - SS.TOKEN.w) / 2, 50);
    SS.place(note, 540, NOTE.y, { autoAlpha: 0, clipPath: noteFromTok, backgroundColor: '#151515' });
    gsap.set(nc, { autoAlpha: 0 });
    // the token (above everything in this world), born from the page, then travels down the thread
    const tok = SS.token(w);
    SS.place(tok, 540, PG.y, { autoAlpha: 0 });
    const tokTx = [...tok.children];
    gsap.set(tokTx, { autoAlpha: 0 });
    SS.tl.set(tok, { autoAlpha: 1 }, S.token1);
    SS.tl.fromTo(tokTx, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: 'power1.out' }, S.token1);
    // the minute ticks, a thread runs from the clock to the token
    C.go(S.tick13, 0.32, null, 1, 853, SS.EZ.out);
    SS.cue(S.tick13, 'm-tick');
    C.fil(S.tick13 + 0.02, 0.3, S.travel + 0.25, 0.3, () => SS.toScreen(cam.p, gsap.getProperty(tok, 'x'), gsap.getProperty(tok, 'y') - SS.TOKEN.h / 2));
    SS.tl.fromTo(tok, { y: PG.y }, { y: NOTE.y, duration: S.notif - S.travel, ease: SS.EZ.inOut }, S.travel);
    cam.to(S.whip, S.notif - S.whip + 0.05, SS.EZ.inOut, { y: CAMPH });
    cam.fx(S.whip + 0.08, 0.16, 'power2.in', { blur: 0 }, { blur: 6 });
    cam.fx(S.whip + 0.24, 0.2, 'power2.out', { blur: 6 }, { blur: 0 });
    // the token unfolds into the text message (12 % overshoot), damped haptic
    SS.tl.set(tok, { autoAlpha: 0 }, S.notif);
    SS.tl.set(note, { autoAlpha: 1 }, S.notif);
    SS.tl.fromTo(note, { clipPath: noteFromTok }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.pop12 }, S.notif);
    SS.tl.fromTo(note, { backgroundColor: '#151515' }, { backgroundColor: '#ffffff', duration: 0.22, ease: 'power1.inOut' }, S.notif + 0.02);
    SS.tl.fromTo(nc, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: SS.EZ.out }, S.notif + 0.16);
    SS.tl.fromTo(note, { scale: 0.96 }, { scale: 1, duration: 0.55, ease: SS.EZ.pop12 }, S.notif);
    SS.tl.fromTo(P2, { shake: 0 }, { shake: 1, duration: 0.5, ease: 'none' }, S.notif + 0.1);
    SS.cue(S.notif, 'sfx-texto');
    cam.to(S.notif + 0.3, 2.6, 'sine.inOut', { y: CAMPH + 10, s: 1.03 });

    // ================================================================ 7 · same minute: Courtier 03 is alerted
    const box = SS.el('div', 'a3', w);
    gsap.set(box, { x: OX, y: 0 });
    const team = SS.teamCard(box, 'M');
    const chip = (txt, bg, fg, icon) => `<span class="sy-chip" style="background:${bg};color:${fg}">${icon || ''}${txt}</span>`;
    const house = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${M.ink}" stroke-width="2.3" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>`;
    team.rows[3].querySelector('.st').innerHTML = chip('En visite libre', M.band, M.ink, house);
    cam.to(S.toTeam, 0.55, SS.EZ.inOut, { x: CAMT.x, y: CAMT.y, s: 1 });
    cam.fx(S.toTeam + 0.1, 0.16, 'power2.in', { blur: 0 }, { blur: 7 });
    cam.fx(S.toTeam + 0.26, 0.2, 'power2.out', { blur: 7 }, { blur: 0 });
    const I1 = { C3: true }, I2 = { C3: true, L: true };
    const y3 = T.rowY(3);
    // halo on Courtier 03, the others dim
    const halo = SS.el('div', 'a3', box);
    Object.assign(halo.style, { width: '884px', height: T.rowH + 10 + 'px', borderRadius: '24px', boxShadow: `0 0 0 4px ${M.turq}` });
    SS.place(halo, 540, y3, { autoAlpha: 0, scale: 1.03 });
    SS.tl.fromTo(halo, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.36, ease: SS.EZ.out }, S.halo7);
    const others = [0, 1, 2, 4, 5].map((i) => team.rows[i]);
    SS.tl.fromTo(others, { opacity: 1 }, { opacity: 0.3, duration: 0.35, ease: 'power1.out' }, S.halo7 + 0.04);
    C.fil(S.fil7, 0.35, S.halo7 + 0.15, 0.3, () => SS.toScreen(cam.p, OX + 150, y3 - T.rowH / 2));
    SS.cue(S.fil7, 'm-fil');
    // the alert under Courtier 03
    SS.tl.fromTo(team.card, { height: T.h() }, { height: T.h(I1), duration: 0.42, ease: SS.EZ.inOut }, S.sub7 - 0.1);
    [4, 5].forEach((i) => SS.tl.fromTo(team.rows[i], { y: T.rowY(i) }, { y: T.rowY(i, I1), duration: 0.42, ease: SS.EZ.inOut }, S.sub7 - 0.1));
    const sub = SS.subCard(box, 'M', 'Nouvelle demande · Vendeur · Longueuil', { alt: ['Relance · Vendeur · Longueuil', 'Suivi · Vendeur · Longueuil'] });
    const sY1 = T.subY(3, I1);
    const subClip = SS.clipR(0, 800, 0, 0, 20);
    SS.place(sub.el, SUBX, sY1 + 24, { autoAlpha: 0, clipPath: subClip });
    SS.tl.set(sub.el, { autoAlpha: 1 }, S.sub7);
    SS.tl.fromTo(sub.el, { y: sY1 + 24 }, { y: sY1, duration: 0.42, ease: SS.EZ.dock }, S.sub7);
    SS.tl.fromTo(sub.el, { clipPath: subClip }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.out }, S.sub7);
    SS.cue(S.sub7, 'm-alert');

    // ================================================================ 8 · 14 h 22: relance → Courtier 03, then the Leader
    // nine minute ticks, accelerating (power law), each finished before the next starts
    const n = 9, span = S.relance - S.ticks - 0.05;
    const starts = Array.from({ length: n }, (_, k) => S.ticks + span * Math.pow(k / n, 0.62));
    starts.forEach((t0, k) => {
      const nxt = k < n - 1 ? starts[k + 1] : S.relance;
      C.go(t0, Math.min(0.22, (nxt - t0) * 0.88), null, 2 + k, 854 + k, SS.EZ.out);
    });
    SS.cue(S.ticks, 'm-ticks', { n, starts });
    labSwap(sub.labels, 0, 1, S.relance);
    SS.tl.fromTo(sub.bar, { backgroundColor: M.turq }, { backgroundColor: M.teal, duration: 0.3, ease: 'power1.inOut' }, S.relance);
    // make room under the Leader row
    const shift = (i) => SS.tl.fromTo(team.rows[i], { y: T.rowY(i, I1) }, { y: T.rowY(i, I2), duration: 0.42, ease: SS.EZ.inOut }, S.shift);
    [1, 2, 3, 4, 5].forEach(shift);
    SS.tl.fromTo(sub.el, { y: sY1 }, { y: T.subY(3, I2), duration: 0.42, ease: SS.EZ.inOut }, S.shift);
    SS.tl.fromTo(halo, { y: y3 }, { y: T.rowY(3, I2), duration: 0.42, ease: SS.EZ.inOut }, S.shift);
    SS.tl.fromTo(team.card, { height: T.h(I1) }, { height: T.h(I2), duration: 0.42, ease: SS.EZ.inOut }, S.shift);
    // ONE route: from Courtier 03's alert, up the left margin, into the Leader row
    const svg = SS.svg('svg', { class: 'lines', width: 1, height: 1 }, box);
    const yA = T.subY(3, I2), yL = T.rowY(0);
    const route = SS.svg('path', { d: `M160,${yA} L120,${yA} Q66,${yA} 66,${yA - 54} L66,${yL + 54} Q66,${yL} 120,${yL} L104,${yL}`.replace('L104', 'L118'),
      fill: 'none', stroke: M.turq, 'stroke-width': 5, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, svg);
    SS.tl.fromTo(route, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: S.leader - S.route, ease: SS.EZ.inOut }, S.route);
    SS.tl.fromTo(route, { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -1 }, duration: 0.4, ease: SS.EZ.in }, S.leader + 0.35);
    // the Leader row lights up and receives the same alert
    const haloL = SS.el('div', 'a3', box);
    Object.assign(haloL.style, { width: '884px', height: T.rowH + 10 + 'px', borderRadius: '24px', boxShadow: `0 0 0 4px ${M.turq}` });
    SS.place(haloL, 540, yL, { autoAlpha: 0, scale: 1.03 });
    SS.tl.fromTo(haloL, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.36, ease: SS.EZ.out }, S.leader);
    SS.tl.fromTo(team.rows[0], { opacity: 0.3 }, { opacity: 1, duration: 0.3, ease: 'power1.out' }, S.leader);
    const subL = SS.subCard(box, 'M', 'Relance · Vendeur · Longueuil');
    subL.bar.style.background = M.teal;
    const sL = T.subY(0, I2);
    SS.place(subL.el, SUBX, sL + 24, { autoAlpha: 0, clipPath: subClip });
    SS.tl.set(subL.el, { autoAlpha: 1 }, S.leader + 0.05);
    SS.tl.fromTo(subL.el, { y: sL + 24 }, { y: sL, duration: 0.42, ease: SS.EZ.dock }, S.leader + 0.05);
    SS.tl.fromTo(subL.el, { clipPath: subClip }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.out }, S.leader + 0.05);
    SS.cue(S.leader, 'sfx-leader');
    cam.to(S.halo7 + 0.4, S.suivi - S.halo7 - 0.4, 'sine.inOut', { s: 1.015 });

    // ================================================================ 9 · 90 days
    // the list leaves downward, Courtier 03's alert stays and becomes the « Suivi » header
    const listEls = [team.card, team.head, team.sep, ...team.rows, halo, haloL, subL.el];
    const listBox = SS.el('div', 'a3', box);
    listEls.forEach((e) => listBox.appendChild(e));
    box.appendChild(svg); box.appendChild(sub.el);
    gsap.set(listBox, { x: 0, y: 0 });
    SS.tl.fromTo(listBox, { y: 0 }, { y: 1300, duration: 0.5, ease: SS.EZ.in }, S.suivi);
    const SV = { top: 760, h: 440 };
    const card = SS.el('div', 'sy-card', box);
    Object.assign(card.style, { width: '900px', height: SV.h + 'px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    gsap.set(card, { x: 90, y: SV.top + 900, autoAlpha: 0 });
    SS.tl.set(card, { autoAlpha: 1 }, S.suivi + 0.2);
    SS.tl.fromTo(card, { y: SV.top + 900 }, { y: SV.top, duration: 0.6, ease: SS.EZ.out }, S.suivi + 0.2);
    const hdrY = SV.top + 80;
    box.appendChild(sub.el);
    SS.tl.fromTo(sub.el, { x: SUBX, y: T.subY(3, I2) }, { x: 540, y: hdrY, duration: 0.6, ease: SS.EZ.inOut }, S.suivi + 0.15);
    labSwap(sub.labels, 1, 2, S.suivi + 0.25);
    const rb = SS.el('div', 'a3', card);
    Object.assign(rb.style, { left: '0px', top: '0px', width: '900px', height: SV.h + 'px' });
    rb.innerHTML = `<div style="position:absolute;left:60px;top:220px;width:780px;height:10px;border-radius:5px;background:#E6EFED"></div>
      <div class="fill" style="position:absolute;left:60px;top:220px;width:780px;height:10px;border-radius:5px;background:${M.turq};transform-origin:0% 50%"></div>
      <div class="n0" style="position:absolute;left:44px;top:206px;width:38px;height:38px;border-radius:50%;background:${M.teal};box-shadow:0 0 0 8px ${M.band}"></div>
      <div class="n1" style="position:absolute;left:818px;top:206px;width:38px;height:38px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 5px ${M.teal}"></div>
      <div style="position:absolute;left:44px;top:280px;font-size:34px;font-weight:620;color:${M.soft};white-space:nowrap">Aujourd'hui</div>
      <div class="lab90" style="position:absolute;right:44px;top:270px;font-size:44px;font-weight:800;letter-spacing:-.02em;color:${M.teal};white-space:nowrap">90 jours</div>`;
    const fill = rb.querySelector('.fill'), n1 = rb.querySelector('.n1'), lab90 = rb.querySelector('.lab90');
    gsap.set(fill, { scaleX: 0 }); gsap.set(n1, { scale: 0 }); gsap.set(lab90, { autoAlpha: 0, y: 14 });
    SS.tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: SS.EZ.inOut }, S.ribbon);
    SS.tl.fromTo(n1, { scale: 0 }, { scale: 1, duration: 0.4, ease: SS.EZ.pop }, S.ribbon + 0.8);
    SS.tl.fromTo(lab90, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: SS.EZ.out }, S.ribbon + 0.85);
    // the clock switches to its date line and rolls 90 days forward
    SS.tl.fromTo(C.col, { yPercent: 0 }, { yPercent: -50, duration: 0.45, ease: SS.EZ.inOut }, S.dateMode);
    C.date.to(S.dateRoll, 1, 0.6, SS.EZ.inOut);
    SS.tl.fromTo(C.P, { min: 862 }, { min: 862 + 720 * 3, duration: 0.9, ease: SS.EZ.inOut }, S.ribbon);
    SS.cue(S.ribbon, 'm-ribbon');
    // exit to the proof: the card and the clock leave
    SS.tl.fromTo([card, sub.el], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: SS.EZ.in }, S.h9Out);
    SS.tl.fromTo(card, { y: SV.top }, { y: SV.top + 120, duration: 0.3, ease: SS.EZ.in }, S.h9Out);
    SS.tl.fromTo(C.pill, { autoAlpha: 1, y: C.y }, { autoAlpha: 0, y: C.y - 40, duration: 0.3, ease: SS.EZ.in }, S.h9Out);

    // ================================================================ headlines (screen space, mint scrim)
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 560, '240,255,252');
    gsap.set(scrim, { autoAlpha: 0 });
    SS.tl.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.inOut' }, S.whip);
    const repr = SS.head(layer, 'Reprenons.', { size: 124 });
    SS.place(repr.el, 540, 300);
    SS.say(repr, S.repr, S.reprOut, { st: 0.07 });
    const avec = SS.text(layer, 'Avec le Système Vendeurs 5 minutes.', { size: 52, weight: 650, color: M.soft, tracking: -0.02, maxW: 960 });
    SS.place(avec.el, 540, 440);
    SS.say(avec, S.avec, S.reprOut + 0.02, { st: 0.04 });
    const h5 = SS.head(layer, '*14_h_12.*\nLe formulaire part.', { size: 108 });
    SS.place(h5.el, 540, 320);
    SS.say(h5, S.h5, S.h5Out);
    const h6 = SS.head(layer, '*14_h_13.*\nLe vendeur\na sa réponse.', { size: 100 });
    SS.place(h6.el, 540, 330);
    SS.say(h6, S.h6, S.h6Out);
    const mention = SS.text(layer, 'Exemple. Noms et numéros fictifs.', { size: 32, weight: 560, color: M.soft, tracking: -0.01 });
    SS.place(mention.el, 540, 1610);
    SS.say(mention, S.mention, S.h6Out, { st: 0.02 });
    const h7 = SS.head(layer, 'Le bon courtier\nest *alerté.*');
    SS.place(h7.el, 540, 330);
    SS.say(h7, S.h7, S.h7Out);
    const h8 = SS.head(layer, "Pas de rappel?\nL'équipe est *relancée.*", { size: 104 });
    SS.place(h8.el, 540, 330);
    SS.say(h8, S.h8, S.h8Out);
    const h9 = SS.head(layer, 'Pas prêt à vendre?\n*Suivi* *pendant* *90_jours.*', { size: 100 });
    SS.place(h9.el, 540, 330);
    SS.say(h9, S.h9, S.h9Out);

    R = { wrap, w, cam, layer, shakeBox };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, R.cam.p.blur || 0);
    const k = P2.shake;
    const dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.shakeBox.style.transform = `translate(${dx.toFixed(2)}px,0px)`;
  }

  const scene = { name: 'solution', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.wrap, S.page1 - 0.1, S.h9Out + 0.4], [R.layer, S.repr - 0.1, S.h9Out + 0.4]]; };
  SS.scenes.push(scene);
})();
