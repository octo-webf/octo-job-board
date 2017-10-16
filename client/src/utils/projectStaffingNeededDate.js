import moment from 'moment';

function _sortByDaysFromToday(jobs) {
  return jobs.sort((job1, job2) => {

    if (Math.abs(job1.daysFromToday) < Math.abs(job2.daysFromToday)) {
      return -1;
    }
    if (Math.abs(job1.daysFromToday) > Math.abs(job2.daysFromToday)) {
      return 1;
    }
    if (job1.daysFromToday < job2.daysFromToday) {
      return 1;
    }
    return 0;
  });
}

function _setDaysFromToday(today, jobs) {
  jobs.map((job) => {
    const jobWithDaysFromToday = job;
    const jobDate = moment(job.activity.staffing_needed_from, 'YYYY-MM-DD');
    jobWithDaysFromToday.daysFromToday = jobDate.diff(today, 'days');
    return jobWithDaysFromToday;
  });
}

export default {
  sort(today, jobs) {
    const jobsToBeSorted = jobs;
    _setDaysFromToday(today, jobsToBeSorted);
    return _sortByDaysFromToday(jobsToBeSorted);
  },
};
