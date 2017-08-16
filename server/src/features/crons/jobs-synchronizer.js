/* eslint-disable no-console */
const scheduler = require('node-schedule');
const jobService = require('../../domain/services/job-service');

const EVERY_15_MN = '*/15 * * * *';

scheduler.scheduleJob(EVERY_15_MN, () => {
  console.log('Synchronize jobs from Octopod...');

  return jobService.synchronizeJobs()
    .then(() => {
      console.log('Synchronization successfull.');
    })
    .catch((err) => {
      console.error('Synchronization failed');
      console.error(err);
    });
});

// TODO find a way to test this (unit or integration) :-/
