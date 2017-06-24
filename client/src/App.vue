<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700,900');

	body {
		background: #f5f5f5;
		padding: 0;
		margin: 0;
	}

	#app {
		font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
