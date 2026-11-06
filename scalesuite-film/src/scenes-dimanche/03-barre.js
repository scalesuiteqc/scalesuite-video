/* « Dimanche, 21 h 14 » · the play bar of the week, the film's thread (screen space).
   A track, its turquoise played part, a glossy thumb, and the time bubble pinned to the thumb by its
   tail. The thumb position is a pure function of story time (SS.D.story / SS.D.frac). The bubble tilts
   like a tag dragged by its tail: a damped torsion pendulum driven by the thumb's acceleration,
   integrated ONCE at build time over the whole film (0.25 ms step, stored per ms) and read back in
   render(t). Everything GSAP touches is a proxy (B); render(t) alone writes the DOM of this layer.
   Scene 2: the bar rises, the finger drags it back from Thursday 18 h 30 to Sunday 21 h 14.
   Exit (5.6): the track thickens into the search bar of scene 3 (handed over at 6.05, identical), the
   bubble flies up and stays as the time chip above it until the ad opens into the page (7.72). */
(function () {
  const SS = window.SS, T = SS.DT, C = SS.DC;
  const X0 = 110, W = 760, BARY = 1490, LIFT = 40; // track from x 110 to 870; tail tip 40 px above the thumb centre
  const SEARCH = SS.D_SEARCH;
  const CHIP = { x: 540, y: 618, s: 1 };
  const B = { y: 2060, fing: 0, press: 0, morph: 0, fly: 0, out: 0, mblur: 0 };
  SS.BAR = { X0, W, BARY, SEARCH };
  const thumbX = (t) => X0 + W * SS.D.frac(SS.D.story(t).h);

  // ---- bubble tilt: torsion pendulum driven by the thumb's acceleration (precomputed) ---------------
  let TILT = null;
  function precompute() {
    const dur = SS.DT.end + 1, n = Math.ceil(dur * 1000) + 2, xs = new Float64Array(n + 2);
    for (let i = 0; i < n + 2; i++) xs[i] = thumbX((i - 1) / 1000);
    const w0 = 13, z = 0.42, L = 55, h = 0.00025;
    let th = 0, v = 0;
    TILT = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const a = (xs[i + 2] - 2 * xs[i + 1] + xs[i]) * 1e6; // px/s² at t = i ms
      for (let k = 0; k < 4; k++) { v += (-w0 * w0 * th - 2 * z * w0 * v - a / L) * h; th += v * h; }
      TILT[i] = Math.max(-10, Math.min(10, (th * 180) / Math.PI));
    }
  }
  const tiltAt = (t) => {
    const f = Math.max(0, t * 1000), i = Math.floor(f);
    if (i >= TILT.length - 1) return TILT[TILT.length - 1];
    return TILT[i] + (TILT[i + 1] - TILT[i]) * (f - i);
  };

  let R;
  function build(stage) {
    const L = SS.el('div', 'layer', stage);
    const track = SS.el('div', 'a3', L);
    Object.assign(track.style, { background: C.track });
    const fill = SS.el('div', 'a3', L);
    Object.assign(fill.style, { height: '12px', borderRadius: '6px', background: C.turq, transformOrigin: '0 50%' });
    const thumb = SS.el('div', 'a3', L);
    Object.assign(thumb.style, { width: '56px', height: '56px', borderRadius: '50%',
      background: 'radial-gradient(circle at 36% 30%, #FFFFFF 0%, #F6FAFA 48%, #DFE8E8 100%)',
      boxShadow: '0 7px 16px -5px rgba(10,40,48,.38), 0 0 0 1px rgba(10,40,48,.08), inset 0 -2px 3px rgba(10,40,48,.08), inset 0 2px 1px rgba(255,255,255,.9)' });
    // bubble: wrapper origin = tail tip
    const bw = SS.el('div', 'a3', L);
    const body = SS.el('div', 'a3', bw);
    Object.assign(body.style, { width: 'max-content', minWidth: '300px', padding: '16px 32px 14px', boxSizing: 'border-box', borderRadius: '26px',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFCFC 100%)', textAlign: 'center', whiteSpace: 'nowrap',
      boxShadow: '0 2px 4px rgba(10,40,48,.08), 0 22px 40px -18px rgba(10,40,48,.40), 0 0 0 1px rgba(10,40,48,.06), inset 0 1px 0 #fff' });
    body.innerHTML = `<div class="l1 dm-num" style="font-size:40px;font-weight:740;letter-spacing:-.02em;color:${C.ink};line-height:1.12"></div>
      <div class="l2" style="font-size:30px;font-weight:560;letter-spacing:-.01em;color:${C.soft};line-height:1.25"></div>`;
    const tail = SS.el('div', 'a3', bw);
    Object.assign(tail.style, { width: '34px', height: '16px', left: '-17px', top: '-17px', background: '#FCFDFD', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' });
    const l1 = body.querySelector('.l1'), l2 = body.querySelector('.l2');
    // the finger on the thumb
    const fing = SS.el('div', 'a3', L);
    Object.assign(fing.style, { width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(40,58,62,.20)',
      boxShadow: 'inset 0 0 0 3px rgba(255,255,255,.95), 0 6px 16px -6px rgba(10,40,48,.35)' });

    // ---- scene 2: rise, touch, drag back, lift
    SS.tl.fromTo(B, { y: 2060 }, { y: BARY, duration: 0.5, ease: SS.EZ.out }, T.barIn);
    SS.tl.fromTo(B, { fing: 0 }, { fing: 1, duration: 0.18, ease: SS.EZ.out }, T.fingIn);
    SS.tl.fromTo(B, { press: 0 }, { press: 1, duration: 0.08, ease: 'power2.out' }, T.press);
    SS.tl.fromTo(B, { press: 1 }, { press: 0, duration: 0.12, ease: 'power2.out' }, T.fingOut);
    SS.tl.fromTo(B, { fing: 1 }, { fing: 0, duration: 0.26, ease: 'power1.out' }, T.fingOut + 0.04);
    SS.cue(T.scrub, 'm-rewind', { dur: T.scrubDur });
    // ---- exit into scene 3: track → search bar, bubble → time chip, then the chip leaves
    SS.tl.fromTo(B, { morph: 0 }, { morph: 1, duration: T.morphDur, ease: SS.EZ.inOut }, T.morph);
    SS.tl.fromTo(B, { fly: 0 }, { fly: 1, duration: 0.5, ease: SS.EZ.inOut }, T.morph + 0.02);
    SS.tl.fromTo(B, { mblur: 0 }, { mblur: 4, duration: 0.14, ease: 'power2.in' }, T.morph + 0.08);
    SS.tl.fromTo(B, { mblur: 4 }, { mblur: 0, duration: 0.2, ease: 'power2.out' }, T.morph + 0.22);
    SS.tl.fromTo(B, { out: 0 }, { out: 1, duration: 0.26, ease: SS.EZ.in }, T.open);
    // ---- reset while hidden (10 s), then scenes 5 to 7: Monday, 24 September, 6 weeks later, Thursday
    SS.tl.fromTo(B, { y: BARY, fly: 1, out: 1 }, { y: 2060, fly: 0, out: 0, duration: 0.01, ease: 'none' }, 10.0);
    SS.tl.fromTo(B, { y: 2060 }, { y: BARY, duration: 0.45, ease: SS.EZ.out }, T.bar2In);
    [[T.mon, T.monDur], [T.sept, T.septDur], [T.six, T.sixDur], [T.thu, T.thuDur]].forEach(([at, dur]) => {
      SS.tl.fromTo(B, { fing: 0 }, { fing: 1, duration: 0.16, ease: SS.EZ.out }, at - 0.12);
      SS.tl.fromTo(B, { press: 0 }, { press: 1, duration: 0.07, ease: 'power2.out' }, at - 0.06);
      SS.tl.fromTo(B, { press: 1 }, { press: 0, duration: 0.1, ease: 'power2.out' }, at + dur + 0.04);
      SS.tl.fromTo(B, { fing: 1 }, { fing: 0, duration: 0.24, ease: 'power1.out' }, at + dur + 0.06);
      SS.cue(at, 'm-scrub', { dur });
    });
    SS.tl.fromTo(B, { y: BARY }, { y: 2060, duration: 0.4, ease: SS.EZ.in }, T.thu + T.thuDur + 0.12);

    precompute();
    R = { L, track, fill, thumb, bw, body, tail, l1, l2, fing };
  }

  const mix = (a, b, k) => a + (b - a) * k;
  function render(t) {
    const st = SS.D.story(t), w = SS.D.when(st.h);
    const f = SS.D.frac(st.h), tx = X0 + W * f, by = B.y;
    // morph window (scene 3 only)
    const k = t < 9.5 ? B.morph : 0;
    const handed = t >= T.morph + T.morphDur && t < 9.5;
    // track (and its morph into the search bar)
    const cx = mix(X0 + W / 2, SEARCH.x, k), cy = mix(by, SEARCH.y, k), tw = mix(W, SEARCH.w, k), th = mix(12, SEARCH.h, k);
    const g = Math.round(mix(0xD7, 0xFF, k)), g2 = Math.round(mix(0xE2, 0xFF, k));
    Object.assign(R.track.style, { left: (cx - tw / 2).toFixed(2) + 'px', top: (cy - th / 2).toFixed(2) + 'px', width: tw.toFixed(2) + 'px',
      height: th.toFixed(2) + 'px', borderRadius: (th / 2).toFixed(2) + 'px', background: `rgb(${g},${g2},${g2})`,
      boxShadow: `0 1px 2px rgba(18,44,40,${(0.06 * k).toFixed(3)}), 0 14px 34px -14px rgba(18,74,66,${(0.26 * k).toFixed(3)}), 0 0 0 1px rgba(26,26,26,${(0.045 * k).toFixed(3)}), inset 0 1px 2px rgba(0,0,0,${(0.1 * (1 - k)).toFixed(3)})`,
      visibility: handed ? 'hidden' : 'visible' });
    SS.blur(R.track, B.mblur);
    const fade = SS.clamp01(1 - k * 4);
    Object.assign(R.fill.style, { left: X0 + 'px', top: (by - 6).toFixed(2) + 'px', width: W + 'px', transform: `scaleX(${f.toFixed(5)})`, opacity: fade.toFixed(3) });
    R.thumb.style.transform = `translate(${(tx - 28).toFixed(2)}px,${(by - 28).toFixed(2)}px) scale(${(1 - 0.08 * B.press).toFixed(4)})`;
    R.thumb.style.opacity = fade.toFixed(3);
    // finger
    const fs = (1.25 - 0.25 * B.fing) * (1 - 0.1 * B.press);
    R.fing.style.transform = `translate(${(tx - 48).toFixed(2)}px,${(by - 48).toFixed(2)}px) scale(${fs.toFixed(4)})`;
    R.fing.style.opacity = B.fing.toFixed(3);
    R.fing.style.visibility = B.fing > 0.002 ? 'visible' : 'hidden';
    // bubble text (story time) and placement (pinned to the thumb, tilted; then flown to the chip)
    const t1 = st.seg && st.seg.l1 && t >= st.seg.at ? st.seg.l1 : `${w.day} ${w.hm}`;
    const t2 = st.seg && st.seg.l2 && t >= st.seg.at ? st.seg.l2(w) : w.date;
    if (R.l1.textContent !== t1) R.l1.textContent = t1;
    if (R.l2.textContent !== t2) R.l2.textContent = t2;
    const bwid = R.body.offsetWidth, bh = R.body.offsetHeight;
    const shift = Math.max(24 + bwid / 2, Math.min(930 - bwid / 2, tx)) - tx;
    const fly = B.fly, px = mix(tx, CHIP.x, fly), py = mix(by - LIFT, CHIP.y, fly) - 20 * B.out;
    const sc = mix(1, CHIP.s, fly) * mix(1, 0.7, B.out), rot = tiltAt(t) * (1 - fly);
    R.bw.style.transform = `translate(${px.toFixed(2)}px,${py.toFixed(2)}px) rotate(${rot.toFixed(3)}deg) scale(${sc.toFixed(4)})`;
    R.bw.style.opacity = (1 - B.out).toFixed(3);
    R.body.style.transform = `translate(${(-bwid / 2 + shift * (1 - fly)).toFixed(2)}px,${(-bh - 15).toFixed(2)}px)`;
    R.tail.style.opacity = (1 - fly).toFixed(3);
  }
  const scene = { name: 'barre', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.L, T.barIn - 0.02, T.open + 0.3], [R.L, T.bar2In - 0.02, T.thu + T.thuDur + 0.55]]; };
  SS.scenes.push(scene);
})();
