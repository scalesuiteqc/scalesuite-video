/* « Qui répond à 2 h du matin? » : the rhythm table. One duration per scene (seconds); scene starts are
   derived from it, so changing a duration shifts everything after it. Inside each scene file, the
   object T holds that scene's own beats, relative to the scene start.
   Brief times = these times + 3 s (scene 0, the talking head, is filmed and not part of this film). */
(function () {
  const SS = window.SS;
  const QR = (SS.QR = {});

  QR.DUR = {
    s1: 3.9,   // black, focus-in sentence, bedroom at 2 h 14
    s2: 4.3,   // « Qui leur répond, pour vrai? » and the two framed shots
    s3: 4.8,   // 100×
    s4: 7.2,   // 81 %, « Ce courtier là », « Attends 30 minutes »
    s5: 3.2,   // Voici + logo
    s6: 13.2,  // the system, five messages
    s7: 3.8,   // weekly report
    s8: 4.2,   // proof
    s9: 5.0,   // call to action, final logo
  };

  // Content switches
  QR.OPT = {
    clientName: true, // scene 8: true = « pour Groupe Mackay », false = « pour une de nos équipes clientes »
  };

  QR.ORDER = Object.keys(QR.DUR);
  QR.START = {};
  let t = 0;
  QR.ORDER.forEach((id) => { QR.START[id] = +t.toFixed(4); t += QR.DUR[id]; });
  QR.TOTAL = +t.toFixed(4);

  QR.scenes = [];
  // scene: {id, build(layer), render(u)} with u = seconds since the scene start
  QR.scene = (s) => QR.scenes.push(Object.assign(s, { t0: QR.START[s.id], t1: +(QR.START[s.id] + QR.DUR[s.id]).toFixed(4), dur: QR.DUR[s.id] }));
})();
