/* Background of « Une journée de courtier »: the identity's light ground, whose temperature follows
   the hours (ΔE ≤ 3 from the V3 ground), and two soft lights. The first one rides a sun arc
   (low left at 7 h → zenith at 13 h → low right at 17 h) and is a pale sand at dawn and at dusk;
   the second, mint, counter-drifts. Ambient layer only: colour and light fades are allowed here
   (skill, section 7); no content is ever transparent. Everything is a function of t. */
(function () {
  const SS = window.SS;
  const D = SS.DAY;
  const END_T = 19.9; // the finale returns to the identity ground
  // keys: [time, ground, sun position 0..1, warmth 0..1]
  const KEYS = [
    [-1, '#F8FAF6', 0.04, 1],
    [D[1].at, '#F7FBFA', 0.3, 0.15],
    [D[2].at, '#EEF9F6', 0.55, 0],
    [D[3].at, '#F9F8F2', 0.92, 1],
    [END_T, '#F7FBFA', 0.5, 0],
  ];
  const TR = 1.0; // each change eases over 1 s from its key
  const inOut = SS.ease(SS.EZ.inOut);
  const mix = (a, b, k) => a + (b - a) * k;
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  function state(t) {
    let s = KEYS[0];
    let out = { g: rgb(s[1]), sun: s[2], warm: s[3] };
    for (let i = 1; i < KEYS.length; i++) {
      const k = KEYS[i];
      if (t < k[0]) break;
      const u = inOut(SS.clamp01((t - k[0]) / TR));
      const a = out, b = rgb(k[1]);
      out = { g: a.g.map((v, j) => mix(v, b[j], u)), sun: mix(a.sun, k[2], u), warm: mix(a.warm, k[3], u) };
      if (u < 1) break;
    }
    return out;
  }
  SS.bgState = state;

  let R;
  function build(stage) {
    const root = SS.el('div', 'layer', stage);
    const sun = SS.el('div', 'a3', root);
    Object.assign(sun.style, { width: '1400px', height: '1400px', borderRadius: '50%' });
    const mint = SS.el('div', 'a3', root);
    Object.assign(mint.style, { width: '1300px', height: '1300px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(43,191,179,.12), rgba(232,249,247,0))' });
    R = { root, sun, mint };
    SS.bg = R;
  }
  function render(t) {
    const s = state(t);
    const g = s.g.map((v) => Math.round(v));
    const bg = `rgb(${g[0]}, ${g[1]}, ${g[2]})`;
    if (R.root.style.backgroundColor !== bg) R.root.style.backgroundColor = bg;
    SS.paintScrims(g);
    // sun light: sand (dawn, dusk) ↔ mint (day)
    const w = s.warm;
    const col = [Math.round(mix(43, 240, w)), Math.round(mix(191, 214, w)), Math.round(mix(179, 170, w))];
    const a = (0.13 + 0.07 * w).toFixed(3);
    const grad = `radial-gradient(closest-side, rgba(${col[0]},${col[1]},${col[2]},${a}), rgba(${col[0]},${col[1]},${col[2]},0))`;
    if (R.sun.style.background !== grad) R.sun.style.background = grad;
    const x = 130 + 820 * s.sun, y = 1560 - 1250 * Math.sin(Math.PI * s.sun);
    gsap.set(R.sun, { x: x + Math.sin(t * 0.31) * 40, y: y + Math.cos(t * 0.27) * 30, xPercent: -50, yPercent: -50 });
    gsap.set(R.mint, { x: 1080 - x * 0.6 + Math.cos(t * 0.23) * 120, y: 1920 - y * 0.5 + Math.sin(t * 0.29) * 110, xPercent: -50, yPercent: -50 });
  }
  SS.scenes.push({ name: 'background', a: -1, b: 99, build, render });
})();
