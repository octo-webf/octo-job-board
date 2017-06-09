var express = require('express')
var router = express.Router()
var activitiesFixtures = require('../fixtures/activities')

router.get('/', function (req, res, next) {
  res.json(activitiesFixtures)
})

module.exports = router
