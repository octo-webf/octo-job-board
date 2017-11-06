const { Subscription } = require('../models');

function addSubscription(subscriberEmail) {
  return Subscription
    .findOrCreate({ where: { email: subscriberEmail } })
    .spread((subscription, created) => ({ subscription, created }));
}

function removeSubscription(userEmail) {
  return Subscription.destroy({ where: { email: userEmail } });
}

module.exports = {
  addSubscription,
  removeSubscription,
};
