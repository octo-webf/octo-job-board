<template>
  <div class="status-picker">
    <select v-model="displayedStatus">
      <option value="anyStatus">Missions et Propales</option>
      <option value="missions">Missions uniquement</option>
      <option value="proposals">Propales uniquement</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'StatusPicker',

    data() {
      return {
        displayedStatus: 'anyStatus',
      };
    },

    watch: {
      displayedStatus(newChosenStatus) {
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

  .status-picker {
    display: flex;
    padding: 0px 10px;
  }

  .status-picker select {
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
