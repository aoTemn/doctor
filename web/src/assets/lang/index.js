import { createI18n } from 'vue-i18n';
import zh from './zh';
import en from './en';

import { useCommonStore } from '../../store/index';
import { createPinia } from 'pinia';
const pinia = createPinia();
const store = useCommonStore(pinia);
const messages = {
  zh,
  en,
};
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: store.lang,
  messages,
});
export default i18n;
