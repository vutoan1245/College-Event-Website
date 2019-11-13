const db = require('../db');
const Person = require('./Person');

class SuperAdmin {
  static async findBySpid(spid) {
    return db
      .query(
        `SELECT p.pid, spid, access, username, first_name, last_name, email, phone FROM super_admin sa INNER JOIN person p 
      ON sa.pid = p.pid where sa.spid = ?`,
        [spid]
      )
      .then(([row]) => row[0])
      .catch(err => {
        console.log('[SuperAdmin.js]', err);
        throw err;
      });
  }
  static async findByUsername(username) {
    const person = await Person.findByUsernameA(username, 'super admin');

    // Does not exist
    if (!person) {
      return null;
    }

    const superAdmin = await db
      .query(`SELECT * from super_admin where pid = ?`, [person.pid])
      .then(([rows]) => rows[0])
      .catch(err => {
        throw err;
      });

    return {
      ...person,
      ...superAdmin
    };
  }

  static async add(newSuperAdmin) {
    const {
      username,
      password,
      first_name,
      last_name,
      phone,
      email
    } = newSuperAdmin;
    const pid = await Person.add({
      username,
      password,
      first_name,
      last_name,
      phone,
      email,
      access: 'super admin'
    });
    db.query(`INSERT INTO super_admin (pid) VALUES (?)`, [pid]);
  }
}
module.exports = SuperAdmin;
