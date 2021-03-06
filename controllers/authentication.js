/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const User = require('../models/user');
const List = require('../models/list');

// Decode jwt into auth info
function getAuth(req) {
  const token = req.headers.authorization.split(' ')[1];
  const authInfo = jwt.decode(token, config.jwtsecret);
  return authInfo;
}

// Encode a jwt token
function generateToken(user) {
  return jwt.sign(user, config.jwtsecret, {
    expiresIn: 10080, // in seconds
  });
}

// Set user info from request
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

exports.ownerCheck = (req, res, next) => {
  const authInfo = getAuth(req);
  List.findOne({ _id: req.params.listID }, (err, list) => {
    if (err) throw err;

    if (list.owner === authInfo._id) {
      next();
    } else {
      res.status(401).json({ error: 'You are not authorized to make that action.' });
    }
  });
};

exports.getAuth = getAuth;
