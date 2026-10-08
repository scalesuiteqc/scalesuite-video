/* « Une journée de courtier » runner: builds every scene once fonts are ready, then exposes
   SS.renderFrame(t) (same contract as film-v3.js). index-journee.html?t=12.3 (static frame) ·
   ?play&t=0&end=13.6 (real-time preview in a browser). The hour marker is built by scene 1 and
   moved on top of every layer here, under the grain. */
(function () {
  const SS = window.SS;
  SS.DURATION = 25.0;
  SS.POSTER_T = 2.1; // the 7 h notification and its headline: frame 0 of the master (thumbnail)

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
    stage.appendChild(SS.marker.layer);
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
