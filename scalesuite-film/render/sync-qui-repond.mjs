// Sync control (brief v2): gap between each cue word on screen and the same word in the voice.
//   node render/sync-qui-repond.mjs      → fails if a key word or figure is off by more than 2 frames at 60 i/s,
//                                          or any other cue word by more than 4 frames
// Scenes declare their cues with QR.sync(scene, word, screenTime); the voice times come from vo-timing.js.
import { chromium, serve, openFilmQR } from './lib-qui-repond.mjs';
const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const f = await openFilmQR(browser, base, '16x9', 1, 0.1);
  const { syncs, vo } = await f.page.evaluate(() => ({ syncs: window.SS.QR.syncs, vo: window.SS.QR.VO }));
  const all = Object.entries(vo).flatMap(([s, v]) => Object.keys(v.cues).map((w) => s + '.' + w));
  const seen = new Set(syncs.map((x) => x.scene + '.' + x.word));
  let bad = 0;
  console.log('SYNC      word on screen against the voice (frames at 60 i/s)');
  for (const x of syncs) {
    const d = (x.screen - x.voice) * 60, tol = x.key ? 2 : 4, ok = Math.abs(d) <= tol + 1e-6;
    if (!ok) bad++;
    console.log(`          ${ok ? 'ok  ' : 'FAIL'} ${(x.scene + '.' + x.word).padEnd(22)} ${d >= 0 ? '+' : ''}${d.toFixed(1)} (tolerance ${tol})`);
  }
  const missing = all.filter((k) => !seen.has(k));
  console.log(`SYNC      ${bad ? 'FAIL' : 'OK'}: ${syncs.length - bad}/${syncs.length} cues within tolerance` + (missing.length ? ` ; ${missing.length} cue(s) not wired to the picture yet: ${missing.join(', ')}` : ''));
  process.exitCode = bad ? 1 : 0;
} finally { await browser.close(); srv.close(); }
