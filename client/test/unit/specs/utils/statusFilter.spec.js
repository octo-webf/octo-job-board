import statusFilter from '@/utils/statusFilter';
import jobFixture from '../fixtures/job.fixture';

const buildJobWithStatus = (status) => {
  const jobWithStatus = jobFixture();
  jobWithStatus.project.status = status;
  return jobWithStatus;
};

describe('Unit | Utils | Status Filter', () => {
  const propaleJob = buildJobWithStatus('proposal_sent');
  const acceptedMissionJob = buildJobWithStatus('mission_accepted');
  const signedMissionJob = buildJobWithStatus('mission_signed');
  const allJobs = [propaleJob, propaleJob, acceptedMissionJob, signedMissionJob];

  it('should return jobs when status is anyStatus', () => {
    // When
    const statusJobs = statusFilter.filter(allJobs, 'anyStatus');

    // Then
    expect(statusJobs).to.deep.equal(allJobs);
  });

  it('should return the 2 proposal jobs when status is proposals', () => {
    // When
    const statusJobs = statusFilter.filter(allJobs, 'proposals');

    // Then
    expect(statusJobs).to.deep.equal([propaleJob, propaleJob]);
  });

  it('should return the accepted and signed missions job when status is missions', () => {
    // When
    const statusJobs = statusFilter.filter(allJobs, 'missions');

    // Then
    expect(statusJobs).to.deep.equal([acceptedMissionJob, signedMissionJob]);
  });
});
