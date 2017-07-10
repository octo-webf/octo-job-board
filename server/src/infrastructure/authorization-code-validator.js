const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');
const config = require('../config');

function _encryptCode(code) {
  const cipher = crypto.createCipher(config.AUTHORIZATION_ALGORITHM, config.AUTHORIZATION_PASSWORD);
  let crypted = cipher.update(code, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function _getAuthorizationCodesFromFile() {
  return new Promise((resolve) => {
    const inputFile = fs.createReadStream(config.AUTHORIZATION_CODES);
    const rl = readline.createInterface({
      input: inputFile,
    });
    const authorizedCodes = [];
    rl.on('line', (input) => {
      authorizedCodes.push(input);
    });
    rl.on('close', () => {
      resolve(authorizedCodes);
    });
  });
}

const AuthorizationCodeValidator = {

  verifyApplicationCode(code) {
    return new Promise((resolve, reject) => {
      _getAuthorizationCodesFromFile()
        .then((authorizedCodes) => {
          const cryptedCode = _encryptCode(code);
          if (authorizedCodes.includes(cryptedCode)) {
            resolve();
          } else {
            reject('Authorization code not found.');
          }
        })
        .catch(reject);
    });
  },
};

module.exports = AuthorizationCodeValidator;
