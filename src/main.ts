import Vue from 'vue';
import App from './App.vue';
import EmbettyVue from './plugin';

Vue.config.productionTip = false;

Vue.use(EmbettyVue, {
  serverUrl: 'http://localhost:3000'
});

new Vue({
  render(h) {
    return h(App);
  }
}).$mount('#app');
