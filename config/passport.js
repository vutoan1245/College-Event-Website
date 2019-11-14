const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Student = require('../models/Student');
const SuperAdmin = require('../models/SuperAdmin');
const Admin = require('../models/Admin');
const keys = require('./keys');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.access == 'student') {
        Promise.all([
          Student.findByPid(jwt_payload.pid),
          Admin.findByPid(jwt_payload.pid)
        ])
          .then(results => {
            if (!results[0]) return done(null, false);

            let userInfo = {
              ...results[0]
            };

            if (results[1]) {
              userInfo = {
                ...userInfo,
                ...results[1]
              };
            }

            return done(null, userInfo);
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      } else if (jwt_payload.access == 'super admin') {
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
