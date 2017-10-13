import moment from 'moment';
import projectStaffingNeededDate from '@/utils/projectStaffingNeededDate';

describe('Unit | Utils | Project Staffing Needed Date', () => {
  it('should sort two jobs according to project staffing needed date', () => {
    // Given
    const today = moment('2017-10-04', 'YYYY-MM-DD');

    const futureJob = { id: 1, activity: { staffing_needed_from: '2017-11-03' } };
    const beforeYesterdayJob = { id: 2, activity: { staffing_needed_from: '2017-10-02' } };

    const givenJobs = [futureJob, beforeYesterdayJob];
    const expectedSortedJobs = [beforeYesterdayJob, futureJob];

    // When
    const sortedJobs = projectStaffingNeededDate.sort(today, givenJobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedSortedJobs);
  });

  it('should sort five jobs according to project staffing needed date', () => {
    // Given
    const today = moment('2017-10-04', 'YYYY-MM-DD');

    const todayJob = { id: 1, activity: { staffing_needed_from: '2017-10-04' } };
    const yesterdayJob = { id: 2, activity: { staffing_needed_from: '2017-10-03' } };
    const beforeYesterdayJob = { id: 3, activity: { staffing_needed_from: '2017-10-02' } };
    const oldJob = { id: 4, activity: { staffing_needed_from: '2017-10-01' } };
    const tomorrowJob = { id: 5, activity: { staffing_needed_from: '2017-10-05' } };

    const givenJobs = [todayJob, yesterdayJob, beforeYesterdayJob, oldJob, tomorrowJob];
    const expectedSortedJobs = [todayJob, tomorrowJob, yesterdayJob, beforeYesterdayJob, oldJob];

    // When
    const sortedJobs = projectStaffingNeededDate.sort(today, givenJobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedSortedJobs);
  });

  it('should sort five jobs with the same date according to project staffing needed date', () => {
    // Given
    const today = moment('2017-10-04', 'YYYY-MM-DD');

    const todayJob1 = { id: 1, activity: { staffing_needed_from: '2017-10-04' } };
    const todayJob2 = { id: 2, activity: { staffing_needed_from: '2017-10-04' } };
    const todayJob3 = { id: 3, activity: { staffing_needed_from: '2017-10-04' } };
    const todayJob4 = { id: 4, activity: { staffing_needed_from: '2017-10-04' } };
    const todayJob5 = { id: 5, activity: { staffing_needed_from: '2017-10-04' } };

    const givenJobs = [todayJob1, todayJob2, todayJob3, todayJob4, todayJob5];
    const expectedSortedJobs = [todayJob1, todayJob2, todayJob3, todayJob4, todayJob5];

    // When
    const sortedJobs = projectStaffingNeededDate.sort(today, givenJobs);
    // Then
    expect(sortedJobs).to.deep.equal(expectedSortedJobs);
  });

  it('should sort jobs according to project staffing needed date', () => {
    // Given
    const today = moment('2017-10-04', 'YYYY-MM-DD');

    const futureJob = { id: 1, activity: { staffing_needed_from: '2017-11-03' } };
    const beforeYesterdayJob = { id: 2, activity: { staffing_needed_from: '2017-10-02' } };
    const todayJob = { id: 3, activity: { staffing_needed_from: '2017-10-04' } };
    const veryOldJob = { id: 4, activity: { staffing_needed_from: '2017-09-15' } };
    const yesterdayJob = { id: 5, activity: { staffing_needed_from: '2017-10-03' } };
    const oldJob = { id: 6, activity: { staffing_needed_from: '2017-09-08' } };


    const givenJobs = [futureJob, beforeYesterdayJob, todayJob, veryOldJob, yesterdayJob, oldJob];
    const expectedSortedJobs = [todayJob, yesterdayJob, beforeYesterdayJob, veryOldJob, oldJob, futureJob];

    // When
    const sortedJobs = projectStaffingNeededDate.sort(today, givenJobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedSortedJobs);
  });
});

