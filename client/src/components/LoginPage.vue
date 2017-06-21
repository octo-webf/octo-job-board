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

  		this.onSignIn = this.onSignIn.bind(this);

  		window.onSignIn = this.onSignIn;

  	},

  	methods: {

  		onSignIn(googleUser) {

  			const idToken = googleUser.getAuthResponse().id_token;

  			const response = authentication.authenticate().then((access_token) => {

  			  // 1. store access_token into local storage
          // 2. redirect to index page
        });

  		},

  	},
  };
</script>
