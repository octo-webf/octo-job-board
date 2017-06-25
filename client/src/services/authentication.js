import canUseDOM from 'can-use-dom';
import authApi from '@/api/auth';

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
export const AUTHENTICATED_USER_STORAGE_KEY = 'authenticated_user';

function _saveAccessTokenIntoLocalStorage(accessToken) {
	return (canUseDOM) ? window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken) : false;
}

function _removeAccessTokenFromLocalStorage() {
	return (canUseDOM) ? window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY) : null;
}

export default {

	authenticate(googleUser) {
		return new Promise((resolve) => {
			_removeAccessTokenFromLocalStorage();

			const idToken = googleUser.getAuthResponse().id_token;

			authApi.verifyIdTokenAndGetAccessToken(idToken).then((response) => {
				const accessToken = response.access_token;
				_saveAccessTokenIntoLocalStorage(accessToken);

				const profile = googleUser.getBasicProfile();
				const authenticatedUser = {
					name: profile.getName(),
					email: profile.getEmail(),
				};
				window.localStorage.setItem(AUTHENTICATED_USER_STORAGE_KEY, JSON.stringify(authenticatedUser));

				resolve();
			});
		});
	},

	isAuthenticated() {
		return (canUseDOM) ? !!window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null;
	},

	getAccessToken() {
		return (canUseDOM) ? window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) : null;
	},

	getAuthenticatedUser() {
		return (canUseDOM) ? JSON.parse(window.localStorage.getItem(AUTHENTICATED_USER_STORAGE_KEY)) : null;
	},

};
