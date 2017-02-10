// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/config.js');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Express setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Environment specific setup
if (config.env === 'Development') {
  app.use(morgan('dev'));
  app.use('/swagger', express.static('swagger'));
} else if (config.env === 'Production') {
  app.use(morgan('combined'));
}

// DB
mongoose.connect(config.db);

// Routes
require('./routes/routes.js')(app);

// Main
app.listen(config.port);
module.exports = app;
