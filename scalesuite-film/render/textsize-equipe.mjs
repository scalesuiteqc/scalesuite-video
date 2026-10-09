// On-screen text size audit (1080 × 1920 master): effective size = computed font-size × every ancestor
// transform (camera included), measured on held states only.
//   node render/textsize-equipe.mjs [t1,t2,...] [--min=30]
import { chromium, serve, args, openFilmEQ } from './lib-equipe.mjs';

const o = args({ min: '30' });
const times = (process.argv.slice(2).find((a) => !a.startsWith('--')) || '0,2.3,4.5,8.2,10.4,13.2,16.2,19.2,21.8,24.0,27.5').split(',').map(Number);
const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const film = await openFilmEQ(browser, base, 1);
  const seen = new Map();
  for (const t of times) {
    await film.shot(t);
    const rows = await film.page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('#stage *')) {
        if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
        const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
        if (!own) continue;
        let op = 1;
        for (let p = el; p && p.id !== 'stage'; p = p.parentElement) op *= parseFloat(getComputedStyle(p).opacity);
        if (op < 0.5) continue; // dimmed / fading elements are not read
        const r = el.getBoundingClientRect();
        if (!el.offsetWidth || r.bottom < 0 || r.top > 1920 || r.right < 0 || r.left > 1080) continue;
        const scale = r.width / el.offsetWidth;
        out.push({ txt: own.slice(0, 40), px: +(parseFloat(getComputedStyle(el).fontSize) * scale).toFixed(1) });
      }
      return out;
    });
    for (const r of rows) { const k = r.txt; const v = seen.get(k); if (!v || r.px < v.px) seen.set(k, { px: r.px, t }); }
  }
  const all = [...seen.entries()].sort((a, b) => a[1].px - b[1].px);
  all.slice(0, 40).forEach(([k, v]) => console.log(`${v.px.toFixed(1).padStart(6)} px  t=${v.t}  ${k}`));
  const low = all.filter(([, v]) => v.px < +o.min);
  console.log(low.length ? `FAIL: ${low.length} texts under ${o.min} px` : `OK: smallest on-screen text ${all[0][1].px} px (min ${o.min})`);
} finally { await browser.close(); srv.close(); }
