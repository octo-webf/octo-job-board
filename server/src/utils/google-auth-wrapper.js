const GoogleAuth = require('google-auth-library')

var CLIENT_ID = '1095728091059-u6m5nusuq5mdqjb0ddlufgrd6fo7gn06.apps.googleusercontent.com';

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
          resolve({userId, domain})
        });
    })
  }

}

module.exports = GoogleAuthWrapper
