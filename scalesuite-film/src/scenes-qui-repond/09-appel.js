/* Scene 9 · Appel à l'action. The voice: « Commente « 5 minutes », pis je te prépare le diagnostic de ton
   secteur. » On the mint backdrop (hard cut from scene 8).
   « Commente [5 MINUTES]. » is TYPED, the chip ON « cinq minutes ». A faithful, generic comment thread (social
   network layout, no platform logo): the comment « 5 MINUTES » comes from « toi » (neutral avatar); the reply
   comes from « Mathieu » with his real profile photo, round and sharp, ON « pis je te prépare… ».
   End: the light-background logo and « On livre, ou le mois est gratuit. », no ring, no halo.
   9:16 only: a white banner pinned at the top during the whole scene. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s9', w, QR.cue('s9', w));

  const T = { type: cue('commente'), chip: cue('cinqMinutes'), chipDur: 0.3, reply: cue('pis') };
  T.key = T.chip + 0.05; T.keyDur = 0.3; T.post = T.chip + 0.48; T.out = QR.VO.s9.voice[1] - 0.06; T.outDur = 0.2; T.logo = T.out + 0.12; T.tag = T.logo + 0.2;
  const SEG = [{ t: 'Commente ' }, { t: '5 MINUTES', chip: true }, { t: '.' }];
  const N1 = SEG[0].t.length, N2 = N1 + SEG[1].t.length + 1;
  const L = Q.pick(
    { head: 92, headY: 200, w: 1120, cardY: 590, s: 1, logoH: 230, logoY: 448, tag: 62, tagY: 684, banner: false },
    { head: 64, headY: 500, w: 1120, cardY: 900, s: 0.84, logoH: 150, logoY: 820, tag: 46, tagY: 990, banner: true },
  );
  const KEY = '5 MINUTES';
  const neutral = (d) => `<span style="width:${d}px;height:${d}px;border-radius:50%;flex:none;display:block">${SS.icon.person('#8FA5A2', '#DCE9E6')}</span>`;
  const meta = (t) => `<div style="margin-top:8px;display:flex;gap:26px;font-size:24px;font-weight:650;color:#6B7780"><span>${t}</span><span>J’aime</span><span>Répondre</span></div>`;

  let R;
  function build(layer) {
    Q.day(layer);
    const ui = Q.div(layer, 'qr-abs', { width: Q.W + 'px', height: Q.H + 'px', transformOrigin: '50% 45%' });
    const head = Q.typed(ui, SEG, { size: L.head, weight: 750, color: Q.C.ink, caretColor: Q.C.ink });
    const card = Q.div(ui, 'qr-abs', { width: L.w + 'px', height: '470px', borderRadius: '36px', background: '#fff', color: Q.C.ink,
      boxShadow: '0 2px 4px rgba(18,44,40,.06), 0 50px 90px -34px rgba(10,70,64,.42), 0 0 0 1px rgba(26,26,26,.05)', overflow: 'hidden' });
    card.innerHTML = `
      <div style="height:74px;display:flex;align-items:center;justify-content:center;border-bottom:1.5px solid #E9EEF0;font-size:28px;font-weight:760;letter-spacing:-.02em">Commentaires</div>
      <div class="c1" style="position:absolute;left:36px;right:36px;top:104px;display:flex;gap:20px;transform-origin:0 50%">${neutral(76)}
        <div><div style="font-size:36px;line-height:1.25;letter-spacing:-.015em"><b style="font-weight:780">toi</b>&nbsp; ${KEY}</div>${meta('À l’instant')}</div></div>
      <div class="c2" style="position:absolute;left:132px;right:36px;top:226px;display:flex;gap:18px;transform-origin:0 50%">
        <img src="assets/photos/mathieu.jpg" alt="" style="width:66px;height:66px;border-radius:50%;flex:none;object-fit:cover;object-position:50% 30%">
        <div style="white-space:normal"><div style="font-size:36px;line-height:1.25;letter-spacing:-.015em"><b style="font-weight:780">Mathieu</b>&nbsp; Je te prépare le Diagnostic de ton secteur.</div>${meta('À l’instant')}</div></div>
      <div style="position:absolute;left:0;right:0;bottom:0;height:104px;border-top:1.5px solid #E9EEF0;display:flex;align-items:center;gap:20px;padding:0 36px;box-sizing:border-box">${neutral(60)}
        <div style="flex:1;height:64px;border-radius:32px;box-shadow:inset 0 0 0 2px #DDE5E8;display:flex;align-items:center;padding:0 26px;font-size:30px"><span class="tx" style="font-weight:650"></span><span class="ph" style="color:#9AA7AD">Ajouter un commentaire…</span></div>
        <span class="btn" style="font-size:30px;font-weight:760;color:${Q.C.turqText || '#14A89B'}">Publier</span></div>`;
    const lbox = Q.div(layer, 'qr-abs');
    const logo = SS.logo(lbox, L.logoH, {});
    Object.assign(lbox.style, { width: logo.w + 'px', height: logo.h + 'px' });
    logo.mark(1);
    const tag = Q.phrase(layer, [[{ t: 'On livre, ou le mois est gratuit.' }]], { size: L.tag, weight: 700, color: Q.C.ink });
    let banner = null;
    if (L.banner) {
      banner = Q.div(layer, 'qr-abs', { width: '960px', padding: '26px 0 28px', borderRadius: '30px', background: '#fff', color: Q.C.ink, textAlign: 'center', whiteSpace: 'nowrap',
        fontSize: '36px', fontWeight: 720, letterSpacing: '-.02em', lineHeight: 1.25, boxShadow: '0 30px 60px -30px rgba(10,70,64,.42), 0 0 0 1px rgba(26,26,26,.05)' });
      banner.innerHTML = 'Commente « 5 MINUTES » pour recevoir<br>le Diagnostic de ton secteur';
    }
    R = { ui, head, card, c1: card.querySelector('.c1'), c2: card.querySelector('.c2'), tx: card.querySelector('.tx'), ph: card.querySelector('.ph'), btn: card.querySelector('.btn'), lbox, logo, tag, banner };
  }

  function render(u) {
    const out = Q.k(u, T.out, T.outDur, Q.E.in);
    R.ui.style.transform = `scale(${Q.lerp(1, 0.94, out).toFixed(4)})`;
    R.ui.style.opacity = (1 - out).toFixed(3);
    R.ui.style.visibility = out >= 0.999 ? 'hidden' : 'visible';
    R.ui.style.filter = out > 0.004 ? `blur(${(out * 14).toFixed(2)}px)` : 'none';

    const n = u < T.chip ? Math.min(N1, Q.typeN(u, T.type, N1 / (T.chip - T.type - 0.06), N1)) : N1 + Q.typeN(u, T.chip, (N2 - N1) / T.chipDur, N2 - N1);
    R.head.put(n, Q.CX, L.headY, { o: u >= T.type - 0.02 ? 1 : 0, caret: u < T.post && (n < N2 || ((u - T.chip) * 2) % 1 < 0.6) });
    const kc = Q.k(u, 0.02, 0.5, Q.E.springSoft);
    Q.st(R.card, { x: Q.CX, y: L.cardY + (1 - kc) * 140, s: L.s * Q.lerp(0.95, 1, kc), o: Q.k(u, 0.02, 0.16, Q.E.sine) });
    const typed = Math.floor(Q.typeN(u, T.key, KEY.length / T.keyDur, KEY.length)), posted = u >= T.post;
    R.tx.textContent = posted ? '' : KEY.slice(0, typed);
    R.ph.style.display = !posted && typed > 0 ? 'none' : '';
    const pr = Q.env(u, T.post - 0.08, 0.06, T.post, 0.16);
    R.btn.style.transform = `scale(${(1 - 0.1 * pr).toFixed(4)})`;
    const k1 = Q.k(u, T.post, 0.36, Q.E.springSoft), k2 = Q.k(u, T.reply, 0.38, Q.E.springSoft);
    R.c1.style.transform = `translateY(${((1 - k1) * 30).toFixed(2)}px)`; R.c1.style.opacity = Q.k(u, T.post, 0.1, Q.E.sine).toFixed(3);
    R.c2.style.transform = `translateY(${((1 - k2) * 30).toFixed(2)}px)`; R.c2.style.opacity = Q.k(u, T.reply, 0.1, Q.E.sine).toFixed(3);

    // final logo: the symbol on a soft spring, the word slides out from behind it, then the promise
    const v = u - T.logo, km = Q.k(v, 0, 0.46, Q.E.springSoft), kw = Q.k(v, 0.12, 0.46, Q.E.out);
    Q.st(R.lbox, { x: Q.CX + (1 - kw) * R.logo.w * 0.36, y: L.logoY, s: Q.lerp(0.7, 1, km), o: v >= 0 ? 1 : 0 });
    R.logo.letters.forEach((g, i) => g.setAttribute('transform', `translate(${(-(1 - Q.k(v, 0.12 + i * 0.012, 0.44, Q.E.out)) * 420).toFixed(2)} 0)`));
    R.tag.put(Q.CX, L.tagY, u, { at: [T.tag] });
    if (R.banner) { const kb = Q.k(u, 0.05, 0.5, Q.E.springSoft); Q.st(R.banner, { x: Q.CX, y: 150 - (1 - kb) * 200, o: 1 }); }
  }

  QR.scene({ id: 's9', build, render, cuts: [0, T.reply, T.logo] });
})();
