const request = require('request')
const config = require('../config')

const OctopodClient = {

  getAccessToken() {
    return new Promise((resolve, reject) => {
      let options = {
        url: `${config.OCTOPOD_API_URL}/oauth/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        form: {
          grant_type: 'client_credentials',
          client_id: config.OCTOPOD_CLIENT_ID,
          client_secret: config.OCTOPOD_CLIENT_SECRET
        }
      }

      request.post(options, (err, response) => {
        if (err) {
          reject(err)
        }
        const accessToken = JSON.parse(response.body).access_token
        resolve(accessToken)
      })
    })
  },

  fetchProjectsToBeStaffed(accessToken) {
    return new Promise((resolve, reject) => {
      let options = {
        url: `${config.OCTOPOD_API_URL}/v0/projects?staffing_needed=true&page=1&per_page=50`,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }

      request.get(options, (err, response) => {
        if (err) {
          reject(err)
        }
        const projects = JSON.parse(response.body)
        resolve(projects)
      })
    })
  },

  _fetchActivityToBeStaffed(accessToken, project) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${config.OCTOPOD_API_URL}/v0/projects/${project.id}/activities`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      request.get(options, (err, response) => {
        if (err) {
          reject(err)
        }
        const activities = JSON.parse(response.body)
        resolve(activities)
      })
    })
  },

  fetchActivitiesToBeStaffed(accessToken, projects) {
    const activitiesByProject = projects.reduce((promises, project) => {
      const activity = this._fetchActivityToBeStaffed(accessToken, project)
      promises.push(activity)
      return promises
    }, [])
    return Promise.all(activitiesByProject)
      .then((projectActivities) => {
        // https://stackoverflow.com/a/10865042/2120773
        const concatenatedActivities = [].concat.apply([], projectActivities)
        return Promise.resolve(concatenatedActivities)
      })
  }

}

module.exports = OctopodClient
