/* « Système Vendeurs 5 minutes » V2 · the world (one camera): the destination and the story that leads to it.
   Stacked top to bottom: the team page (A0), the seller's phone (A), « Votre équipe » (B), the team's agenda (C).
   1 · (0–3.4)    camera on C: Tuesday 10 November, « Rencontre vendeur · Courtier 03 · Longueuil · 18 h 30 », « Confirmée »;
                  the other days are grey placeholders. Frame 0 of the master.
   3 · (6.6–8.4)  A0: the team page, « Envoyer », the page becomes the token.
   4 · (8.4–11.8) A: the token travels down with the camera and unfolds into Julie's text in the seller's message
                  thread; at 10.0 s the seller answers « Parfait, merci! Je suis disponible. »
   5 · (11.8–15.6) B: Julie (Courtier 03) is at an open house; the request reaches her (« Nouvelle demande »), the clock
                  runs to 14 h 19, the request becomes « Appel · Vendeur · 6 min », then « Rendez-vous · mar. 18 h 30 ».
   6 · (15.6–19.6) C: the appointment travels down with the camera and takes its place on Tuesday 18 h 30; the week
                  fills with seller meetings (decreasing gaps).
   7 · (19.6–22.4) C: the agenda contracts into the product card « Le Système Vendeurs 5 minutes », four lines checked
                  in one gesture (04-fin takes a screen copy over at 22.4).
   Motion: strong ease-out entrances, short exits, one camera push per scene, never two camera moves at once; no
   coloured halos (an elevation: offset shadow + 1.02 scale), no scale from below 0.9. */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M;
  const PG = { top: 720 };
  PG.y = PG.top + SS.PAGE.h / 2;
  const PH = { top: 2720, w: 860, h: 1700 };
  const G = SS.teamGeo(5200, 80);
  const AG = { top: 7700, w: 900, headH: 110, dayH: 150 };
  AG.h = AG.headH + 5 * AG.dayH + 0;
  const CAM = { a0: 960, a: PH.top + 240, b: G.top - 720 + 960, c: AG.top - 600 + 960 };
  const toW = (screenY) => CAM.c - 960 + screenY;
  SS.PCTOP = 640;
  const SUBX = 560;
  const P2 = { shake: 0, subBlur: 0 };
  const snap = (el, from, to, at) => SS.tl.fromTo(el, from, Object.assign({ duration: 0.001, ease: 'none' }, to), at);
  // label swap inside a sub-card: old out, then new in; a 2 px blur bridges the two states (emil-design-eng)
  const labSwap = (labels, i, j, at, dur = 0.4) => {
    SS.tl.fromTo(labels[i], { yPercent: 0, autoAlpha: 1 }, { yPercent: -50, autoAlpha: 0, duration: dur * 0.45, ease: SS.EZ.in }, at);
    SS.tl.fromTo(labels[j], { yPercent: 50, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: dur, ease: SS.EZ.out }, at + dur * 0.5);
    SS.tl.fromTo(P2, { subBlur: 0 }, { subBlur: 2, duration: dur * 0.45, ease: 'power1.out' }, at);
    SS.tl.fromTo(P2, { subBlur: 2 }, { subBlur: 0, duration: dur * 0.55, ease: SS.EZ.out }, at + dur * 0.45);
  };
  const person = () => SS.icon.person(M.teal, M.band);
  const chipHTML = (txt) => `<span class="sy-chip" style="background:${M.band};color:${M.teal};font-weight:740">${txt}</span>`;

  let R;
  function build(stage) {
    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    // frame 0 frames Tuesday's meeting close (× 1.1, the row at y 930); scene 6 pulls back to the whole week
    const S1 = { s: 1.1, rowScreen: 930 };
    S1.y = AG.top + AG.headH + AG.dayH + 92 + (S1.rowScreen - 960) / S1.s;
    const cam = SS.camera({ x: 540, y: S1.y, s: S1.s, r: 0, blur: 0 });
    cam.set({ x: 540, y: S1.y, s: S1.s, r: 0 });

    // ================================================================ C · the team's agenda (frame 0, then the week)
    const EV = [
      ['Lundi 9 novembre', '17 h 00', 'Courtier 01 · Brossard'],
      ['Mardi 10 novembre', '18 h 30', 'Courtier 03 · Longueuil'],
      ['Mercredi 11 novembre', '10 h 00', 'Courtier 05 · Boucherville'],
      ['Jeudi 12 novembre', '19 h 00', 'Courtier 02 · Laval'],
      ['Vendredi 13 novembre', '11 h 30', 'Courtier 04 · Chambly'],
    ];
    const ag = SS.el('div', 'a3', w); // agenda box (moves as one)
    gsap.set(ag, { x: 0, y: 0 });
    const card = SS.el('div', 'sy-card', ag);
    Object.assign(card.style, { width: AG.w + 'px', height: AG.h + 'px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    gsap.set(card, { x: 90, y: AG.top });
    const inner = SS.el('div', 'a3', ag);
    Object.assign(inner.style, { left: '0px', top: '0px' });
    const head = SS.el('div', '', inner);
    Object.assign(head.style, { position: 'absolute', left: '130px', top: AG.top + 'px', width: '820px', height: AG.headH + 'px' });
    head.innerHTML = `<div style="position:absolute;left:0;top:24px;display:flex;align-items:center;gap:16px;white-space:nowrap">
        <svg viewBox="0 0 24 24" style="width:38px;height:38px" fill="none" stroke="${M.teal}" stroke-width="2.2" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>
        <span style="font-size:40px;font-weight:780;letter-spacing:-.025em;color:${M.ink}">Agenda de l'équipe</span>
        <span style="font-size:32px;font-weight:560;color:${M.soft}">· semaine du 9 novembre</span></div>`;
    const div = SS.el('div', '', inner);
    Object.assign(div.style, { position: 'absolute', left: '112px', width: '856px', top: AG.top + AG.headH - 6 + 'px', height: '2px', background: '#E6EFED' });
    const rowY = (d) => AG.top + AG.headH + d * AG.dayH + 46 + 46; // centre of day d's row
    const days = EV.map(([day, time, who], d) => {
      const lab = SS.el('div', '', inner);
      Object.assign(lab.style, { position: 'absolute', left: '130px', top: AG.top + AG.headH + d * AG.dayH + 6 + 'px', fontSize: '32px', fontWeight: 700, color: M.soft, whiteSpace: 'nowrap' });
      lab.textContent = day;
      const sk = SS.el('div', 'sy-row', inner);
      Object.assign(sk.style, { width: '864px', height: '92px', padding: '0 26px', gap: '24px', borderRadius: '20px', background: '#F6FAF9' });
      sk.innerHTML = `<span style="display:block;width:110px;height:18px;border-radius:9px;background:#E3ECEA"></span><span style="display:block;width:${[300, 340, 260, 320, 280][d]}px;height:18px;border-radius:9px;background:#E9F1EF"></span>`;
      SS.place(sk, 540, rowY(d));
      const ev = SS.el('div', 'sy-row', inner);
      Object.assign(ev.style, { width: '864px', height: '92px', padding: '0 22px', gap: '20px', borderRadius: '20px', background: '#fff', boxShadow: SS.SHADOW.m });
      ev.innerHTML = `<span style="width:132px;flex:none;font-size:36px;font-weight:800;letter-spacing:-.02em;color:${M.teal};font-feature-settings:'tnum' 1">${time}</span>
        <span style="width:56px;height:56px;flex:none">${person()}</span>
        <span style="display:flex;flex-direction:column;gap:2px"><span style="font-size:38px;font-weight:760;letter-spacing:-.02em;color:${M.ink}">Rencontre vendeur</span>
        <span style="font-size:30px;font-weight:560;color:${M.soft}">${who}</span></span><span class="cf" style="margin-left:auto"></span>`;
      SS.place(ev, 540, rowY(d));
      return { lab, sk, ev };
    });
    const tue = days[1];
    const cf = tue.ev.querySelector('.cf');
    cf.innerHTML = chipHTML('Confirmée');
    // Frame 0: Tuesday's meeting lifted (an elevation, not a halo), the other days are still to come
    days.forEach((d, i) => { gsap.set(d.ev, { autoAlpha: i === 1 ? 1 : 0 }); gsap.set(d.sk, { autoAlpha: i === 1 ? 0 : 1 }); });
    const lift = SS.el('div', 'a3', inner);
    Object.assign(lift.style, { width: '880px', height: '104px', borderRadius: '24px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    SS.place(lift, 540, rowY(1));
    inner.insertBefore(lift, tue.ev);
    gsap.set(tue.ev, { scale: 1.02 });
    // the « Confirmée » chip is handed over to the screen (it becomes « Nouveau », 03-ecran)
    const cr = cf.getBoundingClientRect();
    SS.W2 = { chip: { x: 540 + (cr.left + cr.width / 2 - 540) * S1.s, y: 960 + (cr.top + cr.height / 2 - S1.y) * S1.s, w: cr.width * S1.s } };
    SS.tl.fromTo(cf, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.001, ease: 'none' }, S.s1Out);
    SS.tl.fromTo(ag, { y: 0, autoAlpha: 1 }, { y: 90, autoAlpha: 0, duration: 0.26, ease: SS.EZ.in }, S.s1Out + 0.02);
    // while the world is hidden (name reveal), the agenda is reset for the week: Tuesday is empty again
    snap(ag, { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 5.0);
    snap(tue.ev, { autoAlpha: 1, scale: 1.02 }, { autoAlpha: 0, scale: 1 }, 5.0);
    snap(tue.sk, { autoAlpha: 0 }, { autoAlpha: 1 }, 5.0);
    snap(lift, { autoAlpha: 1 }, { autoAlpha: 0 }, 5.0);

    // ================================================================ A0 · the team page
    const page = SS.teamPage(w, 'M');
    // a short rise with a fade (never from nothing, never a long slide): 160 px, 0.45 s
    SS.place(page.el, 540, PG.y + 160, { clipPath: SS.OPEN, autoAlpha: 0 });
    SS.tl.fromTo(page.el, { y: PG.y + 160, autoAlpha: 0 }, { y: PG.y, autoAlpha: 1, duration: 0.45, ease: SS.EZ.out }, S.page);
    const rip = SS.ripple(w, { fill: 'rgba(255,255,255,.3)', ring: '#fff' });
    SS.tap(rip, 540, PG.top + 656, S.send);
    SS.tl.fromTo(page.send, { scale: 1 }, { scale: 0.97, duration: 0.08, ease: 'power2.out' }, S.send);
    SS.tl.fromTo(page.send, { scale: 0.97 }, { scale: 1, duration: 0.16, ease: SS.EZ.out }, S.send + 0.08);
    const tokClip = SS.clipR((SS.PAGE.h - SS.TOKEN.h) / 2, (SS.PAGE.w - SS.TOKEN.w) / 2, (SS.PAGE.h - SS.TOKEN.h) / 2, (SS.PAGE.w - SS.TOKEN.w) / 2, 50);
    SS.tl.fromTo(page.ct, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12, ease: 'power1.out' }, S.send + 0.1);
    SS.tl.fromTo(page.el, { clipPath: SS.OPEN }, { clipPath: tokClip, duration: 0.22, ease: SS.EZ.inOut }, S.send + 0.1);
    SS.tl.fromTo(page.el, { backgroundColor: '#ffffff' }, { backgroundColor: '#151515', duration: 0.18, ease: 'power1.inOut' }, S.send + 0.14);
    SS.tl.fromTo(page.el, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.001, ease: 'none' }, S.token);
    const tok = SS.token(w);
    SS.place(tok, 540, PG.y, { autoAlpha: 0 });
    SS.tl.set(tok, { autoAlpha: 1 }, S.token);

    // ================================================================ A · the seller's phone: the message thread
    const shakeBox = SS.el('div', 'a3', w);
    const phone = SS.el('div', 'a3', shakeBox);
    Object.assign(phone.style, { width: PH.w + 'px', height: PH.h + 'px', borderRadius: '116px', background: '#FBFDFD',
      boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 50px 90px -40px rgba(18,74,66,.42), 0 0 0 3px #1F2423, inset 0 0 0 2px #fff' });
    phone.innerHTML = `<div style="position:absolute;inset:16px;border-radius:100px;background:#fff;overflow:hidden">
        <div style="position:absolute;left:50%;top:26px;width:200px;height:54px;margin-left:-100px;border-radius:27px;background:#151515"></div>
        <div style="position:absolute;left:70px;top:34px;font-size:32px;font-weight:700;color:${M.ink};font-feature-settings:'tnum' 1">14:13</div>
        <div style="position:absolute;left:0;right:0;top:110px;height:150px;border-bottom:2px solid #EEF3F2;display:flex;align-items:center;gap:22px;padding:0 50px">
          <svg viewBox="0 0 24 24" style="width:40px;height:40px;flex:none" fill="none" stroke="${M.soft}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
          <span style="width:84px;height:84px;flex:none">${SS.icon.person('#9AA7A4', '#EEF3F2')}</span>
          <span style="display:flex;flex-direction:column;gap:2px"><span style="font-size:42px;font-weight:800;letter-spacing:-.01em;color:${M.ink};font-feature-settings:'tnum' 1">514 555 0142</span>
          <span style="font-size:30px;font-weight:560;color:${M.soft}">Texto</span></span></div>
        <div style="position:absolute;left:0;right:0;top:300px;text-align:center;font-size:30px;font-weight:600;color:${M.soft}">Aujourd'hui · 14 h 13</div></div>`;
    SS.place(phone, 540, PH.top + PH.h / 2);
    const BUB = { x: 90 + 16 + 54, top: PH.top + 380, w: 640 };
    const inc = SS.el('div', 'a3', shakeBox);
    Object.assign(inc.style, { width: BUB.w + 'px', padding: '26px 32px', boxSizing: 'border-box', borderRadius: '36px 36px 36px 12px', background: '#E9F0EE',
      fontSize: '36px', fontWeight: 520, lineHeight: 1.3, letterSpacing: '-.01em', color: '#1E2423' });
    inc.innerHTML = "<span class='tx'>Bonjour, ici Julie de l'Équipe Gagnon. J'ai bien reçu votre demande. Je vous appelle dans quelques minutes.</span>";
    const incH = Math.ceil(inc.getBoundingClientRect().height);
    gsap.set(inc, { x: BUB.x, y: BUB.top, transformOrigin: '0% 100%' });
    const incTx = inc.querySelector('.tx');
    const out = SS.el('div', 'a3', shakeBox);
    Object.assign(out.style, { padding: '26px 32px', boxSizing: 'border-box', borderRadius: '36px 36px 12px 36px', background: M.teal,
      fontSize: '36px', fontWeight: 560, lineHeight: 1.3, letterSpacing: '-.01em', color: '#fff', whiteSpace: 'nowrap' });
    out.textContent = 'Parfait, merci! Je suis disponible.';
    const outW = Math.ceil(out.getBoundingClientRect().width);
    const outTop = BUB.top + incH + 34;
    gsap.set(out, { x: 990 - 16 - 54 - outW, y: outTop, transformOrigin: '100% 100%', autoAlpha: 0, scale: 0.94 });
    const incFromTok = SS.clipR((incH - SS.TOKEN.h) / 2, (BUB.w - SS.TOKEN.w) / 2, (incH - SS.TOKEN.h) / 2, (BUB.w - SS.TOKEN.w) / 2, 50);
    gsap.set(inc, { autoAlpha: 0, clipPath: incFromTok, backgroundColor: '#151515' });
    gsap.set(incTx, { autoAlpha: 0 });
    // the minute ticks, the token runs down the thread and unfolds into Julie's text
    SS.CLK.go(S.tick13, 0.3, 1, SS.EZ.out);
    SS.cue(S.tick13, 'm-tick');
    const incCY = BUB.top + incH / 2;
    SS.CLK.fil(S.tick13 + 0.02, 0.3, S.texto + 0.1, 0.3, () => SS.toScreen(cam.p, gsap.getProperty(tok, 'x'), gsap.getProperty(tok, 'y') - SS.TOKEN.h / 2));
    SS.tl.fromTo(tok, { x: 540, y: PG.y }, { x: BUB.x + BUB.w / 2, y: incCY, duration: S.texto - S.toPhone, ease: SS.EZ.inOut }, S.toPhone);
    SS.tl.set(tok, { autoAlpha: 0 }, S.texto);
    SS.tl.set(inc, { autoAlpha: 1 }, S.texto);
    SS.tl.fromTo(inc, { clipPath: incFromTok }, { clipPath: SS.OPEN, duration: 0.45, ease: SS.EZ.out }, S.texto);
    SS.tl.fromTo(inc, { backgroundColor: '#151515' }, { backgroundColor: '#E9F0EE', duration: 0.2, ease: 'power1.inOut' }, S.texto + 0.02);
    SS.tl.fromTo(incTx, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: SS.EZ.out }, S.texto + 0.15);
    SS.tl.fromTo(P2, { shake: 0 }, { shake: 1, duration: 0.5, ease: 'none' }, S.texto + 0.08);
    SS.cue(S.texto, 'sfx-texto');
    // the seller answers (origin-aware: the bubble grows from its tail)
    SS.tl.fromTo(out, { autoAlpha: 0, scale: 0.94, y: outTop + 14 }, { autoAlpha: 1, scale: 1, y: outTop, duration: 0.38, ease: SS.EZ.out }, S.reply);
    SS.cue(S.reply, 'm-reply');

    // ================================================================ B · the team: Julie is alerted, calls, books the meeting
    const team = SS.teamCard(w, 'M', G);
    const house = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${M.ink}" stroke-width="2.3" stroke-linejoin="round"><path d="M4 11l8-6.5 8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>`;
    team.rows[3].querySelector('.st').innerHTML = `<span class="sy-chip" style="background:${M.band};color:${M.ink}">${house}En visite libre</span>`;
    const I1 = { C3: true };
    const y3 = G.rowY(3);
    const liftB = SS.el('div', 'a3', w);
    Object.assign(liftB.style, { width: '884px', height: G.rowH + 10 + 'px', borderRadius: '24px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    SS.place(liftB, 540, y3, { autoAlpha: 0 });
    w.insertBefore(liftB, team.rows[3]);
    SS.tl.fromTo(liftB, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: SS.EZ.out }, S.alert - 0.12);
    SS.tl.fromTo(team.rows[3], { scale: 1 }, { scale: 1.02, duration: 0.3, ease: SS.EZ.out }, S.alert - 0.12);
    const others = [0, 1, 2, 4, 5].map((i) => team.rows[i]);
    SS.tl.fromTo(others, { opacity: 1 }, { opacity: 0.3, duration: 0.3, ease: 'power1.out' }, S.alert - 0.08);
    SS.CLK.fil(S.fil, 0.22, S.alert + 0.08, 0.25, () => SS.toScreen(cam.p, 150, y3 - G.rowH / 2));
    SS.tl.fromTo(team.card, { height: G.h() }, { height: G.h(I1), duration: 0.35, ease: SS.EZ.inOut }, S.alert - 0.1);
    [4, 5].forEach((i) => SS.tl.fromTo(team.rows[i], { y: G.rowY(i) }, { y: G.rowY(i, I1), duration: 0.35, ease: SS.EZ.inOut }, S.alert - 0.1));
    const phoneIc = `<svg viewBox="0 0 24 24" style="width:30px;height:30px;flex:none" fill="none" stroke="${M.teal}" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3.5l3 .5 1.2 3.6-2 1.4a11 11 0 0 0 6.3 6.3l1.4-2 3.6 1.2.5 3a2 2 0 0 1-2.2 1.8A16.5 16.5 0 0 1 4.7 5.7 2 2 0 0 1 6.5 3.5z"/></svg>`;
    const calIc = `<svg viewBox="0 0 24 24" style="width:30px;height:30px;flex:none" fill="none" stroke="${M.teal}" stroke-width="2.3" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>`;
    const sub = SS.subCard(w, 'M', 'Nouvelle demande · Vendeur · Longueuil', { alt: [`${phoneIc}<span style="margin-left:12px">Appel · Vendeur · 6 min</span>`, `${calIc}<span style="margin-left:12px">Rendez-vous · mar. 18 h 30</span>`] });
    sub.labels.slice(1).forEach((l) => gsap.set(l, { yPercent: 50, autoAlpha: 0 }));
    const sY = G.subY(3, I1);
    const subClip = SS.clipR(0, 800, 0, 0, 20);
    SS.place(sub.el, SUBX, sY + 20, { autoAlpha: 0, clipPath: subClip });
    SS.tl.set(sub.el, { autoAlpha: 1 }, S.alert);
    SS.tl.fromTo(sub.el, { y: sY + 20 }, { y: sY, duration: 0.38, ease: SS.EZ.out }, S.alert);
    SS.tl.fromTo(sub.el, { clipPath: subClip }, { clipPath: SS.OPEN, duration: 0.42, ease: SS.EZ.out }, S.alert);
    SS.cue(S.alert, 'm-alert');
    // 14 h 13 → 14 h 19: six ticks with decreasing gaps, each finished before the next
    const n = 6, span = S.appel - S.ticks - 0.05;
    const starts = Array.from({ length: n }, (_, k) => S.ticks + span * Math.pow(k / n, 0.62));
    starts.forEach((t0, k) => {
      const nxt = k < n - 1 ? starts[k + 1] : S.appel;
      SS.CLK.go(t0, Math.min(0.18, (nxt - t0) * 0.88), 2 + k, SS.EZ.out);
    });
    SS.cue(S.ticks, 'm-ticks', { n, starts });
    labSwap(sub.labels, 0, 1, S.appel);
    labSwap(sub.labels, 1, 2, S.rdv);
    SS.tl.fromTo(sub.bar, { backgroundColor: M.turq }, { backgroundColor: M.teal, duration: 0.25, ease: 'power1.inOut' }, S.rdv);
    SS.cue(S.rdv, 'm-rdv');

    // ================================================================ C again · the appointment takes its place, the week fills
    w.appendChild(sub.el);
    const tueY = rowY(1);
    SS.tl.fromTo(sub.el, { x: SUBX, y: sY }, { x: 540, y: tueY, duration: 0.4, ease: SS.EZ.inOut }, S.toWeek);
    SS.tl.fromTo(sub.el, { autoAlpha: 1, scaleX: 1 }, { autoAlpha: 0, scaleX: 1.08, duration: 0.22, ease: 'power1.out' }, S.dock);
    SS.tl.fromTo(tue.ev, { autoAlpha: 0, scale: 1 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: SS.EZ.out }, S.dock + 0.05);
    SS.tl.fromTo(tue.sk, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, ease: 'power1.out' }, S.dock + 0.05);
    SS.tl.fromTo(cf, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: SS.EZ.out }, S.dock + 0.35);
    // the rest of the week: Monday, Thursday, Wednesday, Friday, with decreasing gaps (choreograph: never uniform)
    [[0, 0], [3, 0.16], [2, 0.28], [4, 0.36]].forEach(([d, dt]) => {
      SS.tl.fromTo(days[d].ev, { autoAlpha: 0, y: rowY(d) + 18 }, { autoAlpha: 1, y: rowY(d), duration: 0.36, ease: SS.EZ.out }, S.week + dt);
      SS.tl.fromTo(days[d].sk, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.18, ease: 'power1.out' }, S.week + dt);
    });
    SS.cue(S.week, 'm-week');

    // ================================================================ 7 · the agenda contracts into the product card
    const pc = SS.productCard(w);
    pc.rows.forEach((r) => gsap.set(r.sk, { autoAlpha: 0 }));
    const pcTop = toW(SS.PCTOP);
    gsap.set(pc.el, { x: 90, y: pcTop, autoAlpha: 0 });
    // the agenda leaves (short exit) while the product card enters as one block, content already inside
    // (choreograph: one entrance per container; the two overlap by 0.2 s, no empty frame)
    SS.tl.fromTo(ag, { y: 0, autoAlpha: 1 }, { y: 60, autoAlpha: 0, duration: 0.22, ease: SS.EZ.in }, S.pile);
    SS.tl.fromTo(pc.el, { y: pcTop + 60, autoAlpha: 0 }, { y: pcTop, autoAlpha: 1, duration: 0.4, ease: SS.EZ.out }, S.pile + 0.06);
    pc.rows.forEach((r, i) => SS.tl.fromTo(r.k, { k: 0 }, { k: 1, duration: 0.3, ease: 'none' }, S.check0 + i * 0.18));
    SS.cue(S.check0, 'm-stack');

    // ================================================================ the camera: one push per scene, travels of 0.4 s
    cam.to(S.s1Out + 0.6, 0.01, 'none', { y: CAM.a0, s: 1 }); // while hidden by the name reveal
    cam.to(S.page + 0.2, S.toPhone - S.page - 0.25, 'sine.inOut', { s: 1.015 });
    cam.to(S.toPhone, 0.4, SS.EZ.inOut, { y: CAM.a, s: 1 });
    cam.fx(S.toPhone + 0.05, 0.15, 'power2.in', { blur: 0 }, { blur: 6 });
    cam.fx(S.toPhone + 0.2, 0.18, 'power2.out', { blur: 6 }, { blur: 0 });
    cam.to(S.texto + 0.1, S.toTeam - S.texto - 0.15, 'sine.inOut', { s: 1.02 });
    cam.to(S.toTeam, 0.4, SS.EZ.inOut, { y: CAM.b, s: 1 });
    cam.fx(S.toTeam + 0.05, 0.15, 'power2.in', { blur: 0 }, { blur: 6 });
    cam.fx(S.toTeam + 0.2, 0.18, 'power2.out', { blur: 6 }, { blur: 0 });
    cam.to(S.toTeam + 0.45, S.toWeek - S.toTeam - 0.5, 'sine.inOut', { s: 1.02 });
    cam.to(S.toWeek, 0.4, SS.EZ.inOut, { y: CAM.c, s: 1 });
    cam.fx(S.toWeek + 0.05, 0.15, 'power2.in', { blur: 0 }, { blur: 6 });
    cam.fx(S.toWeek + 0.2, 0.18, 'power2.out', { blur: 6 }, { blur: 0 });
    cam.to(S.toWeek + 0.45, S.pile - S.toWeek - 0.5, 'sine.inOut', { s: 1.01 });
    cam.to(S.pile, 0.3, SS.EZ.inOut, { s: 1 });

    R = { wrap, w, cam, shakeBox, sub };
  }

  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, R.cam.p.blur || 0);
    const k = P2.shake;
    const dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.shakeBox.style.transform = `translate(${dx.toFixed(2)}px,0px)`;
    SS.blur(R.sub.el.querySelector('.lb'), P2.subBlur);
  }

  const scene = { name: 'monde', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => {
    build(stage);
    scene.ranges = [[R.wrap, -1, S.s1Out + 0.32], [R.wrap, S.page - 0.05, S.proof + 0.01]];
  };
  SS.scenes.push(scene);
})();
