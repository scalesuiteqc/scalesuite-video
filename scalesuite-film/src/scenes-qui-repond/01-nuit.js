/* Scene 1 · La nuit (0 – 3,9 s).
   a) Black, then « Tu viens de recevoir [3] demandes de vendeurs. »: the words come into focus one by
      one (blur 12 px → sharp, scale 1,15 → 1; the first word is bigger and blurrier, like a camera
      pulling focus). The line stays centred while it grows. The digit rolls 0 → 3 inside its chip.
   b) Hard cut to a generated bedroom at 2 h 14: a phone lying flat on the nightstand lights up and
      throws a turquoise and blue halo on the surfaces around it. Giant clock typed at the top, three
      « Nouvelle demande » cards cascade around the phone on three depths; the phone buzzes at each. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  const T = {
    black: 0.3,            // first word
    wordGap: 0.2,          // delay between two words
    wordDur: 0.44,         // focus-in of one word
    firstDur: 0.58,        // focus-in of the first word (bigger, blurrier)
    digit: 1.12,           // the digit starts rolling (0 → 3)
    digitDur: 0.5,
    cut: 2.4,              // hard cut to the bedroom
    light: 2.4, lightDur: 0.4, // the phone screen wakes up
    clock: 2.47, clockCps: 22,
    cards: [2.52, 2.68, 2.84], // cascade
    cardDur: 0.52,
    zoom: 0.03,            // slow push-in over the whole shot
  };

  const WORDS = ['Tu', 'viens', 'de', 'recevoir', '#', 'demandes', 'de', 'vendeurs.'];
  const L = Q.pick(
    { size: 64, y: 540, clockSize: 250, clockY: 262,
      cards: [ // x, y, rotation, scale, depth blur, turquoise, parallax
        { x: 480, y: 652, r: -5, s: 1.12, blur: 0, turq: false, par: 1.0, title: 'Évaluation', city: 'Sainte Julie' },
        { x: 1456, y: 852, r: 4, s: 1.18, blur: 2.2, turq: true, par: 1.9, title: 'Vendre mon condo', city: 'Laval' },
        { x: 1420, y: 520, r: -3, s: 0.9, blur: 1.1, turq: false, par: 0.5, title: 'Maison à vendre', city: 'Lévis' },
      ] },
    { size: 64, y: 760, clockSize: 250, clockY: 420, cards: [] },
  );

  let R;
  function build(layer) {
    // ---- a) the sentence
    const a = Q.div(layer, 'layer');
    Q.night(a);
    const group = Q.div(a, 'qr-abs', { width: '0', height: '0' });
    const gap = L.size * 0.25;
    const words = WORDS.map((w) => {
      const el = Q.div(group, 'qr-abs', { fontSize: L.size + 'px', fontWeight: 600, letterSpacing: '-.025em', lineHeight: 1.16, whiteSpace: 'nowrap', color: Q.C.white });
      let fig = null;
      if (w === '#') {
        Object.assign(el.style, { width: L.size * 1.02 + 'px', height: L.size * 1.26 + 'px', background: Q.C.turq, borderRadius: L.size * 0.16 + 'px', overflow: 'hidden' });
        fig = Q.figure(el, { digits: '3', size: L.size, turns: [0], color: Q.C.chipInk });
        fig.el.style.fontWeight = 700;
        Q.st(fig.el, { x: L.size * 0.51, y: L.size * 0.63 });
      } else el.textContent = w;
      return { el, fig, w: el.getBoundingClientRect().width };
    });

    // ---- b) the bedroom
    const b = Q.div(layer, 'layer', { background: '#05090F' });
    const world = Q.div(b, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: `${Q.PHONE.x}px ${Q.PHONE.y - 160}px` });
    const room = Q.bedroom(world);
    const vign = Q.div(b, 'layer', { background: 'radial-gradient(115% 115% at 50% 52%, rgba(3,6,10,0) 42%, rgba(3,6,10,.72) 100%)' });
    const clock = Q.typed(b, [{ t: '2 h 14' }], { size: L.clockSize, weight: 560, caret: true });
    clock.el.style.letterSpacing = '-.045em';
    clock.el.style.textShadow = '0 0 70px rgba(63,211,198,.35), 0 0 22px rgba(63,211,198,.18)';
    const cards = L.cards.map((c) => Object.assign({ el: Q.card(b, c) }, c));
    R = { a, b, group, words, gap, world, room, vign, clock, cards };
  }

  function render(u) {
    const sentence = u < T.cut;
    R.a.style.display = sentence ? '' : 'none';
    R.b.style.display = sentence ? 'none' : '';

    if (sentence) {
      // layout progress of each word drives the centring; its own focus-in is a little longer
      const lay = R.words.map((w, i) => Q.k(u, T.black + i * T.wordGap, 0.36, Q.E.out));
      const total = R.words.reduce((s, w, i) => s + (w.w + R.gap) * lay[i], 0) - R.gap * lay[lay.length - 1];
      let x = -total / 2;
      R.words.forEach((w, i) => {
        const at = T.black + i * T.wordGap, first = i === 0;
        const k = Q.k(u, at, first ? T.firstDur : T.wordDur, Q.E.out);
        const cx = x + (w.w * lay[i]) / 2 + (w.w * (1 - lay[i])) / 2;
        Q.st(w.el, { x: cx, y: 0, s: Q.lerp(first ? 1.6 : 1.15, 1, k), o: Q.k(u, at, first ? 0.3 : 0.22, Q.E.sine), blur: Q.lerp(first ? 22 : 12, 0, k) });
        if (w.fig) w.fig.roll(u, T.digit, T.digitDur, 0);
        x += (w.w + R.gap) * lay[i];
      });
      // the whole line eases back a touch while it builds (camera settling)
      const z = Q.lerp(1.1, 1, Q.k(u, T.black, 1.9, Q.E.soft));
      R.group.style.transform = `translate(${Q.CX}px,${L.y}px) scale(${z.toFixed(4)})`;
      return;
    }

    // ---- bedroom
    const k = Q.k(u, T.cut, QR.DUR.s1 - T.cut + 0.6, Q.E.sine);
    const zoom = 1 + T.zoom * k;
    R.world.style.transform = `scale(${zoom.toFixed(5)})`;
    let buzz = 0, pulse = 0;
    T.cards.forEach((at) => { buzz += Q.buzz(u, at + 0.05, 0.32, 17); pulse += Q.env(u, at, 0.12, at + 0.14, 0.4); });
    const wake = Q.k(u, T.light, T.lightDur, Q.E.p3);
    R.room.set(Math.max(0.12, wake) * (1 + 0.1 * pulse), buzz * 2.6, buzz * 0.5);

    const n = Q.typeN(u, T.clock, T.clockCps, R.clock.N);
    R.clock.put(n, Q.CX, L.clockY, { caret: n >= 1 && u < T.clock + R.clock.N / T.clockCps + 0.16, o: n >= 1 ? 1 : 0 });

    R.cards.forEach((c, i) => {
      const at = T.cards[i], kin = Q.k(u, at, T.cardDur, Q.E.spring), fade = Q.k(u, at, 0.16, Q.E.sine), blurIn = 1 - Q.k(u, at, 0.3, Q.E.out);
      const drift = u - at;
      // slow float, and the push-in moves near cards more than far ones
      const px = (c.x - Q.PHONE.x) * (zoom - 1) * c.par * 2.2, py = (c.y - (Q.PHONE.y - 160)) * (zoom - 1) * c.par * 2.2;
      Q.st(c.el, {
        x: c.x + px + Math.sin(drift * 0.9 + i * 2.1) * 5 * c.par,
        y: c.y + py + (1 - kin) * 70 * c.s + Math.cos(drift * 0.75 + i * 1.3) * 4 * c.par,
        r: c.r + (1 - kin) * (i % 2 ? 7 : -7) + Math.sin(drift * 0.6 + i) * 0.5,
        s: c.s * Q.lerp(0.62, 1, kin), o: fade * (c.s < 1 ? 0.94 : 1), blur: c.blur + blurIn * 12,
      });
    });
  }

  QR.scene({ id: 's1', build, render });
})();
