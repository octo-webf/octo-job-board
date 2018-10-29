/* eslint-disable no-console */
const scheduler = require('node-schedule');
const jobService = require('../../domain/services/job-service');
const config = require('../../config/index');

// Configure cron with https://github.com/node-schedule/node-schedule
scheduler.scheduleJob(config.OCTOPOD_CALL_FREQUENCY_CRON, () => {
  console.log('Synchronize jobs from Octopod...');

  return jobService.synchronizeJobs()
    .then(() => {
      console.log('Synchronization successful.');
    })
    .catch((err) => {
      console.error('Synchronization failed');
      console.error(err);
    });
});

// TODO find a way to test this (unit or integration) :-/
