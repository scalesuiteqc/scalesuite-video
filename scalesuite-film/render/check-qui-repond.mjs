// Quality checks for « Qui répond à 2 h du matin? » (same checks as check-v3.mjs):
//   node render/check-qui-repond.mjs determinism [t1,t2,...]   same frame after different seek histories → pixel diff
//   node render/check-qui-repond.mjs motion [end] [cuts]        frame-to-frame change at 30 fps → isolated spikes
// The film has three intended hard cuts (2,4 s, 3,9 s and 8,2 s): they are listed and not counted.
import { chromium, serve, openFilmQR } from './lib-qui-repond.mjs';

const [mode = 'determinism', arg, cutsArg] = process.argv.slice(2);
const { srv, base } = await serve();
const browser = await chromium.launch();
const diffPixels = (page, A, B) => page.evaluate(async ([x, y]) => {
  const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
  const [ia, ib] = await Promise.all([load(x), load(y)]);
  const c = new OffscreenCanvas(ia.width, ia.height), g = c.getContext('2d', { willReadFrequently: true });
  g.drawImage(ia, 0, 0); const da = g.getImageData(0, 0, ia.width, ia.height).data;
  g.drawImage(ib, 0, 0); const db = g.getImageData(0, 0, ia.width, ia.height).data;
  let m = 0, s = 0; for (let i = 0; i < da.length; i += 4) {
    const v = Math.max(Math.abs(da[i] - db[i]), Math.abs(da[i + 1] - db[i + 1]), Math.abs(da[i + 2] - db[i + 2]));
    if (v > m) m = v; s += v;
  }
  return { max: m, mean: s / (da.length / 4) };
}, [A.toString('base64'), B.toString('base64')]);

try {
  if (mode === 'determinism') {
    const times = (arg || '0.9,1.3,2.9,3.4,5.0,6.6,7.3,9.9,11.9,13.6,18.6,20.9,21.3,23.1,24.3,26.3,28.9,32.0,34.9,37.9,40.2,41.0,44.4,45.3,46.3,47.4,49.5').split(',').map(Number);
    const a = await openFilmQR(browser, base, '16x9', 1, 0.5), b = await openFilmQR(browser, base, '16x9', 1, 0.5);
    let worst = 0, bad = 0;
    for (const t of times) {
      const A = await a.shot(t);
      for (const x of [49.0, 0.1, t + 1.3]) await b.shot(x);   // page B jumps around first
      const px = await diffPixels(a.page, A, await b.shot(t));
      worst = Math.max(worst, px.max); if (px.max > 2) bad++;
      console.log(`${t.toFixed(2)}s  pixel max ${px.max}/255`);
    }
    console.log(bad ? `FAIL: ${bad} frames differ` : `OK: same picture whatever the history, worst pixel ${worst}/255`);
  } else {
    const f = await openFilmQR(browser, base, '16x9', 1, 0.25);
    const end = parseFloat(arg) || await f.page.evaluate(() => window.SS.DURATION);
    const cuts = (cutsArg || '2.4,3.9,8.2').split(',').map(Number);
    const rows = []; let prev = null;
    for (let i = 0; i <= Math.round(end * 30); i++) {
      const png = await f.shot(i / 30);
      rows.push([i / 30, prev ? (await diffPixels(f.page, png, prev)).mean : 0]);
      prev = png;
    }
    const isCut = (t) => cuts.some((c) => Math.abs(t - c) < 0.05);
    const spikes = rows.filter(([t, d], i) => i > 0 && i < rows.length - 1 && d > 6 && d > 2.2 * Math.max(rows[i - 1][1], rows[i + 1][1], 0.5) && !isCut(t));
    rows.filter(([t]) => isCut(t)).filter(([, d]) => d > 6).forEach(([t, d]) => console.log(`intended cut at ${t.toFixed(3)}s: ${d.toFixed(2)}`));
    spikes.forEach(([t, d]) => console.log(`spike at ${t.toFixed(3)}s: ${d.toFixed(2)}`));
    const peak = rows.filter(([t]) => !isCut(t)).reduce((m, r) => (r[1] > m[1] ? r : m));
    console.log(spikes.length ? `FAIL: ${spikes.length} isolated spikes` : `OK: no isolated spike outside the intended cuts (peak ${peak[1].toFixed(1)} at ${peak[0].toFixed(2)}s)`);
  }
} finally { await browser.close(); srv.close(); }
