const db = require("../db");
const Person = require("./Person");

class SuperAdmin {
  static async findByAid(spid) {
    return db
      .query(`SELECT * FROM super_admin where spid = ?`, [spid])
      .them(([row]) => row[0])
      .catch(err => console.log("[SuperAdmin.js]", err));
  }
  static async findByUsername(username) {
    const person = await Person.findByUsername(username);

    // Does not exist
    if (!person) {
      return null;
    }

    const superAdmin = await db
      .query(`SELECT * from super_admin where pid = ?`, [person.pid])
      .then(([rows]) => rows[0])
      .catch(err => console.log(err));

    return {
      ...person,
      ...superAdmin
    };
  }
  static async add(newSuperAdmin) {
    const { username, password, firstName, lastName } = newSuperAdmin;

    const pid = await Person.add({ username, password });

    db.query(
      `INSERT INTO super_admin (pid, first_name, last_name) VALUES (?, ?, ?)`,
      [pid, firstName, lastName]
    );
  }
}
module.exports = SuperAdmin;
