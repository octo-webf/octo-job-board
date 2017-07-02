import axios from 'axios';

const InterestsApi = {

  sendInterest(job, consultant, accessToken) {
    const url = `${process.env.API_URL}api/interests`;
    const body = {
      interestedConsultant: consultant,
      businessContactNickname: (job.project.business_contact) ? job.project.business_contact.nickname : 'N/A',
      missionDirectorNickname: (job.project.mission_director) ? job.project.mission_director.nickname : 'N/A',
      octopodLink: `https://octopod.octo.com/projects/${job.project.id}`,
      activityName: job.activity.title,
      missionName: job.project.name,
    };
    const options = { headers: { Authorization: `Bearer ${accessToken}` } };

    return axios.post(url, body, options)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
};

export default InterestsApi;
