const express = require("express");
const passport = require("passport");
const moment = require("moment");
const router = express.Router();

const Event = require("../../models/Event");
const PublicEvent = require("../../models/PublicEvent");

// @route   POST api/event/create
// @desc    Create rso
// @access  Student
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { aid } = req.user;
    const {
      name,
      description,
      type,
      date,
      email,
      phone,
      lname,
      address,
      category
    } = req.body;

    const location = {
      lname,
      address
    };

    const newEvent = {
      name,
      description,
      time: moment(date).format("YYYY-MM-DD HH:mm:ss"),
      location,
      category
    };

    Event.add(newEvent)
      .then(eid => PublicEvent.add({ eid, aid }))
      .then(() => res.status(200).send({ message: "Success" }))
      .catch(err => {
        console.log(err);
        res.status(400).send({ err });
      });
  }
);

module.exports = router;
