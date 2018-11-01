export default {
  filter(allJobs, kind) {
    switch (kind) {
      case 'costReimbursable' :
        return allJobs.filter(job => job.project.kind === 'cost_reimbursable');
      case 'fixedPrice' :
        return allJobs.filter(job => job.project.kind === 'fixed_price');
      default :
        return allJobs;
    }
  },
};
