import Vue from 'vue';
import Router from 'vue-router';
import JobList from '@/components/JobList';
import LoginPage from '@/components/LoginPage';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'JobList',
			component: JobList,
		},
		{
			path: '/test-login-page',
			name: 'LoginPage',
			component: LoginPage,
		},
	],
});
