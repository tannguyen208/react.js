import axios from 'axios'
import Qs from 'query-string'
import {__DEV__} from 'src/utils/isEnv'

const logger = {
  request: (request) =>
    console.log('%c Request: ' + request.url, logger.ideally, request),
  requestSuccess: (response) =>
    console.log('%c Request Success:', logger.success, response),
  requestFailure: (message) =>
    console.error('%c Request Failure:', logger.failure, message),
}
logger.ideally = 'color: #bd06ba; font-weight: bold; font-size: 13px'
logger.success = 'color: #4caf50; font-weight: bold; font-size: 13px'
logger.failure = 'color: #ec6060; font-weight: bold; font-size: 13px'

const http = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => Qs.stringify(params),
})

// declare a request interceptor
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = JSON.parse(token)
  }

  if (__DEV__) logger.request(config)

  return config
})

// declare a request interceptor
http.interceptors.response.use(
  (response) => {
    if (__DEV__) logger.requestSuccess(response)

    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    if (__DEV__) logger.requestFailure(error)

    throw error
  }
)

export default http
