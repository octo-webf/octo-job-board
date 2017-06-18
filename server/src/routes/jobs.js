const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const OctopodClient = require('../infrastructure/octopod')
const JobsSerializer = require('../serializers/jobs')

router.get('/', auth, (req, res, next) => {

  let accessToken
  let projects
  let activities

  OctopodClient.getAccessToken()
    .then((resultAccessToken) => {
      accessToken = resultAccessToken
      return accessToken
    })
    .then(() => OctopodClient.fetchProjectsToBeStaffed(accessToken))
    .then((resultProjects) => {
      projects = resultProjects
      return projects
    })
    .then(() => OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects))
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
