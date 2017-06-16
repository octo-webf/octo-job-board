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

  fetchProjectsWithStaffingNeeded(accessToken) {
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
  }

}

module.exports = OctopodClient
