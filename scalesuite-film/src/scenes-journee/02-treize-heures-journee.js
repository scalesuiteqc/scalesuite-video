/* 13 h (5.05–13.85 s), the longest moment.
   Scene 3 · Moment card: a node on the 10 h ad blooms into the card; signed deed (document with a
   check), « 13 h », « Vous êtes chez le notaire. ». Leaves upward.
   Scene 4 · Proof (a): « Pendant ce temps… / Un acheteur vous écrit. » The agency landing page
   « Maisons à vendre sur la Rive-Sud »; the form types itself (Achat, Longueuil, D'ici 6 mois),
   holds, « Envoyer » is tapped. Fixed camera. The page goes up as the broker's phone comes up.
   Scene 5 · Proof (b), CLIMAX: « Le lead arrive. » 80 ms of stillness, then the notification drops
   (12 % overshoot, haptic): « Nouveau lead acheteur · Acheteur · Longueuil · Achat · ✓ Ajouté à votre
   CRM ». One push in. Holds.
   Scene 6 · Proof (c): a tap opens the CRM out of the notification (zoom through); « Déjà dans
   votre CRM. »: the new card docks at the top, the others step down, « Nouveau » pops. Holds.
   Exit: a node on « Nouveau » blooms into the 17 h card. */
(function () {
  const SS = window.SS;
  const C = SS.C;
  const AG = '#2F5D8C';
  const T = {
    bloom: 5.25, icon: 5.4, hour: 5.42, line: 5.45, exit: 7.25,                                       // scene 3
    kick: 7.29, head: 7.36, f: [7.55, 7.72, 7.92], tap: 9.35, up: 9.42,                              // scene 4
    phone: 9.42, freeze: 9.97, note: 10.05, chk: 10.47, cam5: 10.05, head5: 9.5, tap2: 11.77,      // scene 5
    crm: 11.85, head5out: 11.82, head6: 11.97, rows: 12.0, shift: 12.17, row: 12.22, halo: 12.47, nouveau: 12.52, end: 13.95, // scene 6
  };
  SS.T13 = T;
  const PH = { top: 700 };
  const NOTE = { y: 1300, w: 780, h: 330 };
  let card, R;

  function build(stage) {
    card = SS.momentCard(stage, { k: 1, icon: 'docCheck', hour: '13 h', line: 'Vous êtes chez\nle notaire.', from: SS.FOCUS10,
      T: { bloom: T.bloom, icon: T.icon, hour: T.hour, line: T.line, exit: T.exit } });

    // ================================================================ scene 4: the buyer's form
    const L4 = SS.proofLayer(stage);
    const s4 = SS.subWorld(L4, { y: 970, s: 1 });
    const LP = { top: 650, h: 900 };
    const lp = SS.el('div', 'a3', s4.w);
    Object.assign(lp.style, { width: '900px', height: LP.h + 'px', borderRadius: '34px', background: '#fff', boxShadow: SS.SH.lift, overflow: 'hidden' });
    SS.place(lp, 540, LP.top + LP.h / 2);
    lp.innerHTML = `<div style="position:absolute;left:0;top:0;right:0;height:96px;background:${AG};display:flex;align-items:center;gap:18px;padding:0 36px">
        <span style="width:38px;height:38px;border-radius:10px;background:#fff;opacity:.92"></span><span style="font-size:30px;font-weight:800;letter-spacing:.12em;color:#fff">VOTRE AGENCE</span></div>
      <div style="position:absolute;left:36px;top:126px;font-size:54px;font-weight:800;letter-spacing:-.03em;line-height:1.08;color:${C.ink}">Maisons à vendre<br>sur la Rive-Sud</div>
      <div style="position:absolute;left:30px;top:270px;width:840px;height:430px;border-radius:26px;background:#EEF4F9"></div>`;
    [['Projet', 'Achat'], ['Secteur', 'Longueuil'], ['Délai', 'D’ici 6 mois']].forEach(([l, v], k) => {
      const top = 270 + 24 + k * 136;
      const lab = SS.el('div', 'a3', lp, l);
      Object.assign(lab.style, { left: '60px', top: top + 'px', fontSize: '32px', fontWeight: 650, color: '#4A5F73' });
      const box = SS.el('div', 'a3', lp);
      Object.assign(box.style, { left: '60px', top: top + 44 + 'px', width: '780px', height: '78px', borderRadius: '18px', background: '#fff', boxShadow: 'inset 0 0 0 2px #D9E5F0',
        display: 'flex', alignItems: 'center', padding: '0 26px', boxSizing: 'border-box', fontSize: '42px', fontWeight: 650, color: C.ink, whiteSpace: 'pre' });
      const tx = SS.el('span', '', box), ca = SS.el('span', '', box);
      Object.assign(ca.style, { width: '4px', height: '44px', marginLeft: '3px', background: AG, opacity: 0 });
      SS.typer(tx, [{ at: T.f[k], dur: 0.1 + v.length * 0.012, to: v }], ca);
    });
    const send = SS.el('div', 'a3', lp);
    Object.assign(send.style, { left: '30px', top: '740px', width: '840px', height: '110px', borderRadius: '55px', background: AG, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '42px', fontWeight: 760 });
    send.textContent = 'Envoyer';
    SS.tapAt(lp, send, 540, 795, T.tap, { press: 0.96 });
    SS.cue(T.tap, 'send');
    const top4 = SS.el('div', 'layer', L4);
    SS.tintScrim(top4, 640);
    const H4 = SS.proofHead(top4, 'Un acheteur\n*vous* *écrit.*', 'Pendant ce temps…');
    SS.wordsIn(H4.k, T.kick, { st: 0.05, dur: 0.5 });
    SS.wordsIn(H4.h, T.head, { st: 0.07, dur: 0.6 });
    SS.cue(T.head, 'line');
    // the page goes up in one block while the phone comes up behind it: one continuous push
    SS.tl.fromTo(L4, { y: 0 }, { y: -1500, duration: 0.42, ease: SS.EZ.inOut }, T.up);
    SS.cue(T.up, 'slide');

    // ================================================================ scenes 5–6: the broker's phone
    const L5 = SS.proofLayer(stage, 2);
    const s5 = SS.subWorld(L5, { y: 1050, s: 1 });
    const box = SS.el('div', 'a3', s5.w); // rises with the phone, shakes with the haptic
    gsap.set(box, { y: 1500 });
    SS.tl.fromTo(box, { y: 1500 }, { y: 0, duration: 0.42, ease: SS.EZ.inOut }, T.phone); // same push as the page
    SS.cue(T.phone, 'phone');
    const ph = SS.phone(box, { date: 'vendredi 16 octobre', time: '13:04' });
    SS.place(ph.el, 540, PH.top + 850);
    // notification
    const note = SS.el('div', 'a3', box);
    Object.assign(note.style, { width: NOTE.w + 'px', height: NOTE.h + 'px', borderRadius: '40px', background: '#fff', boxShadow: SS.SH.note });
    const nc = SS.el('div', 'a3', note);
    Object.assign(nc.style, { left: 0, top: 0, width: NOTE.w + 'px', height: NOTE.h + 'px' });
    SS.noteHead(nc);
    nc.insertAdjacentHTML('beforeend', `<div style="position:absolute;left:30px;top:92px;font-size:44px;font-weight:800;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">Nouveau lead acheteur</div>
      <div style="position:absolute;left:30px;top:160px;font-size:38px;font-weight:650;color:${C.ink2};white-space:nowrap">Acheteur · Longueuil · Achat</div>
      <div style="position:absolute;left:30px;top:234px;display:flex;align-items:center;gap:12px;font-size:34px;font-weight:720;color:${C.green};white-space:nowrap"><span class="ck" style="width:38px;height:38px;display:block"></span>Ajouté à votre CRM</div>`);
    const chk = SS.check(nc.querySelector('.ck'), 38, C.green);
    const glow = SS.el('div', 'a3', box);
    Object.assign(glow.style, { width: NOTE.w + 16 + 'px', height: NOTE.h + 16 + 'px', borderRadius: '46px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 60px 10px rgba(43,191,179,.35)` });
    box.insertBefore(glow, note);
    SS.place(glow, 540, NOTE.y, { autoAlpha: 0, scale: 0.96 });
    SS.place(note, 540, NOTE.y - 170, { autoAlpha: 0, scale: 0.9 });
    SS.tl.fromTo(note, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1, ease: 'power1.out' }, T.note);
    SS.tl.fromTo(note, { y: NOTE.y - 170, scale: 0.9 }, { y: NOTE.y, scale: 1, duration: 0.5, ease: SS.EZ.pop12 }, T.note);
    SS.tl.fromTo(glow, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: SS.EZ.pop }, T.note + 0.18);
    const P = { chk: 0, shake: 0 };
    SS.tl.fromTo(P, { chk: 0 }, { chk: 1, duration: 0.5, ease: 'none' }, T.chk); // check.set() eases internally
    SS.tl.fromTo(P, { shake: 0 }, { shake: 1, duration: 0.42, ease: 'none' }, T.note + 0.08);
    SS.cue(T.freeze, 'freeze'); SS.cue(T.note, 'notify'); SS.cue(T.note + 0.08, 'haptic'); SS.cue(T.chk, 'check');
    s5.cam.to(T.cam5, 0.52, SS.EZ.cam, { s: 1.1 });

    // tap → the CRM opens out of the notification (inside the phone screen)
    SS.tapAt(box, note, 400, NOTE.y + 10, T.tap2);
    const SCR = { l: 540 - 410 + 18, t: PH.top + 18, w: 784, h: 1664 };
    const crm = SS.el('div', 'a3', ph.scr);
    Object.assign(crm.style, { left: 0, top: 0, width: SCR.w + 'px', height: SCR.h + 'px', background: '#F3F8F7' });
    const nTop = NOTE.y - NOTE.h / 2 - SCR.t, nLeft = 540 - NOTE.w / 2 - SCR.l;
    const crmClip = SS.clipR(nTop, SCR.w - nLeft - NOTE.w, SCR.h - nTop - NOTE.h, nLeft, 40);
    gsap.set(crm, { autoAlpha: 0, clipPath: crmClip });
    SS.tl.set(crm, { autoAlpha: 1 }, T.crm);
    SS.tl.fromTo(crm, { clipPath: crmClip }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 0.45, ease: SS.EZ.inOut }, T.crm);
    // the notification empties and takes the app's colour, then steps aside (no content seen through it)
    SS.tl.fromTo(nc, { y: 0, autoAlpha: 1 }, { y: -24, autoAlpha: 0, duration: 0.14, ease: SS.EZ.in }, T.crm - 0.02);
    SS.tl.fromTo(note, { backgroundColor: '#ffffff' }, { backgroundColor: '#F3F8F7', duration: 0.16, ease: 'power1.inOut' }, T.crm);
    SS.tl.fromTo(glow, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.16, ease: 'power1.in' }, T.crm);
    SS.tl.set(note, { autoAlpha: 0 }, T.crm + 0.46);
    SS.cue(T.crm, 'crm');
    crm.innerHTML = `<div class="hd" style="position:absolute;left:40px;top:96px;font-size:52px;font-weight:800;letter-spacing:-.03em;color:${C.ink}">Contacts</div>
      <div class="hd" style="position:absolute;left:40px;top:166px;font-size:30px;font-weight:600;color:${C.soft}">Votre CRM</div>`;
    const ROW = { top: 240, h: 132, pitch: 148, w: 724 };
    const rows = [['Acheteur · Longueuil', 'Achat · aujourd’hui, 13 h 04', true], ['Vendeur · Brossard', 'Suivi · jeudi'], ['Acheteur · Saint-Lambert', 'Visite · mercredi'], ['Vendeur · Boucherville', 'Suivi · mardi']]
      .map(([ti, su, isNew]) => {
        const el = SS.el('div', 'a3', crm);
        Object.assign(el.style, { left: '30px', top: ROW.top + 'px', width: ROW.w + 'px', height: ROW.h + 'px', borderRadius: '26px', background: '#fff', boxShadow: SS.SH.card });
        el.innerHTML = `<div style="position:absolute;left:24px;top:30px;width:72px;height:72px">${SS.icon.person(isNew ? C.green : '#8FA9A5', isNew ? C.mint : '#EDF3F2')}</div>
          <div style="position:absolute;left:120px;top:22px;font-size:38px;font-weight:740;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">${ti}</div>
          <div style="position:absolute;left:120px;top:76px;font-size:30px;font-weight:560;color:${C.soft};white-space:nowrap">${su}</div>`;
        return el;
      });
    const hds = [...crm.querySelectorAll('.hd')];
    gsap.set(hds, { yPercent: 40, autoAlpha: 0 });
    SS.tl.fromTo(hds, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: SS.EZ.out, stagger: 0.05 }, T.rows);
    rows.slice(1).forEach((el, k) => {
      gsap.set(el, { y: k * ROW.pitch, yPercent: 30, autoAlpha: 0 });
      SS.tl.fromTo(el, { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: SS.EZ.out }, T.rows + 0.05 + k * 0.05);
      SS.tl.fromTo(el, { y: k * ROW.pitch }, { y: (k + 1) * ROW.pitch, duration: 0.42, ease: SS.EZ.dock }, T.shift + k * 0.04);
    });
    gsap.set(rows[0], { y: -60, autoAlpha: 0, scale: 0.94 });
    SS.tl.fromTo(rows[0], { y: -60, autoAlpha: 0, scale: 0.94 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.45, ease: SS.EZ.dock }, T.row);
    const halo = SS.el('div', 'a3', crm);
    Object.assign(halo.style, { left: '22px', top: ROW.top - 8 + 'px', width: ROW.w + 16 + 'px', height: ROW.h + 16 + 'px', borderRadius: '32px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 40px 4px rgba(43,191,179,.35)` });
    gsap.set(halo, { autoAlpha: 0, scale: 1.04 });
    SS.tl.fromTo(halo, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: SS.EZ.pop }, T.halo);
    const pill = SS.el('div', 'a3', rows[0]);
    Object.assign(pill.style, { left: 'auto', right: '24px', top: '42px', height: '48px', padding: '0 20px', borderRadius: '24px', background: C.green, color: '#fff', fontSize: '30px', fontWeight: 760, display: 'flex', alignItems: 'center' });
    pill.textContent = 'Nouveau';
    gsap.set(pill, { scale: 0, autoAlpha: 0 });
    SS.tl.fromTo(pill, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.42, ease: SS.EZ.pop }, T.nouveau);
    SS.cue(T.row, 'row'); SS.cue(T.nouveau, 'nouveau');
    s5.cam.to(T.crm, 0.75, SS.EZ.cam, { y: 1100, s: 1.12 });
    // where the 17 h card blooms from: the « Nouveau » pill, on screen at the end of the scene
    // (computed from the layout: the pill and its row are still transformed at build time)
    const pr = { x: SCR.l + 30 + ROW.w - 24 - pill.offsetWidth / 2, y: SCR.t + ROW.top + 42 + 24 };
    SS.FOCUS13 = SS.toScreen({ x: 540, y: 1100, s: 1.12, r: 0 }, pr.x, pr.y);

    // headlines
    const top5 = SS.el('div', 'layer', L5);
    SS.tintScrim(top5, 640);
    const sc5 = SS.scrims[SS.scrims.length - 1];
    gsap.set(sc5, { autoAlpha: 0 });
    SS.tl.fromTo(sc5, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power1.out' }, T.up + 0.2); // the veil comes with the phone
    const h5 = SS.head(top5, 'Le lead\n*arrive.*', 420);
    SS.wordsIn(h5, T.head5, { st: 0.07, dur: 0.6 });
    SS.wordsOut(h5, T.head5out, { st: 0.02 });
    const h6 = SS.head(top5, 'Déjà dans\n*votre* *CRM.*', 420);
    SS.wordsIn(h6, T.head6, { st: 0.07, dur: 0.6 });
    SS.cue(T.head5, 'line'); SS.cue(T.head6, 'line');

    R = { L4, s4, L5, s5, box, P, chk };
  }

  function render() {
    card.render(); R.s4.apply(); R.s5.apply();
    const k = R.P.shake;
    const dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.box.style.translate = `${dx.toFixed(2)}px 0px`;
    R.chk.set(R.P.chk);
  }
  const scene = { name: 'treize-heures', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => {
    build(stage);
    scene.ranges = [[card.layer, card.range[0], card.range[1]], [card.node, T.bloom - 0.25, T.bloom + 0.5], [R.L4, T.exit - 0.1, T.up + 0.55], [R.L5, T.phone - 0.05, T.end + 0.4]];
  };
  SS.scenes.push(scene);
})();
