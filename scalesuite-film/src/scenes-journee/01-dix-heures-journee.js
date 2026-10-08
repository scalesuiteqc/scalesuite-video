/* 10 h (0–5.4 s).
   Scene 1 · Moment card (0–2.0): « Une journée de courtier » and « 10 h » from frame 0, the house is
   drawn, « Vous êtes en visite. » rises. Holds, then leaves upward in one block.
   Scene 2 · Proof (2.0–5.4): « Pendant ce temps… / Votre annonce s'affiche. » The search bar types
   « acheter maison Longueuil », the « Commandité » ad docks as the first result, organic skeletons
   under it, a turquoise halo. One camera move: a slow push to the ad (finished at 3.9 s), then hold.
   Exit: a green node on the ad blooms into the 13 h card (scene 3). */
(function () {
  const SS = window.SS;
  const C = SS.C;
  const T = { icon: 0.0, line: 0.14, exit: 2.0, kick: 2.04, head: 2.12, type: 2.45, ad: 3.2, org: 3.32, halo: 3.58, cam: 2.3, camEnd: 3.9, end: 5.6 };
  SS.T10 = T;
  const BAR = { y: 740 }, AD = { y: 1030 };
  let card, R;

  function build(stage) {
    card = SS.momentCard(stage, { k: 0, icon: 'house', hour: '10 h', line: 'Vous êtes\nen visite.', kicker: 'Une journée de courtier',
      T: { icon: T.icon, line: T.line, exit: T.exit } });

    // ---------------------------------------------------------------- the proof, already in place under the card
    const layer = SS.proofLayer(stage);
    const sw = SS.subWorld(layer, { y: 990, s: 1 });
    const w = sw.w;
    const bar = SS.el('div', 'a3', w);
    Object.assign(bar.style, { width: '900px', height: '112px', borderRadius: '56px', background: '#fff', display: 'flex', alignItems: 'center', gap: '22px', padding: '0 40px', boxSizing: 'border-box', boxShadow: SS.SH.card });
    bar.innerHTML = `<span style="width:44px;height:44px;display:block;flex:none">${SS.icon.search(C.soft)}</span><span class="q" style="font-size:42px;font-weight:560;letter-spacing:-.015em;color:${C.ink};white-space:pre"></span><span class="c" style="width:4px;height:46px;background:${C.turq};margin-left:-18px"></span>`;
    SS.place(bar, 540, BAR.y);
    SS.typer(bar.querySelector('.q'), [{ at: T.type, dur: 0.66, to: 'acheter maison Longueuil' }], bar.querySelector('.c'));
    const ad = SS.sponsored(w);
    SS.place(ad.el, 540, AD.y, { autoAlpha: 0, y: AD.y + 90 });
    SS.tl.fromTo(ad.el, { autoAlpha: 0, y: AD.y + 90 }, { autoAlpha: 1, y: AD.y, duration: 0.5, ease: SS.EZ.dock }, T.ad);
    SS.cue(T.ad, 'dock', { i: 0 });
    [1350, 1565].forEach((y, k) => {
      const el = SS.el('div', 'a3', w);
      Object.assign(el.style, { width: '900px', height: '190px', borderRadius: '30px', background: '#fff', padding: '34px 40px', boxSizing: 'border-box', boxShadow: SS.SH.card });
      el.innerHTML = `<div class="skel" style="width:${36 + k * 8}%;height:16px;background:#DCE8EF"></div><div class="skel" style="margin-top:22px;width:${72 - k * 12}%;height:24px;background:#D2DEEA"></div><div class="skel" style="margin-top:18px;width:60%;height:15px"></div>`;
      SS.place(el, 540, y, { autoAlpha: 0, y: y + 80 });
      SS.tl.fromTo(el, { autoAlpha: 0, y: y + 80 }, { autoAlpha: 1, y, duration: 0.5, ease: SS.EZ.out }, T.org + k * 0.07);
    });
    const halo = SS.el('div', 'a3', w);
    Object.assign(halo.style, { width: '916px', height: SS.AD_H + 16 + 'px', borderRadius: '36px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 44px 6px rgba(43,191,179,.35)` });
    SS.place(halo, 540, AD.y, { autoAlpha: 0, scale: 1.05 });
    SS.tl.fromTo(halo, { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: SS.EZ.pop }, T.halo);
    SS.cue(T.halo, 'halo');
    sw.cam.to(T.cam, T.camEnd - T.cam, SS.EZ.inOut, { y: 1010, s: 1.04 });
    SS.FOCUS10 = SS.toScreen({ x: 540, y: 1010, s: 1.04, r: 0 }, 540, AD.y); // where the 13 h card blooms from

    // headline (screen space, over a tinted scrim)
    const top = SS.el('div', 'layer', layer);
    SS.tintScrim(top, 640);
    const H = SS.proofHead(top, 'Votre annonce\n*s’affiche.*', 'Pendant ce temps…');
    SS.wordsIn(H.k, T.kick, { st: 0.05, dur: 0.5 });
    SS.wordsIn(H.h, T.head, { st: 0.07, dur: 0.6 });
    SS.cue(T.head, 'line');
    R = { layer, sw };
  }

  function render() { card.render(); R.sw.apply(); }
  const scene = { name: 'dix-heures', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[card.layer, card.range[0], card.range[1]], [R.layer, 1.9, T.end]]; };
  SS.scenes.push(scene);
})();
