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
              <div class="job-results__header">
                <h1 class="job-results__title">
                  Missions à staffer ({{ jobs.length }})
                </h1>
                <job-list-filters @selectCountryFilter="onSelectedCountryFilter"></job-list-filters>
              </div>
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
  import JobListFilters from '@/components/JobListFilters';
  import JobCard from '@/components/JobCard';
  import Circle from 'vue-loading-spinner/src/components/Circle';
  import countries from '@/utils/countries';

  export default {

    name: 'JobList',

    components: {
      AppHeader,
      JobListFilters,
      JobCard,
      'circle-loader': Circle,
    },

    data() {
      return {
        allJobs: [],
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
              this.allJobs = this._sortJobsByProjectStatus(jobs);
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

      onSelectedCountryFilter(selectedCountryFilter) {
        this.jobs = this._filterJobsByCountry(this.allJobs, selectedCountryFilter);
      },

      _filterJobsByCountry(allJobs, selectedCountryFilter) {
        if (selectedCountryFilter === 'anyCountry') {
          return allJobs;
        }
        if (selectedCountryFilter === 'France') {
          return allJobs.filter(job => countries.indexOf(job.project.customer.sector.name) === -1);
        }
        return allJobs.filter(job => job.project.customer.sector.name === selectedCountryFilter);
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
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .job-results__item {
    list-style-type: none;
    padding: 0;
    margin: 10px;
  }
</style>
