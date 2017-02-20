const passport = require('passport');
require('./config/passport');

// Controllers. TODO: Movee everything to controller style
const authController = require('./controllers/authentication');

// Routes. Simpler route style endpoints.
const healthCheckRoutes = require('./routes/healthCheck');
const listRoutes = require('./routes/lists');
const itemRoutes = require('./routes/items');

// Middleware to require login/auth
// const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // Routes //

  // Defaults
  app.use(healthCheckRoutes);

  // Auth / User
  app.post('/register', authController.register);
  app.post('/login', requireLogin, authController.login);

  // Protected Routes
  app.use(listRoutes);
  app.use(itemRoutes);
};
