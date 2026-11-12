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

  QR.ORDER = Object.keys(QR.BEATS);
  QR.DUR = {};
  QR.START = {};
  let n = 0;
  QR.ORDER.forEach((id) => { QR.START[id] = QR.b(n); QR.DUR[id] = QR.b(QR.BEATS[id]); n += QR.BEATS[id]; });
  QR.TOTAL_BEATS = n;
  QR.TOTAL = QR.b(n);

  QR.scenes = [];
  // scene: {id, build(layer), render(u), cuts} with u = seconds since the scene start.
  // cuts: local times (seconds) where the virtual camera restarts its push (a new shot or message).
  QR.scene = (s) => QR.scenes.push(Object.assign({ cuts: [0] }, s, { t0: QR.START[s.id], t1: QR.START[s.id] + QR.DUR[s.id], dur: QR.DUR[s.id] }));
})();
