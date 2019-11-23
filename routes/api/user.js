const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const Student = require('../../models/Student');
const Person = require('../../models/Person');
const RsoRoutes = require('./rso');
const SuperAdmin = require('../../models/SuperAdmin');

const router = express.Router();

// @route   POST api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let user = await Student.findByUsername(username);

  if (!user) {
    user = await SuperAdmin.findByUsername(username);
  }

  if (!user) {
    res.sendStatus(404);
  }

  if (!user) {
    return res.status(400).json({ message: 'Incorrect username or password' });
  }

  // Check Password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      const payload = {
        pid: user.pid,
        spid: user.spid,
        firstName: user.first_name,
        lastName: user.last_name,
        access: user.access
      };

      // Sign Token
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          res.status(400).json({ message: 'Something went wrong' });
        }
        res.status(200).json({
          token: 'Bearer ' + token
        });
      });
    } else {
      res.status(400).json({ message: 'Incorrect username or password' });
    }
  });
});

// @route   GET api/user/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { pid, first_name, last_name, access, uid, aid } = req.user;
    // if (access !== 'student') {
    //   return res.status(400).json({ message: 'Required permission: Student' });
    // }
    res.json({
      uid,
      aid,
      pid,
      uid,
      firstName: first_name,
      lastName: last_name,
      access
    });
  }
);
router.use('/rso', RsoRoutes);

module.exports = router;
