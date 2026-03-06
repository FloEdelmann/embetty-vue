import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { transformSync } from 'esbuild';

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
            }
          }
        },
        minify: isBrowserMin ? 'esbuild' : false,
        cssCodeSplit: false,
        emptyOutDir: !isBrowserMin
      }
    };
  }

  return {
    plugins: [
      vue(),
      {
        name: 'generate-min-css',
        closeBundle() {
          try {
            const css = readFileSync('dist/embetty-vue.css', 'utf-8');
            const { code } = transformSync(css, { loader: 'css', minify: true });
            writeFileSync('dist/embetty-vue.min.css', code);
          } catch (e) {
            // CSS file may not exist in non-lib builds
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
          },
          assetFileNames(assetInfo) {
            if (assetInfo.name === 'style.css') {
              return 'embetty-vue.css';
            }
            return assetInfo.name;
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
