const {request, sinon, expect} = require('../../test-helper')
const app = require('../../../app')
const GoogleAuthWrapper = require('../../../src/infrastructure/google-auth')

describe('Integration | Routes | auth route', function () {
  describe('POST /auth/google', function () {
    beforeEach(() => {
      sinon.stub(GoogleAuthWrapper, 'verifyIdToken')
    })

    afterEach(() => {
      GoogleAuthWrapper.verifyIdToken.restore()
    })

    it('should respond with json', (done) => {
      // given
      GoogleAuthWrapper.verifyIdToken.resolves({userId: '1234-abcd', domain: 'octo.com'})

      // when
      request(app)
        .post('/auth/google')
        .send({idToken: 'valid-id-token'})
        .set('Accept', 'application/json')

        // then
        .expect('Content-Type', /json/)
        .expect(200, (err, res) => {
          if (err) {
            done(err)
          }
          expect(res.body).to.deep.equal({
            user: {userId: '1234-abcd', domain: 'octo.com'},
            accessToken: 'valid-id-token'
          })
          done()
        })
    })

    it('should return an error when Google ID token is missing', (done) => {
      // when
      request(app)
        .post('/auth/google')

        // then
        .expect(400, done)
    })

    it('should return an error when Google ID token validation failed', (done) => {
      // given
      GoogleAuthWrapper.verifyIdToken.rejects()

      // when
      request(app)
        .post('/auth/google')
        .send({idToken: 'bad-token '})

        // then
        .expect(401, done)
    })
  })
})
