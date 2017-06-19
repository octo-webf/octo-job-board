import 'whatwg-fetch';

/**
* Checks if a network request came back fine, and throws an error if not
*
* @param  {object} response   A response from a network request
*
* @return {object|undefined} Returns either the response, or throws an error
*/

export const checkStatus = (response) => {

	if (response.status >= 200 && response.status < 300) {

		return response;

	}

	const error = new Error(response.statusText);
	error.response = response;
	throw error;

};

/**
* Parses the JSON returned by a network request
*
* @param  {object} response A response from a network request
*
* @return {object}          The parsed JSON from the request
*/

const parseJSON = response => response.json();

const headers = {
	'Content-Type': 'application/json',
	// Authorization: auth.getToken() ? `Bearer ${auth.getToken()}` : '',
};

/**
* Requests a Authorization endpoint
*
* @param  {string} idToken		idToken to validate
*
* @return {Promise}						The response data
*/

export const authenticationRequest = idToken => fetch(process.env.AUTH_URL,
	{
		method: 'POST',
		headers,
		body: JSON.stringify({ idToken }),
	},
)
.then(checkStatus)
.then(parseJSON);
