/* « Une journée de courtier » runner: builds every scene once fonts are ready, then exposes
   SS.renderFrame(t) (same contract as film-v3.js). index-journee.html?t=12.3 (static frame) ·
   ?play&t=0&end=25 (real-time preview in a browser). Layers stack by z-index: background, proofs
   (1–2), moment cards (5), card nodes (6), grain (10). */
(function () {
  const SS = window.SS;
  SS.DURATION = 25.0;
  SS.POSTER_T = 1.2; // the settled 10 h card (« Une journée de courtier · 10 h · Vous êtes en visite. »): master frame 0

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
    grain.style.zIndex = 10;
    Object.assign(grain.style, { backgroundImage: `url(${SS.grain(256, 256, 9)})`, pointerEvents: 'none', opacity: 0.5 });
    SS.cues.sort((a, b) => a.t - b.t);

    SS.renderFrame = (t) => {
      SS.tl.seek(t, true);
      const vis = new Map();
      for (const s of SS.scenes) (s.ranges || []).forEach(([el, a, b]) => vis.set(el, vis.get(el) || (t >= a && t <= b)));
      vis.forEach((on, el) => { el.style.display = on ? '' : 'none'; });
      for (const s of SS.scenes) if (s.render && t >= s.a && t <= s.b) s.render(t);
      SS.procs.forEach((fn) => fn(t));
      SS.applyCam(t);
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
