const db = require('../db');

class PublicEvent {
  static async findByEid(eid) {
    return db
      .query(
        `SELECT * FROM public_events pe 
        INNER JOIN events e ON pe.eid = e.eid WHERE pe.eid = ?`,
        [eid]
      )
      .then(([row]) => row[0])
      .catch(err => {
        console.log('[PublicEvent.js] findByEid', err);
        throw err;
      });
  }

  static findAll() {
    return db
      .query(
        `
        SELECT * FROM events
        WHERE eid IN (
          SELECT eid
          FROM public_events
        )
        `
      )
      .then(([rows]) => rows.map(row => ({ ...row, type: 'Public' })))
      .catch(err => {
        console.log('[PublicEvent.js] findAll', err);
        throw err;
      });
  }

  static async findByAid(aid) {
    return db
      .query(
        `SELECT * FROM public_events pe 
        INNER JOIN events e ON pe.eid = e.eid WHERE pe.aid = ?`,
        [aid]
      )
      .then(([row]) => row)
      .catch(err => {
        console.log('[PublicEvent.js] findByAid', err);
        throw err;
      });
  }
  static async findByName(name) {
    return db
      .query(
        `SELECT * FROM public_events pe 
        INNER JOIN events e ON pe.eid = e.eid WHERE e.name = ?`,
        [name]
      )
      .then(([row]) => row)
      .catch(err => {
        console.log('[PublicEvent.js] findByName', err);
        throw err;
      });
  }

  static async add(publicEvent) {
    const { eid, aid } = publicEvent;
    console.log('public eid', eid);
    db.query(`INSERT INTO public_events (eid, aid) VALUES (?, ?)`, [eid, aid])
      .then(() => eid)
      .catch(err => {
        console.log('[PublicEvent.js] add', err);
        throw err;
      });
  }
}

module.exports = PublicEvent;
