const express = require('express');
const auth = require('../../infrastructure/middlewares/auth');
const mailService = require('../../infrastructure/mail-service');

const router = express.Router();

router.post('/', auth, (req, res) => {
  const form = req.body;
  mailService.sendFeedbackEmail(form)
    .then(() => {
      res.status(201).json('Feedback sent');
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
