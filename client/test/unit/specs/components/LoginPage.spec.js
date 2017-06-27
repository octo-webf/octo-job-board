import Vue from 'vue';
import LoginPage from '@/components/LoginPage';
import authentication from '@/services/authentication';

describe('Unit | Component | LoginPage.vue', () => {
	let component;

	beforeEach(() => {
		window.gapi = {
			load() {

			},
			auth2: {
				getAuthInstance() {
					return {};
				},
			},
		};
		const Constructor = Vue.extend(LoginPage);
		component = new Constructor().$mount();
	});

	afterEach(() => {
		delete window.gapi;
	});

	describe('method #onSignInSuccess', () => {
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
			component.onSignInSuccess(googleUser);

      // then
			expect(authentication.authenticate).to.have.been.called;
		});
	});

	describe('method #onSignInError', () => {
		it('should exist', () => {
			expect(component.onSignInError).to.exist.and.to.be.a.function;
		});
	});
});
