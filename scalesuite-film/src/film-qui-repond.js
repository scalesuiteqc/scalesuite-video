/* « Qui répond à 2 h du matin? » runner: builds every scene once the fonts are ready, then exposes
   SS.renderFrame(t). index-qui-repond.html?format=16x9&t=3.0 (static frame) · ?play (real time). */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  SS.DURATION = QR.TOTAL;
  SS.POSTER_T = 3.0;

  async function boot() {
    const stage = document.getElementById('stage');
    stage.classList.add('v3');
    for (const e of [stage, document.body]) { e.style.width = Q.W + 'px'; e.style.height = Q.H + 'px'; }
    for (const w of [500, 540, 600, 650, 700, 720, 800]) await document.fonts.load(`${w} 64px Inter`);
    await document.fonts.ready;
    QR.scenes.forEach((s) => { s.layer = SS.el('div', 'layer', stage); s.build(s.layer); });
    const grain = SS.el('div', 'layer', stage);
    Object.assign(grain.style, { backgroundImage: `url(${SS.grain(256, 256, 10)})`, pointerEvents: 'none', opacity: 0.5 });
    const last = QR.scenes[QR.scenes.length - 1];

    SS.renderFrame = (t) => {
      Q.ambient(t);
      for (const s of QR.scenes) {
        const on = t >= s.t0 && (t < s.t1 || (s === last && t <= s.t1 + 1e-6));
        s.layer.style.display = on ? '' : 'none';
        if (on) s.render(t - s.t0, t);
      }
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
