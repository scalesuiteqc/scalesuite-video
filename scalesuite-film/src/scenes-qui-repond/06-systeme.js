/* Scene 6 · Le système (23,4 – 36,6 s). Pale turquoise backdrop, text on the left, interface on the right.
   Five messages, one at a time. Two phones swap between front and back: the seller's and the broker's.
     1  « Google Ads amène les vendeurs [sur la page de ton équipe]. »      sponsored result → team page, form
     2  « Chaque demande arrive au bon courtier, [par texto, en moins de 60 secondes]. »   alert text (daytime)
     3  « Le vendeur reçoit une confirmation [tout de suite]. Même à 2 h du matin. »        confirmation, 2 h 14
     4  « Ton courtier répond avec un chiffre. [Tu sais qui a été rappelé]. »               reply « 1 », list « Demandes »
     5  « Des demandes qui appartiennent à ton équipe. [Jamais partagées ni revendues]. »   the team's own frame

   Content rules (brief, section 4):
   - 60 seconds = the time for the request to REACH the broker. Nothing says « rappelé en 60 secondes ».
   - The broker's alert shows a daytime hour: between 22 h and 7 h the broker gets an email, not a text.
   - Real broker codes: 1 Joint, 2 Pas de réponse, 3 Plus tard, 4 Rencontre, 5 Hors cible.
   - No 10-minute follow-up, no 90-day nurture, no transferred calls, no call script, no speed ranking.
   - The landing page addresses the seller with « vous » and makes no free-evaluation offer.
   UI COPY IS A DRAFT (« à confirmer »): to be replaced by the real texts once the screenshots arrive.
   Everything a seller or a broker reads is in the COPY object below. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  // beats (seconds from the scene start); the scene duration lives in 00-timing.js
  const B = [0, 2.6, 5.3, 8.1, 10.9];
  const T = {
    textIn: 0.08, textOut: 0.32,   // per beat: words start after the beat, block leaves before the next
    // 1
    ad: 0.12, tap: 0.66, adOut: 0.78, phone: 0.78,
    f1: 1.36, f2: 1.78, f3: 2.02, fCps: 60, press: 2.3,
    // 2
    swap: 0.62,                    // duration of a front/back swap
    alert: 3.28,
    // 3
    night: 5.5, confirm: 5.98,
    // 4
    scroll: 8.3, list: 8.55, typeOne: 8.75, sendOne: 9.02, joint: 9.34,
    // 5
    frame: 11.3, frameDur: 0.7, lock: 11.95,
    out: 12.9,
  };
  const COPY = {
    adDomain: 'equipeexemple.ca', adTitle: 'Vendre ma propriété à Laval', adSub: 'Équipe Exemple, courtiers immobiliers',
    pageTeam: 'ÉQUIPE EXEMPLE', pageTitle: 'Vendez votre propriété avec l’Équipe Exemple',
    fields: [['Adresse', '45 rue Exemple, Laval'], ['Nom', 'Paul Fictif'], ['Téléphone', '450 555 0142']], pageBtn: 'Envoyer ma demande',
    pageTime: '14 h 05',
    // the alert leaves from the team's own number (Twilio): no mention of ScaleSuite in any text
    alertFrom: 'Équipe Exemple', alertTime: '14 h 06', alertStamp: 'Aujourd’hui 14 h 06',
    alert: 'Nouvelle demande de vendeur.<br>Paul Fictif, Laval<br>450 555 0142<span class="sp"></span>Après l’appel, répondez :<br>1\u00a0Joint, 2\u00a0Pas\u00a0de\u00a0réponse, 3\u00a0Plus\u00a0tard, 4\u00a0Rencontre, 5\u00a0Hors\u00a0cible',
    replyTime: '14 h 10', reply: '1',
    confirmFrom: 'Équipe Exemple', confirmTime: '2 h 14', confirmStamp: 'Aujourd’hui 2 h 14',
    confirm: 'Bonjour Marie, votre demande est bien reçue. Un courtier de l’Équipe Exemple communiquera avec vous.',
    listTitle: 'Demandes',
    rows: [['Paul Fictif', 'Laval', 'ok', 'Joint'], ['Marie Exemple', 'Sainte Julie', 'no', 'Pas de réponse'], ['Jean Démo', 'Lévis', 'rdv', 'Rencontre']],
    team: 'Équipe Exemple', seller: 'Cellulaire du vendeur', broker: 'Cellulaire du courtier',
  };
  const TEXT = [
    [[{ t: 'Google Ads amène' }], [{ t: 'les vendeurs' }], [{ t: 'sur la page de ton équipe', chip: true }, { t: '.', glue: true }]],
    [[{ t: 'Chaque demande arrive' }], [{ t: 'au bon courtier,' }], [{ t: 'par texto, en moins de', chip: true }], [{ t: '60 secondes', chip: true }, { t: '.', glue: true }]],
    [[{ t: 'Le vendeur reçoit' }], [{ t: 'une confirmation' }], [{ t: 'tout de suite', chip: true }, { t: '.', glue: true }], [{ t: 'Même à 2 h du matin.' }]],
    [[{ t: 'Ton courtier répond' }], [{ t: 'avec un chiffre.' }], [{ t: 'Tu sais qui a été rappelé', chip: true }, { t: '.', glue: true }]],
    [[{ t: 'Des demandes qui' }], [{ t: 'appartiennent à ton équipe.' }], [{ t: 'Jamais partagées', chip: true }], [{ t: 'ni revendues', chip: true }, { t: '.', glue: true }]],
  ];
  const L = Q.pick(
    // phones are framed tight and cut by the bottom of the frame (ps = scale of the front phone)
    { tx: 200, ty: 540, size: 62, ps: 1.3, ps4: 1.15, top: 176, front: { x: 1420 }, back: { x: 1565 }, front4: { x: 1516 }, off: 2250, apart: 250, backS: 0.8,
      ad: { x: 1400, y: 470, s: 1.12 }, list: { x: 1238, y: 772, s: 1.1 }, list5: { x: 1390, y: 548, s: 1.25 }, tag: 28 },
    { tx: 70, ty: 430, size: 54, ps: 1.3, ps4: 1.1, top: 760, front: { x: 540 }, back: { x: 760 }, front4: { x: 720 }, off: 1500, apart: 230, backS: 0.8,
      ad: { x: 540, y: 1000, s: 1.3 }, list: { x: 400, y: 1380, s: 1.2 }, list5: { x: 540, y: 1180, s: 1.4 }, tag: 30 },
  );

  const bars = '<span class="ic"><span class="sig"></span><span class="bat"></span></span>';
  function phone(parent) {
    const el = Q.div(parent, 'qr-phone');
    el.innerHTML = `<div class="scr"><div class="sb"><span class="tm"></span>${bars}</div></div>`;
    const scr = el.querySelector('.scr');
    return { el, scr, tm: el.querySelector('.tm'), view: (cls, html) => { const v = SS.el('div', 'view ' + cls, scr); v.innerHTML = html; return v; } };
  }
  const msgView = (from, stamp, inp) => `<div class="hd"><span class="av">${from[0]}</span>${from}</div><div class="th"><div class="thi"><div class="st">${stamp}</div></div></div>${inp ? '<div class="inp"><span class="tx"></span></div>' : ''}`;
  const BUB_TOP = 54; // first bubble, under the date stamp

  let R;
  function build(layer) {
    Q.day(layer);
    const texts = TEXT.map((t) => Q.block(layer, t, { size: L.size }));

    // ---- seller's phone: the team page, then (at night) the confirmation text
    const A = phone(layer);
    const page = A.view('qr-page', `<div class="url">${COPY.adDomain}</div><div class="brand"><i></i>${COPY.pageTeam}</div><div class="h">${COPY.pageTitle}</div>` +
      COPY.fields.map((f) => `<div class="lb">${f[0]}</div><div class="fd"><span></span></div>`).join('') + `<div class="btn">${COPY.pageBtn}</div>`);
    const fds = [...page.querySelectorAll('.fd span')], btn = page.querySelector('.btn');
    const conf = A.view('qr-msg', msgView(COPY.confirmFrom, COPY.confirmStamp, false));
    const confBub = SS.el('div', 'bub', conf.querySelector('.thi')); confBub.innerHTML = COPY.confirm; confBub.style.top = BUB_TOP + 'px';
    // ---- broker's phone: the alert, then the reply
    const Bp = phone(layer);
    const al = Bp.view('qr-msg', msgView(COPY.alertFrom, COPY.alertStamp, true));
    const thi = al.querySelector('.thi');
    const alBub = SS.el('div', 'bub', thi); alBub.innerHTML = COPY.alert; alBub.style.top = BUB_TOP + 'px';
    const alH = alBub.offsetHeight;
    const one = SS.el('div', 'bub out', thi); one.textContent = COPY.reply; one.style.top = BUB_TOP + alH + 12 + 'px';
    // when the broker replies, the thread scrolls: the code menu stays visible right above the « 1 »
    const scroll = Math.max(0, BUB_TOP + alH - 118);
    const inp = al.querySelector('.inp .tx');
    // labels above the phones
    const lab = (t) => Q.div(layer, 'qr-abs', { fontSize: L.tag + 'px', fontWeight: 700, letterSpacing: '-.01em', color: '#4E6B68', whiteSpace: 'nowrap' }, t);
    const labA = lab(), labB = lab();
    labA.textContent = COPY.seller; labB.textContent = COPY.broker;

    // ---- sponsored result
    const ad = Q.div(layer, 'qr-ad');
    ad.innerHTML = `<div class="ad1">Commandité <span>${COPY.adDomain}</span></div><div class="ad2">${COPY.adTitle}</div><div class="ad3">${COPY.adSub}</div>`;
    const ripple = Q.div(layer, 'qr-abs', { width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(43,191,179,.25)', boxShadow: 'inset 0 0 0 4px rgba(43,191,179,.7)' });

    // ---- list « Demandes » and the team frame
    const list = Q.div(layer, 'qr-list');
    list.innerHTML = `<div class="hd">${COPY.listTitle}</div>` + COPY.rows.map((r) => `<div class="row"><div><div class="nm">${r[0]}</div><div class="ct">${r[1]}</div></div><span class="qr-tag ${r[2]}">${r[3]}</span></div>`).join('');
    const tags = [...list.querySelectorAll('.qr-tag')];
    const lr = list.getBoundingClientRect();
    const FW = lr.width + 56, FH = lr.height + 118;
    const frame = Q.div(layer, 'qr-abs', { width: FW + 'px', height: FH + 'px' });
    frame.innerHTML = `<svg width="${FW}" height="${FH}" style="display:block;overflow:visible"><rect x="3" y="3" width="${FW - 6}" height="${FH - 6}" rx="44" fill="rgba(255,255,255,.5)" stroke="${Q.C.turq}" stroke-width="5" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" stroke-linecap="round"/></svg>
      <div class="tt" style="position:absolute;left:32px;top:26px;font-size:28px;font-weight:780;letter-spacing:-.02em;color:#0A6A61;white-space:nowrap">${COPY.team}</div>
      <div class="lk" style="position:absolute;right:28px;top:20px;width:48px;height:48px;border-radius:14px;background:${Q.C.turq};display:grid;place-items:center"><span style="width:28px;height:28px;display:block">${SS.icon.lock('#04211E')}</span></div>`;
    layer.insertBefore(frame, list);
    R = { texts, A, Bp, page, conf, confBub, al, alBub, one, inp, thi, scroll, fds, btn, labA, labB, ad, ripple, list, tags, frame,
      fr: frame.querySelector('rect'), ftt: frame.querySelector('.tt'), flk: frame.querySelector('.lk'), lh: lr.height, FH };
  }

  const mix = (a, b, k) => ({ x: Q.lerp(a.x, b.x, k), y: Q.lerp(a.y, b.y, k) });
  // a phone hangs from its top edge (L.top): whatever its scale, the status bar stays in the frame
  // (speed: px travelled since the previous frame → motion blur on the long entrances and exits)
  function place(p, lab, x, dy, ps, f, extraO, speed) {
    const s = Q.lerp(L.backS, 1, f) * ps, top = L.top + (1 - f) * 34 + dy;
    Q.st(p.el, { x, y: top + 370 * s, s, o: Q.lerp(0.72, 1, f) * extraO, blur: (1 - f) * 4 + Math.min(7, speed * 0.16) });
    Q.st(lab, { x, y: top - 30, o: Q.clamp((f - 0.88) / 0.12) * extraO * (speed > 6 ? 0 : 1 - speed / 6) });
  }

  function render(u) {
    const end = QR.DUR.s6;
    const out = Q.k(u, T.out, end - T.out, Q.E.in);
    // ---- texts
    R.texts.forEach((t, i) => t.put(L.tx, L.ty, u, B[i] + T.textIn, (i < 4 ? B[i + 1] : T.out + 0.02) - T.textOut + (i < 4 ? 0 : T.textOut)));

    // ---- 1 · sponsored result, tap, the page slides up
    const adIn = Q.k(u, T.ad, 0.5, Q.E.spring), adOut = Q.k(u, T.adOut, 0.34, Q.E.in);
    Q.st(R.ad, { x: L.ad.x, y: L.ad.y + (1 - adIn) * 60 - adOut * 250, s: L.ad.s * Q.lerp(0.7, 1, adIn) * Q.lerp(1, 0.55, adOut) * (1 - 0.03 * Q.env(u, T.tap, 0.08, T.tap + 0.08, 0.14)), o: Q.k(u, T.ad, 0.16, Q.E.sine) * (1 - adOut), blur: (1 - Q.k(u, T.ad, 0.3, Q.E.out)) * 10 + adOut * 8 });
    const rp = Q.k(u, T.tap, 0.5, Q.E.out);
    Q.st(R.ripple, { x: L.ad.x - 40, y: L.ad.y + 14, s: Q.lerp(0.2, 1.4, rp), o: u < T.tap ? 0 : 0.9 * (1 - rp) });

    // ---- phones: front factor of each (1 = front, sharp ; 0 = back, small and soft)
    const phones = (v) => {
      const s2 = Q.k(v, B[1], T.swap, Q.E.inOut), s3 = Q.k(v, B[2], T.swap, Q.E.inOut), s4 = Q.k(v, B[3], T.swap, Q.E.inOut);
      const fA = 1 - s2 + s3, fB = 1 - s3 + s4;
      const aIn = Q.k(v, T.phone, 0.62, Q.E.springSoft), aExit = Q.k(v, B[3], 0.46, Q.E.in);
      // a swap is a shuffle: the two phones move apart sideways while they trade places, so they do not
      // overlap at the instant the one behind comes to the front (no pop in the stacking order)
      const apart = L.apart * Math.sin(Math.PI * s3);
      const xA = Q.lerp(L.back.x, L.front.x, fA) - apart;
      const bIn = Q.k(v, B[1] + 0.04, 0.66, Q.E.out), bExit = Q.k(v, B[4], 0.46, Q.E.in);
      let xB = Q.lerp(L.back.x, Q.lerp(L.front.x, L.front4.x, s4), fB) + apart;
      xB += (1 - bIn) * (L.off - xB) + bExit * (L.off - xB);
      // the seller's phone leaves by dropping out of the bottom of the frame, still in front
      return { fA, fB, xA, dyA: (1 - aIn) * 1000 + aExit * 1150, xB, psB: Q.lerp(L.ps, L.ps4, s4), aTop: aExit > 0 && aExit < 1 };
    };
    const p = phones(u), q = phones(u - 1 / 30);
    place(R.A, R.labA, p.xA, p.dyA, L.ps, p.fA, u < T.phone || u >= B[3] + 0.46 ? 0 : 1, Math.hypot(p.xA - q.xA, p.dyA - q.dyA));
    place(R.Bp, R.labB, p.xB, 0, p.psB, p.fB, u < B[1] ? 0 : 1, Math.abs(p.xB - q.xB));
    // stacking order: during the first swap the broker's phone arrives from the side, in front
    R.A.el.style.zIndex = p.aTop ? 4 : u < B[1] + T.swap / 2 ? 3 : p.fA > 0.5 ? 3 : 2;
    R.Bp.el.style.zIndex = u < B[1] + T.swap / 2 ? 4 : p.fB > 0.5 ? 3 : 2;

    // seller's phone: day page, then the night conversation
    const night = u >= T.night;
    R.A.el.classList.toggle('dark', night);
    R.page.style.display = night ? 'none' : '';
    R.conf.style.display = night ? '' : 'none';
    R.A.tm.textContent = night ? COPY.confirmTime : COPY.pageTime;
    [[T.f1, 0], [T.f2, 1], [T.f3, 2]].forEach(([at, i]) => { const v = COPY.fields[i][1]; R.fds[i].textContent = v.slice(0, Math.floor(Q.typeN(u, at, T.fCps, v.length))); });
    const pr = Q.env(u, T.press, 0.08, T.press + 0.1, 0.2);
    R.btn.style.transform = `scale(${(1 - 0.045 * pr).toFixed(4)})`;
    R.btn.style.filter = pr > 0.01 ? `brightness(${(1 + 0.25 * pr).toFixed(3)})` : 'none';
    const kc = Q.k(u, T.confirm, 0.46, Q.E.spring);
    R.confBub.style.transform = `scale(${Q.lerp(0.5, 1, kc).toFixed(4)})`;
    R.confBub.style.opacity = Q.k(u, T.confirm, 0.14, Q.E.sine).toFixed(3);

    // broker's phone: alert, then the reply
    R.Bp.tm.textContent = u >= B[3] + 0.3 ? COPY.replyTime : COPY.alertTime;
    const ka = Q.k(u, T.alert, 0.46, Q.E.spring);
    R.alBub.style.transform = `scale(${Q.lerp(0.5, 1, ka).toFixed(4)})`;
    R.alBub.style.opacity = Q.k(u, T.alert, 0.14, Q.E.sine).toFixed(3);
    R.inp.textContent = u >= T.typeOne && u < T.sendOne ? COPY.reply : '';
    R.thi.style.transform = `translateY(${(-R.scroll * Q.k(u, T.scroll, 0.5, Q.E.inOut)).toFixed(2)}px)`;
    const ko = Q.k(u, T.sendOne, 0.42, Q.E.spring);
    R.one.style.transform = `scale(${Q.lerp(0.4, 1, ko).toFixed(4)})`;
    R.one.style.opacity = Q.k(u, T.sendOne, 0.12, Q.E.sine).toFixed(3);

    // ---- 4 · the list rises ; 5 · it becomes the team's own frame
    const li = Q.k(u, T.list, 0.6, Q.E.springSoft), l5 = Q.k(u, B[4] + 0.05, 0.62, Q.E.inOut);
    const lp = mix(L.list, L.list5, l5), ls = Q.lerp(L.list.s, L.list5.s, l5);
    const oo = (1 - out);
    Q.st(R.list, { x: lp.x, y: lp.y + (1 - li) * 420 + 30 * l5 * ls, s: ls * Q.lerp(1, 0.95, out), o: (u < T.list ? 0 : 1) * oo, blur: out * 12 });
    R.list.style.zIndex = 5;
    R.tags.forEach((tg, i) => {
      const at = i === 0 ? T.joint : T.list + 0.3 + i * 0.08, k = Q.k(u, at, 0.4, Q.E.spring);
      tg.style.transform = `scale(${Q.lerp(0.5, 1, k).toFixed(4)})`;
      tg.style.opacity = Q.k(u, at, 0.12, Q.E.sine).toFixed(3);
    });
    const fk = Q.k(u, T.frame, T.frameDur, Q.E.inOut);
    Q.st(R.frame, { x: L.list5.x, y: L.list5.y, s: L.list5.s * Q.lerp(1, 0.95, out), o: (u < T.frame - 0.02 ? 0 : 1) * oo, blur: out * 12 });
    R.frame.style.zIndex = 4;
    R.fr.setAttribute('stroke-dashoffset', (1 - fk).toFixed(4));
    R.fr.setAttribute('fill-opacity', fk.toFixed(3));
    R.ftt.style.opacity = Q.k(u, T.frame + 0.1, 0.3, Q.E.sine).toFixed(3);
    const kl = Q.k(u, T.lock, 0.44, Q.E.spring);
    R.flk.style.transform = `scale(${Q.lerp(0.3, 1, kl).toFixed(4)})`;
    R.flk.style.opacity = Q.k(u, T.lock, 0.12, Q.E.sine).toFixed(3);
  }

  QR.scene({ id: 's6', build, render });
})();
