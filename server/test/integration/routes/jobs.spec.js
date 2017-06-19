const {request, expect, sinon} = require('../../test-helper')
const app = require('../../../app')
const jobs = require('../fixtures/jobs')
const GoogleAuthWrapper = require('../../../src/infrastructure/google-auth')
const OctopodClient = require('../../../src/infrastructure/octopod')
const JobsSerializer = require('../../../src/serializers/jobs')

describe('Integration | Routes | jobs route', function () {
  beforeEach(() => {
    sinon.stub(GoogleAuthWrapper, 'verifyIdToken').resolves({userId: 'user-id', domain: 'octo.com'})
    sinon.stub(OctopodClient, 'getAccessToken').resolves('octopod-access-token')
    sinon.stub(OctopodClient, 'fetchProjectsToBeStaffed').resolves(jobs)
    sinon.stub(OctopodClient, 'fetchActivitiesToBeStaffed').resolves([])
    sinon.stub(JobsSerializer, 'serialize').returns([])
  })

  afterEach(() => {
    GoogleAuthWrapper.verifyIdToken.restore()
    OctopodClient.getAccessToken.restore()
    OctopodClient.fetchProjectsToBeStaffed.restore()
    OctopodClient.fetchActivitiesToBeStaffed.restore()
    JobsSerializer.serialize.restore()
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
})
