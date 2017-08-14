const scheduler = require('node-schedule');
const jobService = require('../../domain/services/job-service');

const EVERY_15_MN = '*/15 * * * *';

scheduler.scheduleJob(EVERY_15_MN, () => {
  // eslint-disable-next-line no-console
  console.log('Synchronize available jobs from Octopod.');
  jobService.synchronizeJobs();
});

// TODO find a way to test this (unit or integration) :-/
