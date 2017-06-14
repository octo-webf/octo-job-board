// Sinon
const sinon = require('sinon')
const assert = sinon.assert

// Chai
const chai = require('chai')
const expect = chai.expect

// Chai plugins
chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))

// Supertest
const request = require('supertest')

module.exports = {
  expect,
  request,
  sinon,
  assert
}
