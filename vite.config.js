import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import CleanCSS from 'clean-css';

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'generate-min-css',
      closeBundle() {
        try {
          const css = readFileSync('dist/embetty-vue.css', 'utf-8');
          const minified = new CleanCSS({}).minify(css);
          writeFileSync('dist/embetty-vue.min.css', minified.styles);
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
    cssMinify: false
  }
});
