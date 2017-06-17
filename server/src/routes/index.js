const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.json({azerty: 'azertty'})
})

module.exports = router
