import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/index.scss';
// import { Button, Radio, Icon, Container, Header } from 'element-ui';
// @ts-ignore
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi);
// Vue.use(Button).use(Radio).use(Icon);
// Vue.use(Container).use(Header).use(Aside);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
