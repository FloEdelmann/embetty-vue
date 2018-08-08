import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import EmbettyVue from './install';

Vue.use(EmbettyVue, {
  serverUrl: 'http://localhost:3000'
});

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount('#app');
