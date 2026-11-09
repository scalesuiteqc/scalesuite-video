/* « Dimanche, 21 h 14 » · scenes 8 and 9 (26.8–33.9 s), screen space.
   8 · The risk: the card « Nos engagements. » rises (the agenda has whipped up and out), its five
       commitments are ticked fast, then the seal is printed in its bottom-right corner (anticipation,
       slam, squash, irregular ink, card shakes 2 px): « On livre, ou le mois est gratuit. » « Pas de contrat. »
   9 · Call to action: the card drops away; the seal lifts, travels to the centre and stretches into the
       glossy ink pill « Mon diagnostic gratuit ». Two pegs appear, two elastic cables shoot to its ends and
       catch it. The finger grabs it, pulls it down and to the right (cables stretch and thin out, the pill
       tilts), lets go: it swings and settles on its cables. Logo above, « scalesuiteqc.ca » below.
   The pill on its cables is a 2D rigid body (two one-sided springs, gravity, damping, and the finger's
   spring while it holds it), integrated ONCE at build time (0.25 ms step, stored every ms) and read back
   in render(t); GSAP only drives proxies. */
(function () {
  const SS = window.SS, T = SS.DT, C = SS.DC;
  const CARD = { top: 600, w: 900 };
  const SEAL = { x: 870, y: 1262, d: 320, r: -8 };
  const PILL = { w: 700, h: 150, x: 540, y: 1060 };      // rest position of the pill
  const PEG = [{ x: 150, y: 800 }, { x: 930, y: 800 }];
  const ATT = [-330, 330];                               // cable attachments (pill local x)
  const GRAB = 200;                                      // finger grab point (pill local x)
  const PULL = { dx: 60, dy: 140 };                      // where the finger takes the grab point
  const LINES = [
    'Campagne en ligne en 5 jours ouvrables',
    'Chaque demande au bon courtier en moins de 60 secondes',
    'Un résumé écrit chaque semaine',
    'Une réponse en 1 jour ouvrable',
    'Un bilan chaque mois',
  ];
  const M = { k: 0, slam: 0, cab: 0, fing: 0, press: 0, shake: 0, xb: 0 };
  const CK = LINES.map(() => ({ k: 0 }));

  // ---- the simulation (precomputed) -----------------------------------------------------------------
  const smooth = (u) => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
  const fingerTarget = (t) => { // where the finger holds the grab point (world), during the pull
    const g0 = { x: PILL.x + GRAB, y: PILL.y };
    const u = smooth((t - T.pull9) / (T.release - T.pull9));
    return { x: g0.x + PULL.dx * u, y: g0.y + PULL.dy * u };
  };
  let SIM = null;
  function simulate() {
    const t0 = T.catch, t1 = T.end + 0.5, h = 0.00025, per = 4;
    const g = 2600, k = 220, mass = 1, I = (PILL.w * PILL.w + PILL.h * PILL.h) / 12;
    const cx = 2.6, cy = 9.5, cw = 9;      // damping (lateral, vertical, angular)
    const kf = 900, cf = 40;               // the finger's spring while it holds the pill
    // rest lengths so that the rest pose is an equilibrium
    const L0 = ATT.map((ax, i) => {
      const dx = PEG[i].x - (PILL.x + ax), dy = PEG[i].y - PILL.y, L = Math.hypot(dx, dy);
      const T0 = (mass * g / 2) * L / Math.abs(dy);
      return L - T0 / k;
    });
    let x = PILL.x, y = PILL.y - 46, th = 0, vx = 0, vy = 0, w = 0; // caught from 46 px above (cables slack)
    const n = Math.ceil((t1 - t0) / h);
    const out = { t0, X: new Float32Array(Math.ceil(n / per) + 2), Y: null, R: null, L0 };
    out.Y = new Float32Array(out.X.length); out.R = new Float32Array(out.X.length);
    for (let i = 0, j = 0; i <= n; i++) {
      const t = t0 + i * h;
      if (i % per === 0) { out.X[j] = x; out.Y[j] = y; out.R[j] = th; j++; }
      const c = Math.cos(th), s = Math.sin(th);
      let fx = 0, fy = mass * g, tq = 0;
      for (let q = 0; q < 2; q++) {
        const rx = ATT[q] * c, ry = ATT[q] * s, px = x + rx, py = y + ry;
        const dx = PEG[q].x - px, dy = PEG[q].y - py, L = Math.hypot(dx, dy);
        if (L > L0[q]) {
          const F = k * (L - L0[q]), ux = dx / L, uy = dy / L;
          fx += F * ux; fy += F * uy; tq += rx * F * uy - ry * F * ux;
        }
      }
      if (t >= T.grab + 0.06 && t < T.release) { // the finger holds the grab point
        const rx = GRAB * c, ry = GRAB * s, px = x + rx, py = y + ry;
        const vpx = vx - w * ry, vpy = vy + w * rx, ft = fingerTarget(t);
        const Fx = kf * (ft.x - px) - cf * vpx, Fy = kf * (ft.y - py) - cf * vpy;
        fx += Fx; fy += Fy; tq += rx * Fy - ry * Fx;
      }
      fx -= cx * vx * mass; fy -= cy * vy * mass; tq -= cw * w * I;
      vx += (fx / mass) * h; vy += (fy / mass) * h; w += (tq / I) * h;
      x += vx * h; y += vy * h; th += w * h;
    }
    SIM = out;
  }
  const simAt = (t) => {
    const f = Math.max(0, (t - SIM.t0) * 1000), i = Math.min(SIM.X.length - 2, Math.floor(f)), u = Math.min(1, f - i);
    const L = (A) => A[i] + (A[i + 1] - A[i]) * u;
    return { x: L(SIM.X), y: L(SIM.Y), r: L(SIM.R) };
  };

  let R;
  function build(stage) {
    // ================================================================ 8 · « Nos engagements. »
    const L8 = SS.el('div', 'layer', stage);
    const cbox = SS.el('div', 'dm', L8);
    Object.assign(cbox.style, { width: '1080px', height: '1920px' });
    const card = SS.el('div', 'dm-ui', cbox);
    Object.assign(card.style, { left: (1080 - CARD.w) / 2 + 'px', top: CARD.top + 'px', width: CARD.w + 'px', borderRadius: '34px', boxShadow: SS.DSH.uiHi,
      padding: '44px 44px 46px', display: 'flex', flexDirection: 'column', gap: '24px' });
    const head = SS.el('div', 'dm-ttl', card);
    Object.assign(head.style, { position: 'relative', fontSize: '64px', fontWeight: 700, letterSpacing: '-.035em', color: C.ink, lineHeight: 1.05, marginBottom: '8px' });
    head.textContent = 'Nos engagements.';
    const checks = LINES.map((txt) => {
      const row = SS.el('div', '', card);
      Object.assign(row.style, { position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '26px' });
      const ck = SS.check(row, 56, C.turq);
      Object.assign(ck.el.style, { position: 'relative', flex: 'none', display: 'block', marginTop: '-3px' });
      const tx = SS.el('div', '', row);
      Object.assign(tx.style, { fontSize: '40px', fontWeight: 600, letterSpacing: '-.015em', lineHeight: 1.22, color: C.ink2, maxWidth: '700px' });
      tx.textContent = txt;
      return ck;
    });
    const H = card.offsetHeight;
    SEAL.y = CARD.top + H + 40; // bottom-right corner, clear of the rows' text
    gsap.set(cbox, { y: 1300 });
    SS.tl.fromTo(cbox, { y: 1300 }, { y: 0, duration: SS.SPR.soft.dur, ease: SS.SPR.soft.ease }, T.whip8 + 0.1);
    CK.forEach((c, i) => SS.tl.fromTo(c, { k: 0 }, { k: 1, duration: 0.34, ease: 'none' }, T.checks + [0, 0.2, 0.36, 0.49, 0.6][i])); // momentum into the seal
    SS.cue(T.checks, 'm-checks');
    // the seal (a rubber stamp in deep blue ink, slightly irregular), wrapper positioned by render(t);
    // it lives in the top layer (L9) so it stays above the card, then becomes the pill
    const L9 = SS.el('div', 'layer', stage);
    const pw = SS.el('div', 'dm', L9);
    const pi = SS.el('div', 'dm', pw);
    Object.assign(pi.style, { width: SEAL.d + 'px', height: SEAL.d + 'px', borderRadius: SEAL.d / 2 + 'px', background: C.deep, overflow: 'hidden' });
    const art = SS.el('div', 'dm', pi);
    Object.assign(art.style, { width: SEAL.d + 'px', height: SEAL.d + 'px', left: '50%', top: '50%', marginLeft: -SEAL.d / 2 + 'px', marginTop: -SEAL.d / 2 + 'px' });
    const RT = 124;
    art.innerHTML = `<svg viewBox="0 0 320 320" width="320" height="320" style="position:absolute;left:0;top:0">
        <defs><path id="sealpath" d="M160,160 m-${RT},0 a${RT},${RT} 0 1,1 ${2 * RT},0 a${RT},${RT} 0 1,1 -${2 * RT},0"/></defs>
        <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="5"/>
        <circle cx="160" cy="160" r="96" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="3"/>
        <text font-family="Inter" font-size="30" font-weight="800" letter-spacing="1.2" fill="#fff"><textPath href="#sealpath" startOffset="2%">ON LIVRE, OU LE MOIS EST GRATUIT</textPath></text>
        <path d="M118 162 l28 28 l58 -64" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <div style="position:absolute;inset:0;border-radius:50%;background-image:url(${SS.D.noise(60, 23, 120)});opacity:.22"></div>`;
    // the pill's own face (fades in during the morph)
    const face = SS.el('div', 'dm', pi);
    Object.assign(face.style, { left: 0, top: 0, width: '100%', height: '100%', borderRadius: 'inherit',
      background: 'linear-gradient(180deg, #2E2E2E 0%, #171717 50%, #0C0C0C 100%)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.28), inset 0 -3px 6px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.06)' });
    face.innerHTML = `<div style="position:absolute;left:4px;right:4px;top:3px;height:48%;border-radius:72px 72px 40px 40px;background:linear-gradient(180deg, rgba(255,255,255,.30), rgba(255,255,255,.05))"></div>
      <span style="position:absolute;left:22px;top:50%;width:20px;height:20px;margin-top:-10px;border-radius:50%;background:radial-gradient(circle at 35% 30%, #F2F5F5, #8A989A 70%);box-shadow:0 1px 2px rgba(0,0,0,.6)"></span>
      <span style="position:absolute;right:22px;top:50%;width:20px;height:20px;margin-top:-10px;border-radius:50%;background:radial-gradient(circle at 35% 30%, #F2F5F5, #8A989A 70%);box-shadow:0 1px 2px rgba(0,0,0,.6)"></span>
      <div class="m" style="position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;overflow:hidden;padding:.12em 0 .2em"><span class="w dm-ttl" style="display:inline-block;font-size:54px;font-weight:600;letter-spacing:-.02em;color:#fff">Mon diagnostic gratuit</span></div>
      <div class="sh" style="position:absolute;top:-20%;left:-160px;width:90px;height:140%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.35),rgba(255,255,255,0));transform:skewX(-18deg)"></div>`;
    const word = face.querySelector('.w'), sheen = face.querySelector('.sh');
    gsap.set(face, { autoAlpha: 0 });
    gsap.set(word, { yPercent: SS.HIDE });
    gsap.set(sheen, { x: 0 });
    gsap.set(pi, { left: -SEAL.d / 2, top: -SEAL.d / 2, scale: 1, autoAlpha: 0, transformOrigin: '50% 50%' });
    // stamp: anticipation above the card, slam, squash, back
    SS.tl.fromTo(pi, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08, ease: 'power1.out' }, T.seal - 0.18);
    SS.tl.fromTo(M, { slam: 0 }, { slam: 1, duration: 0.18, ease: 'power3.in' }, T.seal - 0.18);
    SS.tl.fromTo(pi, { scale: 1 }, { scale: 0.95, duration: 0.05, ease: 'power2.out' }, T.seal);
    SS.tl.fromTo(pi, { scale: 0.95 }, { scale: 1, duration: SS.SPR.soft.dur, ease: SS.SPR.soft.ease }, T.seal + 0.05);
    SS.tl.fromTo(M, { shake: 0 }, { shake: 1, duration: 0.3, ease: 'none' }, T.seal);
    SS.cue(T.seal, 'sfx-seal');

    // ================================================================ 9 · the seal becomes the button
    SS.tl.fromTo(cbox, { y: 0 }, { y: 1400, duration: 0.42, ease: 'power2.in' }, T.pill);
    SS.tl.fromTo(M, { k: 0 }, { k: 1, duration: T.catch - T.pill - 0.05, ease: SS.EZ.inOut }, T.pill + 0.05);
    const pd = T.catch - T.pill - 0.1;
    SS.tl.fromTo(pi, { width: SEAL.d, height: SEAL.d, left: -SEAL.d / 2, top: -SEAL.d / 2, borderRadius: SEAL.d / 2, backgroundColor: C.deep },
      { width: PILL.w, height: PILL.h, left: -PILL.w / 2, top: -PILL.h / 2, borderRadius: PILL.h / 2, backgroundColor: C.ink, duration: pd, ease: SS.EZ.inOut }, T.pill + 0.1);
    SS.tl.fromTo(art, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.7, duration: 0.2, ease: 'power1.in' }, T.pill + 0.08);
    SS.tl.fromTo(face, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' }, T.pill + 0.22);
    SS.tl.fromTo(M, { xb: 0 }, { xb: 2.5, duration: 0.14, ease: 'power1.in' }, T.pill + 0.08);
    SS.tl.fromTo(M, { xb: 2.5 }, { xb: 0, duration: 0.2, ease: 'power1.out' }, T.pill + 0.22);
    SS.tl.fromTo(word, { yPercent: SS.HIDE }, { yPercent: 0, duration: 0.6, ease: SS.EZ.out }, T.txt);
    SS.tl.fromTo(sheen, { x: 0 }, { x: PILL.w + 260, duration: 0.7, ease: 'sine.inOut' }, T.sheen);
    SS.cue(T.pill, 'm-pill');
    // the pill's cast shadow on the wall behind (follows it)
    const shadow = SS.el('div', 'dm', L9);
    L9.insertBefore(shadow, pw);
    Object.assign(shadow.style, { width: PILL.w + 40 + 'px', height: PILL.h + 40 + 'px', borderRadius: '100px',
      background: 'radial-gradient(closest-side, rgba(10,30,36,.30), rgba(10,30,36,0))' });
    gsap.set(shadow, { autoAlpha: 0 });
    SS.tl.fromTo(shadow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' }, T.catch - 0.15);
    // pegs and elastic cables
    const svg = SS.svg('svg', { class: 'lines', width: 1080, height: 1920, viewBox: '0 0 1080 1920' }, L9);
    L9.insertBefore(svg, pw);
    const cab = [0, 1].map(() => ({
      base: SS.svg('path', { fill: 'none', stroke: '#283133', 'stroke-linecap': 'round' }, svg),
      hi: SS.svg('path', { fill: 'none', stroke: 'rgba(255,255,255,.38)', 'stroke-linecap': 'round' }, svg),
    }));
    const pegs = PEG.map((p) => {
      const e = SS.el('div', 'a3', L9);
      Object.assign(e.style, { width: '34px', height: '34px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, #5A6567, #151515 70%)',
        boxShadow: '0 3px 6px rgba(0,0,0,.35), inset 0 1px 1px rgba(255,255,255,.3)' });
      SS.place(e, p.x, p.y, { scale: 0.6, autoAlpha: 0 });
      return e;
    });
    SS.tl.fromTo(pegs, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: SS.EZ.pop, stagger: 0.05 }, T.cables - 0.12);
    SS.tl.fromTo(M, { cab: 0 }, { cab: 1, duration: T.catch - T.cables + 0.02, ease: SS.EZ.out }, T.cables);
    // the finger
    const fing = SS.el('div', 'a3', L9);
    Object.assign(fing.style, { width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(40,58,62,.22)',
      boxShadow: 'inset 0 0 0 3px rgba(255,255,255,.95), 0 6px 16px -6px rgba(10,40,48,.35)' });
    SS.tl.fromTo(M, { fing: 0 }, { fing: 1, duration: 0.16, ease: SS.EZ.out }, T.grab - 0.1);
    SS.tl.fromTo(M, { press: 0 }, { press: 1, duration: 0.07, ease: 'power2.out' }, T.grab);
    SS.tl.fromTo(M, { press: 1 }, { press: 0, duration: 0.1, ease: 'power2.out' }, T.release);
    SS.tl.fromTo(M, { fing: 1 }, { fing: 0, duration: 0.24, ease: 'power1.out' }, T.release + 0.02);
    SS.cue(T.release, 'sfx-release');
    // logo and address
    const logo = SS.logo(L9, 150);
    SS.place(logo.el, 540, 560);
    gsap.set(logo.letters, { y: 150 });
    const LP = { mark: 0, sheen: 0 };
    SS.tl.fromTo(LP, { mark: 0 }, { mark: 1, duration: 0.66, ease: 'none' }, T.logo);
    SS.tl.fromTo(logo.letters, { y: 150 }, { y: 0, duration: 0.6, stagger: 0.03, ease: SS.EZ.out }, T.logo + 0.15);
    SS.tl.fromTo(LP, { sheen: 0 }, { sheen: 1, duration: 0.7, ease: 'sine.inOut' }, T.sheen - 0.3);
    const url = SS.text(L9, 'scalesuiteqc.ca', { size: 46, weight: 650, color: C.ink2, tracking: -0.01 });
    SS.place(url.el, 540, 1330);
    SS.hideWords(url);
    SS.wordsIn(url, T.url, { dur: 0.6 });
    SS.cue(T.logo, 'm-logo');

    simulate();
    R = { L8, L9, cbox, pw, pi, shadow, cab, fing, logo, LP, H, checks, art, face };
    R.relSim = simAt(T.release);
  }

  const mix = (a, b, k) => a + (b - a) * k;
  function render(t) {
    CK.forEach((c, i) => R.checks && R.checks[i].set(c.k));
    // seal → pill position: stamped spot (with the slam), then the centre, then the simulation
    let x, y, r, sc = 1;
    if (t < T.catch) {
      const above = (1 - M.slam) * 1; // anticipation: 1 = lifted
      const sx = SEAL.x, sy = SEAL.y - 70 * above;
      sc = 1 + 0.3 * above;
      x = mix(sx, PILL.x, M.k); y = mix(sy, PILL.y - 46, M.k); r = mix(SEAL.r, 0, M.k);
      if (M.k > 0) sc = 1;
    } else {
      const s = simAt(t);
      x = s.x; y = s.y; r = (s.r * 180) / Math.PI;
    }
    const k = M.shake, jx = k > 0 && k < 1 ? 2 * Math.sin(k * Math.PI * 2 * 4) * (1 - k) : 0;
    R.cbox.style.left = jx.toFixed(2) + 'px';
    R.pw.style.transform = `translate(${(x + (t < T.pill ? jx : 0)).toFixed(2)}px,${y.toFixed(2)}px) rotate(${r.toFixed(3)}deg) scale(${sc.toFixed(4)})`;
    R.shadow.style.transform = `translate(${(x - (PILL.w + 40) / 2 + 6).toFixed(2)}px,${(y - (PILL.h + 40) / 2 + 46).toFixed(2)}px) rotate(${r.toFixed(3)}deg)`;
    // cables: from the peg to the pill's attachment, shooting out first, sagging when slack, thinner when stretched
    const rr = (r * Math.PI) / 180, c = Math.cos(rr), s = Math.sin(rr);
    for (let q = 0; q < 2; q++) {
      const ax = x + ATT[q] * c, ay = y + ATT[q] * s, p = PEG[q];
      const ex = mix(p.x, ax, M.cab), ey = mix(p.y, ay, M.cab);
      const L = Math.hypot(ex - p.x, ey - p.y), L0 = SIM.L0[q];
      const sag = M.cab < 1 ? 0 : Math.max(0, L0 - L) * 0.7 + 2;
      const mx = (p.x + ex) / 2, my = (p.y + ey) / 2 + sag;
      const d = `M${p.x},${p.y} Q${mx.toFixed(2)},${my.toFixed(2)} ${ex.toFixed(2)},${ey.toFixed(2)}`;
      const wdt = Math.max(4, Math.min(9, 8 * Math.sqrt(L0 / Math.max(L, 1))));
      R.cab[q].base.setAttribute('d', d); R.cab[q].base.setAttribute('stroke-width', wdt.toFixed(2));
      R.cab[q].hi.setAttribute('d', d); R.cab[q].hi.setAttribute('stroke-width', (wdt * 0.3).toFixed(2));
      const vis = M.cab > 0.001 ? 'visible' : 'hidden';
      R.cab[q].base.style.visibility = vis; R.cab[q].hi.style.visibility = vis;
    }
    // finger: on the grab point while it holds, then it follows the target until release
    let gx = x + GRAB * c, gy = y + GRAB * s;
    if (t > T.release) { const q = R.relSim, a = q.r; gx = q.x + GRAB * Math.cos(a); gy = q.y + GRAB * Math.sin(a); }
    const fs = (1.25 - 0.25 * M.fing) * (1 - 0.1 * M.press);
    R.fing.style.transform = `translate(${(gx - 48).toFixed(2)}px,${(gy - 48).toFixed(2)}px) scale(${fs.toFixed(4)})`;
    R.fing.style.opacity = M.fing.toFixed(3);
    R.fing.style.visibility = M.fing > 0.002 ? 'visible' : 'hidden';
    R.logo.mark(R.LP.mark);
    R.logo.sheen(R.LP.sheen);
    SS.blur(R.art, M.xb); SS.blur(R.face, M.xb);
  }
  const scene = { name: 'fin', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => {
    build(stage);
    scene.ranges = [[R.L8, T.whip8, T.pill + 0.5], [R.L9, T.whip8, 99]];
  };
  SS.scenes.push(scene);
})();
