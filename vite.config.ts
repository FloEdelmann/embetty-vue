import { resolve } from 'node:path';
import babelPresetEnv from '@babel/preset-env';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import vitePluginVue2 from '@vitejs/plugin-vue2';
import babelPresetMinify from 'babel-preset-minify';
import { defineConfig, type Plugin } from 'vite';

export default defineConfig(function({ mode }) {
  const isBrowserBuild = mode === 'browser' || mode === 'browser-min';
  const shouldMinify = mode === 'browser-min';
  const minSuffix = shouldMinify ? '.min' : '';

  return {
    plugins: [
      vitePluginVue2(),
      ...(isBrowserBuild ? [] : [{
        name: 'no-css',
        generateBundle(_options: unknown, bundle: Record<string, unknown>) {
          for (const key of Object.keys(bundle)) {
            if (key.endsWith('.css')) {
              delete bundle[key];
            }
          }
        }
      } satisfies Plugin])
    ],
    build: {
      lib: {
        entry: resolve(import.meta.dirname, isBrowserBuild ? 'src/browser-wrapper.ts' : 'src/plugin.ts'),
        name: 'EmbettyVue',
        formats: isBrowserBuild ? ['iife'] : ['es', 'cjs'],
        fileName: isBrowserBuild
          ? () => `embetty-vue.browser${minSuffix}.js`
          : (format) => (format === 'es' ? 'embetty-vue.mjs' : 'embetty-vue.cjs')
      },
      rollupOptions: {
        external: isBrowserBuild ? ['vue'] : ['vue', 'vue-ts-types'],
        output: {
          globals: {
            vue: 'Vue'
          },
          ...(
            isBrowserBuild
              ? {
                assetFileNames: () => `embetty-vue${minSuffix}.css`,
                plugins: [
                  getBabelOutputPlugin({
                    allowAllFormats: true,
                    presets: [
                      [babelPresetEnv, { targets: { ie: 11 } }],
                      ...(shouldMinify ? [babelPresetMinify] : [])
                    ]
                  })
                ]
              }
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
