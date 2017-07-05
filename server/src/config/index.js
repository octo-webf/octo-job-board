require('dotenv').config()

/**
 * According to NPM dotenv library documentation, it is strongly recommanded to NOT HAVE multiple *.env files.
 *
 * @see {@link https://www.npmjs.com/package/dotenv#should-i-have-multiple-env-files}
 *
 * @returns {{GOOGLE_CLIENT_ID: (*|string), OCTOPOD_CLIENT_ID: (*|string), OCTOPOD_CLIENT_SECRET: (*|string)}}
 */
function config () {
  const APP_ENV = {

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

    MAILJET: {
      apiKey: process.env.MAILJET_PUBLIC_KEY,
      apiSecret: process.env.MAILJET_SECRET_KEY
    },

    OCTOPOD_API_URL: process.env.OCTOPOD_API_URL,
    OCTOPOD_CLIENT_ID: process.env.OCTOPOD_CLIENT_ID,
    OCTOPOD_CLIENT_SECRET: process.env.OCTOPOD_CLIENT_SECRET,

    AUTHORIZATION_ALGORITHM: process.env.AUTHORIZATION_ALGORITHM,
    AUTHORIZATION_PASSWORD: process.env.AUTHORIZATION_PASSWORD,
    AUTHORIZATION_CODES: process.env.AUTHORIZATION_CODES,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,

    MAIL_FROM: process.env.MAIL_FROM,
    MAIL_TO: process.env.MAIL_TO
  }

  if (process.env.NODE_ENV === 'test') {
    APP_ENV.GOOGLE_CLIENT_ID = 'google-client-id'
    APP_ENV.MAILJET = {
      apiKey: 'test-api-key',
      apiSecret: 'test-api-secret'
    }
    APP_ENV.OCTOPOD_API_URL = 'http://octopod.url/api'
    APP_ENV.OCTOPOD_CLIENT_ID = 'octopod-client-id'
    APP_ENV.OCTOPOD_CLIENT_SECRET = 'octopod-client-secret'
    APP_ENV.AUTHORIZATION_ALGORITHM = 'aes-128-ecb'
    APP_ENV.AUTHORIZATION_PASSWORD = 'authorization-password'
    APP_ENV.AUTHORIZATION_CODES = 'test/test_authorization_codes'
    APP_ENV.ACCESS_TOKEN_SECRET = 'access-token-password'
    APP_ENV.MAIL_FROM = 'jobboard+test@octo.com'
    APP_ENV.MAIL_TO = 'jobboard+test@octo.com'
  }

  return APP_ENV
}

module.exports = config()
