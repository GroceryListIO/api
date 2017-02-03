// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Configs
const config = require('./config/config.json');

const port = process.env.PORT || config.port;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Express setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('combined'));

// DB
mongoose.connect(config.db_url);

// Routes
require('./routes.js')(app);

// Main
app.listen(port);
console.log('Server started at http://localhost: %s', port);
