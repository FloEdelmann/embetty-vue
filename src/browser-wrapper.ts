import type { EmbettyVueOptions } from './types';
import { EmbettyPlugin } from './plugin';

// auto install
if (typeof window !== 'undefined' && Object.prototype.hasOwnProperty.call(window, 'Vue')) {
  const baseUrlMeta = document.querySelector('meta[data-embetty-server]');

  const embettyVueOptions: EmbettyVueOptions = {
    serverUrl: baseUrlMeta !== null ? (baseUrlMeta.getAttribute('data-embetty-server') ?? undefined) : undefined
  };

  (window as Window & { Vue: { use: (plugin: typeof EmbettyPlugin, options: EmbettyVueOptions) => void } }).Vue.use(EmbettyPlugin, embettyVueOptions);
}
