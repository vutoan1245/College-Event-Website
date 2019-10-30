const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'MySQL',
    password: 'my_password'
});

module.exports = db.promise();
