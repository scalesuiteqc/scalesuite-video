/* « Dimanche, 21 h 14 » · scene 3, Sunday 21 h 14 (5.6–9.4 s), world B (its own camera).
   The play bar's track has become the search bar (handed over at 6.05, same geometry). Sophie types
   "vendre mon condo rosemont"; the sponsored result ("Commandité") of the Équipe Exemple drops in under
   it. Tap: the ad's title is the shared element, it flies to become the title of the team's page while
   the ad card opens into the page (clip). The form fills (Prénom, Cellulaire, Propriété), tap on
   "Me faire rappeler". Exit (9.4, scene 4): the page compresses into the ink token. */
(function () {
  const SS = window.SS, T = SS.DT, C = SS.DC;
  const S = SS.D_SEARCH;
  const AD = { top: 790, h: 300, w: 900 };
  const PG = { top: 640, h: 830, w: 900, x0: 90 };
  const IN = 134; // inner left edge of the ad and page text (x)
  const FIELDS = [
    { lab: 'Prénom', val: 'Sophie', top: 950, at: T.f1, dur: 0.2 },
    { lab: 'Cellulaire', val: '514 555 0198', top: 1088, at: T.f2, dur: 0.28 },
    { lab: 'Propriété', val: 'Condo', top: 1226, at: T.f3, dur: 0.15 },
  ];
  const BTN = { top: 1346, h: 96 };
  const TITLE_AD = { y: AD.top + 160 + 27, size: 44 };
  const TITLE_PG = { y: PG.top + 172, size: 50 };
  SS.PAGE = { PG, BTN, FIELDS };

  let R;
  function build(stage) {
    const wrap = SS.el('div', 'world-wrap', stage);
    const w = SS.el('div', 'world', wrap);
    const cam = SS.camera({ x: 540, y: 960, s: 1, r: 0, blur: 0 });
    cam.set({ x: 540, y: 960, s: 1, r: 0 });

    // ---- search bar (identical to the morphed track at 6.05)
    const search = SS.el('div', 'dm-ui', w);
    Object.assign(search.style, { width: S.w + 'px', height: S.h + 'px', borderRadius: S.h / 2 + 'px', boxShadow: SS.DSH.ui,
      display: 'flex', alignItems: 'center', gap: '22px', padding: '0 40px' });
    search.innerHTML = `<span class="ic" style="width:42px;height:42px;display:block;flex:none">${SS.icon.search(C.soft)}</span>
      <span style="font-size:40px;font-weight:560;letter-spacing:-.012em;color:${C.ink};white-space:nowrap"><span class="q"></span><span class="dm-caret"></span></span>`;
    SS.place(search, S.x, S.y, { autoAlpha: 0 });
    const ic = search.querySelector('.ic'), q = search.querySelector('.q'), caret = search.querySelector('.dm-caret');
    gsap.set(ic, { autoAlpha: 0, scale: 0.7 });
    SS.tl.set(search, { autoAlpha: 1 }, T.morph + T.morphDur);
    SS.tl.fromTo(ic, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: SS.EZ.out }, T.morph + T.morphDur - 0.04);
    SS.typer(q, [{ at: T.typeAt, dur: T.typeDur, to: 'vendre mon condo rosemont' }], caret);

    // ---- the sponsored result, then two ordinary results in skeleton
    const ad = SS.el('div', 'dm-ui', w);
    Object.assign(ad.style, { width: AD.w + 'px', height: AD.h + 'px', borderRadius: '28px', boxShadow: SS.DSH.uiHi });
    ad.innerHTML = `<div class="fx">
        <div style="position:absolute;left:44px;top:28px;font-size:30px;font-weight:760;color:${C.ink};letter-spacing:-.005em">Commandité</div>
        <div style="position:absolute;left:44px;top:78px;width:66px;height:66px;border-radius:50%;background:${C.team};color:#fff;display:grid;place-items:center;font-size:30px;font-weight:800;letter-spacing:-.02em">EE</div>
        <div style="position:absolute;left:128px;top:74px;font-size:32px;font-weight:650;color:${C.ink};white-space:nowrap;letter-spacing:-.01em">Équipe Exemple</div>
        <div style="position:absolute;left:128px;top:112px;font-size:30px;font-weight:500;color:${C.soft};white-space:nowrap">equipeexemple.ca</div>
        <div style="position:absolute;left:44px;top:232px;font-size:32px;font-weight:500;color:${C.soft};white-space:nowrap;letter-spacing:-.005em">Une équipe de courtiers de votre quartier.</div></div>`;
    SS.place(ad, 540, AD.top + AD.h / 2, { autoAlpha: 0, y: AD.top + AD.h / 2 + 30 });
    const adFx = ad.querySelector('.fx');
    // the ad's title is its own element (world space): the shared element that becomes the page title
    const title = SS.el('div', 'dm', w);
    Object.assign(title.style, { fontSize: TITLE_AD.size + 'px', fontWeight: 620, letterSpacing: '-.02em', whiteSpace: 'nowrap', color: C.link, transformOrigin: '0 50%' });
    title.textContent = 'Vendre votre condo à Rosemont';
    gsap.set(title, { x: IN, y: TITLE_AD.y, yPercent: -50, autoAlpha: 0, scale: 1 });
    const skels = [1124, 1300].map((top, i) => {
      const s = SS.el('div', 'dm-ui', w);
      Object.assign(s.style, { width: '900px', height: '150px', borderRadius: '26px', boxShadow: SS.DSH.ui });
      s.innerHTML = `<div style="position:absolute;left:44px;top:32px;width:${i ? 380 : 460}px;height:22px;border-radius:11px;background:${C.skel}"></div>
        <div style="position:absolute;left:44px;top:74px;width:${i ? 640 : 700}px;height:14px;border-radius:7px;background:${C.skel}"></div>
        <div style="position:absolute;left:44px;top:102px;width:${i ? 420 : 520}px;height:14px;border-radius:7px;background:${C.skel}"></div>`;
      SS.place(s, 540, top + 75, { autoAlpha: 0, y: top + 75 + 30 });
      SS.tl.fromTo(s, { autoAlpha: 0, y: top + 75 + 30 }, { autoAlpha: 1, y: top + 75, duration: 0.5, ease: SS.EZ.out }, T.ad + 0.08 + i * 0.07);
      return s;
    });
    SS.tl.fromTo(ad, { autoAlpha: 0, y: AD.top + AD.h / 2 + 30 }, { autoAlpha: 1, y: AD.top + AD.h / 2, duration: 0.5, ease: SS.EZ.out }, T.ad);
    SS.tl.fromTo(title, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, T.ad + 0.06);
    SS.tl.fromTo(title, { y: TITLE_AD.y + 30 }, { y: TITLE_AD.y, duration: 0.5, ease: SS.EZ.out }, T.ad);
    SS.cue(T.ad, 'm-ad');

    // ---- tap on the ad (sound effect 1: felt click)
    const tp = SS.D.touch(w);
    SS.D.tapAt(tp, 360, TITLE_AD.y + 4, T.tapAd);
    SS.tl.fromTo(ad, { scale: 1 }, { scale: 0.975, duration: 0.08, ease: 'power2.out' }, T.tapAd);
    SS.tl.fromTo(ad, { scale: 0.975 }, { scale: 1, duration: 0.22, ease: 'power2.out' }, T.tapAd + 0.08);
    // the title presses with the card but is back at scale 1 when it starts travelling (T.open)
    SS.tl.fromTo(title, { scale: 1 }, { scale: 0.975, duration: 0.06, ease: 'power2.out' }, T.tapAd);
    SS.tl.fromTo(title, { scale: 0.975 }, { scale: 1, duration: T.open - T.tapAd - 0.06, ease: 'power2.out' }, T.tapAd + 0.06);
    SS.tl.fromTo(adFx, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -10, duration: 0.14, ease: SS.EZ.in }, T.tapAd + 0.02);
    SS.cue(T.tapAd, 'sfx-tap');

    // ---- the ad opens into the team's page (clip from the ad's rectangle), the title travels
    const page = SS.el('div', 'dm-ui', w);
    Object.assign(page.style, { width: PG.w + 'px', height: PG.h + 'px', borderRadius: '30px', boxShadow: SS.DSH.uiHi, overflow: 'hidden' });
    const clipAd = SS.clipR(AD.top - PG.top, 0, PG.top + PG.h - (AD.top + AD.h), 0, 28);
    SS.place(page, 540, PG.top + PG.h / 2, { autoAlpha: 0, clipPath: clipAd });
    page.innerHTML = `<div class="band" style="position:absolute;left:0;top:0;width:100%;height:112px;background:${C.team};display:flex;align-items:center;gap:20px;padding:0 44px;box-sizing:border-box">
        <span style="width:68px;height:68px;border-radius:50%;background:#fff;color:${C.team};display:grid;place-items:center;font-size:30px;font-weight:800;letter-spacing:-.02em;flex:none">EE</span>
        <span style="font-size:36px;font-weight:700;color:#fff;letter-spacing:-.015em;white-space:nowrap">Équipe Exemple</span></div>
      <div class="sub" style="position:absolute;left:44px;top:212px;font-size:34px;font-weight:500;color:${C.soft};white-space:nowrap">Parlez à un courtier de l'équipe.</div>`;
    const band = page.querySelector('.band'), sub = page.querySelector('.sub');
    gsap.set(band, { yPercent: -100 });
    gsap.set(sub, { autoAlpha: 0, y: 12 });
    SS.tl.set(page, { autoAlpha: 1 }, T.open);
    SS.tl.set(ad, { autoAlpha: 0 }, T.open);
    SS.tl.fromTo(page, { clipPath: clipAd }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.inOut }, T.open);
    SS.tl.fromTo(band, { yPercent: -100 }, { yPercent: 0, duration: 0.45, ease: SS.EZ.out }, T.open + 0.2);
    w.appendChild(title); // the travelling title stays above the page
    const ts = TITLE_PG.size / TITLE_AD.size;
    SS.tl.fromTo(title, { y: TITLE_AD.y, scale: 1, color: C.link }, { y: TITLE_PG.y, scale: ts, color: C.ink, duration: 0.5, ease: SS.EZ.inOut }, T.open);
    SS.tl.fromTo(title, { fontWeight: 620 }, { fontWeight: 740, duration: 0.5, ease: 'power1.inOut' }, T.open);
    SS.tl.fromTo(sub, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: SS.EZ.out }, T.form);
    SS.tl.set([search, ...skels], { visibility: 'hidden' }, T.open + 0.5);
    SS.cue(T.open, 'm-page');

    // ---- the form fills, then "Me faire rappeler"
    const fields = FIELDS.map((f, i) => {
      const lab = SS.el('div', 'dm', page);
      Object.assign(lab.style, { left: '44px', top: f.top - 36 - PG.top + 'px', fontSize: '30px', fontWeight: 560, color: C.soft, whiteSpace: 'nowrap' });
      lab.textContent = f.lab;
      const box = SS.el('div', 'dm-field', page);
      Object.assign(box.style, { left: '44px', top: f.top - PG.top + 'px', width: '792px', height: '82px', boxShadow: 'inset 0 0 0 2px #DCE6E6' });
      box.innerHTML = '<span class="v"><span class="tx"></span><span class="dm-caret"></span></span>';
      const tx = box.querySelector('.tx'), cr = box.querySelector('.dm-caret');
      gsap.set([lab, box], { autoAlpha: 0, y: 14 });
      SS.tl.fromTo([lab, box], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: SS.EZ.out, stagger: 0.03 }, T.form + 0.05 + i * 0.05);
      SS.tl.fromTo(box, { boxShadow: 'inset 0 0 0 2px #DCE6E6' }, { boxShadow: `inset 0 0 0 3px ${C.turq}`, duration: 0.1, ease: 'power1.out' }, f.at - 0.06);
      SS.tl.fromTo(box, { boxShadow: `inset 0 0 0 3px ${C.turq}` }, { boxShadow: 'inset 0 0 0 2px #DCE6E6', duration: 0.12, ease: 'power1.out' }, (FIELDS[i + 1] ? FIELDS[i + 1].at : T.tapCta) - 0.08);
      SS.typer(tx, [{ at: f.at, dur: f.dur, to: f.val, silent: true }], cr);
      return box;
    });
    const btn = SS.el('div', 'dm', page);
    Object.assign(btn.style, { left: '44px', top: BTN.top - PG.top + 'px', width: '792px', height: BTN.h + 'px', borderRadius: BTN.h / 2 + 'px',
      background: C.team, color: '#fff', display: 'grid', placeItems: 'center', fontSize: '40px', fontWeight: 720, letterSpacing: '-.015em',
      boxShadow: '0 16px 30px -16px rgba(47,93,140,.7), inset 0 1px 0 rgba(255,255,255,.2)' });
    btn.textContent = 'Me faire rappeler';
    gsap.set(btn, { autoAlpha: 0, y: 14 });
    SS.tl.fromTo(btn, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: SS.EZ.out }, T.form + 0.22);
    const tp2 = SS.D.touch(w);
    SS.D.tapAt(tp2, 470, BTN.top + BTN.h / 2, T.tapCta);
    SS.tl.fromTo(btn, { scale: 1 }, { scale: 0.965, duration: 0.08, ease: 'power2.out' }, T.tapCta);
    SS.tl.fromTo(btn, { scale: 0.965 }, { scale: 1, duration: 0.22, ease: 'power2.out' }, T.tapCta + 0.08);
    SS.cue(T.tapCta, 'm-cta');

    // camera: a gentle push on the form while it fills
    cam.to(T.form, T.tapCta - T.form + 0.25, 'sine.inOut', { y: 1000, s: 1.05 });

    R = { wrap, w, cam, fields };
    SS.WB = { wrap, w, cam, page, title, PG, TITLE_PG }; // world B continues in 05-cells.js (scenes 4 and 5)
  }
  function render() {
    R.w.style.transform = SS.camMatrix(R.cam.p);
    SS.blur(R.wrap, R.cam.p.blur || 0);
  }
  const scene = { name: 'recherche', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.wrap, T.morph, T.s5Out + 0.5]]; };
  SS.scenes.push(scene);
})();
