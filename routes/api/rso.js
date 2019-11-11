const express = require("express");
const University = require("../../models/University");
const passport = require("passport");
const router = express.Router();
const Rso = require("../../models/Rso");
const Admin = require("../../models/Admin");
// @route   POST api/../rso/create
// @desc    Create rso
// @access  Student
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, description, admin, member } = req.body;
    Admin.add(admin)
      .then(aid => {
        const newRso = { name, description, aid };
        Rso.add(newRso)
          .then(result => {
            console.log(result);
            res.status(200).json({ message: "OK" });
          })
          .catch(() =>
            res
              .status(400)
              .json({ message: "Something wrong when add new rso" })
          );
      })
      .catch(err => {
        console.log(err);
        res.status(200).json({ message: "Something wrong when add admin" });
      });
  }
);

module.exports = router;
