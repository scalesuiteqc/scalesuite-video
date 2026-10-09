/* « Le lead perdu » : shared timing, palettes and components.
   The whole film's timing lives in SS.LT (one place), so scenes stay in sync and the storyboard can be
   checked against a single table. The lead card is the film's single visual thread: same size, same
   content, born twice from the same ad (problem world, then ScaleSuite world). */
(function () {
  const SS = window.SS;

  SS.LT = {
    // Act 1 · hook (0–3.0)
    tap0: 0.5, squeeze0: 0.6, lead0: 0.82, ask: 1.25, look: 1.45, hookOut: 3.0,
    // Act 2 · shared inbox (3.0–5.6), time passes (5.6–8.4), too late (8.4–10.8)
    inbox: 3.05, inboxHead: 3.2, rows: 3.3, unread: 3.62, inboxOut: 5.42,
    stillHead: 5.8, c1: 5.9, c2: 6.45, c3: 7.05, stillOut: 8.32,
    tapLate: 8.45, opened: 8.55, gray: 8.62, late: 9.05, signed: 9.35, rewind: 10.8,
    // Act 3 · with ScaleSuite (10.8–12.95)
    contract: 11.05, bloom: 11.2, mark: 11.3, avec: 11.32, meme: 11.5, letters: 11.45, avecOut: 12.82,
    // campaigns (12.95–16.55)
    dock: 12.95, campRows: 13.12, campHead: 13.15, weekly: 13.55, halo: 14.75, adMorph: 14.9, adText: 15.08,
    // the lead reaches Courtier 03 (16.55–21.0)
    tapAd: 16.55, squeeze1: 16.62, lead1: 16.84, travel: 17.0, land: 17.62, nouveau: 17.72, chezHead: 17.55,
    whip: 19.0, notif: 19.4, crmChk: 19.9, chezOut: 20.95,
    // end card (21.0–25.2)
    line: 21.0, handoff: 21.5, merge: 21.55, endMark: 21.82, endLetters: 22.0, tag: 22.12, cta: 22.22, url: 22.42, sheen: 23.4, nudge: 24.2, end: 25.2,
  };

  // Problem world (cool, desaturated) next to the V3 ScaleSuite tokens in SS.C.
  SS.P = { bg: '#EEF1F4', card: '#FAFBFC', ink: '#2B3138', soft: '#6B7480', slate: '#6E8092', line: '#E3E8ED',
    avFg: '#8796A6', avBg: '#E1E6EB', link: '#3F5F86', gray: '#E4E7EB', grayPill: '#A9B0B8', grayText: '#8E969F' };
  SS.SHADOW = {
    p: '0 1px 2px rgba(30,40,52,.07), 0 14px 34px -14px rgba(40,56,74,.26), 0 0 0 1px rgba(30,40,52,.05)',
    pHi: '0 2px 4px rgba(30,40,52,.08), 0 30px 60px -26px rgba(40,56,74,.38), 0 0 0 1px rgba(30,40,52,.05)',
    m: '0 1px 2px rgba(18,44,40,.06), 0 14px 34px -14px rgba(18,74,66,.26), 0 0 0 1px rgba(26,26,26,.045)',
    mHi: '0 2px 4px rgba(18,44,40,.08), 0 40px 80px -30px rgba(18,74,66,.40), 0 0 0 1px rgba(26,26,26,.05)',
  };
  SS.clipR = (t, r, b, l, rad) => `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px)`;
  SS.OPEN = SS.clipR(-80, -80, -80, -80, 114); // fully open, shadow included

  // ---- The lead card: 840 × 230. Status chips are stacked in one slot and swapped by masks.
  SS.LEAD = { w: 840, h: 230 };
  SS.leadCard = (parent, o = {}) => {
    const el = SS.el('div', 'lp-card', parent);
    Object.assign(el.style, { width: SS.LEAD.w + 'px', height: SS.LEAD.h + 'px', background: '#fff', boxShadow: o.shadow || SS.SHADOW.pHi });
    el.innerHTML = `<div class="in" style="position:absolute;inset:0">
        <div class="pill lp-pill" style="position:absolute;left:34px;top:30px"><span class="dt"></span>LEAD VENDEUR</div>
        <div class="slot" style="position:absolute;right:34px;top:30px;height:60px;width:420px;overflow:hidden"></div>
        <div class="ti" style="position:absolute;left:34px;top:110px;font-size:40px;font-weight:720;letter-spacing:-.02em;color:${SS.P.ink};white-space:nowrap">Maison à vendre · Longueuil</div>
        <div class="tm" style="position:absolute;left:34px;top:166px;font-size:32px;font-weight:600;letter-spacing:-.01em;color:${SS.P.soft};white-space:nowrap">Google Ads · mar. 21 h 04</div></div>`;
    const slot = el.querySelector('.slot');
    const chips = {};
    (o.chips || []).forEach(([key, html, bg, fg]) => {
      const c = SS.el('div', 'lp-chip', slot);
      Object.assign(c.style, { position: 'absolute', right: '0px', top: '4px', background: bg, color: fg });
      c.innerHTML = html;
      chips[key] = c;
    });
    return { el, in: el.querySelector('.in'), pill: el.querySelector('.pill'), ti: el.querySelector('.ti'), tm: el.querySelector('.tm'), chips };
  };

  // Sponsored Google result, 900 × 250 (label "Commandité", fr-CA).
  SS.adCardLP = (parent, o = {}) => {
    const el = SS.el('div', 'lp-card', parent);
    Object.assign(el.style, { width: '900px', height: '250px', borderRadius: '26px', background: '#fff', padding: '32px 36px', boxShadow: o.shadow || SS.SHADOW.p });
    const sub = o.sub
      ? `<div style="margin-top:14px;font-size:32px;font-weight:600;color:${o.soft || SS.P.soft};white-space:nowrap">${o.sub}</div>`
      : `<div class="skel" style="margin-top:24px;width:78%;height:14px;background:${o.skel || '#E3E8ED'}"></div><div class="skel" style="margin-top:12px;width:52%;height:14px;background:${o.skel || '#E3E8ED'}"></div>`;
    el.innerHTML = `<div class="ct"><div style="font-size:30px;font-weight:750;color:${o.ink || SS.P.ink};white-space:nowrap">Commandité<span style="font-weight:500;color:${o.soft || SS.P.soft}"> · votreagence.ca</span></div>
      <div style="margin-top:12px;font-size:44px;font-weight:650;letter-spacing:-.02em;color:${o.link || SS.P.link};white-space:nowrap">Vendre votre maison à Longueuil</div>${sub}</div>`;
    return { el, ct: el.querySelector('.ct') };
  };

  // Tap ripple (finger press): {el} placed at (x, y); the timeline call is the caller's.
  SS.ripple = (parent, color) => {
    const r = SS.el('div', 'a3', parent);
    Object.assign(r.style, { width: '170px', height: '170px', borderRadius: '50%', background: color.fill, boxShadow: `inset 0 0 0 4px ${color.ring}` });
    return r;
  };
  SS.tap = (r, x, y, at) => {
    SS.place(r, x, y, { scale: 0.15, autoAlpha: 0 });
    SS.tl.fromTo(r, { scale: 0.15, autoAlpha: 0.95 }, { scale: 1.5, autoAlpha: 0, duration: 0.55, ease: SS.EZ.out }, at);
  };

  // Headline scrim tinted for either world.
  SS.scrimTo = (parent, h, rgb) => {
    const sc = SS.el('div', 'a3', parent);
    Object.assign(sc.style, { width: '1080px', height: h + 'px',
      background: `linear-gradient(180deg, rgb(${rgb}) 0%, rgb(${rgb}) 64%, rgba(${rgb},.85) 78%, rgba(${rgb},0) 100%)` });
    return sc;
  };

  // A rolling value in a fixed window (clock chip): column of lines, GSAP tweens its yPercent.
  SS.roller = (parent, values, o = {}) => {
    const win = SS.el('span', '', parent);
    Object.assign(win.style, { display: 'inline-block', overflow: 'hidden', height: o.h + 'px', verticalAlign: 'top' });
    const col = SS.el('span', '', win);
    Object.assign(col.style, { display: 'flex', flexDirection: 'column' });
    values.forEach((v) => {
      const d = SS.el('span', '', col);
      Object.assign(d.style, { display: 'block', height: o.h + 'px', lineHeight: o.h + 'px', whiteSpace: 'nowrap', textAlign: o.align || 'right' });
      d.textContent = v;
    });
    const step = 100 / values.length;
    let cur = 0;
    gsap.set(col, { yPercent: 0 });
    return {
      win, col,
      to(at, i, dur = 0.4, ease = SS.EZ.inOut) {
        SS.tl.fromTo(col, { yPercent: -step * cur }, { yPercent: -step * i, duration: dur, ease }, at);
        cur = i;
      },
    };
  };
})();
