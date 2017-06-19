<template>

	<div class="login">

		<div class="g-signin2" ref="g-signin2" data-onsuccess="onSignIn"></div>

		<!-- <button @click="signOut">Sign out</button> -->

	</div>

</template>

<script>

import { mapActions } from 'vuex';

export default {
	name: 'login-page',

	mounted() {

		const self = this;

		window.onSignIn = (googleUser) => {

			const idToken = googleUser.getAuthResponse().id_token;

			self.authenticate({ idToken });

		};

	},

	methods: {

		...mapActions([

			'authenticate',
			// 'signOut',

		]),
	},
};
</script>
