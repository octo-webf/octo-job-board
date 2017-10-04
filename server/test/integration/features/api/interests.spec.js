const jwt = require('jsonwebtoken');
const { request, expect, sinon } = require('../../../test-helper');
const app = require('../../../../app');
const mailService = require('../../../../src/domain/services/mail-service');

describe('Integration | Routes | interests route', () => {
  let interestedJobForm;

  beforeEach(() => {
    interestedJobForm = {
      interestedNickname: 'PTR',
      businessContactNickname: 'XYZ',
      missionDirectorNickname: 'ZYX',
      octopodLink: 'https://octopod.octo.com/projects/2146904867',
      activityName: 'Développeur Front',
      missionName: 'Oodrive - Liste d\'initié',
    };
    sinon.stub(mailService, 'sendInterestEmail');
    sinon.stub(jwt, 'verify').returns({ userId: 'user-id' });
  });

  afterEach(() => {
    jwt.verify.restore();
    mailService.sendInterestEmail.restore();
  });

  it('should return created status and succès', (done) => {
    // Given
    mailService.sendInterestEmail.resolves();

    // When
    request(app)
      .post('/api/interests')
      .send({ interestedJobForm })
      .set('Authorization', 'Bearer access-token')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201, (err, res) => {
        if (err) {
          done(err);
        }

        // Then
        expect(res.body).to.deep.equal('Succès');
        done();
      });
  });

  it('should return error status and error', (done) => {
    // Given
    mailService.sendInterestEmail.rejects();

    // When
    request(app)
      .post('/api/interests')
      .send({ interestedJobForm })
      .set('Authorization', 'Bearer access-token')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(500, (err, res) => {
        if (err) {
          done(err);
        }

        // Then
        expect(res.body).to.deep.equal({ error: {} });
        done();
      });
  });

  it('should return 401 response if the user is not well authenticated', () => request(app)
    .post('/api/interests')
    .send({ interestedJobForm })
    .expect(401));
});
