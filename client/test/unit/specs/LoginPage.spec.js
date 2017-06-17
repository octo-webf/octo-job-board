import Vue from 'vue';
import LoginPage from '@/components/LoginPage';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

chai.use(dirtyChai);


describe('Unit | LoginPage.vue', () => {

	let Constructor;

	beforeEach(() => {

		Constructor = Vue.extend(LoginPage);

	});

	it('should define an onSignIn on the window namespace', () => {

		// when
		new Constructor().$mount();

		// then
		expect(window.onSignIn).to.exist();

	});

	it('should define an authenticate methods', () => {

		// when
		const component = new Constructor();

		// then
		expect(component.authenticate).to.exist();

	});

	it('should contain a g-signin2 Button', () => {

		// when
		const component = new Constructor().$mount();
		const button = component.$refs['g-signin2'];

		// then
		expect(button).to.exist();

	});

});
