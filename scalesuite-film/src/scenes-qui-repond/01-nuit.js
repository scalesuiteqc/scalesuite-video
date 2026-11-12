/* Scene 1 · La nuit (7 beats, 0 – 3,89 s).
   a) Black, then « Tu viens de recevoir [3] demandes de vendeurs. »: the words come into focus one by
      one (blur 12 px → sharp, scale 1,15 → 1; the first word is bigger and blurrier, like a camera
      pulling focus). The line stays centred while it grows. The digit rolls 0 → 3 inside its chip.
   b) Hard cut to a generated bedroom at 2 h 14: a phone lying flat on the nightstand lights up and
      throws a turquoise and blue halo on the surfaces around it. Giant clock typed at the top, three
      « Nouvelle demande » cards cascade around the phone on three depths; the phone buzzes at each. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;

  // every cue comes from the voice (vo-timing.js); QR.sync also feeds the sync control
  const cue = (w) => QR.sync('s1', w, QR.cue('s1', w));
  const tu = cue('tuViens'), trois = cue('trois');
  const T = {
    night: cue('deuxHeures'),   // « 2 h du matin. » centred, on those words
    nightOut: tu - 0.2,
    // « Tu viens de recevoir [3] demandes de vendeurs. »: one word after the other, the chip ON « trois »
    words: [tu, tu + 0.16, tu + 0.3, tu + 0.42, trois, trois + 0.28, trois + 0.55, trois + 0.66],
    wordDur: 0.34,
    digitDur: 0.36,
    cut: trois + 0.95,          // hard cut to the bedroom as the sentence ends
    lightDur: 0.35,
    clockCps: 30,
    cardGaps: [0.12, 0.36, 0.6], // cascade after the cut
    cardDur: 0.46,
    zoom: 0.03,
  };
  T.light = T.cut; T.clock = T.cut + 0.03; T.cards = T.cardGaps.map((g) => T.cut + g); T.digit = trois;

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
    const night = Q.phrase(a, [[{ t: '2 h du matin.' }]], { size: L.size, weight: 700 });
    const group = Q.div(a, 'qr-abs', { width: '0', height: '0' });
    const gap = L.size * 0.25;
    const words = WORDS.map((w) => {
      const el = Q.div(group, 'qr-abs', { fontSize: L.size + 'px', fontWeight: 700, letterSpacing: '-.025em', lineHeight: 1.16, whiteSpace: 'nowrap', color: Q.C.white });
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
    R = { a, b, night, group, words, gap, world, room, vign, clock, cards };
  }

  function render(u) {
    const sentence = u < T.cut;
    R.a.style.display = sentence ? '' : 'none';
    R.b.style.display = sentence ? 'none' : '';

    if (sentence) {
      R.night.put(Q.CX, L.y, u, { at: [T.night], out: T.nightOut, outDur: 0.18 });
      // layout progress of each word drives the centring
      const lay = R.words.map((w, i) => Q.k(u, T.words[i], 0.26, Q.E.out));
      const total = R.words.reduce((s, w, i) => s + (w.w + R.gap) * lay[i], 0) - R.gap * lay[lay.length - 1];
      let x = -total / 2;
      R.words.forEach((w, i) => {
        const at = T.words[i], k = Q.k(u, at, T.wordDur, Q.E.out);
        Q.st(w.el, { x: x + w.w / 2, y: 0, s: Q.lerp(1.15, 1, k), o: Q.k(u, at, 0.16, Q.E.sine), blur: Q.lerp(12, 0, k) });
        if (w.fig) w.fig.roll(u, T.digit, T.digitDur, 0);
        x += (w.w + R.gap) * lay[i];
      });
      R.group.style.transform = `translate(${Q.CX}px,${L.y}px)`;
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

  QR.scene({ id: 's1', build, render, cuts: [0, T.words[0], T.cut] });
})();
