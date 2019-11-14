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
    const { name, location, time, category, description, email, phone } = event;
    await Location.findByLname(location.lname)
      .then(loc => {
        if (!loc) {
          return Location.add(location);
        }
      })
      .then(() => 'success')
      .catch(err => {
        console.log('[Event.js] add', err);
        throw err;
      });

    return db
      .query(
        `INSERT INTO events (name, location, time, category, description, email, phone) VALUES (?, ?, ?,? , ?, ?, ?)`,
        [name, location.lname, time, category, description, email, phone]
      )
      .then(([fields]) => fields.insertId)
      .catch(err => {
        console.log('[Event.js] add', err);
        throw err;
      });
  }
}
module.exports = Event;
