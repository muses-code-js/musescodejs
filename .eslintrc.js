module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },

  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  plugins: ['react'],
  rules: {},
};
