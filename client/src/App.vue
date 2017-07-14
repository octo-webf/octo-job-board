<template>
  <div id="app">
    <router-view></router-view>
    <feedback-modal/>
    <github-corner/>
  </div>
</template>

<script>

  import FeedbackModal from '@/components/FeedbackModal';
  import GithubCorner from '@/components/GithubCorner';

  export default {
    name: 'app',
    components: {
      'feedback-modal': FeedbackModal,
      'github-corner': GithubCorner,
    },
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

  .v--modal {
    border-radius: 5px;
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
