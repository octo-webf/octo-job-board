import {
	AUTHENTICATE,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_ERROR,
	SIGN_OUT,
} from '@/vuex/mutation-types';

import mutation from '@/vuex/modules/authentication/mutation';

describe('Unit | vuex | authentication | mutations', () => {

	let state;

	beforeEach(() => {

		state = {

			pending: false,
			isAuthenticated: false,
			userId: null,
			accessToken: false,
		};

	});

	describe('AUTHENTICATE', () => {

		it('should set the state accordingly', () => {

			// given
			mutation[AUTHENTICATE](state);

			const espected = {
				pending: true,
				isAuthenticated: true,
				userId: null,
				accessToken: null,
			};

			// assert result
			expect(state).to.deep.equal(espected);

		});

	});

	describe('AUTHENTICATION_SUCCESS', () => {

		it('should set the state accordingly', () => {

			// given
			const userId = '1234';
			const accessToken = 'octo';
			mutation[AUTHENTICATION_SUCCESS](state, { userId, accessToken });

			const espected = {
				pending: false,
				isAuthenticated: true,
				userId,
				accessToken,
			};

			// assert result
			expect(state).to.deep.equal(espected);

		});

	});

	describe('AUTHENTICATION_ERROR', () => {

		it('should set the state accordingly', () => {

			// given
			mutation[AUTHENTICATION_ERROR](state);

			const espected = {
				pending: false,
				isAuthenticated: false,
				userId: null,
				accessToken: null,
			};

			// assert result
			expect(state).to.deep.equal(espected);

		});

	});

	describe('SIGN_OUT', () => {

		it('should set the state accordingly', () => {

			// given
			mutation[SIGN_OUT](state);

			const espected = {
				pending: false,
				isAuthenticated: false,
				userId: null,
				accessToken: null,
			};

			// assert result
			expect(state).to.deep.equal(espected);

		});

	});

});
