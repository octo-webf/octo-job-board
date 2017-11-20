import projectStatus from '@/utils/projectStatus';

describe('Unit | Utils | Project Status', () => {
  it('should sort jobs according to project status', () => {
    // Given
    const job1 = { id: 5, project: { status: 'proposal_sent' } };
    const job2 = { id: 2, project: { status: 'mission_signed' } };
    const job3 = { id: 3, project: { status: 'mission_accepted' } };

    const givenJobs = [job1, job2, job3];
    const expectedJobs = [job2, job3, job1];

    // When
    const sortedJobs = projectStatus.sort(givenJobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedJobs);
  });
});

