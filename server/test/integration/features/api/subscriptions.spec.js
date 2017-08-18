const { request, expect, sinon } = require('../../../test-helper');
const app = require('../../../../app');
const subscriptionService = require('../../../../src/domain/services/subscription-service');

describe('Integration | Routes | subscriptions route', () => {
  describe('POST /api/subscriptions', () => {
    beforeEach(() => {
      sinon.stub(subscriptionService, 'addSubscription');
    });

    afterEach(() => {
      subscriptionService.addSubscription.restore();
    });

    it('should call subscriptionService#addSubscription', (done) => {
      // given
      const subscriberEmail = 'john.doe@mail.com';
      const persistedSubscription = { id: 1, email: subscriberEmail };

      subscriptionService.addSubscription.resolves({ subscription: persistedSubscription, created: false });

      // when
      request(app)
        .post('/api/subscriptions')
        .send({ email: subscriberEmail })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, (err, res) => {
          // then
          expect(subscriptionService.addSubscription).to.have.been.calledWith(subscriberEmail);
          expect(res.body).to.deep.equal(persistedSubscription);
          done();
        });
    });

    it('should return 200 when a subscription already exist', () => {
      // given
      subscriptionService.addSubscription.resolves({ subscription: {}, created: false });

      // when
      return request(app)
        .post('/api/subscriptions')
        .send({ email: 'john.doe@mail.com' })
        .expect(200);
    });

    it('should return 201 when the subscription did not exist for the given email', () => {
      // given
      subscriptionService.addSubscription.resolves({ subscription: {}, created: true });

      // when
      return request(app)
        .post('/api/subscriptions')
        .send({ email: 'john.doe@mail.com' })
        .expect(201);
    });

    it('should return 403 when subscription service throws an error', () => {
      // given
      subscriptionService.addSubscription.rejects(new Error('Some error'));

      // when
      return request(app)
        .post('/api/subscriptions')
        .send({ email: 'john.doe@mail.com' })
        .expect(403);
    });
  });

  describe('DELETE /api/subscriptions/:subscription_id', () => {
    beforeEach(() => {
      sinon.stub(subscriptionService, 'removeSubscription').resolves();
    });

    afterEach(() => {
      subscriptionService.removeSubscription.restore();
    });

    it('should call subscriptionService#removeSubscription', (done) => {
      // when
      request(app)
        .delete('/api/subscriptions/1234')
        .send()
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(204, () => {
          // then
          expect(subscriptionService.removeSubscription).to.have.been.calledWith(1234);
          done();
        });
    });
  });
});
