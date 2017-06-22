import 'whatwg-fetch'

function _parseJSON(response) {

  return response.json()

}

const JobsApi = {

  fetchAll(accessToken) {

    const requestHeaders = {
      'Authorization': `Bearer ${accessToken}`
    }
    const options = {
      headers: requestHeaders,
    }

    return fetch(`${process.env.API_URL}/jobs`, options).then(_parseJSON)

  },
}

export default JobsApi
