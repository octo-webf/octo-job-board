<template>
  <div class="country-picker">

    <select v-model="onlyOneCountry">
      <option value="anyCountry">En France et au-delà</option>
      <option value="France">Uniquement en France</option>
      <option value="Australia">Uniquement en Australie</option>
      <option value="Morocco">Uniquement au Maroc</option>
      <option value="Switzerland">Uniquement en Suisse</option>
    </select>

  </div>
</template>

<script>
  export default {
    name: 'CountryPicker',

    data() {
      return {
        onlyOneCountry: 'anyCountry',
      };
    },

    watch: {
      onlyOneCountry(newChosenCountry) {
        this.$emit('selected', newChosenCountry);
      },
    },

  };
</script>

<style scoped>
  .job-results__form-group {
    display: inline-block;
    margin: 5px;
  }

  .country-picker {
    display: flex;
    padding: 0px 10px;
  }

  .country-picker select {
    padding: 9px 20px 9px 10px;
    font-family: Roboto;
    height: 40px;
    width: 250px;
    font-size: 1.1em;
    background-color: #FFF;
  }

  input,
  label,
  select,
  option {
    cursor: pointer;
  }
</style>
