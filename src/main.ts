import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/index.scss';
// @ts-ignore
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from '@/lang';

Vue.use(ElementUi, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
