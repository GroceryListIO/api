const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  owner: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('List', listSchema);
