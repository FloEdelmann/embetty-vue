import eslintJs from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueEslintParser from 'vue-eslint-parser';

export default tseslint.config(
  {
    ignores: ['node_modules/', 'dist/', 'tests/']
  },
  eslintJs.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  ...tseslint.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    files: ['*.config.ts', '*.config.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'args': 'none' }],
      'semi': 'error',
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-template-curly-in-string': 'error',
      'vue/max-attributes-per-line': ['error', { 'singleline': 3 }],
      'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never'}],
      'vue/html-closing-bracket-spacing': 'error',
      'vue/prop-name-casing': 'error'
    }
  }
);
