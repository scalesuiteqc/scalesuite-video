// « Qui répond à 2 h du matin? » frame sequence, with real motion blur (180° shutter):
//   node render/frames-qui-repond.mjs --out=dir [--fps=60] [--format=16x9] [--shot=0.5] [--mb=8] [--workers=4]
//                                     [--start=0] [--end=45] [--stage=all|1|2]
// Stage 1 renders one sample per frame (PNG). Then render/mb-qui-repond.py measures the motion and lists
// the frames where something moves fast. Stage 2 renders, for those frames only, the other mb − 1
// samples spread over the first half of the frame interval (shutter open half the time), and the
// script averages them in linear light. Slow frames keep their single sharp sample. Every sample is a
// pure function of its time, so the result is the same on every run.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium, serve, args, openFilmQR } from './lib-qui-repond.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const o = args({ fps: '60', scale: '1', workers: '4', out: 'frames', start: '0', end: '', format: '16x9', shot: '1', mb: '8', stage: 'all', thr: '' });
fs.mkdirSync(o.out, { recursive: true });
const fps = +o.fps, mb = +o.mb, start = parseFloat(o.start);
const { srv, base } = await serve();
const browser = await chromium.launch();
const t0 = Date.now();
const run = async (jobs, label) => {
  const films = await Promise.all(Array.from({ length: +o.workers }, () => openFilmQR(browser, base, o.format, parseFloat(o.scale), parseFloat(o.shot))));
  let next = 0, done = 0;
  await Promise.all(films.map(async (f) => {
    for (;;) {
      const j = jobs[next++];
      if (!j) return;
      fs.writeFileSync(j.file, await f.shot(j.t, j.jpeg));
      if (++done % 600 === 0) console.log(`${label}: ${done}/${jobs.length} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
    }
  }));
  await Promise.all(films.map((f) => f.ctx.close()));
  console.log(`${label}: ${jobs.length} images in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
};
try {
  const probe = await openFilmQR(browser, base, o.format, 1, 0.1);
  const dur = o.end ? parseFloat(o.end) : await probe.page.evaluate(() => window.SS.DURATION);
  await probe.ctx.close();
  const n = Math.round((dur - start) * fps);
  const name = (i) => path.join(o.out, String(i).padStart(5, '0') + '.png');
  if (o.stage !== '2') await run(Array.from({ length: n }, (_, i) => ({ t: start + i / fps, file: name(i) })), 'stage 1');
  if (mb > 1 && o.stage !== '1') {
    const planArgs = [path.join(HERE, 'mb-qui-repond.py'), 'plan', o.out, String(n)];
    if (o.thr) planArgs.push(o.thr);
    const fast = JSON.parse(execFileSync('python3', planArgs, { encoding: 'utf8', maxBuffer: 1 << 26 }).trim().split('\n').pop());
    console.log(`motion: ${fast.length}/${n} frames need the full shutter (${(100 * fast.length / n).toFixed(0)} %), ${fast.filter((f) => f[1] > mb).length} of them on a whip pan`);
    const sub = path.join(o.out, 'sub');
    fs.mkdirSync(sub, { recursive: true });
    const jobs = [];
    for (const [i, k0] of fast) for (let k = Math.max(mb, k0 > mb ? k0 : mb), j = 1; j < k; j++) jobs.push({ t: start + i / fps + (j / k) * (0.5 / fps), file: path.join(sub, `${String(i).padStart(5, '0')}-${j}.jpg`), jpeg: true });
    await run(jobs, 'stage 2');
    console.log(execFileSync('python3', [path.join(HERE, 'mb-qui-repond.py'), 'merge', o.out, String(mb)], { encoding: 'utf8', maxBuffer: 1 << 26 }).trim().split('\n').pop());
    fs.rmSync(sub, { recursive: true, force: true });
  }
  console.log(`rendered ${n} frames at ${fps} fps in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${o.out}`);
} finally { await browser.close(); srv.close(); }
