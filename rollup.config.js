import vue from 'rollup-plugin-vue';
import svg from 'rollup-plugin-svg';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import * as CleanCSS from 'clean-css';
import { writeFileSync } from 'fs';

const vueOptions = {
  css: false,
  template: {
    compilerOptions: { whitespace: 'condense' }
  }
};

const babelBrowserOptions = {
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  presets: [
    ["@babel/preset-env", {
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ],
  extensions: ['.js', '.vue']
};

const babelBundlerOptions = {
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  presets: [
    ["@babel/preset-env", {
      ignoreBrowserslistConfig: true,
      targets: {
        node: '8'
      },
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ],
  extensions: ['.js', '.vue']
};

export default [
  // ESM build to be used with bundler
  {
    input: 'src/plugin.js',
    output: {
      format: 'esm',
      file: 'dist/embetty-vue.esm.js'
    },
    plugins: [
      css({
        output: false
      }),
      commonjs(),
      svg(),
      vue(vueOptions)
    ]
  },

  // CJS build to be used with bundler
  {
    input: 'src/plugin.js',
    output: {
      format: 'cjs',
      exports: 'named',
      file: 'dist/embetty-vue.common.js'
    },
    plugins: [
      css({
        output: false
      }),
      commonjs(),
      resolve(),
      svg(),
      vue(vueOptions),
      babel(babelBundlerOptions)
    ]
  },

  // Browser build
  {
    input: 'src/browser-wrapper.js',
    output: {
      format: 'iife',
      file: 'dist/embetty-vue.js'
    },
    plugins: [
      css(),
      commonjs(),
      resolve(),
      svg(),
      vue(vueOptions),
      babel(babelBrowserOptions)
    ]
  },

  // Minified browser build
  {
    input: 'src/browser-wrapper.js',
    output: {
      format: 'iife',
      file: 'dist/embetty-vue.min.js'
    },
    plugins: [
      css({
        output(styles) {
          const minified = new CleanCSS({}).minify(styles);
          writeFileSync('dist/embetty-vue.min.css', minified.styles);
        }
      }),
      commonjs(),
      resolve(),
      svg(),
      vue(vueOptions),
      babel(babelBrowserOptions),
      terser({
        mangle: false
      })
    ]
  }
];
