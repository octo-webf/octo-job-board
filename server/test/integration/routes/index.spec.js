const { request, expect } = require('../../test-helper');
const app = require('../../../app');

describe('Integration | Routes | index route', () => {
  it('should have api informations on root', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.body).to.have.property('azerty');
        done();
      });
  });
});
