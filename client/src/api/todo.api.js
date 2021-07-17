import http from './http'

const TodoApi = {
  getAll() {
    return http.get('/todos')
  },
}

export default TodoApi
