const { expect, sinon } = require('../../test-helper');
const IncomingWebhook = require('@slack/client').IncomingWebhook;
const slackClient = require('../../../src/infrastructure/slack');

describe('Unit | Class | slack-client', () => {
  beforeEach(() => {
    sinon.stub(IncomingWebhook.prototype, 'send');
  });

  afterEach(() => {
    IncomingWebhook.prototype.send.restore();
  });

  describe('#postMessage', () => {
    it('call Slack SDK', () => {
      // given
      IncomingWebhook.prototype.send.callsFake((text, cb) => cb());
      const text = 'Bla bla bla';

      // when
      const promise = slackClient.postMessage(text);

      // then
      return promise.then(() => {
        expect(IncomingWebhook.prototype.send).to.have.been.calledWith(text);
      });
    });

    it('should reject an error when SDK throw an error', () => {
      // given
      IncomingWebhook.prototype.send.callsFake((text, cb) => cb(new Error('An error')));

      // when
      const promise = slackClient.postMessage('some text');

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
