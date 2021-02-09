module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "linebreak-style": [0, "error", "windows"],
    "no-underscore-dangle": "off",
    "global-require": "off",
    "no-param-reassign": "off",
    "camelcase": 'off',
  }
};
