const { Subscription } = require('../models');

function addSubscription(subscriberEmail) {
  return Subscription
    .findOrCreate({ where: { email: subscriberEmail } })
    .spread((subscription, created) => ({ subscription, created }));
}

function removeSubscription(subscriptionId) {
  return Subscription.destroy({ where: { id: subscriptionId } });
}

function getAllSubscriptions() {
  return Subscription.all();
}

module.exports = {
  addSubscription,
  removeSubscription,
  getAllSubscriptions,
};
