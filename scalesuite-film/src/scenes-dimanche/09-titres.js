/* « Dimanche, 21 h 14 » · headlines (screen space, Instrument Sans) and the fiction notices (Inter).
   One idea per screen; masked word rise (V3). Every headline repeats the voiceover word for word, so
   the film reads without sound. Notices: « Exemple. Noms fictifs. », or « Exemple. Noms et numéros
   fictifs. » wherever a 555 number is on screen. */
(function () {
  const SS = window.SS, T = SS.DT, C = SS.DC;
  let R;
  function notice(layer, src, y, inAt, outAt) {
    const N = SS.text(layer, src, { size: 31, weight: 540, color: C.soft, tracking: -0.005 });
    SS.place(N.el, 540, y);
    if (inAt == null) gsap.set(N.words.map((w) => w.el), { yPercent: 0 });
    else { SS.hideWords(N); SS.wordsIn(N, inAt, { st: 0.03, dur: 0.5 }); }
    if (outAt != null) SS.wordsOut(N, outAt, { st: 0.01 });
    return N;
  }
  function build(stage) {
    const layer = SS.el('div', 'layer', stage);
    // 1 · hook (visible at frame 0)
    SS.D.title(layer, 'Jeudi, trois\nrencontres avec\ndes *vendeurs.*', 380, null, T.hookOut);
    notice(layer, 'Exemple. Noms fictifs.', 1482, null, T.barIn - 0.2); // gone before the bar's bubble rises through
    notice(layer, 'Exemple. Noms fictifs.', 1608, T.barIn + 0.28, 3.9); // below the play bar once it has passed
    // 2 · rewind
    SS.D.title(layer, 'Tout a commencé\n*dimanche* soir.', 365, T.s2Head, T.s2Out);
    // 3 · Sunday 21 h 14
    SS.D.title(layer, 'Sophie veut vendre\nson *condo.*', 365, T.s3Head, T.s3Out);
    notice(layer, 'Exemple. Noms et numéros fictifs.', 1500, T.form + 0.1, T.s4Out - 0.1);
    // 4 · within the minute
    SS.D.title(layer, 'Elle a sa réponse\navant de déposer\nson *cell.*', 380, T.s4Head, T.s4Out);
    // 5 · your Sunday, then Monday (the notice goes below the play bar)
    SS.D.title(layer, 'Vous, vous étiez\nau *souper.*', 365, T.s5Head, T.s5Out1);
    SS.D.title(layer, 'Lundi matin,\nJulie *l\'appelle.*', 365, T.s5bHead, T.s5Out);
    notice(layer, 'Exemple. Noms et numéros fictifs.', 1608, T.bar2In + 0.28, T.s5Out);
    // 6 · Marc
    SS.D.title(layer, 'Marc n\'était\npas *prêt.*', 365, T.s6Head, T.s6Out1);
    SS.D.title(layer, 'On est restés\nen *contact.*', 365, T.s6bHead, T.s6Out);
    notice(layer, 'Exemple. Noms fictifs.', 1608, T.marc, T.s7Out);
    // 7 · Thursday, then the team's week (labels drawn in screen space, under each agenda)
    SS.D.title(layer, 'Jeudi, ils sont\ntous à *l\'agenda.*', 365, T.s7Head, T.s7Out1);
    SS.D.title(layer, 'Vous savez d\'où\nviennent vos\nprochains *mandats.*', 380, T.s7bHead, T.s7Out);
    const rv = T.back + 0.55;
    const lab = (src, x, y, size, weight, color, at) => {
      const L = SS.text(layer, src, { size, weight, color, tracking: -0.015 });
      SS.place(L.el, x, y);
      SS.hideWords(L);
      SS.wordsIn(L, at, { st: 0.04, dur: 0.55 });
      SS.wordsOut(L, T.s7Out, { st: 0.01 });
    };
    lab('Équipe Exemple, semaine du 9 novembre', 540, 612, 34, 560, C.soft, rv - 0.1);
    lab('Julie', 300, 1206, 46, 720, C.ink, rv);
    lab('3 rencontres', 300, 1260, 36, 560, C.soft, rv + 0.06);
    lab('Kevin, nouveau', 780, 1206, 46, 720, C.ink, rv + 0.1);
    lab('2 rencontres', 780, 1260, 36, 560, C.soft, rv + 0.16);
    // 8 · the risk
    SS.D.title(layer, 'On livre, ou le mois\nest *gratuit.*', 330, T.s8Head, T.s8Out);
    SS.D.title(layer, 'Pas de contrat.', 512, T.nocontract, T.s8Out, { size: 60, weight: 600, color: C.ink2, tracking: -0.025 });
    SS.cue(T.s2Head, 'm-s2'); SS.cue(T.s3Head, 'm-s3'); SS.cue(T.s7bHead, 'm-mandats'); SS.cue(T.s8Head, 'm-garantie');
    R = { layer };
  }
  const scene = { name: 'titres', a: -1, b: -1, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, -1, 99]]; };
  SS.scenes.push(scene);
})();
