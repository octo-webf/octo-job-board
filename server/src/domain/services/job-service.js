const { isEmpty, differenceBy } = require('lodash');
const octopodClient = require('../../infrastructure/octopod');
const jobsSerializer = require('../../infrastructure/serializers/jobs');
const cache = require('../../infrastructure/cache');
const { Subscription } = require('../models');
const mailService = require('./mail-service'); // A service should not be dependent of another service but I have no idea to do better in this case... :-S

const CACHE_KEY = 'get_jobs';

async function _fetchAndCacheJobs() {
  const accessToken = await octopodClient.getAccessToken();
  const projects = await octopodClient.fetchProjectsToBeStaffed(accessToken);
  const activities = await octopodClient.fetchActivitiesToBeStaffed(accessToken, projects);
  const jobs = await jobsSerializer.serialize(projects, activities);
  cache.set(CACHE_KEY, jobs);

  return jobs;
}

function _compareFetchedAndCachedJobs(freshJobs, oldJobs) {
  if (!oldJobs || !freshJobs) {
    return Promise.resolve({ isInit: !oldJobs, hasNewJobs: false });
  }

  const addedJobs = differenceBy(freshJobs, oldJobs, 'activity.id');
  const hasNewJobs = !isEmpty(addedJobs);

  return Promise.resolve({ isInit: false, addedJobs, hasNewJobs });
}

async function _ifJobsAddedThenRetrieveJobsNotificationRecipients(report) {
  if (report.hasNewJobs) {
    const subscriptions = await Subscription.all();
    return { ...report, receivers: subscriptions.map(s => s.get('email')) };
  }
  return report;
}

function _ifJobsAddedThenSendEmailToRecipients(report) {
  return report.hasNewJobs ? mailService.sendJobsAddedEmail(report) : report;
}

function getJobs() {
  const jobs = cache.get(CACHE_KEY);
  return jobs ? Promise.resolve(jobs) : _fetchAndCacheJobs();
}

function synchronizeJobs() {
  const oldJobs = cache.get(CACHE_KEY);
  return _fetchAndCacheJobs()
    .then(fetchedJobs => _compareFetchedAndCachedJobs(fetchedJobs, oldJobs))
    .then(_ifJobsAddedThenRetrieveJobsNotificationRecipients)
    .then(_ifJobsAddedThenSendEmailToRecipients);
}

module.exports = {
  _fetchAndCacheJobs,
  _compareFetchedAndCachedJobs,
  getJobs,
  synchronizeJobs,
};
