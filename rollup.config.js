import vue from 'rollup-plugin-vue';
import svg from 'rollup-plugin-svg';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';

import * as CleanCSS from 'clean-css';
import { writeFileSync } from 'fs';

const vueOptions = {
  css: false,
  template: {
    compilerOptions: { whitespace: 'condense' },
  },
};

export default [
  // Minified ESM browser build
  {
    input: 'src/browser-wrapper.js',
    output: {
      format: 'iife',
      file: 'dist/embetty-vue.browser.min.js',
    },
    plugins: [
      css({
        output(styles) {
          const minified = new CleanCSS({}).minify(styles);
          writeFileSync('dist/embetty-vue.css', styles);
          writeFileSync('dist/embetty-vue.min.css', minified.styles);
        },
      }),
      svg(),
      vue({ ...vueOptions }),
      terser({ mangle: false }),
    ],
  },

  // ESM browser build
  {
    input: 'src/browser-wrapper.js',
    output: {
      format: 'iife',
      file: 'dist/embetty-vue.browser.js',
    },
    plugins: [
      css({ output: false }),
      svg(),
      vue({ ...vueOptions }),
    ],
  },

  // ESM bundler build
  {
    input: 'src/plugin.js',
    output: {
      format: 'esm',
      file: 'dist/embetty-vue.mjs',
    },
    plugins: [
      css({ output: false }),
      svg(),
      vue({ ...vueOptions }),
    ],
  },

  // CommonJS bundler build
  {
    input: 'src/plugin.js',
    output: {
      format: 'cjs',
      file: 'dist/embetty-vue.cjs',
      exports: 'named',
    },
    plugins: [
      css({ output: false }),
      svg(),
      vue({ ...vueOptions }),
    ],
  },
];
