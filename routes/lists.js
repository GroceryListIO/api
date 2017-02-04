const express = require('express');
const List = require('../models/list');

const router = express.Router();

// Return all lists
router.get('/list', (req, res) => {
  List.find({}, (err, lists) => {
    if (err) throw err;
    res.json(lists);
  });
});

// Create a list
router.post('/list', (req, res) => {
  const newList = List(req.body);

  newList.save((err) => {
    if (err) throw err;
    res.status(200);
  });
});

// Return a signle list
router.get('/list/:id', (req, res) => {
  List.find({ _id: req.params.id }, (err, list) => {
    if (err) throw err;
    res.send(list);
  });
});

module.exports = router;
