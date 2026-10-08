/* ScaleSuite « Une journée de courtier » (9:16, 25 s, plan v2): additions on top of core.js, logo.js
   (V2) and core-v3.js (V3), all loaded read-only. Same rules as the V3 (see core-v3.js and the
   project skill): fromTo() only, explicit initial states, one driver per property, procedural blur.
   Adds: the moment cards (the broker's day, full frame), a sub-world with its own camera per proof,
   a scrim that follows the background tint, and the UI pieces of this film (phone, notification,
   « Commandité » result, tap). */
(function () {
  const SS = window.SS;
  const C = SS.C;

  // ---- Line icons (24 × 24, round strokes) ------------------------------------------------------
  const stroke = (c, w = 1.9) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  SS.dayIcon = {
    house: (c = C.turq) => `<svg viewBox="0 0 24 24" ${stroke(c)}><path d="M3 11.2 12 3.8l9 7.4"/><path d="M5.6 9.4V20.2h12.8V9.4"/><path d="M10 20.2v-5.4h4v5.4"/></svg>`,
    // a signed deed: a document with a check (fixed icon, no signature animation)
    docCheck: (c = C.turq) => `<svg viewBox="0 0 24 24" ${stroke(c)}><path d="M6 2.8h8.6L19 7.2V21.2H6z"/><path d="M14.6 2.8v4.4H19"/><path d="M9 10.4h7M9 13.4h4.6"/><path d="M9.2 17.1l1.9 1.9 3.9-3.9"/></svg>`,
    sunset: (c = C.turq) => `<svg viewBox="0 0 24 24" ${stroke(c)}><path d="M2.5 17.5h19"/><path d="M6.8 17.5a5.2 5.2 0 0 1 10.4 0"/><path d="M12 6.5v2.6M4.9 9.9l1.8 1.8M19.1 9.9l-1.8 1.8"/><path d="M7 21h10"/></svg>`,
  };

  // ---- Headlines: masked words, never under the skill's 116 px minimum ---------------------------
  SS.head = (layer, src, y, o = {}) => {
    const h = SS.text(layer, src, Object.assign({ size: 116, maxW: 940, lh: 1.04 }, o));
    if (h.size < (o.min || 116)) console.warn(`[lisibilité] « ${src.replace(/\n/g, ' ')} » réduit à ${h.size} px`);
    SS.place(h.el, 540, y);
    SS.hideWords(h);
    return h;
  };
  // « Pendant ce temps… » + headline of a product proof (y 200–580)
  SS.proofHead = (layer, title, kicker) => {
    const out = {};
    if (kicker) {
      out.k = SS.text(layer, kicker, { size: 64, weight: 700, color: C.turqText, tracking: -0.02 });
      SS.place(out.k.el, 540, 262);
      SS.hideWords(out.k);
    }
    out.h = SS.head(layer, title, kicker ? 452 : 420);
    return out;
  };

  // ---- Scrim that follows the background tint (the V3 scrim is hard-coded to #F7FBFA) ----------
  SS.scrims = [];
  SS.tintScrim = (parent, h = 680) => {
    const sc = SS.el('div', 'a3', parent);
    Object.assign(sc.style, { width: '1080px', height: h + 'px' });
    SS.scrims.push(sc);
    return sc;
  };
  SS.paintScrims = (rgb) => {
    const [r, g, b] = rgb;
    // solid under a two-line headline (to y ≈ 560), then a short fade
    const bg = `linear-gradient(180deg, rgb(${r},${g},${b}) 0%, rgb(${r},${g},${b}) 82%, rgba(${r},${g},${b},.8) 90%, rgba(${r},${g},${b},0) 100%)`;
    SS.scrims.forEach((s) => { if (s.style.background !== bg) s.style.background = bg; });
  };

  // ---- Shared card style ------------------------------------------------------------------------
  SS.SH = {
    card: '0 1px 2px rgba(18,44,40,.06), 0 14px 34px -14px rgba(18,74,66,.26), 0 0 0 1px rgba(26,26,26,.045)',
    lift: '0 2px 4px rgba(18,44,40,.08), 0 40px 80px -30px rgba(18,74,66,.40), 0 0 0 1px rgba(26,26,26,.05)',
    note: '0 2px 4px rgba(18,44,40,.08), 0 30px 60px -24px rgba(18,74,66,.45), 0 0 0 1px rgba(26,26,26,.05)',
  };
  SS.clipR = (t, r, b, l, rad) => `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px)`;
  SS.OPEN = SS.clipR(-80, -80, -80, -80, 114); // fully open, shadow kept

  // ---- A layer with its own world and camera (one camera move per proof scene) ------------------
  SS.subWorld = (layer, st = {}) => {
    const wrap = SS.el('div', 'world-wrap', layer);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera({ x: 540, y: 960, s: 1, r: 0, blur: 0 });
    cam.set(Object.assign({ x: 540, y: 960, s: 1, r: 0 }, st));
    return { wrap, w, cam, apply() { w.style.transform = SS.camMatrix(cam.p); SS.blur(wrap, cam.p.blur || 0); } };
  };
  // build-time world position of an element (worlds are untransformed while building)
  SS.centerOf = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };

  // ---- Moment card: the broker's life, full frame ------------------------------------------------
  // Enters by a green node blooming into the mint disc (or is there from frame 0), composes its
  // icon (drawn), its hour (≥ 150 px) and its sentence (> 80 px), holds, then leaves upward in one
  // block, uncovering the proof underneath.
  SS.momentCard = (stage, o) => {
    const T = o.T; // {bloom, icon, hour, line, exit}
    const layer = SS.el('div', 'layer', stage);
    layer.style.zIndex = 5;
    layer.style.background = o.warm
      ? 'radial-gradient(130% 90% at 80% 95%, #F8EBD3 0%, #F1F7F1 45%, #E8F9F7 100%)'
      : 'radial-gradient(120% 80% at 50% 45%, #F1FCFA 0%, #E8F9F7 62%, #DDF5F1 100%)';
    const P = { blur: 0 };
    let node = null;
    if (o.from) { // bloom out of a node sitting on the previous scene's focal point
      const at = T.bloom, { x, y } = o.from;
      const c0 = `circle(0px at ${x}px ${y}px)`, c1 = `circle(2300px at ${x}px ${y}px)`;
      gsap.set(layer, { clipPath: c0, autoAlpha: 0 });
      SS.tl.set(layer, { autoAlpha: 1 }, at);
      SS.tl.fromTo(layer, { clipPath: c0 }, { clipPath: c1, duration: 0.5, ease: 'power2.inOut' }, at);
      node = SS.el('div', 'a3', stage);
      node.style.zIndex = 6;
      Object.assign(node.style, { width: '28px', height: '28px', borderRadius: '50%', background: C.green, boxShadow: '0 0 0 10px rgba(43,191,179,.22)' });
      SS.place(node, x, y, { scale: 0 });
      SS.tl.fromTo(node, { scale: 0 }, { scale: 1, duration: 0.22, ease: 'back.out(2.4)' }, at - 0.2);
      SS.tl.fromTo(node, { scale: 1 }, { scale: 0, duration: 0.24, ease: SS.EZ.in }, at + 0.18);
      SS.cue(at - 0.2, 'node'); SS.cue(at, 'bloom');
    }
    // icon, drawn stroke by stroke
    const ic = SS.el('div', 'a3', layer, SS.dayIcon[o.icon](C.turq));
    Object.assign(ic.style, { width: '300px', height: '300px' });
    const svg = ic.querySelector('svg');
    svg.setAttribute('stroke-width', '1.25');
    svg.style.overflow = 'visible';
    const paths = [...svg.querySelectorAll('path')];
    paths.forEach((p) => { p.setAttribute('pathLength', 1); p.setAttribute('stroke-dasharray', '1 1'); p.setAttribute('stroke-dashoffset', 1); });
    SS.place(ic, 540, o.kicker ? 560 : 600);
    SS.tl.fromTo(paths, { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 0.45, stagger: 0.07, ease: SS.EZ.out }, T.icon);
    // optional kicker, visible from frame 0 (« Une journée de courtier »)
    if (o.kicker) {
      const k = SS.text(layer, o.kicker, { size: 56, weight: 650, color: C.soft, tracking: -0.015 });
      SS.place(k.el, 540, 790);
    }
    const hour = SS.text(layer, o.hour, { size: 230, weight: 800, tracking: -0.045 });
    SS.place(hour.el, 540, o.kicker ? 950 : 930);
    const line = SS.text(layer, o.line, { size: 96, maxW: 940, lh: 1.06 });
    if (line.size < 80) console.warn(`[lisibilité] « ${o.line} » réduit à ${line.size} px`);
    SS.place(line.el, 540, 1270);
    if (T.hour != null) { SS.hideWords(hour); SS.wordsIn(hour, T.hour, { st: 0.06, dur: 0.5 }); }
    SS.hideWords(line);
    SS.wordsIn(line, T.line, { st: 0.05, dur: 0.5 });
    // exit: the whole card goes up in one block (motion blur at speed)
    SS.tl.fromTo(layer, { y: 0 }, { y: -1920, duration: 0.4, ease: SS.EZ.inOut }, T.exit);
    SS.tl.fromTo(P, { blur: 0 }, { blur: 5, duration: 0.2, ease: 'power2.in' }, T.exit + 0.05);
    SS.tl.fromTo(P, { blur: 5 }, { blur: 0, duration: 0.2, ease: 'power2.out' }, T.exit + 0.25);
    SS.cue(T.icon, 'card', { k: o.k }); SS.cue(T.exit, 'slide');
    return { layer, node, P, render() { SS.blur(layer, P.blur); }, range: [o.from ? T.bloom - 0.25 : -1, T.exit + 0.5] };
  };
  // a proof layer (under the cards)
  SS.proofLayer = (stage, z = 1) => { const l = SS.el('div', 'layer', stage); l.style.zIndex = z; return l; };

  // ---- Phone (light, 820 × 1700, same drawing as the V3 phone) ----------------------------------
  SS.phone = (parent, { date, time }) => {
    const el = SS.el('div', 'a3', parent);
    Object.assign(el.style, { width: '820px', height: '1700px', borderRadius: '112px', background: '#FBFDFD',
      boxShadow: '0 2px 4px rgba(18,44,40,.08), 0 50px 90px -40px rgba(18,74,66,.45), 0 0 0 2px #DCE6E4, inset 0 0 0 2px #fff' });
    el.innerHTML = `<div class="scr" style="position:absolute;inset:18px;border-radius:96px;background:linear-gradient(170deg,#F1FCFA 0%,#DDF5F1 60%,#CBEFEA 100%);overflow:hidden">
        <div style="position:absolute;left:50%;top:26px;width:150px;height:40px;margin-left:-75px;border-radius:20px;background:#D3DEDC"></div>
        <div style="position:absolute;left:0;right:0;top:110px;text-align:center;font-size:34px;font-weight:600;color:${C.soft}">${date}</div>
        <div style="position:absolute;left:0;right:0;top:150px;text-align:center;font-size:170px;font-weight:300;letter-spacing:-.04em;color:${C.ink2};line-height:1.1;font-feature-settings:'tnum' 1">${time}</div></div>`;
    return { el, scr: el.querySelector('.scr') };
  };

  // ---- Notification header (logo mark + sender + « maintenant ») --------------------------------
  SS.noteHead = (parent, sender = 'ScaleSuite') => {
    const hd = SS.el('div', 'a3', parent);
    Object.assign(hd.style, { left: '30px', top: '24px', width: '720px', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '30px', fontWeight: 750, color: C.ink, whiteSpace: 'nowrap' });
    hd.innerHTML = `<span class="mk" style="width:40px;height:40px;display:block"></span>${sender}<span style="margin-left:auto;font-weight:550;color:${C.soft}">maintenant</span>`;
    const m = SS.logo(hd.querySelector('.mk'), 40, { word: false });
    m.el.style.position = 'static';
    m.mark(1);
    return hd;
  };

  // ---- Sponsored result (fr-CA: « Commandité »), 900 px ------------------------------------------
  SS.AD_H = 390;
  SS.sponsored = (parent) => {
    const el = SS.el('div', 'a3', parent);
    Object.assign(el.style, { width: '900px', height: SS.AD_H + 'px', borderRadius: '30px', background: '#fff', boxShadow: SS.SH.card });
    el.innerHTML = `<div class="in" style="position:absolute;inset:0;padding:32px 40px;box-sizing:border-box">
        <div class="sp" style="font-size:30px;font-weight:780;color:${C.ink};white-space:nowrap">Commandité<span style="font-weight:500;color:${C.soft}"> · votreagence.ca</span></div>
        <div class="ti" style="margin-top:14px;font-size:44px;font-weight:650;letter-spacing:-.02em;line-height:1.18;color:#1F5FAD">Maisons à vendre à Longueuil |<br>Votre agence</div>
        <div class="ds" style="margin-top:16px;font-size:32px;font-weight:500;line-height:1.3;color:${C.soft}">Visites cette semaine. Parlez à un<br>courtier local.</div></div>`;
    return { el, inner: el.querySelector('.in') };
  };

  // ---- A tap: press (squash, rebound) + ripple on `target` ---------------------------------------
  SS.tapAt = (parent, target, x, y, at, o = {}) => {
    const rip = SS.el('div', 'a3', parent);
    const d = o.d || 180;
    Object.assign(rip.style, { width: d + 'px', height: d + 'px', borderRadius: '50%', background: 'rgba(43,191,179,.22)', boxShadow: `inset 0 0 0 4px ${C.turq}` });
    SS.place(rip, x, y, { scale: 0.15, autoAlpha: 0 });
    SS.tl.fromTo(rip, { scale: 0.15, autoAlpha: 0.95 }, { scale: 1.5, autoAlpha: 0, duration: 0.55, ease: SS.EZ.out }, at);
    if (target) {
      SS.tl.fromTo(target, { scale: 1 }, { scale: o.press || 0.975, duration: 0.08, ease: 'power2.out' }, at);
      SS.tl.fromTo(target, { scale: o.press || 0.975 }, { scale: 1, duration: 0.3, ease: 'back.out(3)' }, at + 0.08);
    }
    SS.cue(at, 'tap');
    return rip;
  };
})();
