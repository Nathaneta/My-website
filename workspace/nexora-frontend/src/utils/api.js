import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 20000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nexora_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nexora_token')
      localStorage.removeItem('nexora_user')
      // Optionally trigger a redirect or event
    }
    return Promise.reject(error)
  }
)

export default api

