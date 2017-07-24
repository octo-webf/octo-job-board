import projectStatus from '@/utils/projectStatus';

describe('Unit | Utils | Project Status', () => {
  it('should sort jobs according to project status', () => {
    // Given
    const jobs = [
      {
        id: 1,
        activity: {
          title: 'Tech Lead mission 1',
        },
        project: {
          id: 123456,
          status: 'proposal_in_progress',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        },
        project: {
          id: 123456,
          status: 'mission_signed',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        },
        project: {
          id: 123456,
          status: 'mission_accepted',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        },
        project: {
          id: 123456,
          status: 'proposal_in_progress',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        id: 5,
        activity: {
          title: 'Tech Lead mission 5',
        },
        project: {
          id: 123456,
          status: 'proposal_sent',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        id: 6,
        activity: {
          title: 'Tech Lead mission 6',
        },
        project: {
          id: 123456,
          status: 'lead',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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

    // When
    const sortedJobs = projectStatus.sort(jobs);

    // Then
    const expectedJobs = [
      {
        id: 2,
        activity: {
          title: 'Tech Lead mission 2',
        },
        project: {
          id: 123456,
          status: 'mission_signed',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        },
        project: {
          id: 123456,
          status: 'mission_accepted',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        id: 5,
        activity: {
          title: 'Tech Lead mission 5',
        },
        project: {
          id: 123456,
          status: 'proposal_sent',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        },
        project: {
          id: 123456,
          status: 'proposal_in_progress',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        id: 1,
        activity: {
          title: 'Tech Lead mission 1',
        },
        project: {
          id: 123456,
          status: 'proposal_in_progress',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
        id: 6,
        activity: {
          title: 'Tech Lead mission 6',
        },
        project: {
          id: 123456,
          status: 'lead',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          start_date: '2017-07-01',
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
    expect(sortedJobs).to.deep.equal(expectedJobs);
  });
});

