const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000/api"',
  AUTH_URL: '"http://localhost:3000/auth/token"',
  CLIENT_ID: '"1095728091059-u6m5nusuq5mdqjb0ddlufgrd6fo7gn06.apps.googleusercontent.com"'
})
