/* « Le lead perdu » · background of the problem world: cool grey-blue base and two slow grey lights
   (ambient layer). The ScaleSuite world's mint disc blooms over it in 03-solution. */
(function () {
  const SS = window.SS;
  let R;
  function build(stage) {
    const root = SS.el('div', 'layer', stage);
    root.style.background = SS.P.bg;
    const blobs = [0, 1].map((i) => {
      const b = SS.el('div', 'a3', root);
      Object.assign(b.style, { width: '1300px', height: '1300px', borderRadius: '50%',
        background: `radial-gradient(closest-side, ${i ? 'rgba(110,128,146,.10)' : 'rgba(255,255,255,.55)'}, rgba(238,241,244,0))` });
      return b;
    });
    R = { root, blobs };
  }
  function render(t) {
    gsap.set(R.blobs[0], { x: 300 + Math.sin(t * 0.29) * 150, y: 520 + Math.cos(t * 0.25) * 110, xPercent: -50, yPercent: -50 });
    gsap.set(R.blobs[1], { x: 820 + Math.cos(t * 0.21) * 170, y: 1450 + Math.sin(t * 0.27) * 130, xPercent: -50, yPercent: -50 });
  }
  const scene = { name: 'fond', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.root, -1, SS.LT.bloom + 0.6]]; };
  SS.scenes.push(scene);
})();
