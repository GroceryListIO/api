// Importing Passport, strategies, and config
const passport = require('passport');
const User = require('../models/user');
const config = require('./config');
const LocalStrategy = require('passport-local');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setting username field to email rather than username
const localOptions = {
  usernameField: 'email',
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, (error, isMatch) => {
      if (error) { return done(error); }
      if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

      return done(null, user);
    });
    return false;
  });
});

// Setting JWT strategy options
const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.jwtsecret,

  // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
    return false;
  });
  return false;
});

passport.use(jwtLogin);
passport.use(localLogin);
