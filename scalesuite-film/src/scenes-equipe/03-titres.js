/* « Gardez vos courtiers » · headlines (screen space). One idea per screen, masked word rises (V3).
   A tinted scrim sits under the titles while the world moves below (cool for the problem, mint after
   the bascule). Only Google leads are concerned: "Tous les leads Google", "Ses leads Google.". */
(function () {
  const SS = window.SS, L = SS.ET, P = SS.P, C = SS.C;
  let R;
  function title(layer, src, at, out, y, opt) {
    const T = SS.text(layer, src, Object.assign({ size: 96, maxW: 940 }, opt || {}));
    SS.place(T.el, 540, y);
    if (at == null) gsap.set(T.words.map((w) => w.el), { yPercent: 0 });
    else { SS.hideWords(T); SS.wordsIn(T, at, { st: 0.06 }); }
    if (out != null) SS.wordsOut(T, out, { st: 0.02 });
    return T;
  }
  function build(stage) {
    const layer = SS.el('div', 'layer', stage);
    const sc1 = SS.scrimTo(layer, 600, '238,241,244');
    const sc2 = SS.scrimTo(layer, 600, '234,247,244');
    gsap.set(sc2, { autoAlpha: 0 });
    SS.tl.fromTo(sc2, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power1.inOut' }, L.bloom);
    SS.tl.fromTo(sc1, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4, ease: 'power1.inOut' }, L.bloom + 0.3);
    const prob = { accent: P.slate, color: P.ink };

    // 1 · hook (visible at frame 0)
    title(layer, 'Votre meilleur courtier\nvient de *partir.*', null, L.hookOut, 330, Object.assign({ size: 104 }, prob));
    const chip = SS.el('div', 'lp-chip', layer);
    Object.assign(chip.style, { position: 'absolute', background: '#DFE5EB', color: P.ink, gap: '12px', height: '56px', fontSize: '32px' });
    chip.innerHTML = `<svg viewBox="0 0 24 24" style="width:30px;height:30px" fill="none" stroke="${P.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/><path d="M12 8v4.2l2.8 1.8"/></svg>Quelques mois plus tôt`;
    SS.place(chip, 540, 586, { autoAlpha: 0, y: 598 });
    SS.tl.fromTo(chip, { autoAlpha: 0, y: 598 }, { autoAlpha: 1, y: 586, duration: 0.4, ease: SS.EZ.out }, L.chip);
    SS.tl.fromTo(chip, { autoAlpha: 1, y: 586 }, { autoAlpha: 0, y: 570, duration: 0.25, ease: SS.EZ.in }, L.chipOut);
    SS.cue(L.chip, 'm-chip');
    // 2 · pool
    title(layer, 'Tous les leads *Google*\ndans un bassin commun.', L.s2Head, L.s2Out, 330, prob);
    // 3 · Courtier 04's perception (a quote, not a fact about the team)
    title(layer, '« Les bons leads allaient\ntoujours aux autres. »', L.quote, L.quoteOut, 318, prob);
    const who = SS.text(layer, '— Courtier 04', { size: 40, weight: 650, color: P.soft, tracking: -0.015 });
    SS.place(who.el, 540, 458);
    SS.hideWords(who);
    SS.wordsIn(who, L.quote + 0.25, { dur: 0.55 });
    SS.wordsOut(who, L.quoteOut + 0.02, {});
    SS.cue(L.quote, 'm-quote');
    // 4 · the structural cause (nobody's fault)
    title(layer, "Avec un bassin commun,\nquelqu'un doit *décider.*", L.s4Head, L.s4Out, 330, prob);
    // 5 – 8 · ScaleSuite world
    title(layer, 'Avec ScaleSuite, chaque\ncourtier a sa *campagne.*', L.s5Head, L.s5Out, 330);
    title(layer, 'Ses leads *Google.*\nSa campagne.', L.s6Head, L.s6Out, 330, { size: 116 });
    title(layer, 'Quand vous recrutez,\nvous offrez du *concret.*', L.s7Head, L.s7Out, 330);
    title(layer, 'Gardez vos courtiers.\nAttirez les *prochains.*', L.s8Head, L.s8Out, 330, { size: 104 });
    SS.cue(L.s5Head, 'm-avec'); SS.cue(L.s7Head, 'm-recrute'); SS.cue(L.s8Head, 'm-gardez');
    R = { layer };
  }
  const scene = { name: 'titres', a: -1, b: 99, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, -1, L.s8Out + 0.5]]; };
  SS.scenes.push(scene);
})();
