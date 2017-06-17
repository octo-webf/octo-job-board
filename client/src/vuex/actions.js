import auth from '@/services/auth';

import { authenticationRequest } from '@/services/api';

import {
	AUTHENTICATE,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_ERROR,
	SIGN_OUT,
} from './mutation-types';

export async function authenticate({ commit }, { idToken }) {

	commit(AUTHENTICATE);

	try {

		const response = await authenticationRequest(idToken);

		const { user: { userId }, accessToken } = response;

		auth.setToken(accessToken);

		commit(AUTHENTICATION_SUCCESS, { userId, accessToken });

	} catch (error) {

		commit(AUTHENTICATION_ERROR, { error });

		auth.removeToken();

	}

}

export async function signOut({ commit }) {

	try {

		const authInstance = window.gapi.auth2.getAuthInstance();

		await authInstance.signOut();

		console.log('User signed out.');

	} catch (e) {

		console.log('User signed out error.', e);

	} finally {

		auth.removeToken();

		commit(SIGN_OUT);

	}

}
