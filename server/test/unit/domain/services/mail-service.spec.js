const { sinon, expect } = require('../../../test-helper');

const mailJet = require('../../../../src/infrastructure/mailing/mailjet');
const mailService = require('../../../../src/domain/services/mail-service');
const interestEmailTemplate = require('../../../../src/infrastructure/mailing/interest-email-template');
const jobsAddedEmailTemplate = require('../../../../src/infrastructure/mailing/jobs-added-email-template');

describe('Unit | Service | MailService', () => {
  beforeEach(() => {
    sinon.stub(mailJet, 'sendEmail').resolves();
    sinon.stub(interestEmailTemplate, 'compile').returns('Interest mail template');
    sinon.stub(jobsAddedEmailTemplate, 'compile').returns('Jobs changed mail template');
  });

  afterEach(() => {
    mailJet.sendEmail.restore();
    interestEmailTemplate.compile.restore();
    jobsAddedEmailTemplate.compile.restore();
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
          template: 'Interest mail template',
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

  describe('#sendJobsAddedEmail', () => {
    it('should send an email with correct options', () => {
      // given
      const form = {
        receivers: ['recipient@mail.com'],
        jobs: [{ activity: { id: 1 } }, { activity: { id: 2 } }, { activity: { id: 3 } }],
        addedJobs: [{ activity: { id: 1 } }, { activity: { id: 2 } }, { activity: { id: 3 } }],
      };

      // when
      const promise = mailService.sendJobsAddedEmail(form);

      // then
      return promise.then(() => {
        expect(mailJet.sendEmail).to.have.been.calledWithExactly({
          from: 'jobboard+test@octo.com',
          to: ['recipient@mail.com'],
          fromName: 'Le Job Board - Ne pas répondre',
          subject: '[JobBoard] 3 nouvelle(s) mission(s) à staffer',
          template: 'Jobs changed mail template',
        });
      });
    });
  });
});
