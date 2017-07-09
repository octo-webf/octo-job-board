const jwt = require('jsonwebtoken')
const {request, expect, sinon} = require('../../test-helper')
const app = require('../../../app')
const mailService = require('../../../src/infrastructure/mail-service')

describe('Integration | Routes | feedbacks route', () => {
  beforeEach(() => {
    sinon.stub(mailService, 'sendFeedbackEmail')
    sinon.stub(jwt, 'verify').returns({userId: 'user-id'})
  })

  afterEach(() => {
    mailService.sendFeedbackEmail.restore()
    jwt.verify.restore()
  })

  it('should call mailing service', (done) => {
    // given
    mailService.sendFeedbackEmail.resolves()

    // when
    request(app)
      .post('/api/feedbacks')
      .send({feedback: 'Lorem ipsum dolor sit amet'})
      .set('Authorization', 'Bearer access-token')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201, (err, res) => {
        // then
        expect(res.body).to.deep.equal('Feedback sent')
        done()
      })
  })

  it('should return error status and error', (done) => {
    // Given
    mailService.sendFeedbackEmail.rejects()

    // When
    request(app)
      .post('/api/feedbacks')
      .send({feedback: 'Lorem ipsum dolor sit amet'})
      .set('Authorization', 'Bearer access-token')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(500, (err, res) => {
        if (err) {
          done(err)
        }

        // Then
        expect(res.body).to.deep.equal({error: {}})
        done()
      })
  })

  it('should return 401 response if the user is not well authenticated', () => {
    return request(app)
      .post('/api/feedbacks')
      .expect(401)
  })
})
