import authentication from '@/services/authentication';
import api from '@/api/auth';

describe.only('Unit | Services | Auth', () => {

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

      // given
			sinon.stub(api, 'verifyIdTokenAndGetAccessToken').callsFake(() => Promise.resolve(apiResponse));

      // when
			promise = authentication.authenticate(googleIdToken);

		});

		afterEach(() => {

			api.verifyIdTokenAndGetAccessToken.restore();

		});

		it('should return a promise', (done) => {

			promise.then(done);

		});

		it('should call "auth" API adapter with good params', () => promise.then(() => {

			expect(api.verifyIdTokenAndGetAccessToken).to.have.been.calledWith(googleIdToken);

		}));

		it('should store the access_token returned by the API into the local storage', () => promise.then(() => {

			expect(window.localStorage[authentication.accessTokenKey]).to.equal(apiResponse.access_token);

		}));


	});

});
