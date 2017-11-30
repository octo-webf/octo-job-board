export default {
  filter(allJobs, status) {
    if (status === 'missions') {
      return allJobs.filter(job => job.project.status !== 'proposal_sent');
    }
    if (status === 'proposals') {
      return allJobs.filter(job => job.project.status === 'proposal_sent');
    }
    return allJobs;
  },
};
