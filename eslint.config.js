import eslintJs from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'tests/', 'vite.config.js', 'eslint.config.js'],
  },
  eslintJs.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
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
      'vue/prop-name-casing': 'error'
    },
  },
];
