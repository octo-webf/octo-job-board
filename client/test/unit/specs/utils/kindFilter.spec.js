import kindFilter from '@/utils/kindFilter';
import jobFixture from '../fixtures/job.fixture';

const buildJobWithKind = (kind) => {
  const jobWithKind = jobFixture();
  jobWithKind.project.kind = kind;
  return jobWithKind;
};

describe('Unit | Utils | Kind Filter', () => {
  const regie = buildJobWithKind('cost_reimbursable');
  const forfait = buildJobWithKind('fixed_price');
  const allJobs = [regie, regie, forfait, forfait, forfait];

  it('should return jobs when kind is anyKind', () => {
    // When
    const kindJobs = kindFilter.filter(allJobs, 'anyKind');
    // Then
    expect(kindJobs).to.deep.equal(allJobs);
  });

  it('should return the 2 cost reimbursable jobs when kind is cost reimbursable', () => {
    // When
    const kindJobs = kindFilter.filter(allJobs, 'costReimbursable');

    // Then
    expect(kindJobs).to.deep.equal([regie, regie]);
  });

  it('should return the 3 fixed price jobs when kind is fixed price', () => {
    // When
    const kindJobs = kindFilter.filter(allJobs, 'fixedPrice');

    // Then
    expect(kindJobs).to.deep.equal([forfait, forfait, forfait]);
  });
});
