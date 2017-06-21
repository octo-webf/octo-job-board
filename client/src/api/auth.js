import 'whatwg-fetch';

function _checkStatus(response) {

	if (response.status >= 200 && response.status < 300) {

		return response;

	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;

}

function _parseJSON(response) {

	return response.json();

}

const AuthApi = {

	verifyIdTokenAndGetAccessToken(idToken) {

		const requestHeaders = {
			'Content-Type': 'application/json',
		};
		const options = {
			method: 'POST',
			headers: requestHeaders,
			body: JSON.stringify({ idToken }),
		};

		return fetch(process.env.AUTH_URL, options)
      .then(_checkStatus)
      .then(_parseJSON);

	},
};

export default AuthApi;
