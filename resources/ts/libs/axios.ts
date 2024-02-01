import axios from 'axios'
import Cookies from 'js-cookie'

export default function api() {
  let baseUrl = `${location.protocol}//${location.hostname}`

  const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  api.interceptors.request.use(
    (request) => {
      const idToken = Cookies.get('id_token')
      if (idToken && request.headers) {
        request.headers.Authorization = `Bearer ${idToken}`
      }
      return request
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        return Promise.reject()
      }

      return Promise.reject(error)
    }
  )

  return api
}
