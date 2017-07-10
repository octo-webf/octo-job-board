import axios from 'axios';

const FeedbacksApi = {

  sendFeedback(feedback, consultant, accessToken) {
    const url = `${process.env.API_URL}api/feedbacks`;
    const body = {
      consultant,
      feedback,
    };
    const options = { headers: { Authorization: `Bearer ${accessToken}` } };

    return axios.post(url, body, options)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
};

export default FeedbacksApi;
