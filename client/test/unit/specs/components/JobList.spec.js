import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobList from '@/components/JobList';
import authentication from '@/services/authentication';
import projectStatus from '@/utils/projectStatus';
import jobsApi from '@/api/jobs';

Vue.use(VueAnalytics, {
  id: `${process.env.ANALYTICS_ID}`,
});

describe('Unit | Component | JobList.vue', () => {
  let component;
  let jobs;
  let expectedJobs;

  beforeEach(() => {
    // given
    jobs = [
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
          staffing_needed_from: '2017-07-01',
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
          staffing_needed_from: '2017-07-01',
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
    expectedJobs = [  {
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
          staffing_needed_from: '2017-07-01',
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
          staffing_needed_from: '2017-07-01',
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
    sinon.stub(authentication, 'isAuthenticated').returns(true);
    sinon.stub(projectStatus, 'sort').returns(expectedJobs);
    sinon.stub(jobsApi, 'fetchAll').resolves(jobs);

    const Constructor = Vue.extend(JobList);

    // when
    component = new Constructor().$mount();
  });

  afterEach(() => {
    projectStatus.sort.restore();
    authentication.isAuthenticated.restore();
    jobsApi.fetchAll.restore();
  });

  it('should be named "JobList"', () => {
    expect(component.$options.name).to.equal('JobList');
  });

  describe('method #getJobs', () => {
    it('should verify that user is authenticated', () => {
      expect(authentication.isAuthenticated).to.have.been.called;
    });

    it('should render as many jobs as received from the API', () => Vue.nextTick().then(() => {
      const jobCards = component.$el.querySelectorAll('.job-card');
      expect(jobCards.length).to.equal(2);
    }));

    it('should add number of available jobs', () => Vue.nextTick().then(() => {
      expect(component.$el.querySelector('.job-results__title').textContent.trim()).to.equal('Missions à staffer (2)');
    }));

    it('should sort the mission jobs', () => Vue.nextTick().then(() => {
      const jobTitles = component.$el.querySelectorAll('.job__title');
      expect(jobTitles[0].textContent).to.equal('Tech Lead mission 2');
      expect(jobTitles[1].textContent).to.equal('Tech Lead mission 1');
    }));
  });
});

