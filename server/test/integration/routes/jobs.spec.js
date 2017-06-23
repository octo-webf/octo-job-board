const jwt = require('jsonwebtoken')
const { request, expect, sinon } = require('../../test-helper')
const app = require('../../../app')
const jobs = require('../fixtures/jobs')
const OctopodClient = require('../../../src/infrastructure/octopod')
const JobsSerializer = require('../../../src/serializers/jobs')
const cache = require('../../../src/infrastructure/cache')

describe('Integration | Routes | jobs route', function () {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(jwt, 'verify').returns({ userId: 'user-id' })
    sandbox.stub(OctopodClient, 'getAccessToken').resolves('octopod-access-token')
    sandbox.stub(OctopodClient, 'fetchProjectsToBeStaffed').resolves(jobs)
    sandbox.stub(OctopodClient, 'fetchActivitiesToBeStaffed').resolves([])
    sandbox.stub(JobsSerializer, 'serialize').returns([])
    sandbox.stub(cache, 'get').returns(null)
    sandbox.stub(cache, 'set').returns(null)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should call Octopod API client to get an (OAuth 2) access token', (done) => {
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer access-token')
      .expect(200, (err) => {
        if (err) {
          done(err)
        }
        expect(OctopodClient.getAccessToken).to.have.been.called
        done()
      })
  })

  it('should call Octopod API client to fetch actual projects to be staffed', (done) => {
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer access-token')
      .expect(200, (err) => {
        if (err) {
          done(err)
        }
        expect(OctopodClient.fetchProjectsToBeStaffed).to.have.been.called
        done()
      })
  })

  it('should call Octopod API client to fetch actual activities to be staffed', (done) => {
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer access-token')
      .expect(200, (err) => {
        if (err) {
          done(err)
        }
        expect(OctopodClient.fetchActivitiesToBeStaffed).to.have.been.called
        done()
      })
  })

  it('should call Jobs serializer to format response', (done) => {
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer access-token')
      .expect(200, (err) => {
        if (err) {
          done(err)
        }
        expect(JobsSerializer.serialize).to.have.been.called
        done()
      })
  })

  it('should return 401 response if the user is not well authenticated', () => {
    return request(app)
      .get('/api/jobs')
      .expect(401)
  })

  describe('Caching', () => {
    it('should simply return the cached value without make any call or cache set', (done) => {
      // given
      const cachedResponse = [{ chi: 'shi' }, { fou: 'foo' }, { bar: 'bare' }]
      cache.get.returns(cachedResponse)

      // when
      request(app)
        .get('/api/jobs')
        .set('Authorization', 'Bearer access-token')
        .expect(200, (err, response) => {
          // then
          if (err) {
            done(err)
          }
          expect(response.body).to.deep.equal(cachedResponse)
          expect(OctopodClient.getAccessToken).to.have.not.been.called
          expect(OctopodClient.fetchProjectsToBeStaffed).to.have.not.been.called
          expect(JobsSerializer.serialize).to.have.not.been.called
          expect(cache.set).to.have.not.been.called
          done()
        })
    })

    it('should cache the jobs after they have been fetched when they were not already cached', (done) => {
      // given
      const freshJobs = [{ chi: 'shi' }, { fou: 'foo' }, { bar: 'bare' }]
      JobsSerializer.serialize.returns(freshJobs)

      // when
      request(app)
        .get('/api/jobs')
        .set('Authorization', 'Bearer access-token')
        .expect(200, (err, response) => {
          // then
          if (err) {
            done(err)
          }
          expect(cache.set).to.have.been.calledWith('get_jobs', freshJobs)
          done()
        })
    })
  })
})
