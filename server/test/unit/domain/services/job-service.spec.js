const { sinon, expect } = require('../../../test-helper');
const jobService = require('../../../../src/domain/services/job-service');
const octopodClient = require('../../../../src/infrastructure/octopod');
const jobsSerializer = require('../../../../src/infrastructure/serializers/jobs');
const cache = require('../../../../src/infrastructure/cache');

describe('Unit | Service | job-service', () => {
  let sandbox;

  const stubbedAccessToken = 'octopod-access-token';
  const stubbedFetchedProjects = ['project_1', 'project_2', 'project_3'];
  const stubbedFetchedActivities = ['activity_1', 'activity_2', 'activity_3'];
  const stubbedSerializedJobs = [{
    project: { id: 'A' },
    activity: { id: 1 },
  }, {
    project: { id: 'B' },
    activity: { id: 2 },
  }, {
    project: { id: 'C' },
    activity: { id: 3 },
  }];

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(octopodClient, 'getAccessToken').resolves(stubbedAccessToken);
    sandbox.stub(octopodClient, 'fetchProjectsToBeStaffed').resolves(stubbedFetchedProjects);
    sandbox.stub(octopodClient, 'fetchActivitiesToBeStaffed').resolves(stubbedFetchedActivities);
    sandbox.stub(jobsSerializer, 'serialize').returns(stubbedSerializedJobs);
    sandbox.stub(cache, 'set');
    sandbox.stub(cache, 'get');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#getJobs', () => {
    it('should exist', () => {
      expect(jobService.getJobs).to.exist;
    });

    it('should return jobs from the cache if they were previously cached (without calling Octopod)', () => {
      // given
      cache.get.returns(stubbedSerializedJobs);

      // when
      const promise = jobService.getJobs();

      // then
      return promise.then((jobs) => {
        expect(jobs).to.deep.equal(stubbedSerializedJobs);
        expect(cache.get).to.have.been.calledWith('get_jobs');
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

  describe('#fetchAndCacheJobs', () => {
    let promise;

    beforeEach(() => {
      promise = jobService.fetchAndCacheJobs();
    });

    it('should exist', () => {
      expect(jobService.fetchAndCacheJobs).to.exist;
    });

    it('should call Octopod to get an access_token', () => promise.then(() => {
      expect(octopodClient.getAccessToken).to.have.been.called;
    }));

    it('should call Octopod to fetch projects to be staffed', () => promise.then(() => {
      expect(octopodClient.fetchProjectsToBeStaffed).to.have.been.calledWith(stubbedAccessToken);
    }));

    it('should call Octopod to fetch activities to be staffed', () => promise.then(() => {
      expect(octopodClient.fetchActivitiesToBeStaffed).to.have.been.calledWith(stubbedAccessToken, stubbedFetchedProjects);
    }));

    it('should build jobs by merging fetched projects and activities', () => promise.then(() => {
      expect(jobsSerializer.serialize).to.have.been.calledWith(stubbedFetchedProjects, stubbedFetchedActivities);
    }));

    it('should cache the jobs (without expiration age)', () => promise.then(() => {
      expect(cache.set).to.have.been.calledWith('get_jobs', stubbedSerializedJobs);
    }));

    it('should return the jobs', () => promise.then((jobs) => {
      expect(jobs).to.deep.equal(stubbedSerializedJobs);
    }));
  });

  describe('#synchronizeJobs', () => {
    it('should exist', () => {
      expect(jobService.synchronizeJobs).to.exist;
    });

    describe('when it is the first sync (i.e. cache value does not yet exist)', () => {
      let promise;

      beforeEach(() => {
        cache.get.returns(null);
        promise = jobService.synchronizeJobs();
      });

      it('should return a fulfilled promise with data property "isInit" set to true', () => promise.then(({ isInit }) => {
        expect(isInit).to.be.true;
      }));

      it('should return a fulfilled promise with data properties "addedJobs" and "removedJobs" undefined', () => promise.then(({ addedJobs, removedJobs }) => {
        expect(addedJobs).to.be.undefined;
        expect(removedJobs).to.be.undefined;
      }));

      it('should cache the jobs freshly fetched from Octopod', () => promise.then(() => {
        expect(cache.set).to.have.been.calledWith('get_jobs', stubbedSerializedJobs);
      }));
    });

    describe('when it is not the first sync (i.e. cache value was previously set)', () => {
      let promise;

      beforeEach(() => {
        cache.get.returns([{
          // job still available
          project: { id: 'A' },
          activity: { id: 1 },
        }, {
          // job already staffed
          project: { id: 'Z' },
          activity: { id: 999 },
        }]);
        promise = jobService.synchronizeJobs();
      });

      it('should return a fulfilled promise with data property "isInit" set to false', () => promise.then(({ isInit }) => {
        expect(isInit).to.be.false;
      }));

      it('should return a fulfilled promise with data property "jobs" containing all the current available jobs', () => promise.then(({ jobs }) => {
        expect(jobs).to.deep.equal(stubbedSerializedJobs);
      }));

      it('should return a fulfilled promise with data properties "addedJobs" and "removedJobs" valued', () => promise.then(({ addedJobs, removedJobs }) => {
        expect(addedJobs).to.deep.equal([{
          project: { id: 'B' },
          activity: { id: 2 },
        }, {
          project: { id: 'C' },
          activity: { id: 3 },
        }]);
        expect(removedJobs).to.deep.equal([{
          project: { id: 'Z' },
          activity: { id: 999 },
        }]);
      }));

      it('should update the cached jobs freshly fetched', () => promise.then(() => {
        expect(cache.set).to.have.been.calledWith('get_jobs', stubbedSerializedJobs);
      }));
    });
  });
});

