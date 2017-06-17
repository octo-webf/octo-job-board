import {
	AUTHENTICATE,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_ERROR,
	SIGN_OUT,
} from '@/vuex/mutation-types';

export default {
	[AUTHENTICATE](state) {

		state.pending = true;
		state.isAuthenticated = true;
		state.userId = null;
		state.accessToken = null;

	},
	[AUTHENTICATION_SUCCESS](state, { userId, accessToken }) {

		state.pending = false;
		state.isAuthenticated = true;
		state.userId = userId;
		state.accessToken = accessToken;

	},
	[AUTHENTICATION_ERROR](state) {

		state.pending = false;
		state.isAuthenticated = false;
		state.userId = null;
		state.accessToken = null;

	},
	[SIGN_OUT](state) {

		state.pending = false;
		state.isAuthenticated = false;
		state.userId = null;
		state.accessToken = null;

	},

};
