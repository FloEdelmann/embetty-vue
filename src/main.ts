import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import EmbettyVue from './index';

Vue.use(EmbettyVue, {
  serverUrl: 'http://localhost:3000'
});

new Vue({
  render: (h) => h(App)
}).$mount('#app');
