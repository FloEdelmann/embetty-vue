import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';

export default defineConfig(function({ mode }) {
  const isBrowser = mode === 'browser' || mode === 'browser-min';
  const isBrowserMin = mode === 'browser-min';

  if (isBrowser) {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: resolve(import.meta.dirname, 'src/browser-wrapper.js'),
          name: 'EmbettyVue',
          formats: ['iife'],
          fileName() {
            return isBrowserMin ? 'embetty-vue.browser.min.js' : 'embetty-vue.browser.js';
          }
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            },
            assetFileNames() {
              return isBrowserMin ? 'embetty-vue.min.css' : 'embetty-vue.css';
            }
          }
        },
        cssCodeSplit: false,
        cssMinify: isBrowserMin ? 'esbuild' : false,
        minify: isBrowserMin ? 'esbuild' : false,
        emptyOutDir: !isBrowserMin
      }
    };
  }

  return {
    plugins: [
      vue(),
      {
        name: 'no-css',
        generateBundle(options, bundle) {
          for (const key of Object.keys(bundle)) {
            if (key.endsWith('.css')) {
              delete bundle[key];
            }
          }
        }
      }
    ],
    build: {
      lib: {
        entry: resolve(import.meta.dirname, 'src/plugin.js'),
        name: 'EmbettyVue',
        formats: ['es', 'cjs'],
        fileName(format) {
          return format === 'es' ? 'embetty-vue.mjs' : 'embetty-vue.cjs';
        }
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue'
          }
        }
      },
      cssCodeSplit: false,
      minify: false,
      cssMinify: false,
      emptyOutDir: false
    }
  };
});
