import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('nexora_jwt') || '')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      localStorage.setItem('nexora_jwt', token)
    } else {
      localStorage.removeItem('nexora_jwt')
    }
  }, [token])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/login', { email, password })
      setToken(data.token)
      setUser(data.user || null)
      return { ok: true }
    } catch (error) {
      return { ok: false, error }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken('')
    setUser(null)
  }

  const value = useMemo(() => ({ token, setToken, user, setUser, login, logout, loading }), [token, user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

