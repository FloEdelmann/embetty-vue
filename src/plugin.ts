import type { PluginObject } from 'vue';
import EmbettyTweet from './components/EmbettyTweet.vue';
import EmbettyVideo from './components/EmbettyVideo.vue';
import type { EmbettyVueOptions } from './types';

const EmbettyPlugin: PluginObject<EmbettyVueOptions> = {
  /**
   * @param Vue The global Vue object.
   * @param options Options for embetty-vue.
   */
  install(Vue, options: EmbettyVueOptions = {}) {
    Vue.component('EmbettyTweet', EmbettyTweet);
    Vue.component('EmbettyVideo', EmbettyVideo);
    Vue.prototype._embettyVueOptions = options;
  }
};

export default EmbettyPlugin;
export { EmbettyPlugin, EmbettyTweet, EmbettyVideo };
