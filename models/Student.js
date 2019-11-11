const db = require("../db");
const Person = require("./Person");
const University = require("./University");
class Student {
  static async findByPid(pid) {
    return db
      .query(
        `SELECT p.pid, uid, access, username, first_name, last_name, email, phone from students s INNER JOIN person p 
      ON s.pid = p.pid where s.pid = ?`,
        [pid]
      )
      .then(([rows]) => rows[0])
      .catch(err => console.log("[Student.js]", err));
  }

  static async findByUsername(username) {
    const person = await Person.findByUsernameA(username, "student");

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

  static async findStudentsByUid(uid) {
    return db
      .query(
        `SELECT username, first_name, last_name, phone, email
      FROM person p INNER JOIN students s 
      ON p.pid = s.pid WHERE s.uid = ?`,
        [uid]
      )
      .then(([row]) => row)
      .catch(err => console.log(err));
  }

  // Add a new student to `person` and `students` tables
  static async add(newStudent) {
    const {
      username,
      password,
      first_name,
      last_name,
      phone,
      email,
      university
    } = newStudent;

    const pid = await Person.add({
      username,
      password,
      first_name,
      last_name,
      phone,
      email,
      access: "student"
    });
    const uni = await University.findByName(university);

    const uid = uni[0].uid;

    db.query(`INSERT INTO students (pid, uid) VALUES (?, ?)`, [pid, uid]);
  }
}

module.exports = Student;
