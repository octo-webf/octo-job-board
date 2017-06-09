<template>
	<div id="app">
		<img src="./assets/logo.png">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
};
</script>

<style>
	body {
		background: #f5f5f5;
		padding: 0;
		margin: 0;
	}

	#app {
		font-family: "Roboto", "Helvetica Neue", Arial, sans-serif;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
