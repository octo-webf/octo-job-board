const cache = require('../infrastructure/cache')

const FIVE_MINUTES = 1000 * 60 * 5

const JobsScheduler = {

  run () {
    setInterval(() => {
      cache.del('get_jobs')
    }, FIVE_MINUTES)
  }

}

module.exports = JobsScheduler
