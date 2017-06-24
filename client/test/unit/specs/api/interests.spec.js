import axios from 'axios';
import api from '@/api/interests';

describe('Unit | API | interests api', () => {

  describe('#sendInterest', () => {

    beforeEach(() => {

      const stubbedResponse = {
        status: 200,
        data: {
          foo: 'bar',
        },
      };
      sinon.stub(axios, 'post').resolves(stubbedResponse);

    });

    afterEach(() => {

      axios.post.restore();

    });

    it('should post interests to API with the good params', () => {

      // given
      const consultant = {
        name: 'Samurai Jack',
        email: 'sjack@octo.com',
      };
      const accessToken = 'valid-access-token';

      const expectedUrl = 'http://localhost:3000/api/interests';
      const body = {
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
      const expectedOptions = {
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
      };
      const job = {
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
          start_date: 'juillet 2017',
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

      // when
      const promise = api.sendInterest(job, consultant, accessToken);

      // then
      return promise.then(() => {

        expect(axios.post).to.have.been.calledWith(expectedUrl, expectedOptions);

      });

    });

  });

});
