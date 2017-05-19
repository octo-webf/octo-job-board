<template>

	<section class="">

		<google-sign-in-component ref="google-signin-component"></google-sign-in-component>

	</section>

</template>

<script>

import GoogleSignInComponent from '@/components/GoogleSignInComponent';

export default {
	name: 'home',

	components: {

		GoogleSignInComponent,

	},

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
