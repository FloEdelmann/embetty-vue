import EmbettyTweet from '@/components/EmbettyTweet.vue';
import EmbettyVideo from '@/components/EmbettyVideo.vue';

var Plugin = {
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

// auto install
if (typeof window !== 'undefined' && window.hasOwnProperty('Vue')) {
  var baseUrlMeta = document.querySelector('meta[data-embetty-server]');

  /** @type EmbettyVueOptions */
  var embettyVueOptions = {
    serverUrl: baseUrlMeta !== null ? baseUrlMeta.getAttribute('data-embetty-server') : undefined
  };

  window.Vue.use(Plugin, embettyVueOptions);
}

export default Plugin;
