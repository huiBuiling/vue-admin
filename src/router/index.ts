import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

// RouteConfig 的类型定义
export const routes: RouteConfig[] = [
  /*{
    path: '/',
    name: 'index',
    component: () => import(/!* webpackChunkName: "home" *!/ '../views/Home.vue'),
    children: [
      {
        path: '/home2',
        name: 'home2',
        component: () => import(/!* webpackChunkName: "home" *!/ '../views/Home.vue'),
      },
      {
        path: '/about2',
        name: 'about2',
        component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue'),
        children: [
          {
            path: '/home3',
            name: 'home3',
            component: () => import(/!* webpackChunkName: "home" *!/ '../views/Home.vue'),
          },
          {
            path: '/about3',
            name: 'about3',
            component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue'),
          },
        ],
      },
    ]
  },*/
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
