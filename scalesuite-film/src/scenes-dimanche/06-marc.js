/* « Dimanche, 21 h 14 » · scene 6, those who are not ready yet (17.8–22.0 s), screen space.
   The play bar rewinds to Marc's request (Thursday 24 September): his card rises, « Pas avant le
   printemps » drops in, the 90-day follow-up track is empty. The bar slides « 6 semaines plus tard »
   (Thursday 5 November): the track fills to 42 days of 90, Julie's follow-up text pops out, Marc answers.
   His answer contracts into his meeting card (« 19 h 45 Marc, duplex, Villeray »), which glides up to
   where the agenda will take it over at 22.55 (02-agenda.js, scene 7). The rest leaves through the top. */
(function () {
  const SS = window.SS, T = SS.DT, C = SS.DC;
  const MC = { top: 560, w: 860, h: 300 };
  const HANDOFF = { cy: 980 }; // screen centre of Marc's meeting card when the agenda takes it (local top 315)
  const XB = { b: 0 };
  let R;
  function build(stage) {
    const L = SS.el('div', 'layer', stage);
    const box = SS.el('div', 'dm', L); // everything but the born card (leaves together)
    Object.assign(box.style, { width: '1080px', height: '1920px' });
    // ---- Marc's request card
    const mc = SS.el('div', 'dm-ui', box);
    Object.assign(mc.style, { width: MC.w + 'px', height: MC.h + 'px', borderRadius: '32px', boxShadow: SS.DSH.uiHi });
    mc.innerHTML = `<div style="position:absolute;left:44px;top:34px;font-size:44px;font-weight:720;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">Marc, duplex, Villeray</div>
      <div style="position:absolute;left:44px;top:92px;font-size:32px;font-weight:540;color:${C.soft};white-space:nowrap">Demande du 24 septembre</div>
      <div class="chip" style="position:absolute;left:44px;top:146px;height:60px;padding:0 26px;border-radius:30px;background:#EDF2F2;color:${C.ink2};font-size:34px;font-weight:650;letter-spacing:-.01em;display:flex;align-items:center;white-space:nowrap">Pas avant le printemps</div>
      <div style="position:absolute;left:44px;top:226px;font-size:32px;font-weight:600;color:${C.soft};white-space:nowrap">Suivi pendant 90 jours</div>
      <div style="position:absolute;left:400px;top:244px;width:416px;height:12px;border-radius:6px;background:${C.track}"></div>
      <div class="fill" style="position:absolute;left:400px;top:244px;width:416px;height:12px;border-radius:6px;background:${C.turq};transform-origin:0 50%"></div>`;
    SS.place(mc, 540, MC.top + MC.h / 2 + 260, { autoAlpha: 0 });
    const chip = mc.querySelector('.chip'), fill = mc.querySelector('.fill');
    gsap.set(chip, { autoAlpha: 0, y: -24, scale: 1.08 });
    gsap.set(fill, { scaleX: 0 });
    SS.tl.fromTo(mc, { autoAlpha: 0, y: MC.top + MC.h / 2 + 260 }, { autoAlpha: 1, y: MC.top + MC.h / 2, duration: SS.SPR.soft.dur, ease: SS.SPR.soft.ease }, T.marc);
    SS.tl.fromTo(chip, { autoAlpha: 0, y: -24, scale: 1.08 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: SS.EZ.out }, T.spring);
    SS.tl.fromTo(fill, { scaleX: 0 }, { scaleX: 42 / 90, duration: T.sixDur, ease: 'power2.inOut' }, T.six);
    SS.cue(T.marc, 'm-marc');
    // ---- Julie's follow-up text, then Marc's answer
    const fu = SS.D.bubble(box, 'Bonjour Marc, ici Julie. Toujours dans vos plans de vendre au printemps?', { max: 690 });
    Object.assign(fu.style, { left: '110px', top: '900px', transformOrigin: '0 100%' });
    const rp = SS.D.bubble(box, 'Oui! On pourrait se voir la semaine prochaine?', { max: 600, bg: C.deep, fg: '#fff' });
    const rw = rp.offsetWidth, rh = rp.offsetHeight, fh = fu.offsetHeight;
    const RP = { left: 930 - rw, top: 900 + fh + 20, w: rw, h: rh };
    Object.assign(rp.style, { left: RP.left + 'px', top: RP.top + 'px', transformOrigin: '100% 100%' });
    gsap.set(fu, { autoAlpha: 0, scale: 0.86 });
    gsap.set(rp, { autoAlpha: 0, scale: 0.86 });
    SS.tl.fromTo(fu, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, ease: 'power1.out' }, T.follow);
    SS.tl.fromTo(fu, { scale: 0.86 }, { scale: 1, duration: SS.SPR.pop.dur, ease: SS.SPR.pop.ease }, T.follow);
    SS.tl.fromTo(rp, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, ease: 'power1.out' }, T.reply);
    SS.tl.fromTo(rp, { scale: 0.86 }, { scale: 1, duration: SS.SPR.pop.dur, ease: SS.SPR.pop.ease }, T.reply);
    SS.cue(T.reply, 'm-reply');
    // ---- the answer contracts into Marc's meeting card (same card as in the agenda)
    const D = SS.AGENDA.CARDS[2];
    const card = SS.D.card(L, D);
    const k0 = { sx: RP.w / SS.AGENDA.CARD.w, sy: RP.h / SS.AGENDA.CARD.h };
    const c0 = { x: RP.left + RP.w / 2, y: RP.top + RP.h / 2 };
    SS.place(card, c0.x, c0.y, { autoAlpha: 0, scaleX: k0.sx, scaleY: k0.sy, rotation: 0 });
    SS.tl.fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power1.inOut' }, T.born);
    SS.tl.fromTo(rp, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.24, ease: 'power1.inOut' }, T.born + 0.04);
    SS.tl.fromTo(card, { scaleX: k0.sx, scaleY: k0.sy }, { scaleX: 1, scaleY: 1, duration: SS.SPR.card.dur, ease: SS.SPR.card.ease }, T.born);
    SS.tl.fromTo(card, { x: c0.x }, { x: 540, duration: 0.45, ease: SS.EZ.out }, T.born);
    SS.tl.fromTo(card, { y: c0.y, rotation: 0 }, { y: HANDOFF.cy, rotation: D.r, duration: 0.75, ease: SS.EZ.inOut }, T.dExit + 0.1);
    SS.tl.set(card, { autoAlpha: 0 }, T.hand); // the agenda's own Marc card takes over, identical
    SS.tl.fromTo(XB, { b: 0 }, { b: 2.5, duration: 0.12, ease: 'power1.in' }, T.born);
    SS.tl.fromTo(XB, { b: 2.5 }, { b: 0, duration: 0.18, ease: 'power1.out' }, T.born + 0.12);
    SS.cue(T.born, 'm-born');
    // ---- the rest leaves through the top (the story keeps going down)
    SS.tl.fromTo(box, { y: 0 }, { y: -1100, duration: 0.45, ease: 'power2.in' }, T.dExit);
    R = { L, card, rp };
  }
  // the answer → card crossfade is bridged by a light blur on both (procedural, from the XB proxy)
  function render() { SS.blur(R.card, XB.b); SS.blur(R.rp, XB.b); }
  const scene = { name: 'marc', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.L, T.sept, T.hand + 0.05]]; };
  SS.scenes.push(scene);
})();
