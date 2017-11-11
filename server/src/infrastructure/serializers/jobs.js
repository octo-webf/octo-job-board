const JobsSerializer = {

  serialize(projects, activities) {
    return activities.map((octopodActivity) => {
      return {
        activity : {
          id: octopodActivity.id,
          title: octopodActivity.title,
          staffing_needed_from: octopodActivity.staffing_needed_from,
        },
        project : projects.find(p => p.id === octopodActivity.project.id)
      }
    });
  },
};

module.exports = JobsSerializer;
