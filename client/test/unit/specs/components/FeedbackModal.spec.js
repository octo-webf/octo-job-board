import Vue from 'vue';
import VueModal from 'vue-js-modal';
import FeedbackModal from '@/components/FeedbackModal';
import feedbacksApi from '@/api/feedbacks';
import authenticationService from '@/services/authentication';

Vue.use(VueModal);

describe('Unit | Component | FeedbackModal.vue', () => {
  let component;

  const feedback = 'Dis-moi petit, as-tu déjà dansé avec le diable au clair de lune ?';
  const consultant = {
    email: 'bruce.wayne@gotham.dc',
    name: 'Bruce Wayne',
  };

  beforeEach(() => {
    // given
    const Constructor = Vue.extend(FeedbackModal);

    // when
    component = new Constructor({
      data: {
        feedback,
      },
    }).$mount();
  });

  it('should be named "FeedbackModal"', () => {
    expect(component.$options.name).to.equal('FeedbackModal');
  });

  describe('rendering', () => {
    it('should display the modal', () => {
      Vue.nextTick().then(() => {
        expect(component.$el.querySelector('.feedback-modal')).to.exist;
      });
    });
  });

  describe('#sendFeedback', () => {
    beforeEach(() => {
      sinon.stub(feedbacksApi, 'sendFeedback').resolves();
      sinon.stub(authenticationService, 'getAuthenticatedUser').returns(consultant);
      sinon.stub(authenticationService, 'getAccessToken').returns('some-access-token');
    });

    afterEach(() => {
      feedbacksApi.sendFeedback.restore();
      authenticationService.getAuthenticatedUser.restore();
      authenticationService.getAccessToken.restore();
    });

    it('should call the API with good params', () => {
      // when
      component.sendFeedback();

      // then
      expect(feedbacksApi.sendFeedback).to.have.been.calledWith(feedback, consultant, 'some-access-token');
    });

    it('should send interests on click on "send" button', () => {
      // Given
      component.$modal.show('feedback-panel');

      Vue.nextTick().then(() => {
        const myButton = component.$el.querySelector('.feedback-modal__action--send');

        // When
        myButton.click();

        // Then
        expect(feedbacksApi.sendFeedback).to.have.been.calledWith(feedback, consultant, 'some-access-token');
      });
    });

    it('should close the modal');
  });
});
