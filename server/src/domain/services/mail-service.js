const mailJet = require('../../infrastructure/mailing/mailjet');
const config = require('../../config');
const interestEmailTemplate = require('../../infrastructure/mailing/interest-email-template');
const jobsAddedEmailTemplate = require('../../infrastructure/mailing/jobs-added-email-template');

function sendInterestEmail(form) {
  const subject = `[JobBoard] ${form.interestedConsultant.name} intéressé·e par ${form.missionName} - ${form.activityName}`;
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
  const subject = `[JobBoard] [Support] ${form.consultant.name} a émis un message`;
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

function sendJobsAddedEmail(form) {
  const { addedJobs, receivers } = form;
  const subject = `[JobBoard] ${addedJobs.length} nouvelle(s) mission(s) à staffer`;
  const template = jobsAddedEmailTemplate.compile(form);

  const options = {
    from: config.MAIL_FROM,
    fromName: 'Le Job Board - Ne pas répondre',
    to: receivers,
    subject,
    template,
  };

  return mailJet.sendEmail(options);
}

module.exports = {
  sendInterestEmail,
  sendFeedbackEmail,
  sendJobsAddedEmail,
};
