const db = require("../db");
const Location = require("./Location");

class University {
  static async findByUid(uid) {
    return db
      .query(
        `SELECT * FROM universities u INNER JOIN location l 
      ON u.location = l.lname WHERE uid = ?`,
        [uid]
      )
      .then(([rows]) => rows[0])
      .catch(err => {
        console.log("[Universities.js]", err);
        throw err;
      });
  }

  static async findNameList() {
    return db
      .query(`SELECT name FROM universities`)
      .then(([rows]) => rows.map(uni => uni.name))
      .catch(err => {
        throw err;
      });
  }

  static async findByName(name) {
    return db
      .query(
        `SELECT * FROM universities u INNER JOIN location l 
      ON u.location = l.lname WHERE name = ?`,
        [name]
      )
      .then(row => row[0])
      .catch(err => {
        console.log("Search uni by name", err);
        throw err;
      });
  }

  static async add(newUni) {
    const {
      spid,
      name,
      description,
      student_count,
      picture,
      location
    } = newUni;

    await Location.findByLname(location.lname).then(async loc => {
      if (loc == undefined) {
        await Location.add(location);
      }
    });
    db.query(
      `INSERT INTO universities (spid, name, description, student_count, picture, location) VALUES (?,?,?,?,?,?)`,
      [spid, name, description, student_count, picture, location.lname]
    );
  }
}

module.exports = University;
