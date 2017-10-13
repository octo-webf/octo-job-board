<template>
  <div class="interest-modal-wrapper">
    <modal class="interest-modal" name="interest-modal" @before-open="beforeOpen" :height="404">

      <!-- modal header-->
      <div class="interest-modal__header">
        <h2 class="interest-modal__title">Vraiment intéressé·e&nbsp;?</h2>
      </div>

      <!-- modal body -->
      <div class="interest-modal__body">
        <div class="interest-modal__text" id="interest-content">
          <p class="interest-modal__error" v-if="error" aria-live="polite">{{error}}</p>

          <p>
            Si tu cliques sur le bouton Envoyer, un mail sera envoyé à l'équipe Job Board (uniquement !) avec les informations utiles pour aider au staffing.
          </p>
          <p>
            Afin d'échanger au sujet de ton intérêt pour le job <strong>{{ jobTitle }}</strong>
            au sein de la mission : <strong>{{ mission }}</strong>,
            l'équipe du Job Board te mettra en relation avec&nbsp;:</p>
          <ul>
            <li><strong>{{ businessContactNickname }}</strong> : Dir. mission </li>
            <li><strong>{{ missionDirectorNickname }}</strong> : Contact biz</li>
          </ul>
          <p>Pense aussi à vérifier ta disponibilité au
            <strong>{{ staffingNeededSince }}</strong>
            avec ta·ton directeur·trice de mission actuel·le&nbsp;;-)</p>
        </div>
      </div>

      <!-- modal footer -->
      <div class="interest-modal__footer">
        <div class="interest-modal__actions">
          <!--todo prevent twice-->
          <button class="interest-modal__action interest-modal__action--send"
                  @click="submitInterest">Envoyer
          </button>
          <a :href="octopodUrl" target="_blank">
            <button class="interest-modal__action interest-modal__action--octopod">
              Fiche Octopod
            </button>
          </a>

          <button class="interest-modal__action interest-modal__action--cancel" @click="cancelInterest">Annuler</button>
        </div>
      </div>

    </modal>
  </div>
</template>

<script>
  import authenticationService from '@/services/authentication';
  import interestsApi from '@/api/interests';

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

      jobTitle() {
        if (!this.interestingJob) return '';
        return this.interestingJob.activity.title;
      },

      businessContactNickname() {
        if (!this.interestingJob) return '';
        return (this.interestingJob.project.business_contact) ? this.interestingJob.project.business_contact.nickname : 'N/A';
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

      mission() {
        if (!this.interestingJob) return '';
        const missionName = this.interestingJob.project.name;
        return missionName.substring(0, 49);
      },
    },

    methods: {

      submitInterest() {
        this.sendInterest().then(() => {
          this.disableButton();
          this.displaySuccessNotification();
        });
        this.trackEvent();
      },

      trackEvent() {
        this.$ga.event({
          eventCategory: 'Job List',
          eventAction: 'click',
          eventLabel: 'I am interested',
          eventValue: null,
        });
      },

      sendInterest() {
        this._removeError();

        const consultant = authenticationService.getAuthenticatedUser();
        const accessToken = authenticationService.getAccessToken();
        return interestsApi.sendInterest(this.interestingJob, consultant, accessToken)
          .then(this._closeModal)
          .catch(() => {
            this.error = 'Une erreur est survenue durant l\'envoi de ton intérêt.';
          });
      },

      disableButton() {
        this.isClicked = true;
      },

      displaySuccessNotification() {
        this._closeModal();
        const message = 'Merci de ton intérêt pour la mission. Ta demande a été transmise à l\'équipe Job Board.';
        this.$root.$refs.centerToastr.s({
          msg: message,
          position: 'toast-top-center',
          timeout: 3000,
          closeButton: true,
        });
      },

      beforeOpen() {
        this._resetInterest();
        this._removeError();
      },

      cancelInterest() {
        this._closeModal();
      },

      _resetInterest() {
        this.interest = null;
      },

      _removeError() {
        this.error = null;
      },

      _closeModal() {
        this.$modal.hide('interest-modal');
      },
    },
  };

</script>

<style scoped>
  .toast-container{
    margin-top:60px;
  }
  .interest-modal__header {
    background-color: #eef0f4;
    padding: 10px 20px;
    justify-content: center;
    display: flex;
  }

  .interest-modal__body {
    padding: 15px 20px;
    background: #fff;
    height: 240px;
  }

  .interest-modal__title {
    margin: 0;
    font-size: 24px;
    color: #333333;
    height: 40px;
    line-height: 40px;
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
    padding: 5px;
  }

  .interest-modal__footer {
    padding: 20px;
    background: #fff;
    text-align: right;
  }

  .interest-modal__action {
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

  .interest-modal__action:focus {
    border: 3px #000000 solid;
  }

  .interest-modal__action--octopod {
    background: #fff;
    border: 1px solid #d8dde6;
    color: #333333;
  }

  .interest-modal__action--octopod:hover {
    box-shadow: 0 0 3px 0 #d8dde6;
  }

  .interest-modal__action:hover {
    opacity: .85;
  }

  .interest-modal__action--cancel {
    background: #fff;
    border: 1px solid #d8dde6;
    color: #333333;
  }

  .interest-modal__action--cancel:hover {
    box-shadow: 0 0 3px 0 #d8dde6;
  }
</style>
