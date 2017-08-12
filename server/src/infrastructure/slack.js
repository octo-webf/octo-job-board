const IncomingWebhook = require('@slack/client').IncomingWebhook;

const url = process.env.SLACK_WEBHOOK_URL || '';

const SlackClient = {

  postMessage(text) {
    return new Promise((resolve, reject) => {
      const webhook = new IncomingWebhook(url);

      webhook.send(text, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
};

module.exports = SlackClient;
