import http from './http'

const AccountApi = {
  /**
   *
   * @returns http response
   */
  signIn: () => {
    return http.post('/signIn', {
      username: 'tan.na@gmail.com',
    })
  },

  /**
   *
   * @returns http response
   */
  signOut: () => {
    return http.post('/signOut')
  },

  /**
   *
   * @returns http response
   */
  checkSignIn: () => {
    return http.post('/checkSignIn')
  },
}

export default AccountApi
