const express = require('express');
const List = require('../models/list');

const router = express.Router();

// Return all lists
router.get('/lists', (req, res) => {
  List.find({}, (err, lists) => {
    if (err) throw err;
    res.json(lists);
  });
});

// Create a list
router.post('/lists', (req, res) => {
  const newList = List(req.body);

  newList.save((err) => {
    if (err) throw err;
    res.send(newList);
  });
});

// Delete a list
router.delete('/lists/:id', (req, res) => {
  List.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) throw err;
    res.send();
  });
});

// Return a signle list
router.get('/lists/:id', (req, res) => {
  List.findOne({ _id: req.params.id }, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
});

module.exports = router;
