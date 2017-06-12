const { describe, it, request, expect } = require('./test-helper')
const index = require('../app')

describe('API', function () {
  it('should have api informations on root', () => {
    request(index)
      .get('/')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.have.property('azerty')
      })
  })
})
