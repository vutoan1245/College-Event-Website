const db = require("../db");
const Person = require("./Person");
const University = require("./Universities");
class Student {
  static async findBySid(sid) {
    return db
      .query(`SELECT * from students where sid = ?`, [sid])
      .then(([rows]) => rows[0])
      .catch(err => console.log("[Student.js]", err));
  }

  static async findByUsername(username) {
    const person = await Person.findByUsername(username);

    // Does not exist
    if (!person) {
      return null;
    }

    const student = await db
      .query(`SELECT * from students where pid = ?`, [person.pid])
      .then(([rows]) => rows[0])
      .catch(err => console.log(err));

    return {
      ...person,
      ...student
    };
  }

  // Add a new student to `person` and `students` tables
  static async add(newStudent) {
    const { username, password, firstName, lastName, university } = newStudent;
    const Uni = await University.findByName(university);
    const pid = await Person.add({ username, password });
    const uid = Uni.uid;
    db.query(
      `INSERT INTO students (pid, uid, first_name, last_name) VALUES (?, ?, ?,?)`,
      [pid, uid, firstName, lastName]
    );
  }
}

module.exports = Student;
