const _ = require('lodash')
const mailjetConfig = require('../config/index').mailjet
const nodeMailjet = require('node-mailjet')

function _formatPayload (options) {
  return {
    'FromEmail': options.from,
    'FromName': options.fromName,
    'Subject': options.subject,
    'Html-part': options.template,
    'Recipients': [ { 'Email': options.to } ]
  }
}

function sendEmail (options) {
  const mailjet = nodeMailjet.connect(mailjetConfig.apiKey, mailjetConfig.apiSecret)
  return mailjet
    .post('send')
    .request(_formatPayload(options))
}

module.exports = {
  sendEmail
}
