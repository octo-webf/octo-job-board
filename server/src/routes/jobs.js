const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const OctopodClient = require('../utils/octopod-client')

router.get('/', auth, (req, res, next) => {

  let projects
  let activities

  OctopodClient.getAccessToken()
    .then(OctopodClient.fetchProjectsToBeStaffed)
    .then((resultProjects) => {
      projects = resultProjects
      return projects
    })
    .then(OctopodClient.fetchActivitiesToBeStaffed)
    .then((resultActivities) => {
      activities = resultActivities
      return activities
    })
    .then(() => {
      res.send(activities)
    })
})

module.exports = router
