module.exports = {
  root: true,
  extends: 'airbnb-base',
  rules: {
    'no-underscore-dangle': 0,
    'no-tabs': 2,
    'padded-blocks': [2, {
      'blocks': 'never',
      'classes': 'always',
      'switches': 'never'
    }],
    'no-console': 2,
    'max-len': 0,
  }
}
