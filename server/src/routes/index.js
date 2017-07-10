const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ azerty: 'azertty' });
});

module.exports = router;
