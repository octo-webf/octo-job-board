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
            <h1 class="job-results__title">Missions ({{ jobs.length }})</h1>
            <ul class="job-results__list">
              <li class="job-results__item job-card" v-for="job in jobs">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">{{ job.activity.title }}</h2>
                    <span v-bind:class="['job__status job__status--'+job.project.status]"></span>
                  </header>
                  <a class="job__content" v-bind:href="'https://octopod.octo.com/projects/' + job.project.id">
                    <p><span class="job__mission">{{ job.project.name }}</span></p>
                    <p class="job__client-wrapper">pour <span class="job__client">{{ job.project.customer.name }}</span>
                    </p>
                    <p>dès <span class="job__start-date">{{ job.project.start_date }}</span> sur <span
                        class="job__duration">{{ job.project.duration }}</span></p>
                    <p>à <span class="job__location">{{ job.project.location }}</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button" v-on:click="submitInterest(job)">Je suis intéressé</button>
                    <a class="job__alert-link" href="mailto:jobboard@octo.com">Signaler un problème</a>
                  </footer>
                </article>
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
  import axios from 'axios';

  export default {
  	name: 'job-list',

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

  		submitInterest(job) {

  			this.trackEvent();
  			this.sendInterest(job);
  
		},

  		trackEvent() {

  			this.$ga.event({
  				eventCategory: 'Job List',
  				eventAction: 'click',
  				eventLabel: 'I am interested',
  				eventValue: null,
  			});

  		},

  		sendInterest(job) {

  			const body = {
  				interestedJobForm: {
  					interestedNickname: 'PTR',
  					businessContactNickname: job.project.business_contact.nickname,
  					missionDirectorNickname: job.project.mission_director.nickname,
  					octopodLink: `https://octopod.octo.com/projects/${job.project.id}`,
  					activityName: job.activity.title,
  					missionName: job.project.name,
  				},
  			};

  			return axios.post(`${process.env.API_URL}/api/interests`, body)
          .catch(error => Promise.reject(error));

  		},
  	},
  };
</script>

<style scoped>
  .page__container {
    min-width: 1080px;
    max-width: 1080px;
    margin: 0 auto;
  }

  /* App header
  /* ------------------- */

  .page__header {
    height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #e6e6e6;
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
    height: 130px;
    text-decoration: none;
    display: block;
    color: #000;
  }

  .job__content > p {
    margin-top: 0;
  }

  .job__mission {
    color: #71a5cb;
  }

  .job__client-wrapper {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .job__client {
    color: #9199a1;
  }

  .job__start-date {
    color: #f98c71;
  }

  .job__duration {
    color: #5fba7d;
    font-weight: 700;
  }

  .job__location {
    color: #07c;
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

  .job__alert-link {
    text-decoration: none;
    font-size: 12px;
    color: #9199a1;
  }

  .job__alert-link:hover {
    text-decoration: underline;
  }
</style>
