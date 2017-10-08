const { isEmpty } = require('lodash');
const octopodClient = require('../../infrastructure/octopod');
const jobsSerializer = require('../../infrastructure/serializers/jobs');
const cache = require('../../infrastructure/cache');
const { Subscription } = require('../models');
const mailService = require('./mail-service'); // A service shoud not be dependent of another service but I have no idea to do better in this case... :-S

const CACHE_KEY = 'get_jobs';

function _fetchAndCacheJobs() {
  let accessToken;
  let projects;
  let activities;
  let jobs;

  return octopodClient.getAccessToken()
    .then((resultAccessToken) => {
      accessToken = resultAccessToken;
      return accessToken;
    })
    .then(() => octopodClient.fetchProjectsToBeStaffed(accessToken))
    .then((resultProjects) => {
      projects = resultProjects;
      return projects;
    })
    .then(() => octopodClient.fetchActivitiesToBeStaffed(accessToken, projects))
    .then((resultActivities) => {
      activities = resultActivities;
      return activities;
    })
    .then(() => {
      jobs = jobsSerializer.serialize(projects, activities);
      return jobs;
    })
    .then(() => {
      cache.set(CACHE_KEY, jobs);
      return jobs;
    });
}

function _compareFetchedAndCachedJobs(freshJobs, oldJobs) {
  if (!oldJobs) {
    return Promise.resolve({ isInit: true, hasChanges: false });
  }

  if (!freshJobs) {
    return Promise.resolve({ isInit: false, hasChanges: false });
  }

  const addedJobs = freshJobs.reduce((accumulatedJobs, freshJob) => {
    const matchedJobs = oldJobs.filter(oldJob => oldJob.activity.id === freshJob.activity.id);
    if (matchedJobs.length === 0) {
      accumulatedJobs.push(freshJob);
    }
    return accumulatedJobs;
  }, []);

  const removedJobs = oldJobs.reduce((accumulatedJobs, oldJob) => {
    const matchedJobs = freshJobs.filter(freshJob => oldJob.activity.id === freshJob.activity.id);
    if (matchedJobs.length === 0) {
      accumulatedJobs.push(oldJob);
    }
    return accumulatedJobs;
  }, []);

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
