module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.common.js',
      },
    },
  },
  parser: 'babel-eslint',
  plugins: ['react', 'babel'],
  extends: ['prettier'],
};
