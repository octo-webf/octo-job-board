const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const mailService = require('../infrastructure/mail-service')

router.post('/', auth, (req, res) => {
  const interestedJobForm = req.body
  mailService.sendWelcomeEmail(interestedJobForm)
    .then(() => {
      res.status(201).json('Succès')
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
})

module.exports = router
