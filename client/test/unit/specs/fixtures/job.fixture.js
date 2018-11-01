module.exports = job => Object.assign({},
  {
    id: 1,
    activity: {
      title: 'Tech Lead mission 1',
      staffing_needed_from: '2017-07-01',
    },
    project: {
      id: 123456,
      status: 'proposal_sent',
      kind: 'fixed_price',
      name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
      customer: {
        name: 'La Poste - Courrier',
        sector: {
          name: 'FR - La Poste',
        },
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
  job,
);
