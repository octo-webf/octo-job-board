const { sinon, expect } = require('../../../test-helper');
const jobService = require('../../../../src/domain/services/job-service');
const octopodClient = require('../../../../src/infrastructure/octopod-client');
const jobsSerializer = require('../../../../src/infrastructure/serializers/jobs');
const cache = require('../../../../src/infrastructure/cache');
const { Subscription } = require('../../../../src/domain/models');
const mailService = require('../../../../src/domain/services/mail-service');
const projectFromOctopod = require('../../fixtures/projectFromOctopod');

const CACHE_KEY = 'get_jobs';

describe('Unit | Service | job-service', () => {
  let sandbox;

  const stubbedAccessToken = 'octopod-access-token';
  const stubbedFetchedProjects = ['project_1', 'project_2', 'project_3'];
  const stubbedFetchedActivities = ['activity_1', 'activity_2', 'activity_3'];
  const stubbedSerializedJobs = [{
    project: { id: 'still_available_job_project' },
    activity: { id: 'still_available_job_activity' },
  }, {
    project: { id: 'new_available_job_project_1' },
    activity: { id: 'new_available_job_activity_1' },
  }, {
    project: { id: 'new_available_job_project_2' },
    activity: { id: 'new_available_job_activity_2' },
  }];

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(octopodClient, 'getAccessToken').resolves(stubbedAccessToken);
    sandbox.stub(octopodClient, 'fetchProjectsToBeStaffed').resolves(stubbedFetchedProjects);
    sandbox.stub(octopodClient, 'fetchActivitiesToBeStaffed').resolves(stubbedFetchedActivities);
    sandbox.stub(jobsSerializer, 'serialize').returns(stubbedSerializedJobs);
    sandbox.stub(cache, 'set');
    sandbox.stub(cache, 'get');
    sandbox.stub(Subscription, 'all');
    sandbox.stub(mailService, 'sendJobsAddedEmail').callsFake(report => report);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#getJobs', () => {
    it('should return jobs from the cache if they were previously cached (without calling Octopod)', () => {
      // given
      cache.get.returns(stubbedSerializedJobs);

      // when
      const promise = jobService.getJobs();

      // then
      return promise.then((jobs) => {
        expect(jobs).to.deep.equal(stubbedSerializedJobs);
        expect(cache.get).to.have.been.calledWith(CACHE_KEY);
        expect(octopodClient.getAccessToken).to.have.not.been.called;
        expect(octopodClient.fetchProjectsToBeStaffed).to.have.not.been.called;
        expect(octopodClient.fetchActivitiesToBeStaffed).to.have.not.been.called;
        expect(jobsSerializer.serialize).to.have.not.been.called;
        expect(cache.set).to.have.not.been.called;
      });
    });

    it('should return jobs after having them fetched from Octopod and cached if they were not yet previously cached', () => {
      // given
      cache.get.returns(null);

      // when
      const promise = jobService.getJobs();

      // then
      return promise.then((jobs) => {
        expect(jobs).to.deep.equal(stubbedSerializedJobs);
      });
    });
  });

  describe('#_fetchAndCacheJobs', () => {
    let promise;

    beforeEach(() => {
      promise = jobService._fetchAndCacheJobs();
    });

    it('should call Octopod to get an access_token', () => promise.then(() => {
      expect(octopodClient.getAccessToken).to.have.been.called;
    }));

    it('should call Octopod to fetch projects to be staffed', () => promise.then(() => {
      expect(octopodClient.fetchProjectsToBeStaffed).to.have.been.calledWith(stubbedAccessToken);
    }));

    it('should call Octopod to fetch activities to be staffed with filtered projects - only proposal sent and mission accepted and signed', () => {
      // given
      octopodClient.fetchProjectsToBeStaffed.restore();

      const projectsFromOctopod = [
        projectFromOctopod('proposal_sent'),
        projectFromOctopod('proposal_in_progress'),
        projectFromOctopod('lead'),
        projectFromOctopod('mission_accepted'),
        projectFromOctopod('mission_signed'),
        projectFromOctopod('mission_done'),
        projectFromOctopod('proposal_lost'),
        projectFromOctopod('proposal_canceled_by_client'),
        projectFromOctopod('proposal_no_go'),
      ];
      const expectedProjectsFromOctopod = [
        projectFromOctopod('proposal_sent'),
        projectFromOctopod('mission_accepted'),
        projectFromOctopod('mission_signed'),
      ];
      sinon.stub(octopodClient, 'fetchProjectsToBeStaffed').resolves(projectsFromOctopod);

      // when
      promise.then(() => {
        // then
        expect(octopodClient.fetchActivitiesToBeStaffed).to.have.been.calledWith(stubbedAccessToken, expectedProjectsFromOctopod);
      });
    });

    it('should call Octopod to fetch activities to be staffed with filtered project - only "Regie (cost_reimbursable) and Forfait (fixed price)"', () => {
      // given
      octopodClient.fetchProjectsToBeStaffed.restore();
      const projectsFromOctopod = [
        projectFromOctopod('mission_signed', 'internal'),
        projectFromOctopod('mission_signed', 'cost_reimbursable'),
        projectFromOctopod('mission_signed', 'fixed_price'),
        projectFromOctopod('mission_signed', 'framework_agreement'),
      ];

      const expectedProjectsFromOctopod = [
        projectFromOctopod('mission_signed', 'cost_reimbursable'),
        projectFromOctopod('mission_signed', 'fixed_price'),
      ];
      sinon.stub(octopodClient, 'fetchProjectsToBeStaffed').resolves(projectsFromOctopod);

      // when
      promise.then(() => {
        // then
        expect(octopodClient.fetchActivitiesToBeStaffed).to.have.been.calledWith(stubbedAccessToken, expectedProjectsFromOctopod);
      });
    });

    it('should build jobs by merging fetched projects and activities', () => promise.then(() => {
      expect(jobsSerializer.serialize).to.have.been.calledWith(stubbedFetchedProjects, stubbedFetchedActivities);
    }));

    it('should cache the jobs (without expiration age)', () => promise.then(() => {
      expect(cache.set).to.have.been.calledWith(CACHE_KEY, stubbedSerializedJobs);
    }));

    it('should return the jobs', () => promise.then((jobs) => {
      expect(jobs).to.deep.equal(stubbedSerializedJobs);
    }));
  });

  describe('#_compareFetchedAndCachedJobs', () => {
    it('should return a report with "isInit" set to true when old jobs are undefined (no job was previsouly stored in cache)', () => {
      // given
      const freshJobs = [{ activity: { id: 1 } }, { activity: { id: 2 } }, { activity: { id: 3 } }];
      const oldJobs = null;

      // when
      const promise = jobService._compareFetchedAndCachedJobs(freshJobs, oldJobs);

      // then
      return promise.then((report) => {
        expect(report).to.deep.equal({ isInit: true, hasNewJobs: false });
      });
    });

    it('should return a report with "hasNewJobs" set to false when fresh jobs are undefined', () => {
      // given
      const freshJobs = null;
      const oldJobs = [{ activity: { id: 1 } }, { activity: { id: 2 } }, { activity: { id: 3 } }];

      // when
      const promise = jobService._compareFetchedAndCachedJobs(freshJobs, oldJobs);

      // then
      return promise.then((report) => {
        expect(report).to.deep.equal({ isInit: false, hasNewJobs: false });
      });
    });

    it('should return a report with "hasNewJobs" set to false if old jobs are equal to fresh jobs', () => {
      // given
      const jobs = [{ activity: { id: 1 } }, { activity: { id: 2 } }, { activity: { id: 3 } }];

      // when
      const promise = jobService._compareFetchedAndCachedJobs(jobs, jobs);

      // then
      return promise.then((report) => {
        expect(report).to.deep.equal({ isInit: false, hasNewJobs: false, addedJobs: [] });
      });
    });

    it('should return a report with added jobs', () => {
      // given
      const job1 = { activity: { id: 1 } };
      const job2 = { activity: { id: 2 } };
      const job3 = { activity: { id: 3 } };
      const job4 = { activity: { id: 4 } };
      const job5 = { activity: { id: 5 } };

      const oldJobs = [job1, job2, job3];
      const freshJobs = [job2, job3, job4, job5];
      const expectedAddedJobs = [job4, job5];

      // when
      const promise = jobService._compareFetchedAndCachedJobs(freshJobs, oldJobs);

      // then
      return promise.then((report) => {
        expect(report).to.deep.equal({ isInit: false, hasNewJobs: true,  addedJobs: expectedAddedJobs, });
      });
    });
  });

  describe('#synchronizeJobs', () => {
    describe('when it is the first sync (i.e. cache value does not yet exist)', () => {
      let promise;

      beforeEach(() => {
        cache.get.returns(null);
        promise = jobService.synchronizeJobs();
      });

      it('should return a fulfilled promise with data property "isInit" set to true', () => promise.then(({ isInit }) => {
        expect(isInit).to.be.true;
      }));

      it('should return a fulfilled promise with data properties "addedJobs" undefined', () => promise.then(({ addedJobs }) => {
        expect(addedJobs).to.be.undefined;
      }));

      it('should cache the jobs freshly fetched from Octopod', () => promise.then(() => {
        expect(cache.set).to.have.been.calledWith(CACHE_KEY, stubbedSerializedJobs);
      }));
    });

    describe('when it is not the first sync (i.e. cache value was previously set)', () => {
      let promise;

      beforeEach(() => {
        // given
        cache.get.returns([{
          // job still available
          project: { id: 'still_available_job_project' },
          activity: { id: 'still_available_job_activity' },
        }, {
          // job already staffed
          project: { id: 'removed_job_project' },
          activity: { id: 'removed_job_activity' },
        }]);

        Subscription.all.resolves([{ get: () => 'recipient@octo.com' }]);

        // when
        promise = jobService.synchronizeJobs();
      });

      it('should return a fulfilled promise with data properties "addedJobs" valued', () => promise.then(({ isInit, hasNewJobs, addedJobs }) => {
        expect(isInit).to.be.false;
        expect(hasNewJobs).to.be.true;
        expect(addedJobs).to.deep.equal([{
          project: { id: 'new_available_job_project_1' },
          activity: { id: 'new_available_job_activity_1' },
        }, {
          project: { id: 'new_available_job_project_2' },
          activity: { id: 'new_available_job_activity_2' },
        }]);
      }));

      it('should update the cached jobs freshly fetched', () => promise.then(() => {
        expect(cache.set).to.have.been.calledWith(CACHE_KEY, stubbedSerializedJobs);
      }));
    });
  });
});

