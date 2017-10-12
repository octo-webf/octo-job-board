import moment from 'moment';

export default {

  _sortByDaysFromToday(jobs) {
    return jobs.sort((job1, job2) => {
      let daysFromToday1 = job1.daysFromToday >= 0 ? job1.daysFromToday : (job1.daysFromToday * -1) + 0.1;
      let daysFromToday2 = job2.daysFromToday >= 0 ? job2.daysFromToday : (job2.daysFromToday * -1) + 0.1;

      if(daysFromToday1 < daysFromToday2) {
        return -1;
      }
      if(daysFromToday1 > daysFromToday2) {
        return 1;
      }
      return 0;
    });
  },

  _setDaysFromToday(today, jobs) {
    jobs.forEach((job) => {
      const jobDate = moment(job.activity.staffing_needed_from, 'YYYY-MM-DD');
      job.daysFromToday = jobDate.diff(today, 'days');
    });
  },

  sort(today, jobs) {
    let jobsToBeSorted = jobs;
    this._setDaysFromToday(today, jobsToBeSorted);
    return this._sortByDaysFromToday(jobsToBeSorted);
  },

};
