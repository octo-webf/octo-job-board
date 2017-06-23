import Vue from 'vue';
import VueResource from 'vue-resource';
import api from '@/api/jobs';

Vue.use(VueResource);

describe('Unit | API | jobs api', () => {

	describe('#fetchAll', () => {

		beforeEach(() => {

			const stubbedResponse = {
				status: 200,
				json() {

					return { foo: 'bar' };

				},
			};
			sinon.stub(Vue.http, 'get').resolves(stubbedResponse);

		});

		afterEach(() => {

			Vue.http.get.restore();

		});

		it('should fetch API with the good params', () => {

      // given
			const accessToken = 'valid-access-token';

			const expectedUrl = 'http://localhost:3000/api/jobs';
			const expectedOptions = { headers: { Authorization: `Bearer ${accessToken}` } };

      // when
			const promise = api.fetchAll(accessToken);

      // then
			return promise.then(() => {

				expect(Vue.http.get).to.have.been.calledWith(expectedUrl, expectedOptions);

			});

		});

	});

});
