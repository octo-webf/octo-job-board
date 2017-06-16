const {request, expect, sinon} = require('../../test-helper')
const app = require('../../../app')
const jobs = require('../../../src/fixtures/jobs')
const GoogleAuthWrapper = require('../../../src/utils/google-auth-wrapper')
const OctopodClient = require('../../../src/utils/octopod-client')

describe('Integration | Routes | jobs route', function () {
  beforeEach(() => {
    sinon.stub(GoogleAuthWrapper, 'verifyIdToken').resolves({userId: 'user-id', domain: 'octo.com'})
    sinon.stub(OctopodClient, 'fetchJobs').resolves(jobs)
  })

  afterEach(() => {
    GoogleAuthWrapper.verifyIdToken.restore()
    OctopodClient.fetchJobs.restore()
  })

  it('should return 401 response if the user is not well authenticated', () => {
    return request(app)
      .get('/api/jobs')
      .expect(401)
  })

  it('should call octopod client to fetch actual job data', (done) => {
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer titi-toto')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(OctopodClient.fetchJobs).to.have.been.called
        done()
      })
  })

  it('should return the formatted job data', (done) => {
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer titi-toto')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.deep.equal(jobs)
        done()
      })
  })
})
