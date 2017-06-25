<template>
  <div class="app-header">
    <header class="page__header">
      <div class="page__container page__header--container">
        <a class="logo-link" href="/">
          <span class="logo-link__job">Job</span>
          <span class="logo-link__board">Board</span>
        </a>
        <a class="logout-link" href="#" @click="signOut">Se déconnecter</a>
      </div>
    </header>

  </div>
</template>
<script>

  import authenticationService from '@/services/authentication';

  export default  {

    methods: {
      signOut() {
        authenticationService.disconnect().then(() => {
          this.$router.push('/login');
        });
      }
    }

  }
</script>
<style scoped>
  /* App header
/* ------------------- */

  .page__header {
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    padding-left: 20px;
    position: fixed;
    top: 0;
  }

  .page__header--container {
    display: flex;
    justify-content: space-between;
  }

  .logo-link {
    text-decoration: none;
    font-size: 26px;
    font-weight: 900;
    display: inline-block;
    padding: 15px 0;
  }

  .logo-link__job {
    color: #07c;
  }

  .logo-link__board {
    color: #F48024;
  }

  .logout-link {
    color: #9199a1;
    display: inline-block;
    padding: 17px 0;
    line-height: 28px;
    text-decoration: none;
  }

  .logout-link:hover {
    text-decoration: underline;
  }


</style>
