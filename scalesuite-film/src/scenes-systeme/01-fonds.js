/* « Système Vendeurs 5 minutes » · backgrounds and the clock.
   - Problem world: flat cool grey #EEF1F4 (no drifting lights).
   - Site world: flat #F0FFFC with a fixed, very soft vertical gradient to #E7F8F5 (like the site's mint
     bands), revealed by a disc that blooms from the clock (circle clip, procedural radius).
   - The clock (SS.CLK, screen space, y 600): pill with a small dial (hour and minute hands follow the
     displayed time, a seconds hand turns continuously: the ambient layer) and rolling digits. It can
     widen into a ruler (14 h 12 ━━ 17 h 04), switch to a date line, and send a turquoise thread (« fil »)
     to whatever acts at that minute. The clock layer is re-appended on top of the stage in 04-fin. */
(function () {
  const SS = window.SS, S = SS.ST, P = SS.P, M = SS.M;
  const CY = 600, PW = 900, PH = 96;
  const PROXY = { r: 0, min: 852, alpha: 0 };
  let R;

  function build(stage) {
    const bgA = SS.el('div', 'layer', stage);
    bgA.style.background = P.bg;
    const bgM = SS.el('div', 'layer', stage);
    bgM.style.background = `linear-gradient(180deg, ${M.bg} 0%, ${M.bg} 38%, ${M.bg2} 100%)`;
    bgM.style.clipPath = 'circle(0px at 540px 600px)';
    SS.BGM = bgM; // the problem world is inserted below it, so the bloom covers it
    SS.tl.fromTo(PROXY, { r: 0 }, { r: 2300, duration: 0.5, ease: 'power2.inOut' }, S.bloom);

    // ---------------------------------------------------------------- the clock
    const layer = SS.el('div', 'layer', stage);
    const pill = SS.el('div', 'a3', layer);
    Object.assign(pill.style, { width: PW + 'px', height: PH + 'px', borderRadius: PH / 2 + 'px', background: P.line, color: P.ink });
    const group = SS.el('div', '', pill);
    Object.assign(group.style, { position: 'absolute', top: '0px', height: PH + 'px', display: 'flex', alignItems: 'center', gap: '18px',
      fontSize: '54px', fontWeight: 720, letterSpacing: '-.02em', fontFeatureSettings: "'tnum' 1", whiteSpace: 'nowrap' });
    const dial = SS.el('span', '', group);
    Object.assign(dial.style, { width: '58px', height: '58px', display: 'block', flex: 'none' });
    const svg = SS.svg('svg', { viewBox: '0 0 58 58', width: 58, height: 58 }, dial);
    SS.svg('circle', { cx: 29, cy: 29, r: 25.5, fill: 'none', stroke: 'currentColor', 'stroke-width': 4 }, svg);
    const hH = SS.svg('line', { x1: 29, y1: 29, x2: 29, y2: 16, stroke: 'currentColor', 'stroke-width': 4.4, 'stroke-linecap': 'round' }, svg);
    const hM = SS.svg('line', { x1: 29, y1: 29, x2: 29, y2: 10, stroke: 'currentColor', 'stroke-width': 3.4, 'stroke-linecap': 'round' }, svg);
    const hS = SS.svg('line', { x1: 29, y1: 33, x2: 29, y2: 9, stroke: P.slate, 'stroke-width': 2, 'stroke-linecap': 'round' }, svg);
    SS.svg('circle', { cx: 29, cy: 29, r: 3.2, fill: 'currentColor' }, svg);
    // time line and date line stacked in one window
    const win = SS.el('span', '', group);
    Object.assign(win.style, { display: 'inline-block', overflow: 'hidden', height: '70px' });
    const col = SS.el('span', '', win);
    Object.assign(col.style, { display: 'flex', flexDirection: 'column' });
    const timeRow = SS.el('span', '', col);
    Object.assign(timeRow.style, { display: 'flex', height: '70px', lineHeight: '70px', whiteSpace: 'pre' });
    SS.el('span', '', timeRow).textContent = 'sam. ';
    const hh = SS.roller(timeRow, ['14', '15', '17'], { h: 70 });
    SS.el('span', '', timeRow).textContent = ' h ';
    const MM = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '30', '04'];
    const mm = SS.roller(timeRow, MM, { h: 70, align: 'left' });
    const dateRow = SS.el('span', '', col);
    Object.assign(dateRow.style, { display: 'flex', height: '70px', lineHeight: '70px' });
    const date = SS.roller(dateRow, ['sam. 7 nov.', 'ven. 5 févr.'], { h: 70, align: 'left' });
    gsap.set(col, { yPercent: 0 });
    // fixed widths so the group never reflows while digits roll
    hh.win.style.width = '66px'; mm.win.style.width = '66px';
    const gw = Math.ceil(group.getBoundingClientRect().width);
    date.win.style.width = Math.max(gw - 76, 300) + 'px';
    const gx0 = (PW - gw) / 2, gx1 = PW - 44 - gw; // centred → right-aligned (ruler)
    gsap.set(group, { x: gx0 });
    const vis = gw + 72; // visible pill width when compact
    const clipC = SS.clipR(0, (PW - vis) / 2, 0, (PW - vis) / 2, PH / 2), clipW = SS.clipR(0, 0, 0, 0, PH / 2);
    // ruler parts: start label and the grey span
    const rl = SS.el('div', '', pill);
    Object.assign(rl.style, { position: 'absolute', left: '44px', top: '0px', height: PH + 'px', display: 'flex', alignItems: 'center', fontSize: '40px', fontWeight: 650, color: P.soft, fontFeatureSettings: "'tnum' 1", whiteSpace: 'nowrap' });
    rl.textContent = '14 h 12';
    const rlw = Math.ceil(rl.getBoundingClientRect().width);
    const bar = SS.el('div', '', pill);
    const bx0 = 44 + rlw + 24, bx1 = gx1 - 24;
    Object.assign(bar.style, { position: 'absolute', left: bx0 + 'px', top: PH / 2 - 5 + 'px', width: bx1 - bx0 + 'px', height: '10px', borderRadius: '5px', background: '#BCC5CE', transformOrigin: '0% 50%' });
    gsap.set(rl, { autoAlpha: 0, x: -16 });
    gsap.set(bar, { scaleX: 0 });
    SS.place(pill, 540, CY, { clipPath: clipC, autoAlpha: 0 });

    // ---------------------------------------------------------------- threads from the clock (screen space)
    const fsvg = SS.svg('svg', { width: 1080, height: 1920, style: 'position:absolute;left:0;top:0;overflow:visible' }, layer);
    layer.insertBefore(fsvg, pill);
    const fils = [];

    SS.CLK = {
      layer, pill, group, hh, mm, date, col, rl, bar, hS, P: PROXY, y: CY, h: PH, gw, vis,
      // move the displayed time (hour index, minute index, minutes since midnight)
      go(at, dur, hi, mi, min, ease = SS.EZ.inOut) {
        if (hi != null) hh.to(at, hi, dur, ease);
        if (mi != null) mm.to(at, mi, dur, ease);
        SS.tl.fromTo(PROXY, { min: this._min }, { min, duration: dur, ease }, at);
        this._min = min;
      },
      _min: 852,
      ruler(at, open = true, dur = 0.6) {
        const e = open ? SS.EZ.out : SS.EZ.inOut;
        SS.tl.fromTo(pill, { clipPath: open ? clipC : clipW }, { clipPath: open ? clipW : clipC, duration: dur, ease: e }, at);
        SS.tl.fromTo(group, { x: open ? gx0 : gx1 }, { x: open ? gx1 : gx0, duration: dur, ease: e }, at);
        SS.tl.fromTo(rl, { autoAlpha: open ? 0 : 1, x: open ? -16 : 0 }, { autoAlpha: open ? 1 : 0, x: open ? 0 : -16, duration: dur * 0.7, ease: e }, at + (open ? 0.15 : 0));
        SS.tl.fromTo(bar, { scaleX: open ? 0 : 1 }, { scaleX: open ? 1 : 0, duration: dur, ease: e }, at + (open ? 0.2 : 0));
      },
      // thread: drawn from the clock to target(t) (screen coords), held, then retracted into the target
      fil(at, dDraw, off, dOff, target) { fils.push({ at, dDraw, off, dOff, target, el: SS.svg('path', { fill: 'none', stroke: M.turq, 'stroke-width': 5, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, fsvg) }); },
      clipC, clipW,
    };
    R = { bgA, bgM, layer, hH, hM, fils };
  }

  function render(t) {
    R.bgM.style.clipPath = PROXY.r > 0.5 ? (PROXY.r > 2290 ? 'none' : `circle(${PROXY.r.toFixed(1)}px at 540px 600px)`) : 'circle(0px at 540px 600px)';
    const m = PROXY.min;
    R.hH.setAttribute('transform', `rotate(${((m / 60) * 30 % 360).toFixed(2)} 29 29)`);
    R.hM.setAttribute('transform', `rotate(${((m % 60) * 6).toFixed(2)} 29 29)`);
    SS.CLK.hS.setAttribute('transform', `rotate(${((t * 36) % 360).toFixed(2)} 29 29)`);
    for (const f of R.fils) {
      if (t < f.at || t > f.off + f.dOff) { f.el.style.display = 'none'; continue; }
      f.el.style.display = '';
      const p = SS.EZ.inOut(SS.clamp01((t - f.at) / f.dDraw)), q = SS.EZ.in(SS.clamp01((t - f.off) / f.dOff));
      const g = f.target(t), y0 = CY + 48, my = (y0 + g.y) / 2;
      f.el.setAttribute('d', `M540,${y0} C540,${my.toFixed(1)} ${g.x.toFixed(1)},${my.toFixed(1)} ${g.x.toFixed(1)},${g.y.toFixed(1)}`);
      f.el.setAttribute('stroke-dashoffset', (q > 0 ? -q : 1 - p).toFixed(4));
    }
  }

  const scene = { name: 'fonds', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.bgA, -1, S.bloom + 0.6], [R.bgM, S.bloom - 0.05, 99], [R.layer, S.born - 0.1, S.proof + 0.3]]; };
  SS.scenes.push(scene);
})();
