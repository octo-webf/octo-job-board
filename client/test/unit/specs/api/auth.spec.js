import axios from 'axios';
import api from '@/api/auth';

describe('Unit | API | auth api', () => {
  describe('#verifyIdTokenAndGetAccessToken', () => {
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

    it('should fetch API with the good params', () => {
      // given
      const idToken = 'valid-id_token';

      const expectedUrl = 'http://localhost:3000/auth/token';
      const expectedBody = { idToken: 'valid-id_token' };
      const expectedOptions = { headers: { 'Content-Type': 'application/json' } };

      // when
      const promise = api.verifyIdTokenAndGetAccessToken(idToken);

      // then
      return promise.then(() => {
        expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody, expectedOptions);
      });
    });

    it('should return a rejected promise when an error is thrown', (done) => {
      // given
      const idToken = 'invalid-id_token';
      axios.post.rejects(new Error('some error'));

      // when
      const promise = api.verifyIdTokenAndGetAccessToken(idToken);

      // then
      promise.catch((error) => {
        expect(error.message).to.equal('some error');
        done();
      });
    });
  });
});
