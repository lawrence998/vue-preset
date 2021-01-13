/**
 *
 * @authors lawrence998
 * @description 定义路由模块
 */

import Vue, { AsyncComponent } from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

const loadView = (view: string): AsyncComponent => {
  return (resolve: any) => require([`@/views/${view}/index.vue`], resolve);
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'hello',
    component: loadView('hello'),
  },
  <%_ if (options['listview-framework'] === true) { _%>
  {
    path: '/vueListview',
    name: 'vueListview',
    component: loadView('vueListview'),
  },
  <%_ } _%>
  {
    path: '*',
    redirect: '/',
  }
];

export default new Router({
  mode: 'hash',
  routes,
});
