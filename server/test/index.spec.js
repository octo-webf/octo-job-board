/* global describe, it */
var index = require('../app')
var request = require('supertest')
var expect = require('chai').expect

describe.skip('API', function() {
	it('should have api informations on root', function(done) {
		request(index)
			.get('/')
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if (err) {
					done(err)
				}
				expect(res.body).to.have.property('azerty')
				done()
			})
	})
})
