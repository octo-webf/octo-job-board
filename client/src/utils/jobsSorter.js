import projectStaffingNeededDate from '@/utils/projectStaffingNeededDate';
import moment from 'moment';

export default {
  sort(jobs, availabityDate = moment()) {
    const regexToFindOnlyMissions = /^mission_/;
    const jobsWithStatusMission = jobs.filter(job => regexToFindOnlyMissions.test(job.project.status));
    const jobsWithOtherStatus = jobs.filter(job => !regexToFindOnlyMissions.test(job.project.status));

    const sortedJobsWithStatusMission = jobsWithStatusMission.length > 1 ?
      projectStaffingNeededDate.sortAll(jobsWithStatusMission) :
      jobsWithStatusMission;
    const sortedJobsWithOtherStatus = jobsWithOtherStatus.length > 1 ?
      projectStaffingNeededDate.sortAfter(jobsWithOtherStatus, availabityDate) :
      jobsWithOtherStatus;

    return [...sortedJobsWithStatusMission, ...sortedJobsWithOtherStatus];
  },
};
