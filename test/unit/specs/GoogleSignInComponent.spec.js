import Vue from 'vue';
import GoogleSignInComponent from '@/components/GoogleSignInComponent';
import GSignInButton from 'vue-google-signin-button';

describe('GoogleSignInComponent.vue', () => {

	let vm;

	beforeEach(() => {

		// Given
		const Constructor = Vue.extend(GoogleSignInComponent);
		// When
		vm = new Constructor().$mount();

	});

	it('should have a correct name', () => {

		// Then
		expect(vm.$options.name).to.equal('google-signin');

	});

	xit('should contain a g-signin-button component', () => {

		Vue.use(GSignInButton);

		console.log(vm.$options.components);

		// Then
		expect(vm.$options.components.GSignInButton).to.contain(GSignInButton);

	});

});
