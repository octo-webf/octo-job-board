import authentication from '@/services/authentication';
import api from '@/api/auth';

describe('Unit | Services | Auth', () => {

	beforeEach(() => {

		window.localStorage.clear();

	});

	afterEach(() => {

		window.localStorage.clear();

	});

	it('should have a method authenticate', () => {

		expect(authentication.authenticate).to.exist;

	});

	describe('#authenticate', () => {

		let promise;
		const googleIdToken = 'my-google-id_token';
		const apiResponse = { access_token: 'jwt-access-token' };

		beforeEach(() => {

			sinon.stub(api, 'verifyIdTokenAndGetAccessToken').resolves(apiResponse);

		});

		afterEach(() => {

			api.verifyIdTokenAndGetAccessToken.restore();

		});

		it('should return a promise', (done) => {

      // when
			promise = authentication.authenticate(googleIdToken);

      // then
			promise.then(done);

		});

		it('should always remove the (eventually) persisted acces_token in the local storage', () => {

      // given
			window.localStorage.setItem(authentication.accessTokenKey, 'an-old-access_token');

      // when
			promise = authentication.authenticate(googleIdToken);

      // then
			return promise.catch(() => {

				expect(window.localStorage.getItem(authentication.accessTokenKey)).to.equal(apiResponse.access_token);

			});

		});

		it('should call "auth" API adapter with good params', () => promise.then(() => {

      // when
			promise = authentication.authenticate(googleIdToken);

      // then
			return promise.then(() => {

				expect(api.verifyIdTokenAndGetAccessToken).to.have.been.calledWith(googleIdToken);

			});

		}));

		it('should store the access_token returned by the API into the local storage', () => promise.then(() => {

      // when
			promise = authentication.authenticate(googleIdToken);

      // then
			return promise.then(() => {

				expect(window.localStorage[authentication.accessTokenKey]).to.equal(apiResponse.access_token);

			});

		}));

	});

});
