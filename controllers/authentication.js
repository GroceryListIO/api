const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const User = require('../models/user');

function generateToken(user) {
  return jwt.sign(user, config.jwtsecret, {
    expiresIn: 10080, // in seconds
  });
}

// Set user info from request
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
  };
}

// Login Routes
exports.login = (req, res) => {
  const userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo,
  });
};

// Registration Route
exports.register = (req, res, next) => {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;

  // Validate Fields
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.' });
  }
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    const user = new User({
      email,
      password,
    });

    user.save((error, newUser) => {
      if (error) { return next(error); }

      // TODO: Subscribe to mailing lists, send new user email

      // Respond with JWT if user was created
      const userInfo = setUserInfo(newUser);

      return res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo,
      });
    });
    return false;
  });
  return false;
};

// authorization check
exports.ownerCheck = function (ownerID) {
  return function (req, res, next) {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(401).json({ error: 'User not found.' });
        return next(err);
      }

      // Is this user the same as the owner
      if (foundUser._id === ownerID) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    });
  };
};
