const { describe, it, request, expect } = require('./test-helper')
var app = require('../app')
var jobs = require('../fixtures/jobs')

describe('/jobs', function () {
  it('should return fixtures jobs', function (done) {
    request(app)
      .get('/api/jobs')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.deep.equal(jobs)
        done()
      })
  })
})
