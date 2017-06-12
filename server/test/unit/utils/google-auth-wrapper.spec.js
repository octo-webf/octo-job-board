const GoogleAuth = require('google-auth-library');
const { expect, sinon } = require('../../test-helper')
const GoogleAuthWrapper = require('../../../src/utils/google-auth-wrapper');

describe('Unit | Utils | google-auth-wrapper', function() {

  describe('#verifyIdToken', function() {

    let verifyIdTokenStub;

    beforeEach(() => {
      verifyIdTokenStub = sinon.stub()
      sinon.stub(GoogleAuth.prototype, 'OAuth2').returns({ verifyIdToken: verifyIdTokenStub })
    })

    afterEach(() => {
      GoogleAuth.prototype.OAuth2.restore()
    })

    it('should exist', () => {
      expect(GoogleAuthWrapper.verifyIdToken).to.exist
    });

    it('should return a resolved promise when authentication (ID token) has been validated', () => {
      // given
      verifyIdTokenStub.callsFake((idToken, audience, callback) => {
        const login = {
          getPayload() {
            return {
              sub: 'user-id',
              hd: 'octo.com'
            }
          }
        }
        callback(null, login)
      });

      // when
      const promise = GoogleAuthWrapper.verifyIdToken('valid-id-token');

      // then
      return promise.then(_ => {
        expect(verifyIdTokenStub).to.have.been.called
      })
    });

    it('should return a rejected promise when authentication failed', () => {
      // given
      verifyIdTokenStub.callsFake((idToken, audience, callback) => {
        const err = {}
        callback(err, null)
      })

      // when
      const promise = GoogleAuthWrapper.verifyIdToken('invalid-id-token');

      // then
      return promise.catch((message) => {
        expect(verifyIdTokenStub).to.have.been.called
      })
    });

  });

});
