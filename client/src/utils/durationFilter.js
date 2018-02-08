export default {
  filter(allJobs, duration) {
    switch (duration) {
      case 'shortDuration':
        return allJobs.filter(job => Number(job.project.mission_duration) <= 10);
      case 'mediumDuration':
        return allJobs.filter(job => Number(job.project.mission_duration) > 10 && Number(job.project.mission_duration) < 100);
      case 'longDuration':
        return allJobs.filter(job => Number(job.project.mission_duration) >= 100);
      default:
        return allJobs;
    }
  },
};
