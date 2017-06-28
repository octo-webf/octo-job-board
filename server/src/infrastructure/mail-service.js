const mailJet = require('./mailjet')
const config = require('../config')

function sendWelcomeEmail (interestedJobForm) {
  const options = buildMailOptions(interestedJobForm)
  return mailJet.sendEmail(options)
}

function buildMailOptions (interestedJobForm) {
  const {interestedConsultant} = interestedJobForm
  const subject = `[JobBoard] ${interestedConsultant.name} intéressé·e par ${interestedJobForm.missionName} - ${interestedJobForm.activityName}`

  const template = `
    <h3><a href="mailto:${interestedConsultant.email}">${interestedConsultant.name}</a> est intéressé·e par la mission <strong>${interestedJobForm.missionName}</strong> en tant que <strong>${interestedJobForm.activityName}</strong>.</h3>
    <p>Voir la <a href="${interestedJobForm.octopodLink}">page mission</a></p>
    <p>Contacter le Contact commercial : <a href="https://askbob.octo.com/users/${interestedJobForm.businessContactNickname.toLowerCase()}">${interestedJobForm.businessContactNickname}</a></p>
    <p>Contacter le Directeur de mission : <a href="https://askbob.octo.com/users/${interestedJobForm.missionDirectorNickname.toLowerCase()}">${interestedJobForm.missionDirectorNickname}</a></p>
    `

  const options = {
    from: 'jobboard@octo.com',
    fromName: 'Le Job Board - Ne pas répondre',
    to: config.MAIL_TO,
    subject: subject,
    template: template
  }
  return options
}

module.exports = {
  sendWelcomeEmail
}
