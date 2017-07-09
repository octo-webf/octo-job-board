<template>
  <div class="page page__jobs">
    <app-header/>

    <main class="page__body">
      <div class="page__container">

        <div class="job-results-panel">

          <section class="job-results job-results--delivery">
            <h1 class="job-results__title">Missions à staffer ({{ jobs.length }})</h1>
            <ul class="job-results__list">
              <li class="job-results__item" v-for="job in jobs">
                <job-card :job="job"></job-card>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

  import authenticationService from '@/services/authentication';
  import jobsApi from '@/api/jobs';
  import AppHeader from '@/components/AppHeader';
  import JobCard from '@/components/JobCard';

  export default {

  	name: 'job-list',

  	components: {
  		'app-header': AppHeader,
  		'job-card': JobCard,
  	},

  	data() {
  		return {
  			jobs: [],
  		};
  	},

  	mounted() {
  		this.getJobs();
  	},

  	methods: {

  		getJobs() {
  			if (authenticationService.isAuthenticated()) {
  				const accessToken = authenticationService.getAccessToken();

  				jobsApi.fetchAll(accessToken).then((jobs) => {
  					this.jobs = jobs;
  				});
  			}
  		},

  	},
  };
</script>

<style scoped>
  /* Job results
  /* ------------------- */

  .job-results {
    margin-bottom: 60px;
  }

  .job-results__title {
    font-weight: 300;
    font-size: 24px;
    margin: 0 0 15px;
  }

  .job-results__list {
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .job-results__item {
    list-style-type: none;
    padding: 0;
    margin: 5px;
  }

  @media only screen and (min-width: 640px) {
    .job-results__list {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

</style>
