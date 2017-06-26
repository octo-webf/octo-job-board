const request = require('request')
const OctopodClient = require('../../../src/infrastructure/octopod')
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
            body: JSON.stringify({
              'access_token': 'fakeAccessToken',
              'token_type': 'bearer',
              'expires_in': 7200,
              'created_at': 1497621634
            })
          }
          callback(null, httpResponse)
        })
      })

      it('should call Octopod API "POST /oauth/token"', function () {
        // when
        const promise = OctopodClient.getAccessToken()

        // then
        return promise.then((res) => {
          const expectedOptions = {
            url: 'http://octopod.url/api/oauth/token',
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
        return promise.then((accessToken) => {
          expect(accessToken).to.equal('fakeAccessToken')
        })
      })
    })

    describe('with an error', function () {
      beforeEach(() => {
        request.post.callsFake((options, callback) => {
          callback(new Error('Some error message'), null)
        })
      })

      it('should return a rejected promise', (done) => {
        // when
        const promise = OctopodClient.getAccessToken()

        // then
        promise
          .catch((err) => {
            expect(err.message).to.equal('Some error message')
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
    let octopodProjects = [{
      'id': 1,
      'name': 'job 1'
    }, {
      'id': 2,
      'name': 'job 2'
    }]

    beforeEach(() => {
      request.get.callsFake((options, callback) => {
        const httpResponse = {
          body: JSON.stringify(octopodProjects)
        }
        callback(null, httpResponse)
      })
    })

    it('should return projects in a a promise', () => {
      // when
      const promise = OctopodClient.fetchProjectsToBeStaffed()

      // then
      return promise
        .then((projects) => {
          expect(projects).to.deep.equal(octopodProjects)
        })
    })

    it('should call Octopod API "GET /projects"', function () {
      // given
      const accessToken = 'access-token'

      // when
      const promise = OctopodClient.fetchProjectsToBeStaffed(accessToken)

      // then
      return promise.then((res) => {
        const expectedOptions = {
          url: 'http://octopod.url/api/v0/projects?staffing_needed=true&page=1&per_page=50',
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

    beforeEach(() => {
      request.get.callsFake((options, callback) => {
        const projectActivities = [
          // project with id #1 - only one activity to be staffed
          [{id: 11, staffing_needed: true}],
          // project with id #2 - two activities but only one to be staffed
          [{id: 21, staffing_needed: true}, {id: 22, staffing_needed: false}],
          // project with id #3 - a mix of activities to be staffed and not
          [{id: 31, staffing_needed: true}, {id: 32, staffing_needed: false}, {id: 33, staffing_needed: true}],
          // project with id #4 - no activities
          [],
          // project with id #5 - only activities with no staffing needed
          [{id: 31, staffing_needed: false}, {id: 32, staffing_needed: false}, {id: 33, staffing_needed: false}]
        ]

        const url = options.url
        const urlParts = url.split('/')
        const projectId = urlParts[6] - 1

        callback(null, {
          body: JSON.stringify(projectActivities[projectId])
        })
      })
    })

    it('should return a promise resolved with activities', function () {
      // when
      const promise = OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects)

      // then
      return promise.then(activities => {
        expect(activities).to.have.lengthOf(4)
      })
    })

    it('should call Octopod API "GET /projects/{id}/activities" as many times as number of projects', function () {
      // given
      const accessToken = 'access-token'

      // when
      const promise = OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects)

      // then
      return promise.then(() => {
        expect(request.get).to.have.callCount(5)
      })
    })

    it('should not return activities that are not flagged as "staffing needed"', () => {
      // when
      const promise = OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects)

      // then
      return promise.then(activities => {
        expect(activities).to.have.lengthOf(4)
      })
    })
  })
})
