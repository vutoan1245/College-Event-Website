const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const router = express.Router();
const SuperAdmin = require('../../models/SuperAdmin');
const University = require('../../models/Universities');

// @route   POST api/super-admin/register
// @desc    Register super admin
// @access  Public
router.post('/register-super-admin', (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  SuperAdmin.findByUsername(username).then(user => {
    if (user) {
      res.status(404).json({ message: 'user exists' });
    } else {
      newSuperAdmin = {
        username,
        password,
        firstName,
        lastName
      };
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            res.status(400).json({ message: 'Something went wrong' });
            throw err;
          }

          newSuperAdmin.password = hash;

          SuperAdmin.add(newSuperAdmin)
            .then(() => res.status(200).json({ message: 'Success' }))
            .catch(() =>
              res.status(400).json({ message: 'Something went wrong' })
            );
        });
      });
    }
  });
});

// @route   POST api/super-admin/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  SuperAdmin.findByUsername(username).then(user => {
    if (!user) {
      res.status(400).json({ message: 'Incorrect username or password' });
    }
    if (!user.spid) {
      res.status(400).json({ message: 'Required permission: super admin' });
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          pid: user.pid,
          spid: user.spid,
          firstName: user.first_name,
          lastName: user.last_name
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
  });
});

// @route   POST api/super-admin/add-university
// @desc    Create new university profile
// @access  Public
router.post(
  '/add-university',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { spid } = req.user;
    const { name, description, student_count, picture, address } = req.body;

    if (!spid) {
      return res
        .status(400)
        .json({ message: 'Required permission: Super Admin' });
    }
    University.findByName(name).then(uni => {
      if (uni.length > 0) {
        res.status(404).json({ message: "University's profile exists" });
      } else {
        const newUni = {
          spid,
          name,
          description,
          student_count,
          picture,
          address
        };
        University.add(newUni)
          .then(() => res.status(200).json({ message: 'Success' }))
          .catch(() => res.status(400).json({ message: 'Something wrong' }));
      }
    });
  }
);

module.exports = router;
