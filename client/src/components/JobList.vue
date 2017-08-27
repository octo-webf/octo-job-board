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
                  Missions à staffer ({{ displayJobs.length }})
                </h1>
                <country-filters @selectCountryFilter="onSelectedCountryFilter"></country-filters>
              </div>
              <ul class="job-results__list">
                <li class="job-results__item" v-for="job in displayJobs">
                  <job-card v-on:interest="displayInterestModal" :job="job"></job-card>
                </li>
              </ul>
            </section>
          </div>
        </template>
      </div>
    </main>
    <interest-modal :interestingJob="chosenJob"></interest-modal>
  </div>
</template>

<script>
  import authenticationService from '@/services/authentication';
  import projectStatus from '@/utils/projectStatus';
  import jobsApi from '@/api/jobs';
  import AppHeader from '@/components/AppHeader';
  import CountryFilters from '@/components/CountryFilters';
  import JobCard from '@/components/JobCard';
  import Circle from 'vue-loading-spinner/src/components/Circle';
  import countries from '@/utils/countries';
  import InterestModal from '@/components/InterestModal';

  export default {

    name: 'JobList',

    components: {
      AppHeader,
      CountryFilters,
      JobCard,
      InterestModal,
      'circle-loader': Circle,
    },

    data() {
      return {
        jobsFromApi: [],
        displayJobs: [],
        isLoading: false,
        chosenJob: null,
      };
    },

    mounted() {
      this.getJobs();
    },

    methods: {

      displayInterestModal(job) {
        this.chosenJob = job;
        this.$modal.show('interest-modal');
      },

      getJobs() {
        this.isLoading = true;
        if (authenticationService.isAuthenticated()) {
          const accessToken = authenticationService.getAccessToken();
          jobsApi.fetchAll(accessToken)
            .then((jobs) => {
              this.jobsFromApi = this._sortJobsByProjectStatus(jobs);
              this.displayJobs = this.jobsFromApi;
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
        this.displayJobs = this._filterJobsByCountry(this.jobsFromApi, selectedCountryFilter);
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
