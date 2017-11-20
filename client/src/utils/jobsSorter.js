import projectStaffingNeededDate from '@/utils/projectStaffingNeededDate';

export default {

  sort(jobs) {
    const regexToFindOnlyMissions = /^mission_/;

    let jobsWithStatusMission = jobs.filter(job => regexToFindOnlyMissions.test(job.project.status));
    let jobsWithOtherStatus = jobs.filter(job => !regexToFindOnlyMissions.test(job.project.status));

    if (jobsWithStatusMission.length > 1) {
      jobsWithStatusMission = projectStaffingNeededDate.sort(jobsWithStatusMission);
    }
    if (jobsWithOtherStatus.length > 1) {
      jobsWithOtherStatus = projectStaffingNeededDate.sort(jobsWithOtherStatus);
    }

    return [...jobsWithStatusMission, ...jobsWithOtherStatus];
  },

};
