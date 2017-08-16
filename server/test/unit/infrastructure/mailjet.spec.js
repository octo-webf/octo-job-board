const {sinon} = require('../../test-helper');
const Mailjet = require('../../../src/infrastructure/mailjet');

const nodeMailjet = require('node-mailjet');

describe('Unit | Class | Mailjet', () => {
  let mailJetConnectStub;

  beforeEach(() => {
    mailJetConnectStub = sinon.stub(nodeMailjet, 'connect');
  });

  afterEach(() => {
    mailJetConnectStub.restore();
  });

  describe('#sendEmail', () => {
    let options;

    beforeEach(() => {
      options = {
        from: 'jobboard@octo.com',
        fromName: 'Ne Pas Repondre',
        subject: 'PTR intéressé par une activité du Dashboard',
        template: 'Corps du mail',
        to: 'jobboard@octo.com',
      };
    });

    it('should create an instance of mailJet', () => {
      // Given
      mailJetConnectStub.returns({
        post: () => ({
          request: () => {
          },
        }),
      });

      // When
      Mailjet.sendEmail(options);

      // Then
      sinon.assert.calledWith(mailJetConnectStub, 'test-api-key', 'test-api-secret');
    });

    it('should post a send instruction', () => {
      // Given
      const postStub = sinon.stub().returns({request: () => Promise.resolve()});
      mailJetConnectStub.returns({post: postStub});

      // When
      const result = Mailjet.sendEmail(options);

      // Then
      return result.then(() => {
        sinon.assert.calledWith(postStub, 'send');
      });
    });

    it('should request with a payload', () => {
      // Given
      const requestStub = sinon.stub().returns(Promise.resolve());
      const postStub = sinon.stub().returns({request: requestStub});
      mailJetConnectStub.returns({post: postStub});

      // When
      const result = Mailjet.sendEmail(options);

      // Then
      return result.then(() => {
        sinon.assert.calledWith(requestStub, {
          FromEmail: 'jobboard@octo.com',
          FromName: 'Ne Pas Repondre',
          Subject: 'PTR intéressé par une activité du Dashboard',
          'Html-part': 'Corps du mail',
          Recipients: [{Email: 'jobboard@octo.com'}],
        });
      });
    });

    describe('#_formatRecipients', () => {

      let requestStub;
      let postStub;

      beforeEach(() => {
        requestStub = sinon.stub().returns(Promise.resolve());
        postStub = sinon.stub().returns({request: requestStub});
        mailJetConnectStub.returns({post: postStub});

        options = {
          from: 'from',
          fromName: 'name',
          subject: 'subject',
          template: 'body',
          to: null
        };

      });

      it('should take into account when specified receivers is null or undefined', () => {
        // given
        options.to = null;

        // when
        const result = Mailjet.sendEmail(options);

        // then
        return result.then(() => {
          sinon.assert.calledWith(requestStub, {
            FromEmail: 'from',
            FromName: 'name',
            Subject: 'subject',
            'Html-part': 'body',
            Recipients: [],
          });
        });
      });

      it('should take into account when specified receivers is a string with single email', () => {
        // given
        options.to = 'recipient@mail.com';

        // when
        const result = Mailjet.sendEmail(options);

        // then
        return result.then(() => {
          sinon.assert.calledWithExactly(requestStub, {
            FromEmail: 'from',
            FromName: 'name',
            Subject: 'subject',
            'Html-part': 'body',
            Recipients: [{Email: 'recipient@mail.com'}],
          });
        });
      });

      it('should take into account when specified receivers is an array of receivers', () => {
        // given
        options.to = ['recipient_1@mail.com', 'recipient_2@mail.com', 'recipient_3@mail.com'];

        // when
        const result = Mailjet.sendEmail(options);

        // then
        return result.then(() => {
          sinon.assert.calledWithExactly(requestStub, {
            FromEmail: 'from',
            FromName: 'name',
            Subject: 'subject',
            'Html-part': 'body',
            Recipients: [
              {Email: 'recipient_1@mail.com'},
              {Email: 'recipient_2@mail.com'},
              {Email: 'recipient_3@mail.com'}
            ],
          });
        });
      });

    });

  });
});
