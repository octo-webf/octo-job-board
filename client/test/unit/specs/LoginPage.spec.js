import Vue from 'vue';
import LoginPage from '@/components/LoginPage';

describe('LoginPage.vue', () => {

	let component;

	beforeEach(() => {

		const Constructor = Vue.extend(LoginPage);
		component = new Constructor().$mount();

	});

	it('should define an onSignIn on the window namespace', () => {

		expect(window.onSignIn).to.exist();

	});

	it('should define an authenticate methods', () => {

		expect(component.authenticate).to.exist();

	});

	it('should contain a g-signin2 Button', () => {

		expect(component.$refs['g-signin2']).to.exist();

	});

});
