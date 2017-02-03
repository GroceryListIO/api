var jwt      = require('express-jwt');
var config   = require('./config/config.json')

// Models
var List = require('./models/list')

// jwt auth config
var jwtCheck = jwt({
  secret: new Buffer(config.jwt.secret, 'base64'),
  audience: config.jwt.audience
});


module.exports = function (app) {

  // ========================================
  //  Default Routes
  // ========================================
  app.get('/', function(req, res) {
      res.send();
  });

  app.get('/health', function(req, res) {
      res.json({ "STATUS": "UP" })
  });

  app.use('/secured', jwtCheck); // Protected
  app.get('/secured', function(req, res) {
      res.json({ "SECURED": true })
  });

  // ========================================
  //  Lists Routes
  // ========================================
  app.use('/list', jwtCheck); // Protected
  app.get('/list', function(req, res) { // Return all lists

      List.find({}, function(err, lists) {
        if (err) throw err;
        res.json(lists);
      });

  });

  app.post('/list', function(req, res) { // Create a list
    var newList = List(req.body);

    newList.save(function(err) {
      if (err) throw err;
    });

  });

  app.get('/list/:id', function(req, res) { // Return a signle list

    List.find({ '_id': req.params.id }, function(err, list) {
      if (err) throw err;

      res.send(list);
    });

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

