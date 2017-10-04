export default {

  success(component, message) {
    component.$root.$refs.toastr.s(message);
  },
};
