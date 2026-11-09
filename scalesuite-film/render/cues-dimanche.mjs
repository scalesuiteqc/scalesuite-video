// Export the picture's sound cues for audio/music-dimanche.py: node render/cues-dimanche.mjs > cues.json
import { chromium, serve, openFilmDM } from './lib-dimanche.mjs';

const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const film = await openFilmDM(browser, base, 0.25);
  const data = await film.page.evaluate(() => ({ duration: window.SS.DURATION, cues: window.SS.cues, DT: window.SS.DT }));
  process.stdout.write(JSON.stringify(data, null, 1) + '\n');
} finally { await browser.close(); srv.close(); }
