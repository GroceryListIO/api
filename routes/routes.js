const jwt = require('express-jwt');

const defaultRoutes = require('./default');
const healthCheckRoutes = require('./healthCheck');
const listRoutes = require('./lists');
const itemRoutes = require('./items');

// jwt auth config
const jwtCheck = jwt({
  secret: new Buffer(process.env.jwtsecret || '', 'base64'),
  audience: process.env.jwtaudience || '',
});

module.exports = (app) => {
  // Routes
  app.use(defaultRoutes);
  app.use(healthCheckRoutes);
  // Protected Routes
  app.use(listRoutes, jwtCheck);
  app.use(itemRoutes, jwtCheck);
};
