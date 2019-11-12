const db = require("../db");
class Comment {
  static async findByCid(cid) {
    return db
      .query(`SELECT * FROM comments WHERE cid = ?`, [cid])
      .then(([row]) => row[0])
      .catch(err => console.log(err));
  }
  static async findByEid(eid) {
    return db
      .query(`SELECT * FROM comments WHERE eid = ?`, [eid])
      .then(([row]) => row)
      .catch(err => console.log(err));
  }
  static async avgRating(eid) {
    return db
      .query(`SELECT AVG(rating) AS avg_rating FROM comments WHERE eid = ?`, [
        eid
      ])
      .then(res => res)
      .catch(err => console.log(err));
  }
  static async add(comment) {
    const { eid, pid, text, rating, timestamp } = comment;
    db.query(
      `INSERT INTO comments (eid, pid, comments, rating, timestamp) VALUES (?,?,?,?,?)`,
      [eid, pid, text, rating, timestamp]
    );
  }
  static async updateComment(comment) {
    const { text, rating, timestamp } = comment;
    db.query(`UPDATE comments SET comments = ?, rating = ?, timestamp = ?`, [
      text,
      rating,
      timestamp
    ]);
  }
  static async delete(cid) {
    db.query(`DELETE FROM comments WHERE cid = ?`);
  }
}
module.exports = Comment;
