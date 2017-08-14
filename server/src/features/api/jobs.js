const express = require('express');

const router = express.Router();
const auth = require('../../infrastructure/middlewares/auth');
const jobService = require('../../domain/services/job-service');

router.get('/', auth, (req, res) => {
  jobService
    .getJobs()
    .then((jobs) => {
      res.json(jobs);
    });
});

module.exports = router;
