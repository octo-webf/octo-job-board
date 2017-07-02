// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import VueModal from 'vue-js-modal';
import Toastr from 'vue-toastr';
import App from './App';
import router from './router';

Vue.component('vue-toastr', Toastr);
require('vue-toastr/dist/vue-toastr.css');

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: `${process.env.ANALYTICS_ID}`,
  router,
});

Vue.use(VueModal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<div><App/><vue-toastr ref="toastr"></vue-toastr></div>',
  components: { App },
  mounted() {
    this.$refs.toastr.defaultPosition = 'toast-bottom-right';
  },
});
