import axios from 'axios';
import api from '@/api/subscriptions';

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
    const promise = api.subscribe(accessToken);

    // then
    return promise.then(() => {
      expect(axios.post).to.have.been.calledWith(expectedUrl, {}, expectedOptions);
    });
  });
});
