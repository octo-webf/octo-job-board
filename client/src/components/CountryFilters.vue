<template>
  <div class="job-results__filters">

    <div class="job-results__form-group">
      <input type="radio" id="anyCountry" value="anyCountry" v-model="onlyOneCountry">
      <label for="anyCountry">
        En France et au-delà
      </label>
    </div>
    <div class="job-results__form-group">
      <input type="radio" id="onlyFrance" value="France" v-model="onlyOneCountry">
      <label for="onlyFrance">
        Uniquement en France
      </label>
    </div>

    <br>

    <div class="job-results__form-group">
      <input type="radio" id="onlyAustralia" value="Australia" v-model="onlyOneCountry">
      <label for="onlyAustralia">
        Uniquement en Australie
      </label>
    </div>
    <div class="job-results__form-group">
      <input type="radio" id="onlyMorocco" value="Maroc" v-model="onlyOneCountry">
      <label for="onlyMorocco">
        Uniquement au Maroc
      </label>
    </div>
    <div class="job-results__form-group">
      <input type="radio" id="onlySwitzerland" value="Suisse" v-model="onlyOneCountry">
      <label for="onlySwitzerland">
        Uniquement en Suisse
      </label>
    </div>

  </div>
</template>

<script>
  export default {

    name: 'CountryFilters',

    data() {
      return {
        onlyOneCountry: 'anyCountry',
      };
    },

    watch: {
      onlyOneCountry(newCountryFilter) {
        this.$emit('selectCountryFilter', newCountryFilter);
      },
    },

  };
</script>

<style scoped>
  .job-results__form-group {
    display: inline-block;
    margin: 5px;
  }

  input,
  label {
    cursor: pointer;
  }
</style>
