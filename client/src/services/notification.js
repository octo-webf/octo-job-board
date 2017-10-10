export default {

  success(component, message) {
    component.$root.$refs.toastr.s(message);
  },

  error(component, message) {
    component.$root.$refs.toastr.e(message);
  },

};
