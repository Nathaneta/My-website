import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api, setAuthToken } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('jwt') || '')
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    setAuthToken(token)
  }, [token])

  const login = async (email, password, remember) => {
    setAuthError('')
    try {
      const { data } = await api.post('/login', { email, password })
      setToken(data.token)
      if (remember) localStorage.setItem('jwt', data.token)
      setUser(data.user || { email })
      return true
    } catch (e) {
      setAuthError(e?.response?.data?.message || 'Login failed')
      return false
    }
  }

  const logout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem('jwt')
    setAuthToken('')
  }

  const value = useMemo(() => ({ token, user, login, logout, authError }), [token, user, authError])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

