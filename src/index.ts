import { VueConstructor } from 'vue';

import EmbettyTweet from '@/components/EmbettyTweet.vue';
import EmbettyVideo from '@/components/EmbettyVideo.vue';
import { EmbettyVueOptions } from '@/interfaces/EmbettyVueOptions';

const Plugin = {
  install(Vue: VueConstructor, options: EmbettyVueOptions = {}) {
    Vue.component('embetty-tweet', EmbettyTweet);
    Vue.component('EmbettyTweet', EmbettyTweet);
    Vue.component('embetty-video', EmbettyVideo);
    Vue.component('EmbettyVideo', EmbettyVideo);
  }
};

// auto install
if (typeof window !== 'undefined' && window.hasOwnProperty('Vue')) {
  (window as any).Vue.use(Plugin.install);
}

export default Plugin;
export { EmbettyTweet };
export { EmbettyVideo };
export { EmbettyVueOptions };
export { EmbettyVideoTypes } from '@/enums/EmbettyVideoTypes';
