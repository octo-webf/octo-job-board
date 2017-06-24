<template>
  <div class="page page__jobs">
    <header class="page__header">
      <div class="page__container page__header--container">
        <a class="logo-link" href="/">
          <span class="logo-link__job">Job</span>
          <span class="logo-link__board">Board</span>
        </a>
        <!--<a class="logout-link" href="/logout">Se déconnecter</a>-->
      </div>
    </header>

    <main class="page__body">
      <div class="page__container">

        <div class="job-results-panel">

          <section class="job-results job-results--delivery">
            <h1 class="job-results__title">Missions à staffer ({{ jobs.length }})</h1>
            <ul class="job-results__list">
              <li class="job-results__item" v-for="job in jobs">
                <job-card v-bind:job="job"></job-card>
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
  import JobCard from '@/components/JobCard';

  export default {

  	components: {
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

  				const accessToken = window.localStorage.access_token;

  				jobsApi.fetchAll(accessToken).then((jobs) => {

  					this.jobs = jobs;

  				});

  			}

  		},

  	},
  };
</script>

<style scoped>
  .page__container {
    min-width: 270px;
    max-width: 270px;
    margin: 0 auto;
  }

  /* App header
  /* ------------------- */

  .page__header {
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
    width: 100%;
    padding-left: 20px;
    position: fixed;
    top: 0;
  }

  .page__header--container {
    display: flex;
    justify-content: space-between;
  }

  .logo-link {
    text-decoration: none;
    font-size: 26px;
    font-weight: 900;
    display: inline-block;
    padding: 15px 0;
  }

  .logo-link__job {
    color: #07c;
  }

  .logo-link__board {
    color: #F48024;
  }

  .logout-link {
    color: #9199a1;
    display: inline-block;
    padding: 17px 0;
    line-height: 28px;
    text-decoration: none;
  }

  .logout-link:hover {
    text-decoration: underline;
  }

  .page__body {
    display: flex;
    width: 100%;
    padding: 20px 0;
    margin-top: 60px;
  }

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
    margin: -5px; /* set to cancel job-results__item#margin */
    display: flex;
    flex-wrap: wrap;
  }

  .job-results__item {
    list-style-type: none;
    padding: 0;
    margin: 5px;
  }

  /* tablet */
  @media only screen and (min-width : 768px) {
    .page__container {
      min-width: 540px;
      max-width: 540px;
    }
  }

  /* desktop */
  @media only screen and (min-width : 992px) {
    .page__container {
      min-width: 810px;
      max-width: 810px;
    }
  }
  /* desktop */
  @media only screen and (min-width : 1200px) {
    .page__container {
      min-width: 1080px;
      max-width: 1080px;
    }
  }

</style>
