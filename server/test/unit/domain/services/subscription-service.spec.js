const { sinon, expect } = require('../../../test-helper');
const subscriptionService = require('../../../../src/domain/services/subscription-service');
const { Subscription } = require('../../../../src/domain/models');

describe('Unit | Service | subscription-service', () => {
  describe('#addSubscription', () => {
    beforeEach(() => {
      sinon.stub(Subscription, 'findOrCreate');
    });

    afterEach(() => {
      Subscription.findOrCreate.restore();
    });

    it('should call Sequelize Model#findOrCreate (public static) and Bluebird Promise#spread methods', () => {
      // given
      const subscription = {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
      };
      const created = true;
      Subscription.findOrCreate.returns({

        // public static method Model#findOrCreate returns a Bluebird promise resolving <model:Model, created:Boolean>
        // this is why we must to make such a "manual stub" here
        // see:
        //   - http://bluebirdjs.com/docs/api/spread.html
        //   - http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-findOrCreate
        spread(cb) {
          return Promise.resolve(cb(subscription, created));
        },
      });

      // when
      const promise = subscriptionService.addSubscription('email@mail.com');

      // then
      return promise.then((res) => {
        expect(Subscription.findOrCreate).to.have.been.called;
        expect(res).to.deep.equal({
          subscription: {
            username: 'sdepold',
            job: 'Technical Lead JavaScript',
            id: 1,
          },
          created: true,
        });
      });
    });
  });

  describe('#removeSubscription', () => {
    beforeEach(() => {
      sinon.stub(Subscription, 'destroy');
    });

    afterEach(() => {
      Subscription.destroy.restore();
    });

    it('should call Sequelize Model#destroy (public static) method', () => {
      // given
      Subscription.destroy.resolves();

      // when
      const promise = subscriptionService.removeSubscription(123);

      // then
      return promise.then(() => {
        expect(Subscription.destroy).to.have.been.called;
      });
    });
  });

  describe('#getAllSubscriptions', () => {
    beforeEach(() => {
      sinon.stub(Subscription, 'all');
    });

    afterEach(() => {
      Subscription.all.restore();
    });

    it('should call Sequelize Model#all (public static) method', () => {
      // given
      Subscription.all.resolves();

      // when
      const promise = subscriptionService.getAllSubscriptions();

      // then
      return promise.then(() => {
        expect(Subscription.all).to.have.been.called;
      });
    });
  });
});

