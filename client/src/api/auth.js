import 'whatwg-fetch';

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

function _checkStatus(response) {

	if (response.status >= 200 && response.status < 300) {

		return response;

	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;

}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

function _parseJSON(response) {

	return response.json();

}

const AuthApi = {

  /**
   * Requests a Authorization endpoint
   *
   * @param  {string} idToken idToken to validate
   *
   * @return {Promise} The response data
   */
	getAccessToken(idToken) {

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
