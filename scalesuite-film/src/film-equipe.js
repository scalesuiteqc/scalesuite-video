/* « Gardez vos courtiers » runner (same contract as film-v3.js): builds every scene once fonts are ready,
   then exposes SS.renderFrame(t). index-equipe.html?t=12.3 (static frame) · ?play (real time). */
(function () {
  const SS = window.SS;
  SS.DURATION = 28.2;
  SS.POSTER_T = 0.8; // settled hook (title + team grid with the empty seat), frame 0 of the master

  async function boot() {
    const stage = document.getElementById('stage');
    stage.classList.add('v3');
    stage.style.height = SS.H + 'px';
    document.body.style.width = SS.W + 'px';
    document.body.style.height = SS.H + 'px';
    await document.fonts.load('800 100px Inter');
    await document.fonts.load('600 40px Inter');
    await document.fonts.ready;
    SS.scenes.forEach((s) => s.build(stage));
    const grain = SS.el('div', 'layer', stage);
    Object.assign(grain.style, { backgroundImage: `url(${SS.grain(256, 256, 9)})`, pointerEvents: 'none', opacity: 0.5 });
    SS.cues.sort((a, b) => a.t - b.t);

    SS.renderFrame = (t) => {
      SS.tl.seek(t, true);
      const vis = new Map();
      for (const s of SS.scenes) (s.ranges || []).forEach(([el, a, b]) => vis.set(el, vis.get(el) || (t >= a && t <= b)));
      vis.forEach((on, el) => { el.style.display = on ? '' : 'none'; });
      for (const s of SS.scenes) if (s.render && t >= s.a && t <= s.b) s.render(t);
      SS.procs.forEach((fn) => fn(t));
    };
    const q = new URLSearchParams(location.search);
    if (q.has('play')) {
      const t0 = performance.now() - (parseFloat(q.get('t')) || 0) * 1000;
      const end = parseFloat(q.get('end')) || SS.DURATION;
      const tick = () => { SS.renderFrame(((performance.now() - t0) / 1000) % end); requestAnimationFrame(tick); };
      tick();
    } else {
      SS.renderFrame(parseFloat(q.get('t')) || 0);
    }
    SS.ready = true;
  }
  window.addEventListener('load', () => boot().catch((e) => { SS.error = String((e && e.stack) || e); console.error(e); }));
})();
