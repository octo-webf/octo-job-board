const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000/"',
  CLIENT_ID: '"1095728091059-hke1g2idu0vh3knb4uuk4872jb18d8vu.apps.googleusercontent.com"',
  ANALYTICS_ID: '"UA-XXXXXXX-XX"',
})
