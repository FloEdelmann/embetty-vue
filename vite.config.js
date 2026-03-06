import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';

export default defineConfig(function({ mode }) {
  const isBrowser = mode === 'browser' || mode === 'browser-min';
  const isBrowserMin = mode === 'browser-min';

  return {
    plugins: [
      vue(),
      ...(!isBrowser ? [{
        name: 'no-css',
        generateBundle(options, bundle) {
          for (const key of Object.keys(bundle)) {
            if (key.endsWith('.css')) {
              delete bundle[key];
            }
          }
        }
      }] : [])
    ],
    build: {
      lib: {
        entry: resolve(import.meta.dirname, isBrowser ? 'src/browser-wrapper.js' : 'src/plugin.js'),
        name: 'EmbettyVue',
        formats: isBrowser ? ['iife'] : ['es', 'cjs'],
        fileName: isBrowser
          ? () => (isBrowserMin ? 'embetty-vue.browser.min.js' : 'embetty-vue.browser.js')
          : (format) => (format === 'es' ? 'embetty-vue.mjs' : 'embetty-vue.cjs')
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          ...(!isBrowser && { exports: 'named' }),
          globals: { vue: 'Vue' },
          ...(isBrowser && { assetFileNames: () => (isBrowserMin ? 'embetty-vue.min.css' : 'embetty-vue.css') })
        }
      },
      cssCodeSplit: false,
      cssMinify: isBrowserMin ? 'esbuild' : false,
      minify: isBrowserMin ? 'esbuild' : false,
      emptyOutDir: false
    }
  };
});
