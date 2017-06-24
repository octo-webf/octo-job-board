const LRUCache = require('lru-cache')

const ONE_HOUR = 1000 * 60 * 60

// See https://github.com/isaacs/node-lru-cache for more options
const options = {
  max: 500,
  maxAge: ONE_HOUR
}

const cache = LRUCache(options)

module.exports = cache
