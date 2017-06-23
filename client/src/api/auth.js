import Vue from 'vue'

const AuthApi = {

  verifyIdTokenAndGetAccessToken(idToken) {

    const url = `${process.env.API_URL}/auth/token`
    const body = {idToken}
    const options = {headers: {'Content-Type': 'application/json'}}

    return Vue.http.post(url, body, options)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))

  },
}

export default AuthApi
