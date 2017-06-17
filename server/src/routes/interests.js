const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const mailService = require('../utils/mail-service')

router.post('/', auth, function (req, res, next) {
  const interestedJobForm = req.body
  mailService.sendWelcomeEmail(interestedJobForm)
    .then(result => {
      console.log(result.body)
      res.status(201).json('Succès')
    })
    .catch(err => {
      console.error(err.statusCode)
      res.status(500).json({error: err})
    })
})

module.exports = router
