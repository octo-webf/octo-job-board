import axios from 'axios';
import subscriptionsApi from '@/api/subscriptions';

describe('Unit | API | subscriptions api', () => {

  const accessToken = 'valid-access-token';
  const expectedUrl = 'http://localhost:3000/api/subscriptions';
  const expectedOptions = { headers: { Authorization: `Bearer ${accessToken}` } };

  describe('#subscription', () => {
    let stub;

    beforeEach(() => {
      stub = sinon.stub(axios, 'post');
    });

    afterEach(() => {
      axios.post.restore();
    });

    it('should call POST /api/subscriptions', () => {
      // given
      stub.resolves();

      // when
      const promise = subscriptionsApi.subscribe(accessToken);

      // then
      return promise.then(() => {
        expect(axios.post).to.have.been.calledWith(expectedUrl, {}, expectedOptions);
      });
    });

    it('should return axios answer', () => {
      // given
      stub.resolves('answer');

      // when
      const promise = subscriptionsApi.subscribe(accessToken);

      // then
      return promise.then((answer) => {
        expect(answer).to.equal('answer');
      });
    });

    it('should throw error', () => {
      // given
      stub.rejects(new Error('error'));

      // when
      const promise = subscriptionsApi.subscribe(accessToken);

      // then
      return promise.catch((err) => {
        expect(err.message).to.equal('error')
      });
    });
  });

  describe('#unsubscribe', () => {
    let stub;

    beforeEach(() => {
      stub = sinon.stub(axios, 'delete');
    });

    afterEach(() => {
      axios.delete.restore();
    });

    it('should call DELETE /api/subscriptions', () => {
      // given
      stub.resolves();

      // when
      const promise = subscriptionsApi.unsubscribe(accessToken);

      // then
      return promise.then(() => {
        expect(axios.delete).to.have.been.calledWith(expectedUrl, expectedOptions);
      });
    });

    it('should return axios answer', () => {
      // given
      stub.resolves('answer');

      // when
      const promise = subscriptionsApi.unsubscribe(accessToken);

      // then
      return promise.then((answer) => {
        expect(answer).to.equal('answer');
      });
    });

    it('should throw error', () => {
      // given
      stub.rejects(new Error('error'));

      // when
      const promise = subscriptionsApi.unsubscribe(accessToken);

      // then
      return promise.catch((err) => {
        expect(err.message).to.equal('error')
      });
    });
  });
});
