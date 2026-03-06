import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';
import { unlinkSync, existsSync } from 'fs';

export default defineConfig(function({ mode }) {
  const isProduction = mode === 'production';
  return {
    plugins: [
      vue(),
      {
        name: 'suppress-css-output',
        closeBundle() {
          // Delete the CSS temp file - the lib build already provides embetty-vue.css
          const tempCss = 'dist/embetty-vue.browser-temp.css';
          if (existsSync(tempCss)) {
            unlinkSync(tempCss);
          }
        }
      }
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
          },
          assetFileNames(assetInfo) {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'embetty-vue.browser-temp.css';
            }
            return assetInfo.name || '[name][extname]';
          }
        }
      },
      minify: isProduction ? 'esbuild' : false,
      cssCodeSplit: false,
      emptyOutDir: false
    }
  };
});
