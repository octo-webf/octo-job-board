// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueResource from 'vue-resource';
import store from './vuex';
import App from './App';
import router from './router';

Vue.use(VueResource);
Vue.config.productionTip = false;
sync(store, router);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	router,
	store,
	...App,
});
