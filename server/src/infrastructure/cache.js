const LRUCache = require('lru-cache')

// See https://github.com/isaacs/node-lru-cache for more options
const options = {
  max: 500,
  maxAge: 1000 * 60 * 60
}

const cache = LRUCache(options)

module.exports = cache
