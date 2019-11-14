const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const Student = require('../../models/Student');
const Person = require('../../models/Person');
const RsoRoutes = require('./rso');
const router = express.Router();
const commentRoute = require('./comment');

// @route   POST api/student/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const {
    username,
    password,
    first_name,
    last_name,
    phone,
    email,
    university
  } = req.body;

  Person.findByUsername(username)
    .then(user => {
      if (user) {
        return res.status(404).json({ message: 'user exists' });
      } else {
        Person.findByUsername(email).then(e => {
          if (e) {
            return res.status(404).json({ message: 'email exists' });
          } else {
            const newStudent = {
              username,
              password,
              first_name,
              last_name,
              phone,
              email,
              university
            };

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                  res.status(400).json({ message: 'Something went wrong' });
                  throw err;
                }

                newStudent.password = hash;

                Student.add(newStudent)
                  .then(() => res.status(200).json({ message: 'Success' }))
                  .catch(() =>
                    res.status(400).json({ message: 'Something went wrong' })
                  );
              });
            });
          }
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(400).json({ message: 'Something went wrong' });
    });
});

// @route   POST api/student/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Student.findByUsername(username)
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ message: 'Incorrect username or password' });
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            pid: user.pid,

            firstName: user.first_name,
            lastName: user.last_name,
            access: user.access
          };

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                res.status(400).json({ message: 'Something went wrong' });
              }
              res.status(200).json({
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          res.status(400).json({ message: 'Incorrect username or password' });
        }
      });
    })
    .catch(err => {
      console.error(err);
      res.status(400).json({ message: 'Something went wrong' });
    });
});

// @route   GET api/student/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const { pid, first_name, last_name, access, uid, aid } = req.user;

    if (access !== 'student') {
      return res.status(400).json({ message: 'Required permission: Student' });
    }
    res.json({
      uid,
      aid,
      pid,
      uid,
      firstName: first_name,
      lastName: last_name
    });
  }
);
router.use('/rso', RsoRoutes);
router.use('/comment', commentRoute);


module.exports = router;
