const db = require('../db');

class Person {
  static async findByPid(pid) {
    return db
      .query(`SELECT pid FROM person WHERE pid = ? `, [pid])
      .then(([rows]) => rows[0])
      .catch(err => console.log(err));
  }

  static async findByUsername(username) {
    return db
      .query(`SELECT * FROM person WHERE username = ?`, username)
      .then(([rows]) => rows[0])
      .catch(err => console.log(err));
  }

  static async add(newUser) {
    const { username, password } = newUser;

    return db
      .query(`INSERT INTO person (username, password) VALUES (?, ?)`, [
        username,
        password
      ])
      .then(() => this.findByUsername(username))
      .then(person => person.pid)
      .catch(err => console.log(err));
  }
}

module.exports = Person;
