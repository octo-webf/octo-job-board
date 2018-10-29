const JobsSerializer = {

  serialize(projects, activities) {
    return activities.map(octopodActivity => ({
      activity: {
        id: octopodActivity.id,
        title: octopodActivity.title,
        staffing_needed_from: octopodActivity.staffing_needed_from,
        people_staffed_on_project: octopodActivity.people,
      },
      project: projects.find(p => p.id === octopodActivity.project.id),
    }));
  },
};

module.exports = JobsSerializer;
