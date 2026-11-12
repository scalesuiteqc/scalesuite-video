// Exports the timeline for the score: scene starts and durations, voice windows, cue words (film seconds).
//   node render/cues-qui-repond.mjs > cues.json
import { chromium, serve, openFilmQR } from './lib-qui-repond.mjs';
const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const f = await openFilmQR(browser, base, '16x9', 1, 0.1);
  console.log(JSON.stringify(await f.page.evaluate(() => { const Q = window.SS.QR; return { bpm: Q.BPM, total: Q.TOTAL, start: Q.START, dur: Q.DUR, vo: Q.VO }; })));
} finally { await browser.close(); srv.close(); }
