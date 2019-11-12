const db = require('../db');
class Rso {
  static async findByRid(rid) {
    return db
      .query(`SELECT * FROM rso WHERE rid = ?`, [rid])
      .then(([row]) => row[0])
      .catch(err => {
        throw err;
      });
  }
  static async findByName(name) {
    return db
      .query(`SELECT * FROM rso WHERE name = ?`, [name])
      .then(([row]) => row[0])
      .catch(err => {
        throw err;
      });
  }
  static async findByPid(pid) {
    return db
      .query(`SELECT * FROM rso WHERE pid = ?`, [pid])
      .then(([row]) => row)
      .catch(err => {
        throw err;
      });
  }
  static async findByUid(uid) {
    return db
      .query(
        `SELECT r.rid, r.name, r.description, r.status, r.aid FROM rso r 
    INNER JOIN admin a 
    ON r.aid = a.aid
    INNER JOIN person p 
    ON a.pid = p.pid
    INNER JOIN students s
    ON p.pid = s.pid
    WHERE s.uid = ?`,
        [uid]
      )
      .then(([row]) => row)
      .catch(err => {
        throw err;
      });
  }

  static async add(rso) {
    const { name, description, aid } = rso;
    return db
      .query(`INSERT INTO rso (aid, name, description) VALUES (?,?,?)`, [
        aid,
        name,
        description
      ])
      .then(([field]) => field.insertId)
      .catch(err => {
        throw err;
      });
  }
}
module.exports = Rso;
