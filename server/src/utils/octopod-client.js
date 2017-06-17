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

      request.post(options, (err, httpResponse) => {
        if (err) {
          reject(err)
        }
        resolve(httpResponse)
      })
    })
  },

  fetchProjectsToBeStaffed(accessToken) {
    return new Promise((resolve, reject) => {
      let options = {
        url: `${config.OCTOPOD_API_URL}/projects?staffing_needed=true&page=1&per_page=50`,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }

      request.get(options, (err, httpResponse) => {
        if (err) {
          reject(err)
        }
        resolve(httpResponse)
      })
    })
  },

  _fetchActivityToBeStaffed(accessToken, project) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${config.OCTOPOD_API_URL}/projects/${project.id}/activities`,
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      request.get(options, (err, httpResponse) => {
        if (err) {
          reject(err)
        }
        resolve(httpResponse)
      })
    })
  },

  fetchActivitiesToBeStaffed(accessToken, projects) {
    const activities = projects.reduce((promises, project) => {
      const activity = this._fetchActivityToBeStaffed(accessToken, project)
      promises.push(activity)
      return promises
    }, [])
    return Promise.all(activities)
  }

}

module.exports = OctopodClient
