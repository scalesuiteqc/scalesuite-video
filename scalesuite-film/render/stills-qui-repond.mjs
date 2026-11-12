// « Qui répond à 2 h du matin? » single frames:
// node render/stills-qui-repond.mjs --times=1.2,3.0 --out=dir [--names=a,b] [--format=16x9|9x16]
import fs from 'node:fs';
import path from 'node:path';
import { chromium, serve, args, openFilmQR } from './lib-qui-repond.mjs';

const o = args({ times: '0', out: 'stills', scale: '1', names: '', format: '16x9' });
const times = o.times.split(',').map(Number);
const names = o.names ? o.names.split(',') : [];
fs.mkdirSync(o.out, { recursive: true });
const { srv, base } = await serve();
const browser = await chromium.launch();
try {
  const film = await openFilmQR(browser, base, o.format, parseFloat(o.scale));
  for (let i = 0; i < times.length; i++) {
    const name = names[i] || `qr-${times[i].toFixed(2).padStart(5, '0')}`;
    fs.writeFileSync(path.join(o.out, name + '.png'), await film.shot(times[i]));
  }
  console.log(`wrote ${times.length} stills to ${o.out}`);
} finally { await browser.close(); srv.close(); }
