<template>
  <div class="app-header">
    <header class="page__header">
      <div class="page__container page__header--container">
        <a class="logo-link" href="/">
          <img src="../assets/logo_JobBoard.png" height="40"/>
        </a>
        <nav class="app-header__navigation navigation" role="navigation" aria-label="site navigation">
          <ol class="navigation__links">
            <li class="navigation__link">
              <button class="navbar-action navbar-action__subscribe" type="button" @click="subscribe">S'abonner</button>
            </li>
            <li class="navigation__link">
              <button class="navbar-action navbar-action__suggestion" type="button" @click="displayFeedbackModal">
                Proposer des améliorations
              </button>
            </li>
            <li class="navigation__link">
              <button class="navbar-action navbar-action__logout" type="button" @click="signOut">Se déconnecter</button>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  </div>
</template>
<script>
  import authenticationService from '@/services/authentication';
  import notificationService from '@/services/notification';
  import subscriptions from '@/api/subscriptions';

  export default {

    name: 'AppHeader',

    methods: {
      displayFeedbackModal() {
        this.$modal.show('feedback-modal');
      },

      signOut() {
        authenticationService.disconnect().then(() => {
          this.$router.push('/login');
        });
      },

      subscribe() {
        if (authenticationService.isAuthenticated()) {
          const accessToken = authenticationService.getAccessToken();
          subscriptions.subscribe(accessToken)
            .then(this.displaySuccessNotification)
            .catch(this.displayErrorNotification);
        }
      },

      displaySuccessNotification() {
        const message = 'Ton abonnement aux alertes du Job Board a été pris en compte.';
        notificationService.success(this, message);
      },

      displayErrorNotification() {
        const message = 'Erreur lors de la prise en compte de ton abonnement. Pense à te reconnecter.';
        notificationService.error(this, message);
      },
    },

  };
</script>

<style scoped>
  .page__header {
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .page__header--container {
    display: flex;
    justify-content: center;
  }

  .logo-link {
    text-decoration: none;
    font-size: 26px;
    display: inline-block;
    padding: 10px 0;
  }

  .logo-link__job {
    color: #07c;
  }

  .logo-link__board {
    color: #d14800;
    font-weight: 900;
  }

  .navbar-action {
    cursor: pointer;
    background: transparent;
    font-size: 16px;
    border: none;
    padding: 16px 0;
    line-height: 28px;
    color: #333333;
    display: inline-block;
  }

  .navbar-action:hover {
    text-decoration: underline;
  }

  .navigation {
    display: none;
  }

  .navigation__links {
    list-style: none;
    margin: 0;
    display: inline-flex;
  }

  .navigation__link {
    margin-left: 25px;
  }

  .page__container {
    margin: 0 auto;
  }

  .navigation__link {
    margin-left: 25px;
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
