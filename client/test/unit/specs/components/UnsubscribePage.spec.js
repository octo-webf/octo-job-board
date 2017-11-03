import Vue from 'vue';
import UnsubscribePage from '@/components/UnsubscribePage';
import authenticationService from '@/services/authentication';
import notificationService from '@/services/notification';
import subscriptionsApi from '@/api/subscriptions';

describe('Unit | Component | UnsubscribePage.vue', () => {
  let component;

  beforeEach(() => {
    const Constructor = Vue.extend(UnsubscribePage);
    component = new Constructor().$mount();
  });

  afterEach(() => {
  });

  it('should be named "UnsubscribePage"', () => {
    expect(component.$options.name).to.equal('UnsubscribePage');
  });

  describe('#unsubscribe', () => {
    beforeEach(() => {
      sinon.stub(authenticationService, 'getAccessToken').returns('fake token');
      sinon.stub(notificationService, 'success');
      sinon.stub(notificationService, 'error');
      sinon.stub(subscriptionsApi, 'unsubscribe');
    });

    afterEach(() => {
      authenticationService.getAccessToken.restore();
      notificationService.success.restore();
      notificationService.error.restore();
      subscriptionsApi.unsubscribe.restore();
    });

    it('should call subscriptionsApi with accessToken', () => {
      // given
      subscriptionsApi.unsubscribe.resolves();

      // when
      component.unsubscribe();

      // then
      expect(subscriptionsApi.unsubscribe).to.have.been.calledWithExactly('fake token');
    });

    it('should display success toast notification when subscription succeeds', (done) => {
      // given
      subscriptionsApi.unsubscribe.resolves();

      // when
      component.unsubscribe();

      // then
      setTimeout(() => {
        const message = 'Ton désabonnement aux alertes du Job Board a été pris en compte.';
        expect(notificationService.success).to.have.been.calledWithExactly(component, message);
        done();
      }, 100);
    });

    it('should display error toast notification when subscription fails', (done) => {
      // given
      subscriptionsApi.unsubscribe.rejects();

      // when
      component.unsubscribe();

      // then
      setTimeout(() => {
        const message = 'Erreur lors de la prise en compte de ton désabonnement. Pense à te reconnecter.';
        expect(notificationService.error).to.have.been.calledWithExactly(component, message);
        done();
      }, 100);
    });
  });
});
