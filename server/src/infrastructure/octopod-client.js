const request = require('request');
const config = require('../config/index');
const { flattenDeep, uniqBy } = require('lodash');

const MAX_NUMBER_OF_PROJECTS_BY_OCTOPOD_PAGE = 100;

const OctopodClient = {

  getAccessToken() {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${config.OCTOPOD_API_URL}/oauth/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        form: {
          grant_type: 'client_credentials',
          client_id: config.OCTOPOD_CLIENT_ID,
          client_secret: config.OCTOPOD_CLIENT_SECRET,
        },
      };

      request.post(options, (err, response) => {
        if (err) {
          reject(err);
        }
        const accessToken = JSON.parse(response.body).access_token;
        resolve(accessToken);
      });
    });
  },

  async fetchProjectsToBeStaffed(accessToken, projects = [], page = 1) {
    const hasMoreProjectsOnOctopodApi = projects.length === MAX_NUMBER_OF_PROJECTS_BY_OCTOPOD_PAGE * (page - 1);
    if (hasMoreProjectsOnOctopodApi) {
      const moreProjects = await this.fetchProjectsToBeStaffedPerPage(accessToken, page);
      const allProjects = projects.concat(moreProjects);
      return this.fetchProjectsToBeStaffed(accessToken, allProjects, page + 1);
    }
    return projects;
  },

  fetchProjectsToBeStaffedPerPage(accessToken, page) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${config.OCTOPOD_API_URL}/v0/projects?staffing_needed=true&page=${page}&per_page=${MAX_NUMBER_OF_PROJECTS_BY_OCTOPOD_PAGE}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      request.get(options, (err, response) => {
        if (err) {
          reject(err);
        }
        const projects = JSON.parse(response.body);
        resolve(projects);
      });
    });
  },

  _fetchActivityToBeStaffed(accessToken, project) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${config.OCTOPOD_API_URL}/v0/projects/${project.id}/activities`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      request.get(options, (err, response) => {
        if (err) {
          reject(err);
        }
        const activities = JSON.parse(response.body);
        activities.map((activity) => {
          const activityWithPeopleStaffedOnProject = activity;
          activityWithPeopleStaffedOnProject.people = uniqBy(flattenDeep(activities.map(item => item.people)), 'id');
          return activityWithPeopleStaffedOnProject;
        });
        resolve(activities);
      });
    });
  },

  fetchActivitiesToBeStaffed(accessToken, projects) {
    const activitiesByProject = projects.map(project => this._fetchActivityToBeStaffed(accessToken, project));

    return Promise.all(activitiesByProject)
      .then((projectActivities) => {
        const concatenatedActivities = flattenDeep(projectActivities);
        return concatenatedActivities.filter(activity => !!activity.staffing_needed_from);
      });
  },

};

module.exports = OctopodClient;
