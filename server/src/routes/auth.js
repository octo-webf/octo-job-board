const express = require('express')
const router = express.Router()
const GoogleAuthWrapper = require('../infrastructure/google-auth')

router.post('/token', function (req, res, next) {
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
})

module.exports = router
