/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-unused-vars': 0,
    indent: ['off', 2],
    'vue/multi-word-component-names': 0,
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
      },
    ],
  },
};
