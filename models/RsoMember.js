const db = require('../db');
class RsoMember {
  static async findById(id) {
    return db
      .query(`SELECT * FROM rso_members WHERE id = ?`, [id])
      .then(([row]) => row[0])
      .catch(err => {
        throw err;
      });
  }
  static async findByPid(pid) {
    return db
      .query(
        `SELECT * FROM rso_members rm INNER JOIN rso r ON rm.rid = r.rid WHERE rm.pid = ?`,
        [pid]
      )
      .then(([row]) => row)
      .catch(err => {
        throw err;
      });
  }
  static async findByPidAndRid(pid, rid) {
    return db
      .query(`SELECT * FROM rso_members WHERE pid = ? AND rid =?`, [pid, rid])
      .then(([row]) => row[0])
      .catch(err => {
        throw err;
      });
  }
  static async findByRid(rid) {
    return db
      .query(
        `SELECT pid, first_name, last_name, username, phone, email 
    FROM rso_members rm INNER JOIN person p ON rm.pid=p.pid WHERE rm.rid = ?`,
        [rid]
      )
      .then(row => row)
      .catch(err => {
        throw err;
      });
  }
  static async add(member) {
    const { pid, rid } = member;
    return db
      .query(`INSERT INTO rso_members (pid, rid) VALUES (?, ?)`, [pid, rid])
      .then(([field]) => field.insertId)
      .catch(err => {
        throw err;
      });
  }
  static async delete(member) {
    const { pid, rid } = member;
    db.query(`DELETE FROM rso_members WHERE pid = ? AND rid = ?`, [pid, rid]);
  }
}
module.exports = RsoMember;
