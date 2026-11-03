/* « Système Vendeurs 5 minutes » · proof, thesis and end card (25.0–34.0 s), screen space on the mint.
   10 · Proof (25.0–27.8): « Groupe Mackay », 124 counted from 0 (0.8 s), « demandes en moins de 7 mois. »,
        « Avec la campagne seule. » (the only real name in the film, as published on the site).
   11 · Thesis (27.8–30.4): the number flattens into a line; « Vos courtiers rencontrent des vendeurs. »
        above it, « Nous, on vous les amène. » below it (deep teal); Courtier 03's card shows
        « Rencontre · Vendeur · Longueuil » (the destination, discreet, no date, no promise).
   12 · End (30.4–34.0): the line contracts into a node, the node grows the ScaleSuite mark, the wordmark
        rises, « Le Système Vendeurs 5 minutes », the ink button « Obtenir mon diagnostic gratuit » grows
        out of a node (≈ 10 % overshoot), « scalesuiteqc.ca ». Settled at 31.8 s, held to 34.0 s.
   Also re-appends the clock layer on top of the stage. */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M;
  const LINE = { y: 600, w: 780 };
  const G = { LH: 190, LY: 740, tagY: 935, cta: { y: 1110, w: 840, h: 136, size: 42 }, urlY: 1282 };
  const LW = (G.LH * SS.LOGO.w) / SS.LOGO.h;
  const markX = 540 - LW / 2 + 58 * (G.LH / SS.LOGO.h);

  let R;
  function build(stage) {
    const layer = SS.el('div', 'layer', stage);

    // ================================================================ 10 · proof
    const gm = SS.text(layer, 'Groupe Mackay', { size: 56, weight: 760, color: M.ink, tracking: -0.025 });
    SS.place(gm.el, 540, 600);
    SS.say(gm, S.proof, S.proofOut, { st: 0.05 });
    const numM = SS.el('div', 'a3', layer); // mask
    Object.assign(numM.style, { width: '900px', height: '300px', overflow: 'hidden' });
    SS.place(numM, 540, 830);
    const num = SS.el('div', 'a3 sy-tnum', numM);
    Object.assign(num.style, { fontSize: '270px', fontWeight: 800, letterSpacing: '-.05em', color: M.teal, lineHeight: 1, whiteSpace: 'nowrap' });
    num.textContent = '124';
    SS.place(num, 450, 150, { yPercent: -50 });
    gsap.set(num, { y: 400 });
    SS.tl.fromTo(num, { y: 400 }, { y: 150, duration: 0.6, ease: SS.EZ.out }, S.count - 0.1);
    SS.counter(num, [{ at: S.count, dur: 0.8, from: 0, to: 124, ease: 'power3.out' }]);
    const dm = SS.text(layer, 'demandes en moins de 7 mois.', { size: 60, weight: 760, color: M.ink, tracking: -0.03, maxW: 960 });
    SS.place(dm.el, 540, 1040);
    SS.say(dm, S.count + 0.25, S.proofOut + 0.02, { st: 0.05 });
    const se = SS.text(layer, 'Avec la campagne seule.', { size: 42, weight: 600, color: M.soft, tracking: -0.015 });
    SS.place(se.el, 540, 1130);
    SS.say(se, S.seule, S.proofOut + 0.04, { st: 0.04 });
    SS.cue(S.count, 'm-count');
    // the number flattens into the thesis line
    const line = SS.el('div', 'a3', layer);
    Object.assign(line.style, { width: LINE.w + 'px', height: '6px', borderRadius: '3px', background: M.turq });
    SS.place(line, 540, 830, { autoAlpha: 0, scaleX: 0.5 });
    SS.tl.fromTo(num, { scaleY: 1, autoAlpha: 1 }, { scaleY: 0.03, autoAlpha: 0, duration: 0.26, ease: SS.EZ.in }, S.proofOut);
    SS.tl.set(line, { autoAlpha: 1 }, S.proofOut + 0.2);
    SS.tl.fromTo(line, { y: 830, scaleX: 0.5 }, { y: LINE.y, scaleX: 1, duration: 0.5, ease: SS.EZ.inOut }, S.proofOut + 0.2);

    // ================================================================ 11 · thesis + the meeting
    const t1 = SS.head(layer, 'Vos courtiers rencontrent\ndes vendeurs.', { size: 92 });
    SS.place(t1.el, 540, 440);
    SS.say(t1, S.th1, S.thOut);
    const t2 = SS.head(layer, 'Nous, on vous\nles amène.', { size: 92, color: M.teal });
    SS.place(t2.el, 540, 760);
    SS.say(t2, S.th2, S.thOut + 0.03, { dir: -1 });
    const meet = SS.el('div', 'sy-card', layer);
    Object.assign(meet.style, { width: '900px', height: '196px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    meet.innerHTML = `<div style="position:absolute;left:30px;top:20px;display:flex;align-items:center;gap:20px;white-space:nowrap">
        <span style="width:60px;height:60px;display:block">${SS.icon.person(M.teal, M.band)}</span>
        <span style="font-size:42px;font-weight:730;letter-spacing:-.02em;color:${M.ink}">Courtier 03</span></div>
      <div style="position:absolute;left:50px;right:50px;top:104px;height:72px;border-radius:20px;background:${M.band};display:flex;align-items:center;gap:16px;padding:0 24px;font-size:32px;font-weight:720;color:${M.ink};white-space:nowrap">
        <svg viewBox="0 0 24 24" style="width:34px;height:34px;flex:none" fill="none" stroke="${M.teal}" stroke-width="2.3" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>Rencontre · Vendeur · Longueuil</div>`;
    gsap.set(meet, { x: 90, y: 1100, autoAlpha: 0 });
    SS.tl.fromTo(meet, { y: 1160, autoAlpha: 0 }, { y: 1100, autoAlpha: 1, duration: 0.5, ease: SS.EZ.dock }, S.meet);
    SS.tl.fromTo(meet, { y: 1100, autoAlpha: 1 }, { y: 1260, autoAlpha: 0, duration: 0.32, ease: SS.EZ.in }, S.thOut);
    SS.cue(S.th1, 'm-thesis');

    // ================================================================ 12 · end card
    SS.tl.fromTo(line, { x: 540, scaleX: 1 }, { x: markX, scaleX: 0.008, duration: 0.34, ease: SS.EZ.in }, S.merge);
    SS.tl.fromTo(line, { y: LINE.y }, { y: G.LY, duration: 0.34, ease: SS.EZ.inOut }, S.merge);
    SS.tl.fromTo(line, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.06, ease: 'none' }, S.merge + 0.3);
    const node = SS.el('div', 'a3', layer);
    Object.assign(node.style, { width: '26px', height: '26px', borderRadius: '50%', background: M.teal, boxShadow: '0 0 0 9px rgba(43,191,179,.2)' });
    SS.place(node, markX, G.LY, { scale: 0 });
    SS.tl.fromTo(node, { scale: 0 }, { scale: 2.6, duration: 0.22, ease: SS.EZ.out }, S.merge + 0.26);
    SS.tl.fromTo(node, { scale: 2.6 }, { scale: 0, duration: 0.26, ease: SS.EZ.in }, S.merge + 0.49);
    const logo = SS.logo(layer, G.LH);
    SS.place(logo.el, 540, G.LY);
    gsap.set(logo.letters, { y: 150 });
    const P = { mark: 0, sheen: 0 };
    SS.tl.fromTo(P, { mark: 0 }, { mark: 1, duration: 0.66, ease: 'none' }, S.endMark);
    SS.tl.fromTo(logo.letters, { y: 150 }, { y: 0, duration: 0.6, stagger: 0.03, ease: SS.EZ.out }, S.endLetters);
    SS.tl.fromTo(P, { sheen: 0 }, { sheen: 1, duration: 0.7, ease: 'sine.inOut' }, S.sheen - 0.3);
    SS.cue(S.endMark, 'm-endmark');
    // the system's name in the site's soft, static label (no dot, no pulse)
    const tag = SS.el('div', 'a3', layer);
    Object.assign(tag.style, { height: '76px', padding: '0 34px', borderRadius: '38px', background: M.band, color: M.teal, fontSize: '40px', fontWeight: 740, letterSpacing: '-.015em',
      display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden' });
    tag.innerHTML = '<span class="w" style="display:inline-block">Le Système Vendeurs 5 minutes</span>';
    SS.place(tag, 540, G.tagY, { autoAlpha: 0, scale: 0.92 });
    const tw = tag.querySelector('.w');
    gsap.set(tw, { yPercent: 130 });
    SS.tl.fromTo(tag, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: SS.EZ.out }, S.tag);
    SS.tl.fromTo(tw, { yPercent: 130 }, { yPercent: 0, duration: 0.55, ease: SS.EZ.out }, S.tag + 0.08);
    // call to action: a node that grows into the ink button (site style: plain ink, white text, no arrow)
    const clip = SS.clipR;
    const cta = SS.el('div', 'a3', layer);
    const rad = 26;
    Object.assign(cta.style, { width: G.cta.w + 'px', height: G.cta.h + 'px', borderRadius: rad + 'px', overflow: 'hidden', background: M.ink,
      boxShadow: '0 22px 44px -22px rgba(21,21,21,.55)' });
    cta.innerHTML = `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:${G.cta.size}px;font-weight:760;letter-spacing:-.02em">
        <span style="display:inline-block;overflow:hidden;padding:.16em .06em .22em;margin:-.16em -.06em -.22em"><span class="w" style="display:inline-block">Obtenir mon diagnostic gratuit</span></span></div>
      <div class="sh" style="position:absolute;top:-20%;left:-140px;width:80px;height:140%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.16),rgba(255,255,255,0));transform:skewX(-18deg)"></div>`;
    const cw = cta.querySelector('.w'), sh = cta.querySelector('.sh');
    const side = (G.cta.w - G.cta.h) / 2;
    SS.place(cta, 540, G.cta.y, { autoAlpha: 0, scale: 0.4, clipPath: clip(0, side, 0, side, G.cta.h / 2) });
    gsap.set(cw, { yPercent: SS.HIDE }); gsap.set(sh, { x: 0 });
    SS.tl.set(cta, { autoAlpha: 1 }, S.cta);
    SS.tl.fromTo(cta, { scale: 0.4 }, { scale: 1, duration: 0.42, ease: SS.EZ.pop }, S.cta);
    SS.tl.fromTo(cta, { clipPath: clip(0, side, 0, side, G.cta.h / 2) }, { clipPath: clip(0, 0, 0, 0, rad), duration: 0.6, ease: SS.EZ.pop }, S.cta + 0.06);
    SS.tl.fromTo(cw, { yPercent: SS.HIDE }, { yPercent: 0, duration: 0.6, ease: SS.EZ.out }, S.cta + 0.2);
    SS.tl.fromTo(sh, { x: 0 }, { x: G.cta.w + 200, duration: 0.7, ease: 'sine.inOut' }, S.sheen);
    SS.cue(S.cta, 'sfx-cta');
    const url = SS.text(layer, 'scalesuiteqc.ca', { size: 42, weight: 680, color: M.ink, tracking: -0.01 });
    SS.place(url.el, 540, G.urlY);
    SS.say(url, S.url, null, { dur: 0.6 });
    SS.tl.fromTo([logo.el, cta], { scale: 1 }, { scale: 1.012, duration: S.end - 31.9, ease: 'sine.inOut' }, 31.9);

    stage.appendChild(SS.CLK.layer); // the clock stays on top of every world
    R = { layer, logo, P };
  }
  function render() {
    R.logo.mark(R.P.mark);
    R.logo.sheen(R.P.sheen);
  }
  const scene = { name: 'fin', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, S.proof - 0.1, S.end + 1]]; };
  SS.scenes.push(scene);
})();
