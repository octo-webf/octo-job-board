import Vue from 'vue';
import LoginPage from '@/components/LoginPage';
import authentication from '@/services/authentication';


describe('LoginPage.vue', () => {

	let component;

	describe('onMounted Hook', () => {

		beforeEach(() => {

			const Constructor = Vue.extend(LoginPage);

			component = new Constructor().$mount();

		});

		it('should define an onSignIn on the window namespace', () => {

			expect(window.onSignIn).to.exist;

		});

		it('should render a g-signin2 Button', () => {

			expect(component.$el.querySelectorAll('.g-signin2').length).to.equal(1);

		});


	});


	describe('onSignIn', () => {

		beforeEach(() => {

			const Constructor = Vue.extend(LoginPage);

			sinon.stub(authentication, 'authenticate').resolves();

			component = new Constructor().$mount();

		});

		afterEach(() => {

			authentication.authenticate.restore();

		});

		it('should call authenticate function', (done) => {

      // given
			const googleUser = {
				getAuthResponse() {

					return {
						id_token: 'google-id_token',
					};

				},
			};

      // when
			component.onSignIn(googleUser);

      // then
			expect(authentication.authenticate).to.have.been.called;
			done();

		});

	});


});
