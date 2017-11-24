<template>
  <div class="date">
    <datepicker
        :format="'d MMMM yyyy'"
        :full-month-name="true"
        language="fr"
        class="date-picker"
        input-class="date-picker__input"
        :monday-first="true"
        v-model="date"
    ></datepicker>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';

  export default {
    name: 'DatePicker',
    components: { Datepicker },
    data() {
      return {
        date: Date(moment()),
      };
    },

    watch: {
      date(newChosenDate) {
        this.$emit('selected', moment(newChosenDate));
      },
    },

  };
</script>

<style>
  .date-picker {
    text-align: center;
  }
  .date-picker__input {
    -webkit-appearance: menulist;
    padding: 9px 20px 9px 10px;
    font-family: Roboto;
    height: 40px;
    width: 220px;
    border-radius: 5px;
    font-size: 1.1em;
    background-color: #FFF;
  }
</style>
