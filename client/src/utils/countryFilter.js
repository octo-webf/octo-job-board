import countries from '@/utils/countries';

export default {
  filter(allJobs, country) {
    if (country === 'anyCountry') {
      return allJobs;
    }
    if (country === 'France') {
      return allJobs.filter(job => countries.indexOf(job.project.customer.sector.name) === -1);
    }
    return allJobs.filter(job => job.project.customer.sector.name === country);
  },
};
