const express = require('express')
const router = express.Router()
const jobsFixtures = require('../fixtures/jobs')
const auth = require('../middlewares/auth')

router.get('/', auth, function (req, res, next) {
  res.json(jobsFixtures)
})

module.exports = router
