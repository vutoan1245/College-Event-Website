const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const SuperAdmin = require("../../models/SuperAdmin");

const router = express.Router();

module.exports = router;
