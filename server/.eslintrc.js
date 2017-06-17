module.exports = {
  'extends': 'standard',
  'plugins': [
    'standard',
    'promise'
  ],
  'rules': {
    'handle-callback-err': 0,
    'prefer-promise-reject-errors': 0
  },
  'env': {
    'node': true,
    'es6': true
  }
}
