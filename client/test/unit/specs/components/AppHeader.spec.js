import Vue from 'vue';
import VueModal from 'vue-js-modal';
import AppHeader from '@/components/AppHeader';
import authenticationService from '@/services/authentication';
import notificationService from '@/services/notification';
import subscriptionsApi from '@/api/subscriptions';

Vue.use(VueModal);

describe('Unit | Component | AppHeader.vue', () => {
  let component;

  beforeEach(() => {
    // given
    const Constructor = Vue.extend(AppHeader);

    // when
    component = new Constructor().$mount();
  });

  it('should be named "AppHeader"', () => {
    expect(component.$options.name).to.equal('AppHeader');
  });

  describe('rendering', () => {
    it('should display a link to home', () => {
      expect(component.$el.querySelector('.logo-link')).to.exist;
    });

    it('should display a button to open the feedback-modal', () => {
      expect(component.$el.querySelector('.navbar-action__suggestion')).to.exist;
    });

    it('should display a button to logout', () => {
      expect(component.$el.querySelector('.navbar-action__logout')).to.exist;
    });

    it('should display a button to subscribe to jobs news', () => {
      expect(component.$el.querySelector('.navbar-action__subscribe')).to.exist;
    });
  });

  describe('#displayFeedbackModal', () => {
    beforeEach(() => {
      sinon.stub(component.$modal, 'show');
    });

    afterEach(() => {
      component.$modal.show.restore();
    });

    it('should display the feedback-modal', () => {
      // when
      component.displayFeedbackModal();

      // then
      expect(component.$modal.show).to.have.been.calledWith('feedback-modal');
    });
  });


  describe('#signOut', () => {
    beforeEach(() => {
      sinon.stub(authenticationService, 'disconnect').resolves();
    });

    afterEach(() => {
      authenticationService.disconnect.restore();
    });

    it('should call the API with good params', () => {
      // when
      component.signOut();

      // then
      expect(authenticationService.disconnect).to.have.been.called;
    });
  });

  describe('#subscribe', () => {
    beforeEach(() => {
      sinon.stub(authenticationService, 'isAuthenticated');
      sinon.stub(authenticationService, 'getAccessToken').returns('fake token');
      sinon.stub(notificationService, 'success');
      sinon.stub(notificationService, 'error');
      sinon.stub(subscriptionsApi, 'subscribe');
    });

    afterEach(() => {
      authenticationService.isAuthenticated.restore();
      authenticationService.getAccessToken.restore();
      notificationService.success.restore();
      notificationService.error.restore();
      subscriptionsApi.subscribe.restore();
    });

    it('should call the subscriptions API with access token when user is authenticated', () => {
      // given
      subscriptionsApi.subscribe.resolves();
      authenticationService.isAuthenticated.returns(true);

      // when
      component.subscribe();

      // then
      expect(subscriptionsApi.subscribe).to.have.been.calledWith('fake token');
    });

    it('should not call subscriptions API when user is not authenticated', () => {
      // given
      authenticationService.isAuthenticated.returns(false);

      // when
      component.subscribe();

      // then
      expect(subscriptionsApi.subscribe).to.not.have.been.called;
    });

    it('should display success toast notification when subscription succeeds', () => {
      // given
      subscriptionsApi.subscribe.resolves();
      authenticationService.isAuthenticated.returns(true);

      // when
      component.subscribe();

      // then
      return Vue.nextTick().then(() => {
        const message = 'Ton abonnement aux alertes du Job Board a été pris en compte.';
        expect(notificationService.success).to.have.been.calledWithExactly(component, message);
      });
    });

    it('should display error toast notification when subscription fails', () => {
      // given
      subscriptionsApi.subscribe.rejects();
      authenticationService.isAuthenticated.returns(true);

      // when
      component.subscribe();

      // then
      return Vue.nextTick().then(() => {
        const message = 'Erreur lors de la prise en compte de ton abonnement. Pense à te reconnecter.';
        expect(notificationService.error).to.have.been.calledWithExactly(component, message);
      });
    });
  });
});
