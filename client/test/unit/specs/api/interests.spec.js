import axios from 'axios';
import api from '@/api/interests';

describe('Unit | API | interests api', () => {
  describe('#sendInterest', () => {
    let job;
    const consultant = {
      name: 'Samurai Jack',
      email: 'sjack@octo.com',
    };
    const accessToken = 'access-token';

    const expectedUrl = 'http://localhost:3000/api/interests';
    let expectedBody;
    const expectedOptions = { headers: { Authorization: `Bearer ${accessToken}` } };


    beforeEach(() => {
      const stubbedResponse = {
        status: 200,
        data: {
          foo: 'bar',
        },
      };
      sinon.stub(axios, 'post').resolves(stubbedResponse);

      job = {
        id: 2,
        activity: {
          title: 'Tech Lead',
        },
        project: {
          id: 123456,
          status: 'proposal-in-progress',
          name: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
          customer: {
            name: 'La Poste - Courrier',
          },
          staffing_needed_from: 'juillet 2017',
          duration: '10 mois',
          location: 'OCTO',
          business_contact: {
            nickname: 'ABC',
          },
          mission_director: {
            nickname: 'XYZ',
          },
        },
      };
      expectedBody = {
        interestedConsultant: {
          name: 'Samurai Jack',
          email: 'sjack@octo.com',
        },
        businessContactNickname: 'ABC',
        missionDirectorNickname: 'XYZ',
        octopodLink: 'https://octopod.octo.com/projects/123456',
        activityName: 'Tech Lead',
        missionName: 'SCLOU - Cloud computing : enjeux, architecture et gouvernance du IaaS, CaaS, PaaS INTER 2017',
      };
    });

    afterEach(() => {
      axios.post.restore();
    });

    it('should post interests to API with the good params', () => {
      // when
      const promise = api.sendInterest(job, consultant, accessToken);

      // then
      return promise.then(() => {
        expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody, expectedOptions);
      });
    });

    it('should post interest with "N/A" when project has no business contact', () => {
      // given
      delete job.project.business_contact;
      expectedBody.businessContactNickname = 'N/A';

      // when
      const promise = api.sendInterest(job, consultant, accessToken);

      // then
      return promise.then(() => {
        expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody, expectedOptions);
      });
    });

    it('should post interest with "N/A" when project has no director contact', () => {
      // given
      delete job.project.mission_director;
      expectedBody.missionDirectorNickname = 'N/A';

      // when
      const promise = api.sendInterest(job, consultant, accessToken);

      // then
      return promise.then(() => {
        expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody, expectedOptions);
      });
    });

    it('should return a rejected promise when an error is thrown', (done) => {
      // given
      axios.post.rejects(new Error('some error'));

      // when
      const promise = api.sendInterest(job, consultant, accessToken);

      // then
      promise.catch((error) => {
        expect(error.message).to.equal('some error');
        done();
      });
    });
  });
});
