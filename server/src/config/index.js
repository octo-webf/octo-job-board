require('dotenv').config()

/**
 * According to NPM dotenv library documentation, it is strongly recommanded to NOT HAVE multiple *.env files.
 *
 * @see {@link https://www.npmjs.com/package/dotenv#should-i-have-multiple-env-files}
 *
 * @returns {{JWT_SECRET: (*|string), GOOGLE_CLIENT_ID: (*|string)}}
 */
function config() {

  const APP_ENV = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  }

  if ('test' === process.env.NODE_ENV) {
    APP_ENV.GOOGLE_CLIENT_ID = 'google-client-id'
  }

  return APP_ENV;
}

module.exports = config()
