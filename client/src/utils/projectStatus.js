// let projectStatus = new Map();
// projectStatus.set('mission_signed')
// projectStatus.set('mission_accepted')
// projectStatus.set('proposal_sent')
// projectStatus.set('proposal_in_progress')
// projectStatus.set('lead')

export default {

  sort(jobs) {
    return jobs.sort((job1, job2) => {
      if (job1.project.status === 'mission_signed') {
        return -1;
      }
      if (job2.project.status === 'mission_signed') {
        return 1;
      }
      if (job1.project.status === 'mission_accepted') {
        return -1;
      }
      if (job2.project.status === 'mission_accepted') {
        return 1;
      }
      if (job1.project.status === 'proposal_sent') {
        return -1;
      }
      if (job2.project.status === 'proposal_sent') {
        return 1;
      }
      if (job1.project.status === 'proposal_in_progress') {
        return -1;
      }
      if (job2.project.status === 'proposal_in_progress') {
        return 1;
      }
      return 0;
    });
  },

};
