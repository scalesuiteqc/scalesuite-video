// Export the picture's sound cues for audio/music-lead-perdu.py: node render/cues-lead-perdu.mjs > cues.json
import { chromium, serve, openFilmLP } from './lib-lead-perdu.mjs';

const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const film = await openFilmLP(browser, base, 0.25);
  const data = await film.page.evaluate(() => ({ duration: window.SS.DURATION, cues: window.SS.cues, LT: window.SS.LT }));
  process.stdout.write(JSON.stringify(data, null, 1) + '\n');
} finally { await browser.close(); srv.close(); }
