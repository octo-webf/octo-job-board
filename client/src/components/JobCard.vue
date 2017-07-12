<template>
  <div class="job-card">
    <article class="job">
      <header class="job__header">
        <h2 class="job__title">{{ job.activity.title }}</h2>
        <span :class="['job__status job__status--'+job.project.status]"></span>
      </header>
      <a class="job__content" :href="octopodUrl">
        <p><span class="job__mission">{{ mission }}</span></p>
        <p class="job__customer-wrapper">pour <span class="job__customer">{{ job.project.customer.name }}</span>
        </p>
        <p>à partir de <span class="job__start-date">{{ startDate }}</span></p>
        <p>à <span :class="locationsClasses">{{ locations }}</span></p>
      </a>
      <footer class="job__footer">
        <button class="job__apply-button" :disabled="isClicked" @click.prevent.once="submitInterest"
                title="Si vous cliquez sur ce bouton, un mail sera envoyé à l'équipe Job Board (uniquement !) avec les informations utiles pour aider au staffing.">
          Je suis intéressé·e <span class="sr-only">par cette mission {{ mission }} en tant que {{ job.activity.title }}</span>
        </button>
      </footer>
    </article>
  </div>
</template>

<script>

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

      octopodUrl() {
        const octopodProjectId = this.job.project.id;
        return `https://octopod.octo.com/projects/${octopodProjectId}`;
      },

      mission() {
        const missionName = this.job.project.name;
        return missionName.substring(0, 49);
      },

      startDate() {
        const startDate = new Date(this.job.project.start_date);
        return startDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
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
          this.displayToasterNotification();
          this.disableButton();
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
    clip: rect(0,0,0,0);
    border: 0;
    display: block;
  }

  /* Job
  /* ------------------- */

  .job {
    min-width: 260px;
    max-width: 260px;
    background: #ffffff;
    border-radius: 4px !important;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    border: 1px solid rgba(0, 0, 0, .09);
    display: flex;
    flex-direction: column;
    color: #535a60;
  }

  .job__header {
    border-bottom: 1px solid #e6e6e6;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }

  .job__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 17px;
    color: #07c;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  .job__status {
    display: inline-block;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    margin-left: 5px;
  }

  .job__status--lead {
    background: orange;
  }

  .job__status--mission-signed {
    background: green;
  }

  .job__status--proposal-in-progress {
    background: #0000FF;
  }

  .job__status--proposal-sent {
    background: #6699FF;
  }

  .job__status--mission-accepted {
    background-color: #33CC00;
  }

  .job__content {
    font-size: 15px;
    padding: 15px;
    height: 150px;
    text-decoration: none;
    display: block;
    color: #000;
    text-align: left;
  }

  .job__content > p {
    margin-top: 0;
  }

  .job__mission {
    color: #5fba7d;
    font-weight: 500;
  }

  .job__customer-wrapper {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .job__customer {
    color: #07c;
    font-weight: 500;
  }

  .job__start-date {
    color: #07c;
    font-weight: 500;
  }

  .job__duration {
    color: #5fba7d;
    font-weight: 700;
  }

  .job__locations {
    color: #07c;
    font-weight: 500;
  }

  .job__locations--empty {
    color: #9199a1;
  }

  .job__footer {
    text-align: center;
    padding: 15px;
    border-top: 1px solid #e6e6e6;
  }

  .job__apply-button {
    text-transform: uppercase;
    color: #F57C00;
    background: #ffffff;
    border: 1px solid #F48024;
    cursor: pointer;
    padding: 15px 30px;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
  }

  .job__apply-button:hover {
    background: #FFE0B2;
  }

  .job__apply-button:disabled,
  .job__apply-button:active {

    background: #BDBDBD;
    border-color: #616161;
    color: #FAFAFA;
    cursor: auto;
  }

  .job__alert-link {
    text-decoration: none;
    font-size: 12px;
    color: #9199a1;
  }

  .job__alert-link:hover {
    text-decoration: underline;
  }

</style>
