const db = require('../db');

class PrivateEvent {
  static async findByEid(eid) {
    return db
      .query(
        `SELECT * FROM private_events pe INNER JOIN events e 
                ON pe.eid = e.eid WHERE eid = ?`,
        [eid]
      )
      .then(([row]) => row[0])
      .catch(err => console.log(err));
  }

  static findAllByUid(uid) {
    return db
      .query(
        `
        SELECT * FROM events
        WHERE eid IN (
          SELECT eid FROM private_events
          WHERE uid = ?
        )
        `,
        [uid]
      )
      .then(([rows]) => rows.map(row => ({ ...row, type: 'Private' })))
      .catch(err => {
        console.log('[PublicEvent.js] findAll', err);
        throw err;
      });
  }

  static async findByName(name) {
    return db
      .query(
        `SELECT * FROM private_events pe INNER JOIN events e 
              ON pe.eid = e.eid WHERE e.name = ?`,
        [name]
      )
      .then(([row]) => row)
      .catch(err => console.log(err));
  }

  static async findByAid(aid) {
    return db
      .query(
        `SELECT * FROM private_events pe 
        INNER JOIN events e ON pe.eid = e.eid WHERE pe.aid = ?`,
        [aid]
      )
      .then(([row]) => row)
      .catch(err => console.log(err));
  }

  static async add(event) {
    const { eid, aid, uid } = event;
    db.query(`INSERT INTO private_events (eid, aid, uid) VALUES (?, ?, ?)`, [
      eid,
      aid,
      uid
    ])
      .then(() => eid)
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = PrivateEvent;
