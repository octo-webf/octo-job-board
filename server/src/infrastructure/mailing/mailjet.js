const mailjetConfig = require('../../config/index').MAILJET;
const nodeMailjet = require('node-mailjet');

function _formatRecipients(recipients) {
  if (!recipients) {
    return [];
  }
  if (typeof recipients === 'string') {
    return [{ Email: recipients }];
  }
  return recipients.map(recipient => ({ Email: recipient }));
}

function _formatPayload(options) {
  return {
    FromEmail: options.from,
    FromName: options.fromName,
    Subject: options.subject,
    'Html-part': options.template,
    Recipients: _formatRecipients(options.to),
  };
}

function sendEmail(options) {
  const mailjet = nodeMailjet.connect(mailjetConfig.apiKey, mailjetConfig.apiSecret);
  return mailjet
    .post('send')
    .request(_formatPayload(options));
}

module.exports = {
  sendEmail,
};
