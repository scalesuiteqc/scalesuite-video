/* « Qui répond à 2 h du matin? » : the two generated sets. No photo, no character: everything is SVG
   shapes, gradients and blurs, and the rooms are suggested by light only.
     Q.bedroom(parent)      1920 × 1080 world: wall, window with city glow, nightstand, lamp, bed and
                            pillow, and a phone lying flat whose screen lights the surfaces around it.
     Q.office(parent, w, h) empty team office at night in one-point perspective, shallow depth of
                            field: silhouettes of workstations, a few screens in standby, a window
                            wall with city lights in bokeh.
     Q.phoneShot(parent, w, h) tight shot of the phone on the nightstand: volume, glass reflection,
                            lock screen that lights up with a readable notification. */
(function () {
  const SS = window.SS, Q = SS.Q;
  let uid = 0;

  // ================================================================ bedroom
  Q.PHONE = { x: 985, y: 772 }; // phone centre in the bedroom world
  Q.bedroom = (parent) => {
    const id = 'bd' + uid++, P = Q.PHONE, r = SS.rng(21);
    const M = `translate(${P.x} ${P.y}) matrix(0.906 -0.127 -0.423 -0.272 0 0)`; // phone lying flat, yaw 25°
    const L = `url(#${id}L)`;
    const lit = (shape, o, extra = '') => shape.replace('/>', ` fill="${L}" class="lit" data-o="${o}" opacity="${o}" ${extra}/>`);
    const rim = (shape, o, w = 2.5) => shape.replace('/>', ` fill="none" stroke="${L}" stroke-width="${w}" class="lit" data-o="${o}" opacity="${o}"/>`);
    const obj = (shape, fill, o, ro) => shape.replace('/>', ` fill="${fill}"/>`) + lit(shape, o) + (ro ? rim(shape, ro) : '');

    let bokeh = '';
    const cols = ['#BFE8FF', '#8FD8F2', '#5FE0D3', '#D6ECFF', '#FFD9A6'];
    for (let i = 0; i < 46; i++) {
      const x = 176 + r() * 408, y = 372 + Math.pow(r(), 0.7) * 250, rad = 2.5 + r() * 7.5, c = cols[Math.floor(r() * (r() < 0.82 ? 4 : 5))];
      bokeh += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="${c}" opacity="${(0.18 + r() * 0.5).toFixed(2)}"/>`;
    }
    let towers = '';
    for (let x = 170; x < 590;) { const w = 34 + r() * 70, h = 60 + r() * 190; towers += `<rect x="${x.toFixed(0)}" y="${(630 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#0A1626"/>`; x += w + 4; }

    const HEAD = '<rect x="1404" y="468" width="560" height="380" rx="34"/>';
    const DUVET = '<path d="M1392 842 C1480 800 1700 790 1920 806 L1920 1080 L1392 1080 Z"/>';
    const PILLOW = '<path d="M1452 838 C1436 802 1440 744 1472 716 C1562 692 1762 690 1852 712 C1882 738 1886 802 1870 838 C1762 850 1562 850 1452 838 Z"/>';
    const TOP = '<polygon points="606,748 1334,748 1380,818 560,818"/>';
    const FRONT = '<rect x="560" y="818" width="820" height="262"/>';
    const SHADE = '<polygon points="652,486 764,486 798,616 618,616"/>';
    const STEM = '<rect x="702" y="614" width="12" height="166"/>';
    const BASE = '<ellipse cx="708" cy="782" rx="52" ry="13"/>';

    const host = Q.div(parent, 'qr-abs', { width: '1920px', height: '1080px' });
    host.innerHTML = `<svg viewBox="0 0 1920 1080" width="1920" height="1080" style="display:block">
<defs>
  <radialGradient id="${id}L" gradientUnits="userSpaceOnUse" cx="${P.x}" cy="${P.y - 26}" r="1000">
    <stop offset="0" stop-color="#A6F7EC"/><stop offset=".1" stop-color="#3FD3C6" stop-opacity=".82"/>
    <stop offset=".3" stop-color="#2FB0DE" stop-opacity=".42"/><stop offset=".6" stop-color="#1C5F9A" stop-opacity=".13"/>
    <stop offset="1" stop-color="#1C5F9A" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091322"/><stop offset=".6" stop-color="#0F2238"/><stop offset="1" stop-color="#17344F"/></linearGradient>
  <linearGradient id="${id}bedE" gradientUnits="userSpaceOnUse" x1="1400" y1="0" x2="1900" y2="0"><stop offset="0" stop-color="#6FEBDD" stop-opacity=".8"/><stop offset=".4" stop-color="#2FB0DE" stop-opacity=".4"/><stop offset="1" stop-color="#2FB0DE" stop-opacity=".06"/></linearGradient>
  <radialGradient id="${id}bedP" gradientUnits="userSpaceOnUse" cx="1470" cy="716" r="340"><stop offset="0" stop-color="#4FC9C4" stop-opacity=".34"/><stop offset=".5" stop-color="#2B8FB0" stop-opacity=".12"/><stop offset="1" stop-color="#2B8FB0" stop-opacity="0"/></radialGradient>
  <radialGradient id="${id}bedD" gradientUnits="userSpaceOnUse" cx="1400" cy="820" r="440"><stop offset="0" stop-color="#3FB9C8" stop-opacity=".26"/><stop offset=".6" stop-color="#2B8FB0" stop-opacity=".07"/><stop offset="1" stop-color="#2B8FB0" stop-opacity="0"/></radialGradient>
  <linearGradient id="${id}scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D5FFF8"/><stop offset=".45" stop-color="#5BE3D6"/><stop offset="1" stop-color="#2FB0DE"/></linearGradient>
  <filter id="${id}b4" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
  <filter id="${id}b16" x="-60%" y="-120%" width="220%" height="340%"><feGaussianBlur stdDeviation="16"/></filter>
  <filter id="${id}b50" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="50"/></filter>
  <clipPath id="${id}win"><rect x="170" y="150" width="420" height="480"/></clipPath>
  <clipPath id="${id}top"><polygon points="606,748 1334,748 1380,818 560,818"/></clipPath>
</defs>
<rect width="1920" height="1080" fill="#05090F"/>
<rect x="96" y="76" width="568" height="628" rx="60" fill="#1B3D61" opacity=".17" filter="url(#${id}b50)"/>
<rect x="170" y="150" width="420" height="480" fill="url(#${id}sky)"/>
<g clip-path="url(#${id}win)">${towers}<g filter="url(#${id}b4)">${bokeh}</g></g>
<rect x="375" y="150" width="10" height="480" fill="#04070B"/><rect x="170" y="330" width="420" height="10" fill="#04070B"/>
<rect x="163" y="143" width="434" height="494" fill="none" stroke="#0A121C" stroke-width="14"/>
<rect width="1920" height="1080" fill="${L}" class="lit" data-o=".36" opacity=".36"/>
<rect y="992" width="1920" height="88" fill="#03060A"/><rect y="988" width="1920" height="4" fill="#0A121B"/>
${HEAD.replace('/>', ' fill="#070C13"/>')}
${DUVET.replace('/>', ' fill="#060B11"/>')}${DUVET.replace('/>', ` fill="url(#${id}bedD)" class="lit" data-o="1" opacity="1"/>`)}
<path d="M1392 842 C1480 800 1700 790 1920 806" fill="none" stroke="url(#${id}bedE)" stroke-width="3" class="lit" data-o=".9" opacity=".9"/>
${PILLOW.replace('/>', ' fill="#0B141D"/>')}${PILLOW.replace('/>', ` fill="url(#${id}bedP)" class="lit" data-o="1" opacity="1"/>`)}
<path d="M1446 800 C1440 760 1448 736 1472 716 C1562 692 1762 690 1852 712 C1870 728 1878 752 1880 780" fill="none" stroke="url(#${id}bedE)" stroke-width="3.5" stroke-linecap="round" class="lit" data-o="1" opacity="1"/>
${obj(FRONT, '#060A10', 0.08)}
<rect x="596" y="950" width="748" height="2" fill="#0B131D"/><rect x="930" y="878" width="80" height="8" rx="4" fill="#0E1823"/>
${obj(TOP, '#0A121C', 0.66)}
<g clip-path="url(#${id}top)"><ellipse cx="${P.x}" cy="${P.y + 16}" rx="330" ry="52" fill="#6FEBDD" class="lit" data-o=".4" opacity=".4" filter="url(#${id}b16)"/></g>
<rect x="560" y="816.5" width="820" height="3" fill="${L}" class="lit" data-o=".75" opacity=".75"/>
${obj(STEM, '#04070B', 0.3)}${obj(BASE, '#04070B', 0.35, 0.5)}${obj(SHADE, '#05080D', 0.24, 0.5)}
<g class="ph">
  <g transform="translate(0 9) ${M}"><rect x="-150" y="-75" width="300" height="150" rx="26" fill="#020406"/></g>
  <g transform="${M}">
    <rect x="-150" y="-75" width="300" height="150" rx="26" fill="#0B1016" stroke="#22303D" stroke-width="2.5"/>
    <rect x="-141" y="-66" width="282" height="132" rx="19" fill="#05080C"/>
    <g class="lit" data-o="1" opacity="1">
      <rect x="-141" y="-66" width="282" height="132" rx="19" fill="url(#${id}scr)"/>
      <rect x="-118" y="-48" width="58" height="96" rx="11" fill="#fff" opacity=".7"/>
      <rect x="-48" y="-48" width="34" height="96" rx="9" fill="#fff" opacity=".34"/>
      <rect x="-4" y="-48" width="34" height="96" rx="9" fill="#fff" opacity=".2"/>
    </g>
  </g>
  <ellipse cx="${P.x}" cy="${P.y - 22}" rx="250" ry="78" fill="#B5FCF1" class="lit" data-o=".5" opacity=".5" filter="url(#${id}b16)"/>
  <ellipse cx="${P.x}" cy="${P.y - 96}" rx="430" ry="250" fill="#2FB0DE" class="lit" data-o=".17" opacity=".17" filter="url(#${id}b50)"/>
</g>
</svg>`;
    const lits = [...host.querySelectorAll('.lit')].map((e) => [e, +e.dataset.o]);
    const ph = host.querySelector('.ph');
    let last = '';
    return {
      el: host,
      // light: 0 (screen off) … 1 (lit); dx, rot: phone vibration (px, degrees)
      set(light, dx = 0, rot = 0) {
        const key = light.toFixed(3) + '|' + dx.toFixed(2) + '|' + rot.toFixed(3);
        if (key === last) return;
        last = key;
        lits.forEach(([e, o]) => e.setAttribute('opacity', (o * light).toFixed(3)));
        ph.setAttribute('transform', `translate(${dx.toFixed(2)} 0) rotate(${rot.toFixed(3)} ${P.x} ${P.y})`);
      },
    };
  };

  // ================================================================ office
  // Cinematic, dark, shallow depth of field: the city and the far row are out of focus, the middle rows
  // are sharp, the foreground row is a heavy blur. Workstations are reduced to silhouettes (a slab, a
  // screen); a few screens glow in standby.
  Q.office = (parent, W, H) => {
    const id = 'of' + uid++, r = SS.rng(8);
    const VP = { x: W / 2, y: H * 0.37 }, f = W * 0.56, CAM = 1.22, ZB = 9.6, HW = 9;
    const P = (x, y, z) => [VP.x + (f * x) / z, VP.y - (f * (y - CAM)) / z];
    const pts = (a) => a.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const quad = (a, fill, extra = '') => `<polygon points="${pts(a)}" fill="${fill}" ${extra}/>`;
    const mix = (a, b, k) => '#' + [0, 2, 4].map((i) => Math.round(parseInt(a.slice(1 + i, 3 + i), 16) * (1 - k) + parseInt(b.slice(1 + i, 3 + i), 16) * k).toString(16).padStart(2, '0')).join('');
    const haze = (c, z) => mix(c, '#0E2032', Math.max(0, Math.min(0.5, (z - 3.5) / 10)));

    const x0 = P(-HW, 0, ZB)[0], x1 = P(HW, 0, ZB)[0];
    const yHead = P(0, 3.4, ZB)[1], ySill = P(0, 0.5, ZB)[1], yFloor = P(0, 0, ZB)[1];

    // city behind the glass: soft towers, then bokeh discs (out of focus lights)
    let towers = '', bokeh = '', bokehBig = '';
    for (let x = x0 - 10; x < x1;) {
      const w = 60 + r() * 130, h = 30 + Math.pow(r(), 1.5) * (ySill - yHead - 30);
      towers += `<rect x="${x.toFixed(0)}" y="${(ySill - h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h + 4).toFixed(0)}" fill="${mix('#081220', '#0E2136', r())}"/>`;
      x += w + 2;
    }
    const cols = ['#BFE8FF', '#8FD8F2', '#5FE0D3', '#D6ECFF', '#9CC8FF', '#FFD9A6'];
    for (let i = 0; i < 120; i++) {
      const x = x0 + r() * (x1 - x0), y = ySill - 6 - Math.pow(r(), 1.5) * (ySill - yHead) * 0.82, c = cols[Math.floor(r() * (r() < 0.84 ? 5 : 6))];
      bokeh += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3 + r() * 5).toFixed(1)}" fill="${c}" opacity="${(0.2 + r() * 0.5).toFixed(2)}"/>`;
    }
    for (let i = 0; i < 34; i++) {
      const x = x0 + r() * (x1 - x0), y = ySill - 14 - Math.pow(r(), 1.3) * (ySill - yHead) * 0.74, c = cols[Math.floor(r() * (r() < 0.8 ? 5 : 6))];
      bokehBig += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(10 + r() * 14).toFixed(1)}" fill="${c}" opacity="${(0.07 + r() * 0.16).toFixed(2)}"/>`;
    }
    let mull = '';
    for (let i = 0; i <= 6; i++) {
      const x = P(-HW + i * (2 * HW / 6), 0, ZB)[0];
      mull += `<rect x="${(x - 6).toFixed(1)}" y="${yHead.toFixed(1)}" width="12" height="${(ySill - yHead).toFixed(1)}" fill="#03060A"/>`;
    }

    // one workstation, reduced to a silhouette: a slab, a short panel, a screen facing the camera
    const station = (x, z, on) => {
      const zf = z - 0.42, zb = z + 0.42, zm = z + 0.14;
      let g = '';
      g += quad([P(x - 0.9, 0.7, zb), P(x + 0.9, 0.7, zb), P(x + 0.9, 0.28, zb), P(x - 0.9, 0.28, zb)], haze('#03060A', z));
      for (const sx of [-0.93, 0.87]) g += quad([P(x + sx, 0.7, zf), P(x + sx + 0.06, 0.7, zf), P(x + sx + 0.06, 0, zf), P(x + sx, 0, zf)], haze('#04070B', z));
      g += quad([P(x - 0.95, 0.74, zb), P(x + 0.95, 0.74, zb), P(x + 0.95, 0.74, zf), P(x - 0.95, 0.74, zf)], haze('#0A1420', z));
      g += quad([P(x - 0.95, 0.745, zb), P(x + 0.95, 0.745, zb), P(x + 0.95, 0.74, zb - 0.08), P(x - 0.95, 0.74, zb - 0.08)], haze('#213A54', z)); // window light on the far edge
      g += quad([P(x - 0.95, 0.74, zf), P(x + 0.95, 0.74, zf), P(x + 0.95, 0.69, zf), P(x - 0.95, 0.69, zf)], haze('#05090E', z));
      g += quad([P(x - 0.03, 0.9, zm), P(x + 0.03, 0.9, zm), P(x + 0.03, 0.74, zm), P(x - 0.03, 0.74, zm)], haze('#020406', z));
      g += quad([P(x - 0.34, 1.28, zm), P(x + 0.34, 1.28, zm), P(x + 0.34, 0.88, zm), P(x - 0.34, 0.88, zm)], haze('#020406', z));
      g += quad([P(x - 0.34, 1.285, zm), P(x + 0.34, 1.285, zm), P(x + 0.34, 1.265, zm), P(x - 0.34, 1.265, zm)], haze('#16293C', z)); // rim light on the top edge
      if (on) {
        const c = P(x, 1.08, zm), sw = (0.68 * f) / zm, sh = (0.4 * f) / zm;
        g += `<ellipse cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" rx="${(sw * 1.05).toFixed(1)}" ry="${(sh * 1.3).toFixed(1)}" fill="#2BBFB3" opacity=".22" filter="url(#${id}g)" class="sb"/>`;
        g += quad([P(x - 0.31, 1.25, zm), P(x + 0.31, 1.25, zm), P(x + 0.31, 0.91, zm), P(x - 0.31, 0.91, zm)], `url(#${id}sb)`, 'class="sb"');
        g += quad([P(x - 0.55, 0.746, zm - 0.05), P(x + 0.55, 0.746, zm - 0.05), P(x + 0.8, 0.746, zf), P(x - 0.8, 0.746, zf)], '#2BBFB3', 'opacity=".12" class="sb"');
      }
      return g;
    };
    const row = (z, xs, onSet) => xs.map((x) => station(x, z, onSet.includes(x))).join('');
    const far = row(8.3, [-6.6, -4.4, -2.2, 2.2, 4.4, 6.6], [-4.4, 2.2]);
    const mid = row(6.4, [-6.6, -4.4, -2.2, 2.2, 4.4, 6.6], [-2.2, 4.4]) + row(4.9, [-4.4, -2.2, 2.2, 4.4], [2.2]);
    const near = station(-1.78, 2.6, true) + station(2.05, 2.8, false);
    const aisle = P(0, 0, 5.2);

    const host = Q.div(parent, 'qr-abs', { width: W + 'px', height: H + 'px' });
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block">
<defs>
  <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050B15"/><stop offset=".6" stop-color="#0A192B"/><stop offset="1" stop-color="#143049"/></linearGradient>
  <linearGradient id="${id}fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#13293F"/><stop offset=".35" stop-color="#0A1522"/><stop offset="1" stop-color="#03060A"/></linearGradient>
  <linearGradient id="${id}ce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020305"/><stop offset="1" stop-color="#060C14"/></linearGradient>
  <linearGradient id="${id}sb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#23808A"/><stop offset="1" stop-color="#15476A"/></linearGradient>
  <linearGradient id="${id}fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E5B86" stop-opacity="0"/><stop offset=".5" stop-color="#1E5B86" stop-opacity=".16"/><stop offset="1" stop-color="#1E5B86" stop-opacity="0"/></linearGradient>
  <filter id="${id}c" x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
  <filter id="${id}bk" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="3.2"/></filter>
  <filter id="${id}bb" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>
  <filter id="${id}m" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.4"/></filter>
  <filter id="${id}far" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="${id}near" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="11"/></filter>
  <filter id="${id}g" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="${id}ai" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="48"/></filter>
  <clipPath id="${id}gl"><rect x="0" y="${yHead.toFixed(1)}" width="${W}" height="${(ySill - yHead).toFixed(1)}"/></clipPath>
</defs>
<rect width="${W}" height="${H}" fill="#020406"/>
<rect x="0" y="${yHead.toFixed(1)}" width="${W}" height="${(ySill - yHead).toFixed(1)}" fill="url(#${id}sky)"/>
<g clip-path="url(#${id}gl)"><g filter="url(#${id}c)">${towers}</g><g filter="url(#${id}bk)">${bokeh}</g><g filter="url(#${id}bb)">${bokehBig}</g></g>
<g filter="url(#${id}m)">${mull}<rect x="0" y="${P(0, 2.0, ZB)[1].toFixed(1)}" width="${W}" height="8" fill="#03060A"/></g>
<rect x="0" y="0" width="${W}" height="${(yHead + 2).toFixed(1)}" fill="url(#${id}ce)"/>
<rect x="0" y="${(ySill - 2).toFixed(1)}" width="${W}" height="${(yFloor - ySill + 4).toFixed(1)}" fill="#04080E"/>
<rect x="0" y="${yFloor.toFixed(1)}" width="${W}" height="${(H - yFloor).toFixed(1)}" fill="url(#${id}fl)"/>
<rect x="0" y="${(yHead - 40).toFixed(1)}" width="${W}" height="${(yFloor - yHead + 150).toFixed(1)}" fill="url(#${id}fog)"/>
<ellipse cx="${aisle[0].toFixed(1)}" cy="${(aisle[1] + 40).toFixed(1)}" rx="${(W * 0.17).toFixed(1)}" ry="${(H * 0.16).toFixed(1)}" fill="#2B6FA6" opacity=".22" filter="url(#${id}ai)"/>
<g filter="url(#${id}far)">${far}</g>
${mid}
<g filter="url(#${id}near)">${near}</g>
</svg>`;
    const sbs = [...host.querySelectorAll('.sb')].map((e) => [e, +(e.getAttribute('opacity') || 1)]);
    let last = -1;
    return {
      el: host,
      // k: standby glow multiplier (slow breathing)
      set(k) { if (Math.abs(k - last) < 0.004) return; last = k; sbs.forEach(([e, o]) => e.setAttribute('opacity', (o * k).toFixed(3))); },
    };
  };

  // ================================================================ close-up of the phone
  // Tight shot from above the nightstand: the phone has real volume (extruded edge, glass reflection)
  // and its lock screen lights up with a readable « Nouvelle demande » notification.
  Q.phoneShot = (parent, W, H) => {
    const id = 'pc' + uid++;
    const cx = W / 2, cy = H * 0.535, S = Math.min(W / 540, H / 760) * 1.02;
    const M = `matrix(${(0.978 * S).toFixed(4)} ${(-0.129 * S).toFixed(4)} ${(0.208 * S).toFixed(4)} ${(0.606 * S).toFixed(4)} 0 0)`;
    const body = (dy, fill, extra = '') => `<g transform="translate(${cx} ${cy + dy}) ${M}"><rect x="-180" y="-370" width="360" height="740" rx="58" fill="${fill}" ${extra}/></g>`;
    let side = '';
    const T = 17 * S;
    for (let i = 12; i >= 1; i--) { const k = i / 12; side += body(T * k, k > 0.82 ? '#03050A' : k > 0.3 ? '#131C27' : '#243242'); }
    const edge = H * 0.115; // back edge of the nightstand
    const host = Q.div(parent, 'qr-abs', { width: W + 'px', height: H + 'px' });
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block">
<defs>
  <linearGradient id="${id}tb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0C1622"/><stop offset=".5" stop-color="#08101A"/><stop offset="1" stop-color="#04080D"/></linearGradient>
  <radialGradient id="${id}gl" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${(W * 0.78).toFixed(0)}">
    <stop offset="0" stop-color="#7FEFE2" stop-opacity=".85"/><stop offset=".3" stop-color="#2FB0DE" stop-opacity=".4"/><stop offset=".7" stop-color="#1C5F9A" stop-opacity=".1"/><stop offset="1" stop-color="#1C5F9A" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="${id}wp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#103E48"/><stop offset=".55" stop-color="#0F2F52"/><stop offset="1" stop-color="#0A1B33"/></linearGradient>
  <linearGradient id="${id}rf" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".16"/><stop offset=".55" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="${id}ic" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2FD3C4"/><stop offset=".5" stop-color="#2BBFB3"/><stop offset="1" stop-color="#2FB0DE"/></linearGradient>
  <filter id="${id}b8" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="${id}b22" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${(24 * S).toFixed(1)}"/></filter>
  <clipPath id="${id}scr"><rect x="-166" y="-356" width="332" height="712" rx="45"/></clipPath>
</defs>
<rect width="${W}" height="${H}" fill="#04070C"/>
<rect width="${W}" height="${edge}" fill="#05090F"/>
<rect width="${W}" height="${edge}" fill="url(#${id}gl)" class="lit" data-o=".55" opacity="0"/>
<g filter="url(#${id}b8)"><ellipse cx="${W * 0.16}" cy="${edge - 8}" rx="${W * 0.13}" ry="${H * 0.02}" fill="#020406"/><rect x="${W * 0.145}" y="-10" width="${W * 0.03}" height="${edge}" fill="#020406"/></g>
<rect y="${edge}" width="${W}" height="${H - edge}" fill="url(#${id}tb)"/>
<rect y="${edge}" width="${W}" height="${H - edge}" fill="url(#${id}gl)" class="lit" data-o=".62" opacity="0"/>
<rect y="${edge - 1.5}" width="${W}" height="3" fill="#1B2B3B"/>
<g transform="translate(${cx + 26 * S} ${cy + 46 * S}) ${M}" filter="url(#${id}b22)"><rect x="-180" y="-370" width="360" height="740" rx="58" fill="#000" opacity=".75"/></g>
<g transform="translate(${cx} ${cy + T * 0.6}) ${M}" filter="url(#${id}b22)" class="lit" data-o=".42" opacity="0"><rect x="-200" y="-390" width="400" height="780" rx="70" fill="#5FE9DC"/></g>
${side}
${body(0, '#0A0F16', 'stroke="#3B4D60" stroke-width="2.5"')}
<g transform="translate(${cx} ${cy}) ${M}">
  <rect x="-166" y="-356" width="332" height="712" rx="45" fill="#03060A"/>
  <g clip-path="url(#${id}scr)">
    <g class="scr" opacity="0">
      <rect x="-166" y="-356" width="332" height="712" fill="url(#${id}wp)"/>
      <text x="0" y="-258" text-anchor="middle" font-family="Inter" font-weight="540" font-size="62" letter-spacing="-2" fill="#EAF6F8">2 h 14</text>
      <rect x="-46" y="326" width="92" height="7" rx="3.5" fill="#fff" opacity=".5"/>
    </g>
    <g class="note" opacity="0">
      <rect x="-150" y="-212" width="300" height="142" rx="30" fill="#F4F7F9"/>
      <rect x="-134" y="-176" width="70" height="70" rx="19" fill="url(#${id}ic)"/>
      <g transform="translate(-118 -160) scale(1.6)" fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3.6 11.2 12 4l8.4 7.2"/><path d="M5.8 9.6V19.5h12.4V9.6"/><path d="M10 19.5v-5.2h4v5.2"/></g>
      <text x="-50" y="-172" font-family="Inter" font-weight="600" font-size="19" fill="#5B6875">Nouvelle demande</text>
      <text x="-50" y="-134" font-family="Inter" font-weight="750" font-size="33" letter-spacing="-.8" fill="#111A22">Évaluation</text>
      <text x="-50" y="-103" font-family="Inter" font-weight="540" font-size="22" fill="#5B6875">Sainte Julie</text>
    </g>
    <polygon points="-40,-356 120,-356 -60,356 -220,356" fill="url(#${id}rf)"/>
  </g>
  <rect x="-166" y="-356" width="332" height="712" rx="45" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="3"/>
  <rect x="-34" y="-340" width="68" height="18" rx="9" fill="#020406"/>
</g>
</svg>`;
    const lits = [...host.querySelectorAll('.lit')].map((e) => [e, +e.dataset.o]);
    const scr = host.querySelector('.scr'), note = host.querySelector('.note');
    let last = '';
    return {
      el: host,
      // wake: screen brightness 0…1; note: notification 0…1 (slides down into place)
      set(wake, n) {
        const key = wake.toFixed(3) + '|' + n.toFixed(3);
        if (key === last) return;
        last = key;
        const light = Math.min(1.15, wake * (0.45 + 0.55 * Math.min(1, n)));
        lits.forEach(([e, o]) => e.setAttribute('opacity', (o * light).toFixed(3)));
        scr.setAttribute('opacity', wake.toFixed(3));
        note.setAttribute('opacity', Math.min(1, n * 1.6).toFixed(3));
        note.setAttribute('transform', `translate(0 ${((1 - n) * -46).toFixed(2)})`);
      },
    };
  };
})();
