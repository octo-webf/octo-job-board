import Vue from 'vue';
import Router from 'vue-router';
import JobList from '@/components/JobList';
import LoginPage from '@/components/LoginPage';

import auth from '@/services/auth';

Vue.use(Router);

const authorizationGuard = (to, from, next) => {

	if (!auth.getToken()) {

		next({
			path: '/login',
			query: { redirect: to.fullPath },
		});

	} else {

		next();

	}

};

const scrollBehavior = (to, from, savedPosition) => savedPosition || { x: 0, y: 0 };

export default new Router({
	routes: [
		{
			path: '/',
			name: 'JobList',
			component: JobList,
			beforeEnter: authorizationGuard,
		},
		{
			path: '/login',
			name: 'LoginPage',
			component: LoginPage,
		},
		{
			path: '*',
			redirect: '/',
		},
	],
	scrollBehavior,
});
