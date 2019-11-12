const db = require('../db');
class RsoEvent {
  static async findByEid(eid) {
    return db
      .query(
        `SELECT * FROM rso_events r INNER JOIN events e 
      ON r.eid = e.eid WHERE r.eid = ?`,
        [eid]
      )
      .then(([row]) => row[0])
      .catch(err => console.log(err));
  }

  static async findByName(name) {
    return db
      .query(
        `SELECT * FROM rso_events r 
        INNER JOIN events e ON r.eid = e.eid WHERE e.name = ?`,
        [name]
      )
      .then(([row]) => row)
      .catch(err => console.log(err));
  }
  static async add(events) {
    const { eid, rid } = events;
    db.query(`INSERT INTO rso_events (eid, rid) VALUES (?,?)`, [eid, rid]);
  }
}
module.exports = RsoEvent;
