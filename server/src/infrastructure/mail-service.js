const mailJet = require('./mailjet')

function sendWelcomeEmail (interestedJobForm) {
  const options = buildMailOptions(interestedJobForm)
  return mailJet.sendEmail(options)
}

function buildMailOptions (interestedJobForm) {
  const subject = `[JobBoard] ${interestedJobForm.interestedNickname} intéressé·e par ${interestedJobForm.missionName} - ${interestedJobForm.activityName}`

  const template = `
    <h3><a href="mailto:${interestedJobForm.interestedNickname.toLowerCase()}@octo.com">${interestedJobForm.interestedNickname}</a> est intéressé·e par la mission <strong>${interestedJobForm.missionName}</strong> en tant que <strong>${interestedJobForm.activityName}</strong>.</h3>
    <p>Voir le <a href="https://octopod.octo.com/timesheet/${interestedJobForm.interestedNickname}">CRA de PTR</a></p>
    <p>Voir la <a href="${interestedJobForm.octopodLink}">page mission</a></p>
    <p>Contacter <a href="mailto:${interestedJobForm.interestedNickname.toLowerCase()}@octo.com">${interestedJobForm.interestedNickname}</a></p>
    <p>Contacter le Contact commercial : <a href="mailto:${interestedJobForm.businessContactNickname.toLowerCase()}@octo.com">${interestedJobForm.businessContactNickname}</a></p>
    <p>Contacter le Directeur de mission : <a href="mailto:${interestedJobForm.missionDirectorNickname.toLowerCase()}@octo.com">${interestedJobForm.missionDirectorNickname}</a></p>
    `

  const options = {
    from: 'jobboard@octo.com',
    fromName: 'Le Job Board - Ne pas répondre',
    to: 'jobboard@octo.com',
    subject: subject,
    template: template
  }
  return options
}

module.exports = {
  sendWelcomeEmail
}
