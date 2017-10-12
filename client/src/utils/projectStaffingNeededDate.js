import moment from 'moment';

export default {

<<<<<<< HEAD
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
=======
  _toggleSignAndAddOneDay(counter) {
    return counter > 0 ? counter * -1 : (counter * -1) + 1;
>>>>>>> 4b6e8205da565c96e6ed9a770bd46493f443e1b3
  },

  sort(today, jobs) {
    let jobsToBeSorted = jobs;
<<<<<<< HEAD
    this._setDaysFromToday(today, jobsToBeSorted);
    return this._sortByDaysFromToday(jobsToBeSorted);
=======
    const jobsSorted = [];
    let counterNDays = 0;

    while (jobsToBeSorted.length) {
      const jobsToKeepForNextIteration = [];
      const jobPlusMinusDay = today.clone().add(counterNDays, 'day');

      jobsToBeSorted.forEach((job) => {
        const jobDate = moment(job.activity.staffing_needed_from, 'YYYY-MM-DD');

        if (jobDate.isSame(jobPlusMinusDay, 'day')) {
          jobsSorted.push(job);
        } else {
          jobsToKeepForNextIteration.push(job);
        }
      });

      counterNDays = this._toggleSignAndAddOneDay(counterNDays);
      jobsToBeSorted = jobsToKeepForNextIteration;
    }

    return jobsSorted;
>>>>>>> 4b6e8205da565c96e6ed9a770bd46493f443e1b3
  },

};
