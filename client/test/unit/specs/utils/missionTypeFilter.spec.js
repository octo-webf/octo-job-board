import missionTypeFilter from '@/utils/missionTypeFilter';
import jobFixture from '../fixtures/job.fixture';

const buildJobWithMissionType = (nature) => {
  const jobWithMissionType = jobFixture();
  jobWithMissionType.project.nature = nature;
  return jobWithMissionType;
};

describe('Unit | Utils | MissionType Filter', () => {
  const deliveryJob = buildJobWithMissionType('delivery');
  const consultingJob = buildJobWithMissionType('consulting');
  const trainingJob = buildJobWithMissionType('training');
  const allJobs = [deliveryJob, deliveryJob, consultingJob, trainingJob];

  it('should return the 2 delivery jobs when missionType has Delivery', () => {
    // When
    const missionTypeJobs = missionTypeFilter.filter(allJobs, ['Delivery']);

    // Then
    expect(missionTypeJobs).to.deep.equal([deliveryJob, deliveryJob]);
  });

  it('should return the consulting jobs when missionType has Consulting', () => {
    // When
    const missionTypeJobs = missionTypeFilter.filter(allJobs, ['Consulting']);

    // Then
    expect(missionTypeJobs).to.deep.equal([consultingJob]);
  });

  it('should return the training jobs when missionType has Training', () => {
    // When
    const missionTypeJobs = missionTypeFilter.filter(allJobs, ['Training']);

    // Then
    expect(missionTypeJobs).to.deep.equal([trainingJob]);
  });

  it('should return the several jobs when missionType has several types', () => {
    // When
    const missionTypeJobs = missionTypeFilter.filter(allJobs, ['Delivery', 'Consulting']);

    // Then
    expect(missionTypeJobs).to.deep.equal([deliveryJob, deliveryJob, consultingJob]);
  });
});
