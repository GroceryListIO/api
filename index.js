// Libraries
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var cors        = require('cors')
var mongoose    = require('mongoose');
var morgan = require("morgan")

// Configs
var config      = require('./config/config.js')
var port        = process.env.PORT || config.port;
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Express setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('combined'));

// DB
mongoose.connect(config.db_url);

// Routes
require("./routes.js")(app);

// Main
app.listen(port);
console.log('Server started at http://localhost:' + port);
