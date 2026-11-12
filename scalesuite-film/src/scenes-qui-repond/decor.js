/* « Qui répond à 2 h du matin? » : the two generated sets. No photo, no character: everything is SVG
   shapes, gradients and blurs, and the rooms are suggested by light only.
     Q.bedroom(parent)      1920 × 1080 world: wall, window with city glow, nightstand, lamp, bed and
                            pillow, and a phone lying flat whose screen lights the surfaces around it.
     Q.office(parent, w, h) empty team office at night in one-point perspective: rows of desks,
                            monitors (a few in standby), chair backs, a window wall with blurred city
                            lights. */
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
  Q.office = (parent, W, H) => {
    const id = 'of' + uid++, r = SS.rng(8);
    const VP = { x: W / 2, y: H * 0.375 }, f = W * 0.54, CAM = 1.5, ZB = 9.2, HW = 8.5, CEIL = 3.1;
    const P = (x, y, z) => [VP.x + (f * x) / z, VP.y - (f * (y - CAM)) / z];
    const pts = (a) => a.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const quad = (a, fill, extra = '') => `<polygon points="${pts(a)}" fill="${fill}" ${extra}/>`;
    const mix = (a, b, k) => '#' + [0, 2, 4].map((i) => Math.round(parseInt(a.slice(1 + i, 3 + i), 16) * (1 - k) + parseInt(b.slice(1 + i, 3 + i), 16) * k).toString(16).padStart(2, '0')).join('');
    const haze = (c, z) => mix(c, '#12263C', Math.max(0, Math.min(0.55, (z - 3) / 9)));

    const x0 = P(-HW, 0, ZB)[0], x1 = P(HW, 0, ZB)[0];
    const yTop = P(0, CEIL, ZB)[1], yHead = P(0, 2.85, ZB)[1], ySill = P(0, 0.55, ZB)[1], yFloor = P(0, 0, ZB)[1];

    // city behind the glass
    let towers = '', lights = '', bokeh = '';
    for (let x = x0 - 10; x < x1;) {
      const w = 46 + r() * 96, h = 40 + Math.pow(r(), 1.4) * (ySill - yHead - 40);
      towers += `<rect x="${x.toFixed(0)}" y="${(ySill - h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h + 4).toFixed(0)}" fill="${mix('#0A1524', '#10233A', r())}"/>`;
      const n = Math.floor((w * h) / 520);
      for (let i = 0; i < n; i++) if (r() < 0.5) lights += `<rect x="${(x + 5 + r() * (w - 12)).toFixed(1)}" y="${(ySill - h + 6 + r() * (h - 12)).toFixed(1)}" width="3.4" height="4.6" fill="${r() < 0.78 ? '#BFE4FF' : '#FFD9A6'}" opacity="${(0.25 + r() * 0.55).toFixed(2)}"/>`;
      x += w + 3;
    }
    const cols = ['#BFE8FF', '#8FD8F2', '#5FE0D3', '#D6ECFF', '#FFD9A6'];
    for (let i = 0; i < 90; i++) {
      const x = x0 + r() * (x1 - x0), y = ySill - Math.pow(r(), 1.6) * (ySill - yHead) * 0.85 - 4, rad = 3 + r() * 9, c = cols[Math.floor(r() * (r() < 0.8 ? 4 : 5))];
      bokeh += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="${c}" opacity="${(0.16 + r() * 0.5).toFixed(2)}"/>`;
    }
    let mull = '', streaks = '';
    for (let i = 0; i <= 8; i++) {
      const x = P(-HW + i * (2 * HW / 8), 0, ZB)[0];
      mull += `<rect x="${(x - 5).toFixed(1)}" y="${yHead.toFixed(1)}" width="10" height="${(ySill - yHead).toFixed(1)}" fill="#04070B"/>`;
    }
    streaks = quad([P(-HW, 0, ZB), P(HW, 0, ZB), P(HW, 0, 2.2), P(-HW, 0, 2.2)], `url(#${id}st)`);
    let fixtures = '';
    for (const x of [-5.6, -1.9, 1.9, 5.6]) fixtures += quad([P(x - 0.12, CEIL, ZB), P(x + 0.12, CEIL, ZB), P(x + 0.12, CEIL, 1.6), P(x - 0.12, CEIL, 1.6)], '#070D15');

    // rows of workstations, far to near
    let rows = '';
    const standby = new Set(['7.6:-4.1', '7.6:1.9', '6:-6.3', '6:4.1', '4.6:-1.9', '4.6:6.3', '3.4:1.9']);
    for (const z of [7.6, 6.0, 4.6, 3.4]) {
      let far = '', near = '';
      for (const x of [-6.3, -4.1, -1.9, 1.9, 4.1, 6.3]) {
        const on = standby.has(z + ':' + x), zf = z - 0.42, zb = z + 0.42, zm = z + 0.12, zc = z - 0.9;
        // desk top and front panel
        far += quad([P(x - 0.95, 0.7, zb), P(x + 0.95, 0.7, zb), P(x + 0.95, 0.12, zb), P(x - 0.95, 0.12, zb)], haze('#05090E', z));
        for (const sx of [-0.95, 0.89]) far += quad([P(x + sx, 0.7, zf), P(x + sx + 0.06, 0.7, zf), P(x + sx + 0.06, 0, zf), P(x + sx, 0, zf)], haze('#070C13', z));
        far += quad([P(x - 0.95, 0.74, zb), P(x + 0.95, 0.74, zb), P(x + 0.95, 0.74, zf), P(x - 0.95, 0.74, zf)], haze('#0E1A27', z));
        far += quad([P(x - 0.95, 0.74, zf), P(x + 0.95, 0.74, zf), P(x + 0.95, 0.7, zf), P(x - 0.95, 0.7, zf)], haze('#1A2C3F', z));
        // monitor: stand, back plate, screen facing the camera
        const m = [P(x - 0.33, 1.27, zm), P(x + 0.33, 1.27, zm), P(x + 0.33, 0.88, zm), P(x - 0.33, 0.88, zm)];
        far += quad([P(x - 0.03, 0.9, zm), P(x + 0.03, 0.9, zm), P(x + 0.03, 0.74, zm), P(x - 0.03, 0.74, zm)], haze('#03060A', z));
        far += quad([P(x - 0.13, 0.76, zm), P(x + 0.13, 0.76, zm), P(x + 0.13, 0.74, zm - 0.1), P(x - 0.13, 0.74, zm - 0.1)], haze('#03060A', z));
        far += quad(m, haze('#03060A', z), `stroke="${haze('#101C29', z)}" stroke-width="1.5"`);
        if (on) {
          const c = P(x, 1.075, zm), sw = (0.62 * f) / zm, sh = (0.36 * f) / zm;
          far += `<ellipse cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" rx="${(sw * 0.95).toFixed(1)}" ry="${(sh * 1.15).toFixed(1)}" fill="#2BBFB3" opacity=".2" filter="url(#${id}b12)" class="sb"/>`;
          far += quad([P(x - 0.3, 1.24, zm), P(x + 0.3, 1.24, zm), P(x + 0.3, 0.91, zm), P(x - 0.3, 0.91, zm)], `url(#${id}sb)`, 'class="sb"');
          far += quad([P(x - 0.6, 0.745, zm - 0.06), P(x + 0.6, 0.745, zm - 0.06), P(x + 0.75, 0.745, zf), P(x - 0.75, 0.745, zf)], '#2BBFB3', `opacity=".12" class="sb"`);
        }
        // chair back, seen from behind
        const ct = P(x, 1.06, zc), cb = P(x, 0.52, zc), cw = (0.5 * f) / zc;
        near += `<rect x="${(ct[0] - cw / 2).toFixed(1)}" y="${ct[1].toFixed(1)}" width="${cw.toFixed(1)}" height="${(cb[1] - ct[1]).toFixed(1)}" rx="${(cw * 0.2).toFixed(1)}" fill="${haze('#04070B', z)}"/>`;
        near += `<rect x="${(ct[0] - cw / 2).toFixed(1)}" y="${ct[1].toFixed(1)}" width="${cw.toFixed(1)}" height="${(cw * 0.05).toFixed(1)}" rx="${(cw * 0.025).toFixed(1)}" fill="${haze('#16283A', z)}"/>`;
        const p0 = P(x, 0.5, zc), p1 = P(x, 0.06, zc);
        near += `<rect x="${(p0[0] - cw * 0.04).toFixed(1)}" y="${p0[1].toFixed(1)}" width="${(cw * 0.08).toFixed(1)}" height="${(p1[1] - p0[1]).toFixed(1)}" fill="${haze('#04070B', z)}"/>`;
        near += `<ellipse cx="${p1[0].toFixed(1)}" cy="${p1[1].toFixed(1)}" rx="${(cw * 0.5).toFixed(1)}" ry="${(cw * 0.09).toFixed(1)}" fill="${haze('#04070B', z)}"/>`;
      }
      rows += far + near;
    }

    const host = Q.div(parent, 'qr-abs', { width: W + 'px', height: H + 'px' });
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:block">
<defs>
  <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#081120"/><stop offset=".55" stop-color="#0E2036"/><stop offset="1" stop-color="#1B3B58"/></linearGradient>
  <linearGradient id="${id}fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#11253A"/><stop offset=".35" stop-color="#0A1522"/><stop offset="1" stop-color="#04070B"/></linearGradient>
  <linearGradient id="${id}st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3C7FB0" stop-opacity=".26"/><stop offset="1" stop-color="#3C7FB0" stop-opacity="0"/></linearGradient>
  <linearGradient id="${id}ce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#030508"/><stop offset="1" stop-color="#08101A"/></linearGradient>
  <linearGradient id="${id}sb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1E6F78"/><stop offset="1" stop-color="#123E5C"/></linearGradient>
  <filter id="${id}b2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="${id}b5" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="6.5"/></filter>
  <filter id="${id}b12" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="12"/></filter>
  <clipPath id="${id}gl"><rect x="${x0.toFixed(1)}" y="${yHead.toFixed(1)}" width="${(x1 - x0).toFixed(1)}" height="${(ySill - yHead).toFixed(1)}"/></clipPath>
</defs>
<rect width="${W}" height="${H}" fill="#04070B"/>
<rect x="${x0.toFixed(1)}" y="${yHead.toFixed(1)}" width="${(x1 - x0).toFixed(1)}" height="${(ySill - yHead).toFixed(1)}" fill="url(#${id}sky)"/>
<g clip-path="url(#${id}gl)"><g filter="url(#${id}b2)">${towers}${lights}</g><g filter="url(#${id}b5)">${bokeh}</g></g>
${mull}
<rect x="0" y="${P(0, 1.9, ZB)[1].toFixed(1)}" width="${W}" height="7" fill="#04070B"/>
<rect x="0" y="0" width="${W}" height="${yHead.toFixed(1)}" fill="url(#${id}ce)"/>${fixtures}
<rect x="0" y="${ySill.toFixed(1)}" width="${W}" height="${(yFloor - ySill).toFixed(1)}" fill="#060B12"/>
<rect x="0" y="${yFloor.toFixed(1)}" width="${W}" height="${(H - yFloor).toFixed(1)}" fill="url(#${id}fl)"/>${streaks}
${rows}
</svg>`;
    const sbs = [...host.querySelectorAll('.sb')].map((e) => [e, +(e.getAttribute('opacity') || 1)]);
    let last = -1;
    return {
      el: host,
      // k: standby glow multiplier (slow breathing)
      set(k) { if (Math.abs(k - last) < 0.004) return; last = k; sbs.forEach(([e, o]) => e.setAttribute('opacity', (o * k).toFixed(3))); },
    };
  };
})();
