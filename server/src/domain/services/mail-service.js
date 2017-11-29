const { isEmpty } = require('lodash');
const mailJet = require('../../infrastructure/mailing/mailjet');
const config = require('../../config');
const interestEmailTemplate = require('../../infrastructure/mailing/interest-email-template');
const jobsChangedEmailTemplate = require('../../infrastructure/mailing/jobs-added-email-template');

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

function sendJobsChangedEmail(form) {
  const { addedJobs, removedJobs, receivers } = form;

  let subject = '[JobBoard] ';
  if (!isEmpty(addedJobs) && !isEmpty(removedJobs)) {
    subject += `${addedJobs.length} nouvelle(s) mission(s) à staffer – ${removedJobs.length} mission(s) retirée(s)`;
  } else if (!isEmpty(addedJobs)) {
    subject += `${addedJobs.length} nouvelle(s) mission(s) à staffer`;
  } else {
    subject += `${removedJobs.length} mission(s) retirée(s)`;
  }

  const template = jobsChangedEmailTemplate.compile(form);

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
  sendJobsChangedEmail,
};
