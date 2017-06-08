/* global describe, it */
var app = require('../app')
var activities = require('../fixtures/activities')
var request = require('supertest')
var expect = require('chai').expect

describe('/activities', function () {
  it('should return fixtures activities', function (done) {
    request(app)
            .get('/api/activities')
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) {
                done(err)
              }
              expect(res.body).to.deep.equal(activities)
              done()
            })
  })
})
