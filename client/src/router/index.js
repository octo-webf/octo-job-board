import Vue from 'vue';
import Router from 'vue-router';
import JobList from '@/components/JobList';
import TestLoginPage from '@/components/TestLoginPage';

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
			name: 'TestLoginPage',
			component: TestLoginPage,
		},
	],
});
