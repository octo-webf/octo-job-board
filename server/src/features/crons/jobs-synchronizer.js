/* eslint-disable no-console */
const scheduler = require('node-schedule');
const jobService = require('../../domain/services/job-service');

const EVERY_15_MINUTES = '*/15 * * * *';

scheduler.scheduleJob(EVERY_15_MINUTES, () => {
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
