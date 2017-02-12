const healthCheckRoutes = require('./healthCheck');
const listRoutes = require('./lists');
const itemRoutes = require('./items');

module.exports = (app) => {
  // Routes
  app.use(healthCheckRoutes);
  // Protected Routes
  app.use(listRoutes);
  app.use(itemRoutes);
};
