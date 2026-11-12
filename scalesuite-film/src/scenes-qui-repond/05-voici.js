/* Scene 5 · Voici. The voice: 0,6 s of complete silence on black, then « Voici le Système Vendeurs 5 minutes. »
   1. Black. « Voici » in white, Inter 600, medium size, no gradient and no halo: it rises from a horizontal
      mask while its tracking tightens.
   2. HARD CUT on « le Système… » to the mint backdrop, full frame (no ring, no iris).
   3. On the mint: the logo symbol arrives on a soft spring, the word « ScaleSuite » slides out from behind
      it (light-background logo). Below, « Système Vendeurs [5 minutes] », the chip ON « 5 minutes ».
   4. Held 0,8 s without voice, then the camera glides away towards scene 6, on the same backdrop. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s5', w, QR.cue('s5', w));

  const T = { voici: cue('voici'), cut: cue('systeme'), five: cue('cinqMinutes'), glide: 0.26 };
  const L = Q.pick(
    { word: 124, y: 540, logoH: 200, logoY: 470, name: 64, nameY: 678 },
    { word: 110, y: 860, logoH: 120, logoY: 840, name: 50, nameY: 990 },
  );

  let R;
  function build(layer) {
    const dark = Q.div(layer, 'layer');
    Q.night(dark);
    const mask = Q.div(dark, 'qr-abs', { overflow: 'hidden', padding: '0 .2em', fontSize: L.word + 'px', lineHeight: 1.24 });
    const word = SS.el('div', '', mask);
    Object.assign(word.style, { fontWeight: 600, color: Q.C.white, whiteSpace: 'nowrap' });
    word.textContent = 'Voici';
    const light = Q.div(layer, 'layer');
    Q.day(light);
    const box = Q.div(light, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px' });
    const lbox = Q.div(box, 'qr-abs');
    const logo = SS.logo(lbox, L.logoH, {});
    Object.assign(lbox.style, { width: logo.w + 'px', height: logo.h + 'px' });
    logo.mark(1);
    const name = Q.phrase(box, [[{ t: 'Système Vendeurs' }, { t: '5 minutes', chip: true, g: 1 }]], { size: L.name, weight: 700, color: Q.C.ink });
    R = { dark, mask, word, light, box, lbox, logo, name };
  }

  function render(u) {
    const lit = u >= T.cut;
    R.dark.style.display = lit ? 'none' : '';
    R.light.style.display = lit ? '' : 'none';
    if (!lit) {
      const k = Q.k(u, T.voici, 0.4, Q.E.out);
      Q.st(R.mask, { x: Q.CX, y: L.y, o: u >= T.voici - 0.02 ? 1 : 0 });
      R.word.style.transform = `translateY(${((1 - k) * 105).toFixed(2)}%)`;
      R.word.style.letterSpacing = Q.lerp(0.04, -0.02, k).toFixed(4) + 'em';
      return;
    }
    const v = u - T.cut, end = QR.DUR.s5;
    // the camera glides away to the first phone of scene 6
    R.box.style.transform = `translateX(${(-Q.W * 0.9 * Q.k(u, end - T.glide, T.glide, Q.E.in)).toFixed(2)}px)`;
    const km = Q.k(v, 0, 0.5, Q.E.springSoft), kw = Q.k(v, 0.14, 0.5, Q.E.out);
    Q.st(R.lbox, { x: Q.CX + (1 - kw) * R.logo.w * 0.36, y: L.logoY, s: Q.lerp(0.7, 1, km), o: 1 });
    R.logo.letters.forEach((g, i) => g.setAttribute('transform', `translate(${(-(1 - Q.k(v, 0.14 + i * 0.012, 0.46, Q.E.out)) * 420).toFixed(2)} 0)`));
    R.name.put(Q.CX, L.nameY, u, { at: [T.cut + 0.06, T.five], chip: T.five });
  }

  QR.scene({ id: 's5', build, render, cuts: [0, T.cut] });
})();
