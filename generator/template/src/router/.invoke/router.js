import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export const routes = [{
    component: () => import('@/views/hello/index.vue'),
    name: 'hello',
    path: '/hello',
  },
  {
    path: '/',
    redirect: '/hello'
  },
  {
    component: () => import('@/views/vueListview/index.vue'),
    name: 'vueListview',
    path: '/vueListview',
  },
];
const router = new Router({
  mode: 'hash',
  routes,
});
export default router;
