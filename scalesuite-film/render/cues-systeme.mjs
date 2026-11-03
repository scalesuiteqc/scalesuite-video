// Export the picture's sound cues for audio/music-systeme.py: node render/cues-systeme.mjs > cues.json
import { chromium, serve, openFilmSY } from './lib-systeme.mjs';

const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const film = await openFilmSY(browser, base, 0.25);
  const data = await film.page.evaluate(() => ({ duration: window.SS.DURATION, cues: window.SS.cues, ST: window.SS.ST }));
  process.stdout.write(JSON.stringify(data, null, 1) + '\n');
} finally { await browser.close(); srv.close(); }
