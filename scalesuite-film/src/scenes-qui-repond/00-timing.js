/* « Qui répond à 2 h du matin? » : the rhythm table.
   The whole film sits on a tempo grid: 108 BPM, one beat = 60 / 108 = 0,5556 s. Every scene lasts a
   whole number of beats; every scene change, phrase arrival and chip deployment lands on a beat
   (QR.b(n) = n beats in seconds; half beats are only used for secondary elements). The score and the
   sound effects follow the same grid.
   Scene starts are derived from the table, so changing a duration shifts everything after it. Inside
   each scene file, the object T holds that scene's own cues, in beats from the scene start.
   Brief times = these times + 3 s (scene 0, the talking head, is filmed and not part of this film). */
(function () {
  const SS = window.SS;
  const QR = (SS.QR = {});

  QR.BPM = 108;
  QR.BEAT = 60 / QR.BPM;
  QR.b = (n) => n * QR.BEAT;

  QR.BEATS = {
    s1: 7,    // black, focus-in sentence, bedroom at 2 h 14
    s2: 8,    // « Qui leur répond, pour vrai? » and the two framed shots
    s3: 7,    // 100×
    s4: 11,   // 81 %, « Ce courtier là », « Attends 30 minutes »
    s5: 6,    // Voici + logo
    s6: 20,   // the system, five messages of four beats
    s7: 6,    // weekly report
    s8: 7,    // proof
    s9: 9,    // call to action, final logo (5,0 s)
  };

  // Content switches
  QR.OPT = {
    clientName: true, // scene 8: true = « pour Groupe Mackay », false = « pour une de nos équipes clientes »
  };
  // ?client=0 in the page address renders the variant without the client's name (see QR_QUERY in lib-qui-repond.mjs)
  if (new URLSearchParams(location.search).get('client') === '0') QR.OPT.clientName = false;

  // THE VOICE IS THE MASTER TRACK (brief v2). vo-timing.js is generated from the voice-over take by
  // audio/vo-qui-repond.py: it gives the duration of each scene (no sentence crosses a scene boundary)
  // and the time of every cue word. QR.BEATS above is kept as the fallback when there is no voice;
  // 108 BPM remains the grid of the score and of the transitions.
  QR.VO = SS.VO || null;
  // PROVISIONAL (until the new take vo-08-v2 is cut by audio/vo-qui-repond.py): scene 8 now compares the client
  // with the market, and its sentence is longer. These estimated times stand in for the real ones.
  QR.PROVISIONAL = { s8: { dur: 8.9, voice: [0.08, 7.6], cues: { pour: { t: 0.11, key: false }, n138: { t: 1.2, key: true }, n51: { t: 3.3, key: true }, moins64: { t: 5.7, key: true } } } };
  if (QR.VO && !QR.VO.s8.cues.n138) Object.assign(QR.VO, QR.PROVISIONAL); else QR.PROVISIONAL = null;
  QR.cue = (scene, word) => QR.VO[scene].cues[word].t; // seconds from the scene start
  QR.ORDER = Object.keys(QR.BEATS);
  QR.DUR = {};
  QR.START = {};
  let n = 0, t = 0;
  QR.ORDER.forEach((id) => { QR.START[id] = t; QR.DUR[id] = QR.VO ? QR.VO[id].dur : QR.b(QR.BEATS[id]); t += QR.DUR[id]; n += QR.BEATS[id]; });
  QR.TOTAL_BEATS = n;
  QR.TOTAL = t;
  // sync control: every scene declares when a cue word shows on screen; render/sync-qui-repond.mjs compares
  // it with the voice (2 frames at 60 i/s for key words and figures, 4 frames for the rest)
  QR.syncs = [];
  QR.sync = (scene, word, screenT) => { QR.syncs.push({ scene, word, screen: screenT, voice: QR.cue(scene, word), key: QR.VO[scene].cues[word].key }); return screenT; };

  QR.scenes = [];
  // scene: {id, build(layer), render(u), cuts} with u = seconds since the scene start.
  // cuts: local times (seconds) where the virtual camera restarts its push (a new shot or message).
  QR.scene = (s) => QR.scenes.push(Object.assign({ cuts: [0] }, s, { t0: QR.START[s.id], t1: QR.START[s.id] + QR.DUR[s.id], dur: QR.DUR[s.id] }));
})();
