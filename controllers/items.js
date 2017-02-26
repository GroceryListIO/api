const Item = require('../models/item');

// Return all items in a list
exports.getItems = (req, res) => {
  Item.find({ list: req.params.listID }, (err, items) => {
    if (err) throw err;
    res.json(items);
  });
};

// Create an item
exports.newItem = (req, res) => {
  const item = req.body;
  item.list = req.params.listID;
  const newItem = Item(item);

  newItem.save((err) => {
    if (err) throw err;
    res.json(newItem);
  });
};

// Update an item
exports.updateItem = (req, res) => {
  Item.findOneAndUpdate({ _id: req.params.itemID }, req.body, { new: true }, (err, item) => {
    if (err) throw err;
    res.json(item);
  });
};

// Return a signle item
exports.getItem = (req, res) => {
  Item.findOne({ _id: req.params.itemID }, (err, item) => {
    if (err) throw err;
    res.json(item);
  });
};

// Delete an item
exports.deleteItem = (req, res) => {
  Item.findOneAndRemove({ _id: req.params.itemID }, (err) => {
    if (err) throw err;
    res.send();
  });
};
