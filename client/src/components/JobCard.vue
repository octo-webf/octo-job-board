<template>
  <div class="job-card">
    <article class="job">
      <header class="job__header">
        <h2 class="job__title">{{ job.activity.title }}</h2>
        <span v-bind:class="['job__status job__status--'+job.project.status]"></span>
      </header>
      <a class="job__content" v-bind:href="'https://octopod.octo.com/projects/' + job.project.id">
        <p><span class="job__mission">{{ shortenMissionName }}</span></p>
        <p class="job__client-wrapper">pour <span class="job__client">{{ job.project.customer.name }}</span>
        </p>
        <p>dès <span class="job__start-date">{{ job.project.start_date }}</span> sur <span
          class="job__duration">{{ job.project.duration }}</span></p>
        <p>à <span class="job__locations">{{ job.project.locations }}</span></p>
      </a>
      <footer class="job__footer">
        <button class="job__apply-button" v-on:click="submitInterest(job)">Je suis intéressé</button>
      </footer>
    </article>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {

  	props: ['job'],

  	computed: {
  		shortenMissionName() {

  			return this.job.project.name.substring(0, 49);

  		},
  	},

  	methods: {

  		submitInterest() {

  			this.trackEvent();
  			this.sendInterest();

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

  			const job = this.job;
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

  			return axios.post(`${process.env.API_URL}/api/interests`, body);

  		},
  	},

  };

</script>

<style scoped>

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
    text-align: left;
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

  .job__locations {
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
