<template>

  <div class="login">

    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Sign in with Google
    </g-signin-button>

  </div>

</template>

<script>

  import Vue from 'vue';
  import GSignInButton from 'vue-google-signin-button';
  import authentication from '@/services/authentication';

  Vue.use(GSignInButton);

  export default {

  	data() {
  		return {
  			googleSignInParams: {
  				client_id: process.env.CLIENT_ID,
  			},
  		};
  	},

  	methods: {

  		onSignInSuccess(googleUser) {
  			authentication.authenticate(googleUser).then(() => {
  				this.$router.push('/');
  			});
  		},

  		onSignInError() {
  		},

  	},
  };
</script>

<style scoped>

  .g-signin-button {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
    cursor: pointer;
    margin-top: 200px;
  }
</style>
