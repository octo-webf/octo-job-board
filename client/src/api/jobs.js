import axios from 'axios';

const JobsApi = {

  fetchAll(accessToken) {
    const url = `${process.env.API_URL}api/jobs`;
    const options = { headers: { Authorization: `Bearer ${accessToken}` } };

    return axios.get(url, options)
      .then(response => response.data);
  },
};

export default JobsApi;
