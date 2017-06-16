const request = require('request')
const GoogleAuth = require('google-auth-library')
const config = require('../config')

const OctopodClient = {

  getAccessToken() {
    return new Promise((resolve, reject) => {
      let options = {
        url: 'https://octopod.octo.com/api/oauth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        form: {
          grant_type: 'client_credentials',
          client_id: 'abc1234',
          client_secret: 'def5678'
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
        url: 'https://octopod.octo.com/api/oauth/token',
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
