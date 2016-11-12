var mongoose = require('mongoose');

var listSchema = mongoose.Schema({

    'owner'       : String,
    'name'        : String,
    'description' : String

});

module.exports = mongoose.model('List', listSchema);
