import projectStatus from '@/utils/projectStatus';
import projectStaffingNeededDate from "@/utils/projectStaffingNeededDate";
import jobsSorter from '@/utils/jobsSorter';

describe('Unit | Utils | Jobs Sorter', () => {
  let jobs;
  let expectedJobsWhenSortedByStatus;
  let expectedJobsWhenSortedByStatusAndStaffingNeededDate;
  beforeEach(() => {
    // given
    jobs = [
      {
        id: 1,
        activity: {
          title: 'Tech Lead mission 1',
          staffing_needed_from: '2017-10-01',
        },
        project: {
          id: 123456,
          status: 'proposal_in_progress',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          duration: '10 mois',
          location: 'OCTO',
          business_contact: {
            nickname: 'ABC',
          },
          mission_director: {
            nickname: 'XYZ',
          },
        },
      },
      {
        id: 2,
        activity: {
          title: 'Tech Lead mission 2',
          staffing_needed_from: '2017-10-02',
        },
        project: {
          id: 123456,
          status: 'mission_signed',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          duration: '10 mois',
          location: 'OCTO',
          business_contact: {
            nickname: 'ABC',
          },
          mission_director: {
            nickname: 'XYZ',
          },
        },
      },
      {
        id: 3,
        activity: {
          title: 'Tech Lead mission 3',
          staffing_needed_from: '2017-10-03',
        },
        project: {
          id: 123456,
          status: 'proposal_in_progress',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          duration: '10 mois',
          location: 'OCTO',
          business_contact: {
            nickname: 'ABC',
          },
          mission_director: {
            nickname: 'XYZ',
          },
        },
      },
      {
        id: 4,
        activity: {
          title: 'Tech Lead mission 4',
          staffing_needed_from: '2017-10-04',
        },
        project: {
          id: 123456,
          status: 'mission_signed',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          duration: '10 mois',
          location: 'OCTO',
          business_contact: {
            nickname: 'ABC',
          },
          mission_director: {
            nickname: 'XYZ',
          },
        },
      },
    ];
    expectedJobsWhenSortedByStatus = [
      jobs[1],
      jobs[3],
      jobs[0],
      jobs[2],
    ];
    expectedJobsWhenSortedByStatusAndStaffingNeededDate = [
      jobs[3],
      jobs[1],
      jobs[2],
      jobs[0],
    ];

    sinon.stub(projectStatus, 'sort').returns(expectedJobsWhenSortedByStatus);
    let staffingSort = sinon.stub(projectStaffingNeededDate, 'sort');
    staffingSort.onCall(0)
      .returns(expectedJobsWhenSortedByStatusAndStaffingNeededDate.slice(0,2));
    staffingSort.onCall(1)
      .returns(expectedJobsWhenSortedByStatusAndStaffingNeededDate.slice(2));
  });

  afterEach(() => {
    projectStatus.sort.restore();
    projectStaffingNeededDate.sort.restore();
  });

  it('should sort jobs by status and by staffing needed date', () => {
    // When
    const sortedJobs = jobsSorter.sort(jobs);

    // Then
    expect(sortedJobs).to.deep.equal(expectedJobsWhenSortedByStatusAndStaffingNeededDate);
  });

});
