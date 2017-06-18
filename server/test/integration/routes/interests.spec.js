const {request, expect, sinon} = require('../../test-helper')
const app = require('../../../app')
const GoogleAuthWrapper = require('../../../src/infrastructure/google-auth')
const mailService = require('../../../src/infrastructure/mail-service')

describe('Integration | Routes | interests route', function () {
  let interestedJobForm

  beforeEach(() => {
    interestedJobForm = {
      interestedNickname: 'PTR',
      businessContactNickname: 'XYZ',
      missionDirectorNickname: 'ZYX',
      octopodLink: 'https://octopod.octo.com/projects/2146904867',
      activityName: 'Développeur Front',
      missionName: 'Oodrive - Liste d\'initié'
    }
    sinon.stub(mailService, 'sendWelcomeEmail')
    sinon.stub(GoogleAuthWrapper, 'verifyIdToken').resolves({userId: 'user-id', domain: 'octo.com'})
  })

  afterEach(() => {
    GoogleAuthWrapper.verifyIdToken.restore()
    mailService.sendWelcomeEmail.restore()
  })

  it('should return created status and succès', (done) => {
    // Given
    mailService.sendWelcomeEmail.resolves()

    // When
    request(app)
      .post('/api/interests')
      .send({interestedJobForm: interestedJobForm})
      .set('Authorization', 'Bearer access-token')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201, (err, res) => {
        if (err) {
          done(err)
        }

        // Then
        expect(res.body).to.deep.equal('Succès')
        done()
      })
  })

  it('should return error status and error', (done) => {
    // Given
    mailService.sendWelcomeEmail.rejects()

    // When
    request(app)
      .post('/api/interests')
      .send({interestedJobForm: interestedJobForm})
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
      .post('/api/interests')
      .send({interestedJobForm: interestedJobForm})
      .expect(401)
  })
})
