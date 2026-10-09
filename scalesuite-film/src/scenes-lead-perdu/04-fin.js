/* « Le lead perdu » · end card (21.5–25.2 s), screen space, same lockup as the V3 call to action.
   The notification has thinned into a line (03-solution); the line contracts into a node, the node
   grows the ScaleSuite mark, the wordmark rises, the tagline, then the button grows out of a node
   (≈ 10 % overshoot) and the URL. Everything is settled by ≈ 23.1 s and held to the end. */
(function () {
  const SS = window.SS, L = SS.LT, C = SS.C;
  const G = { LH: 196, LY: 730, tagY: 922, cta: { y: 1096, w: 700, h: 136, size: 50 }, urlY: 1258 };
  const LW = (G.LH * SS.LOGO.w) / SS.LOGO.h;
  const markX = 540 - LW / 2 + 58 * (G.LH / SS.LOGO.h);

  let R;
  function build(stage) {
    const layer = SS.el('div', 'layer', stage);
    // the line (takes over from the flattened notification, identical)
    const line = SS.el('div', 'a3', layer);
    Object.assign(line.style, { width: SS.ENDLINE.w + 'px', height: '6px', borderRadius: '3px', background: C.turq });
    SS.place(line, 540, SS.ENDLINE.y, { autoAlpha: 0 });
    SS.tl.set(line, { autoAlpha: 1 }, L.handoff);
    SS.tl.fromTo(line, { x: 540, scaleX: 1 }, { x: markX, scaleX: 0.008, duration: 0.34, ease: SS.EZ.in }, L.merge);
    SS.tl.fromTo(line, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.06, ease: 'none' }, L.merge + 0.3);
    const node = SS.el('div', 'a3', layer);
    Object.assign(node.style, { width: '26px', height: '26px', borderRadius: '50%', background: C.green, boxShadow: '0 0 0 9px rgba(43,191,179,.2)' });
    SS.place(node, markX, G.LY, { scale: 0 });
    SS.tl.fromTo(node, { scale: 0 }, { scale: 2.6, duration: 0.22, ease: SS.EZ.out }, L.merge + 0.26);
    SS.tl.fromTo(node, { scale: 2.6 }, { scale: 0, duration: 0.26, ease: SS.EZ.in }, L.merge + 0.49);
    // lockup
    const logo = SS.logo(layer, G.LH);
    SS.place(logo.el, 540, G.LY);
    gsap.set(logo.letters, { y: 150 });
    const P = { mark: 0, sheen: 0 };
    SS.tl.fromTo(P, { mark: 0 }, { mark: 1, duration: 0.66, ease: 'none' }, L.endMark);
    SS.tl.fromTo(logo.letters, { y: 150 }, { y: 0, duration: 0.6, stagger: 0.03, ease: SS.EZ.out }, L.endLetters);
    SS.tl.fromTo(P, { sheen: 0 }, { sheen: 1, duration: 0.7, ease: 'sine.inOut' }, L.sheen - 0.3);
    SS.cue(L.endMark, 'm-endmark');
    const tag = SS.text(layer, 'Google Ads pour les équipes immobilières.', { size: 44, weight: 560, color: C.soft, tracking: -0.015, maxW: 900 });
    SS.place(tag.el, 540, G.tagY);
    SS.hideWords(tag);
    SS.wordsIn(tag, L.tag, { st: 0.035, dur: 0.65 });
    // call to action: a node that grows into the button
    const clip = SS.clipR;
    const cta = SS.el('div', 'a3', layer);
    Object.assign(cta.style, { width: G.cta.w + 'px', height: G.cta.h + 'px', borderRadius: G.cta.h / 2 + 'px', overflow: 'hidden',
      background: 'linear-gradient(135deg,#2BBFB3 0%,#1D9E75 100%)', boxShadow: '0 22px 44px -18px rgba(29,158,117,.65), inset 0 1px 0 rgba(255,255,255,.25)' });
    cta.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:18px;color:#fff;font-size:${G.cta.size}px;font-weight:760;letter-spacing:-.02em">
        <span class="m" style="display:inline-block;overflow:hidden;padding:.16em .06em .22em;margin:-.16em -.06em -.22em"><span class="w" style="display:inline-block">Demander une démo</span></span>
        <span class="ar" style="width:${G.cta.size * 0.95}px;height:${G.cta.size * 0.95}px;display:block">${SS.icon.arrow('#fff')}</span></div>
      <div class="sh" style="position:absolute;top:-20%;left:-140px;width:90px;height:140%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.45),rgba(255,255,255,0));transform:skewX(-18deg)"></div>`;
    const cw = cta.querySelector('.w'), ar = cta.querySelector('.ar'), sh = cta.querySelector('.sh');
    const side = (G.cta.w - G.cta.h) / 2;
    SS.place(cta, 540, G.cta.y, { autoAlpha: 0, scale: 0.4, clipPath: clip(0, side, 0, side, G.cta.h / 2) });
    gsap.set(cw, { yPercent: SS.HIDE }); gsap.set(ar, { x: -26, autoAlpha: 0 }); gsap.set(sh, { x: 0 });
    SS.tl.set(cta, { autoAlpha: 1 }, L.cta);
    SS.tl.fromTo(cta, { scale: 0.4 }, { scale: 1, duration: 0.42, ease: SS.EZ.pop }, L.cta);
    SS.tl.fromTo(cta, { clipPath: clip(0, side, 0, side, G.cta.h / 2) }, { clipPath: clip(0, 0, 0, 0, G.cta.h / 2), duration: 0.6, ease: SS.EZ.pop }, L.cta + 0.06);
    SS.tl.fromTo(cw, { yPercent: SS.HIDE }, { yPercent: 0, duration: 0.6, ease: SS.EZ.out }, L.cta + 0.2);
    SS.tl.fromTo(ar, { x: -26, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: SS.EZ.out }, L.cta + 0.36);
    SS.tl.fromTo(ar, { x: 0 }, { x: 10, duration: 0.25, ease: 'sine.inOut' }, L.nudge);
    SS.tl.fromTo(ar, { x: 10 }, { x: 0, duration: 0.3, ease: 'sine.inOut' }, L.nudge + 0.25);
    SS.tl.fromTo(sh, { x: 0 }, { x: G.cta.w + 200, duration: 0.6, ease: 'sine.inOut' }, L.sheen);
    SS.cue(L.cta, 'sfx-cta');
    const url = SS.text(layer, 'scalesuiteqc.ca', { size: 40, weight: 650, color: C.ink2, tracking: -0.01 });
    SS.place(url.el, 540, G.urlY);
    SS.hideWords(url);
    SS.wordsIn(url, L.url, { dur: 0.6 });
    // a barely perceptible drift while the end card holds
    SS.tl.fromTo([logo.el, cta], { scale: 1 }, { scale: 1.012, duration: L.end - 23.1, ease: 'sine.inOut' }, 23.1);
    R = { layer, logo, P };
  }
  function render() {
    R.logo.mark(R.P.mark);
    R.logo.sheen(R.P.sheen);
  }
  const scene = { name: 'fin', a: 21.0, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, L.handoff, L.end + 1]]; };
  SS.scenes.push(scene);
})();
