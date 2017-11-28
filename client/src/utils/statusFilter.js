export default {
  filter(allJobs, status) {
    if (status === 'anyStatus') {
      return allJobs;
    }
    if (status === 'proposals') {
      return allJobs.filter(job => job.project.status === 'proposal_sent');
    }
    return allJobs.filter(job => job.project.status !== 'proposal_sent');
  },
};
