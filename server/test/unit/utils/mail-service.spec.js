const { describe, it, beforeEach, afterEach, sinon, expect } = require('../../test-helper')

const mailJet = require('../../../src/infrastructure/mailjet')
const mailService = require('../../../src/utils/mail-service')

describe('Unit | Service | MailService', () => {
  describe('#sendWelcomeEmail', () => {
    let sendEmailStub, interestedJobForm

    beforeEach(() => {
      sendEmailStub = sinon.stub(mailJet, 'sendEmail').resolves()
      interestedJobForm = {
        interestedNickname: 'PTR',
        businessContactNickname: 'XYZ',
        missionDirectorNickname: 'ZYX',
        octopodLink: 'https://octopod.octo.com/projects/2146904867',
        activityName: 'Développeur Front',
        missionName: 'Oodrive - Liste d\'initié'
      }
    })

    afterEach(() => {
      sendEmailStub.restore()
    })

    it('should send an email with correct options', () => {
      // When
      const promise = mailService.sendWelcomeEmail(interestedJobForm)

      // Then
      return promise.then(() => {
        sinon.assert.called(sendEmailStub)
        expect(sendEmailStub.firstCall.args[ 0 ]).to.deep.equal({
          from: 'jobboard@octo.com',
          to: 'jobboard@octo.com',
          fromName: 'Le Job Board - Ne pas répondre',
          subject: "[JobBoard] PTR intéressé·e par l'activité Développeur Front - Oodrive - Liste d'initié",
          template: "\n    <h3><a href=\"mailto:ptr@octo.com\">PTR</a> est intéressé·e par la mission <strong>Oodrive - Liste d'initié</strong> en tant que <strong>Développeur Front</strong>.</h3>\n    <p>Les business contact et commercial contact sont <a href=\"mailto:xyz@octo.com\">XYZ</a> et <a href=\"mailto:zyx@octo.com\">ZYX</a></p>\n    <p><a href=\"https://octopod.octo.com/projects/2146904867\">Cliquer ici pour accéder à l'url de la mission</a></p>\n    "
        })
      })
    })
  })
})
