require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const user = require('./routes/api/user');
const student = require('./routes/api/student');
const admin = require('./routes/api/admin');
const superAdmin = require('./routes/api/super-admin');
const university = require('./routes/api/university');
const event = require('./routes/api/event');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// Rest APIs
app.use('/api/user', user);
app.use('/api/student', student);
app.use('/api/admin', admin);
app.use('/api/super-admin', superAdmin);
app.use('/api/university', university);
app.use('/api/event', event);

// Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
