import projectStaffingNeededDate from '@/utils/projectStaffingNeededDate';

describe('Unit | Utils | Project Staffing Needed Date', () => {
  describe('#sort', () => {
    let clock;
    beforeEach(() => {
      clock = sinon.useFakeTimers(new Date(2017, 9, 4).getTime());
    });

    afterEach(() => {
      clock.restore();
    });

    it('should sort two jobs according to project staffing needed date', () => {
      // Given
      const futureJob = { activity: { id: 1, staffing_needed_from: '2017-11-03' } };
      const beforeYesterdayJob = { activity: { id: 2, staffing_needed_from: '2017-10-02' } };

      const givenJobs = [futureJob, beforeYesterdayJob];
      const expectedSortedJobs = [beforeYesterdayJob, futureJob];

      // When
      const sortedJobs = projectStaffingNeededDate.sort(givenJobs);

      // Then
      expect(sortedJobs).to.deep.equal(expectedSortedJobs);
    });

    it('should sort five jobs according to project staffing needed date', () => {
      // Given
      const todayJob = { activity: { id: 1, staffing_needed_from: '2017-10-04' } };
      const yesterdayJob = { activity: { id: 2, staffing_needed_from: '2017-10-03' } };
      const beforeYesterdayJob = { activity: { id: 3, staffing_needed_from: '2017-10-02' } };
      const oldJob = { activity: { id: 4, staffing_needed_from: '2017-10-01' } };
      const tomorrowJob = { activity: { id: 5, staffing_needed_from: '2017-10-05' } };

      const givenJobs = [todayJob, yesterdayJob, beforeYesterdayJob, oldJob, tomorrowJob];
      const expectedSortedJobs = [todayJob, tomorrowJob, yesterdayJob, beforeYesterdayJob, oldJob];

      // When
      const sortedJobs = projectStaffingNeededDate.sort(givenJobs);

      // Then
      expect(sortedJobs).to.deep.equal(expectedSortedJobs);
    });

    it('should sort five jobs with the same date according to project staffing needed date', () => {
      // Given
      const todayJob1 = { activity: { id: 1, staffing_needed_from: '2017-10-04' } };
      const todayJob2 = { activity: { id: 2, staffing_needed_from: '2017-10-04' } };
      const todayJob3 = { activity: { id: 3, staffing_needed_from: '2017-10-04' } };
      const todayJob4 = { activity: { id: 4, staffing_needed_from: '2017-10-04' } };
      const todayJob5 = { activity: { id: 5, staffing_needed_from: '2017-10-04' } };

      const givenJobs = [todayJob1, todayJob2, todayJob3, todayJob4, todayJob5];
      const expectedSortedJobs = [todayJob1, todayJob2, todayJob3, todayJob4, todayJob5];

      // When
      const sortedJobs = projectStaffingNeededDate.sort(givenJobs);
      // Then
      expect(sortedJobs).to.deep.equal(expectedSortedJobs);
    });

    it('should sort jobs according to project staffing needed date', () => {
      // Given
      const futureJob = { activity: { id: 1, staffing_needed_from: '2017-11-03' } };
      const beforeYesterdayJob = { activity: { id: 2, staffing_needed_from: '2017-10-02' } };
      const todayJob = { activity: { id: 3, staffing_needed_from: '2017-10-04' } };
      const veryOldJob = { activity: { id: 4, staffing_needed_from: '2017-09-15' } };
      const yesterdayJob = { activity: { id: 5, staffing_needed_from: '2017-10-03' } };
      const oldJob = { activity: { id: 6, staffing_needed_from: '2017-09-08' } };


      const givenJobs = [futureJob, beforeYesterdayJob, todayJob, veryOldJob, yesterdayJob, oldJob];
      const expectedSortedJobs = [todayJob, yesterdayJob, beforeYesterdayJob, veryOldJob, oldJob, futureJob];

      // When
      const sortedJobs = projectStaffingNeededDate.sort(givenJobs);

      // Then
      expect(sortedJobs).to.deep.equal(expectedSortedJobs);
    });
  });
});

