const mailJet = require('../../infrastructure/mailing/mailjet');
const config = require('../../config');
const interestEmailTemplate =require('../../infrastructure/mailing/interest-email-template');

function sendInterestEmail(form) {
  const { interestedConsultant } = form;
  const subject = `[JobBoard] ${interestedConsultant.name} intéressé·e par ${form.missionName} - ${form.activityName}`;
  const template = interestEmailTemplate.compile(form);

  const options = {
    from: config.MAIL_FROM,
    fromName: 'Le Job Board - Ne pas répondre',
    to: config.MAIL_TO,
    subject,
    template,
  };

  return mailJet.sendEmail(options);
}

function sendFeedbackEmail(form) {
  const consultant = form.consultant;
  const subject = `[JobBoard] [Support] ${consultant.name} a émis un message`;
  const template = `${form.feedback}`;

  const options = {
    from: config.MAIL_FROM,
    fromName: 'Le Job Board - Ne pas répondre',
    to: config.MAIL_TO,
    subject,
    template,
  };

  return mailJet.sendEmail(options);
}

module.exports = {
  sendInterestEmail,
  sendFeedbackEmail,
};
