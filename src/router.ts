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
      redirect: 'product',
      component: layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            title: 'home'
          }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/Login.vue'),
          meta: {
            title: 'login'
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./views/Register.vue'),
          meta: {
            title: 'register'
          }
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('./views/Product.vue'),
          meta: {
            title: 'product'
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('./views/Cart.vue'),
          meta: {
            title: 'cart'
          }
        }
      ]
    }
  ]
});
