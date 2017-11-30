import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import moment from 'moment';
import JobList from '@/components/JobList';
import jobsSorter from '@/utils/jobsSorter';
import countryFilter from '@/utils/countryFilter';
import statusFilter from '@/utils/statusFilter';
import missionTypeFilter from '@/utils/missionTypeFilter';
import authenticationService from '@/services/authentication';
import jobsApi from '@/api/jobs';
import jobFixture from '../fixtures/job.fixture';

Vue.use(VueAnalytics, {
  id: `${process.env.ANALYTICS_ID}`,
});

function buildJobFixture(id, title, status, staffingNeededFrom, country) {
  const activity = {
    title,
    staffing_needed_from: staffingNeededFrom,
  };
  const job = jobFixture({ id, activity });
  job.project.customer.sector.name = country;
  job.project.status = status;
  return job;
}

describe('Unit | Component | JobList.vue', () => {
  let component;
  const Constructor = Vue.extend(JobList);

  beforeEach(() => {
    // given
    sinon.stub(authenticationService, 'isAuthenticated').returns(true);
  });

  afterEach(() => {
    authenticationService.isAuthenticated.restore();
  });

  it('should be named "JobList"', () => {
    // when
    component = new Constructor().$mount();
    expect(component.$options.name).to.equal('JobList');
  });

  describe('render', () => {
    it('should have an interest modal', () => {
      const interestModal = component.$el.querySelectorAll('.interest-modal-wrapper');
      expect(interestModal.length).to.equal(1);
    });

    it('should have a job header', () => {
      // when
      component = new Constructor().$mount();

      // then
      const jobHeader = component.$el.querySelectorAll('.job-header');
      expect(jobHeader.length).to.equal(1);
    });
  });

  describe('method #displayInterestModal', () => {
    beforeEach(() => {
      sinon.stub(component.$modal, 'show');
    });

    afterEach(() => {
      component.$modal.show.restore();
    });

    it('should add job to the chosenJob data', () => {
      // Given
      const job = jobFixture();

      // When
      component.displayInterestModal(job);

      // Then
      expect(component.$data.chosenJob).to.equal(job);
    });

    it('should display the interest-modal', () => {
      // when
      component.displayInterestModal();

      // then
      expect(component.$modal.show).to.have.been.calledWith('interest-modal');
    });
  });

  describe('method #getJobs', () => {
    it('should verify that user is authenticated', () => {
      // when
      component = new Constructor().$mount();
      expect(authenticationService.isAuthenticated).to.have.been.called;
    });

    describe('before jobs are loaded', () => {
      beforeEach(() => {
        // given
        sinon.stub(jobsApi, 'fetchAll').rejects();

        // when
        component = new Constructor().$mount();
      });

      afterEach(() => {
        jobsApi.fetchAll.restore();
      });

      it('should not render any jobs', () => Vue.nextTick().then(() => {
        expect(component.$el.querySelector('.job-results-panel')).to.be.null;
      }));

      it('should display loading spinner', () => Vue.nextTick().then(() => {
        expect(component.$el.querySelector('.loading-spinner')).to.exist;
      }));
    });

    describe('after jobs are loaded', () => {
      // given
      const veryYoungProposal = buildJobFixture('1', 'Very young proposal', 'proposal_sent', '2037-10-01', 'Australia', 'Delivery');
      const oldMission = buildJobFixture('2', 'Old mission', 'mission_signed', '2017-10-02', 'Australia', 'Consulting');
      const youngProposal = buildJobFixture('3', 'Young proposal', 'proposal_sent', '2027-10-03', 'Australia', 'Delivery');
      const todayMission = buildJobFixture('4', 'Today\'s mission', 'mission_signed', '2017-10-04', 'Australia', 'Delivery');
      const italianJob = buildJobFixture('4', 'Today\'s mission', 'mission_signed', '2017-10-04', 'Italy', 'Delivery');
      const proposalJob = buildJobFixture('4', 'Today\'s mission', 'proposal_in_progress', '2017-10-04', 'Australia', 'Delivery');
      const trainingJob = buildJobFixture('1', 'Very old mission', 'proposal_sent', '2017-10-01', 'Australia', 'Training');

      const fetchedJobs = [youngProposal, veryYoungProposal, trainingJob, oldMission, todayMission, italianJob, proposalJob];
      const countryJobs = [youngProposal, veryYoungProposal, trainingJob, oldMission, todayMission, proposalJob];
      const statusJobs = [youngProposal, veryYoungProposal, trainingJob, oldMission, todayMission];
      const missionTypeJobs = [youngProposal, veryYoungProposal, oldMission, todayMission];
      const sortedJobs = [oldMission, todayMission, youngProposal, veryYoungProposal];
      let clock;

      beforeEach(() => {
        sinon.stub(authenticationService, 'getAccessToken').returns('accessToken');
        sinon.stub(jobsApi, 'fetchAll').resolves(fetchedJobs);
        sinon.stub(countryFilter, 'filter').returns(countryJobs);
        sinon.stub(statusFilter, 'filter').returns(statusJobs);
        sinon.stub(missionTypeFilter, 'filter').returns(missionTypeJobs);
        sinon.stub(jobsSorter, 'sort').returns(sortedJobs);
        clock = sinon.useFakeTimers(new Date(2017, 9, 4).getTime());

        // when
        component = new Constructor().$mount();
      });

      afterEach(() => {
        clock.restore();
        authenticationService.getAccessToken.restore();
        jobsApi.fetchAll.restore();
        countryFilter.filter.restore();
        statusFilter.filter.restore();
        missionTypeFilter.filter.restore();
        jobsSorter.sort.restore();
      });

      it('should call jobsApi fetchAll with accessToken', () => {
        expect(jobsApi.fetchAll).to.have.been.calledWith('accessToken');
      });

      it('should add fetchedJobs into jobsFromApi', () => Vue.nextTick().then(() => {
        expect(component.$data.jobsFromApi).to.equal(fetchedJobs);
      }));

      it('should put isLoading to false after all', () => Vue.nextTick().then(() => {
        expect(component.$data.isLoading).to.equal(false);
      }));

      it('should call countryFilter filter with fetchedJobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(countryFilter.filter).to.have.been.calledWith(fetchedJobs, 'anyCountry');
      })));

      it('should call statusFilter filter with countryJobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(statusFilter.filter).to.have.been.calledWith(countryJobs, 'anyStatus');
      })));

      it('should call jobsSorter sort with statusJobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(missionTypeFilter.filter).to.have.been.calledWith(statusJobs, ['Delivery', 'Consulting']);
      })));

      it('should call jobsSorter sort with missionTypeJobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(jobsSorter.sort).to.have.been.calledWith(missionTypeJobs, moment());
      })));

      it('should render as many jobs as received from the API', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        const jobCards = component.$el.querySelectorAll('.job-card');
        expect(jobCards.length).to.equal(4);
      })));

      it('should add number of available jobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(component.$el.querySelector('.job-results__title').textContent.trim()).to.equal('Jobs à staffer (4)');
      })));

      it('should sort the mission jobs by status and by staffing needed date', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        const jobTitles = component.$el.querySelectorAll('.job__title');
        expect(jobTitles[0].textContent).to.equal('Old mission');
        expect(jobTitles[1].textContent).to.equal('Today\'s mission');
        expect(jobTitles[2].textContent).to.equal('Young proposal');
        expect(jobTitles[3].textContent).to.equal('Very young proposal');
      })));
    });
  });

  describe('onSelectedAvailabilityDate', () => {
    it('should set data Date with selectedDate', () => {
      // given
      const date = new Date();

      // when
      component.onSelectedAvailabilityDate(date);

      // then
      expect(component.$data.availabilityDate).to.equal(date);
    });
  });

  describe('onSelectedCountry', () => {
    it('should set data Country with selectedCountry', () => {
      // when
      component.onSelectedCountry('France');

      // then
      expect(component.$data.country).to.equal('France');
    });
  });

  describe('onSelectedMissionType', () => {
    it('should set data MissionType with selectedMissionType', () => {
      // when
      component.onSelectedMissionType(['Delivery', 'Training']);

      // then
      expect(component.$data.missionType).to.deep.equal(['Delivery', 'Training']);
    });
  });

  describe('onSelectedStatus', () => {
    it('should set data Status with selectedStatus', () => {
      // when
      component.onSelectedStatus('proposals');

      // then
      expect(component.$data.status).to.equal('proposals');
    });
  });
});
