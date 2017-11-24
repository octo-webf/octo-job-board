<template>
  <div class="job-header">
    <div class="job-results__filters-left">
      <div class="job-filters-left__wrapper filters_wrapper">
        <span class="job-filters-left__text">Disponible à partir du </span>
        <date-picker @selected="onSelectedAvailabilityDate"></date-picker>
      </div>
    </div>
    <div class="job-results__title-container">
      <h1 class="job-results__title">
        Missions à staffer ({{ jobsNumber }})
      </h1>
    </div>
    <div class="job-results__filters-right">
      <div class="job-filters-right__wrapper filters_wrapper">
        <span class="job-filters-right__text">Provenance des missions</span>
        <country-picker @selected="onSelectedCountry"></country-picker>
      </div>
    </div>
  </div>
</template>

<script>
  import CountryPicker from '@/components/CountryPicker';
  import DatePicker from '@/components/DatePicker';

  export default {

    name: 'JobHeader',

    props: ['jobsNumber'],

    components: {
      CountryPicker,
      DatePicker,
    },

    methods: {
      onSelectedAvailabilityDate(newChosenDate) {
        this.$emit('selectedDate', newChosenDate);
      },

      onSelectedCountry(newChosenCountry) {
        this.$emit('selectedCountry', newChosenCountry);
      },
    },
  };
</script>

<style scoped>
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

  @media only screen and (min-width: 1240px) {
    .job-header {
      min-width: 1240px;
    }
  }

  @media only screen and (min-width: 992px) {
    .job-header {
      min-width: 920px;
    }
  }

  @media only screen and (min-width: 640px) {
    .job-header {
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
