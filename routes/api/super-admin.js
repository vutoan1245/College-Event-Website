const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const Person = require("../../models/Person");

const keys = require("../../config/keys");
const SuperAdmin = require("../../models/SuperAdmin");
const UniversityRoutes = require("./university");
// @route   POST api/super-admin/register
// @desc    Register super admin
// @access  Public
router.post("/register", (req, res) => {
  const { username, password, first_name, last_name, phone, email } = req.body;

  Person.findByUsername(username)
    .then(user => {
      if (user) {
        return res.status(404).json({ message: "user exists" });
      } else {
        Person.findByUsername(email).then(e => {
          if (e) {
            return res.status(404).json({ message: "email exists" });
          } else {
            newSuperAdmin = {
              username,
              password,
              first_name,
              last_name,
              phone,
              email
            };
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                  res.status(400).json({ message: "Something went wrong" });
                  throw err;
                }

                newSuperAdmin.password = hash;

                SuperAdmin.add(newSuperAdmin)
                  .then(() => res.status(200).json({ message: "Success" }))
                  .catch(() =>
                    res.status(400).json({ message: "Something went wrong" })
                  );
              });
            });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ message: "Something went wrong" });
    });
});

// @route   POST api/super-admin/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  SuperAdmin.findByUsername(username)
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ message: "Incorrect username or password" });
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
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ message: "Something went wrong" });
    });
});

// @route   api/super-admin/university
// @desc    University routes
// @access  Super Admin
router.use("/university", UniversityRoutes);

module.exports = router;
