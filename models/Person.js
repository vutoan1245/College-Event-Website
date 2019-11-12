const db = require("../db");

class Person {
  static async findByPid(pid) {
    return db
      .query(`SELECT * FROM person WHERE pid = ? `, [pid])
      .then(([rows]) => rows[0])
      .catch(err => console.log(err));
  }

  static async findByUsernameA(username, access) {
    return db
      .query(
        `SELECT * FROM person WHERE (username = ? OR email = ?) AND access = ?`,
        [username, username, access]
      )
      .then(([rows]) => rows[0])
      .catch(err => console.log(err));
  }
  static async findByUsername(username) {
    return db
      .query(`SELECT * FROM person WHERE username = ? OR email = ?`, [
        username,
        username
      ])
      .then(([rows]) => rows[0])
      .catch(err => console.log(err));
  }

  static async add(newUser) {
    const {
      username,
      password,
      first_name,
      last_name,
      phone,
      email,
      access
    } = newUser;

    return db
      .query(
        `INSERT INTO person 
        (username, password, first_name, last_name, phone, email, access) 
        VALUES (?,?,?,?,?,?,?)`,
        [username, password, first_name, last_name, phone, email, access]
      )
      .then(() => this.findByUsername(username, access))
      .then(person => person.pid)
      .catch(err => console.log(err));
  }
  static async updateInfo(person) {
    const { first_name, last_name, email, phone, username } = person;
    return db
      .query(
        `UPDATE person SET first_name = ?, last_name = ?, email = ?, phone = ?, username = ?`,
        [first_name, last_name, email, phone, username]
      )
      .then(res => res)
      .catch(err => console.log(err));
  }
  static async delete(person) {
    const { pid } = person;
    db.query(`DELETE FROM person WHERE pid = ?`, [pid]);
  }
}

module.exports = Person;
