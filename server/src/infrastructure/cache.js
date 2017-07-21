const LRUCache = require('lru-cache');

const FIVE_MINUTES = 1000 * 60 * 5;

// See https://github.com/isaacs/node-lru-cache for more options
const options = {
  max: 500,
  maxAge: FIVE_MINUTES,
};

const cache = LRUCache(options);

module.exports = cache;
