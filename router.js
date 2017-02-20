const passport = require('passport');
require('./config/passport');

// Controllers. TODO: Movee everything to controller style
const authController = require('./controllers/authentication');
const listsController = require('./controllers/lists');

// Routes. Simpler route style endpoints.
const healthCheckRoutes = require('./routes/healthCheck');
const itemRoutes = require('./routes/items');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // Routes //

  // Defaults
  app.use(healthCheckRoutes);

  // Auth / User
  app.post('/register', authController.register);
  app.post('/login', requireLogin, authController.login);

  // Lists
  app.get('/lists', requireAuth, listsController.getLists);
  app.post('/lists', requireAuth, listsController.newList);
  app.get('/lists/:id', requireAuth, listsController.getList);
  app.delete('/lists/:id', requireAuth, listsController.deleteList);

  app.use(itemRoutes);
};
