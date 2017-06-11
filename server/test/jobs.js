/* global describe, it */
var app = require('../app')
var jobs = require('../fixtures/jobs')
var request = require('supertest')
var expect = require('chai').expect

describe.skip('/jobs', function () {
  it('should return fixtures jobs', function (done) {
    request(app)
      .get('/api/jobs')
      .expect('Content-Type', 'application/json')
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        expect(res.body).to.deep.equal(jobs)
        done()
      })
  })
})
