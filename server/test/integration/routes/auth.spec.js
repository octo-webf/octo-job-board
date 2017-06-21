const jwt = require('jsonwebtoken')
const {request, sinon, expect} = require('../../test-helper')
const app = require('../../../app')
const GoogleAuthWrapper = require('../../../src/infrastructure/google-auth')
const AuthorizationCodeValidator = require('../../../src/infrastructure/authorization-code-validator')

describe('Integration | Routes | auth route', function () {
  describe('POST /auth/token', function () {
    beforeEach(() => {
      sinon.stub(jwt, 'sign').returns('generated-jwt-access-token')
    })

    afterEach(() => {
      jwt.sign.restore()
    })

    describe('when grant type is implicit default one "client credentials"', function () {
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
          .post('/auth/token')
          .send({idToken: 'valid-id-token'})
          .set('Accept', 'application/json')

          // then
          .expect('Content-Type', /json/)
          .expect(200, (err, res) => {
            if (err) {
              done(err)
            }
            expect(res.body).to.deep.equal({
              access_token: 'generated-jwt-access-token'
            })
            done()
          })
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
          .send({idToken: 'bad-token '})

          // then
          .expect(401, done)
      })
    })

    describe('when grant type is "authorization_code"', () => {
      beforeEach(() => {
        sinon.stub(AuthorizationCodeValidator, 'verifyApplicationCode')
      })

      afterEach(() => {
        AuthorizationCodeValidator.verifyApplicationCode.restore()
      })

      it('should response with a JWT access_token when (authorization) "code" is valid', (done) => {
        // given
        AuthorizationCodeValidator.verifyApplicationCode.resolves()

        // when
        request(app)
          .post('/auth/token')
          .send({grant_type: 'authorization_code', code: 'a-valid-application-code'})

          // then
          .expect(200, (err, response) => {
            expect(response.body).to.deep.equal({
              access_token: 'generated-jwt-access-token'
            })
            done()
          })
      })

      it('should respond with a 400 error when no "code" was provided', (done) => {
        // when
        request(app)
          .post('/auth/token')
          .send({grant_type: 'authorization_code'})

          // then
          .expect(400, (err, response) => {
            expect(response.body.error).to.equal('No authorization code was provided!')
            done()
          })
      })

      it('should respond with a 401 error when provided "code" was not validated', (done) => {
        // given
        AuthorizationCodeValidator.verifyApplicationCode.rejects()

        // when
        request(app)
          .post('/auth/token')
          .send({grant_type: 'authorization_code', code: 'invalid-application-id'})

          // then
          .expect(401, (err, response) => {
            expect(response.body.error).to.equal('Authorization code is invalid!')
            done()
          })
      })
    })
  })
})
