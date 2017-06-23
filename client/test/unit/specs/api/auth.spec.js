import Vue from 'vue';
import VueResource from 'vue-resource';
import api from '@/api/auth';

Vue.use(VueResource);

describe('Unit | API | auth api', () => {

	describe('#verifyIdTokenAndGetAccessToken', () => {

		beforeEach(() => {

			const stubbedResponse = {
				status: 200,
				json() {

					return { access_token: 'some-access_token' };

				},
			};
			sinon.stub(Vue.http, 'post').resolves(stubbedResponse);

		});

		afterEach(() => {

			Vue.http.post.restore();

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

				expect(Vue.http.post).to.have.been.calledWith(expectedUrl, expectedBody, expectedOptions);

			});

		});

	});

});
