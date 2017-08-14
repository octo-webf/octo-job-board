const jwt = require('jsonwebtoken');
const {request, expect, sinon} = require('../../test-helper');
const app = require('../../../app');
const jobService = require('../../../src/domain/services/job-service');
const fixturesJobs = require('../fixtures/jobs');

describe('Integration | Routes | jobs route', () => {

  beforeEach(() => {
    sinon.stub(jwt, 'verify').returns({ userId: 'user-id' });
    sinon.stub(jobService, 'getJobs');
  });

  afterEach(() => {
    jwt.verify.restore();
    jobService.getJobs.restore();
  });

  it('should returns jobs fetched and serialized from Octopod', (done) => {
    // given
    jobService.getJobs.resolves(fixturesJobs);

    // when
    request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer access-token')
      .expect(200, (err, res) => {

        // then
        if (err) {
          done(err);
        }
        expect(jobService.getJobs).to.have.been.called;
        expect(res.body).to.deep.equal(fixturesJobs);
        done();
      });
  });

  it('should return 401 response if the user is not well authenticated', () => request(app)
    .get('/api/jobs')
    .expect(401));

});
