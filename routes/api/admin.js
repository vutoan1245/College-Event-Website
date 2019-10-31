const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const Admin = require("../../models/Admin");

const router = express.Router();

// @route   POST api/admin/create-admin
// @desc    Promote a student to admin
// @access  Public
router.post("/create-admin", (req, res) => {
  const { sid } = req.body;
  const newAdmin = { sid };
  Admin.add(newAdmin)
    .then(() => res.status(200).json({ message: "Success" }))
    .catch(() => res.status(400).json({ message: "Something went wrong" }));
});

// @route   POST api/admin/
// @desc    Promote a student to admin
// @access  Public

module.exports = router;
