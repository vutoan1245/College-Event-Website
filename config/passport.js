const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Student = require('../models/Student');
const SuperAdmin = require('../models/SuperAdmin');
const keys = require('./keys');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.sid) {
        Student.findBySid(jwt_payload.sid)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      } else if (jwt_payload.spid) {
        SuperAdmin.findBySpid(jwt_payload.spid)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      }
    })
  );
};
