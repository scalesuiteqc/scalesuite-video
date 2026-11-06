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
    notice(layer, 'Exemple. Noms et numéros fictifs.', 1500, T.form + 0.1, null);
    SS.cue(T.s2Head, 'm-s2'); SS.cue(T.s3Head, 'm-s3');
    R = { layer };
  }
  const scene = { name: 'titres', a: -1, b: -1, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, -1, 99]]; };
  SS.scenes.push(scene);
})();
