// Scene 6 hour check (brief v2): the hours of the single story must agree from one phone to the next.
//   node render/hours-qui-repond.mjs
// Reads the hours table of the scene (QR.HOURS) and every hour actually written in the scene's DOM.
import { chromium, serve, openFilmQR } from './lib-qui-repond.mjs';
const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const f = await openFilmQR(browser, base, '16x9', 1, 0.1);
  const r = await f.page.evaluate(() => {
    const QR = window.SS.QR, layer = QR.scenes.find((s) => s.id === 's6').layer;
    const seen = {};
    const walk = document.createTreeWalker(layer, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) (n.textContent.match(/\b\d{1,2} h \d{2}\b/g) || []).forEach((h) => { seen[h] = (seen[h] || 0) + 1; });
    return { hours: QR.HOURS, seen };
  });
  const min = (h) => { const m = h.match(/(\d+) h (\d+)/); return +m[1] * 60 + +m[2]; };
  const order = ['search', 'page', 'alert', 'confirm', 'reply', 'portal'];
  let bad = 0;
  console.log('HOURS     scene 6, one story:');
  order.forEach((k, i) => {
    const ok = i === 0 || min(r.hours[k]) >= min(r.hours[order[i - 1]]);
    if (!ok) bad++;
    console.log(`          ${ok ? 'ok  ' : 'FAIL'} ${k.padEnd(8)} ${r.hours[k]}`);
  });
  const story = new Set(Object.values(r.hours));
  // other hours are allowed only in the list of earlier requests (previous days)
  const others = Object.keys(r.seen).filter((h) => !story.has(h));
  const allowed = ['10 h 22', '16 h 48', '9 h 15', '8 h 00'];
  const stray = others.filter((h) => !allowed.includes(h));
  if (stray.length) bad++;
  if (min(r.hours.alert) - min(r.hours.page) > 1) { bad++; console.log('          FAIL the alert must reach the broker within the minute of the request'); }
  console.log(`          hours written on screen: ${Object.entries(r.seen).map(([h, n]) => `${h} ×${n}`).join(', ')}`);
  console.log(`HOURS     ${bad ? 'FAIL' : 'OK'}: story hours in order, alert within the minute` + (stray.length ? ` ; unexpected hour(s): ${stray.join(', ')}` : ' ; other hours belong to earlier requests of the list'));
  process.exitCode = bad ? 1 : 0;
} finally { await browser.close(); srv.close(); }
