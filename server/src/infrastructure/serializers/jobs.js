const JobsSerializer = {

  serialize (projects, activities) {
    const jobs = []

    activities.reduce((jobs, octopodActivity) => {
      const activity = {title: octopodActivity.title}
      const project = projects.find((project) => project.id === octopodActivity.project.id)
      jobs.push({project, activity})
      return jobs
    }, jobs)

    return jobs
  }
}

module.exports = JobsSerializer
