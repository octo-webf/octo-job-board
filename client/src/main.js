// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import VueModal from 'vue-js-modal';
import Toastr from 'vue-toastr';
import Icon from 'vue-awesome/components/Icon';
import moment from 'moment';
import 'vue-awesome/icons';
import App from './App';
import router from './router';

moment.locale('fr');

Vue.component('vue-toastr', Toastr);
require('vue-toastr/dist/vue-toastr.css');

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: `${process.env.ANALYTICS_ID}`,
  router,
});

Vue.use(VueModal);

Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<div><div class="center-toastr-container"><vue-toastr ref="centerToastr"></vue-toastr></div><App/><vue-toastr ref="toastr"></vue-toastr></div>',
  components: { App },
  mounted() {
    this.$refs.toastr.defaultPosition = 'toast-bottom-right';
    this.$refs.toastr.defaultTimeout = 3000;
  },
});
