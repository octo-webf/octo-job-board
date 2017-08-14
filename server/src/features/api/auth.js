const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();
const GoogleAuthWrapper = require('../../infrastructure/google-auth');
const AuthorizationCodeValidator = require('../../infrastructure/authorization-code-validator');
const config = require('../../config');

function _generateJwtAccessToken(userId) {
  return jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET);
}

function _getAccessTokenForApplicationAuth(req, res) {
  const applicationCode = req.body.code;
  if (!applicationCode) {
    res.status(400).json({ error: 'No authorization code was provided!' });
  }
  AuthorizationCodeValidator.verifyApplicationCode(applicationCode)
    .then(() => {
      res.json({ access_token: _generateJwtAccessToken('app') });
    })
    .catch(() => {
      res.status(401).json({ error: 'Authorization code is invalid!' });
    });
}

function _getAccessTokenForGoogleAuth(req, res) {
  const idToken = req.body.idToken;
  if (!idToken) {
    res.status(400).json({ error: {} });
  }

  GoogleAuthWrapper.verifyIdToken(idToken)
    .then((userId) => {
      res.json({ access_token: _generateJwtAccessToken(userId) });
    })
    .catch(() => {
      res.status(401).json({ error: {} });
    });
}

router.post('/token', (req, res) => {
  const grantType = req.body.grant_type;
  if (grantType === 'authorization_code') {
    _getAccessTokenForApplicationAuth(req, res);
  } else {
    _getAccessTokenForGoogleAuth(req, res);
  }
});

module.exports = router;
