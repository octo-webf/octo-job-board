<template>
  <div>
    <main class="page__body">
      <div class="page__container">

        <div class="job-results-panel">

          <section class="job-results job-results--delivery">
            <h1 class="job-results__title">Missions ({{ jobs.length }})</h1>
            <ul class="job-results__list">
              <li class="job-results__item job-card" v-for="job in jobs">
                <article class="job">
                  <header class="job__header">
                    <h2 class="job__title">{{ job.title }}</h2>
                    <span v-bind:class="['job__status job__status--'+job.status]"></span>
                  </header>
                  <a class="job__content" v-bind:href="job.octopod_link">
                    <p><span class="job__mission">{{ job.project_name }}</span></p>
                    <p class="job__client-wrapper">pour <span class="job__client">{{ job.customer_name }}</span></p>
                    <p>dès <span class="job__start-date">{{ job.start_date }}</span> sur <span
                      class="job__duration">{{ job.duration }}</span></p>
                    <p>à <span class="job__location">{{ job.location }}</span></p>
                  </a>
                  <footer class="job__footer">
                    <button class="job__apply-button">Je suis intéressé</button>
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
  export default {
  	name: 'job-list',
  	data() {

  		return {
  			jobs: [],
  		};

  	},
  	created() {

  		this.getJobs().then((response) => {

  			this.jobs = response.data;

  		});

  	},
  	methods: {
  		getJobs() {

  			return this.$http.get(`${process.env.API_URL}/jobs`);

  		},
  	},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
