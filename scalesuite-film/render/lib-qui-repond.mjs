// « Qui répond à 2 h du matin? » render helpers: same static server as V2/V3 (lib.mjs, reused),
// page = index-qui-repond.html, canvas 1920×1080 (format 16x9) or 1080×1920 (format 9x16).
import { chromium, serve, args } from './lib.mjs';
export { chromium, serve, args };

export const SIZE = { '16x9': { width: 1920, height: 1080 }, '9x16': { width: 1080, height: 1920 } };

export async function openFilmQR(browser, base, format = '16x9', scale = 1, shotScale = 1) {
  const vp = SIZE[format];
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: scale });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('[page error]', e.message));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.error('[console]', m.text()); });
  // QR_QUERY=client=0 node render/stills-qui-repond.mjs …  → extra page parameters (content variants)
  await page.goto(`${base}/index-qui-repond.html?format=${format}${process.env.QR_QUERY ? '&' + process.env.QR_QUERY : ''}`);
  await page.waitForFunction(() => window.SS && (window.SS.ready || window.SS.error), null, { timeout: 60000 });
  const err = await page.evaluate(() => window.SS.error);
  if (err) throw new Error(err);
  const cdp = await ctx.newCDPSession(page);
  const shot = async (t) => {
    await page.evaluate((tt) => new Promise((r) => { window.SS.renderFrame(tt); requestAnimationFrame(() => r()); }), t);
    const opt = { format: 'png', optimizeForSpeed: true };
    if (shotScale !== 1) opt.clip = { x: 0, y: 0, width: vp.width, height: vp.height, scale: shotScale };
    const { data } = await cdp.send('Page.captureScreenshot', opt);
    return Buffer.from(data, 'base64');
  };
  return { page, ctx, shot, vp };
}
