const db = require("../db");
const Admin = require("./Admin");
const University = require("./Universities");

class Rso {
  static async findByRid(rid) {
    return db
      .query(`SELECT * FROM rso WHERE rid = ?`, [rid])
      .then(([row]) => row[0])
      .catch(err => console.log("Rso js", err));
  }
  static async findByQuery(query) {
    return db
      .query(`SELECT * FROM rso WHERE name LIKE ?`, ["%" + query + "%"])
      .then(([row]) => row)
      .catch(err => console.log("Rso js", err));
  }
  static async add(newRso) {
    const { newAdmin, initMember, name, description } = newRso;
    const admin = await Admin.add(newAdmin);
    const aid = admin.aid;
    const uid = admin.uid;
    db.query(`INSERT INTO rso (aid, uid, name, description) VALUES (?,?,?,?)`, [
      aid,
      uid,
      name,
      description
    ]);
  }
}
module.exports = Rso;
