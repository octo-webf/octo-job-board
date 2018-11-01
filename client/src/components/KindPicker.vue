<template>
  <div class="kind-picker">
    <select v-model="displayedKind">
      <option value="anyKind">Forfait et Régie</option>
      <option value="fixedPrice">Forfait uniquement</option>
      <option value="costReimbursable">Régie uniquement</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'KindPicker',
    data() {
      return {
        displayedKind: 'anyKind',
      };
    },
    watch: {
      displayedKind(newChosenStatus) {
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

  .kind-picker {
    display: flex;
  }

  .kind-picker select {
    padding: 9px 20px 9px 0px;
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
