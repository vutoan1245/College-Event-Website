const db = require("../db");
class PublicEvent {
  static async findByEid(eid) {
    return db
      .query(
        `SELECT * FROM public_events pe 
        INNER JOIN events e ON pe.eid = e.eid WHERE pe.eid = ?`,
        [eid]
      )
      .then(([row]) => row[0])
      .catch(err => console.log(err));
  }
  static async findByAid(aid) {
    return db
      .query(
        `SELECT * FROM public_events pe 
        INNER JOIN events e ON pe.eid = e.eid WHERE pe.aid = ?`,
        [aid]
      )
      .then(([row]) => row)
      .catch(err => console.log(err));
  }
  static async findByName(name) {
    return db
      .query(
        `SELECT * FROM public_events pe 
        INNER JOIN events e ON pe.eid = e.eid WHERE e.name = ?`,
        [name]
      )
      .then(([row]) => row)
      .catch(err => console.log(err));
  }
  static async add(publicEvent) {
    const { eid, aid } = publicEvent;
    db.query(`INSERT INTO public_events (eid, aid) VALUES (?, ?)`, [eid, aid])
      .then(([fields]) => fields.insertedId)
      .catch(err => {
        console.log("[PublicEvent.js] add", err);
        throw err;
      });
  }
}
module.exports = PublicEvent;
