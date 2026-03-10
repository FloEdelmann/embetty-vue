import { PluginObject } from 'vue';
import { default as EmbettyTweet } from './components/EmbettyTweet.vue';
import { default as EmbettyVideo } from './components/EmbettyVideo.vue';
import { EmbettyVueOptions } from './types';
declare const EmbettyPlugin: PluginObject<EmbettyVueOptions>;
export default EmbettyPlugin;
export { EmbettyPlugin, EmbettyTweet, EmbettyVideo };
