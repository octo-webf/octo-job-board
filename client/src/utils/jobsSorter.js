import projectStatus from '@/utils/projectStatus';
import projectStaffingNeededDate from "@/utils/projectStaffingNeededDate";

export default {

  sort(today, jobs) {
    let jobsSortedByStatus = projectStatus.sort(jobs);
    const regexToFindOnlyMissions = /^mission_/;

    let jobsWithStatusMission = jobsSortedByStatus.filter((job) => {
      return regexToFindOnlyMissions.test(job.project.status);
    });
    let jobsWithOtherStatus = jobsSortedByStatus.filter((job) => {
      return !regexToFindOnlyMissions.test(job.project.status);
    });

    if(jobsWithStatusMission.length > 1) {
      jobsWithStatusMission = projectStaffingNeededDate.sort(today, jobsWithStatusMission);
    }
    if(jobsWithOtherStatus.length > 1) {
      jobsWithOtherStatus = projectStaffingNeededDate.sort(today, jobsWithOtherStatus);
    }

    return [...jobsWithStatusMission, ...jobsWithOtherStatus];
  },

};
