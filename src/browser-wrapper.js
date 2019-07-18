import { EmbettyPlugin } from './plugin.js';

// auto install
if (typeof window !== 'undefined' && window.hasOwnProperty('Vue')) {
  var baseUrlMeta = document.querySelector('meta[data-embetty-server]');

  /** @type EmbettyVueOptions */
  var embettyVueOptions = {
    serverUrl: baseUrlMeta !== null ? baseUrlMeta.getAttribute('data-embetty-server') : undefined
  };

  window.Vue.use(EmbettyPlugin, embettyVueOptions);
}
