const db = require("../db");
const University = require("./University");
class NonRso {
  static async findByEid(eid) {
    return db
      .query(
        `SELECT * FROM non_rso nr INNER JOIN events e 
        ON nr.eid = e.eid WHERE nr.eid = ?`,
        [eid]
      )
      .then(([row]) => row[0])
      .catch(err => console.log(err));
  }
  static async findByStatus(spid, status) {
    return db
      .query(`SELECT * FROM non_rso WHERE spid = ? AND status = ?`, [
        spid,
        status
      ])
      .then(([row]) => row)
      .catch(err => console.log(err));
  }
  static async add(event) {
    const { pid, uid } = event;
    const uni = await University.findByUid(uid);
    const spid = uni.spid;
    db.query(`INSERT INTO non_rso (pid, spid) VALUES (?,?)`, [pid, spid]);
  }
  static async updateStatus(eid, status) {
    db.query(`UPDATE non_rso SET status = ? WHERE eid = ?`, [status, eid]);
  }
}
module.exports = NonRso;
