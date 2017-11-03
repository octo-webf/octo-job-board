import projectStatus from '@/utils/projectStatus';
import projectStaffingNeededDate from '@/utils/projectStaffingNeededDate';
import jobsSorter from '@/utils/jobsSorter';

describe('Unit | Utils | Jobs Sorter', () => {
  let jobs;
  let expectedJobsWhenSortedByStatus;
  let expectedJobsWhenSortedByStatusAndStaffingNeededDate;
  beforeEach(() => {
    // given
    jobs = [
      {
        activity: {
          id: 1,
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
        activity: {
          id: 2,
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
        activity: {
          id: 3,
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
        activity: {
          id: 4,
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

    const todayJobSigned = jobs[3];
    const yesterdayJobProposal = jobs[2];
    const beforeYesterdayJobSigned = jobs[1];
    const oldJobProposal = jobs[0];

    expectedJobsWhenSortedByStatus = [
      beforeYesterdayJobSigned,
      todayJobSigned,
      oldJobProposal,
      yesterdayJobProposal,
    ];

    const signedJobsSortedByStaffingNeededDate = [
      todayJobSigned,
      beforeYesterdayJobSigned,
    ];

    const proposalJobsSortedByStaffingNeededDate = [
      yesterdayJobProposal,
      oldJobProposal,
    ];

    expectedJobsWhenSortedByStatusAndStaffingNeededDate = [
      ...signedJobsSortedByStaffingNeededDate,
      ...proposalJobsSortedByStaffingNeededDate,
    ];

    sinon.stub(projectStatus, 'sort').returns(expectedJobsWhenSortedByStatus);

    const staffingSort = sinon.stub(projectStaffingNeededDate, 'sort');
    staffingSort.onCall(0).returns(signedJobsSortedByStaffingNeededDate);
    staffingSort.onCall(1).returns(proposalJobsSortedByStaffingNeededDate);
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
