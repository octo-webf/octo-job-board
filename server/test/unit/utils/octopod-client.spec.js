const request = require('request')
const OctopodClient = require('../../../src/utils/octopod-client')
const {expect, sinon} = require('../../test-helper')

describe('Unit | Utils | octopod-client', function () {
  beforeEach(() => {
    sinon.stub(request, 'post')
    sinon.stub(request, 'get')
  })

  afterEach(() => {
    request.post.restore()
    request.get.restore()
  })

  /**
   * #getAccessToken
   * ---------------
   */

  describe('#getAccessToken', function () {
    describe('with a successful request', function () {
      beforeEach(() => {
        request.post.callsFake((options, callback) => {
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

      it('should call Octopod API "POST /oauth/token"', function () {
        // given
        request.post.callsFake((options, callback) => {
          callback()
        })

        // when
        const promise = OctopodClient.getAccessToken()

        // then
        return promise.then((res) => {
          const expectedOptions = {
            url: `http://octopod.url/api/oauth/token`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            form: {
              grant_type: 'client_credentials',
              client_id: 'octopod-client-id',
              client_secret: 'octopod-client-secret'
            }
          }
          expect(request.post).to.have.been.calledWith(expectedOptions)
        })
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
        request.post.callsFake((options, callback) => {
          callback(new Error('lol'), null)
        })
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

  /**
   * #fetchProjectsToBeStaffed
   * -------------------------
   */

  describe('#fetchProjectsToBeStaffed', function () {
    let jobs = [{
      'id': 1,
      'name': 'job 1'
    }, {
      'id': 2,
      'name': 'job 2'
    }]

    it('should return projects in a a promise', () => {
      // given
      request.get.callsFake((options, callback) => {
        const httpResponse = {
          body: jobs
        }
        callback(null, httpResponse)
      })

      // when
      const promise = OctopodClient.fetchProjectsToBeStaffed()

      // then
      return promise
        .then((res) => {
          expect(res.body).to.equal(jobs)
        })
    })

    it('should call Octopod API "GET /projects"', function () {
      // given
      request.get.callsFake((options, callback) => {
        callback()
      })
      const accessToken = 'access-token'

      // when
      const promise = OctopodClient.fetchProjectsToBeStaffed(accessToken)

      // then
      return promise.then((res) => {
        const expectedOptions = {
          url: `http://octopod.url/api/projects?staffing_needed=true&page=1&per_page=50`,
          headers: {
            'Authorization': 'Bearer access-token'
          }
        }
        expect(request.get).to.have.been.calledWith(expectedOptions)
      })
    })
  })

  /**
   * #fetchActivitiesToBeStaffed
   * ---------------------------
   */

  describe('#fetchActivitiesToBeStaffed', function () {
    const accessToken = 'access-token'
    const projects = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]

    it('should return a promise resolved with activities', function () {
      // given
      request.get.callsFake((options, callback) => {
        callback(null, {})
      })

      // when
      const promise = OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects)

      // then
      return promise.then(activities => {
        expect(activities).to.have.lengthOf(5)
      })
    })

    it('should call Octopod API "GET /projects/{id}/activities" as many times as number of projects', function () {
      // given
      request.get.callsFake((options, callback) => {
        callback()
      })
      const accessToken = 'access-token'
      const projects = [
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4},
        {id: 5}
      ]

      // when
      const promise = OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects)

      // then
      return promise.then((res) => {
        expect(request.get).to.have.callCount(5)
      })
    })
  })
})
