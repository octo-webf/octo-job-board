const { sinon, expect } = require('../../../test-helper');

const mailJet = require('../../../../src/infrastructure/mailjet');
const mailService = require('../../../../src/domain/services/mail-service');

describe('Unit | Service | MailService', () => {
  beforeEach(() => {
    sinon.stub(mailJet, 'sendEmail').resolves();
  });

  afterEach(() => {
    mailJet.sendEmail.restore();
  });

  describe('#sendInterestEmail', () => {
    it('should send an email with correct options', () => {
      // given
      const form = {
        interestedConsultant: {
          name: 'Samurai Jack',
          email: 'sjack@octo.com',
        },
        businessContactNickname: 'XYZ',
        missionDirectorNickname: 'ZYX',
        octopodLink: 'https://octopod.octo.com/projects/2146904867',
        activityName: 'Développeur Front',
        missionName: 'Oodrive - Liste d\'initié',
      };

      // when
      const promise = mailService.sendInterestEmail(form);

      // then
      return promise.then(() => {
        expect(mailJet.sendEmail).to.have.been.calledWithExactly({
          from: 'jobboard+test@octo.com',
          to: 'jobboard+test@octo.com',
          fromName: 'Le Job Board - Ne pas répondre',
          subject: '[JobBoard] Samurai Jack intéressé·e par Oodrive - Liste d\'initié - Développeur Front',
          template: '\n    <h3><a href="mailto:sjack@octo.com">Samurai Jack</a> est intéressé·e par la mission <strong>Oodrive - Liste d\'initié</strong> en tant que <strong>Développeur Front</strong>.</h3>\n    <p>Voir la <a href="https://octopod.octo.com/projects/2146904867">page mission</a></p>\n    <p>Contacter le Contact commercial : <a href="https://askbob.octo.com/users/xyz">XYZ</a></p>\n    <p>Contacter le Directeur de mission : <a href="https://askbob.octo.com/users/zyx">ZYX</a></p>\n    ',
        });
      });
    });
  });

  describe('#sendFeedbackEmail', () => {
    it('should send an email with correct options', () => {
      // given
      const form = {
        consultant: {
          name: 'Tony Stark',
          email: 'tony@stark.im',
        },
        feedback: 'Long ago in a distant land...',
      };

      // when
      const promise = mailService.sendFeedbackEmail(form);

      // then
      return promise.then(() => {
        expect(mailJet.sendEmail).to.have.been.calledWithExactly({
          from: 'jobboard+test@octo.com',
          to: 'jobboard+test@octo.com',
          fromName: 'Le Job Board - Ne pas répondre',
          subject: '[JobBoard] [Support] Tony Stark a émis un message',
          template: 'Long ago in a distant land...',
        });
      });
    });
  });
});
