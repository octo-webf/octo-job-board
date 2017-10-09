<template>
  <div class="job-card">
    <article class="job">

      <a :href="octopodUrl" target="_blank" class="job__link">

        <div class="job__profile">
          <h2 class="job__title" :class="jobFlagClass">{{ job.activity.title }}</h2>
          <div class="job__country-logo" v-if="showCountryLogo">
            <span class="flag-icon" :class="countryFlagClass"></span>
          </div>
        </div>

        <hr class="job__separator">

        <div class="job__project">
          <div class="job__meta-title">Mission de <span class="job__nature">{{ job.project.nature }}</span> <span class="job__reference">#{{job.project.reference}}</span></div>
          <h3 class="job__customer">{{ job.project.customer.name }}</h3>
          <h4 class="job__mission">{{ mission }}</h4>
        </div>

        <hr class="job__separator">

        <div class="job__contacts">
          <div class="job__contact">Contact biz. : <span class="job__contact-nickname job__business-contact">{{ job.project.business_contact.nickname }}</span></div>
          <div class="job__contact" v-if="job.project.mission_director"> – Dir. mission : <span class="job__contact-nickname job__mission-director">{{ job.project.mission_director.nickname }}</span></div>
        </div>

      </a>

      <div class="job__context">
        <div class="job__meta">
          <div class="job__meta-title"><icon name="file-text-o"></icon>Statut</div>
          <div class="job__meta-value job__status" :class="statusClass">{{ status }}</div>
        </div>
        <div class="job__meta">
          <div class="job__meta-title" title="Date de début de mission"><icon name="calendar"></icon>Date</div>
          <div class="job__meta-value job__start-date">{{ staffingNeededSince }}</div>
        </div>
        <div class="job__meta">
          <div class="job__meta-title"><icon name="map-marker"></icon>Lieu</div>
          <div class="job__meta-value" :class="locationsClasses">{{ locations }}</div>
        </div>
      </div>
      <div class="job__footer">
        <button class="job__apply-button" @click="displayInterestModal"
                title="Si vous cliquez sur ce bouton, un mail sera envoyé à l'équipe Job Board (uniquement !) avec les informations utiles pour aider au staffing.">
          <icon name="heart-o"></icon> Ça m'intéresse <span class="sr-only">par cette mission {{ mission }} en tant que {{ job.activity.title}}</span>
        </button>
      </div>

    </article>
  </div>
</template>

<script>
  import moment from 'moment';
  import 'flag-icon-css/css/flag-icon.css';
  import countries from '@/utils/countries';

  export default {

    name: 'JobCard',

    props: ['job'],

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
        return moment(this.job.activity.staffing_needed_from).format('DD/MM/YY');
      },

      locations() {
        const locations = this.job.project.locations;
        if (!locations || locations.trim() === '') {
          return '––';
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

      countryFlagClass() {
        const countryName = this.job.project.customer.sector.name;
        if (countryName === 'Australia') {
          return 'flag-icon-au';
        }
        if (countryName === 'Maroc') {
          return 'flag-icon-ma';
        }
        if (countryName === 'Suisse') {
          return 'flag-icon-ch';
        }
        return 'flag-icon-fr';
      },

      showCountryLogo() {
        if (this.job.project.customer.sector) {
          return countries.indexOf(this.job.project.customer.sector.name) !== -1;
        }
        return false;
      },

      jobFlagClass() {
        return (this.showCountryLogo && this.job.activity.title.length < 20) ? 'job__title--with-flags' : '';
      },
    },

    methods: {

      displayInterestModal() {
        this.$emit('interest', this.job);
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

  .job__link {
    text-decoration: none;
  }

  .job__profile {
    padding: 15px 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    /*border-bottom: 1px solid #e6e6e6;*/
  }

  .job__title {
    flex: 1;
    font-size: 1.2rem;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #07c;
  }

  .job__country-logo {
    margin: 0 5px 0 10px;
  }

  .job__title--with-flags {
    padding-left: 26px;
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

  .job__project {
    padding: 15px 10px;
    height: 90px;
  }

  .job__mission {
    margin: 10px 0;
    font-size: 1rem;
    color: #2c3e50;
    font-weight: 400;
  }

  .job__customer {
    margin: 10px 0;
    font-size: 1rem;
    color: orangered;
    font-weight: 500;
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

  .job__context {
    display: flex;
    flex-direction: row;
    border-top: 1px solid #e6e6e6;
  }

  .job__meta {
    border-right: 1px solid #e6e6e6;
    padding: 10px;
    width: 100%;
    overflow: hidden;
  }

  .job__meta:last-child {
    border-right: none;
  }

  .job__meta-title {
    text-transform: uppercase;
    font-size: 0.7rem;
    color: #9199a1;
  }

  .job__meta-title > .fa-icon {
    margin-right: 3px;
    height: 0.7rem;
  }

  .job__meta-value {
    height: 50px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    text-overflow: ellipsis;
    font-size: 0.9rem;
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

  .job__start-date {
    font-weight: 500;
  }

  .job__footer {
    border-top: 1px solid rgba(0, 0, 0, .05) !important;
    background: #fafafa;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .job__apply-button {
    height: 40px;
    cursor: pointer;
    border: 1px solid #07c;
    background: transparent;
    color: #07c;
    vertical-align: middle;
    text-align: center;
    border-radius: 2px;
    touch-action: manipulation;
    transition: all .1s ease-in;
    padding: 5px 10px;
    font-size: 1rem;
    margin: 12px;
  }

  .job__apply-button:hover {
    color: #07c;
    background-color: #e6f4ff;
    border-color: #07c;
    border-width: 2px;
    box-sizing: border-box;
  }

  .job__apply-button > .fa-icon {
    vertical-align: middle;
    margin-right: 2px;
  }

</style>
