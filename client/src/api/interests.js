import axios from 'axios';

const InterestsApi = {

  sendInterest(job, consultant, accessToken) {

    const url = `${process.env.API_URL}api/interests`;
    const body = {
      interestedConsultant: consultant,
      businessContactNickname: job.project.business_contact.nickname,
      missionDirectorNickname: job.project.mission_director.nickname,
      octopodLink: `https://octopod.octo.com/projects/${job.project.id}`,
      activityName: job.activity.title,
      missionName: job.project.name,
    };
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
      body,
    };

    return axios.post(url, options)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));

  },
};

export default InterestsApi;
