module.exports = {
  extends: ['stylelint-config-prettier'],
  rules: {
    'at-rule-empty-line-before': 'always' | 'never',
    'at-rule-name-case': 'lower' | 'upper',
    'block-no-empty': true,
  },
};
