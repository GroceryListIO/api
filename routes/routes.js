const healthCheckRoutes = require('./healthCheck');
const listRoutes = require('./lists');
const itemRoutes = require('./items');
const userRoutes = require('./user');

module.exports = (app) => {
  // Routes
  app.use(healthCheckRoutes);
  app.use(userRoutes);
  // Protected Routes
  app.use(listRoutes);
  app.use(itemRoutes);
};
