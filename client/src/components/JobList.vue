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

    name: 'JobList',

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
            this.jobs = this._sortJobs(jobs);
          });
        }
      },

      _sortJobs(jobs) {
        return jobs.sort((job1, job2) => {
          if (job1.project.status === 'mission_signed') {
            return -1;
          }
          if (job2.project.status === 'mission_signed') {
            return 1;
          }
          if (job1.project.status === 'mission_accepted') {
            return -1;
          }
          if (job2.project.status === 'mission_accepted') {
            return 1;
          }
          if (job1.project.status === 'proposal_sent') {
            return -1;
          }
          if (job2.project.status === 'proposal_sent') {
            return 1;
          }
          if (job1.project.status === 'proposal_in_progress') {
            return -1;
          }
          if (job2.project.status === 'proposal_in_progress') {
            return 1;
          }
          return 0;
        });
      },
    },
  };
</script>

<style scoped>
  .page__body {
    display: flex;
    width: 100%;
    padding: 20px 0;
    margin-top: 60px;
    justify-content: center;
  }

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
