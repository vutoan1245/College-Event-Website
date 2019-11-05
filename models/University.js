const db = require('../db');
const axios = require('axios');
class University {
  static async findByUid(uid) {
    return db
      .query(`SELECT * FROM universities WHERE uid = ?`, [uid])
      .then(([rows]) => rows[0])
      .catch(err => console.log('[Universities.js]', err));
  }

  static async findNameList() {
    return db
      .query(`SELECT name FROM universities`)
      .then(([rows]) => rows.map(uni => uni.name))
      .catch(err => console.log(err));
  }

  static async findByName(name) {
    return db
      .query(`SELECT * FROM universities WHERE name = ?`, [name])
      .then(row => row[0])
      .catch(err => console.log('Search uni by name', err));
  }

  static async add(newUni) {
    const { spid, name, description, student_count, picture, address } = newUni;

    //Googel geocode api
    const gecodeURL =
      process.env.GEOCODE_URL + address + '&key=' + process.env.GOOGLE_KEY;

    //Convert address to coordinates
    const coordinate = await axios
      .get(gecodeURL)
      .then(res => {
        if (res.status == 200 && res.data.results.length > 0) {
          return res.data.results[0].geometry.location;
        }
      })
      .catch(err => console.log(err));

    const { lat, lng } = coordinate;
    db.query(
      `INSERT INTO universities
      (spid, name, description, student_count, picture, address, longtitude, latitude)
      VALUES (?,?,?,?,?,?,?,?)`,
      [spid, name, description, student_count, picture, address, lng, lat]
    );
  }
}

module.exports = University;
