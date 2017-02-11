const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  list: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Item', itemSchema);
