<template>
  <div class="job-card">
    <article class="job">

<!--
      <div class="job__menu">
        <icon name="ellipsis-h"></icon>
      </div>
-->

      <a :href="octopodUrl" target="_blank" class="job__link">

        <div class="job__primary">
          <h2 class="job__title">{{ job.activity.title }}</h2>
        </div>

        <hr class="job__separator">

        <div class="job__secondary">
          <div class="job__meta-title">Mission de <span class="job__nature">{{ job.project.nature }}</span> <span class="job__reference">#{{job.project.reference}}</span></div>
          <h3 class="job__mission">{{ mission }}</h3>
          <h4 class="job__customer">{{ job.project.customer.name }}</h4>
        </div>

        <hr class="job__separator">

        <div class="job__contacts">
          <div class="job__contact">Resp. commercial : <span class="job__contact-nickname job__business-contact">{{ job.project.business_contact.nickname }}</span></div>
          <div class="job__contact" v-if="job.project.mission_director"> – Dir. mission : <span class="job__contact-nickname job__mission-director">{{ job.project.mission_director.nickname }}</span></div>
        </div>

      </a>

      <div class="job__tertiary">
        <div class="job__meta">
          <div class="job__meta-title">Statut</div>
          <div class="job__meta-value job__status" :class="statusClass">{{ status }}</div>
        </div>
        <div class="job__meta">
          <div class="job__meta-title">Date</div>
          <div class="job__meta-value job__start-date">{{ staffingNeededSince }}</div>
        </div>
        <div class="job__meta">
          <div class="job__meta-title">Lieu(x)</div>
          <div class="job__meta-value job__locations">{{ locations }}</div>
        </div>
      </div>
      <div class="job__footer">
        <button class="job__apply-button" :disabled="isClicked" @click.prevent.once="submitInterest"
                title="Si vous cliquez sur ce bouton, un mail sera envoyé à l'équipe Job Board (uniquement !) avec les informations utiles pour aider au staffing.">
          <icon name="star-o"></icon> Ça m'intéresse <span class="sr-only">par cette mission {{ mission }} en tant que {{ job.activity.title}}</span>
        </button>
      </div>

    </article>
  </div>
</template>

<script>
  import moment from 'moment';
  import interestsApi from '@/api/interests';
  import authenticationService from '@/services/authentication';

  export default {

    name: 'JobCard',

    props: ['job'],

    data() {
      return {
        isClicked: false,
      };
    },

    computed: {

      status() {
        const status = this.job.project.status;
        if (!status) {
          return 'propale';
        }
        return (status.startsWith('mission')) ? 'signé' : 'propale';
      },

      statusClass() {
        if (this.job.project.status) {
          return `job__status--${this.job.project.status}`;
        }
        return '';
      },

      octopodUrl() {
        const octopodProjectId = this.job.project.id;
        return `https://octopod.octo.com/projects/${octopodProjectId}`;
      },

      mission() {
        const missionName = this.job.project.name;
        return missionName.substring(0, 49);
      },

      staffingNeededSince() {
        return moment(this.job.activity.staffing_needed_from).format('D MMM YYYY');
      },

      locations() {
        const locations = this.job.project.locations;
        if (!locations || locations.trim() === '') {
          return 'non renseigné';
        }
        return locations;
      },

      locationsClasses() {
        const classes = ['job__locations'];

        const locations = this.job.project.locations;
        if (!locations || locations.trim() === '') {
          classes.push('job__locations--empty');
        }
        return classes;
      },

    },

    methods: {

      submitInterest() {
        this.sendInterest().then(() => {
          this.disableButton();
          this.displayToasterNotification();
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
        const consultant = authenticationService.getAuthenticatedUser();
        const accessToken = authenticationService.getAccessToken();
        return interestsApi.sendInterest(this.job, consultant, accessToken);
      },

      disableButton() {
        this.isClicked = true;
      },

      displayToasterNotification() {
        const mission = this.mission;
        const message = `Votre intérêt pour la mission "${mission}" a été pris en compte.`;
        this.$root.$refs.toastr.s(message);
      },

    },

  };
</script>

<style scoped>

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    display: block;
  }

  .job {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 290px;
    background: #fff;
    padding: 0;
    border: none;
    border-radius: .28571429rem;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    transition: box-shadow .1s ease, transform .1s ease, -webkit-transform .1s ease;
  }

  .jpb__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0 10px;
  }

  .job__menu {
    position: absolute;
    top: 10px;
    right: 15px;
    border-radius: 50%;
    padding: 5px 8px;
    cursor: pointer;
    border: 1px solid #e6e6e6;
    color: #9199a1;
  }

  .job__menu:hover {
    background: #fafafa;
    color: #2c3e50;
  }

  .job__menu > .fa-icon {
    vertical-align: middle;
  }

  .job__link {
    text-decoration: none;
  }

  .job__primary {
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /*border-bottom: 1px solid #e6e6e6;*/
  }

  .job__title {
    font-size: 1.2rem;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #2c3e50;
    color: #07c;
  }

  .job__link:hover .job__title {
    text-decoration: underline;
  }

  .job__separator {
    width: 15px;
    border: 1px solid;
    color: #e6e6e6;
    margin: 0 auto;
  }

  .job__secondary {
    padding: 15px 10px;
    height: 90px;
  }

  .job__mission {
    margin: 10px 0;
    font-size: 1rem;
    color: #f98c71;
  }

  .job__reference {
  }

  .job__customer {
    margin: 10px 0;
    font-size: 1rem;
    font-weight: 400;
    /*color: #5fba7d;*/
    color: #2c3e50;

  }

  .job__contacts {
    font-size: 0.8rem;
    padding: 15px;
    color: #2c3e50;
  }

  .job__contact {
    display: inline;
  }

  .job__contact-nickname {
    font-weight: 600;
  }

  .job__tertiary {
    display: flex;
    flex-direction: row;
    border-top: 1px solid #e6e6e6;
  }

  .job__meta {
    border-right: 1px solid #e6e6e6;
    padding: 10px;
    width: 100%;
  }

  .job__meta:last-child {
    border-right: none;
  }

  .job__meta-title {
    text-transform: uppercase;
    font-size: 0.7rem;
    color: #9199a1;
  }

  .job__meta-value {
    height: 50px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    text-overflow: ellipsis;
  }

  .job__status {
    text-align: left;
    padding-left: 15px;
    color: green;
    text-transform: capitalize;
  }

  .job__status--propale {
    color: #6699FF;
  }

  .job__status--mission {
    color: #33CC00;
  }

  .job__status--propale {
    color: #6699FF;
  }

  .job__status--mission {
    color: #33CC00;
  }

  .job__status--proposal_sent,
  .job__status--proposal_in_progress {
    color: #6699FF;
  }

  .job__nature {
  }

  .job__footer {
    height: 58px;
    max-height: 58px;
    border-top: 1px solid rgba(0, 0, 0, .05) !important;
    background: #fafafa;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .job__apply-button {
    height: 40px;
    cursor: pointer;
    border: 1px solid #0095ff;
    background: transparent;
    color: #07c;
    vertical-align: middle;
    text-align: center;
    border-radius: 2px;
    touch-action: manipulation;
    transition: all .1s ease-in;
    padding: 5px 10px;
    font-size: 1rem;
    margin: 0 15px;
  }

  .job__apply-button:hover {
    /*text-decoration: underline;*/
    color: #005999;
    background-color: #e6f4ff;
    border-color: #07c;
  }

  .job__apply-button > .fa-icon {
    vertical-align: middle;
  }

</style>
