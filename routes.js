var jwt      = require('express-jwt');
var config   = require('./config/config.js')

// Models
var List = require('./models/list')

// jwt auth config
var jwtCheck = jwt({
  secret: new Buffer(config.jwt.secret, 'base64'),
  audience: config.jwt.audience
});


module.exports = function (app) {

  // Seperated Routes 
  app.use(require('./routes/healthCheck'));

  app.use(require('./routes/lists', jwtCheck));

  // ========================================
  //  Default Routes
  // ========================================
  app.get('/', function(req, res) {
      res.send();
  });

  app.use('/secured', jwtCheck); // Protected
  app.get('/secured', function(req, res) {
      res.json({ "SECURED": true })
  });


  // ========================================
  //  Items Routes
  // ========================================
  app.get('/items/:listId', function(req, res) { // Return all items on a list
      res.send("TODO: return all items on a list");
  });

  app.get('/items/:listId/:id', function(req, res) { // Return a single item
      res.send("TODO: return a single item");
  });

}; // end module.exports

