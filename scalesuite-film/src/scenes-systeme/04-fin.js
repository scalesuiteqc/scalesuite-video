/* « Système Vendeurs 5 minutes » (launch film, v3) · proof, guarantee and scarcity, end (19.4–31.0 s), screen space.
   A screen copy of the checked product card takes over from the world at 19.4 s (same place, same state).
   4 · Proof (19.4–21.9): lines 2–5 and the frame fade; line 1 « Campagne Google Vendeurs » stays and drops under
       the number, its caption becomes « Avec la campagne seule. ». « Groupe Mackay », 124 (counted),
       « demandes en moins de 7 mois. », « Chiffres tirés de Google Ads ».
   5 · Guarantee and scarcity (21.9–25.4): line 1 rises back and the card re-forms around it (scaled 0.78, on the
       left); « Si on ne livre pas, vous ne payez pas. », « Aucun contrat. », « Vos demandes ne sont jamais
       partagées ni revendues. »; the seal drawn with a stroke BESIDE the card (right margin, covers nothing);
       « 3 nouvelles équipes par mois. Il reste 3 places fondatrices. » (SS.OFFRE).
   6 · End (25.4–31.0): the card contracts into the turquoise line; thesis above and below it; the line → node;
       the whole logo rises (never half swept), the system's name, the ink button, the URL; held 28.5–31.0.
   Also re-appends the clock layer on top of the stage. */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M, O = SS.OFFRE;
  const PC = SS.PCARD;
  const LINE = { y: 960, w: 780 };
  const G = { LH: 228, LY: 640, nameY: 935, cta: { y: 1190, w: 900, h: 156, size: 48 }, urlY: 1372 };
  const LW = (G.LH * SS.LOGO.w) / SS.LOGO.h;
  const markX = 540 - LW / 2 + 58 * (G.LH / SS.LOGO.h);
  const RK = { x: 60, y: 650, s: 0.78 };
  const P = { seal: 0, sheen: 0 };

  let R;
  function build(stage) {
    const layer = SS.el('div', 'layer', stage);
    const PCTOP = SS.PCTOP;

    // ================================================================ the card, taken over from the world
    const pc = SS.productCard(layer);
    pc.rows.forEach((r) => { r.k.k = 1; gsap.set(r.sk, { autoAlpha: 0 }); });
    gsap.set(pc.el, { x: 90, y: PCTOP, transformOrigin: '0% 0%', autoAlpha: 0 });
    SS.tl.set(pc.el, { autoAlpha: 1 }, S.proof);
    const frame = [pc.head, pc.el.children[1]]; // header and divider
    const rest = pc.rows.slice(1).map((r) => r.el);
    const r1 = pc.rows[0];
    const alt = SS.el('div', '', r1.el);
    Object.assign(alt.style, { position: 'absolute', left: '136px', top: '0px', height: PC.rowH + 'px', display: 'flex', alignItems: 'center', fontSize: '52px', fontWeight: 780,
      letterSpacing: '-.03em', color: M.teal, whiteSpace: 'nowrap' });
    alt.textContent = 'Avec la campagne seule.';
    gsap.set(alt, { autoAlpha: 0 });
    const r1y = PC.headH + 8 + PC.rowH / 2; // centre of line 1 inside the card
    const proofY = 1290 - r1y;
    // 4 · proof: everything but line 1 fades, line 1 drops under the number
    SS.tl.fromTo([...frame, ...rest], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.25, ease: 'power1.in' }, S.proof);
    SS.tl.fromTo(pc.el, { backgroundColor: 'rgba(255,255,255,1)', boxShadow: SS.SHADOW.mHi }, { backgroundColor: 'rgba(255,255,255,0)', boxShadow: '0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)', duration: 0.3, ease: 'power1.in' }, S.proof);
    SS.tl.fromTo(pc.el, { y: PCTOP }, { y: proofY, duration: 0.4, ease: SS.EZ.inOut }, S.proof + 0.05);
    SS.tl.fromTo(r1.tx, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, ease: 'power1.in' }, S.seule);
    SS.tl.fromTo(alt, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: SS.EZ.out }, S.seule + 0.1);
    const gm = SS.text(layer, 'Groupe Mackay', { size: 66, weight: 760, color: M.ink, tracking: -0.025 });
    SS.place(gm.el, 540, 600);
    SS.rise(gm, S.proof + 0.2, S.proofOut, { st: 0.05 });
    const num = SS.el('div', 'a3 sy-tnum', layer);
    Object.assign(num.style, { fontSize: '330px', fontWeight: 800, letterSpacing: '-.05em', color: M.teal, lineHeight: 1, whiteSpace: 'nowrap' });
    num.textContent = '124';
    SS.place(num, 540, 860);
    SS.riseEl(num, S.count - 0.05, S.proofOut, { y: 860 });
    SS.counter(num, [{ at: S.count, dur: 0.8, from: 0, to: 124, ease: 'power3.out' }]);
    const dm = SS.text(layer, 'demandes en moins de 7 mois.', { size: 72, weight: 760, color: M.ink, tracking: -0.03, maxW: 960 });
    SS.place(dm.el, 540, 1110);
    SS.rise(dm, S.count + 0.25, S.proofOut, { st: 0.04 });
    const src = SS.el('div', 'a3', layer);
    Object.assign(src.style, { height: '72px', padding: '0 30px', borderRadius: '36px', background: '#fff', boxShadow: `inset 0 0 0 2px ${M.line}`, color: M.teal, fontSize: '36px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '14px', whiteSpace: 'nowrap' });
    src.innerHTML = `<svg viewBox="0 0 24 24" style="width:34px;height:34px" fill="none" stroke="${M.teal}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg>Chiffres tirés de Google Ads`;
    SS.place(src, 540, 1420);
    SS.riseEl(src, S.seule + 0.2, S.proofOut, { y: 1420 });
    SS.cue(S.count, 'm-count');

    // 5 · guarantee and scarcity: line 1 rises back, the card re-forms around it on the left
    SS.tl.fromTo(alt, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: 'power1.in' }, S.proofOut);
    SS.tl.fromTo(r1.tx, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' }, S.proofOut + 0.1);
    SS.tl.fromTo(pc.el, { x: 90, y: proofY, scale: 1 }, { x: RK.x, y: RK.y, scale: RK.s, duration: 0.4, ease: SS.EZ.inOut }, S.proofOut + 0.05);
    SS.tl.fromTo(pc.el, { backgroundColor: 'rgba(255,255,255,0)', boxShadow: '0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)' }, { backgroundColor: 'rgba(255,255,255,1)', boxShadow: SS.SHADOW.mHi, duration: 0.3, ease: 'power1.out' }, S.proofOut + 0.2);
    SS.tl.fromTo([...frame, ...rest], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, S.proofOut + 0.25);
    const rt = SS.head(layer, 'Si on ne livre pas,\n*vous* *ne* *payez* *pas.*', { size: 104 });
    SS.place(rt.el, 540, 300);
    SS.rise(rt, S.risk, S.riskOut);
    const ac = SS.text(layer, 'Aucun contrat.', { size: 60, weight: 780, color: M.ink, tracking: -0.03 });
    SS.place(ac.el, 540, 468);
    SS.rise(ac, S.contrat, S.riskOut, { st: 0.05 });
    const vd = SS.text(layer, 'Vos demandes ne sont jamais\npartagées ni revendues.', { size: 40, weight: 620, color: M.soft, tracking: -0.02, lh: 1.2 });
    SS.place(vd.el, 540, 572);
    SS.rise(vd, S.partage, S.riskOut, { st: 0.025 });
    // the seal: two rings and a check, drawn with a stroke, beside the card (right margin)
    const seal = SS.el('div', 'a3', layer);
    Object.assign(seal.style, { width: '190px', height: '190px' });
    const ss = SS.svg('svg', { viewBox: '0 0 220 220', width: 190, height: 190 }, seal);
    SS.svg('circle', { cx: 110, cy: 110, r: 100, fill: '#ffffff' }, ss);
    const sp = [
      SS.svg('circle', { cx: 110, cy: 110, r: 100, fill: 'none', stroke: M.teal, 'stroke-width': 7, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1, transform: 'rotate(-90 110 110)' }, ss),
      SS.svg('circle', { cx: 110, cy: 110, r: 82, fill: 'none', stroke: M.teal, 'stroke-width': 3, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1, transform: 'rotate(-90 110 110)' }, ss),
      SS.svg('path', { d: 'M70 114l26 26 56-58', fill: 'none', stroke: M.teal, 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, ss),
    ];
    SS.place(seal, 900, 980, { autoAlpha: 0, scale: 0.9 });
    SS.tl.fromTo(seal, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: SS.EZ.out }, S.seal);
    SS.tl.fromTo(P, { seal: 0 }, { seal: 1, duration: 0.8, ease: 'none' }, S.seal);
    SS.tl.fromTo(seal, { autoAlpha: 1, y: 980 }, { autoAlpha: 0, y: 964, duration: 0.25, ease: SS.EZ.in }, S.riskOut);
    SS.cue(S.seal, 'm-seal');
    const nE = O.equipesParMois, nP = O.placesFondatrices;
    const rare = SS.text(layer, `${nE} nouvelles équipes par mois.\n${nP > 1 ? `Il reste ${nP} places fondatrices.` : 'Il reste 1 place fondatrice.'}`, { size: 46, weight: 740, color: M.teal, tracking: -0.02, lh: 1.2 });
    SS.place(rare.el, 540, 1400);
    SS.rise(rare, S.rare, S.riskOut, { st: 0.03 });

    // ================================================================ 6 · the card contracts into the thesis line
    const line = SS.el('div', 'a3', layer);
    Object.assign(line.style, { width: LINE.w + 'px', height: '6px', borderRadius: '3px', background: M.turq });
    SS.place(line, 540, LINE.y, { autoAlpha: 0 });
    SS.tl.fromTo([...frame, ...pc.rows.map((r) => r.el)], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: 'power1.in' }, S.riskOut);
    SS.tl.fromTo(pc.el, { x: RK.x, y: RK.y, scaleX: RK.s, scaleY: RK.s, backgroundColor: 'rgba(255,255,255,1)' },
      { x: 540 - LINE.w / 2, y: LINE.y - 3, scaleX: LINE.w / PC.w, scaleY: 6 / PC.h, backgroundColor: 'rgba(43,191,179,1)', duration: 0.4, ease: SS.EZ.inOut }, S.riskOut);
    SS.tl.fromTo(pc.el, { boxShadow: SS.SHADOW.mHi }, { boxShadow: '0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0), 0 0 0 0 rgba(0,0,0,0)', duration: 0.25, ease: 'power1.in' }, S.riskOut);
    SS.tl.set(line, { autoAlpha: 1 }, S.riskOut + 0.4);
    SS.tl.set(pc.el, { autoAlpha: 0 }, S.riskOut + 0.4);
    const t1 = SS.head(layer, 'Vos courtiers rencontrent\ndes vendeurs.', { size: 96 });
    SS.place(t1.el, 540, 800);
    SS.rise(t1, S.th1, S.merge - 0.05);
    const t2 = SS.head(layer, 'Nous, on vous\nles amène.', { size: 96, color: M.teal });
    SS.place(t2.el, 540, 1120);
    SS.rise(t2, S.th2, S.merge - 0.03);
    SS.cue(S.th1, 'm-thesis');
    // the line contracts into a node; the whole logo rises from it
    SS.tl.fromTo(line, { x: 540, scaleX: 1 }, { x: markX, scaleX: 0.008, duration: 0.3, ease: SS.EZ.in }, S.merge);
    SS.tl.fromTo(line, { y: LINE.y }, { y: G.LY, duration: 0.3, ease: SS.EZ.inOut }, S.merge);
    SS.tl.fromTo(line, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.05, ease: 'none' }, S.merge + 0.27);
    const node = SS.el('div', 'a3', layer);
    Object.assign(node.style, { width: '26px', height: '26px', borderRadius: '50%', background: M.teal, boxShadow: '0 0 0 9px rgba(43,191,179,.2)' });
    SS.place(node, markX, G.LY, { scale: 0 });
    SS.tl.fromTo(node, { scale: 0 }, { scale: 2.4, duration: 0.18, ease: SS.EZ.out }, S.merge + 0.24);
    SS.tl.fromTo(node, { scale: 2.4 }, { scale: 0, duration: 0.2, ease: SS.EZ.in }, S.merge + 0.42);
    const logo = SS.logo(layer, G.LH);
    logo.mark(1);
    SS.place(logo.el, 540, G.LY);
    SS.riseEl(logo.el, S.endLogo, null, { y: G.LY });
    SS.tl.fromTo(logo.el, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: SS.EZ.out }, S.endLogo);
    SS.tl.fromTo(P, { sheen: 0 }, { sheen: 1, duration: 0.7, ease: 'sine.inOut' }, S.sheen);
    SS.cue(S.endLogo, 'm-endmark');
    const nm = SS.head(layer, 'Système Vendeurs\n5 *minutes.*', { size: 115 });
    SS.place(nm.el, 540, G.nameY);
    SS.rise(nm, S.name, null, { st: 0.05 });
    // call to action: a node that grows into the ink button (site style)
    const clip = SS.clipR;
    const cta = SS.el('div', 'a3', layer);
    const rad = 28;
    Object.assign(cta.style, { width: G.cta.w + 'px', height: G.cta.h + 'px', borderRadius: rad + 'px', overflow: 'hidden', background: M.ink, boxShadow: '0 22px 44px -22px rgba(21,21,21,.55)' });
    cta.innerHTML = `<div class="w" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:${G.cta.size}px;font-weight:760;letter-spacing:-.02em;white-space:nowrap">Obtenir mon diagnostic gratuit</div>
      <div class="sh" style="position:absolute;top:-20%;left:-140px;width:80px;height:140%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.16),rgba(255,255,255,0));transform:skewX(-18deg)"></div>`;
    const cw = cta.querySelector('.w'), sh = cta.querySelector('.sh');
    const side = (G.cta.w - G.cta.h) / 2;
    SS.place(cta, 540, G.cta.y, { autoAlpha: 0, scale: 0.4, clipPath: clip(0, side, 0, side, G.cta.h / 2) });
    gsap.set(cw, { autoAlpha: 0, y: 14 }); gsap.set(sh, { x: 0 });
    SS.tl.set(cta, { autoAlpha: 1 }, S.cta);
    SS.tl.fromTo(cta, { scale: 0.4 }, { scale: 1, duration: 0.4, ease: SS.EZ.pop }, S.cta);
    SS.tl.fromTo(cta, { clipPath: clip(0, side, 0, side, G.cta.h / 2) }, { clipPath: clip(0, 0, 0, 0, rad), duration: 0.5, ease: SS.EZ.pop }, S.cta + 0.05);
    SS.tl.fromTo(cw, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: SS.EZ.out }, S.cta + 0.2);
    SS.tl.fromTo(sh, { x: 0 }, { x: G.cta.w + 200, duration: 0.7, ease: 'sine.inOut' }, S.sheen);
    SS.cue(S.cta, 'sfx-cta');
    const url = SS.text(layer, 'scalesuiteqc.ca', { size: 50, weight: 680, color: M.ink, tracking: -0.01 });
    SS.place(url.el, 540, G.urlY);
    SS.rise(url, S.url, null);
    SS.tl.fromTo([logo.el, cta], { scale: 1 }, { scale: 1.01, duration: S.end - 28.6, ease: 'sine.inOut' }, 28.6);

    stage.appendChild(SS.CLK.layer); // the clock stays above every world
    R = { layer, logo, sp, end: [logo.el, cta] };
  }
  function render(t) {
    R.logo.sheen(P.sheen);
    R.sp.forEach((p, i) => p.setAttribute('stroke-dashoffset', (1 - SS.EZ.inOut(SS.clamp01((P.seal - i * 0.22) / 0.56))).toFixed(4)));
  }
  const scene = { name: 'fin', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, S.proof - 0.02, S.end + 1]]; };
  SS.scenes.push(scene);
})();
