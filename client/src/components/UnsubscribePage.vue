<template>
  <div class="unsubscribe">
    <article class="unsubscribe__content">
      <div class="unsubscribe__text">
        <p>
          En cliquant sur le bouton "Je me désinscris",
        </p>
        <p>
          tu ne recevras plus de notifications à chaque nouvelle alerte du Job Board.
        </p>
      </div>
      <button class="unsubscribe__action unsubscribe__action--confirm"
              @click.prevent.once="unsubscribe">Je me désinscris
      </button>
    </article>
  </div>
</template>

<script>
  import Vue from 'vue';
  import authenticationService from '@/services/authentication';
  import notificationService from '@/services/notification';
  import unsubscribeApi from '@/api/subscriptions';

  export default {
    name: 'UnsubscribePage',
    methods: {
      unsubscribe() {
        const accessToken = authenticationService.getAccessToken();
        unsubscribeApi.unsubscribe(accessToken)
          .then(this.displaySuccessNotification)
          .catch(this.displayErrorNotification);
      },

      displaySuccessNotification() {
        const message = 'Ton désabonnement aux alertes du Job Board a été pris en compte.';
        notificationService.success(this, message);
      },

      displayErrorNotification() {
        const message = 'Erreur lors de la prise en compte de ton désabonnement. Pense à te reconnecter.';
        notificationService.error(this, message);
      }
    }
  };
</script>

<style scoped>
  .unsubscribe__content {
    margin-top: 200px;
  }

  .unsubscribe__text {
    font-size: 20px;
  }

  .unsubscribe__action {
    font-size: 20px;
  }

  .unsubscribe__action {
    display: inline-block;
    padding: 4px 15px;
    font-size: 16px;
    line-height: 18px;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background: #008a00;
    outline: none;
    border: none;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    height: 34px;
    font-weight: 500;
    margin: 0;
  }

  .unsubscribe__action:focus {
    border: 3px #000000 solid;
  }

  .unsubscribe__action:hover {
    opacity: .85;
  }

</style>
