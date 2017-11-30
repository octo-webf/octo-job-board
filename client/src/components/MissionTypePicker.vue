<template>
  <div class="mission-type-picker">
    <v-select multiple :value.sync="displayedMissionType" :options="options"></v-select>
  </div>
</template>

<script>
  import vSelect from 'vue-select';

  export default {
    name: 'MissionTypePicker',
    components: { vSelect },

    data() {
      return {
        displayedMissionType: ['Delivery', 'Consulting'],
        options: ['Delivery', 'Consulting', 'Training'],
      };
    },

    watch: {
      displayedMissionType(newChosenMissionType) {
        this.$emit('selected', newChosenMissionType);
      },
    },

  };
</script>

<style>
  .dropdown-toggle.clearfix {
    background-color: white;
  }

  .mission-type-picker {
    display: flex;
    padding: 0px 10px;
  }

  .mission-type-picker select {
    padding: 9px 20px 9px 10px;
    font-family: Roboto;
    height: 40px;
    width: 220px;
    font-size: 1.1em;
  }

  input,
  label,
  select,
  option {
    cursor: pointer;
  }
</style>
