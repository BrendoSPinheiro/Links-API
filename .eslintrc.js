module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    camelcase: 'off',
  },
};
