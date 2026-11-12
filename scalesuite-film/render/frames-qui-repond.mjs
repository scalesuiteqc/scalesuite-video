// « Qui répond à 2 h du matin? » frame sequence in parallel pages:
// node render/frames-qui-repond.mjs --fps=30 --workers=4 --out=dir [--format=16x9] [--start=0] [--end=48.6]
import fs from 'node:fs';
import path from 'node:path';
import { chromium, serve, args, openFilmQR } from './lib-qui-repond.mjs';

const o = args({ fps: '30', scale: '1', workers: '4', out: 'frames', start: '0', end: '', format: '16x9', shot: '1' });
fs.mkdirSync(o.out, { recursive: true });
const { srv, base } = await serve();
const browser = await chromium.launch();
const t0 = Date.now();
try {
  const films = await Promise.all(Array.from({ length: +o.workers }, () => openFilmQR(browser, base, o.format, parseFloat(o.scale), parseFloat(o.shot))));
  const dur = o.end ? parseFloat(o.end) : await films[0].page.evaluate(() => window.SS.DURATION);
  const fps = +o.fps, start = parseFloat(o.start);
  const n = Math.round((dur - start) * fps);
  let next = 0, done = 0;
  await Promise.all(films.map(async (f) => {
    for (;;) {
      const i = next++;
      if (i >= n) return;
      fs.writeFileSync(path.join(o.out, String(i).padStart(5, '0') + '.png'), await f.shot(start + i / fps));
      if (++done % 120 === 0) console.log(`${done}/${n} frames (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
    }
  }));
  console.log(`rendered ${n} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s → ${o.out}`);
} finally { await browser.close(); srv.close(); }
