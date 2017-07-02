module.exports = {
  'extends': 'airbnb-base',
  'plugins': [
    'promise'
  ],
  'env': {
    'node': true,
    'es6': true
  },
  'settings': {
    'import/resolver': {
      'node' : true
    }
  },
  'rules': {
    'max-len': 0,
    'no-underscore-dangle': 0,
    'no-tabs': 2,
  }
}
