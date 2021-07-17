import http from './http'

const TodoApi = {
  /**
   * Get todo from api
   *
   * @returns http response
   */
  getAll() {
    return http.get('/todos')
  },
}

export default TodoApi
