/* « Système Vendeurs 5 minutes » (launch film) · proof, risk reversed, real scarcity, end (25.0–40.0 s),
   screen space on the mint.
   5 · Proof (25.0–27.8): « Groupe Mackay », 124 counted from 0, « demandes en moins de 7 mois. », « Avec la
       campagne seule. », source label « Chiffres tirés de Google Ads » (the only real name in the film).
   6 · Risk reversed (27.8–31.4): the full product card comes back (five checks) and receives a seal drawn with a
       stroke (two rings and a check, no text, no shine). « Si on ne livre pas, vous ne payez pas. » (site,
       verbatim), « Aucun contrat. », « Vos demandes ne sont jamais partagées ni revendues. »
   7 · Scarcity (31.4–33.8): numbers from SS.OFFRE: « 3 nouvelles équipes par mois. », « Il reste 3 places
       fondatrices. », one open seat drawn per place. No date, no countdown.
   8 · End (33.8–40.0): the seats contract into a line; thesis above and below it with Courtier 03's discreet
       « Rencontre » row; the line → node → ScaleSuite logo; the system's name large under the logo; the ink
       button « Obtenir mon diagnostic gratuit » grows out of a node; « scalesuiteqc.ca ». Held 37.3–40.0.
   Also re-appends the clock layer on top of the stage. */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M, O = SS.OFFRE;
  const LINE = { y: 600, w: 780 };
  const G = { LH: 228, LY: 640, nameY: 935, cta: { y: 1190, w: 900, h: 156, size: 48 }, urlY: 1372 };
  const LW = (G.LH * SS.LOGO.w) / SS.LOGO.h;
  const markX = 540 - LW / 2 + 58 * (G.LH / SS.LOGO.h);
  const RK = { top: 520 }; // the product card in the risk scene
  const P = { mark: 0, sheen: 0, seal: 0 };

  let R;
  function build(stage) {
    const layer = SS.el('div', 'layer', stage);

    // ================================================================ 5 · proof
    const gm = SS.text(layer, 'Groupe Mackay', { size: 66, weight: 760, color: M.ink, tracking: -0.025 });
    SS.place(gm.el, 540, 630);
    SS.say(gm, S.proof + 0.3, S.proofOut, { st: 0.05 });
    const numM = SS.el('div', 'a3', layer);
    Object.assign(numM.style, { width: '1000px', height: '360px', overflow: 'hidden' });
    SS.place(numM, 540, 900);
    const num = SS.el('div', 'a3 sy-tnum', numM);
    Object.assign(num.style, { fontSize: '330px', fontWeight: 800, letterSpacing: '-.05em', color: M.teal, lineHeight: 1, whiteSpace: 'nowrap' });
    num.textContent = '124';
    SS.place(num, 500, 180);
    gsap.set(num, { y: 480 });
    SS.tl.fromTo(num, { y: 480 }, { y: 180, duration: 0.6, ease: SS.EZ.out }, S.count - 0.1);
    SS.counter(num, [{ at: S.count, dur: 0.8, from: 0, to: 124, ease: 'power3.out' }]);
    const dm = SS.text(layer, 'demandes en moins de 7 mois.', { size: 72, weight: 760, color: M.ink, tracking: -0.03, maxW: 960 });
    SS.place(dm.el, 540, 1150);
    SS.say(dm, S.count + 0.25, S.proofOut + 0.02, { st: 0.05 });
    const se = SS.text(layer, 'Avec la campagne seule.', { size: 50, weight: 600, color: M.soft, tracking: -0.015 });
    SS.place(se.el, 540, 1252);
    SS.say(se, S.seule, S.proofOut + 0.04, { st: 0.04 });
    const src = SS.el('div', 'a3', layer);
    Object.assign(src.style, { height: '76px', padding: '0 32px', borderRadius: '38px', background: '#fff', boxShadow: `inset 0 0 0 2px ${M.line}`, color: M.teal, fontSize: '38px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '14px', whiteSpace: 'nowrap' });
    src.innerHTML = `<svg viewBox="0 0 24 24" style="width:36px;height:36px" fill="none" stroke="${M.teal}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg>Chiffres tirés de Google Ads`;
    SS.place(src, 540, 1372, { autoAlpha: 0, scale: 0.94 });
    SS.tl.fromTo(src, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: SS.EZ.out }, S.seule + 0.2);
    SS.tl.fromTo(src, { autoAlpha: 1, y: 1372 }, { autoAlpha: 0, y: 1400, duration: 0.24, ease: SS.EZ.in }, S.proofOut);
    SS.tl.fromTo(num, { yPercent: -50 }, { yPercent: -200, duration: 0.3, ease: SS.EZ.in }, S.proofOut);
    SS.cue(S.count, 'm-count');

    // ================================================================ 6 · risk reversed
    const pc = SS.productCard(layer); // same size as the stack's card
    pc.rows.forEach((r) => { r.k.k = 1; gsap.set(r.sk, { autoAlpha: 0 }); });
    const cx = 90, cy = RK.top;
    gsap.set(pc.el, { x: cx, y: cy + 1300, autoAlpha: 0 });
    SS.tl.set(pc.el, { autoAlpha: 1 }, S.proofOut + 0.08);
    SS.tl.fromTo(pc.el, { y: cy + 1300 }, { y: cy, duration: 0.55, ease: SS.EZ.out }, S.proofOut + 0.08);
    // the seal: two rings and a check, drawn with a stroke
    const seal = SS.el('div', 'a3', layer);
    Object.assign(seal.style, { width: '190px', height: '190px' });
    const ss = SS.svg('svg', { viewBox: '0 0 220 220', width: 190, height: 190 }, seal);
    SS.svg('circle', { cx: 110, cy: 110, r: 100, fill: '#ffffff' }, ss);
    const sp = [
      SS.svg('circle', { cx: 110, cy: 110, r: 100, fill: 'none', stroke: M.teal, 'stroke-width': 7, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1, transform: 'rotate(-90 110 110)' }, ss),
      SS.svg('circle', { cx: 110, cy: 110, r: 82, fill: 'none', stroke: M.teal, 'stroke-width': 3, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1, transform: 'rotate(-90 110 110)' }, ss),
      SS.svg('path', { d: 'M70 114l26 26 56-58', fill: 'none', stroke: M.teal, 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, ss),
    ];
    SS.place(seal, 880, 1300, { autoAlpha: 0, scale: 0.9, rotation: -8 });
    SS.tl.fromTo(seal, { autoAlpha: 0, scale: 0.9, rotation: -8 }, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.45, ease: SS.EZ.out }, S.seal);
    SS.tl.fromTo(P, { seal: 0 }, { seal: 1, duration: 0.8, ease: 'none' }, S.seal);
    SS.cue(S.seal, 'm-seal');
    const rt = SS.head(layer, 'Si on ne livre pas,\n*vous* *ne* *payez* *pas.*', { size: 100 });
    SS.place(rt.el, 540, 290);
    SS.say(rt, S.risk, S.riskOut);
    const ac = SS.text(layer, 'Aucun contrat.', { size: 56, weight: 780, color: M.ink, tracking: -0.03 });
    SS.place(ac.el, 540, 456);
    SS.say(ac, S.contrat, S.riskOut + 0.02, { st: 0.05 });
    const vd = SS.text(layer, 'Vos demandes ne sont jamais\npartagées ni revendues.', { size: 44, weight: 600, color: M.soft, tracking: -0.02, lh: 1.22 });
    SS.place(vd.el, 540, 1432);
    SS.say(vd, S.partage, S.riskOut + 0.04, { st: 0.025 });
    SS.tl.fromTo([pc.el, seal], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3, ease: SS.EZ.in }, S.riskOut);
    SS.tl.fromTo(pc.el, { y: cy }, { y: cy - 160, duration: 0.3, ease: SS.EZ.in }, S.riskOut);
    SS.tl.fromTo(seal, { y: 1300 }, { y: 1140, duration: 0.3, ease: SS.EZ.in }, S.riskOut);

    // ================================================================ 7 · real scarcity (SS.OFFRE)
    const nE = O.equipesParMois, nP = O.placesFondatrices;
    const rr = SS.head(layer, `*${nE}* nouvelles équipes\npar mois.`, { size: 104 });
    SS.place(rr.el, 540, 330);
    SS.say(rr, S.rare, S.rareOut);
    const reste = SS.text(layer, nP > 1 ? `Il reste ${nP} places fondatrices.` : 'Il reste 1 place fondatrice.', { size: 62, weight: 720, color: M.teal, tracking: -0.025 });
    SS.place(reste.el, 540, 640);
    SS.say(reste, S.reste, S.rareOut + 0.02, { st: 0.04 });
    const PW = 270, GAP = 24, cnt = Math.max(1, Math.min(5, nP));
    const seats = Array.from({ length: cnt }, (_, i) => {
      const el = SS.el('div', 'a3', layer);
      Object.assign(el.style, { width: PW + 'px', height: '440px', borderRadius: '32px', background: '#fff', boxShadow: `inset 0 0 0 4px ${M.teal}, ${SS.SHADOW.m}` });
      el.innerHTML = `<div style="position:absolute;left:50%;top:80px;width:110px;height:110px;margin-left:-55px;border-radius:50%;box-sizing:border-box;border:6px solid ${M.teal}"></div>
        <div style="position:absolute;left:0;right:0;top:250px;text-align:center;font-size:38px;font-weight:760;letter-spacing:-.02em;color:${M.ink};line-height:1.2">Place<br>fondatrice</div>`;
      const x = 540 + (i - (cnt - 1) / 2) * (PW + GAP);
      SS.place(el, x, 1050, { autoAlpha: 0, y: 1090 });
      SS.tl.fromTo(el, { autoAlpha: 0, y: 1090 }, { autoAlpha: 1, y: 1050, duration: 0.42, ease: SS.EZ.dock }, S.places + i * 0.06);
      SS.tl.fromTo(el, { y: 1050, scaleY: 1, autoAlpha: 1 }, { y: LINE.y, scaleY: 0.03, autoAlpha: 0, duration: 0.32, ease: SS.EZ.in }, S.rareOut + i * 0.03);
      return el;
    });
    SS.cue(S.places, 'm-places');

    // ================================================================ 8 · thesis, then the end card
    const line = SS.el('div', 'a3', layer);
    Object.assign(line.style, { width: LINE.w + 'px', height: '6px', borderRadius: '3px', background: M.turq });
    SS.place(line, 540, LINE.y, { autoAlpha: 0, scaleX: 0.3 });
    SS.tl.fromTo(line, { autoAlpha: 0, scaleX: 0.3 }, { autoAlpha: 1, scaleX: 1, duration: 0.45, ease: SS.EZ.out }, S.rareOut + 0.22);
    const t1 = SS.head(layer, 'Vos courtiers rencontrent\ndes vendeurs.', { size: 92 });
    SS.place(t1.el, 540, 440);
    SS.say(t1, S.th1, S.thOut);
    const t2 = SS.head(layer, 'Nous, on vous\nles amène.', { size: 92, color: M.teal });
    SS.place(t2.el, 540, 760);
    SS.say(t2, S.th2, S.thOut + 0.03);
    const meet = SS.el('div', 'sy-card', layer);
    Object.assign(meet.style, { width: '900px', height: '196px', background: '#fff', boxShadow: SS.SHADOW.mHi });
    meet.innerHTML = `<div style="position:absolute;left:30px;top:20px;display:flex;align-items:center;gap:20px;white-space:nowrap">
        <span style="width:60px;height:60px;display:block">${SS.icon.person(M.teal, M.band)}</span>
        <span style="font-size:42px;font-weight:730;letter-spacing:-.02em;color:${M.ink}">Courtier 03</span></div>
      <div style="position:absolute;left:50px;right:50px;top:104px;height:72px;border-radius:20px;background:${M.band};display:flex;align-items:center;gap:16px;padding:0 24px;font-size:32px;font-weight:720;color:${M.ink};white-space:nowrap">
        <svg viewBox="0 0 24 24" style="width:34px;height:34px;flex:none" fill="none" stroke="${M.teal}" stroke-width="2.3" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>Rencontre · Vendeur · Longueuil</div>`;
    gsap.set(meet, { x: 90, y: 1020, autoAlpha: 0 });
    SS.tl.fromTo(meet, { y: 1080, autoAlpha: 0 }, { y: 1020, autoAlpha: 1, duration: 0.5, ease: SS.EZ.dock }, S.meet);
    SS.tl.fromTo(meet, { y: 1020, autoAlpha: 1 }, { y: 1180, autoAlpha: 0, duration: 0.32, ease: SS.EZ.in }, S.thOut);
    SS.cue(S.th1, 'm-thesis');
    // the line contracts into a node, the node grows the mark
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
    SS.tl.fromTo(P, { mark: 0 }, { mark: 1, duration: 0.66, ease: 'none' }, S.endMark);
    SS.tl.fromTo(logo.letters, { y: 150 }, { y: 0, duration: 0.6, stagger: 0.03, ease: SS.EZ.out }, S.endLetters);
    SS.tl.fromTo(P, { sheen: 0 }, { sheen: 1, duration: 0.7, ease: 'sine.inOut' }, S.sheen - 0.3);
    SS.cue(S.endMark, 'm-endmark');
    const nm = SS.head(layer, 'Système Vendeurs\n5 *minutes.*', { size: 115 });
    SS.place(nm.el, 540, G.nameY);
    SS.say(nm, S.name, null, { st: 0.06 });
    // call to action: a node that grows into the ink button (site style)
    const clip = SS.clipR;
    const cta = SS.el('div', 'a3', layer);
    const rad = 26;
    Object.assign(cta.style, { width: G.cta.w + 'px', height: G.cta.h + 'px', borderRadius: rad + 'px', overflow: 'hidden', background: M.ink, boxShadow: '0 22px 44px -22px rgba(21,21,21,.55)' });
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
    const url = SS.text(layer, 'scalesuiteqc.ca', { size: 50, weight: 680, color: M.ink, tracking: -0.01 });
    SS.place(url.el, 540, G.urlY);
    SS.say(url, S.url, null, { dur: 0.6 });
    SS.tl.fromTo([logo.el, cta], { scale: 1 }, { scale: 1.012, duration: S.end - 37.4, ease: 'sine.inOut' }, 37.4);

    stage.appendChild(SS.CLK.layer); // the clock stays above every world
    R = { layer, logo, sp };
  }
  function render() {
    R.logo.mark(P.mark);
    R.logo.sheen(P.sheen);
    const k = P.seal;
    R.sp.forEach((p, i) => p.setAttribute('stroke-dashoffset', (1 - SS.EZ.inOut(SS.clamp01((k - i * 0.22) / 0.56))).toFixed(4)));
  }
  const scene = { name: 'fin', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, S.proof - 0.1, S.end + 1]]; };
  SS.scenes.push(scene);
})();
