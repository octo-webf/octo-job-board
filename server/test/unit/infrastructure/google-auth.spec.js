const GoogleAuth = require('google-auth-library');
const { expect, sinon } = require('../../test-helper');
const GoogleAuthWrapper = require('../../../src/infrastructure/google-auth');

describe('Unit | Utils | google-auth-wrapper', () => {
  describe('#verifyIdToken', () => {
    let verifyIdTokenStub;

    beforeEach(() => {
      verifyIdTokenStub = sinon.stub();
      sinon.stub(GoogleAuth.prototype, 'OAuth2').returns({ verifyIdToken: verifyIdTokenStub });
    });

    afterEach(() => {
      GoogleAuth.prototype.OAuth2.restore();
    });

    it('should return a resolved promise when authentication (ID token) has been validated', () => {
      // given
      verifyIdTokenStub.callsFake((idToken, audience, callback) => {
        const login = {
          getPayload() {
            return {
              email: 'test@mail.com',
              sub: 'user-id',
              hd: 'octo.com',
            };
          },
        };
        callback(null, login);
      });

      // when
      const promise = GoogleAuthWrapper.verifyIdToken('valid-id-token');

      // then
      return expect(promise).to.eventually.deep.equal({ userId: 'user-id', email: 'test@mail.com' });
    });

    it('should return a rejected promise when authentication failed', () => {
      // given
      verifyIdTokenStub.callsFake((idToken, audience, callback) => {
        const err = {};
        callback(err, null);
      });

      // when
      const promise = GoogleAuthWrapper.verifyIdToken('invalid-id-token');

      // then
      return expect(promise).to.eventually.be.rejected;
    });

    it('should return a rejected promise when the user dit not authenticated with an OCTO account', () => {
      // given
      verifyIdTokenStub.callsFake((idToken, audience, callback) => {
        const login = {
          getPayload() {
            return {
              sub: 'user-id',
              hd: 'not-octo.com',
            };
          },
        };
        callback(null, login);
      });

      // when
      const promise = GoogleAuthWrapper.verifyIdToken('valid-id-token');

      // then
      return expect(promise).to.eventually.be.rejectedWith('User user-id does not belong to OCTO');
    });
  });
});
