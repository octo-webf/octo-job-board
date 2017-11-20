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
              <div class="job-results__top">
                <div class="job-results__filters-left">
                  <div class="job-filters-left__wrapper filters_wrapper">
                    <span class="job-filters-left__text">Disponible à partir du </span>
                    <date-picker @selected="onSelectedAvailabilityDate"></date-picker>
                  </div>
                </div>
                <div class="job-results__title-container">
                  <h1 class="job-results__title">
                    Missions à staffer ({{ displayedJobs.length }})
                  </h1>
                </div>
                <div class="job-results__filters-right">
                  <div class="job-filters-right__wrapper filters_wrapper">
                    <span class="job-filters-right__text">Provenance des missions</span>
                    <country-picker @selected="onSelectedCountry"></country-picker>
                  </div>
                </div>
              </div>
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
  import jobsSorter from '@/utils/jobsSorter';
  import jobsApi from '@/api/jobs';
  import AppHeader from '@/components/AppHeader';
  import CountryPicker from '@/components/CountryPicker';
  import DatePicker from '@/components/DatePicker';
  import JobCard from '@/components/JobCard';
  import Circle from 'vue-loading-spinner/src/components/Circle';
  import InterestModal from '@/components/InterestModal';
  import moment from 'moment';

  export default {

    name: 'JobList',

    components: {
      AppHeader,
      CountryPicker,
      DatePicker,
      JobCard,
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
      };
    },

    computed: {
      displayedJobs() {
        const countryJobs = countryFilter.filter(this.jobsFromApi, this.country);
        return jobsSorter.sort(countryJobs, this.availabilityDate);
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

  .job-results__filters-left, .job-results__filters-right {
    display: flex;
    justify-content: center;
  }

  .filters_wrapper {
    display: block;
    text-align: left;
  }

  .job-filters-left__text {
    padding-left: 10px;
  }

  .job-filters-right__text {
    padding-left: 15px;
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

  @media only screen and (min-width: 1240px) {
    .job-results__top {
      min-width: 1240px;
    }
  }

  @media only screen and (min-width: 992px) {
    .job-results__top {
      min-width: 920px;
    }
  }

  @media only screen and (min-width: 640px) {
    .job-results__top {
      display: flex;
      min-width: 640px;
    }

    .job-results__filters-left, .job-results__filters-right {
      width: 20%;
    }

    .job-results__title-container {
      width: 60%;
    }
  }
</style>
