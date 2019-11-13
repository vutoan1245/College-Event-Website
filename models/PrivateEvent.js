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
    const { aid, uid } = event;
    db.query(`INSERT INTO private_events (aid, uid) VALUES (?,?)`, [aid, uid]);
  }
}
module.exports = PrivateEvent;
