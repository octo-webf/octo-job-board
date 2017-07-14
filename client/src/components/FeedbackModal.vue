<template>
  <div class="feedback-modal-wrapper">
    <modal class="feedback-modal" name="feedback-modal" @before-open="beforeOpen" :height="400">

      <!-- modal header-->
      <div class="feedback-modal__header">
        <h2 class="feedback-modal__title">Contacter le support</h2>
      </div>

      <!-- modal body -->
      <div class="feedback-modal__body">
        <form class="feedback-modal__form">

          <p class="feedback-modal__error" v-if="error" aria-live="polite">{{error}}</p>

          <label class="feedback-modal__label" for="feedback-content">Contenu du message :</label>
          <textarea class="feedback-modal__text" id="feedback-content" v-model="feedback"></textarea>
        </form>
      </div>

      <!-- modal body -->
      <div class="feedback-modal__footer">
        <div class="feedback-modal__actions">
          <button class="feedback-modal__action feedback-modal__action--send" @click="sendFeedback">Envoyer</button>
          <button class="feedback-modal__action feedback-modal__action--cancel" @click="cancelFeedback">Annuler</button>
        </div>
      </div>

    </modal>
  </div>
</template>

<script>

  import authenticationService from '@/services/authentication';
  import feedbacksApi from '@/api/feedbacks';

  export default {

    name: 'FeedbackModal',

    data() {
      return {
        feedback: null,
        error: null,
      };
    },

    methods: {
      beforeOpen() {
        this._resetFeedback();
        this._removeError();
      },

      sendFeedback() {
        this._removeError();
        if (!this.feedback || this.feedback.trim().length === 0) {
          this.error = 'Vous devez saisir un message.';
          return;
        }

        const consultant = authenticationService.getAuthenticatedUser();
        const accessToken = authenticationService.getAccessToken();
        feedbacksApi.sendFeedback(this.feedback, consultant, accessToken)
          .then(() => {
            this._closeModal();
          }).catch(() => {
            this.error = 'Une erreur est survenue durant l\'envoi de votre message.';
          });
      },

      cancelFeedback() {
        this._closeModal();
      },

      _resetFeedback() {
        this.feedback = null;
      },

      _removeError() {
        this.error = null;
      },

      _closeModal() {
        this.$modal.hide('feedback-modal');
      },
    },
  };

</script>

<style scoped>

  .feedback-modal__header {
    background-color: #eef0f4;
    padding: 10px 20px;
  }

  .feedback-modal__body {
    padding: 25px 20px;
    background: #fff;
    height: 216px;
  }

  .feedback-modal__form {
    padding: 0;
    margin: 0;
  }

  .feedback-modal__title {
    margin: 0;
    font-size: 16px;
    color: #333333;
    height: 40px;
    line-height: 40px;
  }

  .feedback-modal__error {
    background-color: #ea6344;
    color: white;
    border-radius: 3px;
    padding: 10px;
    margin: 0 0 20px;
  }

  .feedback-modal__label {
    display: block;
    margin-bottom: 10px;
  }

  .feedback-modal__text {
    width: 100%;
    border: 1px solid #d8dde6;
    resize: none;
    overflow: auto;
    height: 152px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 5px;
  }

  .feedback-modal__footer {
    padding: 20px;
    background: #fff;
    text-align: right;
  }

  .feedback-modal__action {
    display: inline-block;
    padding: 4px 15px;
    font-size: 14px;
    line-height: 16px;
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

  .feedback-modal__action:focus {
    border: 3px #000000 solid;
  }

  .feedback-modal__action:hover {
    opacity: .85;
  }

  .feedback-modal__action--cancel {
    background: #fff;
    border: 1px solid #d8dde6;
    color: #333333;
  }

  .feedback-modal__action--cancel:hover {
    box-shadow: 0 0 3px 0 #d8dde6;
  }

</style>
