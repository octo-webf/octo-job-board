const { request, expect } = require('../../../test-helper');
const app = require('../../../../app');

describe('Integration | Routes | certificate route', () => {
  it('should have api informations on root', (done) => {
    request(app)
      .get('/.well-known/acme-challenge/:content')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.text).to.equal('Fz4KwoxqNbaEMWxcBM54Z2or-bYQNN_2Ypbv5Xuxpws.4M0QKfiH4yWeNOiLqoHVHpBHwxEpo1yiMyUHTclOD0s');
        done();
      });
  });
});
