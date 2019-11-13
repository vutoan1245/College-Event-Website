const db = require('../db');
class Comment {
  static async findByCid(cid) {
    return db
      .query(`SELECT * FROM comments WHERE cid = ?`, [cid])
      .then(([row]) => row[0])
      .catch(err => {
        throw err;
      });
  }
  static async findByEid(eid) {
    return db
      .query(`SELECT * FROM comments WHERE eid = ?`, [eid])
      .then(([row]) => row)
      .catch(err => {
        throw err;
      });
  }
  static async avgRating(eid) {
    return db
      .query(`SELECT AVG(rating) AS avg_rating FROM comments WHERE eid = ?`, [
        eid
      ])
      .then(res => res)
      .catch(err => {
        throw err;
      });
  }
  static async add(comment) {
    const { eid, pid, text, rating } = comment;
    return db
      .query(
        `INSERT INTO comments (eid, pid, comments, rating, timestamp) VALUES (?,?,?,?,NOW())`,
        [eid, pid, text, rating]
      )
      .then(([field]) => field)
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
  static async updateComment(comment) {
    const { text, rating, cid, pid } = comment;
    return db
      .query(
        `UPDATE comments SET comments = ?, rating = ?, timestamp = NOW() WHERE cid = ? AND pid = ?`,
        [text, rating, cid, pid]
      )
      .then(([field]) => field)
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
  static async delete(comment) {
    const { pid, cid } = comment;
    return db
      .query(`DELETE FROM comments WHERE cid = ? AND pid = ?`, [cid, pid])
      .then(([field]) => field)
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}
module.exports = Comment;
