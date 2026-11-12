/* Scene 6 · Le système. ONE story, a Tuesday afternoon, the hours agree from one screen to the next:
     14 h 03  seller   search « vendre ma maison laval », sponsored result at the top
     14 h 04  seller   the team's page, form filled, sent
     14 h 04  broker   lock-screen banner, then the alert text with the menu of codes
     14 h 04  seller   lock-screen banner, then the confirmation text
     14 h 10  broker   he replies « 1 », the system confirms
     14 h 10  leader   list « Demandes »: the 14 h 04 request turns to « Joint »
   Text on the left (the words of the voice), one phone on the right, pale turquoise backdrop. Six stations
   side by side; the camera whips from one to the next ON the voice, then pushes through the list.
   Phones, Messages, lock screen, search result, team page and portal are faithful LAYOUTS: no logo, no brand.

   Content rules (brief v1 section 4, brief v2):
   - 60 seconds = the time for the request to REACH the broker. Nothing says « rappelé en 60 secondes ».
   - The alert leaves from the team's own number: no mention of ScaleSuite in any text message.
   - Real broker codes: 1 Joint, 2 Pas de réponse, 3 Plus tard, 4 Rencontre, 5 Hors cible.
   - The list shows a status and an hour only: no delay, no speed ranking.
   - No 10-minute follow-up, no 90-day nurture, no transferred calls, no call script.
   - Fictional data only (555 01xx numbers are reserved for fiction). The landing page says « vous ».
   Everything a seller, a broker or a leader reads is in COPY; every hour is in HOURS (checked by
   render/hours-qui-repond.mjs). */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s6', w, QR.cue('s6', w));
  const C = { google: cue('google'), page: cue('surLaPage'), chaque: cue('chaque'), texto: cue('parTexto'), sixty: cue('soixante'), vendeur: cue('leVendeur'),
    suite: cue('toutDeSuite'), jour: cue('leJour'), courtier: cue('tonCourtier'), sais: cue('tuSais'), demandes: cue('desDemandes'), jamais: cue('jamais') };

  // camera: station i is reached on M[i]
  const M = [0, C.chaque, C.vendeur, C.courtier, C.sais, C.demandes];
  const T = {
    whip: 0.3, whipDur: 0.42,        // a camera move starts 0,30 s before its word and lasts 0,42 s
    tap: C.page - 0.5, toPage: C.page - 0.3, f: [C.page + 0.03, C.page + 0.2, C.page + 0.42, C.page + 0.58], fCps: 125, press: C.chaque - 0.48, // the form is complete before it is sent
    alertBn: C.chaque + 0.12, alertOpen: C.texto - 0.12,
    confBn: C.vendeur + 0.12, confOpen: C.suite - 0.12,
    typeOne: C.courtier + 0.45, sendOne: C.courtier + 0.75, delivered: C.courtier + 0.95, ack: C.courtier + 1.2,
    joint: C.sais + 0.45,
    frame: C.demandes + 0.3, frameDur: 0.7, lock: C.jamais,
    exit: 0.26,
  };
  const HOURS = { search: '14 h 03', page: '14 h 04', alert: '14 h 04', confirm: '14 h 04', reply: '14 h 10', portal: '14 h 10' };
  QR.HOURS = HOURS;
  const COPY = {
    team: 'Équipe Belvédère', initials: 'ÉB', domain: 'equipebelvedere.ca', date: 'mardi 10 novembre',
    query: 'vendre ma maison laval',
    adTitle: 'Vendre ma maison à Laval | Équipe Belvédère', adDesc: 'Des courtiers de Laval qui connaissent votre secteur. Parlez de votre projet à un courtier de l’équipe.',
    adLinks: ['Nous joindre', 'Notre équipe'],
    pageKicker: 'NOUS JOINDRE', pageTitle: 'Vendre votre maison à Laval', pageSub: 'Parlez de votre projet à un courtier de l’Équipe Belvédère.', pageBtn: 'Envoyer ma demande',
    pageThanks: 'Merci Sophie, votre demande est envoyée.',
    // the seller has not saved the team's number: her phone shows it the way iOS writes an unknown sender
    // (the hyphen of the iOS number format is a justified exception to the no-hyphen rule)
    teamNumber: '+1 (450) 555-0199',
    fields: [['Nom complet *', 'Sophie Gagnon'], ['Courriel *', 'sophie.gagnon@exemple.ca'], ['Téléphone *', '450 555 0142'], ['Message (optionnel)', 'Bonjour, je pense vendre ma maison à Laval cette année.']],
    alertPreview: 'Nouvelle demande de vendeur. Sophie Gagnon, 450 555 0142',
    alert: 'Nouvelle demande de vendeur.<br>Sophie Gagnon<br>450 555 0142<br>sophie.gagnon@exemple.ca<br>« Bonjour, je pense vendre ma maison à Laval cette année. »<span class="sp"></span>Après l’appel, répondez :<br>1 Joint, 2 Pas de réponse, 3 Plus tard, 4 Rencontre, 5 Hors cible',
    confirm: 'Bonjour Sophie, votre demande est bien reçue. Un courtier de l’Équipe Belvédère communiquera avec vous.',
    reply: '1', ack: 'Merci Marc. Demande de Sophie Gagnon : Joint.',
    listTitle: 'Demandes', listSub: 'Les dernières demandes de vendeurs, avec le code du courtier.',
    rows: [['Sophie Gagnon', 'ok', 'Joint', 'Aujourd’hui, ' + HOURS.alert, 'Marc Lévesque'], ['Louis Bergeron', 'rdv', 'Rencontre', '9 nov., 10 h 22', 'Julie Tanguay'],
      ['Nadia Fortin', 'no', 'Pas de réponse', '6 nov., 16 h 48', 'Marc Lévesque'], ['Pierre Lavoie', 'later', 'Plus tard', '5 nov., 9 h 15', 'Julie Tanguay']],
  };
  // g: 0 = first words of the message, 1 and 2 = the key phrases, each ON its word in the voice
  const TEXT = [
    { lines: [[{ t: 'Google Ads amène' }], [{ t: 'les vendeurs' }], [{ t: 'sur la page de ton équipe.', chip: true, g: 1 }]], at: [C.google, C.page], chip: [C.page] },
    { lines: [[{ t: 'Chaque demande arrive' }], [{ t: 'au bon courtier,' }], [{ t: 'par texto, en moins de', chip: true, g: 1 }], [{ t: '60 secondes.', chip: true, g: 2 }]], at: [C.chaque, C.texto, C.sixty], chip: [C.texto, C.sixty] },
    { lines: [[{ t: 'Le vendeur reçoit' }], [{ t: 'une confirmation' }], [{ t: 'tout de suite.', chip: true, g: 1 }], [{ t: 'Le jour comme la nuit.', g: 2 }]], at: [C.vendeur, C.suite, C.jour], chip: [C.suite] },
    { lines: [[{ t: 'Ton courtier répond' }], [{ t: 'avec un chiffre.' }]], at: [C.courtier], chip: [] },
    { lines: [[{ t: 'Tu sais qui' }], [{ t: 'a été rappelé.' }]], at: [C.sais], chip: [C.sais], all: true },
    { lines: [[{ t: 'Des demandes qui' }], [{ t: 'appartiennent à ton équipe.' }], [{ t: 'Jamais partagées', chip: true, g: 1 }], [{ t: 'ni revendues.', chip: true, g: 1 }]], at: [C.demandes, C.jamais], chip: [C.jamais, C.jamais + 0.1] },
  ];
  TEXT[4].lines = [[{ t: 'Tu sais qui', chip: true }], [{ t: 'a été rappelé.', chip: true }]];
  TEXT[4].chip = [C.sais, C.sais + 0.1];
  const L = Q.pick(
    { step: 2500, tx: 200, ty: 540, size: 64, ps: 1.3, top: 150, px: 1420, list5: { x: 1400, y: 560, s: 1.9 } },
    { step: 1500, tx: 70, ty: 430, size: 54, ps: 1.42, top: 140, px: 510, list5: { x: 510, y: 690, s: 2.3 } },
  );

  const ICON = {
    sig: '<svg viewBox="0 0 19 13" fill="currentColor"><rect x="0" y="9" width="3" height="4" rx="1"/><rect x="5.2" y="6" width="3" height="7" rx="1"/><rect x="10.4" y="3" width="3" height="10" rx="1"/><rect x="15.6" y="0" width="3" height="13" rx="1"/></svg>',
    wifi: '<svg viewBox="0 0 18 13" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><path d="M1.5 4.6a11 11 0 0 1 15 0"/><path d="M4.4 7.6a6.8 6.8 0 0 1 9.2 0"/><circle cx="9" cy="11" r="1.3" fill="currentColor" stroke="none"/></svg>',
    bat: '<svg viewBox="0 0 28 13" fill="none"><rect x=".7" y=".7" width="23.6" height="11.6" rx="3.6" stroke="currentColor" stroke-opacity=".45" stroke-width="1.2"/><rect x="2.4" y="2.4" width="20.2" height="8.2" rx="2.2" fill="currentColor"/><rect x="25.6" y="4.2" width="1.8" height="4.6" rx=".9" fill="currentColor" fill-opacity=".5"/></svg>',
    back: '<svg viewBox="0 0 14 24" fill="none" stroke="#0A7AFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3 3 12l8 9"/></svg>',
    bubble: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 3.5c-5 0-9 3.3-9 7.4 0 2.4 1.4 4.5 3.5 5.9-.2 1.2-.8 2.4-1.7 3.3 1.9-.1 3.6-.8 4.9-1.9.7.1 1.5.2 2.3.2 5 0 9-3.3 9-7.5s-4-7.4-9-7.4z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3 10.5 13.5M21 3l-6.6 18-3.9-7.5L3 9.6z"/></svg>',
  };
  // who: 'nat' seller (natural titanium), 'blk' broker (black), '' leader (grey)
  function phone(parent, time, dark, who) {
    const el = Q.div(parent, 'ip' + (who ? ' ' + who : ''));
    el.innerHTML = `<div class="bz"></div><div class="scr"><div class="sb" style="color:${dark ? '#fff' : '#000'}"><span class="tm">${time}</span><span class="rt">${ICON.sig}${ICON.wifi}${ICON.bat}</span></div><div class="isl"></div></div><div class="gl"></div>`;
    const scr = el.querySelector('.scr'), sb = el.querySelector('.sb');
    return { el, sb, tm: el.querySelector('.tm'), view: (cls, html) => { const v = document.createElement('div'); v.className = 'view ' + cls; v.innerHTML = html; scr.insertBefore(v, sb); return v; } };
  }
  const PERSON = '<svg viewBox="0 0 30 30" fill="#fff"><circle cx="15" cy="11" r="5.6"/><path d="M4.5 27c1.2-5.6 5.4-8.6 10.5-8.6S24.3 21.4 25.5 27z"/></svg>';
  // unknown: the contact is a bare number with the generic grey avatar (seller's phone)
  const messages = (stamp, unknown) => `<div class="hd"><span class="bk">${ICON.back}</span><span class="av">${unknown ? PERSON : COPY.initials}</span><div class="nm">${unknown ? COPY.teamNumber : COPY.team} <span>›</span></div></div>
    <div class="th"><div class="thi"><div class="st"><b>Message texte</b><br>Aujourd’hui ${stamp}</div></div></div><div class="bar"><span class="pl">+</span><span class="fl"><span class="tx"></span><i>Message texte</i></span></div>`;
  const lock = (time, text) => `<div class="dt">${COPY.date}</div><div class="tm2">${time}</div><div class="bn"><span class="ic2">${ICON.bubble}</span><span style="flex:1;min-width:0"><div class="bt">${COPY.team}<span>maintenant</span></div><div class="bx">${text}</div></span></div>`;
  const portalCard = () => `<div class="t">${COPY.listTitle}</div><div class="s">${COPY.listSub}</div>` + COPY.rows.map((r) =>
    `<div class="rw"><div class="r1">${r[0]}<span class="tg ${r[1]}">${r[2]}</span></div><div class="r2"><span>Courtier : ${r[4]}</span><span>${r[3]}</span></div></div>`).join('');
  const BUB_TOP = 46;

  let R;
  function build(layer) {
    Q.day(layer);
    const world = Q.div(layer, 'qr-abs', { width: '0', height: '0' });
    const st = [0, 1, 2, 3, 4, 4].map((i) => Q.div(world, 'qr-abs', { left: i * L.step + 'px', width: Q.W + 'px', height: Q.H + 'px' }));
    const texts = TEXT.map((t, i) => Q.phrase(st[i], t.lines, { size: L.size, weight: 750, color: Q.C.ink, align: 'left', lh: 1.26 }));

    // ---- 0 · seller: search result, then the team's page
    const A = phone(st[0], HOURS.search, false, 'nat');
    const search = A.view('gs', `<div class="q">${ICON.search}${COPY.query}</div><div class="tabs"><span class="on">Tous</span><span>Images</span><span>Vidéos</span><span>Actualités</span></div>
      <div class="ad"><div class="sp">Commandité</div><div class="site"><span class="fav">B</span><span><div class="sn">${COPY.team}</div><div class="su">${COPY.domain} › vendre</div></span></div>
      <div class="tt">${COPY.adTitle}</div><div class="ds">${COPY.adDesc}</div><div class="sl">${COPY.adLinks.map((x) => `<span>${x}</span>`).join('')}</div></div>
      <div class="org"><div style="width:42%"></div><div style="width:88%;height:17px"></div><div style="width:96%"></div><div style="width:70%"></div><div style="width:38%;margin-top:22px"></div><div style="width:80%;height:17px"></div><div style="width:92%"></div></div>`);
    const ripple = SS.el('div', '', search);
    Object.assign(ripple.style, { position: 'absolute', left: '120px', top: '212px', width: '90px', height: '90px', marginLeft: '-45px', marginTop: '-45px', borderRadius: '50%', background: 'rgba(26,115,232,.2)' });
    const page = A.view('tp', `<div class="hd"><b>${COPY.team}</b><i></i></div><div class="kc">${COPY.pageKicker}</div><div class="h1">${COPY.pageTitle}</div><div class="sub">${COPY.pageSub}</div><div class="cd">` +
      COPY.fields.map((f, i) => `<div class="lb">${f[0]}</div><div class="fd${i === 3 ? ' ta' : ''}"><span></span></div>`).join('') + `<div class="bt">${COPY.pageBtn}${ICON.send}</div></div>`);
    // ---- 1 · broker: banner, then the alert
    const B1 = phone(st[1], HOURS.alert, true, 'blk');
    const b1msg = B1.view('im', messages(HOURS.alert));
    const alBub = SS.el('div', 'bub', b1msg.querySelector('.thi')); alBub.innerHTML = COPY.alert; alBub.style.top = BUB_TOP + 'px';
    const alH = alBub.offsetHeight;
    const b1lock = B1.view('lk', lock(HOURS.alert, COPY.alertPreview));
    // ---- 2 · seller: her phone is unlocked (she has just sent the form). The page thanks her, the banner of the
    //          text drops over it, then the conversation with an unknown number
    const A2 = phone(st[2], HOURS.confirm, false, 'nat');
    A2.view('tp', `<div class="hd"><b>${COPY.team}</b><i></i></div><div class="ok"><div class="okc"><svg viewBox="0 0 24 24" fill="none" stroke="#1E9E57" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>${COPY.pageThanks}</div>`);
    const a2bn = document.createElement('div');
    a2bn.className = 'bn top';
    a2bn.innerHTML = `<span class="ic2">${ICON.bubble}</span><span style="flex:1;min-width:0"><div class="bt">${COPY.teamNumber}<span>maintenant</span></div><div class="bx">${COPY.confirm}</div></span>`;
    A2.el.querySelector('.scr').insertBefore(a2bn, A2.sb);
    const a2msg = A2.view('im', messages(HOURS.confirm, true));
    const confBub = SS.el('div', 'bub', a2msg.querySelector('.thi')); confBub.innerHTML = COPY.confirm; confBub.style.top = BUB_TOP + 'px';
    // ---- 3 · broker, six minutes later: he replies « 1 », the system confirms
    const B3 = phone(st[3], HOURS.reply, false, 'blk');
    const b3msg = B3.view('im', messages(HOURS.alert));
    const thi = b3msg.querySelector('.thi');
    const rb = SS.el('div', 'bub', thi); rb.innerHTML = COPY.alert; rb.style.top = BUB_TOP + 'px';
    const one = SS.el('div', 'bub out', thi); one.textContent = COPY.reply; one.style.top = BUB_TOP + alH + 10 + 'px';
    const dl = SS.el('div', 'dl', thi); dl.textContent = 'Distribué'; dl.style.top = BUB_TOP + alH + 10 + 40 + 'px';
    const ack = SS.el('div', 'bub', thi); ack.textContent = COPY.ack; ack.style.top = BUB_TOP + alH + 10 + 62 + 'px';
    const scroll = Math.max(0, BUB_TOP + alH + 10 + 62 + 70 - 500); // the end of the thread sits above the text field
    thi.style.transform = `translateY(${-scroll}px)`;
    // ---- 4 · leader: the portal, list « Demandes »
    const P = phone(st[4], HOURS.portal);
    const pv = P.view('pt', `<div class="hd"><i></i>Mon équipe</div><div class="pcard">${portalCard()}</div>`);
    // ---- 5 · the same list, in the team's own frame
    const card5 = Q.div(st[5], 'qr-abs pcard'); card5.innerHTML = portalCard();
    const cr = card5.getBoundingClientRect();
    const FW = cr.width + 28, FH = cr.height + 76;
    const frame = Q.div(st[5], 'qr-abs', { width: FW + 'px', height: FH + 'px' });
    frame.innerHTML = `<svg width="${FW}" height="${FH}" style="display:block;overflow:visible"><rect x="2" y="2" width="${FW - 4}" height="${FH - 4}" rx="30" fill="rgba(255,255,255,.55)" stroke="${Q.C.turq}" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" stroke-linecap="round"/></svg>
      <div class="tt" style="position:absolute;left:20px;top:17px;font-size:17px;font-weight:800;letter-spacing:-.02em;color:#0A6A61;white-space:nowrap">${COPY.team}</div>
      <div class="lk2" style="position:absolute;right:16px;top:12px;width:30px;height:30px;border-radius:9px;background:${Q.C.turq};display:grid;place-items:center"><span style="width:18px;height:18px;display:block">${SS.icon.lock('#04211E')}</span></div>`;
    st[5].insertBefore(frame, card5);
    st[4].style.transformOrigin = `${L.px}px ${L.top + 420}px`;
    st[5].style.transformOrigin = `${L.list5.x}px ${L.list5.y}px`;
    R = { world, st, texts, A, search, ripple, page, fds: [...page.querySelectorAll('.fd span')], btn: page.querySelector('.bt'), B1, b1lock, b1bn: b1lock.querySelector('.bn'), alBub,
      A2, a2bn, a2msg, confBub, B3, one, dl, ack, tx: b3msg.querySelector('.tx'), ph: b3msg.querySelector('.fl i'), P, tag: pv.querySelector('.tg'),
      card5, frame, fr: frame.querySelector('rect'), ftt: frame.querySelector('.tt'), flk: frame.querySelector('.lk2') };
  }

  const setPhone = (p, dy, dx) => Q.st(p.el, { x: L.px + (dx || 0), y: L.top + (dy || 0) + 370 * L.ps, s: L.ps });
  const pop = (el, u, at, from = 0.6) => {
    el.style.transform = `scale(${Q.lerp(from, 1, Q.k(u, at, 0.36, Q.E.springSoft)).toFixed(4)})`;
    el.style.opacity = Q.k(u, at, 0.1, Q.E.sine).toFixed(3);
  };
  // lock screen → app: the lock view lifts away, the status bar turns dark on light
  const unlock = (p, lockEl, bn, u, bnAt, openAt) => {
    const kb = Q.k(u, bnAt, 0.4, Q.E.springSoft), ko = Q.k(u, openAt, 0.3, Q.E.inOut);
    bn.style.transform = `translateY(${((1 - kb) * -60).toFixed(2)}px) scale(${Q.lerp(0.94, 1, kb).toFixed(4)})`;
    bn.style.opacity = Q.k(u, bnAt, 0.12, Q.E.sine).toFixed(3);
    lockEl.style.transform = `translateY(${(-ko * 100).toFixed(2)}%)`;
    lockEl.style.visibility = ko >= 0.999 ? 'hidden' : 'visible';
    p.sb.style.color = ko > 0.5 ? '#000' : '#fff';
  };

  function render(u) {
    const end = QR.DUR.s6;
    // ---- camera: the scene arrives on the glide that scene 5 leaves on; four whips; a push; the exit whip
    const camAt = (v) => { const w = (i) => Q.k(v, M[i] - T.whip, T.whipDur, Q.E.p4io); return L.step * (w(1) + w(2) + w(3) + w(4)) + Q.W * 0.9 * Q.k(v, end - T.exit, T.exit, Q.E.in) - (1 - Q.k(v, 0, 0.22, Q.E.out)) * Q.W * 0.5; };
    const camX = camAt(u), camV = Math.abs(camX - camAt(u - 1 / 60));
    R.world.style.transform = `translateX(${(-camX).toFixed(2)}px)`;
    R.world.style.filter = camV > 12 ? `blur(${Math.min(5, camV * 0.03).toFixed(2)}px)` : 'none';
    const push = Q.k(u, M[5] - T.whip, T.whipDur, Q.E.p4io);
    R.st.forEach((s, i) => {
      let on = Math.abs((i > 4 ? 4 : i) * L.step - camX) < Q.W * 1.05;
      if (i === 4) on = on && push < 0.999;
      if (i === 5) on = on && push > 0.001;
      s.style.display = on ? '' : 'none';
    });
    R.st[4].style.transform = `scale(${Q.lerp(1, 2.4, push).toFixed(4)})`;
    R.st[4].style.opacity = (1 - Q.clamp((push - 0.45) / 0.4)).toFixed(3);
    R.st[5].style.transform = `scale(${Q.lerp(0.55, 1, push).toFixed(4)})`;
    R.st[5].style.opacity = Q.clamp((push - 0.3) / 0.45).toFixed(3);
    R.texts.forEach((t, i) => t.put(L.tx, L.ty, u, { at: TEXT[i].at, chip: TEXT[i].chip }));

    // ---- 0 · search (14 h 03) → tap on the sponsored result → the team's page (14 h 04), the form fills, sent
    setPhone(R.A, 0);
    const kp = Q.k(u, T.toPage, 0.34, Q.E.inOut), rp = Q.k(u, T.tap, 0.4, Q.E.out);
    R.ripple.style.transform = `scale(${Q.lerp(0.2, 1.5, rp).toFixed(3)})`;
    R.ripple.style.opacity = (u < T.tap ? 0 : 1 - rp).toFixed(3);
    R.page.style.transform = `translateY(${((1 - kp) * 100).toFixed(2)}%)`;
    R.page.style.visibility = kp <= 0.001 ? 'hidden' : 'visible';
    R.A.tm.textContent = kp > 0.5 ? HOURS.page : HOURS.search;
    COPY.fields.forEach((f, i) => { R.fds[i].textContent = f[1].slice(0, Math.floor(Q.typeN(u, T.f[i], T.fCps, f[1].length))); });
    const pr = Q.env(u, T.press, 0.07, T.press + 0.09, 0.2);
    R.btn.style.transform = `scale(${(1 - 0.05 * pr).toFixed(4)})`;
    R.btn.style.filter = pr > 0.01 ? `brightness(${(1 + 0.2 * pr).toFixed(3)})` : 'none';
    // ---- 1 · broker (14 h 04): banner on the lock screen, then the alert with the menu of codes
    setPhone(R.B1, 0, Q.buzz(u, T.alertBn + 0.03, 0.28, 17) * 4);
    unlock(R.B1, R.b1lock, R.b1bn, u, T.alertBn, T.alertOpen);
    pop(R.alBub, u, T.alertOpen + 0.1);
    // ---- 2 · seller (14 h 04): banner, then the confirmation
    setPhone(R.A2, 0, Q.buzz(u, T.confBn + 0.03, 0.28, 17) * 4);
    const kb = Q.k(u, T.confBn, 0.42, Q.E.springSoft), ko = Q.k(u, T.confOpen, 0.32, Q.E.inOut);
    R.a2bn.style.transform = `translateY(${((1 - kb) * -150 - ko * 150).toFixed(2)}px)`;
    R.a2bn.style.opacity = (Q.k(u, T.confBn, 0.1, Q.E.sine) * (1 - ko)).toFixed(3);
    R.a2msg.style.transform = `translateY(${((1 - ko) * 100).toFixed(2)}%)`;
    R.a2msg.style.visibility = ko <= 0.001 ? 'hidden' : 'visible';
    pop(R.confBub, u, T.confOpen + 0.12);
    // ---- 3 · broker (14 h 10): « 1 », « Distribué », the system confirms
    setPhone(R.B3, 0);
    const typing = u >= T.typeOne && u < T.sendOne;
    R.tx.textContent = typing ? COPY.reply : '';
    R.ph.style.display = typing ? 'none' : '';
    pop(R.one, u, T.sendOne, 0.5);
    R.dl.style.opacity = Q.k(u, T.delivered, 0.15, Q.E.sine).toFixed(3);
    pop(R.ack, u, T.ack);
    // ---- 4 · leader (14 h 10): the 14 h 04 request turns to « Joint »
    setPhone(R.P, 0);
    pop(R.tag, u, T.joint, 0.4);
    // ---- 5 · the list in the team's own frame, closed by a lock
    Q.st(R.card5, { x: L.list5.x, y: L.list5.y + 16 * L.list5.s, s: L.list5.s });
    Q.st(R.frame, { x: L.list5.x, y: L.list5.y, s: L.list5.s });
    const fk = Q.k(u, T.frame, T.frameDur, Q.E.inOut);
    R.fr.setAttribute('stroke-dashoffset', (1 - fk).toFixed(4));
    R.fr.setAttribute('fill-opacity', fk.toFixed(3));
    R.ftt.style.opacity = Q.k(u, T.frame + 0.1, 0.3, Q.E.sine).toFixed(3);
    pop(R.flk, u, T.lock, 0.4);
  }

  QR.scene({ id: 's6', build, render, cuts: M });
})();
