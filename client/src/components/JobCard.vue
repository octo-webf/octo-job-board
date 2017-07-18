<template>
  <div class="job-card">
    <article class="job">
      <header class="job__header">
        <h2 class="job__title">{{ job.activity.title }}</h2>
        <span :class="statusClass">{{ status }}</span>
      </header>
      <a class="job__content" :href="octopodUrl">
        <p><span class="job__mission">{{ mission }}</span></p>
        <p class="job__customer-wrapper">pour <span class="job__customer">{{ job.project.customer.name }}</span>
        </p>
        <p>à partir de <span class="job__start-date">{{ staffingNeededSince }}</span></p>
        <p>à <span :class="locationsClasses">{{ locations }}</span></p>
      </a>
      <footer class="job__footer">
        <button class="job__apply-button" :disabled="isClicked" @click.prevent.once="submitInterest"
                title="Si vous cliquez sur ce bouton, un mail sera envoyé à l'équipe Job Board (uniquement !) avec les informations utiles pour aider au staffing.">
          Je suis intéressé·e <span class="sr-only">par cette mission {{ mission }} en tant que {{ job.activity.title
          }}</span>
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

      status() {
        const status = this.job.project.status;
        if (!status) {
          return 'propale';
        }
        return (status.startsWith('mission')) ? 'signé' : 'propale';
      },

      statusClass() {
        if (this.job.project.status) {
          return `job__status job__status--${this.job.project.status}`;
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
        const staffingNeededSince = new Date(this.job.activity.staffing_needed_from);
        return staffingNeededSince.toLocaleDateString('fr-FR', { day: 'numeric',month: 'long', year: 'numeric' });
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
    clip: rect(0, 0, 0, 0);
    border: 0;
    display: block;
  }

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

  /* used line 6*/
  .job__status {
    display: inline-block;
    border-radius: 3px;
    margin-left: 5px;
    text-transform: uppercase;
    padding: 5px 8px;
    color: white;
    font-size: 11px
  }

  /* not used*/
  .job__status--lead {
    background: orange;
  }

  /* not used*/
  .job__status--mission_signed {
    background: green;
  }

  /* not used*/
  .job__status--proposal_in_progress {
    background: #0000FF;
  }

  /* not used*/
  .job__status--proposal_sent {
    background: #6699FF;
  }

  /* not used*/
  .job__status--mission_accepted {
    background-color: #33CC00;
  }

  /* used line 6*/
  .job__status--propale {
    background: #6699FF;
  }

  /* used line 6*/
  .job__status--mission {
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
    color: #288653;
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

  .job__locations {
    color: #07c;
    font-weight: 500;
  }

  .job__locations--empty {
    color: #808080;
  }

  .job__footer {
    text-align: center;
    padding: 15px;
    border-top: 1px solid #e6e6e6;
  }

  .job__apply-button {
    text-transform: uppercase;
    color: #d14800;
    background: #ffffff;
    border: 1px solid #d14800;
    cursor: pointer;
    padding: 15px 30px;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .job__apply-button:hover {
    background: #d14800;
    color: #ffffff;
  }

  .job__apply-button:disabled,
  .job__apply-button:active {

    background: #BDBDBD;
    border-color: #616161;
    color: #FAFAFA;
    cursor: auto;
  }
</style>
