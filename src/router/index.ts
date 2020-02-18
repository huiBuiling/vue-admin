import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

// RouteConfig 的类型定义
export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      icon: 'el-icon-s-home',
    },
    component: () => import(/* webpackChunkName: "home" */ '@/components/home/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      icon: 'el-icon-ice-cream-round',
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/chart',
    name: 'chart',
    meta: {
      icon: 'el-icon-odometer',
    },
    component: () => import(/* webpackChunkName: "chart" */ '@/components/chart/ChartView.vue'),
    children: [
      {
        path: '/chart/lineChart',
        name: 'lineChart',
        component: () => import(/* webpackChunkName: "lineChart" */ '@/components/chart/LineChart.vue'),
      },
      {
        path: '/chart/barChart',
        name: 'barChart',
        component: () => import(/* webpackChunkName: "barChart" */ '@/components/chart/BarChart.vue'),
      },
      {
        path: '/chart/pieChart',
        name: 'pieChart',
        component: () => import(/* webpackChunkName: "pieChart" */ '@/components/chart/PieChart.vue'),
      },
      {
        path: '/chat/comprehensiveChart',
        name: 'comprehensiveChart',
        component: () => import(/* webpackChunkName: "comprehensiveChart" */ '@/components/chart/comprehensive/ComprehensiveChart.vue'),
      },
    ],
  },
  {
    path: '/editor',
    name: 'editor',
    meta: {
      icon: 'el-icon-edit',
    },
    component: () => import(/* webpackChunkName: "editor" */ '@/components/editor/EditorView.vue'),
    children: [
      {
        path: '/editor/markDown',
        name: 'markDown',
        component: () => import(/* webpackChunkName: "markDown" */ '@/components/editor/MarkDown.vue'),
      },
      {
        path: '/editor/jsonEditor',
        name: 'jsonEditor',
        component: () => import(/* webpackChunkName: "jsonEditor" */ '@/components/editor/JsonEditor.vue'),
      },
      {
        path: '/editor/richTextEditor',
        name: 'richTextEditor',
        component: () => import(/* webpackChunkName: "richTextEditor" */ '@/components/editor/tinymce/Index.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
