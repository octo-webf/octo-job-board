const { request, expect } = require('../../test-helper')
const app = require('../../../app')
const jobs = require('../../../src/fixtures/jobs')

describe('Integration | Routes | jobs route', function () {
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
