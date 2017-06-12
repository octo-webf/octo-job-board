// Chai
const chai = require('chai')
const expect = chai.expect

// Sinon
const sinon = require('sinon')
const assert = sinon.assert;

const sinonChai = require("sinon-chai");
chai.use(sinonChai);

// Supertest
const request = require('supertest')

module.exports = {
  expect,
  request,
  sinon,
  assert
}
