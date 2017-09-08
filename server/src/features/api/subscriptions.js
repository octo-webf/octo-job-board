const express = require('express');
const auth = require('../../infrastructure/middlewares/auth');
const subscriptionService = require('../../domain/services/subscription-service');

const router = express.Router();

router.post('/', auth, (req, res) => {

  const { userEmail } = req;

  subscriptionService
    .addSubscription(userEmail)
    .then(({ subscription, created }) => {
      if (created) {
        res.status(201);
      }
      res.json(subscription);
    })
    .catch(() => {
      res.status(403).send();
    });
});

router.delete('/:id', (req, res) => {
  const subscriptionId = parseInt(req.params.id, 10);
  subscriptionService
    .removeSubscription(subscriptionId)
    .then(() => res.status(204).send());
});

module.exports = router;
