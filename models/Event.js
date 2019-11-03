const db = require("../db");

class Event {
  static async findByEid(eid) {
    return db
      .query(`SELECT * FROM events WHERE eid = ?`, [eid])
      .then(([row]) => row[0])
      .catch(err => console.log(err));
  }
  static async findByQuery(query) {
    return db
      .query(`SELECT * FROM events WHERE name LIKE ?`, ["%" + query + "%"])
      .then(([row]) => row)
      .catch(err => console.log(err));
  }
  static async add(newEvent) {}
}
module.exports = Event;
