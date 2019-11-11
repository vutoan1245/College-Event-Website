const db = require("../db");
const axios = require("axios");
class Location {
  static async findByLid(lid) {
    return db
      .query(`SELECT * FROM location WHERE lid=?`, [lid])
      .then(([row]) => row[0])
      .catch(err => console.log("Location lid: ", err));
  }
  static async findByLname(lname) {
    return db
      .query(`SELECT * FROM location WHERE lname = ?`, [lname])
      .then(([row]) => row[0])
      .catch(err => console.log("Location name: ", err));
  }
  static async findByAddress(address) {
    return db
      .query(`SELECT * FROM location WHERE address LIKE ?`, [
        "%" + address + "%"
      ])
      .then(([row]) => row)
      .catch(err => console.log("Location address: ", err));
  }
  static async add(location) {
    const { lname, address } = location;
    const { lat, lng } = await this.geoCode(address);
    return db
      .query(
        `INSERT INTO location (lname, address, lng, lat) VALUES (?,?,?,?)`,
        [lname, address, lng, lat]
      )
      .then(() => this.findByLname(lname))
      .then(loc => loc.lname)
      .catch(err => console.log(err));
  }
  static async update(location) {
    const { lid, lname, address } = location;
    db.query(`UPDATE location SET lname = ?, address = ? WHERE lid = ?`, [
      lname,
      address,
      lid
    ]);
  }
  static async delete(location) {
    const { lid } = location;
    db.query(`DELETE FROM location WHERE lid = ?`, [lid]);
  }
  static async geoCode(address) {
    const gecodeURL =
      process.env.GEOCODE_URL + address + "&key=" + process.env.GOOGLE_KEY;

    //Convert address to coordinates
    const coordinate = await axios
      .get(gecodeURL)
      .then(res => {
        if (res.status == 200 && res.data.results.length > 0) {
          return res.data.results[0].geometry.location;
        }
      })
      .catch(err => console.log(err));
    return coordinate;
  }
}
module.exports = Location;
