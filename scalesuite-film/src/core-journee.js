/* ScaleSuite « Une journée de courtier » (9:16, 25 s): additions on top of core.js, logo.js (V2) and
   core-v3.js (V3), all loaded read-only. Same rules as the V3 (see core-v3.js and the project skill):
   fromTo() only, explicit initial states, one driver per property, procedural blur.
   Adds: the day schedule, the hour marker (the film's metronome), a tinted scrim that follows the
   background, and the reusable UI pieces of this film (phone, notification, sponsored ad, tap). */
(function () {
  const SS = window.SS;
  const C = SS.C;

  // ---- The day: hour changes (marker + background tint share these times) ---------------------
  // 6 h 59 → 7 h at the hook, then 10 h, 13 h and 17 h on the scene transitions.
  SS.DAY = [
    { at: 0.36, h: 7, label: 'Café', icon: 'mug' },
    { at: 2.6, h: 10, label: 'Visite', icon: 'house' },
    { at: 6.0, h: 13, label: 'Notaire', icon: 'doc' },
    { at: 13.25, h: 17, label: 'Rapport', icon: 'sunset' },
  ];

  // ---- Line icons (24 × 24, round strokes; the hook's mug is the same drawing at 4.7×) ----------
  const stroke = (c, w = 1.9) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  SS.dayIcon = {
    mug: (c = C.turq) => `<svg viewBox="0 0 24 24" ${stroke(c)}><path d="M4.5 10.5h11v5a4.5 4.5 0 0 1-4.5 4.5h-2a4.5 4.5 0 0 1-4.5-4.5z"/><path d="M15.5 12h1.4a2.4 2.4 0 0 1 0 4.8h-1.6"/><path d="M3.5 22h14"/>
      <g class="steam"><path d="M8 7.6c-.9-1 .9-2 0-3.2"/><path d="M11.2 7.6c-.9-1 .9-2 0-3.2"/></g></svg>`,
    house: (c = C.turq) => `<svg viewBox="0 0 24 24" ${stroke(c)}><path d="M3 11.2 12 3.8l9 7.4"/><path d="M5.6 9.4V20.2h12.8V9.4"/><path d="M10 20.2v-5.4h4v5.4"/></svg>`,
    doc: (c = C.turq) => `<svg viewBox="0 0 24 24" ${stroke(c)}><path d="M5 3h9l4 4v10.5"/><path d="M14 3v4h4"/><path d="M5 3v18h8"/><path d="M8 11h7M8 14.5h4.5"/><path d="M14.6 21.4l.6-2.6 5.3-5.3 2 2-5.3 5.3z"/></svg>`,
    sunset: (c = C.turq) => `<svg viewBox="0 0 24 24" ${stroke(c)}><path d="M2.5 17.5h19"/><path d="M6.8 17.5a5.2 5.2 0 0 1 10.4 0"/><path d="M12 6.5v2.6M4.9 9.9l1.8 1.8M19.1 9.9l-1.8 1.8"/><path d="M7 21h10"/></svg>`,
    pen: (c = C.ink2) => `<svg viewBox="0 0 24 24" ${stroke(c, 1.5)}><path d="M3.5 20.5l1.1-4.4L16.8 3.9a2.2 2.2 0 0 1 3.1 3.1L7.8 19.2z"/><path d="M14.8 5.9l3.1 3.1"/></svg>`,
  };

  // ---- Headlines: masked words, never under the skill's 116 px minimum ---------------------------
  SS.head = (layer, src, y, o = {}) => {
    const h = SS.text(layer, src, Object.assign({ size: 116, maxW: 940, lh: 1.04 }, o));
    if (h.size < (o.min || 116)) console.warn(`[lisibilité] titre « ${src.replace(/\n/g, ' ')} » réduit à ${h.size} px`);
    SS.place(h.el, 540, y);
    SS.hideWords(h);
    return h;
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

  // ---- Notification header (logo mark + sender + "maintenant") ----------------------------------
  SS.noteHead = (parent, sender = 'ScaleSuite') => {
    const hd = SS.el('div', 'a3', parent);
    Object.assign(hd.style, { left: '30px', top: '24px', width: '700px', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '30px', fontWeight: 750, color: C.ink, whiteSpace: 'nowrap' });
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

  // ---- A tap: press (3 % squash, rebound) + ripple on `target` -----------------------------------
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

  // ---- Hour marker: pill (icon · odometer time · label) + day rail with four nodes ---------------
  // Screen space, y 196–296. The time is built with its own digit columns so every change is a
  // GSAP fromTo on a column (yPercent), chained in time order.
  const M = { y: 246, pillL: 100, pillW: 520, pillH: 100, railL: 676, railR: 900 };
  SS.MARK = M;
  SS.buildMarker = (stage) => {
    const layer = SS.el('div', 'layer', stage);
    const pill = SS.el('div', 'a3', layer);
    Object.assign(pill.style, { left: M.pillL + 'px', top: M.y - M.pillH / 2 + 'px', width: M.pillW + 'px', height: M.pillH + 'px', borderRadius: '50px', background: '#fff', boxShadow: SS.SH.card, transformOrigin: '60px 50%' });
    // icon slot (house, doc, sunset roll through it; the mug flies in from the hook)
    const slot = SS.el('div', 'a3', layer);
    Object.assign(slot.style, { left: M.pillL + 26 + 'px', top: M.y - 34 + 'px', width: '68px', height: '68px', overflow: 'hidden' });
    const icons = {};
    ['house', 'doc', 'sunset'].forEach((k) => {
      const i = SS.el('div', 'a3', slot, SS.dayIcon[k]());
      Object.assign(i.style, { left: '2px', top: '2px', width: '64px', height: '64px' });
      gsap.set(i, { yPercent: 130 });
      icons[k] = i;
    });
    // time: [H tens][H units] h [M tens][M units], 60 px tabular
    const time = SS.el('div', 'a3', layer);
    Object.assign(time.style, { left: M.pillL + 112 + 'px', top: M.y - 38 + 'px', height: '76px', display: 'flex', alignItems: 'center', fontSize: '60px', fontWeight: 800, letterSpacing: '-.03em',
      color: C.ink, fontFeatureSettings: "'tnum' 1", whiteSpace: 'nowrap', transformOrigin: '0 50%' });
    const col = (glyphs) => {
      const win = SS.el('span', '', time);
      Object.assign(win.style, { display: 'inline-block', height: '1.16em', overflow: 'hidden', lineHeight: '1.16em' });
      const strip = SS.el('span', '', win);
      strip.style.display = 'block';
      glyphs.forEach((g) => { const d = SS.el('span', '', strip, g); d.style.display = 'block'; d.style.height = '1.16em'; });
      return { win, strip, n: glyphs.length };
    };
    const digits = Array.from({ length: 20 }, (_, i) => String(i % 10));
    const cHT = col(['', '1']), cHU = col(digits);
    SS.el('span', '', time, ' h ').style.fontWeight = 700;
    const cMT = col(digits), cMU = col(digits);
    const setIdx = (c, i) => gsap.set(c.strip, { yPercent: (-100 * i) / c.n });
    setIdx(cHT, 0); setIdx(cHU, 6); setIdx(cMT, 5); setIdx(cMU, 9);
    gsap.set(cHT.win, { width: 0 });
    M.tensW = 37; // width of the hour's tens digit at 60 px (tabular)
    // label (masked words)
    const lab = SS.el('div', 'a3', layer);
    Object.assign(lab.style, { left: M.pillL + 370 + 'px', top: M.y - 26 + 'px', width: '140px', height: '52px', overflow: 'hidden' });
    const labels = SS.DAY.map((d) => {
      const s = SS.el('div', 'a3', lab, d.label);
      Object.assign(s.style, { left: 0, top: '4px', fontSize: '34px', fontWeight: 650, color: C.soft, letterSpacing: '-.01em', whiteSpace: 'nowrap' });
      gsap.set(s, { yPercent: 130 });
      return s;
    });
    // day rail: grey track, turquoise progress, four nodes with their hour under them
    const rail = SS.el('div', 'layer', layer);
    rail.style.overflow = 'visible';
    const svg = SS.svg('svg', { class: 'lines', width: 1080, height: 400 }, rail);
    SS.svg('path', { d: `M${M.railL},${M.y - 10} H${M.railR}`, stroke: '#D7E3E1', 'stroke-width': 4, 'stroke-linecap': 'round', fill: 'none' }, svg);
    const prog = SS.svg('path', { d: `M${M.railL},${M.y - 10} H${M.railR}`, stroke: C.turq, 'stroke-width': 6, 'stroke-linecap': 'round', fill: 'none', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, svg);
    const nodeX = (i) => M.railL + ((M.railR - M.railL) * i) / 3;
    const nodes = SS.DAY.map((d, i) => {
      const n = SS.el('div', 'a3', rail);
      Object.assign(n.style, { width: '22px', height: '22px', borderRadius: '50%', background: '#C9D6D4', boxShadow: '0 0 0 5px #fff' });
      SS.place(n, nodeX(i), M.y - 10, { scale: 1 });
      const t = SS.el('div', 'a3', rail, String(d.h));
      Object.assign(t.style, { fontSize: '30px', fontWeight: 650, color: C.soft, fontFeatureSettings: "'tnum' 1" });
      SS.place(t, nodeX(i), M.y + 30);
      return n;
    });
    const R = { layer, pill, slot, icons, time, cols: { cHT, cHU, cMT, cMU }, labels, prog, nodes, svg, rail };
    SS.marker = R;
    return R;
  };
  // roll a digit column from index a to b (b > a: always forward, like a clock)
  SS.roll = (c, a, b, at, dur = 0.42, ease = 'back.out(1.3)') =>
    SS.tl.fromTo(c.strip, { yPercent: (-100 * a) / c.n }, { yPercent: (-100 * b) / c.n, duration: dur, ease }, at);
  // the marker reaches hour k of SS.DAY (k ≥ 1; 7 h is set up by the hook)
  SS.hourTo = (k, at) => {
    const R = SS.marker, d = SS.DAY[k], prev = SS.DAY[k - 1];
    const idx = { 7: 7, 10: 10, 13: 13, 17: 17 }; // index in the doubled 0–9 strip (forward rolls)
    if (d.h >= 10 && prev.h < 10) {
      // the tens digit appears when the units pass 9 → 0 (never shows « 19 »)
      SS.tl.fromTo(R.cols.cHT.win, { width: 0 }, { width: M.tensW, duration: 0.32, ease: SS.EZ.out }, at + 0.3);
      SS.roll(R.cols.cHT, 0, 1, at + 0.34, 0.36);
    }
    SS.roll(R.cols.cHU, idx[prev.h], idx[d.h], at + 0.06, 0.5);
    // label and icon swap in their masks
    SS.tl.fromTo(R.labels[k - 1], { yPercent: 0 }, { yPercent: -130, duration: 0.24, ease: SS.EZ.in }, at);
    SS.tl.fromTo(R.labels[k], { yPercent: 130 }, { yPercent: 0, duration: 0.45, ease: SS.EZ.out }, at + 0.14);
    if (prev.icon !== 'mug') SS.tl.fromTo(R.icons[prev.icon], { yPercent: 0 }, { yPercent: -130, duration: 0.24, ease: SS.EZ.in }, at);
    SS.tl.fromTo(R.icons[d.icon], { yPercent: 130 }, { yPercent: 0, duration: 0.45, ease: SS.EZ.out }, at + 0.12);
    // the rail line advances to the node, which lights up with a 10 % pop
    SS.tl.fromTo(R.prog, { attr: { 'stroke-dashoffset': 1 - (k - 1) / 3 } }, { attr: { 'stroke-dashoffset': 1 - k / 3 }, duration: 0.5, ease: SS.EZ.inOut }, at);
    SS.tl.fromTo(R.nodes[k], { scale: 1, backgroundColor: '#C9D6D4', boxShadow: '0 0 0 5px #fff' },
      { scale: 1.25, backgroundColor: C.green, boxShadow: '0 0 0 7px rgba(43,191,179,.28)', duration: 0.4, ease: SS.EZ.pop }, at + 0.42);
    SS.cue(at, 'hour', { k });
  };
})();
