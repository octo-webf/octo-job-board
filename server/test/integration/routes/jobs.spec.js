const {request, expect, sinon} = require('../../test-helper')
const app = require('../../../app')
const jobs = require('../../../src/fixtures/jobs')
const GoogleAuthWrapper = require('../../../src/utils/google-auth-wrapper')

describe('Integration | Routes | jobs route', function () {
  beforeEach(() => {
    sinon.stub(GoogleAuthWrapper, 'verifyIdToken').resolves({userId: 'user-id', domain: 'octo.com'})
  })

  afterEach(() => {
    GoogleAuthWrapper.verifyIdToken.restore()
  })

  it('should return fixtures jobs', (done) => {
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer titi-toto')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) {
          done(err)
        }
        expect(res.body).to.deep.equal(jobs)
        done()
      })
  })

  it('should return 401 response if the user is not well authenticated', () => {
    return request(app)
      .get('/api/jobs')
      .expect(401)
  })
})
