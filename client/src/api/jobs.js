import axios from 'axios';

const JobsApi = {

	fetchAll(accessToken) {

		const url = `${process.env.API_URL}api/jobs`;
		const options = { headers: { Authorization: `Bearer ${accessToken}` } };

		return axios.get(url, options)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));

	},
};

export default JobsApi;
