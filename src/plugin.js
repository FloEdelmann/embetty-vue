import EmbettyTweet from './components/EmbettyTweet.vue';
import EmbettyVideo from './components/EmbettyVideo.vue';

var EmbettyPlugin = {
  /**
   * @param {!VueConstructor} Vue The global Vue object.
   * @param {?EmbettyVueOptions} options Options for embetty-vue.
   */
  install: function(Vue, options) {
    options = options || {};

    Vue.component('embetty-tweet', EmbettyTweet);
    Vue.component('embetty-video', EmbettyVideo);
    Vue.prototype._embettyVueOptions = options;
  }
};

export default EmbettyPlugin;
export { EmbettyPlugin, EmbettyTweet, EmbettyVideo };
