/* « Système Vendeurs 5 minutes » V2 · background and the clock.
   - The whole film lives in the site's world: flat #F0FFFC with a fixed, very soft vertical gradient to #E7F8F5.
   - The clock (SS.CLK, screen space, y 640) is born from « Nouveau » at 6.65 s showing « mar. 18 h 30 » (the meeting
     seen at frame 0), then goes back to « sam. 14 h 12 » (one readable text at a time, a short blur bridges the swap)
     and advances minute by minute; it sends a turquoise thread to whatever acts at that minute.
   The clock layer is re-appended on top of the stage in 04-fin. */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M;
  const CY = 640, PW = 900, PH = 96;
  const PROXY = { min: 18 * 60 + 30, blur: 0 };
  let R;

  function build(stage) {
    const bg = SS.el('div', 'layer', stage);
    bg.style.background = `linear-gradient(180deg, ${M.bg} 0%, ${M.bg} 38%, ${M.bg2} 100%)`;
    SS.BGM = bg;

    const layer = SS.el('div', 'layer', stage);
    const pill = SS.el('div', 'a3', layer);
    Object.assign(pill.style, { width: PW + 'px', height: PH + 'px', borderRadius: PH / 2 + 'px', background: '#ffffff', color: M.ink,
      boxShadow: '0 1px 2px rgba(18,44,40,.06), 0 14px 30px -16px rgba(18,74,66,.28), 0 0 0 2px rgba(196,214,211,1)' });
    const group = SS.el('div', '', pill);
    Object.assign(group.style, { position: 'absolute', top: '0px', height: PH + 'px', display: 'flex', alignItems: 'center', gap: '18px',
      fontSize: '54px', fontWeight: 720, letterSpacing: '-.02em', fontFeatureSettings: "'tnum' 1", whiteSpace: 'nowrap' });
    const dial = SS.el('span', '', group);
    Object.assign(dial.style, { width: '58px', height: '58px', display: 'block', flex: 'none' });
    const svg = SS.svg('svg', { viewBox: '0 0 58 58', width: 58, height: 58 }, dial);
    SS.svg('circle', { cx: 29, cy: 29, r: 25.5, fill: 'none', stroke: 'currentColor', 'stroke-width': 4 }, svg);
    const hH = SS.svg('line', { x1: 29, y1: 29, x2: 29, y2: 16, stroke: 'currentColor', 'stroke-width': 4.4, 'stroke-linecap': 'round' }, svg);
    const hM = SS.svg('line', { x1: 29, y1: 29, x2: 29, y2: 10, stroke: 'currentColor', 'stroke-width': 3.4, 'stroke-linecap': 'round' }, svg);
    const hS = SS.svg('line', { x1: 29, y1: 33, x2: 29, y2: 9, stroke: M.turq, 'stroke-width': 2, 'stroke-linecap': 'round' }, svg);
    SS.svg('circle', { cx: 29, cy: 29, r: 3.2, fill: 'currentColor' }, svg);
    // two stacked lines in one window: « mar. 18 h 30 » then the Saturday time line
    const win = SS.el('span', '', group);
    Object.assign(win.style, { display: 'inline-block', overflow: 'hidden', height: '70px' });
    const col = SS.el('span', '', win);
    Object.assign(col.style, { display: 'flex', flexDirection: 'column' });
    const tueRow = SS.el('span', '', col);
    Object.assign(tueRow.style, { display: 'flex', height: '70px', lineHeight: '70px', whiteSpace: 'pre' });
    tueRow.textContent = 'mar. 18 h 30';
    const timeRow = SS.el('span', '', col);
    Object.assign(timeRow.style, { display: 'flex', height: '70px', lineHeight: '70px', whiteSpace: 'pre' });
    SS.el('span', '', timeRow).textContent = 'sam. 14 h ';
    const MM = ['12', '13', '14', '15', '16', '17', '18', '19'];
    const mm = SS.roller(timeRow, MM, { h: 70, align: 'left' });
    mm.win.style.width = '66px';
    gsap.set(col, { yPercent: 0 });
    gsap.set(timeRow, { autoAlpha: 0 });
    const gw = Math.ceil(group.getBoundingClientRect().width);
    gsap.set(group, { x: (PW - gw) / 2 });
    const vis = gw + 72;
    const clipC = SS.clipR(0, (PW - vis) / 2, 0, (PW - vis) / 2, PH / 2);
    SS.place(pill, 540, CY, { clipPath: clipC, autoAlpha: 0 });

    // Tuesday → Saturday: fade out, swap the line, fade in (a 2 px blur bridges it), hands jump back
    SS.tl.fromTo(tueRow, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.14, ease: 'power1.out' }, S.swap);
    SS.tl.fromTo(col, { yPercent: 0 }, { yPercent: -50, duration: 0.001, ease: 'none' }, S.swap + 0.15);
    SS.tl.fromTo(timeRow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: SS.EZ.out }, S.swap + 0.16);
    SS.tl.fromTo(PROXY, { blur: 0 }, { blur: 2, duration: 0.14, ease: 'power1.out' }, S.swap);
    SS.tl.fromTo(PROXY, { blur: 2 }, { blur: 0, duration: 0.24, ease: SS.EZ.out }, S.swap + 0.15);
    SS.tl.fromTo(PROXY, { min: 1110 }, { min: 852, duration: 0.3, ease: SS.EZ.inOut }, S.swap);

    // threads from the clock (screen space)
    const fsvg = SS.svg('svg', { width: 1080, height: 1920, style: 'position:absolute;left:0;top:0;overflow:visible' }, layer);
    layer.insertBefore(fsvg, pill);
    const fils = [];
    let mi = 0, min = 852;
    SS.CLK = {
      layer, pill, group, hS, P: PROXY, y: CY, h: PH, clipC,
      // advance to minute index i (into MM)
      go(at, dur, i, ease = SS.EZ.out) {
        mm.to(at, i, dur, ease);
        SS.tl.fromTo(PROXY, { min }, { min: 852 + i, duration: dur, ease }, at);
        mi = i; min = 852 + i;
      },
      fil(at, dDraw, off, dOff, target) { fils.push({ at, dDraw, off, dOff, target, el: SS.svg('path', { fill: 'none', stroke: M.turq, 'stroke-width': 5, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, fsvg) }); },
    };
    R = { bg, layer, hH, hM, fils, group };
  }

  function render(t) {
    const m = PROXY.min;
    R.hH.setAttribute('transform', `rotate(${((m / 60) * 30 % 360).toFixed(2)} 29 29)`);
    R.hM.setAttribute('transform', `rotate(${((m % 60) * 6).toFixed(2)} 29 29)`);
    SS.CLK.hS.setAttribute('transform', `rotate(${((t * 36) % 360).toFixed(2)} 29 29)`);
    SS.blur(R.group, PROXY.blur);
    for (const f of R.fils) {
      if (t < f.at || t > f.off + f.dOff) { f.el.style.display = 'none'; continue; }
      f.el.style.display = '';
      const p = SS.EZ.inOut(SS.clamp01((t - f.at) / f.dDraw)), q = SS.EZ.in(SS.clamp01((t - f.off) / f.dOff));
      const g = f.target(t), y0 = gsap.getProperty(SS.CLK.pill, 'y') + 48, my = (y0 + g.y) / 2;
      f.el.setAttribute('d', `M540,${y0} C540,${my.toFixed(1)} ${g.x.toFixed(1)},${my.toFixed(1)} ${g.x.toFixed(1)},${g.y.toFixed(1)}`);
      f.el.setAttribute('stroke-dashoffset', (q > 0 ? -q : 1 - p).toFixed(4));
    }
  }

  const scene = { name: 'fonds', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, S.clock - 0.05, S.toWeek + 0.4]]; };
  SS.scenes.push(scene);
})();
