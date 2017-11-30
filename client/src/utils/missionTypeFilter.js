import { includes } from 'lodash';

export default {
  filter(allJobs, missionTypes) {
    const types = missionTypes.map(missionType => missionType.toLowerCase());
    return allJobs.filter(job => includes(types, job.project.nature));
  },
};
