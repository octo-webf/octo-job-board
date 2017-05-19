<template>

	<div class="">
		<g-signin-button>rfrfrf</g-signin-button>

	</div>


</template>

<script>

import Vue from 'vue';
import GSignInButton from 'vue-google-signin-button';

Vue.use(GSignInButton);

export default {

	name: 'google-signin',

	components: {

		GSignInButton,

	},

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
