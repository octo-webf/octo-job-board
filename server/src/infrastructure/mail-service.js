const mailJet = require('./mailjet')

function sendWelcomeEmail (interestedJobForm) {
  const options = buildMailOptions(interestedJobForm)
  return mailJet.sendEmail(options)
}

function buildMailOptions (interestedJobForm) {
  const subject = `[JobBoard] ${interestedJobForm.interestedNickname} intéressé·e par l'activité ${interestedJobForm.activityName} - ${interestedJobForm.missionName}`

  const template = `
    <h3><a href="mailto:${interestedJobForm.interestedNickname.toLowerCase()}@octo.com">${interestedJobForm.interestedNickname}</a> est intéressé·e par la mission <strong>${interestedJobForm.missionName}</strong> en tant que <strong>${interestedJobForm.activityName}</strong>.</h3>
    <p>Les business contact et commercial contact sont <a href="mailto:${interestedJobForm.businessContactNickname.toLowerCase()}@octo.com">${interestedJobForm.businessContactNickname}</a> et <a href="mailto:${interestedJobForm.missionDirectorNickname.toLowerCase()}@octo.com">${interestedJobForm.missionDirectorNickname}</a></p>
    <p><a href="${interestedJobForm.octopodLink}">Cliquer ici pour accéder à l'url de la mission</a></p>
    `

  const options = {
    from: 'jobboard@octo.com',
    fromName: 'Le Job Board - Ne pas répondre',
    to: 'jobboard@octo.com',
    subject: subject,
    template: template,
  }
  return options
}

module.exports = {
  sendWelcomeEmail
}
