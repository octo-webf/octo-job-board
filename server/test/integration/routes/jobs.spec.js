const {request, expect, sinon} = require('../../test-helper')
const app = require('../../../app')
const jobs = require('../../../src/fixtures/jobs')
const GoogleAuthWrapper = require('../../../src/utils/google-auth-wrapper')
const OctopodClient = require('../../../src/utils/octopod-client')

describe('Integration | Routes | jobs route', function () {
  beforeEach(() => {
    sinon.stub(GoogleAuthWrapper, 'verifyIdToken').resolves({userId: 'user-id', domain: 'octo.com'})
    sinon.stub(OctopodClient, 'getAccessToken').resolves('octopod-access-token')
    sinon.stub(OctopodClient, 'fetchProjectsToBeStaffed').resolves(jobs)
    sinon.stub(OctopodClient, 'fetchActivitiesToBeStaffed').resolves([])
  })

  afterEach(() => {
    GoogleAuthWrapper.verifyIdToken.restore()
    OctopodClient.getAccessToken.restore()
    OctopodClient.fetchProjectsToBeStaffed.restore()
    OctopodClient.fetchActivitiesToBeStaffed.restore()
  })

  it('should return 401 response if the user is not well authenticated', () => {
    return request(app)
      .get('/api/jobs')
      .expect(401)
  })

  it('should call Octopod API client to get an (OAuth 2) access token', (done) => {
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer access-token')
      .end((err, res) => {
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
      .end((err, res) => {
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
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(OctopodClient.fetchActivitiesToBeStaffed).to.have.been.called
        done()
      })
  })

  it('should return the list of all activities to be staffed', (done) => {
    // given
    const projects = [{id: 1}, {id: 2}, {id: 3}]
    const activities = [
      {title: 'Dév confirmé', project: {id: 1}},
      {title: 'Dév senior / TL', project: {id: 2}},
      {title: 'DM', project: {id: 2}},
      {title: 'Dév', project: {id: 3}},
      {title: 'Presales', project: {id: 3}},
      {title: 'DiMi', project: {id: 3}}
    ]

    OctopodClient.fetchActivitiesToBeStaffed.resolves(activities)

    // when
    request(app).get('/api/jobs')
      .set('Authorization', 'Bearer access-token')
      .end((err, res) => {

        // then
        if (err) {
          done(err)
        }
        expect(res.body).to.have.lengthOf(6)
        expect(res.body).to.deep.equal(activities)
        done()
      })
  })
})
