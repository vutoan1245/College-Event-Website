const db = require('../db');
const Person = require('./Person');

class Student {
    static async findBySid(sid) {
        return db
            .query(`SELECT * from students where sid = ?`, [sid])
            .then(([rows]) => rows[0])
            .catch(err => console.log('[Student.js]', err));
    }

    static async findByUsername(username) {
        const person = await Person.findByUsername(username);

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

    // Add a new student to `person` and `students` tables
    static async add(newStudent) {
        const { username, password, firstName, lastName } = newStudent;

        const pid = await Person.add({ username, password });
        db.query(`INSERT INTO students (pid, first_name, last_name) VALUES (?, ?, ?)`, [pid, firstName, lastName]);
    }
}

module.exports = Student;
