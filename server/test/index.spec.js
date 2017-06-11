const { describe, it, request, expect } = require('./test-helper')
const app = require('../app')

describe('API', function () {
  it('should have api informations on root', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('azerty')
        done()
      })
  })
})
