<template>
  <div class="duration-picker">
    <select v-model="displayedDuration">
      <option value="anyDuration">Toutes les durées</option>
      <option value="shortDuration">Courte < 10 jours</option>
      <option value="mediumDuration">Moyenne 11-99 jours</option>
      <option value="longDuration">Longue > 100 jours</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'DurationPicker',

    data() {
      return {
        displayedDuration: 'anyDuration',
      };
    },

    watch: {
      displayedDuration(newChosenStatus) {
        this.$emit('selected', newChosenStatus);
      },
    },

  };
</script>

<style scoped>
  .job-results__form-group {
    display: inline-block;
    margin: 5px;
  }

  .duration-picker {
    display: flex;
    padding: 0px 10px;
  }

  .duration-picker select {
    padding: 9px 20px 9px 10px;
    font-family: Roboto;
    height: 40px;
    width: 220px;
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

