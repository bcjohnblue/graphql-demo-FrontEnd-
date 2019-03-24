import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import layout from '@/layout/Index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: 'home',
      component: layout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/Login.vue'),
          meta: {
            title: 'login'
          }
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            title: 'home'
          }
        }
      ]
    }
  ]
});
