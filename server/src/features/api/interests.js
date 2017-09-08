const express = require('express');
const auth = require('../../infrastructure/middlewares/auth');
const mailService = require('../../domain/services/mail-service');

const router = express.Router();

router.post('/', auth, (req, res) => {
  const form = req.body;
  mailService.sendInterestEmail(form)
    .then(() => {
      res.status(201).json('Succès');
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
