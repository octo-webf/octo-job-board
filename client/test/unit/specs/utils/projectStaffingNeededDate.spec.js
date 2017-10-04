import projectStaffingNeededDate from '@/utils/projectStaffingNeededDate';

describe('Unit | Utils | Project Staffing Needed Date', () => {
  it.only('should sort two jobs according to project staffing needed date', () => {
    // Given
    const job1 = { id: 1, activity: { staffing_needed_from: '2017-11-03' } };
    const job2 = { id: 2, activity: { staffing_needed_from: '2017-10-02' } };

    const givenJobs = [job1, job2];
    const expectedJobs = [job2, job1];

    // When
    const sortedJobs = projectStaffingNeededDate.sort(givenJobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedJobs);
  });

  it('should sort five jobs according to project staffing needed date', () => {
    // Given
    const job1 = { id: 1, activity: { staffing_needed_from: '2017-10-04' } };
    const job2 = { id: 2, activity: { staffing_needed_from: '2017-10-03' } };
    const job3 = { id: 3, activity: { staffing_needed_from: '2017-10-02' } };
    const job4 = { id: 4, activity: { staffing_needed_from: '2017-10-01' } };
    const job5 = { id: 5, activity: { staffing_needed_from: '2017-10-05' } };

    const givenJobs = [job1, job2, job3, job4, job5];
    const expectedJobs = [job1, job5, job2, job3, job4 ];

    // When
    const sortedJobs = projectStaffingNeededDate.sort(givenJobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedJobs);
  });


  it('should sort five jobs with the same date according to project staffing needed date', () => {
    // Given
    const job1 = { id: 1, activity: { staffing_needed_from: '2017-10-04' } };
    const job3 = { id: 3, activity: { staffing_needed_from: '2017-10-04' } };
    const job4 = { id: 4, activity: { staffing_needed_from: '2017-10-04' } };
    const job2 = { id: 2, activity: { staffing_needed_from: '2017-10-04' } };
    const job5 = { id: 5, activity: { staffing_needed_from: '2017-10-04' } };

    const givenJobs = [job1, job2, job3, job4, job5];
    const expectedJobs = [job1, job2, job3, job4, job5];

    // When
    const sortedJobs = projectStaffingNeededDate.sort(givenJobs);
    // Then
    expect(sortedJobs).to.deep.equal(expectedJobs);
  });

  it('should sort jobs according to project staffing needed date', () => {
    // Given
    const job1 = { id: 1, activity: { staffing_needed_from: '2017-11-03' } };
    const job2 = { id: 2, activity: { staffing_needed_from: '2017-10-02' } };
    const job3 = { id: 3, activity: { staffing_needed_from: '2017-10-04' } };
    const job4 = { id: 4, activity: { staffing_needed_from: '2017-09-15' } };
    const job5 = { id: 5, activity: { staffing_needed_from: '2017-10-03' } };
    const job6 = { id: 6, activity: { staffing_needed_from: '2017-09-08' } };


    const givenJobs = [job1, job2, job3, job4, job5, job6];
    const expectedJobs = [job3, job5, job2, job4, job6, job1];

    // When
    const sortedJobs = projectStaffingNeededDate.sort(givenJobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedJobs);
  });
});

