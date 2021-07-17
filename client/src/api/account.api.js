import http from './http'

const AccountApi = {
  /**
   * Sign in
   *
   * @returns http response
   */
  signIn() {
    return http.post('/signIn', {
      username: 'tan.na@gmail.com',
    })
  },

  /**
   * Sign out
   *
   * @returns http response
   */
  signOut() {
    return http.post('/signOut')
  },

  /**
   * Checking login
   *
   * @returns http response
   */
  checkSignIn() {
    return http.post('/checkSignIn')
  },
}

export default AccountApi
