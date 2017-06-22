import sinon from 'sinon';
import api from '@/api/jobs';

describe('Unit | API | jobs api', () => {

	describe('#fetchAll', () => {

		beforeEach(() => {

			const stubbedResponse = {
				status: 200,
				json() {

					return { foo: 'bar' };

				},
			};
			sinon.stub(window, 'fetch').resolves(stubbedResponse);

		});

		afterEach(() => {

			window.fetch.restore();

		});

		it('should fetch API with the good params', () => {

      // given
			const accessToken = 'valid-access-token';
			const expectedArguments = {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};

      // when
			const promise = api.fetchAll(accessToken);

      // then
			return promise.then(() => {

				expect(window.fetch).to.have.been.calledWith('http://localhost:3000/api/jobs', expectedArguments);

			});

		});

	});

});
