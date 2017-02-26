/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
const authController = require('./authentication');
const List = require('../models/list');

// Return all lists
exports.getLists = (req, res) => {
  List.find({ owner: authController.getAuth(req)._id }, (err, lists) => {
    if (err) throw err;
    res.json(lists);
  });
};

// Create a list
exports.newList = (req, res) => {
  const newList = List(req.body);
  newList.owner = authController.getAuth(req)._id;

  newList.save((err) => {
    if (err) throw err;
    res.send(newList);
  });
};

// Update a list
exports.updateList = (req, res) => {
  List.findOneAndUpdate({ _id: req.params.listID }, req.body, { new: true }, (err, list) => {
    if (err) throw err;
    res.json(list);
  });
};

// Delete a list
exports.deleteList = (req, res) => {
  List.findOneAndRemove({ _id: req.params.listID }, (err) => {
    if (err) throw err;
    res.send();
  });
};

// Return a signle list
exports.getList = (req, res) => {
  List.findOne({ _id: req.params.listID }, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
};
