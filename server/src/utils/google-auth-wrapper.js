const GoogleAuth = require('google-auth-library')

var CLIENT_ID = '1095728091059-hke1g2idu0vh3knb4uuk4872jb18d8vu.apps.googleusercontent.com';

const GoogleAuthWrapper = {

  verifyIdToken(idToken) {
    return new Promise((resolve, reject) => {
      const auth = new GoogleAuth;
      const client = new auth.OAuth2(CLIENT_ID, '', '');
      client.verifyIdToken(
        idToken,
        CLIENT_ID,
        (err, login) => {
          const payload = login.getPayload();
          const userId = payload['sub'];
          const domain = payload['hd'];

          if ('octo.com' !== domain) {
            reject(`User ${userId} does not belong to OCTO`)
          }
          resolve({userId, domain})
        });
    })
  }

}

module.exports = GoogleAuthWrapper
