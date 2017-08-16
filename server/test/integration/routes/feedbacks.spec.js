const jwt = require('jsonwebtoken');
const { request, expect, sinon } = require('../../test-helper');
const app = require('../../../app');
const mailService = require('../../../src/domain/mail-service');
const slackService = require('../../../src/domain/slack-service');

describe('Integration | Routes | feedbacks route', () => {
  const consultant = { name: 'John Doe', email: 'john@doe.com' };
  const feedback = 'Lorem ipsum dolor sit amet';

  beforeEach(() => {
    sinon.stub(mailService, 'sendFeedbackEmail').resolves();
    sinon.stub(slackService, 'postFeedbackMessage').resolves();
    sinon.stub(jwt, 'verify').returns({ userId: 'user-id' });
  });

  afterEach(() => {
    mailService.sendFeedbackEmail.restore();
    slackService.postFeedbackMessage.restore();
    jwt.verify.restore();
  });

  it('should call mailing service', (done) => {
    // when
    request(app)
      .post('/api/feedbacks')
      .send({ consultant, feedback })
      .set('Authorization', 'Bearer access-token')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201, (err, res) => {
        // then
        expect(res.body).to.deep.equal('Feedback sent');
        expect(mailService.sendFeedbackEmail).to.have.been.called;
        done();
      });
  });

  it('should call slack notification service', (done) => {
    // when
    request(app)
      .post('/api/feedbacks')
      .send({ consultant, feedback })
      .set('Authorization', 'Bearer access-token')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201, () => {
        // then
        expect(slackService.postFeedbackMessage).to.have.been.called;
        done();
      });
  });

  it('should return error status and error', (done) => {
    // Given
    mailService.sendFeedbackEmail.rejects();

    // When
    request(app)
      .post('/api/feedbacks')
      .send({ consultant, feedback })
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
    .post('/api/feedbacks')
    .expect(401));
});
