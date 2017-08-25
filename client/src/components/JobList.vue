<template>
  <div class="page page__jobs">
    <app-header/>
    <main class="page__body">
      <div class="page__container">
        <template v-if="isLoading">
          <circle-loader class="loading-spinner"></circle-loader>
        </template>
        <template v-else>
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
        </template>
      </div>
    </main>
  </div>
</template>

<script>
  import authenticationService from '@/services/authentication';
  import projectStatus from '@/utils/projectStatus';
  import jobsApi from '@/api/jobs';
  import AppHeader from '@/components/AppHeader';
  import JobCard from '@/components/JobCard';
  import Circle from 'vue-loading-spinner/src/components/Circle';

  export default {

    name: 'JobList',

    components: {
      AppHeader,
      JobCard,
      'circle-loader': Circle,
    },

    data() {
      return {
        jobs: [],
        isLoading: false,
      };
    },

    mounted() {
      this.getJobs();
    },

    methods: {

      getJobs() {
        this.isLoading = true;
        if (authenticationService.isAuthenticated()) {
          const accessToken = authenticationService.getAccessToken();
          jobsApi.fetchAll(accessToken)
            .then((jobs) => {
              this.jobs = this._sortJobsByProjectStatus(jobs);
            })
            .then(() => {
              this.isLoading = false;
            });
        }
      },

      _sortJobsByProjectStatus(jobs) {
        return projectStatus.sort(jobs);
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

  .page__container {
    max-width: 1240px;
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
    margin: 10px;
  }

  @media only screen and (min-width: 640px) {
    .job-results__list {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
</style>
