/* « Système Vendeurs 5 minutes » : shared timing, palettes and components.
   The whole film's timing lives in SS.ST (one place), checked against brag-output/storyboard-systeme.md.
   The film's single visual thread is the clock (SS.CLK, built in 01-fonds): it is born from the hook's
   headline, jumps hours in the problem world, rewinds, blooms into the mint world and then advances
   minute by minute, each minute triggering one action. */
(function () {
  const SS = window.SS;

  // ---- Real scarcity (scalesuiteqc.ca/fr): change here, then ./build-systeme.sh final. No date, no countdown.
  SS.OFFRE = { equipesParMois: 3, placesFondatrices: 3 };

  SS.ST = {
    // 1 · hook (0–3.5): readable at t = 0; poster (frame 0 of the master) at 3.0
    roll: 1.9, h1b: 2.3, lue: 2.6, hookOut: 3.5,
    // 2 · cost (3.5–6.0)
    cost: 3.55, sag: 3.7, rewind: 5.45, bloom: 5.95,
    // 3 · reveal (6.0–10.1)
    logo: 6.1, nouveau: 6.25, w1: 6.6, w2: 6.9, w3: 7.2, w4: 7.4, pour: 7.7, toCard: 10.1,
    // 4 · the stack (10.1–25.0): sheet (card view) in/out, then one demo per component
    dock1: 10.5, out1: 10.8,
    c1: 10.8, tap1: 11.05, page1: 11.12, send1: 12.05, tok1: 12.3,
    in2: 12.8, out2: 13.3, c2: 13.3, tick13: 13.45, texto: 13.8,
    in3: 16.0, out3: 16.5, c3: 16.5, fil3: 16.6, alert3: 16.95,
    in4: 18.1, out4: 18.6, c4: 18.6, ticks: 18.7, relance: 19.35, shift: 19.4, route: 19.52, leader: 19.75,
    in5: 21.1, out5: 21.6, c5: 21.6, dateMode: 21.7, ribbon: 21.8, dateRoll: 22.1,
    in6: 23.25, full: 23.5,
    // 5 · proof (25.0–27.8)
    proof: 25.0, count: 25.25, seule: 25.9, proofOut: 27.72,
    // 6 · risk reversed (27.8–31.4)
    risk: 27.85, seal: 28.3, contrat: 28.8, partage: 29.3, riskOut: 31.35,
    // 7 · scarcity (31.4–33.8)
    rare: 31.45, places: 31.75, reste: 32.0, rareOut: 33.75,
    // 8 · end (33.8–40.0)
    th1: 33.85, th2: 34.35, meet: 34.55, thOut: 35.8, merge: 35.85, endMark: 36.15, endLetters: 36.3, name: 36.35,
    cta: 36.6, url: 36.9, sheen: 38.0, end: 40.0,
  };

  // Problem world (from « Le lead perdu ») and the site identity (design-dna-systeme.json).
  SS.P = { bg: '#EEF1F4', card: '#FAFBFC', ink: '#2B3138', soft: '#6B7480', slate: '#6E8092', line: '#E3E8ED',
    avFg: '#8796A6', avBg: '#E1E6EB', link: '#3F5F86', skel: '#E3E8ED' };
  SS.M = { bg: '#F0FFFC', bg2: '#E7F8F5', band: '#E2F6F6', card: '#FFFFFF', ink: '#151515', soft: '#596563', faint: '#94A09E',
    line: '#D8E3E1', teal: '#0F7B6F', turq: '#2BBFB3', link: '#1F5FAD', team: '#2F5D8C' };
  SS.SHADOW = {
    p: '0 1px 2px rgba(30,40,52,.07), 0 14px 34px -14px rgba(40,56,74,.26), 0 0 0 1px rgba(30,40,52,.05)',
    pHi: '0 2px 4px rgba(30,40,52,.08), 0 30px 60px -26px rgba(40,56,74,.38), 0 0 0 1px rgba(30,40,52,.05)',
    m: '0 1px 2px rgba(18,44,40,.05), 0 16px 40px -18px rgba(18,74,66,.22), 0 0 0 1px rgba(21,21,21,.045)',
    mHi: '0 2px 4px rgba(18,44,40,.07), 0 40px 80px -34px rgba(18,74,66,.34), 0 0 0 1px rgba(21,21,21,.05)',
  };
  SS.clipR = (t, r, b, l, rad) => `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px)`;
  SS.OPEN = SS.clipR(-80, -80, -80, -80, 114); // fully open, shadow included
  SS.TRACK = -0.045; // headline tracking (site: tight grotesque)

  // Headline in the site style: ink, second segment in deep teal (plain colour, never a gradient).
  SS.head = (layer, src, o = {}) => SS.text(layer, src, Object.assign({ size: 112, maxW: 960, tracking: SS.TRACK, color: SS.M.ink, accent: SS.M.teal }, o));
  SS.headP = (layer, src, o = {}) => SS.text(layer, src, Object.assign({ size: 112, maxW: 960, tracking: SS.TRACK, color: SS.P.ink, accent: SS.P.slate }, o));
  SS.say = (T, at, out, o = {}) => { // standard in/out of a masked headline
    SS.hideWords(T);
    SS.wordsIn(T, at, { st: o.st == null ? 0.06 : o.st, dur: o.dur });
    if (out != null) SS.wordsOut(T, out, { st: 0.02 });
  };

  // Tap ripple
  SS.ripple = (parent, color) => {
    const r = SS.el('div', 'a3', parent);
    Object.assign(r.style, { width: '170px', height: '170px', borderRadius: '50%', background: color.fill, boxShadow: `inset 0 0 0 4px ${color.ring}` });
    return r;
  };
  SS.tap = (r, x, y, at) => {
    SS.place(r, x, y, { scale: 0.15, autoAlpha: 0 });
    SS.tl.fromTo(r, { scale: 0.15, autoAlpha: 0.95 }, { scale: 1.5, autoAlpha: 0, duration: 0.55, ease: SS.EZ.out }, at);
  };
  SS.scrimTo = (parent, h, rgb) => {
    const sc = SS.el('div', 'a3', parent);
    Object.assign(sc.style, { width: '1080px', height: h + 'px',
      background: `linear-gradient(180deg, rgb(${rgb}) 0%, rgb(${rgb}) 64%, rgba(${rgb},.85) 78%, rgba(${rgb},0) 100%)` });
    return sc;
  };

  // A rolling value in a fixed window: column of lines, GSAP tweens its yPercent (index-based).
  SS.roller = (parent, values, o = {}) => {
    const win = SS.el('span', '', parent);
    Object.assign(win.style, { display: 'inline-block', overflow: 'hidden', height: o.h + 'px', verticalAlign: 'top' });
    const col = SS.el('span', '', win);
    Object.assign(col.style, { display: 'flex', flexDirection: 'column' });
    values.forEach((v) => {
      const d = SS.el('span', '', col);
      Object.assign(d.style, { display: 'block', height: o.h + 'px', lineHeight: o.h + 'px', whiteSpace: 'nowrap', textAlign: o.align || 'right' });
      d.textContent = v;
    });
    const step = 100 / values.length;
    let cur = o.start || 0;
    gsap.set(col, { yPercent: -step * cur });
    return {
      win, col,
      to(at, i, dur = 0.4, ease = SS.EZ.inOut) {
        SS.tl.fromTo(col, { yPercent: -step * cur }, { yPercent: -step * i, duration: dur, ease }, at);
        cur = i;
      },
    };
  };

  // Two stacked labels in one masked slot (state swap without overshoot): {el, a, b, swap(at, back)}
  SS.swapSlot = (parent, htmlA, htmlB, o = {}) => {
    const el = SS.el('div', '', parent);
    Object.assign(el.style, { position: 'relative', overflow: 'hidden', height: o.h + 'px', width: o.w + 'px', flex: 'none' });
    const mk = (html) => {
      const d = SS.el('div', '', el);
      Object.assign(d.style, { position: 'absolute', left: o.align === 'right' ? 'auto' : '0px', right: o.align === 'right' ? '0px' : 'auto', top: '0px', height: o.h + 'px', display: 'flex', alignItems: 'center' });
      d.innerHTML = html;
      return d;
    };
    const a = mk(htmlA), b = mk(htmlB);
    gsap.set(b, { yPercent: 110 });
    let state = 0;
    return {
      el, a, b,
      swap(at, dur = 0.42) {
        const [x, y] = state ? [b, a] : [a, b];
        SS.tl.fromTo(x, { yPercent: 0 }, { yPercent: -110, duration: dur * 0.6, ease: SS.EZ.in }, at);
        SS.tl.fromTo(y, { yPercent: 110 }, { yPercent: 0, duration: dur, ease: SS.EZ.out }, at + dur * 0.25);
        state = 1 - state;
      },
    };
  };

  // ---- The team card « Votre équipe » (list: Leader + Courtier 01–05). Geometry factory: the hook uses
  // top 770, the stack top 720; rows of 80 in both.
  SS.teamGeo = (top, rowH = 80) => {
    const T = { top, w: 900, headH: 96, rowH, gapL: 12, subH: 84 };
    T.rows0 = T.top + T.headH + 8;
    // centre y of row i (0 = Leader, 1–5 = Courtier 01–05) given open subcards {L, C3}
    T.rowY = (i, ins = {}) => T.rows0 + T.rowH / 2 + i * T.rowH + (i >= 1 ? T.gapL : 0)
      + (ins.L && i >= 1 ? T.subH : 0) + (ins.C3 && i >= 4 ? T.subH : 0);
    T.subY = (i, ins = {}) => T.rowY(i, ins) + T.rowH / 2 + 4 + 38;
    T.h = (ins = {}) => T.headH + 8 + 6 * T.rowH + T.gapL + ((ins.L ? 1 : 0) + (ins.C3 ? 1 : 0)) * T.subH + 18;
    return T;
  };

  SS.teamCard = (parent, world, TEAM) => {
    const K = world === 'P' ? SS.P : SS.M;
    const card = SS.el('div', 'sy-card', parent);
    Object.assign(card.style, { width: TEAM.w + 'px', height: TEAM.h() + 'px', background: world === 'P' ? SS.P.card : '#fff', boxShadow: world === 'P' ? SS.SHADOW.pHi : SS.SHADOW.mHi });
    gsap.set(card, { x: 90, y: TEAM.top });
    const head = SS.el('div', 'a3', parent);
    head.innerHTML = `<div style="position:absolute;left:36px;top:26px;font-size:36px;font-weight:760;letter-spacing:-.02em;color:${K.ink};white-space:nowrap">Votre équipe<span style="font-weight:560;color:${K.soft}"> · Équipe Gagnon</span></div>
      <div style="position:absolute;left:22px;width:856px;top:${TEAM.headH}px;height:2px;background:${world === 'P' ? SS.P.line : '#E6EFED'}"></div>`;
    gsap.set(head, { x: 90, y: TEAM.top });
    const avFg = world === 'P' ? SS.P.avFg : SS.M.teal, avBg = world === 'P' ? SS.P.avBg : SS.M.band;
    const names = ['Leader', 'Courtier 01', 'Courtier 02', 'Courtier 03', 'Courtier 04', 'Courtier 05'];
    const rows = names.map((n, i) => {
      const el = SS.el('div', 'sy-row', parent);
      Object.assign(el.style, { width: '864px', height: TEAM.rowH + 'px', padding: '0 22px', gap: '20px', borderRadius: '20px' });
      el.dataset.row = i;
      el.innerHTML = `<span style="width:60px;height:60px;flex:none">${SS.icon.person(avFg, avBg)}</span>
        <span style="font-size:42px;font-weight:730;letter-spacing:-.02em;color:${K.ink};flex:none">${n}</span><span class="st" style="margin-left:auto;display:flex;align-items:center"></span>`;
      SS.place(el, 540, TEAM.rowY(i));
      return el;
    });
    // leader's role, skeleton line 2 for the others
    rows[0].querySelector('.st').innerHTML = `<span style="font-size:32px;font-weight:600;color:${K.soft}">Responsable de l'équipe</span>`;
    [1, 2, 4, 5].forEach((i) => { rows[i].querySelector('.st').innerHTML = `<span style="display:block;width:${[210, 170, 0, 190, 150][i - 1]}px;height:14px;border-radius:7px;background:${world === 'P' ? SS.P.skel : '#E6EEEC'}"></span>`; });
    const sep = SS.el('div', 'a3', parent); // thin divider under the leader row
    Object.assign(sep.style, { width: '856px', height: '2px', background: world === 'P' ? SS.P.line : '#E6EFED' });
    SS.place(sep, 540, TEAM.rowY(0) + TEAM.rowH / 2 + TEAM.gapL / 2);
    return { card, head, rows, sep, K };
  };

  // Alert sub-card under a row: 800 × 76, accent bar, label, optional right status slot.
  SS.subCard = (parent, world, html, o = {}) => {
    const K = world === 'P' ? SS.P : SS.M;
    const el = SS.el('div', 'sy-row', parent);
    Object.assign(el.style, { width: '800px', height: '76px', padding: '0 20px 0 30px', gap: '16px', borderRadius: '20px',
      background: world === 'P' ? '#fff' : '#fff', boxShadow: world === 'P' ? SS.SHADOW.p : SS.SHADOW.m, overflow: 'hidden' });
    el.innerHTML = `<span class="bar" style="position:absolute;left:0;top:0;bottom:0;width:8px;background:${world === 'P' ? SS.P.slate : SS.M.turq}"></span>
      <span class="lb" style="position:relative;height:76px;flex:1;overflow:hidden"></span><span class="rs" style="display:flex;align-items:center"></span>`;
    const lb = el.querySelector('.lb');
    const label = (h) => {
      const d = SS.el('div', '', lb);
      Object.assign(d.style, { position: 'absolute', left: '0px', top: '0px', height: '76px', display: 'flex', alignItems: 'center', fontSize: '32px', fontWeight: 720, letterSpacing: '-.015em', color: K.ink, whiteSpace: 'nowrap' });
      d.innerHTML = h;
      return d;
    };
    const labels = [label(html)];
    [].concat(o.alt || []).forEach((h) => { const d = label(h); gsap.set(d, { yPercent: 110 }); labels.push(d); });
    return { el, labels, rs: el.querySelector('.rs'), bar: el.querySelector('.bar') };
  };

  // The lead token: ink pill (dark contrast is reserved for it).
  SS.TOKEN = { w: 500, h: 100 };
  SS.token = (parent) => {
    const el = SS.el('div', 'a3 sy-token', parent);
    Object.assign(el.style, { width: SS.TOKEN.w + 'px', height: SS.TOKEN.h + 'px', justifyContent: 'center' });
    el.innerHTML = '<span class="dt"></span><span class="tx">DEMANDE VENDEUR</span>';
    return el;
  };

  // The team's mobile page (fictitious team colour) with the seller's form.
  SS.PAGE = { w: 900, h: 760 };
  SS.teamPage = (parent, world, o = {}) => {
    const K = world === 'P' ? SS.P : SS.M;
    const el = SS.el('div', 'sy-card', parent);
    Object.assign(el.style, { width: SS.PAGE.w + 'px', height: SS.PAGE.h + 'px', background: '#fff', overflow: 'hidden', boxShadow: world === 'P' ? SS.SHADOW.pHi : SS.SHADOW.mHi });
    const field = (lab, val, top, cls) => `<div style="position:absolute;left:44px;top:${top}px;font-size:30px;font-weight:650;color:${K.soft}">${lab}</div>
      <div style="position:absolute;left:44px;right:44px;top:${top + 44}px;height:92px;border-radius:18px;box-shadow:inset 0 0 0 2px ${world === 'P' ? '#D5DBE1' : '#C4D6D3'};display:flex;align-items:center;padding:0 28px;font-size:40px;font-weight:600;color:${K.ink};letter-spacing:-.01em">
        <span class="${cls || ''}" style="white-space:nowrap">${val}</span>${cls ? '<span class="caret" style="display:inline-block;width:3px;height:44px;margin-left:3px;background:' + K.ink + ';opacity:0"></span>' : ''}</div>`;
    el.innerHTML = `<div class="ct" style="position:absolute;inset:0">
      <div style="position:absolute;left:0;right:0;top:0;height:112px;background:${SS.M.team};display:flex;align-items:center;gap:18px;padding:0 44px;color:#fff;font-size:38px;font-weight:780;letter-spacing:-.02em">
        <span style="width:58px;height:58px;border-radius:16px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">EG</span>Équipe Gagnon</div>
      <div style="position:absolute;left:44px;top:150px;font-size:52px;font-weight:800;letter-spacing:-.035em;color:${K.ink};white-space:nowrap">Vendre votre maison à Longueuil</div>
      ${field('Votre propriété', 'Maison · Longueuil', 252)}
      ${field('Votre cellulaire', o.typed ? '' : '514 555 0187', 412, o.typed ? 'ty' : '')}
      <div class="send" style="position:absolute;left:44px;right:44px;top:600px;height:112px;border-radius:24px;background:${SS.M.team};color:#fff;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:760;letter-spacing:-.01em">Envoyer</div></div>`;
    return { el, ct: el.querySelector('.ct'), ty: el.querySelector('.ty'), caret: el.querySelector('.caret'), send: el.querySelector('.send') };
  };

  // Sponsored Google result, 900 × 250 (label « Commandité », fr-CA; fictitious domain, no hyphen).
  SS.adCard = (parent, world) => {
    const K = world === 'P' ? SS.P : SS.M;
    const el = SS.el('div', 'sy-card', parent);
    Object.assign(el.style, { width: '900px', height: '250px', borderRadius: '28px', background: '#fff', padding: '34px 40px', boxShadow: world === 'P' ? SS.SHADOW.p : SS.SHADOW.m });
    el.innerHTML = `<div class="ct"><div style="font-size:32px;font-weight:760;color:${K.ink};white-space:nowrap">Commandité<span style="font-weight:520;color:${K.soft}"> · exemple.ca</span></div>
      <div style="margin-top:14px;font-size:46px;font-weight:650;letter-spacing:-.02em;color:${world === 'P' ? SS.P.link : SS.M.link};white-space:nowrap">Vendre votre maison à Longueuil</div>
      <div style="margin-top:26px;width:74%;height:14px;border-radius:7px;background:${world === 'P' ? SS.P.skel : '#E6EEEC'}"></div></div>`;
    return { el, ct: el.querySelector('.ct') };
  };

  // ---- The product card « Le Système Vendeurs 5 minutes »: header + five named lines, each checked in turn.
  SS.STACK = [
    ['Campagne Google Vendeurs', 'et une page aux couleurs de votre équipe'],
    ['Réponse 60 secondes', 'Un texto au vendeur dans la minute'],
    ['Le bon courtier alerté', 'La demande va direct au bon courtier'],
    ['Relance après 10 minutes', "Si personne n'a rappelé, l'équipe est relancée"],
    ['Suivi 90 jours', 'Les vendeurs pas encore prêts'],
  ];
  SS.PCARD = { w: 900, headH: 150, rowH: 136 };
  SS.PCARD.h = SS.PCARD.headH + 5 * SS.PCARD.rowH + 26;
  SS.productCard = (parent, o = {}) => {
    const M = SS.M;
    const rowH = o.compact ? 96 : SS.PCARD.rowH;
    const PC = { w: SS.PCARD.w, headH: SS.PCARD.headH, h: SS.PCARD.headH + 5 * rowH + 26 };
    const el = SS.el('div', 'sy-card', parent);
    Object.assign(el.style, { width: PC.w + 'px', height: PC.h + 'px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    const head = SS.el('div', '', el);
    Object.assign(head.style, { position: 'absolute', left: '40px', top: '0px', height: PC.headH + 'px', display: 'flex', alignItems: 'center', gap: '20px', whiteSpace: 'nowrap' });
    const mk = SS.el('span', '', head);
    Object.assign(mk.style, { position: 'relative', width: '58px', height: '64px', display: 'block', flex: 'none' });
    const lg = SS.logo(mk, 64, { word: false });
    lg.el.style.left = '0px'; lg.el.style.top = '0px'; lg.mark(1);
    const ht = SS.el('span', '', head);
    Object.assign(ht.style, { fontSize: '46px', fontWeight: 800, letterSpacing: '-.035em', color: M.ink });
    ht.innerHTML = 'Le Système Vendeurs 5&nbsp;minutes';
    const div = SS.el('div', '', el);
    Object.assign(div.style, { position: 'absolute', left: '22px', right: '22px', top: PC.headH + 'px', height: '2px', background: '#E6EFED' });
    const rows = SS.STACK.map(([n, sub], i) => {
      const r = SS.el('div', '', el);
      Object.assign(r.style, { position: 'absolute', left: '0px', top: PC.headH + 8 + i * rowH + 'px', width: PC.w + 'px', height: rowH + 'px' });
      const ny = o.compact ? rowH / 2 - 26 : rowH / 2 - 46;
      r.innerHTML = `<span class="ring" style="position:absolute;left:40px;top:${(rowH - 60) / 2}px;width:60px;height:60px;border-radius:50%;box-sizing:border-box;border:4px solid #C4D6D3"></span>
        <span class="ck" style="position:absolute;left:40px;top:${(rowH - 60) / 2}px;width:60px;height:60px"></span>
        <div class="sk" style="position:absolute;left:128px;top:${rowH / 2 - 22}px"><div style="width:${[380, 330, 350, 400, 260][i]}px;height:18px;border-radius:9px;background:#E6EFED"></div>${o.compact ? '' : `<div style="margin-top:16px;width:${[460, 400, 420, 480, 330][i]}px;height:14px;border-radius:7px;background:#EEF4F3"></div>`}</div>
        <div class="tx" style="position:absolute;left:128px;top:0;width:740px;height:${rowH}px">
          <div style="position:absolute;left:0;top:${ny}px;font-size:42px;font-weight:760;letter-spacing:-.025em;color:${M.ink};white-space:nowrap">${n}</div>
          ${o.compact ? '' : `<div style="position:absolute;left:0;top:${rowH / 2 + 6}px;font-size:32px;font-weight:560;color:${M.soft};white-space:nowrap">${sub}</div>`}</div>`;
      const chk = SS.check(r.querySelector('.ck'), 60, M.teal);
      const k = { k: 0 };
      SS.proc(() => chk.set(k.k));
      return { el: r, k, tx: r.querySelector('.tx'), sk: r.querySelector('.sk') };
    });
    return { el, head, rows, h: PC.h };
  };

  // Step label in the site's style (« 1 sur 6 » + segmented bar): « Système Vendeurs 5 minutes · n sur 5 »
  SS.stepLabel = (parent, n) => {
    const M = SS.M;
    const el = SS.el('div', 'a3', parent);
    Object.assign(el.style, { width: '900px', height: '80px' });
    el.innerHTML = `<div style="display:flex;gap:10px">${[1, 2, 3, 4, 5].map((i) => `<span style="display:block;flex:1;height:8px;border-radius:4px;background:${i <= n ? M.turq : '#DCE8E6'}"></span>`).join('')}</div>
      <div style="margin-top:20px;text-align:center;font-size:36px;font-weight:760;letter-spacing:-.015em;color:${M.teal};white-space:nowrap">Système Vendeurs 5 minutes · ${n} sur 5</div>`;
    return el;
  };
})();
