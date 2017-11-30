<template>
  <div class="page page__jobs">
    <app-header/>
    <main class="page__body">
      <div class="page__container">
        <template v-if="isLoading">
          <circle-loader class="loading-spinner"></circle-loader>
        </template>
        <template v-else>
          <job-header :jobsNumber="displayedJobs.length"
                      @selectedCountry="onSelectedCountry"
                      @selectedDate="onSelectedAvailabilityDate"
                      @selectedMissionType="onSelectedMissionType"
                      @selectedStatus="onSelectedStatus">
          </job-header>
          <div class="job-results-panel">
            <section class="job-results job-results--delivery">
              <ul class="job-results__list">
                <li class="job-results__item" v-for="job in displayedJobs">
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
  import countryFilter from '@/utils/countryFilter';
  import missionTypeFilter from '@/utils/missionTypeFilter';
  import statusFilter from '@/utils/statusFilter';
  import jobsSorter from '@/utils/jobsSorter';
  import jobsApi from '@/api/jobs';
  import AppHeader from '@/components/AppHeader';
  import JobHeader from '@/components/JobHeader';
  import JobCard from '@/components/JobCard';
  import Circle from 'vue-loading-spinner/src/components/Circle';
  import InterestModal from '@/components/InterestModal';
  import moment from 'moment';

  export default {

    name: 'JobList',

    components: {
      AppHeader,
      JobCard,
      JobHeader,
      InterestModal,
      'circle-loader': Circle,
    },

    data() {
      return {
        jobsFromApi: [],
        isLoading: false,
        chosenJob: null,
        availabilityDate: moment(),
        country: 'anyCountry',
        missionType: ['Delivery', 'Consulting'],
        status: 'anyStatus',
      };
    },

    computed: {
      displayedJobs() {
        let filteredJobs = countryFilter.filter(this.jobsFromApi, this.country);
        filteredJobs = statusFilter.filter(filteredJobs, this.status);
        filteredJobs = missionTypeFilter.filter(filteredJobs, this.missionType);
        return jobsSorter.sort(filteredJobs, this.availabilityDate);
      },
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
              this.jobsFromApi = jobs;
              this.isLoading = false;
            });
        }
      },

      onSelectedAvailabilityDate(newChosenDate) {
        this.availabilityDate = newChosenDate;
      },

      onSelectedCountry(newChosenCountry) {
        this.country = newChosenCountry;
      },

      onSelectedMissionType(newChosenMissionType) {
        this.missionType = newChosenMissionType;
      },

      onSelectedStatus(newChosenStatus) {
        this.status = newChosenStatus;
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
