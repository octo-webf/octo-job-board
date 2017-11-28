<template>
  <div class="interest-modal-wrapper">
    <modal class="interest-modal" name="interest-modal" @before-open="beforeOpen" height="auto" :pivotY="0.35">

      <!-- modal header-->
      <div class="interest-modal__header">
        <h2 class="interest-modal__title">Intéressé·e&nbsp; par <strong>{{ mission }}</strong>
          pour <strong>{{ customerName }}</strong>&nbsp;?</h2>
        <button class="interest-modal__action interest-modal__action--cancel" @click="closeModal">
          <icon name="times" scale="1.5"></icon>
        </button>
      </div>

      <!-- modal body -->
      <div class="interest-modal__body">
        <div class="interest-modal__text" id="interest-content">
          <p class="interest-modal__error" v-if="error" aria-live="polite">{{error}}</p>
          <p>
            En tant que <strong>{{ jobTitle }}</strong>,
            es-tu disponible à partir du <strong>{{ staffingNeededSince}}</strong>&nbsp;?
          </p>
        </div>
      </div>

      <!-- modal footer -->
      <div class="interest-modal__footer">
        <div class="interest-modal__actions">
          <!--todo prevent twice-->
          <button class="interest-modal__action interest-modal__action--send"
                  title="Si vous cliquez sur ce bouton, un mail sera envoyé à l'équipe Job Board (uniquement !) avec les informations utiles pour aider au staffing."
                  @click="submitInterest">Je suis disponible
          </button>
        </div>
        <p class="interest-modal__mentions">
          L'équipe Job Board te mettra en relation avec <strong>{{ missionDirectorNickname }}</strong>
          , dir. mission et <strong>{{ businessContactNickname }}</strong>, contact biz.</p>
      </div>

    </modal>
  </div>
</template>

<script>
  import authenticationService from '@/services/authentication';
  import interestsApi from '@/api/interests';
  import notificationService from '@/services/notification';
  import analyticsService from '@/services/analytics';

  export default {

    name: 'InterestModal',

    props: ['interestingJob'],

    data() {
      return {
        interest: null,
        error: null,
        isClicked: false,
      };
    },

    computed: {
      businessContactNickname() {
        if (!this.interestingJob) return '';
        return (this.interestingJob.project.business_contact) ? this.interestingJob.project.business_contact.nickname : 'N/A';
      },

      customerName() {
        if (!this.interestingJob) return '';
        return (this.interestingJob.project.customer.name) ? this.interestingJob.project.customer.name : 'N/A';
      },

      jobTitle() {
        if (!this.interestingJob) return '';
        return this.interestingJob.activity.title;
      },

      mission() {
        if (!this.interestingJob) return '';
        const missionName = this.interestingJob.project.name;
        return missionName.substring(0, 49);
      },

      missionDirectorNickname() {
        if (!this.interestingJob) return '';
        return (this.interestingJob.project.mission_director) ? this.interestingJob.project.mission_director.nickname : 'N/A';
      },

      octopodUrl() {
        if (!this.interestingJob) return '';
        const octopodProjectId = this.interestingJob.project.id;
        return `https://octopod.octo.com/projects/${octopodProjectId}`;
      },

      staffingNeededSince() {
        if (!this.interestingJob) return '';
        const staffingNeededSince = new Date(this.interestingJob.activity.staffing_needed_from);
        return staffingNeededSince.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      },
    },

    methods: {

      submitInterest() {
        this._disableButton();
        this._removeError();
        this._trackEventInterestClick();
        this._sendInterest()
          .then(this.closeModal)
          .then(this.displaySuccessNotification)
          .catch(() => {
            this.error = 'Une erreur est survenue durant l\'envoi de ton intérêt.';
          });
      },

      _trackEventInterestClick() {
        analyticsService.trackEvent(this, 'InterestModal', 'click', 'Someone sends an interest');
      },

      _trackEventOpeningInterestModalOpen() {
        analyticsService.trackEvent(this, 'InterestModal', 'opening', 'Someone is interested');
      },

      _sendInterest() {
        const consultant = authenticationService.getAuthenticatedUser();
        const accessToken = authenticationService.getAccessToken();
        return interestsApi.sendInterest(this.interestingJob, consultant, accessToken);
      },

      _disableButton() {
        this.isClicked = true;
      },

      displaySuccessNotification() {
        const message = 'Merci de ton intérêt pour la mission. Ta demande a été transmise à l\'équipe Job Board.';
        notificationService.successCenterToast(this, message);
      },

      beforeOpen() {
        this._trackEventOpeningInterestModalOpen();
        this._resetInterest();
        this._removeError();
      },

      _resetInterest() {
        this.interest = null;
      },

      _removeError() {
        this.error = null;
      },

      closeModal() {
        this.$modal.hide('interest-modal');
      },
    },
  };

</script>

<style scoped>
  .toast-container {
    margin-top: 60px;
  }

  .interest-modal__header {
    background-color: #eef0f4;
    padding: 15px 40px 10px 20px;
    justify-content: center;
    display: flex;
    position: relative;
  }

  .interest-modal__body {
    padding: 15px 20px;
    background: #fff;
  }

  .interest-modal__title {
    margin: 0;
    font-size: 24px;
    color: #333333;
  }

  .interest-modal__error {
    background-color: #ea6344;
    color: white;
    border-radius: 3px;
    padding: 10px;
    margin: 0 0 20px;
  }

  .interest-modal__text {
    width: 100%;
    resize: none;
    overflow: auto;
    font-size: 16px;
    box-sizing: border-box;
  }

  .interest-modal__footer {
    padding: 0 20px 20px;
    background: #fff;
  }

  .interest-modal__actions {
    text-align: center;
  }

  .interest-modal__action {
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

  .interest-modal__action:focus {
    border: 3px #000000 solid;
  }

  .interest-modal__action:hover {
    opacity: .85;
  }

  .interest-modal__action--cancel {
    height: auto;
    padding: 0.5em;
    background: transparent;
    border: none;
    color: #999;
    position: absolute;
    right: 0.2em;
    top: 0.2em;
  }

  .interest-modal__action--cancel:focus {
    border: none;
  }

  .interest-modal__mentions {
    width: 100%;
    resize: none;
    overflow: auto;
    font-size: 14px;
    box-sizing: border-box;
    font-style: italic;
    text-align: center;
  }
</style>
