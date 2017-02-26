const passport = require('passport');
require('./config/passport');

// Controllers.
const authController = require('./controllers/authentication');
const listsController = require('./controllers/lists');
const itemController = require('./controllers/items');
const healthCheckController = require('./controllers/healthCheck');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });
const ownerCheck = authController.ownerCheck;

// Attach Routes
module.exports = (app) => {
  // Defaults
  app.get('/health', healthCheckController.healthCheck);

  // Auth / User
  app.post('/register', authController.register);
  app.post('/login', requireLogin, authController.login);

  // Lists
  app.get('/lists', requireAuth, listsController.getLists);
  app.post('/lists', requireAuth, listsController.newList);
  app.put('/lists/:listID', requireAuth, ownerCheck, listsController.updateList);
  app.get('/lists/:listID', requireAuth, ownerCheck, listsController.getList);
  app.delete('/lists/:listID', requireAuth, ownerCheck, listsController.deleteList);

  // Items
  app.get('/lists/:listID/items', requireAuth, ownerCheck, itemController.getItems);
  app.post('/lists/:listID/items', requireAuth, ownerCheck, itemController.newItem);
  app.put('/lists/:listID/items/:itemID', requireAuth, ownerCheck, itemController.updateItem);
  app.get('/lists/:listID/items/:itemID', requireAuth, ownerCheck, itemController.getItem);
  app.delete('/lists/:listID/items/:itemID', requireAuth, ownerCheck, itemController.deleteItem);
};
