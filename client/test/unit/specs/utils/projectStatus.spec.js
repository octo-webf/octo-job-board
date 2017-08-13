import projectStatus from '@/utils/projectStatus';

describe('Unit | Utils | Project Status', () => {
  it('should sort jobs according to project status', () => {
    // Given
    const job1 = { id: 1, project: { status: 'proposal_in_progress' } };
    const job2 = { id: 2, project: { status: 'mission_signed' } };
    const job3 = { id: 3, project: { status: 'mission_accepted' } };
    const job4 = { id: 4, project: { status: 'proposal_in_progress' } };
    const job5 = { id: 5, project: { status: 'proposal_sent' } };
    const job6 = { id: 6, project: { status: 'lead' } };

    const givenJobs = [job1, job2, job3, job4, job5, job6];
    const expectedJobs = [job2, job3, job5, job1, job4, job6];

    // When
    const sortedJobs = projectStatus.sort(givenJobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedJobs);
  });
});

