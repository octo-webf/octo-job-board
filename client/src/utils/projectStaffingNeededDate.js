import moment from 'moment';

function _sortChronologically(jobs) {
  return jobs.sort((job1, job2) => {
    if (job1.activity.staffing_needed_from < job2.activity.staffing_needed_from) {
      return -1;
    }
    if (job1.activity.staffing_needed_from > job2.activity.staffing_needed_from) {
      return 1;
    }
    return 0;
  });
}

function _filterOldJobs(jobs, availabilityDate) {
  return jobs.filter((job) => {
    const jobDate = moment(job.activity.staffing_needed_from, 'YYYY-MM-DD');
    return jobDate.isAfter(availabilityDate);
  });
}

export default {
  sortAll(jobs) {
    return _sortChronologically(jobs);
  },
  sortAfter(jobs, availabilityDate) {
    const filteredJobs = _filterOldJobs(jobs, availabilityDate);
    return _sortChronologically(filteredJobs);
  },
};
