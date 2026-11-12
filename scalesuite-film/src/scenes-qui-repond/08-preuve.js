/* Scene 8 · La preuve : a case study in four beats. The voice: « Pour le Groupe Mackay : 124 demandes depuis
   avril, à 54 $ de pub par demande. »
   One idea at a time, each figure with its counter and its short line, then the four together in a sober grid:
     1  [138]             demandes reçues depuis avril 2026            ON the figure in the voice
     2  [51 $]            de budget Google Ads par demande, en moyenne ON the figure in the voice
     3  [1 clic sur 20]   devient une demande                          during the end of the sentence
     4  [1 personne sur 10] qui voit l’annonce clique                  during the end of the sentence
   Footnote with the periods. No halo. Hard cut to scene 9.
   QR.OPT.clientName = false → no client name (« Une de nos équipes clientes »).
   QR.OPT.quote = {text, name, title} → shows the quote slot; it stays OFF (null) until the real quote arrives.
   Content rules: past results of one client, no promise of volume; 54 $ is Google Ads budget paid to Google,
   not a ScaleSuite price. François Mackay authorised the use of the name on 31 October 2026. */
(function () {
  const SS = window.SS, Q = SS.Q, QR = SS.QR;
  const cue = (w) => QR.sync('s8', w, QR.cue('s8', w));
  QR.OPT.quote = QR.OPT.quote || null;

  const T = { head: cue('pour'), n1: cue('n124'), n2: cue('n54'), count: 0.5 };
  T.grid1 = T.n2 - 0.22; T.grid2 = T.n2 + 0.78; T.n3 = T.n2 + 0.9; T.n4 = T.n2 + 1.14; T.foot = T.n3;
  const STATS = [
    { n: 138, fmt: (v) => String(Math.round(v)), label: 'demandes reçues depuis avril 2026' },
    { n: 51, fmt: (v) => Math.round(v) + ' $', label: 'de budget Google Ads par demande, en moyenne' },
    { text: '1 clic sur 20', label: 'devient une demande' },
    { text: '1 personne sur 10', label: 'qui voit l’annonce clique' },
  ];
  const NAME = () => (QR.OPT.clientName ? 'Groupe Mackay' : 'Une de nos équipes clientes');
  const FOOT = () => [(QR.OPT.clientName ? 'Groupe Mackay, client ScaleSuite. ' : 'Client ScaleSuite. ') + 'Données Google Ads. Demandes et budget depuis avril 2026.',
    'Taux de conversion : campagne Vendeurs, du 9 avril au 10 octobre 2026. Taux de clics : trois campagnes, du 9 juin au 9 juillet 2026.'];
  const L = Q.pick(
    { headY: 150, hero: { x: 960, y: 610, s: 1.45 }, cells: [[540, 340], [1380, 340], [540, 650], [1380, 650]], num: 104, label: 36, footY: 934, foot: 22 },
    { headY: 300, hero: { x: 540, y: 900, s: 1.3 }, cells: [[540, 560], [540, 820], [540, 1080], [540, 1340]], num: 84, label: 32, footY: 1560, foot: 22 },
  );

  let R;
  function build(layer) {
    Q.night(layer);
    const head = Q.phrase(layer, [[{ t: NAME() }]], { size: 44, weight: 700, color: '#9FB3C2' });
    const stats = STATS.map((s) => {
      const el = Q.div(layer, 'qr-abs', { textAlign: 'center', whiteSpace: 'nowrap' });
      const chip = SS.el('span', 'qr-chip', el);
      Object.assign(chip.style, { fontSize: L.num * (s.n ? 1 : 0.78) + 'px', fontWeight: 800, letterSpacing: '-.03em', lineHeight: 1.12, fontFeatureSettings: "'tnum' 1", minWidth: s.n ? '1.6em' : '0' });
      chip.textContent = s.text || s.fmt(s.n);
      const lb = SS.el('div', '', el);
      Object.assign(lb.style, { marginTop: '14px', fontSize: L.label + 'px', fontWeight: 650, letterSpacing: '-.02em', color: Q.C.white });
      lb.textContent = s.label;
      return { el, chip, s };
    });
    const foot = Q.src(layer, FOOT(), L.foot);
    let quote = null;
    if (QR.OPT.quote) { // slot for François Mackay's quote: off until the real text arrives (no invented quote)
      quote = Q.div(layer, 'qr-abs', { textAlign: 'center', whiteSpace: 'nowrap', color: Q.C.white });
      quote.innerHTML = `<div style="font-size:34px;font-weight:650;letter-spacing:-.02em">« ${QR.OPT.quote.text} »</div><div style="margin-top:8px;font-size:24px;color:#9FB3C2">${QR.OPT.quote.name}, ${QR.OPT.quote.title}</div>`;
    }
    R = { head, stats, foot, quote };
  }

  function render(u) {
    R.head.put(Q.CX, L.headY, u, { at: [T.head] });
    const at = [T.n1, T.n2, T.n3, T.n4], toGrid = [T.grid1, T.grid2, null, null];
    R.stats.forEach((st, i) => {
      const kin = Q.k(u, at[i], 0.36, Q.E.springSoft), g = toGrid[i] == null ? 1 : Q.k(u, toGrid[i], 0.42, Q.E.inOut);
      const c = L.cells[i];
      Q.st(st.el, { x: Q.lerp(L.hero.x, c[0], g), y: Q.lerp(L.hero.y, c[1], g) + (1 - kin) * 30, s: Q.lerp(L.hero.s, 1, g) * Q.lerp(0.86, 1, kin), o: Q.k(u, at[i], 0.1, Q.E.sine), blur: (1 - Q.k(u, at[i], 0.22, Q.E.out)) * 8 });
      if (st.s.n) st.chip.textContent = st.s.fmt(st.s.n * Q.k(u, at[i], T.count, Q.E.p4));
    });
    const kf = Q.k(u, T.foot, 0.4, Q.E.out);
    Q.st(R.foot, { x: Q.CX, y: L.footY + (1 - kf) * 12, o: Q.k(u, T.foot, 0.3, Q.E.sine) * 0.62 });
    if (R.quote) Q.st(R.quote, { x: Q.CX, y: L.footY - 90, o: Q.k(u, T.n4 + 0.2, 0.3, Q.E.sine) });
  }

  QR.scene({ id: 's8', build, render, cuts: [0, T.n1, T.n2] });
})();
