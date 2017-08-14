export default {

  sort(jobs) {
    return jobs.sort((job1, job2) => {
      const projectStatusOrder = [
        'mission_signed',
        'mission_accepted',
        'proposal_sent',
        'proposal_in_progress',
      ];

      const indexJob1 = projectStatusOrder.indexOf(job1.project.status);
      const indexJob2 = projectStatusOrder.indexOf(job2.project.status);

      if (indexJob1 === -1) return 1;
      if (indexJob2 === -1) return -1;
      if (indexJob1 === indexJob2) return 0;

      return indexJob1 < indexJob2 ? -1 : 1;
    });
  },

};
