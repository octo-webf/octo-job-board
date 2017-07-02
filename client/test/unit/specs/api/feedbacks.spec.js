import axios from 'axios';
import api from '@/api/feedbacks';

describe('Unit | API | interests api', () => {
	describe('#sendFeedback', () => {
		const accessToken = 'access-token';

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

		it('should post feedbacks to API with the good params', () => {
      // given
			const consultant = {
				email: 'bruce.wayne@gotham.dc',
				name: 'Bruce Wayne',
			};
			const feedback = 'Vive le Tour de France !';

			const expectedUrl = 'http://localhost:3000/api/feedbacks';
			const expectedBody = { feedback, consultant };
			const expectedOptions = { headers: { Authorization: `Bearer ${accessToken}` } };

			// when
			const promise = api.sendFeedback(feedback, consultant, accessToken);

      // then
			return promise.then(() => {
				expect(axios.post).to.have.been.calledWith(expectedUrl, expectedBody, expectedOptions);
			});
		});

		it('should return a rejected promise when an error is thrown', (done) => {
      // given
			axios.post.rejects(new Error('some error'));
			const feedback = 'cuocuocuo';

      // when
			const promise = api.sendFeedback(feedback, accessToken);

      // then
			promise.catch((error) => {
				expect(error.message).to.equal('some error');
				done();
			});
		});
	});
});
