/* Scene 6 · Le système (20 beats, 21,67 – 32,78 s). Pale turquoise backdrop, text on the left,
   interface on the right. Five messages of four beats, each one a « station » in a wide world; the
   camera travels between them (no fade):
     1 → 2 → 3 → 4   lateral whip pans, landing on the beat (motion blur comes from the renderer)
     4 → 5           push through the « Demandes » list, which becomes the team's own frame
   In each message: first part of the sentence on beat 0, key phrase on beat 1, chip on beat 2.
     1  « Google Ads amène les vendeurs [sur la page de ton équipe.] »        sponsored result → team page, form
     2  « Chaque demande arrive au bon courtier, [par texto, en moins de 60 secondes.] »   alert text (daytime)
     3  « Le vendeur reçoit une confirmation [tout de suite.] Même à 2 h du matin. »        confirmation, 2 h 14
     4  « Ton courtier répond avec un chiffre. [Tu sais qui a été rappelé.] »               reply « 1 », list « Demandes »
     5  « Des demandes qui appartiennent à ton équipe. [Jamais partagées ni revendues.] »   the team's own frame

   Content rules (brief, section 4):
   - 60 seconds = the time for the request to REACH the broker. Nothing says « rappelé en 60 secondes ».
   - The broker's alert shows a daytime hour: between 22 h and 7 h the broker gets an email, not a text.
   - The alert leaves from the team's own number: no mention of ScaleSuite in any text message.
   - Real broker codes: 1 Joint, 2 Pas de réponse, 3 Plus tard, 4 Rencontre, 5 Hors cible.
   - No 10-minute follow-up, no 90-day nurture, no transferred calls, no call script, no speed ranking.
   - The landing page addresses the seller with « vous » and makes no free-evaluation offer.
   UI COPY IS A DRAFT (« à confirmer »): to be replaced by the real texts once the screenshots arrive.
   Everything a seller or a broker reads is in the COPY object below. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR, b = QR.b;

  const M = [0, 4, 8, 12, 16].map(b); // message starts (seconds)
  const T = {
    whip: 0.3, whipDur: 0.42,      // a camera move starts 0,30 s before its beat and lasts 0,42 s
    // 1
    ad: 0.04, tap: b(0.75), phone: b(1), f1: b(1.5), f2: b(2), f3: b(2.5), fCps: 70, press: b(3),
    // 2
    alert: M[1] + b(1),
    // 3
    confirm: M[2] + b(1),
    // 4
    typeOne: M[3] + b(0.5), sendOne: M[3] + b(1), list: M[3] + b(1), joint: M[3] + b(2),
    // 5
    frame: M[4] + b(0.5), frameDur: b(1), lock: M[4] + b(2),
    exit: 0.26,                    // the scene leaves on a whip that scene 7 continues
  };
  const COPY = {
    adDomain: 'equipeexemple.ca', adTitle: 'Vendre ma propriété à Laval', adSub: 'Équipe Exemple, courtiers immobiliers',
    pageTeam: 'ÉQUIPE EXEMPLE', pageTitle: 'Vendez votre propriété avec l’Équipe Exemple',
    fields: [['Adresse', '45 rue Exemple, Laval'], ['Nom', 'Paul Fictif'], ['Téléphone', '450 555 0142']], pageBtn: 'Envoyer ma demande',
    pageTime: '14 h 05',
    // the alert leaves from the team's own number (Twilio): no mention of ScaleSuite in any text
    alertFrom: 'Équipe Exemple', alertTime: '14 h 06', alertStamp: 'Aujourd’hui 14 h 06',
    alert: 'Nouvelle demande de vendeur.<br>Paul Fictif, Laval<br>450 555 0142<span class="sp"></span>Après l’appel, répondez :<br>1 Joint, 2 Pas de réponse, 3 Plus tard, 4 Rencontre, 5 Hors cible',
    replyTime: '14 h 10', reply: '1',
    confirmFrom: 'Équipe Exemple', confirmTime: '2 h 14', confirmStamp: 'Aujourd’hui 2 h 14',
    confirm: 'Bonjour Marie, votre demande est bien reçue. Un courtier de l’Équipe Exemple communiquera avec vous.',
    listTitle: 'Demandes',
    rows: [['Paul Fictif', 'Laval', 'ok', 'Joint'], ['Marie Exemple', 'Sainte Julie', 'no', 'Pas de réponse'], ['Jean Démo', 'Lévis', 'rdv', 'Rencontre']],
    team: 'Équipe Exemple', seller: 'Cellulaire du vendeur', broker: 'Cellulaire du courtier',
  };
  // g: 0 = arrives on beat 0 of the message, 1 = on beat 1, 2 = on beat 2. Chips unfold on beat 2.
  const TEXT = [
    [[{ t: 'Google Ads amène' }], [{ t: 'les vendeurs' }], [{ t: 'sur la page de ton équipe.', chip: true, g: 1 }]],
    [[{ t: 'Chaque demande arrive' }], [{ t: 'au bon courtier,' }], [{ t: 'par texto, en moins de', chip: true, g: 1 }], [{ t: '60 secondes.', chip: true, g: 1 }]],
    [[{ t: 'Le vendeur reçoit' }], [{ t: 'une confirmation' }], [{ t: 'tout de suite.', chip: true, g: 1 }], [{ t: 'Même à 2 h du matin.', g: 2 }]],
    [[{ t: 'Ton courtier répond' }], [{ t: 'avec un chiffre.' }], [{ t: 'Tu sais qui a été rappelé.', chip: true, g: 1 }]],
    [[{ t: 'Des demandes qui' }], [{ t: 'appartiennent à ton équipe.' }], [{ t: 'Jamais partagées', chip: true, g: 1 }], [{ t: 'ni revendues.', chip: true, g: 1 }]],
  ];
  const L = Q.pick(
    // phones are framed tight and cut by the bottom of the frame (ps = phone scale)
    { step: 2500, tx: 200, ty: 540, size: 62, ps: 1.3, ps4: 1.15, top: 176, px: 1420, px4: 1516,
      ad: { x: 1400, y: 470, s: 1.12 }, list: { x: 1238, y: 772, s: 1.1 }, list5: { x: 1390, y: 548, s: 1.25 }, tag: 28 },
    { step: 1500, tx: 70, ty: 430, size: 54, ps: 1.3, ps4: 1.1, top: 760, px: 540, px4: 720,
      ad: { x: 540, y: 1000, s: 1.3 }, list: { x: 400, y: 1380, s: 1.2 }, list5: { x: 540, y: 1180, s: 1.4 }, tag: 30 },
  );

  const bars = '<span class="ic"><span class="sig"></span><span class="bat"></span></span>';
  function phone(parent, dark, time, label) {
    const el = Q.div(parent, 'qr-phone' + (dark ? ' dark' : ''));
    el.innerHTML = `<div class="scr"><div class="sb"><span class="tm">${time}</span>${bars}</div></div>`;
    const lab = Q.div(parent, 'qr-abs', { fontSize: L.tag + 'px', fontWeight: 700, letterSpacing: '-.01em', color: '#4E6B68', whiteSpace: 'nowrap' });
    lab.textContent = label;
    const scr = el.querySelector('.scr');
    return { el, lab, view: (cls, html) => { const v = SS.el('div', 'view ' + cls, scr); v.innerHTML = html; return v; } };
  }
  const msgView = (from, stamp, inp) => `<div class="hd"><span class="av">${from[0]}</span>${from}</div><div class="th"><div class="thi"><div class="st">${stamp}</div></div></div>${inp ? '<div class="inp"><span class="tx"></span></div>' : ''}`;
  const BUB_TOP = 54; // first bubble, under the date stamp
  const listHTML = () => `<div class="hd">${COPY.listTitle}</div>` + COPY.rows.map((r) => `<div class="row"><div><div class="nm">${r[0]}</div><div class="ct">${r[1]}</div></div><span class="qr-tag ${r[2]}">${r[3]}</span></div>`).join('');

  let R;
  function build(layer) {
    Q.day(layer);
    const world = Q.div(layer, 'qr-abs', { width: '0', height: '0' });
    // five stations side by side; the fifth sits where the fourth is (the camera pushes through)
    const st = [0, 1, 2, 3, 3].map((i) => Q.div(world, 'qr-abs', { left: i * L.step + 'px', width: Q.W + 'px', height: Q.H + 'px' }));
    const texts = TEXT.map((t, i) => Q.phrase(st[i], t, { size: L.size, color: Q.C.ink, align: 'left' }));

    // ---- 1 · sponsored result, then the seller's phone with the team page
    const ad = Q.div(st[0], 'qr-ad');
    ad.innerHTML = `<div class="ad1">Commandité <span>${COPY.adDomain}</span></div><div class="ad2">${COPY.adTitle}</div><div class="ad3">${COPY.adSub}</div>`;
    const ripple = Q.div(st[0], 'qr-abs', { width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(43,191,179,.25)', boxShadow: 'inset 0 0 0 4px rgba(43,191,179,.7)' });
    const A = phone(st[0], false, COPY.pageTime, COPY.seller);
    const page = A.view('qr-page', `<div class="url">${COPY.adDomain}</div><div class="brand"><i></i>${COPY.pageTeam}</div><div class="h">${COPY.pageTitle}</div>` +
      COPY.fields.map((f) => `<div class="lb">${f[0]}</div><div class="fd"><span></span></div>`).join('') + `<div class="btn">${COPY.pageBtn}</div>`);
    // ---- 2 · the broker's phone: the alert (daytime)
    const B2 = phone(st[1], false, COPY.alertTime, COPY.broker);
    const al = B2.view('qr-msg', msgView(COPY.alertFrom, COPY.alertStamp, true));
    const alBub = SS.el('div', 'bub', al.querySelector('.thi')); alBub.innerHTML = COPY.alert; alBub.style.top = BUB_TOP + 'px';
    const alH = alBub.offsetHeight;
    // ---- 3 · the seller's phone at night: the confirmation
    const C = phone(st[2], true, COPY.confirmTime, COPY.seller);
    const conf = C.view('qr-msg', msgView(COPY.confirmFrom, COPY.confirmStamp, false));
    const confBub = SS.el('div', 'bub', conf.querySelector('.thi')); confBub.innerHTML = COPY.confirm; confBub.style.top = BUB_TOP + 'px';
    // ---- 4 · the broker's phone again: the thread has scrolled, the code menu sits right above the reply
    const D = phone(st[3], false, COPY.replyTime, COPY.broker);
    const rep = D.view('qr-msg', msgView(COPY.alertFrom, COPY.alertStamp, true));
    const thi = rep.querySelector('.thi');
    const repBub = SS.el('div', 'bub', thi); repBub.innerHTML = COPY.alert; repBub.style.top = BUB_TOP + 'px';
    const one = SS.el('div', 'bub out', thi); one.textContent = COPY.reply; one.style.top = BUB_TOP + alH + 12 + 'px';
    thi.style.transform = `translateY(${-Math.max(0, BUB_TOP + alH - 118)}px)`;
    const list = Q.div(st[3], 'qr-list'); list.innerHTML = listHTML();
    // ---- 5 · the team's own frame around the same list
    const list5 = Q.div(st[4], 'qr-list'); list5.innerHTML = listHTML();
    const lr = list5.getBoundingClientRect();
    const FW = lr.width + 56, FH = lr.height + 118;
    const frame = Q.div(st[4], 'qr-abs', { width: FW + 'px', height: FH + 'px' });
    frame.innerHTML = `<svg width="${FW}" height="${FH}" style="display:block;overflow:visible"><rect x="3" y="3" width="${FW - 6}" height="${FH - 6}" rx="44" fill="rgba(255,255,255,.5)" stroke="${Q.C.turq}" stroke-width="5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" stroke-linecap="round"/></svg>
      <div class="tt" style="position:absolute;left:32px;top:26px;font-size:28px;font-weight:780;letter-spacing:-.02em;color:#0A6A61;white-space:nowrap">${COPY.team}</div>
      <div class="lk" style="position:absolute;right:28px;top:20px;width:48px;height:48px;border-radius:14px;background:${Q.C.turq};display:grid;place-items:center"><span style="width:28px;height:28px;display:block">${SS.icon.lock('#04211E')}</span></div>`;
    st[4].insertBefore(frame, list5);
    st[3].style.transformOrigin = `${L.list.x}px ${L.list.y}px`;
    st[4].style.transformOrigin = `${L.list5.x}px ${L.list5.y}px`;
    R = { world, st, texts, ad, ripple, A, fds: [...page.querySelectorAll('.fd span')], btn: page.querySelector('.btn'), B2, alBub, C, confBub, D, one, inp: rep.querySelector('.inp .tx'),
      list, tags: [...list.querySelectorAll('.qr-tag')], list5, frame, fr: frame.querySelector('rect'), ftt: frame.querySelector('.tt'), flk: frame.querySelector('.lk'), lh: lr.height };
  }

  const setPhone = (p, x, s, dy, o) => {
    const top = L.top + (dy || 0);
    Q.st(p.el, { x, y: top + 370 * s, s, o: o == null ? 1 : o });
    Q.st(p.lab, { x, y: top - 30, o: (o == null ? 1 : o) * (dy ? Q.clamp(1 - Math.abs(dy) / 60) : 1) });
  };
  const pop = (el, u, at, from = 0.5) => {
    el.style.transform = `scale(${Q.lerp(from, 1, Q.k(u, at, 0.42, Q.E.spring)).toFixed(4)})`;
    el.style.opacity = Q.k(u, at, 0.12, Q.E.sine).toFixed(3);
  };

  function render(u) {
    const end = QR.DUR.s6;
    // ---- camera: three lateral whips, then a push through the list, then the exit whip
    const whip = (i) => Q.k(u, M[i] - T.whip, T.whipDur, Q.E.p4io);
    const camX = L.step * (whip(1) + whip(2) + whip(3)) + Q.W * 0.9 * Q.k(u, end - T.exit, T.exit, Q.E.in);
    R.world.style.transform = `translateX(${(-camX).toFixed(2)}px)`;
    const push = Q.k(u, M[4] - T.whip, T.whipDur, Q.E.p4io);
    R.st.forEach((s, i) => {
      const x = (i > 3 ? 3 : i) * L.step - camX;
      let on = Math.abs(x) < Q.W * 1.05;
      if (i === 3) on = on && push < 0.999;
      if (i === 4) on = on && push > 0.001;
      s.style.display = on ? '' : 'none';
    });
    // push through: the list of message 4 grows past the camera, message 5 comes up from inside it
    R.st[3].style.transform = `scale(${Q.lerp(1, 2.6, push).toFixed(4)})`;
    R.st[3].style.opacity = (1 - Q.clamp((push - 0.45) / 0.4)).toFixed(3);
    R.st[4].style.transform = `scale(${Q.lerp(0.5, 1, push).toFixed(4)})`;
    R.st[4].style.opacity = Q.clamp((push - 0.3) / 0.45).toFixed(3);

    // ---- texts: part 1 on beat 0 of the message, key phrase on beat 1 (third part on beat 2), chips on beat 2
    R.texts.forEach((t, i) => t.put(L.tx, L.ty, u, { at: [M[i], M[i] + b(1), M[i] + b(2)], chip: t.chips.map((c, j) => M[i] + b(2) + j * 0.1) }));

    // ---- 1 · sponsored result, tap, the page slides up, the form fills
    const adIn = Q.k(u, T.ad, 0.46, Q.E.spring), adOut = Q.k(u, T.phone - 0.04, 0.3, Q.E.in);
    Q.st(R.ad, { x: L.ad.x, y: L.ad.y + (1 - adIn) * 60 - adOut * 250, s: L.ad.s * Q.lerp(0.7, 1, adIn) * Q.lerp(1, 0.55, adOut) * (1 - 0.03 * Q.env(u, T.tap, 0.08, T.tap + 0.08, 0.14)), o: Q.k(u, T.ad, 0.14, Q.E.sine) * (1 - adOut), blur: (1 - Q.k(u, T.ad, 0.28, Q.E.out)) * 10 });
    const rp = Q.k(u, T.tap, 0.45, Q.E.out);
    Q.st(R.ripple, { x: L.ad.x - 40, y: L.ad.y + 14, s: Q.lerp(0.2, 1.4, rp), o: u < T.tap ? 0 : 0.9 * (1 - rp) });
    setPhone(R.A, L.px, L.ps, (1 - Q.k(u, T.phone, 0.56, Q.E.springSoft)) * 1000, u < T.phone ? 0 : 1);
    [[T.f1, 0], [T.f2, 1], [T.f3, 2]].forEach(([at, i]) => { const v = COPY.fields[i][1]; R.fds[i].textContent = v.slice(0, Math.floor(Q.typeN(u, at, T.fCps, v.length))); });
    const pr = Q.env(u, T.press, 0.07, T.press + 0.09, 0.2);
    R.btn.style.transform = `scale(${(1 - 0.05 * pr).toFixed(4)})`;
    R.btn.style.filter = pr > 0.01 ? `brightness(${(1 + 0.25 * pr).toFixed(3)})` : 'none';

    // ---- 2 · the alert pops on the beat, the phone buzzes
    const bz = Q.buzz(u, T.alert + 0.04, 0.3, 17);
    setPhone(R.B2, L.px + bz * 4, L.ps, 0);
    pop(R.alBub, u, T.alert);
    // ---- 3 · the confirmation, at night
    setPhone(R.C, L.px, L.ps, 0);
    pop(R.confBub, u, T.confirm);
    // ---- 4 · the broker types « 1 » and sends it ; the list rises ; the row turns to « Joint »
    setPhone(R.D, L.px4, L.ps4, 0);
    R.inp.textContent = u >= T.typeOne && u < T.sendOne ? COPY.reply : '';
    pop(R.one, u, T.sendOne, 0.4);
    const li = Q.k(u, T.list, 0.52, Q.E.springSoft);
    Q.st(R.list, { x: L.list.x, y: L.list.y + (1 - li) * 420, s: L.list.s, o: u < T.list ? 0 : 1 });
    R.tags.forEach((tg, i) => pop(tg, u, i === 0 ? T.joint : T.list + 0.22 + i * 0.07));
    // ---- 5 · the frame draws itself around the list, the lock closes it
    Q.st(R.list5, { x: L.list5.x, y: L.list5.y + 30 * L.list5.s, s: L.list5.s });
    Q.st(R.frame, { x: L.list5.x, y: L.list5.y, s: L.list5.s });
    const fk = Q.k(u, T.frame, T.frameDur, Q.E.inOut);
    R.fr.setAttribute('stroke-dashoffset', (1 - fk).toFixed(4));
    R.fr.setAttribute('fill-opacity', fk.toFixed(3));
    R.ftt.style.opacity = Q.k(u, T.frame + 0.1, 0.3, Q.E.sine).toFixed(3);
    pop(R.flk, u, T.lock, 0.3);
  }

  QR.scene({ id: 's6', build, render, cuts: M });
})();
