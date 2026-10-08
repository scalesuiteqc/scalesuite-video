/* Scene 2 · 10 h, Visite (2.8–6.4 s).
   The ad card the notification unfolded into becomes the first result of a Google search (shared
   element): the camera pulls back while the card settles under a search bar that types
   « acheter maison Longueuil »; organic results dock under it as skeletons; a turquoise halo marks the
   ad. Push in on the ad. Exit: a tap on the ad, the landing page opens out of it (scene 3) while
   the marker rolls to 13 h. */
(function () {
  const SS = window.SS;
  const C = SS.C;
  const T = { settle: 2.84, bar: 2.98, type: 3.18, head: 3.3, org: 3.5, halo: 3.98, push: 4.55, tap: 5.5, headOut: 5.52, open: 5.68 };
  const AD = { y: 1010 };
  SS.AD_B = AD;
  const BAR = { y: 720, h: 112 };

  let R;
  function build(stage) {
    const world = SS.world;
    const ad = SS.adA;
    // the card settles into the results while the camera pulls back from the notification
    SS.tl.fromTo(ad.el, { y: SS.NOTE_A.y }, { y: AD.y, duration: 0.7, ease: SS.EZ.inOut }, T.settle);
    SS.camTo(T.settle, 0.72, SS.EZ.inOut, { y: 960, s: 1 });

    // search bar (drops in, then types)
    const bar = SS.el('div', 'a3', world);
    Object.assign(bar.style, { width: '900px', height: BAR.h + 'px', borderRadius: BAR.h / 2 + 'px', background: '#fff', display: 'flex', alignItems: 'center', gap: '22px', padding: '0 40px', boxSizing: 'border-box', boxShadow: SS.SH.card });
    bar.innerHTML = `<span style="width:44px;height:44px;display:block;flex:none">${SS.icon.search(C.soft)}</span><span class="q" style="font-size:42px;font-weight:560;letter-spacing:-.015em;color:${C.ink};white-space:pre"></span><span class="c" style="width:4px;height:46px;background:${C.turq};margin-left:-18px"></span>`;
    SS.place(bar, 540, BAR.y, { autoAlpha: 0, y: BAR.y - 110 });
    SS.tl.fromTo(bar, { autoAlpha: 0, y: BAR.y - 110 }, { autoAlpha: 1, y: BAR.y, duration: 0.45, ease: SS.EZ.out }, T.bar);
    SS.tl.fromTo(bar, { autoAlpha: 1, y: BAR.y }, { autoAlpha: 0, y: BAR.y - 260, duration: 0.32, ease: SS.EZ.in }, T.open);
    SS.typer(bar.querySelector('.q'), [{ at: T.type, dur: 0.72, to: 'acheter maison Longueuil' }], bar.querySelector('.c'));
    SS.cue(T.bar, 'bar');

    // organic results (skeletons) dock under the ad
    const org = [1330, 1545].map((y, k) => {
      const el = SS.el('div', 'a3', world);
      Object.assign(el.style, { width: '900px', height: '190px', borderRadius: '30px', background: '#fff', padding: '34px 40px', boxSizing: 'border-box', boxShadow: SS.SH.card });
      el.innerHTML = `<div class="skel" style="width:${36 + k * 8}%;height:16px;background:#DCE8EF"></div><div class="skel" style="margin-top:22px;width:${72 - k * 12}%;height:24px;background:#D2DEEA"></div><div class="skel" style="margin-top:18px;width:60%;height:15px"></div>`;
      SS.place(el, 540, y, { autoAlpha: 0, y: y + 80 });
      SS.tl.fromTo(el, { autoAlpha: 0, y: y + 80 }, { autoAlpha: 1, y, duration: 0.5, ease: SS.EZ.dock }, T.org + k * 0.07);
      SS.tl.fromTo(el, { autoAlpha: 1, y }, { autoAlpha: 0, y: y + 420, duration: 0.34, ease: SS.EZ.in }, T.open + 0.02 + k * 0.03);
      SS.cue(T.org + k * 0.07, 'dock', { i: k });
      return el;
    });

    // halo on the ad (the hero of the scene)
    const halo = SS.el('div', 'a3', world);
    Object.assign(halo.style, { width: '916px', height: SS.AD_H + 16 + 'px', borderRadius: '36px', boxShadow: `0 0 0 4px ${C.turq}, 0 0 44px 6px rgba(43,191,179,.35)` });
    SS.place(halo, 540, AD.y, { autoAlpha: 0, scale: 1.05 });
    SS.tl.fromTo(halo, { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: SS.EZ.pop }, T.halo);
    SS.tl.fromTo(halo, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, ease: 'power1.in' }, T.tap - 0.05);
    SS.cue(T.halo, 'halo');

    SS.camTo(T.push, 0.9, SS.EZ.cam, { y: AD.y, s: 1.1 });
    SS.tapAt(world, ad.el, 380, AD.y + 40, T.tap);

    // headline
    const layer = SS.el('div', 'layer', stage);
    const h = SS.head(layer, 'Votre annonce\n*s’affiche.*', 452);
    SS.wordsIn(h, T.head, { st: 0.07 });
    SS.wordsOut(h, T.headOut, { st: 0.02 });
    SS.cue(T.head, 'line');

    SS.hourTo(2, SS.DAY[2].at);
    R = { layer, bar, org, halo };
  }

  const scene = { name: 'visite', a: -1, b: -1, ranges: [] };
  scene.build = (stage) => { build(stage); scene.ranges = [[R.layer, 2.7, 6.4]]; };
  SS.scenes.push(scene);
})();
