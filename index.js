// Libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const port = process.env.PORT || 8080;
const mode = process.env.MODE || 'Devlopment';
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Express setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('dev'));
if (mode === 'Devlopment') {
  app.use('/swagger', express.static('swagger'));
}

// DB
mongoose.connect('mongodb://localhost:27017/sgl');

// Routes
require('./routes/routes.js')(app);


// Main
app.listen(port);
module.exports = app;
