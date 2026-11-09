/* « Dimanche, 21 h 14 » · scenes 4 and 5, still in world B (camera of 04-recherche.js).
   4 · Within the minute (9.4–13.2): the page compresses into an ink token (anticipation, then clip);
       the camera follows it down to Sophie's phone; it lands in her messages and unfolds into the text
       sent from the team's number, signed by Julie (pop spring, phone vibration). « Envoyé en moins
       d'une minute ».
   5 · Your Sunday, then Monday (13.2–17.8): whip pan to the leader's phone, standing on the floor, silent
       (Sunday 8 November, 21:15, no notification). The play bar takes the story to Monday 9:00 while the
       camera pans to Julie's phone: the Messages notice received the evening before, without a sound. The
       finger opens it (notice → thread, shared element), the number is underlined, the finger taps it:
       « Appel à Sophie ».
   Exit (17.8): world B leaves through the top (camera down), Marc's card rises (06-marc.js). */
(function () {
  const SS = window.SS, T = SS.DT, C = SS.DC;
  const SO = { cx: 540, top: 2200 };           // Sophie's phone (scale 1)
  const LE = { cx: 1940, top: 2190, s: 0.55 };  // the leader's phone, whole, standing
  const JU = { cx: 3340, top: 2200, s: 0.8 };   // Julie's phone
  const CAMY = 2560;                            // phone tops at y 600 on screen
  const P = { tok: 0, shakeS: 0, morph: 0, pblur: 0 };

  function statusBar(scr, time, size = 34) {
    const b = SS.el('div', 'dm', scr);
    Object.assign(b.style, { left: '64px', top: '30px', fontSize: size + 'px', fontWeight: 650, color: C.ink, letterSpacing: '-.01em' });
    b.textContent = time;
  }

  let R;
  function build() {
    const { w, cam, page, title, PG } = SS.WB;
    const PGC = { x: 540, y: PG.top + PG.h / 2 };

    // ================================================================ 4 · the page becomes a token
    const ink = SS.el('div', 'dm', page);
    Object.assign(ink.style, { left: 0, top: 0, width: '100%', height: '100%', background: C.ink });
    gsap.set(ink, { autoAlpha: 0 });
    const TOK = { w: 520, h: 110 };
    const tokClip = SS.clipR((PG.h - TOK.h) / 2, (PG.w - TOK.w) / 2, (PG.h - TOK.h) / 2, (PG.w - TOK.w) / 2, TOK.h / 2);
    SS.tl.fromTo(page, { scale: 1 }, { scale: 1.02, duration: 0.1, ease: 'power2.out' }, T.squeeze);
    SS.tl.fromTo(page, { scale: 1.02 }, { scale: 1, duration: 0.12, ease: 'power2.in' }, T.squeeze + 0.1);
    SS.tl.fromTo(page, { clipPath: SS.OPEN }, { clipPath: tokClip, duration: 0.22, ease: SS.EZ.inOut }, T.squeeze);
    SS.tl.fromTo(ink, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, ease: 'power1.in' }, T.squeeze + 0.03);
    // the form blurs as the ink covers it (skill emil-design-eng: blur bridges a crossfade into one transformation)
    SS.tl.fromTo(P, { pblur: 0 }, { pblur: 3, duration: 0.18, ease: 'power1.in' }, T.squeeze + 0.02);
    SS.tl.fromTo(title, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.12, ease: 'power1.in' }, T.squeeze + 0.02);
    SS.tl.set(page, { autoAlpha: 0 }, T.token);
    // the token (ink, the only dark element of the film)
    const tok = SS.el('div', 'dm', w);
    Object.assign(tok.style, { width: TOK.w + 'px', height: TOK.h + 'px', borderRadius: TOK.h / 2 + 'px', background: C.ink, overflow: 'hidden',
      boxShadow: '0 20px 40px -18px rgba(10,20,24,.55)' });
    tok.innerHTML = `<div class="tx" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:16px;color:#fff;font-size:36px;font-weight:700;letter-spacing:-.01em;white-space:nowrap">
      <span style="width:34px;height:34px;display:block">${SS.icon.arrow('#1FBFA8')}</span>Demande de Sophie</div>`;
    const tokTx = tok.querySelector('.tx');
    gsap.set(tok, { autoAlpha: 0 });
    gsap.set(tokTx, { autoAlpha: 0 });
    SS.tl.set(tok, { autoAlpha: 1 }, T.token);
    SS.tl.fromTo(tokTx, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.16, ease: 'power1.out' }, T.token);
    SS.tl.fromTo(P, { tok: 0 }, { tok: 1, duration: T.land - T.token - 0.05, ease: SS.EZ.inOut }, T.token + 0.02);
    SS.cue(T.token, 'm-token');
    // camera follows the token down to Sophie's phone (speed blur on the way)
    cam.to(T.token, T.land - T.token, SS.EZ.inOut, { y: CAMY, s: 1 });
    cam.fx(T.token + 0.1, 0.18, 'power2.in', { blur: 0 }, { blur: 6 });
    cam.fx(T.token + 0.28, 0.24, 'power2.out', { blur: 6 }, { blur: 0 });

    // ---- Sophie's phone: messages from the team's number
    const shS = SS.el('div', 'dm', w);
    const ph = SS.D.phone(shS, { wall: 'linear-gradient(180deg,#FBFDFD,#F3F8F8)' });
    SS.place(ph.el, SO.cx, SO.top + ph.H / 2);
    statusBar(ph.scr, '21:14');
    const head = SS.el('div', 'dm', ph.scr);
    Object.assign(head.style, { left: 0, top: '96px', width: '100%', height: '120px', borderBottom: `2px solid ${C.line}` });
    head.innerHTML = `<div style="position:absolute;left:34px;top:18px;width:24px;height:24px;border-left:5px solid ${C.teal};border-bottom:5px solid ${C.teal};transform:rotate(45deg);top:42px"></div>
      <span style="position:absolute;left:90px;top:22px;width:76px;height:76px;display:block">${SS.icon.person('#9AA7A4', '#E3EBEB')}</span>
      <div style="position:absolute;left:188px;top:34px;font-size:40px;font-weight:700;letter-spacing:-.01em;color:${C.ink};white-space:nowrap">514 555 0142</div>`;
    const dateL = SS.el('div', 'dm', ph.scr);
    Object.assign(dateL.style, { left: 0, top: '250px', width: '100%', textAlign: 'center', fontSize: '32px', fontWeight: 540, color: C.soft });
    dateL.textContent = 'dim. 8 nov., 21 h 14';
    const msg = SS.D.bubble(ph.scr, "Bonjour Sophie! Ici Julie, de l'Équipe Exemple. Merci pour votre demande. Je vous appelle demain dès 9 h.", { max: 680 });
    Object.assign(msg.style, { left: '36px', top: '310px' });
    const sent = SS.el('div', 'dm', ph.scr);
    Object.assign(sent.style, { left: '42px', top: '0px', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '34px', fontWeight: 680, color: C.teal, whiteSpace: 'nowrap' });
    sent.innerHTML = '<span class="ck" style="width:40px;height:40px;display:block"></span>Envoyé en moins d\'une minute';
    const chk = SS.check(sent.querySelector('.ck'), 40, C.turq);
    chk.el.style.position = 'static';
    // measured once the phone is laid out (world untransformed): where the bubble sits
    const mr = msg.getBoundingClientRect();
    const MSG = { x: mr.left + mr.width / 2, y: mr.top + mr.height / 2, w: msg.offsetWidth, h: msg.offsetHeight };
    sent.style.top = 310 + MSG.h + 26 + 'px';
    gsap.set(msg, { autoAlpha: 0 });
    gsap.set(sent, { autoAlpha: 0, y: 12 });
    shS.appendChild(tok); // above the phone, and it shakes with it once it has landed
    SS.tl.fromTo(msg, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15, ease: 'power1.out' }, T.land + 0.23);
    SS.tl.set(tok, { autoAlpha: 0 }, T.land + 0.45);
    // the token unfolds into the bubble (pop spring), its label fades out
    SS.tl.fromTo(tokTx, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.1, ease: 'power1.in' }, T.land - 0.06);
    SS.tl.fromTo(P, { morph: 0 }, { morph: 1, duration: 0.36, ease: SS.SPR.pop.ease }, T.land - 0.06);
    SS.tl.fromTo(P, { shakeS: 0 }, { shakeS: 1, duration: 0.42, ease: 'none' }, T.land + 0.05);
    SS.tl.fromTo(sent, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: SS.EZ.out }, T.sent);
    const PC = { k: 0 };
    SS.tl.fromTo(PC, { k: 0 }, { k: 1, duration: 0.5, ease: 'none' }, T.sent + 0.05);
    SS.cue(T.land, 'm-text');

    // ================================================================ 5a · the leader's phone, silent
    const leR = SS.el('div', 'dm', w);
    const contact = SS.el('div', 'a3', w);
    Object.assign(contact.style, { width: '520px', height: '50px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(8,40,52,.28), rgba(8,40,52,0))' });
    SS.place(contact, LE.cx, LE.top + 1700 * LE.s + 4);
    const lp = SS.D.phone(leR, { wall: 'linear-gradient(175deg,#F2FBFA 0%,#DDF2EE 55%,#CBE9E4 100%)' });
    lp.el.style.WebkitBoxReflect = 'below 4px linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,.15) 100%)';
    SS.place(lp.el, LE.cx, LE.top + (1700 * LE.s) / 2, { scale: LE.s });
    lp.scr.innerHTML = `<div style="position:absolute;left:0;right:0;top:230px;text-align:center;font-size:56px;font-weight:560;color:${C.soft}">dimanche 8 novembre</div>
      <div style="position:absolute;left:0;right:0;top:300px;text-align:center;font-size:300px;font-weight:300;letter-spacing:-.045em;color:${C.ink2};line-height:1.05">21:15</div>`;
    cam.to(T.pan1, 0.42, SS.EZ.inOut, { x: LE.cx });
    cam.fx(T.pan1 + 0.06, 0.14, 'power2.in', { blur: 0 }, { blur: 7 });
    cam.fx(T.pan1 + 0.2, 0.2, 'power2.out', { blur: 7 }, { blur: 0 });

    // ================================================================ 5b · Monday 9:00, Julie's phone
    const jp = SS.D.phone(w);
    SS.place(jp.el, JU.cx, JU.top + (1700 * JU.s) / 2, { scale: JU.s });
    jp.scr.innerHTML = `<div style="position:absolute;left:0;right:0;top:150px;text-align:center;font-size:46px;font-weight:560;color:${C.soft}">lundi 9 novembre</div>
      <div style="position:absolute;left:0;right:0;top:206px;text-align:center;font-size:230px;font-weight:300;letter-spacing:-.045em;color:${C.ink2};line-height:1.05">9:00</div>`;
    const note = SS.el('div', 'dm', jp.scr);
    Object.assign(note.style, { left: '28px', top: '500px', width: '728px', height: '250px', borderRadius: '44px', background: 'rgba(255,255,255,.94)',
      boxShadow: '0 2px 4px rgba(18,44,40,.06), 0 24px 50px -24px rgba(18,74,66,.40)' });
    note.innerHTML = `<div class="nc" style="position:absolute;inset:0">
        <span style="position:absolute;left:30px;top:30px;width:64px;height:64px;border-radius:18px;background:${C.turq};display:grid;place-items:center">
          <svg viewBox="0 0 24 24" style="width:40px;height:40px"><path d="M12 4.5c-4.7 0-8.5 3.1-8.5 7 0 2.2 1.2 4.1 3.1 5.4-.2 1.3-.9 2.4-1.8 3.2 1.9-.1 3.5-.8 4.6-1.8.8.2 1.7.3 2.6.3 4.7 0 8.5-3.1 8.5-7s-3.8-7.1-8.5-7.1z" fill="#fff"/></svg></span>
        <div style="position:absolute;left:116px;top:34px;font-size:44px;font-weight:720;letter-spacing:-.015em;color:${C.ink};white-space:nowrap">Équipe Exemple</div>
        <div style="position:absolute;right:34px;top:40px;font-size:40px;font-weight:540;color:${C.soft};white-space:nowrap">hier, 21 h 14</div>
        <div style="position:absolute;left:30px;right:30px;top:118px;font-size:42px;font-weight:500;line-height:1.25;letter-spacing:-.01em;color:${C.ink}">Nouveau vendeur : Sophie, condo, Rosemont. 514 555 0198</div></div>`;
    const nc = note.querySelector('.nc');
    // the thread (opens from the notice)
    const thr = SS.el('div', 'dm', jp.scr);
    Object.assign(thr.style, { left: 0, top: 0, width: '100%', height: '100%', background: '#FBFDFD' });
    statusBar(thr, '9:00', 40);
    const th = SS.el('div', 'dm', thr);
    Object.assign(th.style, { left: 0, top: '96px', width: '100%', height: '130px', borderBottom: `2px solid ${C.line}` });
    th.innerHTML = `<div style="position:absolute;left:34px;top:46px;width:26px;height:26px;border-left:5px solid ${C.teal};border-bottom:5px solid ${C.teal};transform:rotate(45deg)"></div>
      <span style="position:absolute;left:92px;top:22px;width:84px;height:84px;border-radius:50%;background:${C.team};color:#fff;display:grid;place-items:center;font-size:40px;font-weight:800;letter-spacing:-.02em">EE</span>
      <div style="position:absolute;left:198px;top:36px;font-size:46px;font-weight:720;letter-spacing:-.015em;color:${C.ink};white-space:nowrap">Équipe Exemple</div>`;
    const thDate = SS.el('div', 'dm', thr);
    Object.assign(thDate.style, { left: 0, top: '262px', width: '100%', textAlign: 'center', fontSize: '40px', fontWeight: 540, color: C.soft });
    thDate.textContent = 'hier, 21 h 14';
    const tb = SS.D.bubble(thr, 'Nouveau vendeur : Sophie, condo, Rosemont. <span class="num" style="position:relative;color:#1F5FAD;font-weight:620;white-space:nowrap">514 555 0198<span class="ul" style="position:absolute;left:0;right:0;bottom:-4px;height:4px;border-radius:2px;background:#1F5FAD;transform-origin:0 50%"></span></span>', { size: 44, max: 700 });
    Object.assign(tb.style, { left: '36px', top: '330px' });
    const ul = tb.querySelector('.ul'), num = tb.querySelector('.num');
    gsap.set(ul, { scaleX: 0 });
    const thClip0 = SS.clipR(500, 28, 1664 - 750, 28, 44);
    gsap.set(thr, { autoAlpha: 0, clipPath: thClip0 });
    gsap.set([th, thDate, tb], { autoAlpha: 0 });
    // the call screen
    const call = SS.el('div', 'dm', jp.scr);
    Object.assign(call.style, { left: 0, top: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg,#F7FCFB 0%,#E4F4F1 100%)' });
    call.innerHTML = `<span style="position:absolute;left:282px;top:250px;width:220px;height:220px;display:block">${SS.icon.person('#8FA3A1', '#DCE8E6')}</span>
      <div style="position:absolute;left:0;right:0;top:520px;text-align:center;font-size:64px;font-weight:720;letter-spacing:-.025em;color:${C.ink}">Appel à Sophie</div>
      <div style="position:absolute;left:0;right:0;top:612px;text-align:center;font-size:46px;font-weight:540;color:${C.soft}">514 555 0198</div>`;
    gsap.set(call, { yPercent: 100 });
    // measured: the notice and the number (world coordinates, world untransformed at build)
    const nr = note.getBoundingClientRect(), rr = num.getBoundingClientRect();
    cam.to(T.mon, T.monDur, SS.EZ.inOut, { x: JU.cx });
    cam.fx(T.mon + 0.12, 0.16, 'power2.in', { blur: 0 }, { blur: 3 });
    cam.fx(T.mon + 0.28, 0.22, 'power2.out', { blur: 3 }, { blur: 0 });
    const tp = SS.D.touch(w, 96);
    SS.D.tapAt(tp, nr.left + nr.width * 0.42, nr.top + nr.height * 0.55, T.tapNote);
    SS.tl.fromTo(note, { scale: 1 }, { scale: 0.97, duration: 0.08, ease: 'power2.out' }, T.tapNote);
    SS.tl.set(thr, { autoAlpha: 1 }, T.thread);
    SS.tl.fromTo(thr, { clipPath: thClip0 }, { clipPath: SS.clipR(0, 0, 0, 0, 96), duration: 0.4, ease: SS.EZ.inOut }, T.thread);
    // the thread's content is carried by the notice opening into it: together, a short fade, no second movement
    SS.tl.fromTo([th, thDate, tb], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' }, T.thread + 0.1);
    SS.tl.fromTo(ul, { scaleX: 0 }, { scaleX: 1, duration: 0.28, ease: SS.EZ.out }, T.under);
    const tp2 = SS.D.touch(w, 96);
    SS.D.tapAt(tp2, rr.left + rr.width / 2, rr.top + rr.height / 2, T.tapNum);
    SS.tl.fromTo(call, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: SS.EZ.out }, T.call);
    SS.cue(T.tapNum, 'sfx-call');
    // exit: world B leaves through the top (the camera keeps going down the story)
    SS.tl.fromTo(SS.WB.wrap, { y: 0 }, { y: -1800, duration: 0.42, ease: 'power2.in' }, T.s5Out + 0.05);
    cam.fx(T.s5Out + 0.1, 0.3, 'power2.in', { blur: 0 }, { blur: 7 });

    R = { tok, shS, msg, MSG, PGC, chk, PC };
    R.TOK = TOK;
  }
  const mix = (a, b, k) => a + (b - a) * k;
  function render(t) {
    // token path: from the page centre to the bubble, on a slight arc
    const u = P.tok, x = mix(R.PGC.x, R.MSG.x, u) + 90 * Math.sin(Math.PI * u), y = mix(R.PGC.y, R.MSG.y, u);
    const m = P.morph, w = mix(R.TOK.w, R.MSG.w, m), h = mix(R.TOK.h, R.MSG.h, m);
    const g = Math.round(mix(0x15, 0xE9, Math.min(1, m * 1.4))), g2 = Math.round(mix(0x15, 0xEF, Math.min(1, m * 1.4)));
    Object.assign(R.tok.style, { width: w.toFixed(2) + 'px', height: h.toFixed(2) + 'px', borderRadius: mix(R.TOK.h / 2, 38, Math.min(1, m)).toFixed(2) + 'px',
      background: `rgb(${g},${g2},${g2})`, transform: `translate(${(x - w / 2).toFixed(2)}px,${(y - h / 2).toFixed(2)}px)` });
    const k = P.shakeS, dx = k > 0 && k < 1 ? 7 * Math.sin(k * Math.PI * 2 * 3) * (1 - k) : 0;
    R.shS.style.transform = `translate(${dx.toFixed(2)}px,0px)`;
    R.chk.set(R.PC.k);
    SS.blur(SS.WB.pc, P.pblur);
  }
  const scene = { name: 'cells', a: -1, b: 99, render, ranges: [] };
  scene.build = () => { build(); };
  SS.scenes.push(scene);
})();
