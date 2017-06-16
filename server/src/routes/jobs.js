const express = require('express')
const router = express.Router()
const jobsFixtures = require('../fixtures/jobs')
const auth = require('../middlewares/auth')
const OctopodClient = require('../utils/octopod-client')

router.get('/', auth, function (req, res, next) {
  OctopodClient.fetchJobs().then((jobs) => {
    res.send(jobs)
  })
})

module.exports = router
