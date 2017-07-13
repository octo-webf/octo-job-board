const JobsSerializer = {

  serialize(projects, activities) {
    const serializedJobs = [];

    activities.reduce((jobs, octopodActivity) => {
      const activity = {
        title: octopodActivity.title,
        staffing_needed_since: octopodActivity.staffing_needed_since,
      };
      const project = projects.find(p => p.id === octopodActivity.project.id);
      jobs.push({ project, activity });
      return jobs;
    }, serializedJobs);

    return serializedJobs;
  },
};

module.exports = JobsSerializer;
