// Export the picture's sound cues for audio/music-equipe.py: node render/cues-equipe.mjs > cues.json
import { chromium, serve, openFilmEQ } from './lib-equipe.mjs';

const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const film = await openFilmEQ(browser, base, 0.25);
  const data = await film.page.evaluate(() => ({ duration: window.SS.DURATION, cues: window.SS.cues, ET: window.SS.ET }));
  process.stdout.write(JSON.stringify(data, null, 1) + '\n');
} finally { await browser.close(); srv.close(); }
