<template>

  <div class="login">

    <div class="g-signin2" ref="g-signin2" data-onsuccess="onSignIn"></div>

    <!-- <button @click="signOut">Sign out</button> -->

  </div>

</template>

<script>

  import authentication from '@/services/authentication';

  export default {

  	name: 'login-page',

  	mounted() {

  		window.onSignIn = this.onSignIn.bind(this);

  	},

  	methods: {

  		onSignIn(googleUser) {

  			const idToken = googleUser.getAuthResponse().id_token;

  			authentication.authenticate(idToken).then(() => {

  				this.$router.push('/jobs');

  			});

  		},

  	},
  };
</script>
