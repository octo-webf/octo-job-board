import axios from 'axios';
import subscriptionsApi from '@/api/subscriptions';

describe('Unit | API | subscriptions api', () => {

  describe('#subscription', () => {
    beforeEach(() => {
      sinon.stub(axios, 'post').resolves();
    });

    afterEach(() => {
      axios.post.restore();
    });

    it('should call POST /api/subscriptions', () => {
      // given
      const accessToken = 'valid-access-token';

      const expectedUrl = 'http://localhost:3000/api/subscriptions';
      const expectedOptions = { headers: { Authorization: `Bearer ${accessToken}` } };

      // when
      const promise = subscriptionsApi.subscribe(accessToken);

      // then
      return promise.then(() => {
        expect(axios.post).to.have.been.calledWith(expectedUrl, {}, expectedOptions);
      });
    });
  });

  describe('#unsubscribe', () => {
    beforeEach(() => {
      sinon.stub(axios, 'post').resolves();
    });

    afterEach(() => {
      axios.post.restore();
    });

    it('should call POST /api/unsubscribe', () => {
      // given
      const accessToken = 'valid-access-token';

      const expectedUrl = 'http://localhost:3000/api/unsubscribe';
      const expectedOptions = { headers: { Authorization: `Bearer ${accessToken}` } };

      // when
      const promise = subscriptionsApi.unsubscribe(accessToken);

      // then
      return promise.then(() => {
        expect(axios.post).to.have.been.calledWith(expectedUrl, {}, expectedOptions);
      });
    });
  });
});
