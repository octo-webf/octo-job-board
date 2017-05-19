import Vue from 'vue';
import Home from '@/components/Home';
import GoogleSignInComponent from '@/components/GoogleSignInComponent';

describe('Home.vue', () => {

	let vm;

	beforeEach(() => {

		// Given
		const Constructor = Vue.extend(Home);
		// When
		vm = new Constructor().$mount();

	});

	it('should have a correct name', () => {

		// Then
		expect(vm.$options.name).to.equal('home');

	});

	it('should contain a GoogleSignInComponent', () => {

		// Then
		expect(vm.$options.components.GoogleSignInComponent).to.contain(GoogleSignInComponent);

	});

	it('should contain a GoogleSignInComponent in its template', () => {

		// Then
		expect(vm.$refs).to.haveOwnProperty('google-signin-component');

	});

});
