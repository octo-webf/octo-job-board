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
    return Promise.resolve({ isInit: !oldJobs, hasChanges: false });
  }

  const addedJobs = differenceBy(freshJobs, oldJobs, 'activity.id');
  const removedJobs = differenceBy(oldJobs, freshJobs, 'activity.id');

  const hasChanges = (!isEmpty(addedJobs) || !isEmpty(removedJobs));

  return Promise.resolve({ isInit: false, addedJobs, removedJobs, hasChanges });
}

function _ifJobsChangesThenRetrieveJobsNotificationRecipients(report) {
  const result = report;
  if (result.hasChanges) {
    return Subscription.all().then((subscriptions) => {
      result.receivers = subscriptions.map(s => s.get('email'));
      return result;
    });
  }
  return Promise.resolve(result);
}

function _ifJobsChangedThenSendEmailToRecipients(report) {
  const result = report;
  if (result.hasChanges) {
    return mailService.sendJobsChangedEmail(result);
  }
  return Promise.resolve(result);
}

function getJobs() {
  const jobs = cache.get(CACHE_KEY);
  if (jobs) {
    return Promise.resolve(jobs);
  }
  return _fetchAndCacheJobs();
}

function synchronizeJobs() {
  const oldJobs = cache.get(CACHE_KEY);
  return _fetchAndCacheJobs()
    .then(fetchedJobs => _compareFetchedAndCachedJobs(fetchedJobs, oldJobs))
    .then(_ifJobsChangesThenRetrieveJobsNotificationRecipients)
    .then(_ifJobsChangedThenSendEmailToRecipients);
}

module.exports = {
  _fetchAndCacheJobs,
  _compareFetchedAndCachedJobs,
  getJobs,
  synchronizeJobs,
};
