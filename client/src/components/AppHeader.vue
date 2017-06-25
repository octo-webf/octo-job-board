<template>
  <div class="app-header">
    <header class="page__header">
      <div class="page__container page__header--container">
        <a class="logo-link" href="/">
          <span class="logo-link__job">job</span><span class="logo-link__board">board</span>
        </a>
        <nav class="app-header__navigation navigation" role="navigation" aria-label="site navigation">
          <ol class="navigation__links">
            <li class="navigation__link"><a class="logout-link" href="#" @click="signOut">Se déconnecter</a></li>
          </ol>
        </nav>
      </div>
    </header>

  </div>
</template>
<script>

  import authenticationService from '@/services/authentication';

  export default {

  	methods: {
  		signOut() {
  			authenticationService.disconnect().then(() => {
  				this.$router.push('/login');
  			});
  		},
  	},

  };
</script>
<style scoped>
  /* App header
/* ------------------- */

  .page__header {
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    position: fixed;
    top: 0;
  }

  .page__header--container {
    display: flex;
    justify-content: center;
  }

  .logo-link {
    text-decoration: none;
    font-size: 26px;
    display: inline-block;
    padding: 15px 0;
  }

  .logo-link__job {
    color: #07c;
  }

  .logo-link__board {
    color: #F48024;
    font-weight: 900;
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

  .navigation {
    display: none;
  }

  .navigation__links {
    list-style: none;
    margin: 0;
  }

  @media only screen and (min-width: 640px) {
    .page__header--container {
      justify-content: space-between;
    }

    .app-header__navigation {
      display: inline-block;
    }

  }

</style>
