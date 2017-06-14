<template>
  <div class="login">
    <div class="g-signin2" data-onsuccess="onSignIn"></div>

    <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
  export default {
  	name: 'login',

  	mounted() {

  		const self = this;
  		window.onSignIn = (googleUser) => {

  			const profile = googleUser.getBasicProfile();
  			console.log(`ID: ${profile.getId()}`); // Do not send to your backend! Use an ID token instead.
  			console.log(`Name: ${profile.getName()}`);
  			console.log(`Image URL: ${profile.getImageUrl()}`);
  			console.log(`Email: ${profile.getEmail()}`); // This is null if the 'email' scope is not present.

        // The ID token you need to pass to your backend:
  			const idToken = googleUser.getAuthResponse().id_token;
  			console.log(`ID Token: ${idToken}`);

  			self.verifyTokenOnServerSide(idToken);

  		};

  	},

  	methods: {
  		verifyTokenOnServerSide(idToken) {

  			this.$http.post('http://localhost:3000/auth/token', { idToken }).then((response) => {

          // get body data
  				this.someData = response.body;
  				console.log(`body = ${this.someData}`);

			}, (response) => {

          // error callback
  				console.error(response);

			});

		},

  		signOut() {

  			const auth2 = window.gapi.auth2.getAuthInstance();
  			auth2.signOut().then(() => {

  				console.log('User signed out.');

			});

		},
  	},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
