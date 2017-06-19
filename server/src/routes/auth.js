const express = require('express')
const router = express.Router()
const GoogleAuthWrapper = require('../infrastructure/google-auth')


function _getAccessTokenForGoogleAuth(req, res) {
  const idToken = req.body.idToken
  if (!idToken) {
    res.status(400).json({error: {}})
  }

  GoogleAuthWrapper.verifyIdToken(idToken)
    .then((userId) => {
      res.json({user: userId, accessToken: idToken})
    })
    .catch((err) => {
      res.status(401).json({error: {}})
    })
}

function _getAccessTokenForApplicationAuth(req, res) {
  const applicationCode = req.body.code
  if (!applicationCode) {
    res.status(400).json({error: 'No authorization code was provided!'})
  }
  res.json({access_token: 'toto'})

}

router.post('/token', (req, res) => {
  const grantType = req.body.grant_type
  if (grantType === 'authorization_code') {
    _getAccessTokenForApplicationAuth(req, res)
  } else {
    _getAccessTokenForGoogleAuth(req, res)
  }
})

module.exports = router
