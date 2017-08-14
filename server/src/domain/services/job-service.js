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

/**
 * - Fetch the jobs to be staffed from Octopod
 * - Update the cache
 * - Return the diff of jobs
 */
function synchronizeJobs() {
  return new Promise((resolve) => {
    const oldJobs = cache.get(CACHE_KEY);

    fetchAndCacheJobs()
      .then((freshJobs) => {
        if (!oldJobs) {
          return resolve({ isInit: true, jobs: freshJobs });
        }

        let addedJobs;
        let removedJobs;

        if (oldJobs && freshJobs) {
          addedJobs = freshJobs.reduce((accumulatedJobs, freshJob) => {
            const matchedJobs = oldJobs.filter(oldJob => oldJob.activity.id === freshJob.activity.id);
            if (matchedJobs.length === 0) {
              accumulatedJobs.push(freshJob);
            }
            return accumulatedJobs;
          }, []);

          removedJobs = oldJobs.reduce((accumulatedJobs, oldJob) => {
            const matchedJobs = freshJobs.filter(freshJob => oldJob.activity.id === freshJob.activity.id);
            if (matchedJobs.length === 0) {
              accumulatedJobs.push(oldJob);
            }
            return accumulatedJobs;
          }, []);
        }

        return resolve({ isInit: false, jobs: freshJobs, addedJobs, removedJobs });
      });
  });
}

module.exports = {
  fetchAndCacheJobs,
  getJobs,
  synchronizeJobs,
};
