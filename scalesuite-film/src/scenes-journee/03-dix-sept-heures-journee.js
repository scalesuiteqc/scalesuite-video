/* 17 h (13.6–18.1 s).
   Scene 7 · Moment card: a node on « Nouveau » blooms into the card (warmed with sand at the
   bottom); sunset, « 17 h », « Vous fermez la journée. ». Leaves upward.
   Scene 8 · Proof: « Pendant ce temps… / Votre semaine, en clair. » The weekly report (12–16 Oct.,
   Campagne acheteur · Rive-Sud): counters roll, the five bars rise, « ✓ 3 optimisations appliquées ·
   Par notre IA et notre équipe ». Fixed camera. Holds.
   Exit: the report goes down while the day's summary docks in (scene 9). */
(function () {
  const SS = window.SS;
  const C = SS.C;
  const T = { bloom: 13.88, icon: 14.03, hour: 14.05, line: 14.08, exit: 15.9, kick: 15.94, head: 16.0, count: 16.1, bars: 16.15, chk: 16.75, out: 18.15, end: 18.65 };
  SS.T17 = T;
  let card, R;

  function build(stage) {
    card = SS.momentCard(stage, { k: 2, icon: 'sunset', hour: '17 h', line: 'Vous fermez\nla journée.', warm: true, from: SS.FOCUS13,
      T: { bloom: T.bloom, icon: T.icon, hour: T.hour, line: T.line, exit: T.exit } });

    const layer = SS.proofLayer(stage);
    const sw = SS.subWorld(layer, { y: 960, s: 1 });
    const rep = SS.el('div', 'a3', sw.w);
    Object.assign(rep.style, { width: '900px', height: '860px', borderRadius: '34px', background: '#fff', boxShadow: SS.SH.lift });
    SS.place(rep, 540, 650 + 430);
    const tile = (x, lab, hot) => `<div style="position:absolute;left:${x}px;top:196px;width:264px;height:200px;border-radius:24px;background:${hot ? C.mint : '#F5F9F8'};box-shadow:${hot ? 'inset 0 0 0 3px rgba(43,191,179,.55)' : 'inset 0 0 0 2px #E6EEEC'}">
        <div style="position:absolute;left:26px;top:22px;font-size:30px;font-weight:650;color:${C.soft}">${lab}</div>
        <div class="v" style="position:absolute;left:26px;top:72px;font-size:72px;font-weight:800;letter-spacing:-.03em;color:${hot ? '#0F6F66' : C.ink};font-feature-settings:'tnum' 1">0</div></div>`;
    const bars = [0.42, 0.55, 0.48, 0.7, 0.86].map((k, i) => `<div class="bar" style="position:absolute;left:${78 + i * 160}px;bottom:70px;width:84px;height:${Math.round(150 * k)}px;border-radius:14px 14px 6px 6px;background:${i === 4 ? C.turq : '#CDEDE9'};transform-origin:50% 100%"></div>
        <div style="position:absolute;left:${78 + i * 160}px;bottom:22px;width:84px;text-align:center;font-size:30px;font-weight:650;color:${C.soft}">${'LMMJV'[i]}</div>`).join('');
    rep.innerHTML = `<div style="position:absolute;left:36px;top:36px;font-size:46px;font-weight:800;letter-spacing:-.025em;color:${C.ink}">Rapport hebdomadaire</div>
      <div style="position:absolute;left:36px;top:104px;font-size:32px;font-weight:600;color:${C.soft}">Du 12 au 16 octobre · Campagne acheteur · Rive-Sud</div>
      ${tile(30, 'Impressions')}${tile(318, 'Clics')}${tile(606, 'Leads', true)}
      <div style="position:absolute;left:30px;top:420px;width:840px;height:250px;border-radius:24px;background:#F5F9F8">${bars}</div>
      <div style="position:absolute;left:36px;top:706px;display:flex;align-items:center;gap:14px;font-size:34px;font-weight:720;color:${C.green}"><span class="ck" style="width:38px;height:38px;display:block"></span>3 optimisations appliquées</div>
      <div style="position:absolute;left:88px;top:760px;font-size:30px;font-weight:600;color:${C.soft}">Par notre IA et notre équipe</div>`;
    const vals = rep.querySelectorAll('.v');
    [1284, 96, 4].forEach((to, i) => SS.counter(vals[i], [{ at: T.count + i * 0.06, dur: 0.8, from: 0, to }]));
    SS.cue(T.count, 'count');
    const barEls = [...rep.querySelectorAll('.bar')];
    gsap.set(barEls, { scaleY: 0 });
    barEls.forEach((b, i) => {
      SS.tl.fromTo(b, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: i === 4 ? SS.EZ.pop : SS.EZ.out }, T.bars + i * 0.06);
      SS.cue(T.bars + i * 0.06, 'bar5', { i });
    });
    const chk = SS.check(rep.querySelector('.ck'), 38, C.green);
    const P = { chk: 0 };
    SS.tl.fromTo(P, { chk: 0 }, { chk: 1, duration: 0.5, ease: 'none' }, T.chk);
    SS.cue(T.chk, 'check');
    // exit: the report goes down (scene 9 docks in from below at the same time)
    SS.tl.fromTo(rep, { y: 1080 }, { y: 1080 + 1300, duration: 0.4, ease: SS.EZ.inOut }, T.out);

    const top = SS.el('div', 'layer', layer);
    SS.tintScrim(top, 640);
    const H = SS.proofHead(top, 'Votre semaine,\n*en* *clair.*', 'Pendant ce temps…');
    SS.wordsIn(H.k, T.kick, { st: 0.05, dur: 0.5 });
    SS.wordsIn(H.h, T.head, { st: 0.07, dur: 0.6 });
    SS.wordsOut(H.k, T.out - 0.05, { st: 0.02 });
    SS.wordsOut(H.h, T.out - 0.05, { st: 0.02 });
    SS.cue(T.head, 'line');
    R = { layer, sw, chk, P };
  }

  function render() { card.render(); R.sw.apply(); R.chk.set(R.P.chk); }
  const scene = { name: 'dix-sept-heures', a: -1, b: 99, render, ranges: [] };
  scene.build = (stage) => {
    build(stage);
    scene.ranges = [[card.layer, card.range[0], card.range[1]], [card.node, T.bloom - 0.25, T.bloom + 0.5], [R.layer, T.exit - 0.1, T.end]];
  };
  SS.scenes.push(scene);
})();
