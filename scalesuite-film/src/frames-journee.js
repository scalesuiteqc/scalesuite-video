/* « Une journée de courtier », plan v2: STILL key frames only (no timeline), to approve the
   compositions before any animation. frames-journee.html?f=1…10 builds one key frame at
   1080 × 1920 with the same components the animation will use (core-journee.js, logo, phone,
   sponsored result). Rendered by render/keyframes-journee.mjs (downscaled to 540 × 960). */
(function () {
  const SS = window.SS;
  const C = SS.C;
  const q = new URLSearchParams(location.search);
  const F = +q.get('f') || 1;

  const put = (el, x, y) => SS.place(el, x, y);
  const txt = (parent, src, x, y, o) => { const t = SS.text(parent, src, o); put(t.el, x, y); return t; };
  // kicker + headline of a product proof (screen space, y 200–580)
  function proofHead(layer, title, kicker = 'Pendant ce temps…') {
    if (kicker) txt(layer, kicker, 540, 262, { size: 64, weight: 700, color: C.turqText, tracking: -0.02 });
    const h = SS.text(layer, title, { size: 116, maxW: 940, lh: 1.04 });
    if (h.size < 116) console.warn(`[lisibilité] « ${title} » réduit à ${h.size} px`);
    put(h.el, 540, kicker ? 452 : 420);
  }
  // full-frame moment card: the broker's life (icon, hour ≥ 150 px, sentence > 80 px)
  function momentCard(stage, { icon, hour, line, warm }) {
    const card = SS.el('div', 'layer', stage);
    card.style.background = warm
      ? 'radial-gradient(130% 90% at 80% 95%, #F8EBD3 0%, #F1F7F1 45%, #E8F9F7 100%)'
      : 'radial-gradient(120% 80% at 50% 45%, #F1FCFA 0%, #E8F9F7 62%, #DDF5F1 100%)';
    const ic = SS.el('div', 'a3', card, SS.dayIcon[icon](C.turq));
    Object.assign(ic.style, { width: '300px', height: '300px' });
    ic.querySelector('svg').setAttribute('stroke-width', '1.25');
    put(ic, 540, 600);
    txt(card, hour, 540, 930, { size: 230, weight: 800, tracking: -0.045 });
    const s = SS.text(card, line, { size: 96, maxW: 940, lh: 1.06 });
    if (s.size < 80) console.warn(`[lisibilité] « ${line} » réduit à ${s.size} px`);
    put(s.el, 540, 1270);
    return card;
  }
  function world(stage, cam) {
    const w = SS.makeWorld(stage);
    SS.cam.x = cam.x || 540; SS.cam.y = cam.y || 960; SS.cam.s = cam.s || 1;
    return w;
  }

  const FRAMES = {
    // 1 · 10 h: the moment card (frame 0 of the film)
    1: (stage) => momentCard(stage, { icon: 'house', hour: '10 h', line: 'Vous êtes\nen visite.' }),
    // 2 · 10 h proof: the ad is the first result of the search
    2: (stage) => {
      const w = world(stage, { s: 1.04, y: 1010 });
      const bar = SS.el('div', 'a3', w);
      Object.assign(bar.style, { width: '900px', height: '112px', borderRadius: '56px', background: '#fff', display: 'flex', alignItems: 'center', gap: '22px', padding: '0 40px', boxSizing: 'border-box', boxShadow: SS.SH.card });
      bar.innerHTML = `<span style="width:44px;height:44px;display:block;flex:none">${SS.icon.search(C.soft)}</span><span style="font-size:42px;font-weight:560;letter-spacing:-.015em;color:${C.ink}">acheter maison Longueuil</span>`;
      put(bar, 540, 740);
      const ad = SS.sponsored(w); put(ad.el, 540, 1030);
      const halo = SS.el('div', 'a3', w);
      Object.assign(halo.style, { width: '916px', height: SS.AD_H + 16 + 'px', borderRadius: '36px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 44px 6px rgba(43,191,179,.35)` });
      put(halo, 540, 1030);
      [1350, 1565].forEach((y, k) => {
        const el = SS.el('div', 'a3', w);
        Object.assign(el.style, { width: '900px', height: '190px', borderRadius: '30px', background: '#fff', padding: '34px 40px', boxSizing: 'border-box', boxShadow: SS.SH.card });
        el.innerHTML = `<div class="skel" style="width:${36 + k * 8}%;height:16px;background:#DCE8EF"></div><div class="skel" style="margin-top:22px;width:${72 - k * 12}%;height:24px;background:#D2DEEA"></div><div class="skel" style="margin-top:18px;width:60%;height:15px"></div>`;
        put(el, 540, y);
      });
      const L = SS.el('div', 'layer', stage); SS.tintScrim(L, 640); SS.paintScrims([247, 251, 250]);
      proofHead(L, 'Votre annonce\n*s’affiche.*');
    },
    // 3 · 13 h: the moment card
    3: (stage) => momentCard(stage, { icon: 'pen', hour: '13 h', line: 'Vous êtes chez\nle notaire.' }),
    // 4 · 13 h proof (a): the buyer's form, filled, « Envoyer »
    4: (stage) => {
      const w = world(stage, { y: 970, s: 1 });
      const AG = '#2F5D8C', LP = { top: 650, h: 900 };
      const lp = SS.el('div', 'a3', w);
      Object.assign(lp.style, { width: '900px', height: LP.h + 'px', borderRadius: '34px', background: '#fff', boxShadow: SS.SH.lift, overflow: 'hidden' });
      put(lp, 540, LP.top + LP.h / 2);
      lp.innerHTML = `<div style="position:absolute;left:0;top:0;right:0;height:96px;background:${AG};display:flex;align-items:center;gap:18px;padding:0 36px">
          <span style="width:38px;height:38px;border-radius:10px;background:#fff;opacity:.92"></span><span style="font-size:30px;font-weight:800;letter-spacing:.12em;color:#fff">VOTRE AGENCE</span></div>
        <div style="position:absolute;left:36px;top:126px;font-size:54px;font-weight:800;letter-spacing:-.03em;line-height:1.08;color:${C.ink}">Maisons à vendre<br>sur la Rive-Sud</div>
        <div style="position:absolute;left:30px;top:270px;width:840px;height:430px;border-radius:26px;background:#EEF4F9"></div>
        <div style="position:absolute;left:30px;top:740px;width:840px;height:110px;border-radius:55px;background:${AG};display:flex;align-items:center;justify-content:center;color:#fff;font-size:42px;font-weight:760">Envoyer</div>`;
      [['Projet', 'Achat'], ['Secteur', 'Longueuil'], ['Délai', 'D’ici 6 mois']].forEach(([l, v], k) => {
        const top = 270 + 24 + k * 136;
        lp.insertAdjacentHTML('beforeend', `<div style="position:absolute;left:60px;top:${top}px;font-size:32px;font-weight:650;color:#4A5F73">${l}</div>
          <div style="position:absolute;left:60px;top:${top + 44}px;width:780px;height:78px;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 2px #D9E5F0;display:flex;align-items:center;padding:0 26px;box-sizing:border-box;font-size:42px;font-weight:650;color:${C.ink}">${v}</div>`);
      });
      const L = SS.el('div', 'layer', stage); SS.tintScrim(L, 640); SS.paintScrims([238, 249, 246]);
      proofHead(L, 'Un acheteur\n*vous* *écrit.*');
    },
    // 5 · 13 h proof (b), CLIMAX: the lead notification on the broker's phone
    5: (stage) => {
      const w = world(stage, { y: 1050, s: 1.1 });
      const ph = SS.phone(w, { date: 'vendredi 16 octobre', time: '13:04' });
      put(ph.el, 540, 700 + 850);
      const note = SS.el('div', 'a3', w);
      Object.assign(note.style, { width: '780px', height: '330px', borderRadius: '40px', background: '#fff', boxShadow: SS.SH.note });
      SS.noteHead(note);
      note.insertAdjacentHTML('beforeend', `<div style="position:absolute;left:30px;top:92px;font-size:44px;font-weight:800;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">Nouveau lead acheteur</div>
        <div style="position:absolute;left:30px;top:160px;font-size:38px;font-weight:650;color:${C.ink2};white-space:nowrap">Acheteur · Longueuil · Achat</div>
        <div style="position:absolute;left:30px;top:234px;display:flex;align-items:center;gap:12px;font-size:34px;font-weight:720;color:${C.green};white-space:nowrap"><span class="ck" style="width:38px;height:38px;display:block"></span>Ajouté à votre CRM</div>`);
      SS.check(note.querySelector('.ck'), 38, C.green).set(1);
      put(note, 540, 1300);
      const glow = SS.el('div', 'a3', w);
      Object.assign(glow.style, { width: '796px', height: '346px', borderRadius: '46px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 60px 10px rgba(43,191,179,.35)` });
      put(glow, 540, 1300);
      w.insertBefore(glow, note);
      const L = SS.el('div', 'layer', stage); SS.tintScrim(L, 640); SS.paintScrims([238, 249, 246]);
      proofHead(L, 'Le lead\n*arrive.*', null);
    },
    // 6 · 13 h proof (c): the card is added at the top of the CRM
    6: (stage) => {
      const w = world(stage, { y: 1000, s: 1.12 });
      const ph = SS.phone(w, { date: '', time: '' });
      put(ph.el, 540, 600 + 850);
      const crm = SS.el('div', 'a3', ph.scr);
      Object.assign(crm.style, { left: 0, top: 0, width: '784px', height: '1664px', background: '#F3F8F7' });
      crm.innerHTML = `<div style="position:absolute;left:40px;top:96px;font-size:52px;font-weight:800;letter-spacing:-.03em;color:${C.ink}">Contacts</div>
        <div style="position:absolute;left:40px;top:166px;font-size:30px;font-weight:600;color:${C.soft}">Votre CRM</div>`;
      [['Acheteur · Longueuil', 'Achat · aujourd’hui, 13 h 04', true], ['Vendeur · Brossard', 'Suivi · jeudi'], ['Acheteur · Saint-Lambert', 'Visite · mercredi'], ['Vendeur · Boucherville', 'Suivi · mardi']]
        .forEach(([ti, su, isNew], i) => {
          crm.insertAdjacentHTML('beforeend', `<div style="position:absolute;left:30px;top:${240 + i * 148}px;width:724px;height:132px;border-radius:26px;background:#fff;box-shadow:${isNew ? `0 0 0 4px ${C.turq}, 0 0 40px 4px rgba(43,191,179,.35)` : SS.SH.card}">
            <div style="position:absolute;left:24px;top:30px;width:72px;height:72px">${SS.icon.person(isNew ? C.green : '#8FA9A5', isNew ? C.mint : '#EDF3F2')}</div>
            <div style="position:absolute;left:120px;top:22px;font-size:38px;font-weight:740;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">${ti}</div>
            <div style="position:absolute;left:120px;top:76px;font-size:30px;font-weight:560;color:${C.soft};white-space:nowrap">${su}</div>
            ${isNew ? `<div style="position:absolute;right:24px;top:42px;height:48px;padding:0 20px;border-radius:24px;background:${C.green};color:#fff;font-size:30px;font-weight:760;display:flex;align-items:center">Nouveau</div>` : ''}</div>`);
        });
      const L = SS.el('div', 'layer', stage); SS.tintScrim(L, 640); SS.paintScrims([238, 249, 246]);
      proofHead(L, 'Déjà dans\n*votre* *CRM.*', null);
    },
    // 7 · 17 h: the moment card
    7: (stage) => momentCard(stage, { icon: 'sunset', hour: '17 h', line: 'Vous fermez\nla journée.', warm: true }),
    // 8 · 17 h proof: the weekly report
    8: (stage) => {
      const w = world(stage, { y: 960, s: 1 });
      const card = SS.el('div', 'a3', w);
      Object.assign(card.style, { width: '900px', height: '860px', borderRadius: '34px', background: '#fff', boxShadow: SS.SH.lift });
      put(card, 540, 650 + 430);
      const tile = (x, lab, val, hot) => `<div style="position:absolute;left:${x}px;top:196px;width:264px;height:200px;border-radius:24px;background:${hot ? C.mint : '#F5F9F8'};box-shadow:${hot ? 'inset 0 0 0 3px rgba(43,191,179,.55)' : 'inset 0 0 0 2px #E6EEEC'}">
          <div style="position:absolute;left:26px;top:22px;font-size:30px;font-weight:650;color:${C.soft}">${lab}</div>
          <div style="position:absolute;left:26px;top:72px;font-size:72px;font-weight:800;letter-spacing:-.03em;color:${hot ? '#0F6F66' : C.ink};font-feature-settings:'tnum' 1">${val}</div></div>`;
      const bars = [0.42, 0.55, 0.48, 0.7, 0.86].map((k, i) => `<div style="position:absolute;left:${78 + i * 160}px;bottom:70px;width:84px;height:${Math.round(150 * k)}px;border-radius:14px 14px 6px 6px;background:${i === 4 ? C.turq : '#CDEDE9'}"></div>
          <div style="position:absolute;left:${78 + i * 160}px;bottom:22px;width:84px;text-align:center;font-size:30px;font-weight:650;color:${C.soft}">${'LMMJV'[i]}</div>`).join('');
      card.innerHTML = `<div style="position:absolute;left:36px;top:36px;font-size:46px;font-weight:800;letter-spacing:-.025em;color:${C.ink}">Rapport hebdomadaire</div>
        <div style="position:absolute;left:36px;top:104px;font-size:32px;font-weight:600;color:${C.soft}">Du 12 au 16 octobre · Campagne acheteur · Rive-Sud</div>
        ${tile(30, 'Impressions', '1&#8239;284')}${tile(318, 'Clics', '96')}${tile(606, 'Leads', '4', true)}
        <div style="position:absolute;left:30px;top:420px;width:840px;height:250px;border-radius:24px;background:#F5F9F8">${bars}</div>
        <div style="position:absolute;left:36px;top:706px;display:flex;align-items:center;gap:14px;font-size:34px;font-weight:720;color:${C.green}"><span class="ck" style="width:38px;height:38px;display:block"></span>3 optimisations appliquées</div>
        <div style="position:absolute;left:88px;top:760px;font-size:30px;font-weight:600;color:${C.soft}">Par notre IA et notre équipe</div>`;
      SS.check(card.querySelector('.ck'), 38, C.green).set(1);
      const L = SS.el('div', 'layer', stage); SS.tintScrim(L, 640); SS.paintScrims([249, 248, 242]);
      proofHead(L, 'Votre semaine,\n*en* *clair.*');
    },
    // 9 · the day in review: three moments checked, « Google Ads? Pas ouvert de la journée. »
    9: (stage) => {
      const L = SS.el('div', 'layer', stage);
      const h = SS.text(L, 'Google Ads?\n*Pas* *ouvert*\n*de* *la* *journée.*', { size: 116, maxW: 940, lh: 1.04 });
      if (h.size < 116) console.warn('[lisibilité] titre 9 réduit à ' + h.size);
      put(h.el, 540, 420);
      [['house', '10 h · Visite', 'Annonce affichée'], ['pen', '13 h · Notaire', 'Lead ajouté au CRM'], ['sunset', '17 h · Fin de journée', 'Rapport reçu']].forEach(([ic, a, b], i) => {
        const r = SS.el('div', 'a3', L);
        Object.assign(r.style, { width: '880px', height: '170px', borderRadius: '30px', background: '#fff', boxShadow: SS.SH.card });
        r.innerHTML = `<div style="position:absolute;left:30px;top:35px;width:100px;height:100px;border-radius:26px;background:${C.mint};display:grid;place-items:center"><div style="width:68px;height:68px">${SS.dayIcon[ic](C.turq)}</div></div>
          <div style="position:absolute;left:160px;top:30px;font-size:42px;font-weight:780;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">${a}</div>
          <div style="position:absolute;left:160px;top:94px;display:flex;align-items:center;gap:12px;font-size:34px;font-weight:680;color:${C.green};white-space:nowrap"><span class="ck" style="width:36px;height:36px;display:block"></span>${b}</div>`;
        SS.check(r.querySelector('.ck'), 36, C.green).set(1);
        put(r, 540, 820 + i * 196);
      });
    },
    // 10 · the end card (kept from the V3)
    10: (stage) => {
      const L = SS.el('div', 'layer', stage);
      const logo = SS.logo(L, 196); put(logo.el, 540, 730); logo.mark(1);
      txt(L, 'Google Ads pour l’immobilier québécois.', 540, 922, { size: 44, weight: 560, color: C.soft, tracking: -0.015, maxW: 900 });
      const cta = SS.el('div', 'a3', L);
      Object.assign(cta.style, { width: '700px', height: '136px', borderRadius: '68px', background: 'linear-gradient(135deg,#2BBFB3 0%,#1D9E75 100%)', boxShadow: '0 22px 44px -18px rgba(29,158,117,.65), inset 0 1px 0 rgba(255,255,255,.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', color: '#fff', fontSize: '50px', fontWeight: 760, letterSpacing: '-.02em' });
      cta.innerHTML = `Demander une démo<span style="width:48px;height:48px;display:block">${SS.icon.arrow('#fff')}</span>`;
      put(cta, 540, 1096);
      txt(L, 'scalesuiteqc.ca', 540, 1258, { size: 40, weight: 650, color: C.ink2, tracking: -0.01 });
    },
  };
  const GROUND = { 1: '#F7FBFA', 2: '#F7FBFA', 3: '#EEF9F6', 4: '#EEF9F6', 5: '#EEF9F6', 6: '#EEF9F6', 7: '#F9F8F2', 8: '#F9F8F2', 9: '#F7FBFA', 10: '#F7FBFA' };

  window.addEventListener('load', async () => {
    try {
      const stage = document.getElementById('stage');
      stage.classList.add('v3');
      stage.style.height = SS.H + 'px';
      stage.style.background = GROUND[F];
      await document.fonts.load('800 100px Inter');
      await document.fonts.load('600 40px Inter');
      await document.fonts.ready;
      FRAMES[F](stage);
      SS.applyCam(0);
      const grain = SS.el('div', 'layer', stage);
      Object.assign(grain.style, { backgroundImage: `url(${SS.grain(256, 256, 9)})`, pointerEvents: 'none', opacity: 0.5 });
      SS.ready = true;
    } catch (e) { SS.error = String((e && e.stack) || e); }
  });
})();
