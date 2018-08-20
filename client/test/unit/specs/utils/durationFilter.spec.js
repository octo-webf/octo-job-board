import durationFilter from '@/utils/durationFilter';
import jobFixture from '../fixtures/job.fixture';

const buildJobWithDuration = (duration) => {
  const jobWithDuration = jobFixture();
  jobWithDuration.project.mission_duration = duration;
  return jobWithDuration;
};

describe('Unit | Utils | Duration Filter', () => {
  const shortJob = buildJobWithDuration('4');
  const midJob = buildJobWithDuration('13');
  const longJob = buildJobWithDuration('666');
  const allJobs = [shortJob, shortJob, midJob, longJob];

  it('should return jobs when duration is anyDuration', () => {
    // When
    const durationJobs = durationFilter.filter(allJobs, 'anyDuration');

    // Then
    expect(durationJobs).to.deep.equal(allJobs);
  });

  it('should return the 2 short jobs when duration is shortDuration', () => {
    // When
    const durationJobs = durationFilter.filter(allJobs, 'shortDuration');

    // Then
    expect(durationJobs).to.deep.equal([shortJob, shortJob]);
  });

  it('should return the mid job when duration is mediumDuration', () => {
    // When
    const durationJobs = durationFilter.filter(allJobs, 'mediumDuration');

    // Then
    expect(durationJobs).to.deep.equal([midJob]);
  });

  it('should return the long job when duration is longDuration', () => {
    // When
    const durationJobs = durationFilter.filter(allJobs, 'longDuration');

    // Then
    expect(durationJobs).to.deep.equal([longJob]);
  });
});
