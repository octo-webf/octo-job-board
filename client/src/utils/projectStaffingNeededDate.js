export default {

  _convertStringDateToDate(stringDate) {
    let dateArray = stringDate.split('-');
    return new Date( parseInt(dateArray[0]), parseInt(dateArray[1]) - 1 , parseInt(dateArray[2]));
  },

  _datesAreEqual(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDay() === date2.getDay());
  },

  sort(jobs) {

    let jobsCopy  = jobs;
    let jobsSorted = [];
    let today = new Date();

    jobsCopy.forEach((job) => {
      let jobDate = this._convertStringDateToDate(job.project.staffing_needed_from);

      if(this._datesAreEqual(jobDate, today)){
        jobsSorted.push(job);
      }
      else {
        for(let i=1; i < 3 ; i++) {
          let todayPlus = new Date( today.getTime() );
          todayPlus.setDate(todayPlus.getDate() + i);
          let todayMinus = new Date( today.getTime() );
          todayMinus.setDate(todayMinus.getDate() - i);

          console.log('currentJobDate : ' + jobDate );
          console.log('todayPlus: ' + todayPlus);
          console.log('todayMinus: ' + todayMinus);
          console.log('todayPlus compare : ' + this._datesAreEqual(jobDate, todayPlus));
          console.log('todayMinus compare : ' + this._datesAreEqual(jobDate, todayMinus));
        }
      }



    });

    //console.log('jobsSorted : ', jobsSorted);
    return [ jobs[1], jobs[0] ];
  },

};
