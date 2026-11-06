/* « Dimanche, 21 h 14 » · background: a light seamless studio sweep (top → floor), static. No floating
   blurred lights (the "AI slop" rule of this film): the ambient layer is the slow camera pushes and the
   floor reflections under the hero objects. Grain is added by the runner. */
(function () {
  const SS = window.SS, C = SS.DC;
  let R;
  function build(stage) {
    const root = SS.el('div', 'layer', stage);
    root.style.background = `linear-gradient(180deg, ${C.bgTop} 0%, #F3F8F8 46%, ${C.bgBot} 100%)`;
    // a soft studio light behind the product zone (static), and a faint horizon where the floor begins
    const light = SS.el('div', 'a3', root);
    Object.assign(light.style, { width: '1500px', height: '1100px', borderRadius: '50%',
      background: 'radial-gradient(closest-side, rgba(255,255,255,.85), rgba(255,255,255,0))' });
    SS.place(light, 540, 900);
    const floor = SS.el('div', 'a3', root);
    Object.assign(floor.style, { width: '1080px', height: '520px', top: '1400px',
      background: 'linear-gradient(180deg, rgba(214,228,228,0) 0%, rgba(214,228,228,.35) 100%)' });
    R = { root };
  }
  const scene = { name: 'fond', a: -1, b: -1, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.root, -1, 99]]; };
  SS.scenes.push(scene);
})();
