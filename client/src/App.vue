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

  .page__body {
    display: flex;
    width: 100%;
    padding: 20px 0;
    margin-top: 60px;
    justify-content: center;
  }

  .page__container {
    margin: 0 auto;
  }

  @media only screen and (min-width: 640px) {
    .page__container {
      max-width: 544px;
    }
  }

  @media only screen and (min-width: 992px) {
    .page__container {
      max-width: 816px;
    }
  }

  @media only screen and (min-width: 1200px) {
    .page__container {
      max-width: 1088px;
    }
  }

</style>
