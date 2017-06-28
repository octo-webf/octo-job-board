const { sinon, expect } = require('../../test-helper')

const mailjet = require('../../../src/infrastructure/mailjet')
const mailService = require('../../../src/infrastructure/mail-service')

describe('Unit | Service | MailService', () => {
  describe('#sendWelcomeEmail', () => {
    let interestedJobForm

    beforeEach(() => {
      sinon.stub(mailjet, 'sendEmail').resolves()
      interestedJobForm = {
        interestedConsultant: {
          name: 'Samurai Jack',
          email: 'sjack@octo.com'
        },
        businessContactNickname: 'XYZ',
        missionDirectorNickname: 'ZYX',
        octopodLink: 'https://octopod.octo.com/projects/2146904867',
        activityName: 'Développeur Front',
        missionName: 'Oodrive - Liste d\'initié'
      }
    })

    afterEach(() => {
      mailjet.sendEmail.restore()
    })

    it('should send an email with correct options', () => {
      // given
      const expectedParams = {
        from: 'jobboard+test@octo.com',
        to: 'jobboard+test@octo.com',
        fromName: 'Le Job Board - Ne pas répondre',
        subject: "[JobBoard] Samurai Jack intéressé·e par Oodrive - Liste d'initié - Développeur Front",
        template: "\n    <h3><a href=\"mailto:sjack@octo.com\">Samurai Jack</a> est intéressé·e par la mission <strong>Oodrive - Liste d'initié</strong> en tant que <strong>Développeur Front</strong>.</h3>\n    <p>Voir la <a href=\"https://octopod.octo.com/projects/2146904867\">page mission</a></p>\n    <p>Contacter le Contact commercial : <a href=\"https://askbob.octo.com/users/xyz\">XYZ</a></p>\n    <p>Contacter le Directeur de mission : <a href=\"https://askbob.octo.com/users/zyx\">ZYX</a></p>\n    "
      }

      // when
      const promise = mailService.sendWelcomeEmail(interestedJobForm)

      // then
      return promise.then(() => {
        expect(mailjet.sendEmail).to.have.been.calledWith(expectedParams)
      })
    })
  })
})
