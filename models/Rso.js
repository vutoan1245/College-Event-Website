const db = require("../db");
class Rso {
  static async findByRid(rid) {
    return db
      .query(`SELECT * FROM rso WHERE rid = ?`, [rid])
      .then(([row]) => row[0])
      .catch(err => console.log(err));
  }
  static async findByName(name) {
    return db
      .query(`SELECT * FROM rso WHERE name = ?`, [name])
      .then(([row]) => row[0])
      .catch(err => console.log(err));
  }
  static async add(rso) {
    const { name, description, aid } = rso;
    return db
      .query(`INSERT INTO rso (aid, name, description) VALUES (?,?,?)`, [
        aid,
        name,
        description
      ])
      .then(res => res[0].insertId)
      .catch(err => console.log(err));
  }
}
module.exports = Rso;
