const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const OctopodClient = require('../utils/octopod-client')

router.get('/', auth, (req, res, next) => {

  OctopodClient.getAccessToken()
    .then(OctopodClient.fetchProjectsWithStaffingNeeded)
    .then((projects) => {
    res.send(projects)
  })
})

module.exports = router
