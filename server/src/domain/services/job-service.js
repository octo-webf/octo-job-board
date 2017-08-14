const octopodClient = require('../../infrastructure/octopod');
const jobsSerializer = require('../../infrastructure/serializers/jobs');
const cache = require('../../infrastructure/cache');

const CACHE_KEY = 'get_jobs';

function fetchAndCacheJobs() {
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

function getJobs() {
  const jobs = cache.get(CACHE_KEY);
  if (jobs) {
    return Promise.resolve(jobs);
  }
  return fetchAndCacheJobs();
}

module.exports = {
  fetchAndCacheJobs,
  getJobs
};
