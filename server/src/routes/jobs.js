const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const OctopodClient = require('../utils/octopod-client')
const JobsSerializer = require('../serializers/jobs')

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
    const jobs = JobsSerializer.serialize(projects, activities)
      res.send(jobs)
    })
})

module.exports = router
