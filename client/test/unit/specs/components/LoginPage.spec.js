import Vue from 'vue';
import LoginPage from '@/components/LoginPage';
import authentication from '@/services/authentication';

describe('Unit | Component | LoginPage.vue', () => {
	let component;

	beforeEach(() => {
		const Constructor = Vue.extend(LoginPage);

		component = new Constructor().$mount();
	});


	describe('onMounted Hook', () => {
		it('should define an onSignIn on the window namespace', () => {
			expect(window.onSignIn).to.exist;
		});

		it('should render a g-signin2 Button', () => {
			expect(component.$el.querySelectorAll('.g-signin2').length).to.equal(1);
		});
	});


	describe('method #onSignIn', () => {
		beforeEach(() => {
			sinon.stub(authentication, 'authenticate').resolves();
			window.localStorage.clear();
		});

		afterEach(() => {
			authentication.authenticate.restore();
		});

		it('should call authenticate function', () => {
      // given
			const googleUser = {};

      // when
			component.onSignIn(googleUser);

      // then
			expect(authentication.authenticate).to.have.been.called;
		});
	});
});
