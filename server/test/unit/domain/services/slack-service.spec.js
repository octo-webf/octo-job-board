const { expect, sinon } = require('../../../test-helper');
const slackService = require('../../../../src/domain/services/slack-service');
const slackClient = require('../../../../src/infrastructure/slack');

describe('Unit | Domain | slack-service', () => {
  describe('#postFeedbackMessage', () => {
    beforeEach(() => {
      sinon.stub(slackClient, 'postMessage');
    });

    afterEach(() => {
      slackClient.postMessage.restore();
    });

    it('should publish a message on Slack channel (via Slack client)', () => {
      // given
      slackClient.postMessage.resolves();
      const author = 'Kery James';
      const message = 'Noir est ma couleur de peau, et pas qu\'en surface';

      // when
      const promise = slackService.postFeedbackMessage(author, message);

      // then
      return promise.then(() => {
        const expectedText = ':mega: *Kery James* a un avis ou une question :\n>>>Noir est ma couleur de peau, et pas qu\'en surface';
        expect(slackClient.postMessage).to.have.been.calledWith(expectedText);
      });
    });

    it('should reject with the received error when Slack client throws an error', () => {
      // given
      slackClient.postMessage.rejects(new Error('Some error'));
      const author = 'Kery James';
      const message = 'Un message qui tombe en erreur';

      // when
      const promise = slackService.postFeedbackMessage(author, message);

      // then
      return promise
        .then((result) => {
          throw new Error(`Promise was unexpectedly fulfilled. Result: ${result}`);
        }, (err) => {
          expect(err).to.exist;
        });
    });
  });
});
