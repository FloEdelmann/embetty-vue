/// <reference types="vite/client" />

export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    _embettyVueOptions: import('./types').EmbettyVueOptions;
  }
}
