// Still key frames of the plan (no animation): node render/keyframes-journee.mjs --out=dir [--frames=1,2,…]
// Each frames-journee.html?f=N is captured at 1080 × 1920 (Chrome ignores a fractional scale factor),
// then downscaled to 540 × 960 by the caller (build: render/sheet-v3.py does it for the sheet).
import fs from 'node:fs';
import path from 'node:path';
import { chromium, serve, args } from './lib.mjs';

const o = args({ out: 'keyframes', frames: '1,2,3,4,5,6,7,8,9,10' });
fs.mkdirSync(o.out, { recursive: true });
const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 } });
  for (const f of o.frames.split(',')) {
    const page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.error('[console]', m.text()); });
    await page.goto(`${base}/frames-journee.html?f=${f}`);
    await page.waitForFunction(() => window.SS && (window.SS.ready || window.SS.error), null, { timeout: 60000 });
    const err = await page.evaluate(() => window.SS.error);
    if (err) throw new Error(err);
    fs.writeFileSync(path.join(o.out, `k${String(f).padStart(2, '0')}.png`), await page.screenshot());
    await page.close();
  }
  console.log('wrote key frames to', o.out);
} finally { await browser.close(); srv.close(); }
