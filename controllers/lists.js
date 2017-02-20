const List = require('../models/list');

// Return all lists
exports.getLists = (req, res) => {
  List.find({}, (err, lists) => {
    if (err) throw err;
    res.json(lists);
  });
};

// Create a list
exports.newList = (req, res) => {
  const newList = List(req.body);

  newList.save((err) => {
    if (err) throw err;
    res.send(newList);
  });
};

// Delete a list
exports.deleteList = (req, res) => {
  List.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) throw err;
    res.send();
  });
};

// Return a signle list
exports.getList = (req, res) => {
  List.findOne({ _id: req.params.id }, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
};
