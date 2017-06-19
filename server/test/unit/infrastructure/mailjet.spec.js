const { describe, it, beforeEach, afterEach, sinon } = require('../../test-helper')
const Mailjet = require('../../../src/infrastructure/mailjet')

const nodeMailjet = require('node-mailjet')

describe('Unit | Class | Mailjet', function () {
  let mailJetConnectStub

  beforeEach(() => {
    mailJetConnectStub = sinon.stub(nodeMailjet, 'connect')
  })

  afterEach(() => {
    mailJetConnectStub.restore()
  })

  describe('#sendEmail', () => {
    let options

    beforeEach(() => {
      options = {
        from: 'jobboard@octo.com',
        fromName: 'Ne Pas Repondre',
        subject: 'PTR intéressé par une activité du Dashboard',
        template: 'Corps du mail',
        to: 'jobboard@octo.com'
      }
    })

    it('should create an instance of mailJet', () => {
      // Given
      mailJetConnectStub.returns({
        post: () => {
          return {
            request: () => {
            }
          }
        }
      })

      // When
      Mailjet.sendEmail(options)

      // Then
      sinon.assert.calledWith(mailJetConnectStub, 'test-api-key', 'test-api-secret')
    })

    it('should post a send instruction', () => {
      // Given
      const postStub = sinon.stub().returns({ request: _ => Promise.resolve() })
      mailJetConnectStub.returns({ post: postStub })

      // When
      const result = Mailjet.sendEmail(options)

      // Then
      return result.then(() => {
        sinon.assert.calledWith(postStub, 'send')
      })
    })

    it('should request with a payload', () => {
      // Given
      const requestStub = sinon.stub().returns(Promise.resolve())
      const postStub = sinon.stub().returns({ request: requestStub })
      mailJetConnectStub.returns({ post: postStub })

      // When
      const result = Mailjet.sendEmail(options)

      // Then
      return result.then(() => {
        sinon.assert.calledWith(requestStub, {
          'FromEmail': 'jobboard@octo.com',
          'FromName': 'Ne Pas Repondre',
          'Subject': 'PTR intéressé par une activité du Dashboard',
          'Html-part': 'Corps du mail',
          'Recipients': [ { 'Email': 'jobboard@octo.com' } ]
        })
      })
    })
  })
})
