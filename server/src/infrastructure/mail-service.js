const mailJet = require('./mailjet');
const config = require('../config');

function sendInterestEmail(form) {
  const { interestedConsultant } = form;
  const subject = `[JobBoard] ${interestedConsultant.name} intéressé·e par ${form.missionName} - ${form.activityName}`;

  const template = `
    <h3><a href="mailto:${interestedConsultant.email}">${interestedConsultant.name}</a> est intéressé·e par la mission <strong>${form.missionName}</strong> en tant que <strong>${form.activityName}</strong>.</h3>
    <p>Voir la <a href="${form.octopodLink}">page mission</a></p>
    <p>Contacter le Contact commercial : <a href="https://askbob.octo.com/users/${form.businessContactNickname.toLowerCase()}">${form.businessContactNickname}</a></p>
    <p>Contacter le Directeur de mission : <a href="https://askbob.octo.com/users/${form.missionDirectorNickname.toLowerCase()}">${form.missionDirectorNickname}</a></p>
    `;

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
    from: 'jobboard@octo.com',
    fromName: 'Le Job Board - Ne pas répondre',
    to: 'jobboard@octo.com',
    subject,
    template,
  };

  return mailJet.sendEmail(options);
}

module.exports = {
  sendInterestEmail,
  sendFeedbackEmail,
};
