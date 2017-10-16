import moment from 'moment';


function _getArrayOfIdsWithDaysFromToday(jobs) {
  const today = moment();
  return jobs.map((job) => {
    const jobDate = moment(job.activity.staffing_needed_from, 'YYYY-MM-DD');
    const daysFromToday = jobDate.diff(today, 'days');
    return { id: job.id, daysFromToday };
  });
}

function _sortArrayOfIdsWithDaysFromToday(jobs) {
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

function _sortJobs(idsSorted, jobs) {
  let jobsToBeSorted = jobs;
  const jobsSorted = [];

  idsSorted.forEach((idSorted) => {
    let idWasAlreadyFound = false;
    jobsToBeSorted = jobsToBeSorted.filter((job) => {
      if (!idWasAlreadyFound && idSorted.id === job.id) {
        jobsSorted.push(job);
        idWasAlreadyFound = true;
        return false;
      }

      return true;
    });
  });

  return jobsSorted;
}

export default {
  sort(jobs) {
    const idsToBeSorted = _getArrayOfIdsWithDaysFromToday(jobs);
    const idsSorted = _sortArrayOfIdsWithDaysFromToday(idsToBeSorted);
    return _sortJobs(idsSorted, jobs);
  },
};
