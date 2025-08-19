import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('nexora_token') || null)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexora_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem('nexora_token', token)
    else localStorage.removeItem('nexora_token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('nexora_user', JSON.stringify(user))
    else localStorage.removeItem('nexora_user')
  }, [user])

  const isAuthenticated = Boolean(token)

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated,
    login: ({ jwt, profile }) => {
      setToken(jwt)
      setUser(profile || safeDecode(jwt))
    },
    logout: () => {
      setToken(null)
      setUser(null)
    },
  }), [token, user, isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

function safeDecode(jwt) {
  try {
    const decoded = jwtDecode(jwt)
    return {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role || 'Client',
    }
  } catch (e) {
    return null
  }
}

