import Vue from 'vue';
import AppHeader from '@/components/AppHeader';
import authenticationService from '@/services/authentication';

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

