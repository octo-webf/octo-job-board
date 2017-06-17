import {
	AUTHENTICATE,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_ERROR,
} from '@/vuex/mutation-types';

const actionsInjector = require('inject-loader!@/vuex/actions'); // eslint-disable-line import/no-webpack-loader-syntax

// create the module with our mocks
const actions = actionsInjector({
	'@/services/api': {
		authenticationRequest(idToken) {

			return new Promise((resolve, reject) => {

				const payload = {
					user: {
						userId: '102654',
						domain: 'octo.com',
					},
					accessToken: 'eyJhbGciOiJS',
				};

				if (idToken === 'octoCredentials') {

					resolve(payload);

				} else {

					reject();

				}

			});

		},

	},

});

const testAction = (action, payload, state, expectedMutations, done) => {

	let count = 0;

	// mock commit
	const commit = (type, payload) => { // eslint-disable-line no-shadow

		const mutation = expectedMutations[count];

		try {

			expect(mutation.type).to.equal(type);

			if (payload) {

				expect(mutation.payload).to.deep.equal(payload);

			}

		} catch (error) {

			done(error);

		}

		count += 1;

		if (count >= expectedMutations.length) {

			done();

		}

	};

	// call the action with mocked store and arguments
	action({ commit, state }, payload);

	// check if no mutations should have been dispatched
	if (expectedMutations.length === 0) {

		expect(count).to.equal(0);

		done();

	}

};

describe('Unit | vuex | actions', () => {

	describe('authenticate', () => {

		it('should commit AUTHENTICATE mutation, and AUTHENTICATION_SUCCESS on success', (done) => {

			const idToken = 'octoCredentials';

			testAction(actions.authenticate, { idToken }, {}, [

				{ type: AUTHENTICATE },
				{
					type: AUTHENTICATION_SUCCESS,
					payload: {
						userId: '102654',
						accessToken: 'eyJhbGciOiJS',
					},
				},

			], done);

		});

		it('should commit AUTHENTICATE mutation, and AUTHENTICATION_ERROR on error', (done) => {

			const idToken = 'xebiaCredentials';

			testAction(actions.authenticate, { idToken }, {}, [

				{ type: AUTHENTICATE },
				{
					type: AUTHENTICATION_ERROR,
					payload: {
						error: undefined,
					},
				},

			], done);

		});

	});

});
