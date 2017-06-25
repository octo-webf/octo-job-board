import canUseDOM from 'can-use-dom';
import authApi from '@/api/auth';

export const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
export const AUTHENTICATED_USER_STORAGE_KEY = 'authenticated_user';

function _saveAccessTokenIntoLocalStorage(accessToken) {
	return (canUseDOM) ? window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken) : false;
}

function _removeItemFromLocalStorage(storageKey) {
	return (canUseDOM) ? window.localStorage.removeItem(storageKey) : null;
}

export default {

	authenticate(googleUser) {
		return new Promise((resolve) => {
			_removeItemFromLocalStorage(ACCESS_TOKEN_STORAGE_KEY);

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

	disconnect() {
		return new Promise((resolve) => {
			_removeItemFromLocalStorage(ACCESS_TOKEN_STORAGE_KEY);
			_removeItemFromLocalStorage(AUTHENTICATED_USER_STORAGE_KEY);

			if (window.gapi && window.gapi.auth2) {
				const auth2 = window.gapi.auth2.getAuthInstance();
				auth2.signOut().then(() => {
					resolve();
				});
			} else {
				resolve();
			}
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
