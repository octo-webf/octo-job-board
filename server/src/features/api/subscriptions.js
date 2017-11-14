const express = require('express');
const auth = require('../../infrastructure/middlewares/auth');
const subscriptionService = require('../../domain/services/subscription-service');

const router = express.Router();

router.post('/', auth, (req, res) => {
  const userEmail = req.userEmail;

  subscriptionService.addSubscription(userEmail)
    .then(({ subscription, created }) => {
      if (created) {
        res.status(201);
      }
      res.json(subscription);
    })
    .catch(() => res.status(403).send());
});

router.delete('/', auth, (req, res) => {
  const userEmail = req.userEmail;
  subscriptionService.removeSubscription(userEmail)
    .then(() => res.status(204).send())
    .catch(() => res.status(500).send());
});

module.exports = router;
