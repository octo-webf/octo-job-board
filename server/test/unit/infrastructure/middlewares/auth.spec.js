const jwt = require('jsonwebtoken');
const { sinon, expect } = require('../../../test-helper');
const auth = require('../../../../src/infrastructure/middlewares/auth');

describe('Unit | Middlewares | auth', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};

    res = {

      httpCode: null,
      payload: null,

      status(httpCode) {
        this.httpCode = httpCode;
        return this;
      },
      json(payload) {
        this.payload = payload;
        return this;
      },
    };

    next = () => {
    };
  });

  afterEach(() => {
    req = null;
    res = null;
    next = null;
  });

  describe('Success management', () => {
    beforeEach(() => {
      // given
      req = {
        headers: {
          authorization: 'Bearer some_acess_token',
        },
      };
      sinon.stub(jwt, 'verify').returns({ userId: 'user-id', email: 'test@mail.com' });
    });

    afterEach(() => {
      jwt.verify.restore();
    });

    it('should set user into the request', () => {
      // when
      return auth(req, res, () => {
        // then
        expect(req.userId).to.equal('user-id');
        expect(req.userEmail).to.equal('test@mail.com');
      });
    });

    it('should verify Google access token (by calling Google Auth library)', (done) => {
      // when
      auth(req, res, () => {
        // then
        expect(jwt.verify).to.have.been.calledWith('some_acess_token');
        done();
      });
    });
  });

  describe('Error management', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').throws('Invalid token');
    });

    afterEach(() => {
      jwt.verify.restore();
    });

    function _assert401Error(message) {
      const expectedResponseBody = {
        error: {
          msg: message,
        },
      };
      expect(res.httpCode).to.equal(401);
      expect(res.payload).to.deep.equal(expectedResponseBody);
    }

    it('should return an error with a status code 401 when there is no header in the request', () => {
      // given
      req = {};

      // when
      auth(req, res, next);

      // then
      _assert401Error('No token was provided!');
    });

    it('should return an error with a status code 401 when there is no "Authorization" header in the request', () => {
      // given
      req = { headers: {} };

      // when
      auth(req, res, next);

      // then
      _assert401Error('No token was provided!');
    });

    it('should return an error with a status code 401 when the ID token verification failed', () => {
      // given
      req = {
        headers: {
          authorization: 'Bearer bad_acess_token',
        },
      };

      // when
      auth(req, res, () => {
        // then
        _assert401Error('Failed to authenticate token!');
      });
    });
  });
});
