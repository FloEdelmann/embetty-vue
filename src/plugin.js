import EmbettyTweet from './components/EmbettyTweet.vue';
import EmbettyVideo from './components/EmbettyVideo.vue';

const EmbettyPlugin = {
  /**
   * @param {!VueConstructor} Vue The global Vue object.
   * @param {?EmbettyVueOptions} options Options for embetty-vue.
   */
  install(Vue, options = {}) {
    Vue.component('EmbettyTweet', EmbettyTweet);
    Vue.component('EmbettyVideo', EmbettyVideo);
    Vue.prototype._embettyVueOptions = options;
  }
};

export default EmbettyPlugin;
export { EmbettyPlugin, EmbettyTweet, EmbettyVideo };
