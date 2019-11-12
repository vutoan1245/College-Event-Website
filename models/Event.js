const db = require('../db');
const Location = require('./Location');
class Event {
  static async findByEid(eid) {
    return db
      .query(`SELECT * FROM events WHERE eid = ?`, [eid])
      .then(([row]) => row[0])
      .catch(err => {
        throw err;
      });
  }
  static async findByName(name) {
    return db
      .query(`SELECT * FROM events WHERE name = ?`, [name])
      .then(([row]) => row[0])
      .catch(err => {
        throw err;
      });
  }
  static async add(event) {
    const { name, location, time, category, desciption } = event;
    await Location.findByLname(location.lname).then(loc => {
      if (loc == undefined) {
        Location.add(location);
      }
    });

    return db
      .query(
        `INSERT INTO events (name, location, time, category, description) VALUES (?,?,?,?,?)`,
        [name, location.lname, time, category, desciption]
      )
      .then(([field]) => field.insertId)
      .catch(err => {
        throw err;
      });
  }
}
module.exports = Event;
