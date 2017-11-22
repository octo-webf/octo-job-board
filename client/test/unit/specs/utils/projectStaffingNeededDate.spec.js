import projectStaffingNeededDate from '@/utils/projectStaffingNeededDate';
import moment from 'moment';

describe('Unit | Utils | Project Staffing Needed Date', () => {
  describe('#sortAll', () => {
    let clock;
    beforeEach(() => {
      clock = sinon.useFakeTimers(new Date(2017, 9, 4).getTime());
    });

    afterEach(() => {
      clock.restore();
    });

    it('should sort chronologically two jobs according to project staffing needed date', () => {
      // Given
      const futureJob = { activity: { id: 1, staffing_needed_from: '2017-11-03' } };
      const todayJob = { activity: { id: 2, staffing_needed_from: '2017-10-02' } };

      const givenJobs = [futureJob, todayJob];
      const expectedSortedJobs = [todayJob, futureJob];

      // When
      const sortedJobs = projectStaffingNeededDate.sortAll(givenJobs);

      // Then
      expect(sortedJobs).to.deep.equal(expectedSortedJobs);
    });

    it('should sort chronologically five jobs according to project staffing needed date', () => {
      // Given
      const futureJob = { activity: { id: 1, staffing_needed_from: '2017-11-03' } };
      const todayJob = { activity: { id: 1, staffing_needed_from: '2017-10-04' } };
      const yesterdayJob = { activity: { id: 2, staffing_needed_from: '2017-10-03' } };
      const beforeYesterdayJob = { activity: { id: 3, staffing_needed_from: '2017-10-02' } };
      const oldJob = { activity: { id: 4, staffing_needed_from: '2017-10-01' } };
      const tomorrowJob = { activity: { id: 5, staffing_needed_from: '2017-10-05' } };

      const givenJobs = [futureJob, todayJob, yesterdayJob, beforeYesterdayJob, oldJob, tomorrowJob];
      const expectedSortedJobs = [oldJob, beforeYesterdayJob, yesterdayJob, todayJob, tomorrowJob, futureJob];

      // When
      const sortedJobs = projectStaffingNeededDate.sortAll(givenJobs);

      // Then
      expect(sortedJobs).to.deep.equal(expectedSortedJobs);
    });

    it('should sort chronologically five jobs with the same date according to project staffing needed date', () => {
      // Given
      const todayJob1 = { activity: { id: 1, staffing_needed_from: '2017-10-04' } };
      const todayJob2 = { activity: { id: 2, staffing_needed_from: '2017-10-04' } };
      const todayJob3 = { activity: { id: 3, staffing_needed_from: '2017-10-04' } };
      const todayJob4 = { activity: { id: 4, staffing_needed_from: '2017-10-04' } };
      const todayJob5 = { activity: { id: 5, staffing_needed_from: '2017-10-04' } };

      const givenJobs = [todayJob1, todayJob2, todayJob3, todayJob4, todayJob5];
      const expectedSortedJobs = [todayJob1, todayJob2, todayJob3, todayJob4, todayJob5];

      // When
      const sortedJobs = projectStaffingNeededDate.sortAll(givenJobs);
      // Then
      expect(sortedJobs).to.deep.equal(expectedSortedJobs);
    });
  });

  describe('#sortAfter', () => {
    let clock;
    const availabityDate = moment(new Date(2017, 9, 3));

    beforeEach(() => {
      clock = sinon.useFakeTimers(new Date(2017, 9, 4).getTime());
    });

    afterEach(() => {
      clock.restore();
    });

    it('should sort three jobs whose staffing_needed_from chronologically after availability date', () => {
      // Given
      const futureJob = { activity: { id: 1, staffing_needed_from: '2017-11-03' } };
      const todayJob = { activity: { id: 1, staffing_needed_from: '2017-10-04' } };
      const notAvailableJob = { activity: { id: 3, staffing_needed_from: '2017-09-02' } };

      const givenJobs = [futureJob, todayJob, notAvailableJob];
      const expectedSortedJobs = [todayJob, futureJob];

      // When
      const sortedJobs = projectStaffingNeededDate.sortAfter(givenJobs, availabityDate);

      // Then
      expect(sortedJobs).to.deep.equal(expectedSortedJobs);
    });
  });
});

