const request = require('request');
const OctopodClient = require('../../../src/infrastructure/octopod');
const { expect, sinon } = require('../../test-helper');

describe('Unit | Utils | octopod-client', () => {
  beforeEach(() => {
    sinon.stub(request, 'post');
    sinon.stub(request, 'get');
  });

  afterEach(() => {
    request.post.restore();
    request.get.restore();
  });

  /**
   * #getAccessToken
   * ---------------
   */

  describe('#getAccessToken', () => {
    describe('with a successful request', () => {
      beforeEach(() => {
        request.post.callsFake((options, callback) => {
          const httpResponse = {
            body: JSON.stringify({
              access_token: 'fakeAccessToken',
              token_type: 'bearer',
              expires_in: 7200,
              created_at: 1497621634,
            }),
          };
          callback(null, httpResponse);
        });
      });

      it('should call Octopod API "POST /oauth/token"', () => {
        // when
        const promise = OctopodClient.getAccessToken();

        // then
        return promise.then(() => {
          const expectedOptions = {
            url: 'http://octopod.url/api/oauth/token',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
            },
            form: {
              grant_type: 'client_credentials',
              client_id: 'octopod-client-id',
              client_secret: 'octopod-client-secret',
            },
          };
          expect(request.post).to.have.been.calledWith(expectedOptions);
        });
      });

      it('should return a resolved promise', () => {
        // when
        const promise = OctopodClient.getAccessToken();

        // then
        return promise.then((accessToken) => {
          expect(accessToken).to.equal('fakeAccessToken');
        });
      });
    });

    describe('with an error', () => {
      beforeEach(() => {
        request.post.callsFake((options, callback) => {
          callback(new Error('Some error message'), null);
        });
      });

      it('should return a rejected promise', (done) => {
        // when
        const promise = OctopodClient.getAccessToken();

        // then
        promise
          .catch((err) => {
            expect(err.message).to.equal('Some error message');
            done();
          });
      });
    });
  });

  /**
   * #fetchProjectsToBeStaffed
   * -------------------------
   */

  describe('#fetchProjectsToBeStaffed', () => {
    const octopodProjects = [{
      id: 1,
      name: 'job 1',
    }, {
      id: 2,
      name: 'job 2',
    }];

    beforeEach(() => {
      request.get.callsFake((options, callback) => {
        const httpResponse = {
          body: JSON.stringify(octopodProjects),
        };
        callback(null, httpResponse);
      });
    });

    it('should return projects in a a promise', () => {
      // when
      const promise = OctopodClient.fetchProjectsToBeStaffed();

      // then
      return promise
        .then((projects) => {
          expect(projects).to.deep.equal(octopodProjects);
        });
    });

    it('should call Octopod API "GET /projects"', () => {
      // given
      const accessToken = 'access-token';

      // when
      const promise = OctopodClient.fetchProjectsToBeStaffed(accessToken);

      // then
      return promise.then(() => {
        const expectedOptions = {
          url: 'http://octopod.url/api/v0/projects?staffing_needed=true&page=1&per_page=50',
          headers: {
            Authorization: 'Bearer access-token',
          },
        };
        expect(request.get).to.have.been.calledWith(expectedOptions);
      });
    });

    it('should return a rejected promise when the call to Octopod API fails', () => {
      // given
      request.get.callsFake((options, callback) => {
        callback(new Error('some error'));
      });

      // when
      const promise = OctopodClient.fetchProjectsToBeStaffed();

      // then
      return promise.catch((err) => {
        expect(err).to.exist;
        expect(err.message).to.equal('some error');
      });
    });
  });

  /**
   * #fetchActivitiesToBeStaffed
   * ---------------------------
   */

  describe('#fetchActivitiesToBeStaffed', () => {
    const accessToken = 'access-token';
    const projects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    beforeEach(() => {
      request.get.callsFake((options, callback) => {
        const projectActivities = [
          [{ id: 11, staffing_needed_from: true }],
          [{ id: 21, staffing_needed_from: true }, { id: 22, staffing_needed_from: false }],
          [{ id: 31, staffing_needed_from: true }, { id: 32, staffing_needed_from: false }, { id: 33, staffing_needed_from: true }],
          [],
          [{ id: 31, staffing_needed_from: false }, { id: 32, staffing_needed_from: false }, { id: 33, staffing_needed_from: false }],
        ];

        const url = options.url;
        const urlParts = url.split('/');
        const projectId = urlParts[6] - 1;

        callback(null, {
          body: JSON.stringify(projectActivities[projectId]),
        });
      });
    });

    it('should return a promise resolved with activities', () => {
      // when
      const promise = OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects);

      // then
      return promise.then((activities) => {
        expect(activities).to.have.lengthOf(4);
      });
    });

    it('should call Octopod API "GET /projects/{id}/activities" as many times as number of projects', () => {
      // when
      const promise = OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects);

      // then
      return promise.then(() => {
        expect(request.get).to.have.callCount(5);
      });
    });

    it('should not return activities that are not flagged as "staffing needed"', () => {
      // when
      const promise = OctopodClient.fetchActivitiesToBeStaffed(accessToken, projects);

      // then
      return promise.then((activities) => {
        expect(activities).to.have.lengthOf(4);
      });
    });
  });
});
