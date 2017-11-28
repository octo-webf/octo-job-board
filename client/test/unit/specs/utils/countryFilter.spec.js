import countryFilter from '@/utils/countryFilter';
import jobFixture from '../fixtures/job.fixture';

const buildJobWithSectorName = (name) => {
  const jobFromCountry = jobFixture();
  jobFromCountry.project.customer.sector.name = name;
  return jobFromCountry;
};

describe('Unit | Utils | Country Filter', () => {
  const frenchJob = buildJobWithSectorName('FR - La Poste');
  const australianJob = buildJobWithSectorName('Australia');
  const swissJob = buildJobWithSectorName('Suisse');
  const moroccoJob = buildJobWithSectorName('Maroc');
  const allJobs = [frenchJob, frenchJob, australianJob, swissJob, swissJob, moroccoJob];

  it('should return jobs when country is anyCountry', () => {
    // When
    const countryJobs = countryFilter.filter(allJobs, 'anyCountry');

    // Then
    expect(countryJobs).to.deep.equal(allJobs);
  });

  it('should return the 2 French jobs when country is France', () => {
    // When
    const countryJobs = countryFilter.filter(allJobs, 'France');

    // Then
    expect(countryJobs).to.deep.equal([frenchJob, frenchJob]);
  });

  it('should return the Australian job when country is Australia', () => {
    // When
    const countryJobs = countryFilter.filter(allJobs, 'Australia');

    // Then
    expect(countryJobs).to.deep.equal([australianJob]);
  });

  it('should return the 2 Swiss jobs when country is Suisse', () => {
    // When
    const countryJobs = countryFilter.filter(allJobs, 'Suisse');

    // Then
    expect(countryJobs).to.deep.equal([swissJob, swissJob]);
  });

  it('should return the Morocco job when country is Maroc', () => {
    // When
    const countryJobs = countryFilter.filter(allJobs, 'Maroc');

    // Then
    expect(countryJobs).to.deep.equal([moroccoJob]);
  });

  it('should return empty jobs when country is fake', () => {
    // When
    const countryJobs = countryFilter.filter(allJobs, 'Italie');

    // Then
    expect(countryJobs).to.deep.equal([]);
  });
});
