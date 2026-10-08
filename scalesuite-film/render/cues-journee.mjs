// Export the picture's sound cues (collected while the GSAP timeline is built) for audio/music-journee.py:
// node render/cues-journee.mjs > cues.json
import { chromium, serve, openFilm } from './lib-journee.mjs';

const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const film = await openFilm(browser, base, 0.25);
  const data = await film.page.evaluate(() => ({ duration: window.SS.DURATION, cues: window.SS.cues }));
  process.stdout.write(JSON.stringify(data, null, 1) + '\n');
} finally { await browser.close(); srv.close(); }
