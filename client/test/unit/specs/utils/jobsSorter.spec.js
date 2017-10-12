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

    let todayJobSigned = jobs[3];
    let yesterdayJobProposal = jobs[2];
    let beforeYesterdayJobSigned = jobs[1];
    let oldJobProposal = jobs[0];

    expectedJobsWhenSortedByStatus = [
      beforeYesterdayJobSigned,
      todayJobSigned,
      oldJobProposal,
      yesterdayJobProposal,
    ];

    expectedJobsWhenSortedByStatusAndStaffingNeededDate = [
      todayJobSigned,
      beforeYesterdayJobSigned,
      yesterdayJobProposal,
      oldJobProposal,
    ];

    let jobsSignedSortedByStaffingNeededDate = expectedJobsWhenSortedByStatusAndStaffingNeededDate.slice(0, 2);
    let jobsProposalSortedByStaffingNeededDate = expectedJobsWhenSortedByStatusAndStaffingNeededDate.slice(2);

    sinon.stub(projectStatus, 'sort').returns(expectedJobsWhenSortedByStatus);
    const staffingSort = sinon.stub(projectStaffingNeededDate, 'sort');
    staffingSort.onCall(0)
      .returns(jobsSignedSortedByStaffingNeededDate);
    staffingSort.onCall(1)
      .returns(jobsProposalSortedByStaffingNeededDate);
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
