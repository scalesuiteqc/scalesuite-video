/* « Gardez vos courtiers » : shared timing and team data. The helpers of « Le lead perdu »
   (SS.P, SS.SHADOW, SS.clipR, SS.OPEN, SS.ripple, SS.scrimTo) come from scenes-lead-perdu/00-commun.js,
   loaded read-only. The whole film's timing lives in SS.ET. */
(function () {
  const SS = window.SS;

  SS.ET = {
    // 1 · hook (0–2.4): frame 0 = title + grid with the empty seat; « Quelques mois plus tôt », 04 comes back
    chip: 1.4, back: 1.6, hookOut: 2.4, chipOut: 2.85, pan: 2.5,
    // 2 · the shared pool (2.4–5.2)
    pool: 3.1, s2Head: 3.1, s2Out: 6.8,
    // 3 · assignments, seen from Courtier 04 (5.2–8.7)
    focus: 4.9, push: 5.0, quote: 7.0, quoteOut: 8.7,
    // 4 · the departure (8.7–11.0)
    lift: 8.75, gray: 8.8, leave: 9.05, s4Head: 9.0, s4Out: 10.95,
    // 5 · with ScaleSuite (11.0–14.0)
    bascule: 11.0, bloom: 11.2, recolor: 11.3, recenter: 11.3, s5Head: 11.6, chips: 12.0, s5Out: 13.95,
    // 6 · his leads, his campaign (14.0–17.0)
    s6Head: 14.05, sprouts: [14.3, 14.6, 14.9, 15.2], s6Out: 16.95,
    // 7 · recruiting (17.0–22.8)
    s7Head: 17.1, offer: 17.3, contract: 20.0, arrive: 20.5, solid: 20.7, back9: 22.0, s7Out: 22.75,
    // 8 · end (22.8–28.2)
    s8Head: 22.85, s8Out: 24.55, gather: 24.6, node: 24.85, mark: 25.1, letters: 25.25, tag: 25.4, cta: 25.45, url: 25.65,
    sheen: 26.8, nudge: 27.4, end: 28.2,
  };

  // the team: 8 brokers, 8 distinct sectors (one campaign per sector, no overlap at auction).
  // The longest sector names sit in the left column so the right column stays clear of the x > 930 rail.
  SS.TEAM = [
    { n: '01', s: 'Montréal' }, { n: '02', s: 'Laval' }, { n: '03', s: 'Longueuil' }, { n: '04', s: 'La Prairie' },
    { n: '05', s: 'Saint-Lambert' }, { n: '06', s: 'Brossard' }, { n: '07', s: 'Boucherville' }, { n: '08', s: 'Chambly' },
  ];
  SS.LEAVER = 3; // Courtier 04 leaves; Courtier 09 takes over La Prairie
  // grid: 2 columns × 4 rows of 430 × 140 cards (world coordinates)
  SS.GRID = { w: 430, h: 140, xs: [315, 765], top: 890, pitch: 152 };
  SS.GRID.cx = (i) => SS.GRID.xs[i % 2];
  SS.GRID.cy = (i) => SS.GRID.top + SS.GRID.h / 2 + Math.floor(i / 2) * SS.GRID.pitch;
  SS.GRID.mid = SS.GRID.top + (3 * SS.GRID.pitch + SS.GRID.h) / 2; // 1188
  // camera y for each framing (grid centred in the hook and in the solution)
  SS.CAMY = { hook: 1178, pool: 960, team: 1148 };
})();
