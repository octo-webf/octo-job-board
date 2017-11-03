import axios from 'axios';

export default {

  subscribe(accessToken) {
    const url = `${process.env.API_URL}api/subscriptions`;
    const options = { headers: { Authorization: `Bearer ${accessToken}` } };
    return axios.post(url, {}, options);
  },

  unsubscribe(accessToken) {
    const url = `${process.env.API_URL}api/unsubscribe`;
    const options = { headers: { Authorization: `Bearer ${accessToken}` } };
    return axios.post(url, {}, options);
  },
};
