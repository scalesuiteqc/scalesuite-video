/* « Gardez vos courtiers » · backgrounds. The problem world is a cool grey-blue base with two slow grey
   lights; the ScaleSuite world is the mint disc that blooms out of the node the shared pool contracts
   into (11.0 s), with two drifting mint lights. The team grid (02-equipe) stays above both. */
(function () {
  const SS = window.SS, L = SS.ET, C = SS.C;
  const NODE = { x: 540, y: 740 }; // centre of the shared pool (world = screen at the bascule)
  SS.POOLNODE = NODE;
  let R;
  function build(stage) {
    const cool = SS.el('div', 'layer', stage);
    cool.style.background = SS.P.bg;
    const gray = [0, 1].map((i) => {
      const b = SS.el('div', 'a3', cool);
      Object.assign(b.style, { width: '1300px', height: '1300px', borderRadius: '50%',
        background: `radial-gradient(closest-side, ${i ? 'rgba(110,128,146,.10)' : 'rgba(255,255,255,.55)'}, rgba(238,241,244,0))` });
      return b;
    });
    const mint = SS.el('div', 'layer', stage);
    const D = Math.ceil(2 * Math.hypot(540, 1920 - NODE.y) * 1.04);
    const disc = SS.el('div', 'a3', mint);
    Object.assign(disc.style, { width: D + 'px', height: D + 'px', borderRadius: '50%', background: 'radial-gradient(closest-side, #F2FCFA 0%, #EAFAF7 55%, #E2F7F3 100%)' });
    SS.place(disc, NODE.x, NODE.y, { scale: 0.004, autoAlpha: 0 });
    const blobs = [0, 1].map((i) => {
      const b = SS.el('div', 'a3', mint);
      Object.assign(b.style, { width: '1300px', height: '1300px', borderRadius: '50%',
        background: `radial-gradient(closest-side, ${i ? 'rgba(43,191,179,.12)' : 'rgba(29,158,117,.09)'}, rgba(232,249,247,0))` });
      gsap.set(b, { autoAlpha: 0 });
      return b;
    });
    const node = SS.el('div', 'a3', mint);
    Object.assign(node.style, { width: '26px', height: '26px', borderRadius: '50%', background: C.green, boxShadow: '0 0 0 9px rgba(43,191,179,.2)' });
    SS.place(node, NODE.x, NODE.y, { scale: 0 });
    SS.tl.fromTo(node, { scale: 0 }, { scale: 1.3, duration: 0.18, ease: SS.EZ.out }, L.bascule + 0.16);
    SS.tl.fromTo(node, { scale: 1.3 }, { scale: 0, duration: 0.24, ease: SS.EZ.in }, L.bloom + 0.2);
    SS.tl.set(disc, { autoAlpha: 1 }, L.bloom);
    SS.tl.fromTo(disc, { scale: 0.004 }, { scale: 1, duration: 0.5, ease: 'power2.inOut' }, L.bloom);
    SS.tl.fromTo(blobs, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: 'power1.out' }, L.bloom + 0.3);
    SS.cue(L.bloom, 'm-bloom');
    R = { cool, gray, mint, blobs };
  }
  function render(t) {
    gsap.set(R.gray[0], { x: 300 + Math.sin(t * 0.29) * 150, y: 520 + Math.cos(t * 0.25) * 110, xPercent: -50, yPercent: -50 });
    gsap.set(R.gray[1], { x: 820 + Math.cos(t * 0.21) * 170, y: 1450 + Math.sin(t * 0.27) * 130, xPercent: -50, yPercent: -50 });
    gsap.set(R.blobs[0], { x: 320 + Math.sin(t * 0.31) * 160, y: 560 + Math.cos(t * 0.27) * 120, xPercent: -50, yPercent: -50 });
    gsap.set(R.blobs[1], { x: 800 + Math.cos(t * 0.23) * 180, y: 1420 + Math.sin(t * 0.29) * 140, xPercent: -50, yPercent: -50 });
  }
  const scene = { name: 'fond', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.cool, -1, L.bloom + 0.6], [R.mint, L.bascule, 99]]; };
  SS.scenes.push(scene);
})();
