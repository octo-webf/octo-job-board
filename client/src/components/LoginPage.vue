<template>

  <div class="login">

    <div class="g-signin2" ref="g-signin2" data-onsuccess="onSignIn"></div>

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

  			authentication.authenticate(googleUser).then(() => {

          this.$router.push('/');

  			});

  		},

  	},
  };
</script>
