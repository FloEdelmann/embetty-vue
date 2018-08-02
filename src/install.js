import EmbettyTweet from '@/components/EmbettyTweet.vue';
import EmbettyVideo from '@/components/EmbettyVideo.vue';

const Plugin = {
  /**
   * @param {VueConstructor} Vue
   * @param {EmbettyVueOptions} options
   */
  install(Vue, options = {}) {
    Vue.component('embetty-tweet', EmbettyTweet);
    Vue.component('embetty-video', EmbettyVideo);
    Vue.prototype._embettyVueOptions = options;
  }
};

// auto install
if (typeof window !== 'undefined' && window.hasOwnProperty('Vue')) {
  const baseUrlMeta = document.querySelector('meta[data-embetty-server]');

  /** @type EmbettyVueOptions */
  const embettyVueOptions = {
    serverUrl: baseUrlMeta !== null ? baseUrlMeta.getAttribute('data-embetty-server') : undefined
  };

  window.Vue.use(Plugin, embettyVueOptions);
}

export default Plugin;
