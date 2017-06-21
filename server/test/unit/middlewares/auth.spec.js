const {sinon, expect} = require('../../test-helper')
const auth = require('../../../src/middlewares/auth')
const jwt = require('jsonwebtoken')

describe('Unit | Middlewares | auth', function () {
  let req
  let res
  let next

  beforeEach(() => {
    req = {}

    res = {

      httpCode: null,
      payload: null,

      status (httpCode) {
        this.httpCode = httpCode
        return this
      },
      json (payload) {
        this.payload = payload
        return this
      }
    }

    next = () => {
    }
  })

  afterEach(() => {
    req = null
    res = null
    next = null
  })

  describe('Success management', function () {
    beforeEach(() => {
      // given
      req = {
        headers: {
          authorization: 'Bearer some_acess_token'
        }
      }
      sinon.stub(jwt, 'verify').returns({userId: 'user-id'})
    })

    afterEach(() => {
      jwt.verify.restore()
    })

    it('should set user into the request', (done) => {
      // when
      auth(req, res, () => {
        // then
        expect(req.userId).to.equal('user-id')
        done()
      })
    })

    it('should verify Google access token (by calling Google Auth library)', (done) => {
      // when
      auth(req, res, () => {
        // then
        expect(jwt.verify).to.have.been.calledWith('some_acess_token')
        done()
      })
    })
  })

  describe('Error management', function () {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').throws('Invalid token')
    })

    afterEach(() => {
      jwt.verify.restore()
    })

    function _assert401Error(message) {
      const expectedResponseBody = {
        error: {
          msg: message
        }
      }
      expect(res.httpCode).to.equal(401)
      expect(res.payload).to.deep.equal(expectedResponseBody)
    }

    it('should return an error with a status code 401 when there is no header in the request', function () {
      // given
      req = {}

      // when
      auth(req, res, next)

      // then
      _assert401Error('No token was provided!')
    })

    it('should return an error with a status code 401 when there is no "Authorization" header in the request', function () {
      // given
      req = {headers: {}}

      // when
      auth(req, res, next)

      // then
      _assert401Error('No token was provided!')
    })

    it('should return an error with a status code 401 when the ID token verification failed', function () {
      // given
      req = {
        headers: {
          authorization: 'Bearer bad_acess_token'
        }
      }

      // when
      auth(req, res, () => {
        // then
        _assert401Error('Failed to authenticate token!')
      })
    })
  })
})
