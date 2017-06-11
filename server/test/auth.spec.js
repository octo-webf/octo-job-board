const { describe, it, request } = require('./test-helper')
const app = require('../app')

describe('Route | auth route', function () {
  describe('POST /auth/token', function () {
    it('should respond with json', (done) => {
      request(app)
        .post('/auth/token')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it('should return an error if Google token is missing', () => {

    })

    it('should return an error if Google token is invalid', () => {

    })
  })
})
