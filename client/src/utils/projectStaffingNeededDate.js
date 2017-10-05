import moment from 'moment';
export default {

  _toggleSignAndAddOneDay(counter){
    return counter > 0 ? counter * -1 : counter * -1 + 1 ;
  },

  sort(today, jobs) {

    let jobsToBeSorted  = jobs;
    let jobsSorted = [];
    let counterNDays = 0;

   while(jobsToBeSorted.length){

      let jobsToKeepForNextIteration =[];
      let jobPlusMinusDay = today.clone().add(counterNDays, 'day');

      jobsToBeSorted.forEach((job) => {
        let jobDate = moment(job.activity.staffing_needed_from, 'YYYY-MM-DD');

        if(jobDate.isSame(jobPlusMinusDay, 'day')){
          jobsSorted.push(job);
        }
        else {
          jobsToKeepForNextIteration.push(job);
        }
      });

      counterNDays = this._toggleSignAndAddOneDay(counterNDays);
      jobsToBeSorted =jobsToKeepForNextIteration;
    }

    return jobsSorted;
  },

};
