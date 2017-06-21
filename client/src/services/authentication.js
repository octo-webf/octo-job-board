import canUseDOM from 'can-use-dom';
import { authenticationRequest } from '@/api/auth';

export const LOCALSTORAGE_KEY = 'access_token';

export default {

	authenticate(googleIdToken) {

		return new Promise((resolve, reject) => {

			authenticationRequest(googleIdToken)
        .then((response) => {

	const { accessToken } = response;

	this.setToken(accessToken);

	resolve();

})
        .catch((err) => {

	this.removeToken();
	reject(err);

});

		});

	},

	getToken() {

		return (canUseDOM) ? window.localStorage[LOCALSTORAGE_KEY] : null;

	},

	setToken(accessToken) {

		return (canUseDOM) ? window.localStorage.setItem(LOCALSTORAGE_KEY, accessToken) : false;

	},

	removeToken() {

		return (canUseDOM) ? window.localStorage.removeItem(LOCALSTORAGE_KEY) : null;

	},
};
