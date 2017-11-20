import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import moment from 'moment';
import JobList from '@/components/JobList';
import jobsSorter from '@/utils/jobsSorter';
import countryFilter from '@/utils/countryFilter';
import authenticationService from '@/services/authentication';
import jobsApi from '@/api/jobs';
import jobFixture from '../fixtures/job.fixture';

Vue.use(VueAnalytics, {
  id: `${process.env.ANALYTICS_ID}`,
});

function buildJobFixture(id, title, status, staffingNeededFrom) {
  const activity = {
    title,
    staffing_needed_from: staffingNeededFrom,
  };
  const job = jobFixture({ id, activity });
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
    // TODO check that interest modal use chosenJob

    it('should have a date picker', () => {
      const datePicker = component.$el.querySelectorAll('.date-picker');
      expect(datePicker.length).to.equal(1);
    });

    it('should have a country picker', () => {
      const countryPicker = component.$el.querySelectorAll('.country-picker');
      expect(countryPicker.length).to.equal(1);
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
      const veryOldJob = buildJobFixture('1', 'Very old mission', 'proposal_sent', '2017-10-01');
      const oldJob = buildJobFixture('2', 'Old mission', 'mission_signed', '2017-10-02');
      const yesterdayJob = buildJobFixture('3', 'Yesterday\'s mission', 'proposal_sent', '2017-10-03');
      const todayJob = buildJobFixture('4', 'Today\'s mission', 'mission_signed', '2017-10-04');
      const italianJob = buildJobFixture('4', 'Today\'s mission', 'mission_signed', '2017-10-04');

      const fetchedJobs = [yesterdayJob, veryOldJob, oldJob, todayJob, italianJob];
      const countryJobs = [yesterdayJob, veryOldJob, oldJob, todayJob];
      const sortedJobs = [todayJob, oldJob, yesterdayJob, veryOldJob];
      let clock;

      beforeEach(() => {
        sinon.stub(authenticationService, 'getAccessToken').returns('accessToken');
        sinon.stub(jobsApi, 'fetchAll').resolves(fetchedJobs);
        sinon.stub(countryFilter, 'filter').returns(countryJobs);
        sinon.stub(jobsSorter, 'sort').returns([]).returns(sortedJobs);
        clock = sinon.useFakeTimers(new Date(2017, 9, 4).getTime());

        // when
        component = new Constructor().$mount();
      });

      afterEach(() => {
        clock.restore();
        authenticationService.getAccessToken.restore();
        jobsApi.fetchAll.restore();
        countryFilter.filter.restore();
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
        expect(countryFilter.filter).to.have.been.calledWith([], 'anyCountry');
        expect(countryFilter.filter).to.have.been.calledWith(fetchedJobs, 'anyCountry');
      })));

      it('should call jobsSorter sort with countryJobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(jobsSorter.sort).to.have.been.calledTwice;
        expect(jobsSorter.sort).to.have.been.calledWith(countryJobs, moment());
        expect(jobsSorter.sort).to.have.been.calledWith(countryJobs, moment());
      })));

      it('should render as many jobs as received from the API', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        const jobCards = component.$el.querySelectorAll('.job-card');
        expect(jobCards.length).to.equal(4);
      })));

      it('should add number of available jobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(component.$el.querySelector('.job-results__title').textContent.trim()).to.equal('Missions à staffer (4)');
      })));

      it('should sort the mission jobs by status and by staffing needed date', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        const jobTitles = component.$el.querySelectorAll('.job__title');
        expect(jobTitles[0].textContent).to.equal('Today\'s mission');
        expect(jobTitles[1].textContent).to.equal('Old mission');
        expect(jobTitles[2].textContent).to.equal('Yesterday\'s mission');
        expect(jobTitles[3].textContent).to.equal('Very old mission');
      })));
    });
  });
});
