/* « Système Vendeurs 5 minutes » V2 · screen space: headlines, the name reveal, the shared pills.
   No eyebrow above any headline (impeccable craft floor). Headlines rise 24 px with a fade, words staggered,
   never cut by a visible mask. One lead per moment (choreograph): the headline, then the object below it.
   2 · (3.4–6.6) Tuesday's « Confirmée » chip flies up and becomes « Nouveau »; the whole logo (cover fade, never half
       swept); the product's name word by word (150 px); « Pour les équipes de courtiers du Québec. ». Held 5.1–6.6.
       Then « Nouveau » slides down and opens into the clock (01-fonds), which shows « mar. 18 h 30 » first. */
(function () {
  const SS = window.SS, S = SS.ST, M = SS.M;
  const CLOCKY = 640;

  let R;
  function build(stage) {
    const C = SS.CLK;
    // ================================================================ headlines (under the reveal, above the world)
    const layer = SS.el('div', 'layer', stage);
    const scrim = SS.scrimTo(layer, 590, '240,255,252');
    gsap.set(scrim, { x: 0, y: 0 });
    const h1 = SS.head(layer, 'Mardi, *18_h_30.*\nVotre courtier rencontre\nun vendeur.', { size: 92 });
    SS.place(h1.el, 540, 345);
    gsap.set(h1.words.map((x) => x.el), { yPercent: 0 });
    SS.tl.fromTo(h1.words.map((x) => x.m), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -14, duration: 0.22, stagger: 0.01, ease: SS.EZ.in }, S.s1Out - 0.02);
    const H = [
      ['Tout commence samedi,\nà *14_h_12.*', 96, S.h3, S.toPhone - 0.12],
      ['*14_h_13.*\nIl a déjà sa réponse.', 104, S.h4, S.toTeam - 0.12],
      ['Julie est en visite.\nElle est *alertée.*', 104, S.h5a, S.h5b - 0.28],
      ['*14_h_19.*\nRendez-vous pris.', 104, S.h5b, S.toWeek - 0.12],
      ['Vos courtiers rencontrent\n*des* *vendeurs.*', 96, S.h6, S.pile - 0.12],
      ['On s\'occupe\nde *tout.*', 112, S.h7, S.proof - 0.12],
    ];
    H.forEach(([src, size, a, b]) => {
      const h = SS.head(layer, src, { size });
      SS.place(h.el, 540, 330);
      SS.rise(h, a, b);
    });
    const rien = SS.text(layer, "Vous n'avez rien eu à faire.", { size: 52, weight: 680, color: M.soft, tracking: -0.02 });
    SS.place(rien.el, 540, 520);
    SS.rise(rien, S.rien, S.toWeek - 0.12, { st: 0.04 });
    const mention = SS.text(layer, 'Exemple. Noms et numéros fictifs.', { size: 32, weight: 560, color: M.soft, tracking: -0.01 });
    SS.place(mention.el, 540, 1610);
    SS.rise(mention, S.texto + 0.4, S.toTeam - 0.1, { st: 0.02 });
    const note = SS.text(layer, 'Exemple. Noms fictifs.', { size: 32, weight: 560, color: M.soft, tracking: -0.01 });
    SS.place(note.el, 540, 1530);
    SS.rise(note, S.note, S.pile - 0.1, { st: 0.02 });
    // frame 0: « Confirmée » is part of the agenda; the headline is already there

    // ================================================================ 2 · the name reveal
    const rv = SS.el('div', 'layer', stage);
    const logoBox = SS.el('div', 'layer', rv); // shown from the logo on only: its cover never hides the exiting headline
    const logo = SS.logo(logoBox, 130);
    logo.mark(1); logo.sheen(0);
    SS.place(logo.el, 540, 530);
    SS.logoCover(logoBox, 540, 530, (130 * SS.LOGO.w) / SS.LOGO.h, 130, S.logo, S.nameOut);
    const name = SS.head(rv, 'Système\nVendeurs\n5 *minutes.*', { size: 150, lh: 1.02 });
    SS.place(name.el, 540, 1015);
    gsap.set(name.words.map((x) => x.el), { yPercent: 0 });
    gsap.set(name.words.map((x) => x.m), { autoAlpha: 0, y: 30 });
    [S.w1, S.w2, S.w3, S.w4].forEach((t0, i) => { SS.riseOne(name, i, t0); SS.cue(t0, 'm-sig', { i }); });
    SS.tl.fromTo(name.words.map((x) => x.m), { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -16, duration: 0.22, stagger: 0.012, ease: SS.EZ.in }, S.nameOut);
    const pour = SS.text(rv, 'Pour les équipes de courtiers du Québec.', { size: 54, weight: 620, color: M.soft, tracking: -0.02, maxW: 960 });
    SS.place(pour.el, 540, 1370);
    SS.rise(pour, S.pour, S.nameOut, { st: 0.02 });
    SS.cue(S.nouveau, 'sfx-reveal');

    // the shared pill: Tuesday's « Confirmée » → « Nouveau » → the clock
    const ch = SS.W2.chip;
    const pill = SS.el('div', 'a3', rv);
    Object.assign(pill.style, { height: '76px', padding: '0 34px', borderRadius: '38px', background: M.band, color: M.teal, fontSize: '40px', fontWeight: 760, letterSpacing: '-.015em',
      display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden' });
    pill.innerHTML = '<span class="a" style="display:inline-block">Confirmée</span><span class="b" style="position:absolute;left:0;right:0;text-align:center">Nouveau</span>';
    const pa = pill.querySelector('.a'), pb = pill.querySelector('.b');
    const pw = pill.getBoundingClientRect().width;
    const k0 = ch.w / pw; // matches the chip's size in the agenda
    SS.place(pill, ch.x, ch.y, { scale: k0, autoAlpha: 0 });
    gsap.set(pb, { autoAlpha: 0 });
    SS.tl.fromTo(pill, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, ease: 'none' }, S.nouveau);
    SS.tl.fromTo(pill, { x: ch.x, y: ch.y, scale: k0 }, { x: 540, y: 660, scale: 1.1, duration: 0.45, ease: SS.EZ.inOut }, S.nouveau);
    SS.tl.fromTo(pa, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.14, ease: 'power1.out' }, S.nouveau + 0.12);
    SS.tl.fromTo(pb, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24, ease: SS.EZ.out }, S.nouveau + 0.24);
    const PB = { b: 0 };
    SS.tl.fromTo(PB, { b: 0 }, { b: 2, duration: 0.12, ease: 'power1.out' }, S.nouveau + 0.12);
    SS.tl.fromTo(PB, { b: 2 }, { b: 0, duration: 0.24, ease: SS.EZ.out }, S.nouveau + 0.24);
    // « Nouveau » → the clock (same pill, same place)
    SS.tl.fromTo(pill, { y: 660, scale: 1.1 }, { y: CLOCKY, scale: 1.2, duration: 0.3, ease: SS.EZ.inOut }, S.revealOut - 0.05);
    SS.tl.fromTo(pill, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15, ease: 'power1.out' }, S.revealOut + 0.12);
    SS.tl.fromTo(C.pill, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.32, ease: SS.EZ.out }, S.clock);
    // the clock leaves when the camera reaches the week
    SS.tl.fromTo(C.pill, { autoAlpha: 1, y: CLOCKY }, { autoAlpha: 0, y: CLOCKY - 14, duration: 0.2, ease: SS.EZ.in }, S.toWeek);

    R = { layer, rv, pill, PB, logoBox };
  }
  function render() { SS.blur(R.pill, R.PB.b); }

  const scene = { name: 'ecran', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, -1, S.proof + 0.05], [R.rv, S.nouveau - 0.01, S.revealOut + 0.35], [R.logoBox, S.logo - 0.01, S.revealOut + 0.35]]; };
  SS.scenes.push(scene);
})();
