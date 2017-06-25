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

  .page__container {
    min-width: 270px;
    max-width: 270px;
    margin: 0 auto;
  }

  .page__body {
    display: flex;
    width: 100%;
    padding: 20px 0;
    margin-top: 60px;
  }

  /* tablet */
  @media only screen and (min-width : 768px) {
    .page__container {
      min-width: 540px;
      max-width: 540px;
    }
  }

  /* desktop */
  @media only screen and (min-width : 992px) {
    .page__container {
      min-width: 810px;
      max-width: 810px;
    }
  }
  /* desktop */
  @media only screen and (min-width : 1200px) {
    .page__container {
      min-width: 1080px;
      max-width: 1080px;
    }
  }

</style>
