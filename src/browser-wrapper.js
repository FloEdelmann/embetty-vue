import { EmbettyPlugin } from './plugin.js';

// auto install
if (typeof window !== 'undefined' && Object.prototype.hasOwnProperty.call(window, 'Vue')) {
  const baseUrlMeta = document.querySelector('meta[data-embetty-server]');

  /** @type EmbettyVueOptions */
  const embettyVueOptions = {
    serverUrl: baseUrlMeta !== null ? baseUrlMeta.getAttribute('data-embetty-server') : undefined
  };

  window.Vue.use(EmbettyPlugin, embettyVueOptions);
}
