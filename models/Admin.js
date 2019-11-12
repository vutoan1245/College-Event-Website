const db = require('../db');
const Person = require('./Person');
const Student = require('./Student');
const University = require('./University');
class Admin {
  static async findByAid(aid) {
    return db
      .query(`SELECT * FROM admin where aid = ?`, [aid])
      .then(([row]) => row[0])
      .catch(err => {
        console.log('[Admin.js]', err);
        throw err;
      });
  }
  static async findByUsername(username) {
    const person = await Person.findByUsername(username);

    // Does not exist
    if (!person) {
      return null;
    }

    const admin = await db
      .query(`SELECT * from admin where pid = ?`, [person.pid])
      .then(([rows]) => rows[0])
      .catch(err => {
        throw err;
      });

    return {
      ...person,
      ...admin
    };
  }
  static async findByStatus(spid, status) {
    return db
      .query(`SELECT * FROM admin WHERE status = ? AND spid = ?`, [
        status,
        spid
      ])
      .then(([row]) => row)
      .catch(err => {
        console.log('Admin status: ', err);
        throw err;
      });
  }
  static async findByPid(pid) {
    return db
      .query(`SELECT * FROM admin WHERE pid = ?`, [pid])
      .then(([row]) => row[0])
      .catch(err => {
        throw err;
      });
  }
  static async add(newAdmin) {
    const { pid, uid } = newAdmin;

    const uni = await University.findByUid(uid);

    const spid = uni.spid;

    return db
      .query(`INSERT INTO admin (pid, spid) VALUES (?, ?)`, [pid, spid])
      .then(() => this.findByPid(pid))
      .then(admin => admin.aid)
      .catch(err => {
        throw err;
      });
  }
  static async delete(aid) {
    db.query(`DELETE FROM admin WHERE aid = ?`, [aid]);
  }
  static async updateStatus(aid, status) {
    db.query(`UPDATE admin SET status = ? WHERE aid = ?`, [status, aid]);
  }
}
module.exports = Admin;
