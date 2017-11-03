import Vue from 'vue';
import Router from 'vue-router';
import JobList from '@/components/JobList';
import LoginPage from '@/components/LoginPage';
import UnsubscribePage from '@/components/UnsubscribePage';
import authenticationService from '@/services/authentication';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JobList',
      component: JobList,
      beforeEnter(to, from, next) {
        if (!authenticationService.isAuthenticated()) {
          next('/login');
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/unsubscribe',
      name: 'UnsubscribePage',
      component: UnsubscribePage,
      beforeEnter(to, from, next) {
        if (!authenticationService.isAuthenticated()) {
          next('/login');
        } else {
          next();
        }
      },
    },
  ],
});
