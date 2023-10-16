// Axios wrapper to use interceptor
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  timeout: 5000
})

request.interceptors.request.use((config) => {
  return config // config contains header that writes metadata to server side
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // deal with network error
    let message = ''
    const status = error.response.status
    switch (status) {
      case 404:
        message = 'routing error'
        break
      case 500:
        message = 'server error'
        break
      default:
        message = 'network error'
        break
    }

    return ElMessage({
      type: 'error',
      message: message
    })
  }
)

export default request
