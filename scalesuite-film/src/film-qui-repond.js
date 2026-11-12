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
    QR.scenes.forEach((s) => { s.layer = SS.el('div', 'layer', stage); s.layer.style.transformOrigin = '50% 50%'; s.build(s.layer); });
    await Promise.all([...document.images].map((im) => im.decode().catch(() => {}))); // photos are decoded before the first frame
    const grain = SS.el('div', 'layer', stage);
    Object.assign(grain.style, { backgroundImage: `url(${SS.grain(256, 256, 10)})`, pointerEvents: 'none', opacity: 0.5 });
    const last = QR.scenes[QR.scenes.length - 1];

    // Global virtual camera: every scene is always moving, holds included. A slow continuous push
    // (PUSH per second) with a slight drift; at each cut the push restarts and what it had gained
    // relaxes in 0,25 s (the impact on the beat). The base scale keeps the drift inside the frame.
    const CAM = { base: 1.012, push: 0.012, relax: 0.25, dx: 9 * (Q.W / 1920), dy: 6 * (Q.W / 1920) };
    const camera = (s, u, t) => {
      let i = 0;
      while (i + 1 < s.cuts.length && u >= s.cuts[i + 1]) i++;
      const d = u - s.cuts[i], carry = i > 0 ? CAM.push * (s.cuts[i] - s.cuts[i - 1]) : 0;
      const k = CAM.base + CAM.push * d + carry * (1 - Q.E.out(Q.clamp(d / CAM.relax)));
      const x = CAM.dx * Math.sin(t * 0.61), y = CAM.dy * Math.sin(t * 0.47 + 1); // same drift for every scene: seamless hand-offs
      s.layer.style.transform = `translate(${x.toFixed(3)}px,${y.toFixed(3)}px) scale(${k.toFixed(5)})`;
    };
    // EPS: scene boundaries are beats (irrational in seconds), never missed by a float rounding error
    const EPS = 1e-7;
    SS.renderFrame = (t) => {
      Q.ambient(t);
      for (const s of QR.scenes) {
        const on = t >= s.t0 - EPS && (t < s.t1 - EPS || (s === last && t <= s.t1 + 1e-6));
        s.layer.style.display = on ? '' : 'none';
        if (on) { const u = Math.max(0, t - s.t0); s.render(u, t); camera(s, u, t); }
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
