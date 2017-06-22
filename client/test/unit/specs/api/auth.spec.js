import sinon from 'sinon';
import api from '@/api/auth';

describe.only('Unit | API | auth api', () => {

	describe('#verifyIdTokenAndGetAccessToken', () => {

		beforeEach(() => {

			const stubbedResponse = {
				status: 200,
				json() {

					return { access_token: 'some-access_token' };

				},
			};
			sinon.stub(window, 'fetch').resolves(stubbedResponse);

		});

		afterEach(() => {

			window.fetch.restore();

		});

		it('should fetch API with the good params', () => {

      // given
			const idToken = 'valid-id_token';
			const expectedArguments = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: '{"idToken":"valid-id_token"}',
			};

      // when
			const promise = api.verifyIdTokenAndGetAccessToken(idToken);

      // then
			return promise.then(() => {

				expect(window.fetch).to.have.been.calledWith('http://localhost:3000/auth/token', expectedArguments);

			});

		});

	});

});
