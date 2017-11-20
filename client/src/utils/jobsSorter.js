import projectStaffingNeededDate from '@/utils/projectStaffingNeededDate';
import moment from 'moment';

export default {

  sort(jobs, availabityDate = moment()) {
    const regexToFindOnlyMissions = /^mission_/;
    let jobsWithStatusMission = jobs.filter(job => regexToFindOnlyMissions.test(job.project.status));
    let jobsWithOtherStatus = jobs.filter(job => !regexToFindOnlyMissions.test(job.project.status));

    if (jobsWithStatusMission.length > 1) {
      jobsWithStatusMission = projectStaffingNeededDate.sortAll(jobsWithStatusMission);
    }
    if (jobsWithOtherStatus.length > 1) {
      jobsWithOtherStatus = projectStaffingNeededDate.sortAfter(jobsWithOtherStatus, availabityDate);
    }
    return [...jobsWithStatusMission, ...jobsWithOtherStatus];
  },

};
