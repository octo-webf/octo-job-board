import canUseDOM from 'can-use-dom'

export const LOCALSTORAGE_KEY = 'access_token'

export default {

  authenticate: function () {

  },

  getToken() {

    return (canUseDOM) ? window.localStorage[LOCALSTORAGE_KEY] : null

  },

  setToken(accessToken) {

    return (canUseDOM) ? window.localStorage.setItem(LOCALSTORAGE_KEY, accessToken) : false

  },

  removeToken() {

    return (canUseDOM) ? window.localStorage.removeItem(LOCALSTORAGE_KEY) : null

  },
}
