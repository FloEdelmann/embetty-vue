import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';

export default defineConfig(function({ mode }) {
  const isProduction = mode === 'production';
  return {
    plugins: [
      vue()
    ],
    build: {
      lib: {
        entry: resolve(import.meta.dirname, 'src/browser-wrapper.js'),
        name: 'EmbettyVue',
        formats: ['iife'],
        fileName() {
          return isProduction ? 'embetty-vue.browser.min.js' : 'embetty-vue.browser.js';
        }
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      },
      minify: isProduction ? 'esbuild' : false,
      cssCodeSplit: false,
      emptyOutDir: !isProduction
    }
  };
});
