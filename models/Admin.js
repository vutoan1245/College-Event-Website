const db = require("../db");
const Person = require("./Person");
const Student = require("./Student");
class Admin {
  static async findByAid(aid) {
    return db
      .query(`SELECT * FROM admin where aid = ?`, [aid])
      .them(([row]) => row[0])
      .catch(err => console.log("[Admin.js]", err));
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
      .catch(err => console.log(err));

    return {
      ...person,
      ...admin
    };
  }
  static async add(newAdmin) {
    const { sid } = newAdmin;

    const student = await Student.findBySid(sid);

    db.query(
      `INSERT INTO admin (sid, pid, first_name, last_name) VALUES (?, ?, ?, ?)`,
      [student.sid, student.pid, student.first_name, student.last_name]
    );
  }
}
module.exports = Admin;
