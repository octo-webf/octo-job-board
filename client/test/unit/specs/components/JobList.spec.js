import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import JobList from '@/components/JobList';
import jobsSorter from '@/utils/jobsSorter';
import authentication from '@/services/authentication';
import jobsApi from '@/api/jobs';
import jobFixture from './fixtures/job.fixture';

Vue.use(VueAnalytics, {
  id: `${process.env.ANALYTICS_ID}`,
});

function getJobCardsCount(component) {
  const jobCards = component.$el.querySelectorAll('.job-card');
  return jobCards.length;
}

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
  let expectedJobs;
  const Constructor = Vue.extend(JobList);

  beforeEach(() => {
    // given
    sinon.stub(authentication, 'isAuthenticated').returns(true);
  });

  afterEach(() => {
    authentication.isAuthenticated.restore();
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
      expect(authentication.isAuthenticated).to.have.been.called;
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
      beforeEach(() => {
        // given
        const job2 = buildJobFixture(2, 'Tech Lead mission 2', 'mission_signed');
        const job1 = buildJobFixture(1, 'Tech Lead mission 1', 'proposal_sent');
        expectedJobs = [job2, job1];
        const fetchedJobs = [job1, job2];
        sinon.stub(jobsSorter, 'sort').returns(expectedJobs);
        sinon.stub(jobsApi, 'fetchAll').resolves(fetchedJobs);

        // when
        component = new Constructor().$mount();
      });

      afterEach(() => {
        jobsSorter.sort.restore();
        jobsApi.fetchAll.restore();
      });

      it('should render as many jobs as received from the API', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        const jobCards = component.$el.querySelectorAll('.job-card');
        expect(jobCards.length).to.equal(2);
      })));

      it('should add number of available jobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(component.$el.querySelector('.job-results__title').textContent.trim()).to.equal('Missions à staffer (2)');
      })));

      it('should sort the mission jobs', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        const jobTitles = component.$el.querySelectorAll('.job__title');
        expect(jobTitles[0].textContent).to.equal('Tech Lead mission 2');
        expect(jobTitles[1].textContent).to.equal('Tech Lead mission 1');
      })));
    });

    describe('after jobs are loaded with different status and staffing needed dates', () => {
      beforeEach(() => {
        // given
        const veryOldJob = buildJobFixture('1', 'Very old mission', 'proposal_sent', '2017-10-01');
        const oldJob = buildJobFixture('2', 'Old mission', 'mission_signed', '2017-10-02');
        const yesterdayJob = buildJobFixture('3', 'Yesterday\'s mission', 'proposal_sent', '2017-10-03');
        const todayJob = buildJobFixture('4', 'Today\'s mission', 'mission_signed', '2017-10-04');
        const jobs = [yesterdayJob, veryOldJob, oldJob, todayJob];
        const sortedJobs = [todayJob, oldJob, yesterdayJob, veryOldJob];

        sinon.stub(jobsSorter, 'sort').returns(sortedJobs);
        sinon.stub(jobsApi, 'fetchAll').resolves(jobs);

        // when
        component = new Constructor().$mount();
      });

      afterEach(() => {
        jobsSorter.sort.restore();
        jobsApi.fetchAll.restore();
      });

      it('should sort the mission jobs by status and by staffing needed date', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        const jobTitles = component.$el.querySelectorAll('.job__title');
        expect(jobTitles[0].textContent).to.equal('Today\'s mission');
        expect(jobTitles[1].textContent).to.equal('Old mission');
        expect(jobTitles[2].textContent).to.equal('Yesterday\'s mission');
        expect(jobTitles[3].textContent).to.equal('Very old mission');
      })));
    });


    describe('after jobs are loaded, a country filter is applied', () => {
      beforeEach(() => {
        // given
        const australianJob = jobFixture();
        australianJob.project.customer.sector.name = 'Australia';
        const frenchJob = jobFixture();
        frenchJob.project.customer.sector.name = 'FR - La Poste';
        expectedJobs = [australianJob, frenchJob];
        sinon.stub(jobsSorter, 'sort').returns(expectedJobs);
        sinon.stub(jobsApi, 'fetchAll').resolves([jobFixture(), jobFixture()]);

        // when
        component = new Constructor().$mount();
      });

      afterEach(() => {
        jobsSorter.sort.restore();
        jobsApi.fetchAll.restore();
      });

      it('should render as many jobs as received from the API', () => Vue.nextTick().then(() => Vue.nextTick().then(() => {
        expect(getJobCardsCount(component)).to.equal(2);
      })));

      describe('when selecting jobs in France and overseas', () => {
        it('should display the two listed jobs', () => Vue.nextTick().then(() => {
          // When
          component.onSelectedCountry('anyCountry');
          // Then
          return Vue.nextTick().then(() => {
            expect(getJobCardsCount(component)).to.equal(2);
          });
        }));
      });

      describe('when selecting only jobs in France', () => {
        it('should only display one job', () => Vue.nextTick().then(() => {
          // When
          component.onSelectedCountry('France');
          // Then
          return Vue.nextTick().then(() => {
            expect(getJobCardsCount(component)).to.equal(1);
          });
        }));
      });

      describe('when selecting only jobs in Australia', () => {
        it('should only display one job', () => Vue.nextTick().then(() => {
          // When
          component.onSelectedCountry('Australia');
          // Then
          return Vue.nextTick().then(() => {
            expect(getJobCardsCount(component)).to.equal(1);
          });
        }));
      });

      describe('when selecting only jobs in Morocco', () => {
        it('should not display any job', () => Vue.nextTick().then(() => {
          // When
          component.onSelectedCountry('Maroc');
          // Then
          return Vue.nextTick().then(() => {
            expect(getJobCardsCount(component)).to.equal(0);
          });
        }));
      });

      describe('when selecting only jobs in Switzerland', () => {
        it('should not display any job', () => Vue.nextTick().then(() => {
          // When
          component.onSelectedCountry('Suisse');
          // Then
          return Vue.nextTick().then(() => {
            expect(getJobCardsCount(component)).to.equal(0);
          });
        }));
      });
    });
  });
});
