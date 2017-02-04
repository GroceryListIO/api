const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ STATUS: 'UP' });
});

module.exports = router;
