var express = require('express')
var router = express.Router()
var jobsFixtures = require('../fixtures/jobs')

router.get('/', function (req, res, next) {
  res.json(jobsFixtures)
})

module.exports = router
