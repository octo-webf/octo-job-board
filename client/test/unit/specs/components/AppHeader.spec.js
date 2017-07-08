import Vue from 'vue';
import VueModal from 'vue-js-modal';
import AppHeader from '@/components/AppHeader';
import authenticationService from '@/services/authentication';

Vue.use(VueModal);

describe('Unit | Component | AppHeader.vue', () => {
	let component;

	beforeEach(() => {
    // given
		const Constructor = Vue.extend(AppHeader);

    // when
		component = new Constructor().$mount();
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
});

