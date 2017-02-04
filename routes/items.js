const express = require('express');

const router = express.Router();

// Return all items on a list
router.get('/items/:listId', (req, res) => {
  res.send('TODO: return all items on a list');
});

// Return a single item
router.get('/items/:listId/:id', (req, res) => {
  res.send('TODO: return a single item');
});

module.exports = router;
