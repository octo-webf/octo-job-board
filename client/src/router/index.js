import Vue from 'vue';
import Router from 'vue-router';
import JobList from '@/components/JobList';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'JobList',
			component: JobList,
		},
	],
});
