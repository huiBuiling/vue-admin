import Vue from 'vue';
import VueI18n from 'vue-i18n';

// element-ui lang
import elEnLocale from 'element-ui/lib/locale/lang/en.js';
import elZhLocale from 'element-ui/lib/locale/lang/zh-CN.js';
// import elEsLocale from 'element-ui/lib/locale/lang/es';
// import eltJaLocale from 'element-ui/lib/locale/lang/ja';

import en from './en';
import zh from './zh';

Vue.use(VueI18n);

const messages: any = {
  en: {
    ...en,
    ...elEnLocale,
  },
  zh: {
    ...zh,
    ...elZhLocale,
  },
};

// 初始获取当前语言
const curLocale = () => {
  // Default language is zh
  return 'zh';
};

const i18n = new VueI18n({ 
   locale: curLocale(), // 定义默认语言为中文
   messages,
});

export default i18n;
