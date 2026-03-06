import eslintJs from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginNoEs2015 from 'eslint-plugin-no-es2015';
import globals from 'globals';
import { fixupPluginRules } from '@eslint/compat';

// eslint-plugin-no-es2015 predates the meta.fixable requirement; patch it so ESLint v10 accepts it.
eslintPluginNoEs2015.rules['only-var'].meta = { fixable: 'code' };

export default [
  {
    ignores: ['node_modules/', 'dist/', 'tests/', 'vite.config.js'],
  },
  eslintJs.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    plugins: {
      'no-es2015': fixupPluginRules(eslintPluginNoEs2015),
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unused-vars': ['error', { 'args': 'none' }],
      'semi': 'error',
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-template-curly-in-string': 'error',
      'vue/max-attributes-per-line': ['error', { 'singleline': 3 }],
      'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never'}],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/prop-name-casing': 'error',

      // Don't use ES2015 at all, so we don't need a transpiler like Babel.
      // This reduces the bundle size dramatically.
      'no-es2015/no-object-computed-properties': 'error',
      'no-es2015/no-object-shorthand-properties': 'error',
      'no-es2015/no-object-shorthand-method': 'error',
      'no-es2015/only-var': 'error',
      'no-es2015/no-destructuring-assignment': 'error',
      'no-es2015/no-destructuring-params': 'error',
      'no-es2015/no-class': 'error',
      'no-es2015/no-default-params': 'error',
      'no-es2015/no-spread-element': 'error',
      'no-es2015/no-rest-params': 'error',
      'no-es2015/no-generator-function': 'error',
      'no-es2015/no-arrow-func': 'error',
      'no-es2015/no-for-of': 'error',
      'no-es2015/no-template-string': 'error',

      // using import is allowed, since webpack gets rid of it automatically
      'no-es2015/no-import': 'off',
    },
  },
];
