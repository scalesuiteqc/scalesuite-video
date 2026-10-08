/* The day in review and the end (18.1–25.0 s).
   Scene 9 · Summary: three lines dock in as the report leaves: « 10 h · Visite ✓ Annonce affichée »,
   « 13 h · Notaire ✓ Lead ajouté au CRM », « 17 h · Fin de journée ✓ Rapport reçu ». « Google Ads? »,
   a breath, then « Pas ouvert de la journée. ». Fixed frame. Holds.
   Scene 10 · End (kept from the V3): the lines contract into a node, which becomes the mark; the
   wordmark rises, « Google Ads pour l'immobilier québécois. », the button grows out of a node
   (« Demander une démo → »), « scalesuiteqc.ca ». Everything settled by ≈ 23 s, held to 25 s. */
(function () {
  const SS = window.SS;
  const C = SS.C;
  const T = { lines: 18.35, q: 18.45, pas: 19.2, out: 21.2, merge: 21.22, node: 21.55, mark: 21.68, letters: 21.8, tag: 22.1, cta: 22.25, url: 22.5,
    sheen: 23.4, nudge: 23.8, drift: 23.0, end: 25.0 };
  const G = { LH: 196, LY: 730, tagY: 922, cta: { y: 1096, w: 700, h: 136, size: 50 }, urlY: 1258 };
  const LW = (G.LH * SS.LOGO.w) / SS.LOGO.h;
  const markX = 540 - LW / 2 + 58 * (G.LH / SS.LOGO.h);
  const LINES = [['house', '10 h · Visite', 'Annonce affichée'], ['docCheck', '13 h · Notaire', 'Lead ajouté au CRM'], ['sunset', '17 h · Fin de journée', 'Rapport reçu']];
  let R;

  function build(stage) {
    // ================================================================ scene 9
    const L9 = SS.proofLayer(stage);
    const h = SS.head(L9, 'Google Ads?\n*Pas* *ouvert*\n*de* *la* *journée.*', 420);
    SS.wordsIn(h, T.q, { to: 2, st: 0.07, dur: 0.5 });
    SS.wordsIn(h, T.pas, { from: 2, st: 0.06, dur: 0.5 });
    SS.wordsOut(h, T.out, { st: 0.02 });
    SS.cue(T.q, 'line'); SS.cue(T.pas, 'zero');
    const P = { chk: 0 };
    const checks = [];
    const lines = LINES.map(([ic, a, b], i) => {
      const r = SS.el('div', 'a3', L9);
      Object.assign(r.style, { width: '880px', height: '170px', borderRadius: '30px', background: '#fff', boxShadow: SS.SH.card });
      r.innerHTML = `<div style="position:absolute;left:30px;top:35px;width:100px;height:100px;border-radius:26px;background:${C.mint};display:grid;place-items:center"><div style="width:68px;height:68px">${SS.dayIcon[ic](C.turq)}</div></div>
        <div style="position:absolute;left:160px;top:30px;font-size:42px;font-weight:780;letter-spacing:-.02em;color:${C.ink};white-space:nowrap">${a}</div>
        <div style="position:absolute;left:160px;top:94px;display:flex;align-items:center;gap:12px;font-size:34px;font-weight:680;color:${C.green};white-space:nowrap"><span class="ck" style="width:36px;height:36px;display:block"></span>${b}</div>`;
      checks.push(SS.check(r.querySelector('.ck'), 36, C.green));
      const y = 820 + i * 196;
      SS.place(r, 540, y, { autoAlpha: 0, y: y + 110 });
      SS.tl.fromTo(r, { autoAlpha: 0, y: y + 110 }, { autoAlpha: 1, y, duration: 0.5, ease: SS.EZ.dock }, T.lines + i * 0.08);
      SS.cue(T.lines + i * 0.08, 'check5', { i });
      // exit: the line contracts into the node that becomes the mark
      SS.tl.fromTo(r, { x: 540, y, scaleX: 1, scaleY: 1 }, { x: markX, y: G.LY, scaleX: 0.03, scaleY: 0.15, duration: 0.3, ease: SS.EZ.in }, T.merge + i * 0.03);
      SS.tl.fromTo(r, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.06, ease: 'none' }, T.merge + i * 0.03 + 0.26);
      return r;
    });
    SS.tl.fromTo(P, { chk: 0 }, { chk: 1, duration: 0.6, ease: 'none' }, T.lines + 0.25);
    SS.cue(T.merge, 'merge');

    // ================================================================ scene 10 (the V3 end card)
    const L10 = SS.proofLayer(stage);
    const node = SS.el('div', 'a3', L10);
    Object.assign(node.style, { width: '26px', height: '26px', borderRadius: '50%', background: C.green, boxShadow: '0 0 0 9px rgba(43,191,179,.2)' });
    SS.place(node, markX, G.LY, { scale: 0 });
    SS.tl.fromTo(node, { scale: 0 }, { scale: 2.6, duration: 0.16, ease: SS.EZ.out }, T.node); // grown before it shrinks into the mark
    SS.tl.fromTo(node, { scale: 2.6 }, { scale: 0, duration: 0.28, ease: SS.EZ.in }, T.mark + 0.08);
    const logo = SS.logo(L10, G.LH);
    SS.place(logo.el, 540, G.LY);
    gsap.set(logo.letters, { y: 150 });
    const LP = { mark: 0, sheen: 0 };
    SS.tl.fromTo(LP, { mark: 0 }, { mark: 1, duration: 0.66, ease: 'none' }, T.mark); // logo.mark() eases internally
    SS.tl.fromTo(logo.letters, { y: 150 }, { y: 0, duration: 0.6, stagger: 0.03, ease: SS.EZ.out }, T.letters);
    SS.tl.fromTo(LP, { sheen: 0 }, { sheen: 1, duration: 0.7, ease: 'sine.inOut' }, T.sheen - 0.3);
    SS.cue(T.mark, 'mark2'); SS.cue(T.letters, 'letters2');
    const tag = SS.text(L10, 'Google Ads pour l’immobilier québécois.', { size: 44, weight: 560, color: C.soft, tracking: -0.015, maxW: 900 });
    SS.place(tag.el, 540, G.tagY);
    SS.hideWords(tag);
    SS.wordsIn(tag, T.tag, { st: 0.035, dur: 0.6 });
    const cta = SS.el('div', 'a3', L10);
    Object.assign(cta.style, { width: G.cta.w + 'px', height: G.cta.h + 'px', borderRadius: G.cta.h / 2 + 'px', overflow: 'hidden',
      background: 'linear-gradient(135deg,#2BBFB3 0%,#1D9E75 100%)', boxShadow: '0 22px 44px -18px rgba(29,158,117,.65), inset 0 1px 0 rgba(255,255,255,.25)' });
    cta.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:18px;color:#fff;font-size:${G.cta.size}px;font-weight:760;letter-spacing:-.02em">
        <span style="display:inline-block;overflow:hidden;padding:.16em .06em .22em;margin:-.16em -.06em -.22em"><span class="w" style="display:inline-block">Demander une démo</span></span>
        <span class="ar" style="width:${G.cta.size * 0.95}px;height:${G.cta.size * 0.95}px;display:block">${SS.icon.arrow('#fff')}</span></div>
      <div class="sh" style="position:absolute;top:-20%;left:-140px;width:90px;height:140%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.45),rgba(255,255,255,0));transform:skewX(-18deg)"></div>`;
    const cw = cta.querySelector('.w'), ar = cta.querySelector('.ar'), sh = cta.querySelector('.sh');
    const side = (G.cta.w - G.cta.h) / 2;
    const c0 = SS.clipR(0, side, 0, side, G.cta.h / 2), c1 = SS.clipR(0, 0, 0, 0, G.cta.h / 2);
    SS.place(cta, 540, G.cta.y, { autoAlpha: 0, scale: 0.4, clipPath: c0 });
    gsap.set(cw, { yPercent: SS.HIDE }); gsap.set(ar, { x: -26, autoAlpha: 0 }); gsap.set(sh, { x: 0 });
    SS.tl.set(cta, { autoAlpha: 1 }, T.cta);
    SS.tl.fromTo(cta, { scale: 0.4 }, { scale: 1, duration: 0.42, ease: SS.EZ.pop }, T.cta);
    SS.tl.fromTo(cta, { clipPath: c0 }, { clipPath: c1, duration: 0.6, ease: SS.EZ.pop }, T.cta + 0.06);
    SS.tl.fromTo(cw, { yPercent: SS.HIDE }, { yPercent: 0, duration: 0.6, ease: SS.EZ.out }, T.cta + 0.2);
    SS.tl.fromTo(ar, { x: -26, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: SS.EZ.out }, T.cta + 0.36);
    SS.tl.fromTo(ar, { x: 0 }, { x: 10, duration: 0.25, ease: 'sine.inOut' }, T.nudge);
    SS.tl.fromTo(ar, { x: 10 }, { x: 0, duration: 0.3, ease: 'sine.inOut' }, T.nudge + 0.25);
    SS.tl.fromTo(sh, { x: 0 }, { x: G.cta.w + 200, duration: 0.6, ease: 'sine.inOut' }, T.sheen);
    SS.cue(T.cta, 'cta'); SS.cue(T.sheen, 'sheen2');
    const url = SS.text(L10, 'scalesuiteqc.ca', { size: 40, weight: 650, color: C.ink2, tracking: -0.01 });
    SS.place(url.el, 540, G.urlY);
    SS.hideWords(url);
    SS.wordsIn(url, T.url, { dur: 0.6 });
    // a barely perceptible drift while the end card holds (the CTA's scale is free after its pop)
    SS.tl.fromTo([logo.el, cta], { scale: 1 }, { scale: 1.012, duration: T.end - T.drift, ease: 'sine.inOut' }, T.drift);

    R = { L9, L10, logo, LP, checks, P };
  }

  function render() {
    R.logo.mark(R.LP.mark);
    R.logo.sheen(R.LP.sheen);
    R.checks.forEach((c, i) => c.set(SS.clamp01(R.P.chk * 1.6 - i * 0.3)));
  }
  const scene = { name: 'bilan-fin', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.L9, 18.2, T.merge + 0.5], [R.L10, T.merge, 99]]; };
  SS.scenes.push(scene);
})();
