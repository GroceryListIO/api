exports.healthCheck = (req, res) => {
  res.json({ STATUS: 'UP' });
};
