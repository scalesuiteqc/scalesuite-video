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
    // 1 · hook (0–4.0): one evolving frame; poster (frame 0 of the master) at 3.2
    roll: 1.0, h1b: 1.3, lue: 1.8, cost: 2.4, clockOut: 3.95, bloom: 4.0,
    // 2 · reveal (4.0–7.5)
    logo: 4.15, nouveau: 4.4, w1: 4.7, w2: 4.95, w3: 5.2, w4: 5.4, pour: 5.7, nameOut: 7.2, revealOut: 7.5,
    // 3 · the system at work, one camera (7.5–19.4)
    phone: 7.5, tick13: 7.9, texto: 8.3,
    toTeam: 10.5, h3b: 10.65, fil3: 10.8, alert3: 11.0, ticks: 12.5, h3c: 12.5, relance: 13.05, shift: 13.08, route: 13.15, leader: 13.4,
    toSuivi: 14.7, h3d: 14.8, dateMode: 14.8, ribbon: 14.95, dateRoll: 15.1,
    pile: 16.7, check0: 16.85, full: 17.65,
    // 4 · proof (19.4–21.9)
    proof: 19.4, count: 19.75, seule: 20.3, proofOut: 21.85,
    // 5 · guarantee and scarcity (21.9–25.4)
    risk: 22.0, contrat: 22.35, partage: 22.55, seal: 22.5, rare: 23.3, riskOut: 25.35,
    // 6 · end (25.4–31.0)
    th1: 25.5, th2: 25.8, merge: 27.5, endLogo: 27.7, name: 27.85, cta: 28.0, url: 28.15, sheen: 29.2, end: 31.0,
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


  // Headlines enter by a short rise with a fade (no word is ever cut by a visible mask): the mask boxes move.
  SS.rise = (T, at, out, o = {}) => {
    const ms = T.words.map((w) => w.m);
    gsap.set(T.words.map((w) => w.el), { yPercent: 0 });
    gsap.set(ms, { autoAlpha: 0, y: 24 });
    SS.tl.fromTo(ms, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: o.dur || 0.4, stagger: o.st == null ? 0.05 : o.st, ease: SS.EZ.out }, at);
    if (out != null) SS.tl.fromTo(ms, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -16, duration: 0.25, stagger: 0.015, ease: SS.EZ.in }, out);
  };
  SS.riseOne = (T, i, at) => { // one word of a headline (the product's name, word by word)
    const m = T.words[i].m;
    SS.tl.fromTo(m, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: SS.EZ.out }, at);
  };
  // Logos stay fully opaque (a logo once rasterised at partial opacity keeps a slightly different
  // anti-aliasing); a flat cover in the background colour fades away over it instead.
  SS.logoCover = (parent, x, y, w, h, at, out) => {
    const c = SS.el('div', 'a3', parent);
    Object.assign(c.style, { width: w + 40 + 'px', height: h + 40 + 'px', background: SS.M.bg });
    SS.place(c, x, y);
    SS.tl.fromTo(c, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.35, ease: 'power1.out' }, at);
    if (out != null) SS.tl.fromTo(c, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: 'power1.in' }, out);
    return c;
  };
  SS.riseEl = (el, at, out, o = {}) => { // any element: rise + fade in, fade up out
    // The offset is a margin, not a transform: Chrome repaints it at every frame instead of moving a cached
    // raster, so the settled picture never depends on the frames rendered before it.
    gsap.set(el, { autoAlpha: 0, marginTop: 24 });
    SS.tl.fromTo(el, { autoAlpha: 0, marginTop: 24 }, { autoAlpha: 1, marginTop: 0, duration: o.dur || 0.4, ease: SS.EZ.out }, at);
    if (out != null) SS.tl.fromTo(el, { autoAlpha: 1, marginTop: 0 }, { autoAlpha: 0, marginTop: -16, duration: 0.25, ease: SS.EZ.in }, out);
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
  SS.STACK = ['Campagne Google Vendeurs', 'Réponse 60 secondes', 'Le bon courtier alerté', 'Relance après 10 minutes', 'Suivi 90 jours'];
  SS.PCARD = { w: 900, headH: 160, rowH: 130 };
  SS.PCARD.h = SS.PCARD.headH + 5 * SS.PCARD.rowH + 26;
  SS.productCard = (parent) => {
    const M = SS.M, PC = SS.PCARD, rowH = PC.rowH;
    const el = SS.el('div', 'sy-card', parent);
    Object.assign(el.style, { width: PC.w + 'px', height: PC.h + 'px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    const head = SS.el('div', '', el);
    Object.assign(head.style, { position: 'absolute', left: '40px', top: '0px', height: PC.headH + 'px', display: 'flex', alignItems: 'center', gap: '20px', whiteSpace: 'nowrap' });
    const mk = SS.el('span', '', head);
    Object.assign(mk.style, { position: 'relative', width: '62px', height: '68px', display: 'block', flex: 'none' });
    const lg = SS.logo(mk, 68, { word: false });
    lg.el.style.left = '0px'; lg.el.style.top = '0px'; lg.mark(1);
    const ht = SS.el('span', '', head);
    Object.assign(ht.style, { fontSize: '47px', fontWeight: 800, letterSpacing: '-.035em', color: M.ink });
    ht.innerHTML = 'Le Système Vendeurs 5&nbsp;minutes';
    const div = SS.el('div', '', el);
    Object.assign(div.style, { position: 'absolute', left: '22px', right: '22px', top: PC.headH + 'px', height: '2px', background: '#E6EFED' });
    const rows = SS.STACK.map((n, i) => {
      const r = SS.el('div', '', el);
      Object.assign(r.style, { position: 'absolute', left: '0px', top: PC.headH + 8 + i * rowH + 'px', width: PC.w + 'px', height: rowH + 'px' });
      r.innerHTML = `<span class="ring" style="position:absolute;left:40px;top:${(rowH - 68) / 2}px;width:68px;height:68px;border-radius:50%;box-sizing:border-box;border:5px solid #C4D6D3"></span>
        <span class="ck" style="position:absolute;left:40px;top:${(rowH - 68) / 2}px;width:68px;height:68px"></span>
        <div class="sk" style="position:absolute;left:136px;top:${rowH / 2 - 11}px;width:${[440, 380, 400, 460, 300][i]}px;height:22px;border-radius:11px;background:#E6EFED"></div>
        <div class="tx" style="position:absolute;left:136px;top:0;height:${rowH}px;display:flex;align-items:center;font-size:52px;font-weight:780;letter-spacing:-.03em;color:${M.ink};white-space:nowrap">${n}</div>`;
      const chk = SS.check(r.querySelector('.ck'), 68, M.teal);
      const k = { k: 0 };
      SS.proc(() => chk.set(k.k));
      return { el: r, k, tx: r.querySelector('.tx'), sk: r.querySelector('.sk') };
    });
    return { el, head, rows, h: PC.h };
  };

  // Product label in the site's style: « Système Vendeurs 5 minutes » (no step number)
  SS.stepLabel = (parent) => {
    const M = SS.M;
    const el = SS.el('div', 'a3', parent);
    Object.assign(el.style, { height: '68px', padding: '0 30px', borderRadius: '34px', background: M.band, color: M.teal, fontSize: '36px', fontWeight: 760,
      letterSpacing: '-.015em', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' });
    el.textContent = 'Système Vendeurs 5 minutes';
    return el;
  };
})();
