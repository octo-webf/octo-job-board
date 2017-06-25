// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import GSignInButton from 'vue-google-signin-button';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
	id: `${process.env.ANALYTICS_ID}`,
	router,
});

Vue.use(GSignInButton);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
});
