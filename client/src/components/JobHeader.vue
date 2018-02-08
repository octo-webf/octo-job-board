<template>
  <div class="job-header">
    <div class="job-header__container">
      <div class="job-header__title">
        <h1 class="job-results__title">
          Jobs à staffer ({{ jobsNumber }})
        </h1>
      </div>
      <div class="job-header__filter-date">
        <div class="job-results__filters">
          <div class="filters_wrapper">
            <span class="job-filters-date__text">Disponible à partir du </span>
            <date-picker @selected="onSelectedAvailabilityDate"></date-picker>
          </div>
        </div>
      </div>
      <div class="job-header__filter-status">
        <div class="job-results__filters">
          <div class="filters_wrapper">
            <span class="job-filters-selector__text">Statut des missions</span>
            <status-picker @selected="onSelectedStatus"></status-picker>
          </div>
        </div>
      </div>
      <div class="job-header__filter-duration">
        <div class="job-results__filters">
          <div class="filters_wrapper">
            <span class="job-filters-selector__text">Durée des missions</span>
            <duration-picker @selected="onSelectedDuration"></duration-picker>
          </div>
        </div>
      </div>
      <div class="job-header__filter-type">
        <div class="job-results__filters">
          <div class="filters_wrapper">
            <span class="job-filters-selector__text">Type de missions</span>
            <mission-type-picker @selected="onSelectedMissionType"></mission-type-picker>
          </div>
        </div>
      </div>
      <div class="job-header__filter-country">
        <div class="job-results__filters">
          <div class="filters_wrapper">
            <span class="job-filters-selector__text">Provenance des missions</span>
            <country-picker @selected="onSelectedCountry"></country-picker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CountryPicker from '@/components/CountryPicker';
  import DatePicker from '@/components/DatePicker';
  import MissionTypePicker from '@/components/MissionTypePicker';
  import StatusPicker from '@/components/StatusPicker';
  import DurationPicker from './DurationPicker';

  export default {
    name: 'JobHeader',
    props: ['jobsNumber'],
    components: {
      DurationPicker,
      CountryPicker,
      DatePicker,
      MissionTypePicker,
      StatusPicker,
    },
    methods: {
      onSelectedAvailabilityDate(newChosenDate) {
        this.$emit('selectedDate', newChosenDate);
      },

      onSelectedCountry(newChosenCountry) {
        this.$emit('selectedCountry', newChosenCountry);
      },

      onSelectedMissionType(newChosenMissionType) {
        this.$emit('selectedMissionType', newChosenMissionType);
      },

      onSelectedStatus(newChosenStatus) {
        this.$emit('selectedStatus', newChosenStatus);
      },

      onSelectedDuration(newChosenStatus) {
        this.$emit('selectedDuration', newChosenStatus);
      },
    },
  };
</script>

<style scoped>
  .job-header__title {
    grid-area: title;
  }

  .job-header__filter-date {
    grid-area: date;
  }

  .job-header__filter-status {
    grid-area: status;
  }

  .job-header__filter-duration {
    grid-area: duration;
  }

  .job-header__filter-type {
    grid-area: type;
  }

  .job-header__filter-country {
    grid-area: country;
  }

  .job-results__title {
    font-weight: 300;
    font-size: 24px;
    margin: 0 0 15px;
  }

  .job-results__filters {
    display: flex;
    justify-content: center;
  }

  .filters_wrapper {
    display: block;
    text-align: left;
  }

  .job-filters-date__text {
    padding-left: 10px;
  }

  .job-filters-selector__text {
    padding-left: 15px;
  }

  @media only screen and (min-width: 640px) {
    .job-header__container {
      height: 170px;
      display: grid;
      width: 100%;
      grid-template-columns: 50% 50%;
      grid-template-areas: "title duration" "date country" "status type"
    }
  }

  @media only screen and (min-width: 992px) {
    .job-header__container {
      height: 130px;
      display: grid;
      width: 100%;
      grid-template-columns: 33% 34% 33%;
      grid-template-areas: "date title country" "status duration type"
    }
  }

  @media only screen and (min-width: 1240px) {
    .job-header__container {
      height: 80px;
      display: grid;
      width: 100%;
      grid-template-columns: repeat(6, 1fr);
      grid-template-areas: "date status title type country duration"
    }
  }
</style>
