const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Student = require("../../models/Student");
const Rso = require("../../models/Rso");
const router = express.Router();

// @route   POST api/student/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  Student.findByUsername(username).then(user => {
    if (user) {
      res.status(404).json({ message: "user exists" });
    } else {
      const newStudent = {
        username,
        password,
        firstName,
        lastName
      };

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            res.status(400).json({ message: "Something went wrong" });
            throw err;
          }

          newStudent.password = hash;

          Student.add(newStudent)
            .then(() => res.status(200).json({ message: "Success" }))
            .catch(() =>
              res.status(400).json({ message: "Something went wrong" })
            );
        });
      });
    }
  });
});

// @route   POST api/student/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Student.findByUsername(username).then(user => {
    if (!user) {
      res.status(400).json({ message: "Incorrect username or password" });
    }
    if (!user.sid) {
      res.status(400).json({ message: "Required permission: Student" });
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          pid: user.pid,
          sid: user.sid,
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
              res.status(400).json({ message: "Something went wrong" });
            }
            res.status(200).json({
              token: "Bearer " + token
            });
          }
        );
      } else {
        res.status(400).json({ message: "Incorrect username or password" });
      }
    });
  });
});

// @route   GET api/student/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { sid, pid, first_name, last_name } = req.user;
    if (!sid) {
      return res.status(400).json({ message: "Required permission: Student" });
    }
    res.json({
      sid,
      pid,
      firstName: first_name,
      lastName: last_name
    });
  }
);

// @route   GET api/student/create-rso
// @desc    Create new rso
// @access  Private
router.post(
  "/create-rso",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, description } = req.body;
    const newAdmin = req.body.admin;
    const initMember = req.body.members;
    if (newAdmin == undefined) {
      return res.json({ message: "Require one admin" });
    }
    if (initMember.length < 4) {
      return res.json({ message: "Require at least 5 members" });
    }
    const emailSet = new Set();
    for (mem in initMember) {
      const domain = mem.split("@")[1];
      emailSet.add(domain);
    }
    if (emailSet.size > 1) {
      return res.json({
        message: "All initial members must have the same email domain"
      });
    }
    const newRso = { name, description, newAdmin, initMember };
    Rso.add(newRso)
      .then(() => res.status(200).json({ message: "Sucess" }))
      .catch(() => res.status(400).json({ message: "Someting wrong" }));
  }
);
module.exports = router;
