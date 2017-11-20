export default {

  success(component, message) {
    component.$root.$refs.toastr.s(message);
  },

  successCenterToast(component, message) {
    component.$root.$refs.centerToastr.s({
      msg: message,
      position: 'toast-top-center',
      timeout: 3000,
      closeButton: true,
    });
  },

  error(component, message) {
    component.$root.$refs.toastr.e(message);
  },

};
