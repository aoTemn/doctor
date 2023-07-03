import { createApp } from 'vue';
import { PiniaLogger } from 'pinia-logger';
import './style.css';
import App from './App.vue';

import router from './router/index';

import AntdPlugin from './plugins/antd';
import i18n from './assets/lang';
import { createPinia } from 'pinia';
import GoBack from './components/GoBack.vue';
import TabBar from './components/TabBar.vue';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import './assets/css/index.less';

const pinia = createPinia();
pinia.use(
  PiniaLogger({
    expanded: true,
  })
);
const app = createApp(App);
app.use(pinia);
app.component('TabBar', TabBar);
app.component('GoBack', GoBack);
app.use(router);
app.use(AntdPlugin);
app.use(i18n);
app.mount('#app');
