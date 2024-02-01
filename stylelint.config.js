module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'no-empty-source': null,
    'no-descending-specificity': null,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-colon-newline-after': null,
    indentation: 2,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'else',
          'for',
          'each',
          'include',
          'mixin',
          'content',
          'at-root',
        ],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
}
