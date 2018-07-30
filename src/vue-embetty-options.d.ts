import Vue from 'vue';

import { EmbettyVueOptions } from '@/interfaces/EmbettyVueOptions';

declare module 'vue/types/vue' {
  interface VueConstructor {
    _embettyVueOptions: EmbettyVueOptions
  }
}
