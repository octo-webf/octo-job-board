const request = require('request')
const OctopodClient = require('../../../src/utils/octopod-client')
const {expect, sinon} = require('../../test-helper')

describe('Unit | Utils | octopod-client', function () {
  describe('#fetchProjectsWithStaffingNeeded', function () {
    let jobs = [{
      'id': 1,
      'name': 'job 1'
    }, {
      'id': 2,
      'name': 'job 2'
    }]

    beforeEach(() => {
      sinon.stub(request, 'get')
    })

    afterEach(() => {
      request.get.restore()
    })

    it('should return jobs in a a promise', () => {
      // given
      request.get.callsFake((options, callback) => {
        const httpResponse = {
          body: jobs
        }
        callback(null, httpResponse)
      })

      // when
      const promise = OctopodClient.fetchProjectsWithStaffingNeeded()

      // then
      return promise
        .then((res) => {
          expect(res.body).to.equal(jobs)
        })
    })
  })

  describe('#getAccessToken', function () {
    describe('with a successful request', function () {
      beforeEach(() => {
        sinon.stub(request, 'post').callsFake((options, callback) => {
          const httpResponse = {
            body: {
              'access_token': 'fakeAccessToken',
              'token_type': 'bearer',
              'expires_in': 7200,
              'created_at': 1497621634
            }
          }
          callback(null, httpResponse)
        })
      })

      afterEach(() => {
        request.post.restore()
      })

      it('should return a resolved promise', () => {
        // when
        const promise = OctopodClient.getAccessToken()

        // then
        return promise.then((res) => {
          expect(res.body['access_token']).to.equal('fakeAccessToken')
        })
      })
    })

    describe('with an error', function () {
      beforeEach(() => {
        sinon.stub(request, 'post').callsFake((options, callback) => {
          callback(new Error('lol'), null)
        })
      })

      afterEach(() => {
        request.post.restore()
      })

      it('should return a rejected promise', (done) => {
        // when
        const promise = OctopodClient.getAccessToken()

        // then
        promise
          .catch((err) => {
            expect(err.message).to.equal('lol')
            done()
          })
      })
    })
  })
})
