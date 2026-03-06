import { resolve } from 'node:path';
import { transformSync } from '@babel/core';
import presetEnv from '@babel/preset-env';
import vitePluginVue2 from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';

export default defineConfig(function({ mode }) {
  const isBrowserBuild = mode === 'browser' || mode === 'browser-min';
  const shouldMinify = mode === 'browser-min';
  const minSuffix = shouldMinify ? '.min' : '';

  return {
    plugins: [
      vitePluginVue2(),
      ...(isBrowserBuild ? [
        {
          name: 'babel-es5',
          renderChunk(code) {
            const result = transformSync(code, {
              presets: [[presetEnv, { targets: { ie: 11 } }]],
              sourceType: 'script',
              babelrc: false,
              configFile: false,
              compact: false
            });
            if (!result) {
              throw new Error('Babel transformSync returned null');
            }
            return { code: result.code, map: result.map };
          }
        }
      ] : [
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
      ])
    ],
    build: {
      lib: {
        entry: resolve(import.meta.dirname, isBrowserBuild ? 'src/browser-wrapper.js' : 'src/plugin.js'),
        name: 'EmbettyVue',
        formats: isBrowserBuild ? ['iife'] : ['es', 'cjs'],
        fileName: isBrowserBuild
          ? () => `embetty-vue.browser${minSuffix}.js`
          : (format) => (format === 'es' ? 'embetty-vue.mjs' : 'embetty-vue.cjs')
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          },
          ...(
            isBrowserBuild
              ? { assetFileNames: () => `embetty-vue${minSuffix}.css` }
              : { exports: 'named' }
          )
        }
      },
      cssCodeSplit: false,
      cssMinify: shouldMinify ? 'esbuild' : false,
      minify: shouldMinify ? 'esbuild' : false,
      emptyOutDir: false
    }
  };
});
