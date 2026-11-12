/* Scene 9 · Appel à l'action (9 beats, 40,0 – 45,0 s). In the light, on the mint backdrop of the site.
   « Commente [5 MINUTES]. » is TYPED (the call to action keeps the letter by letter typing). A generic
   comment field (no platform logo) where « 5 MINUTES » is typed and posted; the reply arrives as a card
   signed Mathieu: « Je te prépare le Diagnostic de ton secteur. ». Then the final logo (light-background
   version) and « On livre, ou le mois est gratuit. ».
   9:16 only: a white banner pinned at the top during the whole scene. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR, b = QR.b;

  const T = {
    type: 0.02, cps: 30,                 // headline, typed
    field: 0.04,                         // the comment field rises
    key: b(1), keyCps: 22,               // « 5 MINUTES » typed in the field
    press: b(2) - 0.07, post: b(2),      // « Publier », the comment is posted on beat 2
    reply: b(3),                         // the reply card
    out: b(5.5), outDur: 0.26,           // everything gathers and leaves
    rings: [b(6) - 0.04, b(6) + 0.08], ringDur: 0.85,
    mark: b(6) - 0.14, markDur: 0.6, letters: b(6), sheen: b(8),
    tag: b(7),                           // « On livre, ou le mois est gratuit. »
  };
  const L = Q.pick(
    { head: 88, headY: 226, w: 920, us: 1.3, fieldY: 436, replyY: 664, replyX: 1012, logoH: 230, logoY: 448, tag: 60, tagY: 682, banner: false },
    { head: 62, headY: 520, w: 920, us: 1.08, fieldY: 760, replyY: 960, replyX: 583, logoH: 150, logoY: 820, tag: 46, tagY: 990, banner: true },
  );
  const KEY = '5 MINUTES';
  const avatar = `<span style="width:76px;height:76px;border-radius:50%;flex:none;display:block">${SS.icon.person('#8FA5A2', '#DCE9E6')}</span>`;

  let R;
  function build(layer) {
    Q.day(layer);
    const ui = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 45%' });
    const head = Q.typed(ui, [{ t: 'Commente ' }, { t: KEY, chip: true }, { t: '.' }], { size: L.head, weight: 680, color: Q.C.ink, caretColor: Q.C.ink });
    const shadow = '0 2px 4px rgba(18,44,40,.06), 0 40px 70px -30px rgba(10,70,64,.42), 0 0 0 1px rgba(26,26,26,.05)';
    const row = { display: 'flex', alignItems: 'center', gap: '22px', boxSizing: 'border-box', background: '#fff', color: Q.C.ink, whiteSpace: 'nowrap', boxShadow: shadow };
    const field = Q.div(ui, 'qr-abs', Object.assign({ width: L.w + 'px', height: '116px', borderRadius: '58px', padding: '0 20px 0 20px' }, row));
    field.innerHTML = `${avatar}<span class="tx" style="font-size:42px;font-weight:720;letter-spacing:-.01em;flex:1"></span>
      <span class="btn" style="height:76px;padding:0 34px;border-radius:38px;background:${Q.C.turq};color:${Q.C.chipInk};display:grid;place-items:center;font-size:30px;font-weight:740">Publier</span>`;
    const posted = Q.div(ui, 'qr-abs', Object.assign({ width: L.w + 'px', height: '124px', borderRadius: '34px', padding: '0 30px 0 24px' }, row));
    posted.innerHTML = `${avatar}<span><span style="display:block;font-size:26px;font-weight:650;color:#5B6875;line-height:1.2">Toi</span><span style="display:block;font-size:42px;font-weight:780;letter-spacing:-.01em;line-height:1.15">${KEY}</span></span>`;
    // reply, signed Mathieu (initial in a circle, no logo)
    const reply = Q.div(ui, 'qr-abs', Object.assign({ width: L.w - 80 + 'px', borderRadius: '34px', padding: '26px 34px 28px 24px', alignItems: 'flex-start' }, row));
    reply.innerHTML = `<span style="width:76px;height:76px;border-radius:50%;flex:none;display:grid;place-items:center;background:${Q.C.turq};color:${Q.C.chipInk};font-size:36px;font-weight:800">M</span>
      <span style="white-space:normal"><span style="display:block;font-size:26px;font-weight:650;color:#5B6875;line-height:1.2">Mathieu</span><span style="display:block;font-size:40px;font-weight:700;letter-spacing:-.022em;line-height:1.2;margin-top:4px">Je te prépare le Diagnostic de ton secteur.</span></span>`;
    const rings = T.rings.map(() => Q.div(layer, 'qr-abs', { width: '420px', height: '420px', borderRadius: '50%', boxSizing: 'border-box', border: `30px solid ${Q.C.turq}` }));
    const lbox = Q.div(layer, 'qr-abs');
    const logo = SS.logo(lbox, L.logoH, {});
    Object.assign(lbox.style, { width: logo.w + 'px', height: logo.h + 'px' });
    const tag = Q.phrase(layer, [[{ t: 'On livre, ou le mois est gratuit.' }]], { size: L.tag, weight: 650, color: Q.C.ink });
    let banner = null;
    if (L.banner) {
      banner = Q.div(layer, 'qr-abs', { width: '960px', padding: '26px 0 28px', borderRadius: '30px', background: '#fff', color: Q.C.ink, textAlign: 'center', whiteSpace: 'nowrap',
        fontSize: '36px', fontWeight: 720, letterSpacing: '-.02em', lineHeight: 1.25, boxShadow: shadow });
      banner.innerHTML = 'Commente « 5 MINUTES » pour recevoir<br>le Diagnostic de ton secteur';
    }
    R = { ui, head, field, tx: field.querySelector('.tx'), btn: field.querySelector('.btn'), posted, reply, rings, lbox, logo, tag, banner };
  }

  function render(u) {
    const out = Q.k(u, T.out, T.outDur, Q.E.in);
    R.ui.style.transform = `scale(${Q.lerp(1, 0.9, out).toFixed(4)})`;
    R.ui.style.opacity = (1 - out).toFixed(3);
    R.ui.style.visibility = out >= 0.999 ? 'hidden' : 'visible';
    R.ui.style.filter = out > 0.004 ? `blur(${(out * 16).toFixed(2)}px)` : 'none';

    R.head.put(Q.typeN(u, T.type, T.cps, R.head.N), Q.CX, L.headY, { o: u >= T.type - 0.02 ? 1 : 0, caret: Q.caretOn(u, T.type, T.cps, R.head.N, T.key) });
    const kf = Q.k(u, T.field, 0.5, Q.E.springSoft), posted = Q.k(u, T.post, 0.4, Q.E.spring);
    Q.st(R.field, { x: Q.CX, y: L.fieldY + (1 - kf) * 120, s: L.us * Q.lerp(0.9, 1, kf), o: Q.k(u, T.field, 0.16, Q.E.sine) * (1 - Q.k(u, T.post, 0.1, Q.E.sine)), blur: (1 - Q.k(u, T.field, 0.3, Q.E.out)) * 10 });
    const n = Math.floor(Q.typeN(u, T.key, T.keyCps, KEY.length));
    R.tx.textContent = KEY.slice(0, n) + (u >= T.key - 0.2 && u < T.post && (n < KEY.length || ((u - T.key) * 2.2) % 1 < 0.6) ? '|' : '');
    const pr = Q.env(u, T.press, 0.06, T.press + 0.07, 0.16);
    R.btn.style.transform = `scale(${(1 - 0.08 * pr).toFixed(4)})`;
    Q.st(R.posted, { x: Q.CX, y: L.fieldY, s: L.us * Q.lerp(0.94, 1, posted), o: Q.k(u, T.post, 0.1, Q.E.sine) });
    const kr = Q.k(u, T.reply, 0.46, Q.E.spring);
    Q.st(R.reply, { x: L.replyX, y: L.replyY + (1 - kr) * 60, s: L.us * Q.lerp(0.8, 1, kr), o: Q.k(u, T.reply, 0.12, Q.E.sine), blur: (1 - Q.k(u, T.reply, 0.26, Q.E.out)) * 8 });

    R.rings.forEach((r, i) => {
      const k = Q.k(u, T.rings[i], T.ringDur, Q.E.out), v = k - Q.k(u - 1 / 60, T.rings[i], T.ringDur, Q.E.out);
      Q.st(r, { x: Q.CX, y: L.logoY, s: Q.lerp(0.1, 3.6 - i * 0.6, k), o: u < T.rings[i] ? 0 : (1 - Q.k(u, T.rings[i] + 0.05, T.ringDur - 0.05, Q.E.sine)) * 0.5, blur: Math.min(10, v * 160) });
    });
    Q.st(R.lbox, { x: Q.CX, y: L.logoY, s: Q.lerp(0.88, 1, Q.k(u, T.mark, 0.6, Q.E.out)), o: u >= T.mark ? 1 : 0 });
    R.logo.mark(Q.clamp((u - T.mark) / T.markDur));
    R.logo.word(u, T.letters, 0.03, 0.5);
    R.logo.sheen(Q.clamp((u - T.sheen) / 0.6));
    R.tag.put(Q.CX, L.tagY, u, { at: [T.tag] });
    if (R.banner) { const kb = Q.k(u, 0.05, 0.6, Q.E.springSoft); Q.st(R.banner, { x: Q.CX, y: 150 - (1 - kb) * 200, o: 1 }); }
  }

  QR.scene({ id: 's9', build, render, cuts: [0, T.reply, b(6)] });
})();
