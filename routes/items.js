const express = require('express');
const Item = require('../models/item');

const router = express.Router();

// Return all items in a list
router.get('/lists/:listID/items', (req, res) => {
  Item.find({ list: req.params.listID }, (err, items) => {
    if (err) throw err;
    res.json(items);
  });
});

// Create an item
router.post('/lists/:listID/items', (req, res) => {
  const item = req.body;
  item.list = req.params.listID;
  const newItem = Item(item);

  newItem.save((err) => {
    if (err) throw err;
    res.send(newItem);
  });
});

module.exports = router;
