import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

// RouteConfig 的类型定义
export const routes: RouteConfig[] = [
  {
    path: '/chart',
    name: 'chart',
    // meta: {
    //   title: 'chart',
    //   icon: 'chart'
    // },
    component: () => import(/* webpackChunkName: "chart" */ '@/components/chart/ChartView.vue'),
    children: [
      {
        path: '/chart/lineChart',
        name: 'lineChart',
        component: () => import(/* webpackChunkName: "lineChart" */ '@/components/chart/LineChart.vue'),
      },
      {
        path: '/chart/columnarChart',
        name: 'columnarChart',
        component: () => import(/* webpackChunkName: "lineChart" */ '@/components/chart/ColumnarChart.vue'),
      },
      {
        path: '/chart/pieChart',
        name: 'pieChart',
        component: () => import(/* webpackChunkName: "lineChart" */ '@/components/chart/PieChart.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/components/home/Home.vue'),
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
