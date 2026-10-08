/* Scene 1 · 7 h, Café (0–2.8 s).
   Frame 0: a big turquoise mug that steams and a big clock « 6 h 59 ». The minutes roll to « 7 h 00 »,
   then the clock and the mug fly into the hour marker (shared elements) while the day rail slides in.
   The broker's phone rises; the weekly notification drops with a 12 % overshoot and a haptic buzz:
   « Optimisations de la semaine appliquées · Par notre IA et notre équipe ». Push in on it.
   Exit: a tap unfolds the notification into the sponsored ad card (scene 2), the phone drops away
   and the marker rolls to 10 h. */
(function () {
  const SS = window.SS;
  const C = SS.C;
  const T = { roll: 0.36, fly: 0.78, pill: 1.06, rail: 1.12, phone: 0.92, note: 1.5, head: 1.6, push: 2.0, tap: 2.3, unfold: 2.4,
    drop: 2.44, headOut: 2.45, end: 2.8 };
  const PH = { top: 640, w: 820, h: 1700 };
  const NOTE = { y: 1230, w: 760, h: 300 };
  SS.NOTE_A = NOTE;
  const BIG = { mugY: 720, mugS: 4.6, clockY: 1110, clockS: 2.55 };
  const P = { shake: 0, steam: 1 };

  let R;
  function build(stage) {
    const world = SS.makeWorld(stage);
    SS.camSet({ x: 540, y: 960, s: 1, r: 0 });
    const M = SS.buildMarker(stage);
    const MK = SS.MARK;

    // ---------------------------------------------------------------- hook: clock + mug → marker
    // the clock IS the marker's time, scaled up and centred at frame 0
    SS.roll(M.cols.cMU, 9, 10, T.roll, 0.4);
    SS.roll(M.cols.cMT, 5, 10, T.roll + 0.05, 0.42);
    SS.roll(M.cols.cHU, 6, 7, T.roll + 0.12, 0.45, 'back.out(1.6)');
    SS.cue(T.roll, 'clock');
    const tw = M.time.getBoundingClientRect().width;
    const tx0 = 540 - (tw * BIG.clockS) / 2 - (MK.pillL + 112), ty0 = BIG.clockY - MK.y;
    gsap.set(M.time, { x: tx0, y: ty0, scale: BIG.clockS });
    SS.tl.fromTo(M.time, { x: tx0, scale: BIG.clockS }, { x: 0, scale: 1, duration: 0.62, ease: SS.EZ.inOut }, T.fly);
    SS.tl.fromTo(M.time, { y: ty0 }, { y: 0, duration: 0.62, ease: SS.EZ.out }, T.fly + 0.04); // y leads less than x: an arc
    // the mug: same drawing as the marker icon, 4.6× bigger, thinner stroke while big
    const mug = SS.el('div', 'a3', M.layer, SS.dayIcon.mug());
    Object.assign(mug.style, { left: MK.pillL + 28 + 'px', top: MK.y - 32 + 'px', width: '64px', height: '64px', transformOrigin: '50% 50%' });
    const mugSvg = mug.querySelector('svg');
    mugSvg.style.overflow = 'visible';
    const mx0 = 540 - (MK.pillL + 60), my0 = BIG.mugY - MK.y;
    gsap.set(mug, { x: mx0, y: my0, scale: BIG.mugS });
    gsap.set(mugSvg, { attr: { 'stroke-width': 1.05 } });
    SS.tl.fromTo(mug, { x: mx0, scale: BIG.mugS }, { x: 0, scale: 1, duration: 0.6, ease: SS.EZ.inOut }, T.fly - 0.2);
    SS.tl.fromTo(mug, { y: my0 }, { y: 0, duration: 0.6, ease: SS.EZ.out }, T.fly - 0.16);
    SS.tl.fromTo(mugSvg, { attr: { 'stroke-width': 1.05 } }, { attr: { 'stroke-width': 1.9, }, duration: 0.5, ease: 'power1.inOut' }, T.fly + 0.05);
    SS.tl.fromTo(P, { steam: 1 }, { steam: 0, duration: 0.4, ease: 'power1.in' }, T.fly + 0.2);
    // at 10 h the mug leaves its slot upward (it is not clipped by the slot: it fades as it goes)
    SS.tl.fromTo(mug, { y: 0, autoAlpha: 1 }, { y: -46, autoAlpha: 0, duration: 0.22, ease: SS.EZ.in }, SS.DAY[1].at);
    SS.cue(T.fly, 'fly');
    // pill, label, rail
    gsap.set(M.pill, { scale: 0.6, autoAlpha: 0 });
    SS.tl.fromTo(M.pill, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: SS.EZ.pop }, T.pill);
    SS.tl.fromTo(M.labels[0], { yPercent: 130 }, { yPercent: 0, duration: 0.45, ease: SS.EZ.out }, T.pill + 0.14);
    gsap.set(M.rail, { x: 40, autoAlpha: 0 });
    SS.tl.fromTo(M.rail, { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: SS.EZ.out }, T.rail);
    SS.tl.fromTo(M.nodes[0], { scale: 1, backgroundColor: '#C9D6D4', boxShadow: '0 0 0 5px #fff' },
      { scale: 1.25, backgroundColor: C.green, boxShadow: '0 0 0 7px rgba(43,191,179,.28)', duration: 0.4, ease: SS.EZ.pop }, T.rail + 0.2);
    SS.cue(T.pill, 'pill');

    // ---------------------------------------------------------------- the phone and the notification
    const phoneBox = SS.el('div', 'a3', world);
    const ph = SS.phone(phoneBox, { date: 'vendredi 16 octobre', time: '7:02' });
    SS.place(ph.el, 540, PH.top + PH.h / 2, { y: PH.top + PH.h / 2 + 1400 });
    SS.tl.fromTo(ph.el, { y: PH.top + PH.h / 2 + 1400 }, { y: PH.top + PH.h / 2, duration: 0.75, ease: SS.EZ.out }, T.phone);
    SS.tl.fromTo(ph.el, { y: PH.top + PH.h / 2 }, { y: PH.top + PH.h / 2 + 1900, duration: 0.5, ease: SS.EZ.in }, T.drop);
    SS.cue(T.phone, 'phone');

    const ad = SS.sponsored(world); // above the phone, under the notification it unfolds from
    const note = SS.el('div', 'a3', world);
    Object.assign(note.style, { width: NOTE.w + 'px', height: NOTE.h + 'px', borderRadius: '40px', background: '#fff', boxShadow: SS.SH.note });
    const nc = SS.el('div', 'a3', note);
    Object.assign(nc.style, { left: 0, top: 0, width: NOTE.w + 'px', height: NOTE.h + 'px' });
    SS.noteHead(nc);
    const nt = SS.el('div', 'a3', nc, 'Optimisations de la semaine<br>appliquées');
    Object.assign(nt.style, { left: '30px', top: '92px', fontSize: '40px', fontWeight: 780, letterSpacing: '-.02em', lineHeight: 1.18, color: C.ink, whiteSpace: 'nowrap' });
    const ns = SS.el('div', 'a3', nc);
    Object.assign(ns.style, { left: '30px', top: '206px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '32px', fontWeight: 650, color: C.soft, whiteSpace: 'nowrap' });
    ns.innerHTML = '<span class="ck" style="width:36px;height:36px;display:block"></span>Par notre IA et notre équipe';
    const chk = SS.check(ns.querySelector('.ck'), 36, C.green);
    SS.place(note, 540, NOTE.y - 150, { autoAlpha: 0, scale: 0.9 });
    SS.tl.fromTo(note, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, ease: 'power1.out' }, T.note);
    SS.tl.fromTo(note, { y: NOTE.y - 150, scale: 0.9 }, { y: NOTE.y, scale: 1, duration: 0.55, ease: SS.EZ.pop12 }, T.note);
    SS.tl.fromTo(P, { shake: 0 }, { shake: 1, duration: 0.42, ease: 'none' }, T.note + 0.1); // haptic envelope (decay in render)
    const C1 = { chk: 0 };
    SS.tl.fromTo(C1, { chk: 0 }, { chk: 1, duration: 0.5, ease: 'none' }, T.note + 0.38); // check.set() eases internally
    SS.cue(T.note, 'note'); SS.cue(T.note + 0.1, 'haptic');

    // ---------------------------------------------------------------- tap → the notification unfolds into the ad
    SS.tapAt(world, note, 380, NOTE.y + 20, T.tap);
    const ci = SS.clipR((SS.AD_H - NOTE.h) / 2, (900 - NOTE.w) / 2, (SS.AD_H - NOTE.h) / 2, (900 - NOTE.w) / 2, 40);
    SS.place(ad.el, 540, NOTE.y, { autoAlpha: 0, clipPath: ci });
    gsap.set(ad.inner, { y: 40, autoAlpha: 0 });
    SS.tl.set(ad.el, { autoAlpha: 1 }, T.unfold);
    SS.tl.fromTo(ad.el, { clipPath: ci }, { clipPath: SS.OPEN, duration: 0.5, ease: SS.EZ.inOut }, T.unfold);
    SS.tl.fromTo(nc, { y: 0, autoAlpha: 1 }, { y: -30, autoAlpha: 0, duration: 0.14, ease: SS.EZ.in }, T.unfold - 0.02);
    SS.tl.set(note, { autoAlpha: 0 }, T.unfold + 0.12); // the card under it is open past its edges by then
    SS.tl.fromTo(ad.inner, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42, ease: SS.EZ.out }, T.unfold + 0.12);
    SS.cue(T.unfold, 'unfold');
    SS.adA = ad;

    // ---------------------------------------------------------------- camera
    SS.camTo(T.push, 0.55, SS.EZ.cam, { y: 1120, s: 1.15 }); // the lock-screen clock stays under the headline

    // ---------------------------------------------------------------- headline
    const layer = SS.el('div', 'layer', stage);
    const scr = SS.tintScrim(layer); // the push brings the lock screen under the headline
    gsap.set(scr, { autoAlpha: 0 });
    SS.tl.fromTo(scr, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, T.head - 0.15);
    SS.tl.fromTo(scr, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, T.headOut + 0.1);
    const h = SS.head(layer, 'Optimisée\n*cette* *semaine.*', 452);
    SS.wordsIn(h, T.head, { st: 0.07, dur: 0.6 }); // settled before it leaves (never two tweens on one property)
    SS.wordsOut(h, T.headOut, { st: 0.02 });
    SS.cue(T.head, 'line');

    SS.hourTo(1, SS.DAY[1].at);
    R = { layer, phoneBox, note, mugSvg, chk, C1 };
  }

  function render(t) {
    const k = P.shake;
    const dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.note.style.translate = `${dx.toFixed(2)}px 0px`;
    // steam: two curls rising and swaying while the mug is big
    const st = R.mugSvg.querySelector('.steam');
    const a = P.steam;
    st.setAttribute('transform', `translate(${(Math.sin(t * 5.1) * 0.35).toFixed(3)} ${(-((t * 1.6) % 1) * 0.8).toFixed(3)})`);
    st.setAttribute('opacity', (a * (0.55 + 0.45 * Math.sin(t * 3.3) ** 2)).toFixed(3));
    R.chk.set(R.C1.chk);
  }

  const scene = { name: 'matin', a: -1, b: 99, render, ranges: [] };
  // the phone finishes its drop at 2.94 s
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, 0, 3.0], [R.phoneBox, 0, 3.0]]; };
  SS.scenes.push(scene);
})();
