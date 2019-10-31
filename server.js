const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const student = require("./routes/api/student");
const admin = require("./routes/api/admin");
const superAdmin = require("./routes/api/super-admin");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

// Rest APIs
app.use("/api/student", student);
app.use("/api/admin", admin);
app.use("/api/superAdmin", superAdmin);
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
