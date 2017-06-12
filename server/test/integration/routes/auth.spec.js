const { request, sinon } = require('../../test-helper')
const app = require('../../../app')
const GoogleAuthWrapper = require('../../../src/utils/google-auth-wrapper')

describe('Integration | Routes | auth route', function() {
  describe('POST /auth/token', function() {

    beforeEach(() => {
      sinon.stub(GoogleAuthWrapper, 'verifyIdToken')
    })

    afterEach(() => {
      GoogleAuthWrapper.verifyIdToken.restore()
    })

    it('should respond with json', (done) => {
      // given
      GoogleAuthWrapper.verifyIdToken.resolves({userId: '1234-abcd'})

      // when
      request(app)
        .post('/auth/token')
        .send({idToken: 'valid-id-token'})
        .set('Accept', 'application/json')

        // then
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it('should return an error when Google ID token is missing', (done) => {
      // when
      request(app)
        .post('/auth/token')

        // then
        .expect(400, done)
    })

    it('should return an error when Google ID token validation failed', (done) => {
      // given
      GoogleAuthWrapper.verifyIdToken.rejects()

      // when
      request(app)
        .post('/auth/token')
        .send({ idToken: 'bad-token ' })

        // then
        .expect(401, done)
    })

  })
})
